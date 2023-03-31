import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function AdminOrderItemsComponent() {
  const userId = useParams();
  useEffect(() => {
    dispatch({ type: "ADMIN_GET_SPECIFIC_USER", payload: userId });
    dispatch({ type: "ADMIN_GET_SPECIFIC_ORDER", payload: userId });
    dispatch({ type: "FETCH_PRODUCTS" });
    dispatch({
      type: "ADMIN_GET_SPECIFIC_ORDER_ITEMS",
      payload: userId.id,
    });
  }, [dispatch]);
  const dispatch = useDispatch();
  const order = useSelector((store) => store.adminReducer.specificOrder);
  const products = useSelector((store) => store.product);
  const orderItems = useSelector(
    (store) => store.adminReducer.specificOrderItems
  );
  const [quantity, setQuantity] = useState(1);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [itemEditMode, setItemEditMode] = useState(false);
  const [itemEditId, setItemEditId] = useState(0);
  useEffect(() => {
    order[0] !== undefined && setOrderId(order[0].id);
  }, [order]);

  useEffect(() => {
    total();
  }, [orderItems]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < orderItems.length; i++) {
      totalVal +=
        Number(orderItems[i].price).toFixed(2) * Number(orderItems[i].quantity);
    }
    setCartTotal(totalVal);
  };

  function addItems(product_id, price) {
    const orderItems = {
      quantity: quantity,
      price,
      product_id,
      order_id: Number(orderId),
      user_id: Number(userId.id),
    };

    dispatch({ type: "ADMIN_ADD_ORDER_ITEMS", payload: orderItems });
    // console.log(orderItems);
  }

  function saveUpdate(product_id, price) {
    console.log(product_id, price);
    const orderItems = {
      id: itemEditId,
      quantity: quantity,
      price,
      product_id,
      order_id: Number(orderId),
      user_id: Number(userId.id),
    };

    dispatch({ type: "ADMIN_EDIT_ORDER_ITEMS", payload: orderItems });
    setItemEditMode(false);
  }

  function updateItem(id, itemQuantity) {
    setItemEditMode(true);
    setItemEditId(id);
    setQuantity(itemQuantity);
  }

  function deleteOrderItem(id) {
    dispatch({
      type: "ADMIN_DELETE_ORDER_ITEM",
      payload: { id: id, user_id: userId },
    });
    setQuantity(1);
  }
  return (
    <>
      {" "}
      <div className="add-items-container">
        <header className="add-items">
          <h2>Add Items</h2>
        </header>
        {products.map((product) => (
          <>
            {!orderItems.some((item) => item.product_id === product.id) && (
              <div key={product.id} className="items-form">
                <h3>
                  {product.name}: {product.price}
                </h3>
                <Button onClick={() => addItems(product.id, product.price)}>
                  Add
                </Button>
              </div>
            )}
          </>
        ))}
        {orderItems.map((item) => (
          <div className="items-cart">
            {itemEditMode && item.id === itemEditId ? (
              <div key={item.id} className="item">
                <h3>
                  {item.name} {item.price}
                </h3>
                <TextField
                  sx={{
                    width: 50,
                  }}
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Button onClick={() => saveUpdate(item.product_id, item.price)}>
                  Update
                </Button>
              </div>
            ) : (
              <div key={item.id} className="item">
                <h3>
                  {item.name} {item.price}
                </h3>
                <TextField
                  sx={{
                    width: 50,
                  }}
                  label="Quantity"
                  type="text"
                  value={item.quantity}
                  onClick={() => updateItem(item.id, item.quantity)}
                />
                <Button onClick={() => deleteOrderItem(item.id)}>Remove</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
