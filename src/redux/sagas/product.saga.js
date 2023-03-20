import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProducts() {
  try {
    const response = yield axios.get('/api/products');
    const product = response.data
    yield put({ type: 'SET_PRODUCTS', payload: product});
  } catch (error) {
    console.log('Error fetching products', error);
  }
};

function* addProduct(action) {
  try {
    yield axios.post('/api/products', action.payload);
    yield put({ 
        type: 'FETCH_PRODUCTS',
     });
  } catch (error) {
    console.log('Error adding product', error);
  }
}

function* productSaga() {
  yield takeLatest('FETCH_PRODUCTS', fetchProducts);
  yield takeLatest('ADD_PRODUCT', addProduct);
}

export default productSaga;
