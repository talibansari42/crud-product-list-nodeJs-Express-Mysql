1. Database schema and tables:
-- Database: `my_db`
CREATE SCHEMA `my_db` ;
----------------------------------------
CREATE TABLE IF NOT EXISTS `my_db`.`category` (
  `category_id` INT NOT NULL,
  `category_name` VARCHAR(45) NULL,
  PRIMARY KEY (`category_id`));
----------------------------------------
CREATE TABLE IF NOT EXISTS `my_db`.`product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NULL,
  `product_price` INT NULL,
  `category_id` INT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `category_id_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `my_db`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
	
----------------------
ALTER TABLE `my_db`.`product` 
DROP FOREIGN KEY `category_id`;
ALTER TABLE `my_db`.`product` 
ADD CONSTRAINT `category_id`
  FOREIGN KEY (`category_id`)
  REFERENCES `my_db`.`category` (`category_id`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root123';
-- flush privileges;

-----------------
INSERT INTO `my_db`.`category`(`category_id`,`category_name`)VALUES(11,'electronics');
INSERT INTO `my_db`.`category`(`category_id`,`category_name`)VALUES(22,'Groceries');
INSERT INTO `my_db`.`category`(`category_id`,`category_name`)VALUES(33,'Cloths');
INSERT INTO `my_db`.`category`(`category_id`,`category_name`)VALUES(44,'vegitables');

--------------


INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p1',100000,11);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p2',150,22);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p3',2000,33);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p4',100,44);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p5',100000,11);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p6',150,22);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p7',2000,33);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p8',100,44);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p9',100000,11);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p10',150,22);
------------------
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p11',100000,11);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p12',150,22);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p13',2000,33);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p14',100,44);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p15',100000,11);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p16',150,22);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p17',2000,33);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p18',100,44);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p19',100000,11);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p20',150,22);
------
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p21',100000,11);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p22',150,22);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p23',2000,33);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p24',100,44);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p25',100000,11);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p26',150,22);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p27',2000,33);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p28',100,44);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p29',100000,11);
INSERT INTO `my_db`.`product`(`product_name`,`product_price`,`category_id`)VALUES('p30',150,22);
commit;

2. RUN below command:
 npm install

3. To start server run below command:

node index.js

4. Pagination url at server side:
by default it row limit 10 and starting page at 0
i.e:


GET http://localhost:8000   (default)
GET http://localhost:8000/?page=0&limit=10
GET http://localhost:8000/?page=1&limi=5
