CREATE TABLE products (
  product_id SERIAL PRIMARY KEY NOT NULL,
  product_name varchar(40) NOT NULL,
  product_imgurl text NOT NULL,
  produce_price integer NOT NULL,
);