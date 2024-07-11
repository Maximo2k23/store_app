CREATE TABLE inventory (
  id int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id smallint UNIQUE NOT NULL,
  cost Float(5,2) NOT NULL,
  quantity smallint NOT NULL,
  quantity_max smallint NOT NULL,
  quantity_min smallint NOT NULL,
  due_date date not null,
  created_at timestamp default CURRENT_TIMESTAMP not null,
  updated_at timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null
);

INSERT INTO store_inventory.inventory (product_id,cost,quantity,quantity_max,quantity_min,due_date,created_at,updated_at) VALUES
	 (1,20.0,10,10,2,'2024-07-10','2024-07-01 06:30:44','2024-07-01 07:26:41');
