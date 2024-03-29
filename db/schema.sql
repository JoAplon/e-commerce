-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

CREATE TABLE category (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(30) NOT NULL,
);

CREATE TABLE product (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    -- IS_DECIMAL (price)
    stock INT NOT NULL DEFAULT 10,
    category_id INT,
    FOREIGN KEY (category_id)
    REFERENCES category(id)
);

CREATE TABLE tag (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR(30),
);

CREATE TABLE productTag (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_id INT,
    FOREIGN KEY (product_id)
    REFERENCES product(id),
    tag_id INT,
    FOREIGN KEY (tag_id)
    REFERENCES tag(id)
);