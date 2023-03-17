-- DB Name: RichlandMusicParents --

------------------ User ------------------

-- Create User Table --

CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"is_admin" boolean DEFAULT FALSE NOT NULL
);

-- Insert --

INSERT INTO "user" ("username", "password", "first_name", "last_name", "is_admin")
	VALUES ('johndoe', 'secure_password_hash', 'John', 'Doe', FALSE);

-- Update --

UPDATE
	"user"
SET
	"username" = 'new_username',
	"password" = 'new_password_hash',
	"first_name" = 'NewFirstName',
	"last_name" = 'NewLastName',
	"is_admin" = TRUE
WHERE
	"id" = 1;

-- Delete --

DELETE FROM "user"
WHERE "id" = 1;

-- Get All Users --

SELECT
	*
FROM
	"user";
	
-- Get Specific User --

SELECT
	*
FROM
	"user"
WHERE
	"id" = 1;

------------------ End User ------------------

------------------ Calendar ------------------

-- Create --

CREATE TABLE "calendar" (
	"id" serial PRIMARY KEY,
	"calendar_name" varchar(255) NOT NULL
);

-- Insert --

INSERT INTO "calendar" ("calendar_name")
	VALUES ('2023');
	
-- Update --

UPDATE
	"calendar"
SET
	"calendar_name" = < new_calendar_name >;

------------------ End Calendar ------------------


------------------ Events ------------------

-- Create Event Table --

CREATE TABLE "event" (
	"id" serial PRIMARY KEY,
	"event_type" varchar(255) NOT NULL,
	"event_date" date NOT NULL,
	"event_name" varchar(255) NOT NULL,
	"user_id" int REFERENCES "user",
	"calendar_id" int REFERENCES "calendar"
);


-- Insert --

INSERT INTO "event" ("event_type", "event_date", "event_name", "user_id", "calendar_id")
	VALUES ('birthday', '01/01/2023', 'Josh Birthday', 1, 1);
	
	          INSERT INTO "calendar" ("calendar_year") 
	          VALUES ('2024') ;

-- Select All --

SELECT
	*,
	(SELECT 
	"user".first_name FROM "user" WHERE "user".id = "event".user_id ),
		(SELECT 
	"user".last_name FROM "user" WHERE "user".id = "event".user_id )
FROM
	"event";
	
-- Select By User_id --
	
  SELECT
	*,
	(SELECT 
	"user".first_name FROM "user" WHERE "user".id = "event".user_id ),
		(SELECT 
	"user".last_name FROM "user" WHERE "user".id = "event".user_id )
FROM
	"event"
WHERE "event"."user_id" = 2;

-- Update --

UPDATE event
SET
    "event_type" = 'New Event Type',
    "event_date" = '2023-04-01',
    "event_name" = 'New Event Name'
WHERE "id" = event_id;

-- Delete Specific Event --

DELETE FROM "event" WHERE "id" = 1;

------------------ END Events ------------------

------------------ Products ------------------

-- Create Product Table --

CREATE TABLE "product" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"price" decimal NOT NULL,
	"sku" varchar(255) NOT NULL,
	"calendar_id" int REFERENCES "calendar"
);

-- Insert -- (Run Both)

INSERT INTO "product" ("name", "price", "sku", "calendar_id")
	VALUES ('Extra Event', 0.50, 'xevent23', 1);
	
INSERT INTO "product" ("name", "price", "sku", "calendar_id")
	VALUES ('Calendar', 15.00, 'cal23', 1);
	
-- Update --

UPDATE
	"product"
SET
	"name" = 'New Product Name',
	"price" = 49.99,
	"sku" = 'new_sku_123',
	"calendar_id" = 1
WHERE
	"id" = 1;

------------------ End Products ------------------

------------------ Order Items ------------------

-- Create table --

CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY,
	"quantity" int NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"product_id" int REFERENCES "product",
	"order_id" int REFERENCES "orders"
);

-- Insert --

INSERT INTO "order_items" ("quantity", "price", "product_id", "order_id")
	VALUES (2, 19.99, 1, 1);

-- Update --

UPDATE
	"order_items"
SET
	"quantity" = < new_quantity >,
	"price" = < new_price >,
	"product_id" = < new_product_id >,
	"order_id" = < new_order_id >
WHERE
	"id" = 1;


------------------ Orders ------------------

-- Create --

CREATE TABLE "orders" (
	"id" serial PRIMARY KEY,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar NOT NULL,
	"state" varchar NOT NULL,
	"zip" int NOT NULL,
	"phone" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"total" numeric(10, 2) default 0.00,
	"payment_type" varchar,
	"is_payed" boolean DEFAULT FALSE,
	"is_delivered" boolean DEFAULT FALSE,
	"user_id" int REFERENCES "user"
);

-- Insert --

INSERT INTO "orders" ("first_name", "last_name", "address", "city", "state", "zip", "phone", "payment_type", "user_id")
	VALUES ('123 Main St', 'New York', 'NY', 10001, '555-555-5555', 'Credit Card', 1);

-- Update --

UPDATE
	orders
SET
	first_name = 'NewFirstName',
	last_name = 'NewLastName',
	address = '123 New St',
	city = 'NewCity',
	state = 'NewState',
	zip = < new_zip >,
	phone = '555-555-1234',
	email = 'newemail@example.com',
	total = < new_total >,
	payment_type = 'NewPaymentType',
	is_payed = < new_is_payed >,
	is_delivered = < new_is_delivered >,
	user_id = < new_user_id >
WHERE
	id = < order_id >;


-- Get Specific Users Order --
	
SELECT
	*,
	(
		SELECT
			json_agg("event".*) AS "order_events"
		FROM
			"event"
		WHERE
			"event".user_id = "orders".user_id), (
		SELECT
			json_agg("order_items".*) AS "order_items"
		FROM
			"order_items"
		WHERE
			"order_items".order_id = "orders".id)
FROM
	"orders"
WHERE "user_id" = 1;


-- Select All Orders --

SELECT
	*,
	(
		SELECT
			json_agg("event".*) AS "order_events"
		FROM
			"event"
		WHERE
			"event".user_id = "orders".user_id), (
		SELECT
			json_agg("order_items".*) AS "order_items"
		FROM
			"order_items"
		WHERE
			"order_items".order_id = "orders".id)
FROM
	"orders";
	
Select * from "order_items" where "order_id" = 1;

------------------ End Orders ------------------

