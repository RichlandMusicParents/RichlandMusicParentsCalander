/* DB Name = `RichlandMusicParents` */


CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"is_admin" boolean default false NOT NULL
);

INSERT INTO "user" ("username", "password", "first_name", "last_name", "is_admin")
	VALUES ('AdminTodd', 'admintoddpassowrd1234', 'Todd', 'Holdman', true);

DELETE FROM "user";

drop table "user";



CREATE TABLE "event" (
	"id" serial PRIMARY KEY,
	"event_type" varchar(255) NOT NULL,
	"event_date" date NOT NULL,
	"event_name" varchar(255) NOT NULL,
	"user_id" int REFERENCES "user",
	"calendar_id" int REFERENCES "calendar"
);

INSERT INTO "event" ("event_type", "event_date", "event_name", "user_id", "calendar_id")
	VALUES ('birthday', '01/01/2023', 'Josh Birthday', 1, 1);

SELECT
	*
FROM
	"event";

SELECT
	*
FROM
	"event"
WHERE
	"user_id" = 4;
delete from "event";



CREATE TABLE "product" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"price" decimal NOT NULL,
	"sku" varchar(255) NOT NULL,
	"calendar_id" int REFERENCES "calendar"
);

INSERT INTO "product" ("name", "price", "sku", "calendar_id")
	VALUES ('extra event', 0.50, 'xevent23', 1);

DELETE FROM "calendar";

DROP TABLE "order_items";
DELETE FROM "product"
WHERE id = 2;

DROP TABLE "user";


CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY,
	"quantity" int NOT NULL,
	"product_id" int REFERENCES "product",
	"order_id" int REFERENCES "order_details"
);

DELETE FROM "order_items";

DROP TABLE "order_items";

INSERT INTO "order_items" ("quantity", "product_id", "order_id")
	VALUES (1, 3, 1);



CREATE TABLE "calendar" (
	"id" serial PRIMARY KEY,
	"calendar_year" int NOT NULL UNIQUE
);

INSERT INTO "calendar" ("calendar_year")
	VALUES (2023);



CREATE TABLE "order_details" (
	"id" serial PRIMARY KEY,
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"total" decimal NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar NOT NULL,
	"state" varchar NOT NULL,
	"zip" int NOT NULL,
	"phone" varchar(255) NOT NULL,
	"payment_type" varchar,
	"is_payed" boolean DEFAULT FALSE,
	"is_delivered" boolean DEFAULT FALSE,
	"user_id" int REFERENCES "user"
);


DROP TABLE "order_details";

DELETE FROM "order_details";


INSERT INTO "order_details" ("total", "address", "city", "state", "zip", "phone", "payment_type", "user_id")
	VALUES (16.50, '123 address st n', 'Richland', 'ND', 58585, '1234567890', 'cash', 4);

----- order details for admin -----


SELECT
	"user".first_name,
	"user".last_name,
	"order_details"."address",
	"order_details"."is_payed",
	"order_details"."payment_type",
	"order_details"."is_delivered",
	"order_details"."address",
	"order_details"."phone",
	"order_details"."total",
	json_agg(("order_items")) AS order_items
FROM
	"order_details"
	JOIN "user" ON "user".id = "user_id"
	JOIN "order_items" ON "order_id" = "order_details".id
GROUP BY
	"order_details"."id",
	"user".id;
	
----- delete order for admin -----
	
DELETE FROM "order_details"
WHERE "id" = 2;
	
----------- Events -----------

----- all events for admin -----

SELECT
	*
FROM
	"event";

----- specfic user events for admin -----

SELECT
	*
FROM
	"event"
WHERE
	"user_id" = 1;
	

----- specfic user specific events for admin -----

SELECT
	*
FROM
	"event"
WHERE
	"user_id" = 4 and "event_type" = 'birthday'; 
	
SELECT
	*
FROM
	"event"
WHERE
	"user_id" = 4
	AND "event_type" = 'anniversary';
	
SELECT
	*
FROM
	"event"
WHERE
	"user_id" = 4
	AND "event_type" = 'memorial';

----- add new event -----

INSERT INTO "event" ("event_type", "event_date", "event_name", "user_id", "calendar_id")
	VALUES ('birthday', '01/01/2023', 'Josh Birthday', 4, 1);
	
----- admin update existing event -----
	
UPDATE
	"event"
SET
	"event_type" = 'anniversary',
	"event_date" = '01/01/2023',
	"event_name" = 'Josh',
	"user_id" = 4,
	"calendar_id" = 1;



