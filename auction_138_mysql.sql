
SET foreign_key_checks = 0;
drop database if exists auction138;
create database auction138;
use auction138;

CREATE TABLE user  (user_id INTEGER NOT NULL, 
                        firstname CHAR(20) NOT NULL,
                        lastname CHAR(20) NOT NULL,
                        username CHAR(20) NOT NULL,
                        address CHAR(40) NOT NULL,
                        state CHAR(2) NOT NULL,
                        city CHAR(20) NOT NULL,
                        zipcode INTEGER NOT NULL,
                        country CHAR(20) NOT NULL,
                        email CHAR(40) NOT NULL,
                        mobilenum INTEGER NOT NULL,
                        homenum INTEGER NOT NULL,
                        acc_create_time INTEGER NULL,
                        last_login INTEGER NULL,
                        user_rating INTEGER NULL,
                        primary key (user_id));

CREATE TABLE auctioneer (user_id INTEGER PRIMARY KEY,
                        FOREIGN KEY(user_id) REFERENCES user(user_id));

CREATE TABLE bidder (user_id INTEGER PRIMARY KEY,
                        FOREIGN KEY(user_id) REFERENCES user(user_id));


CREATE TABLE auction    (auction_id INTEGER NOT NULL,
                        status CHAR(20) NOT NULL,
                        auction_type CHAR(20) NOT NULL,
                        start_price INTEGER NOT NULL,
                        reserve_price INTEGER NOT NULL,
                        buyout_price INTEGER NOT NULL,
                        current_price INTEGER NULL,
                        end_price INTEGER NULL);

CREATE TABLE item       (item_id INTEGER NOT NULL,
                        model_num CHAR(30) NOT NULL,
                        item_condition CHAR(10) NOT NULL,
                        item_name CHAR(40) NOT NULL,
                        item_rating INTEGER NULL,
                        SKU CHAR(30) NOT NULL,
                        unit_count INTEGER NOT NULL,
                        image_url CHAR(100) NOT NULL,
                        manufacturer CHAR(40) NOT NULL,
                        description CHAR(100) NOT NULL,
                        retail_price INTEGER NOT NULL,
                        item_location CHAR(50) NOT NULL,
                        primary key (item_id));


CREATE TABLE type       (item_id INTEGER PRIMARY KEY,
                        item_name CHAR(50) NOT NULL,
                        FOREIGN KEY(item_id) REFERENCES item(item_id));

CREATE TABLE bid	(bid_id INTEGER NOT NULL,
                        bid_currency CHAR(20) NOT NULL,
                        bid_created timestamp NOT NULL,
                        bid_updated timestamp NOT NULL,
                        bid_status char(20) NOT NULL,
                        bid_current_amt INTEGER NULL);

insert into bid values ('1', '$', ' 2016-11-22 10:33:00', ' 2016-11-22 10:33:00', '1','500');

-- ALTER TABLE users ADD CONSTRAINT PK_user PRIMARY KEY (user_id);
-- ALTER TABLE auction ADD CONSTRAINT PK_auction PRIMARY KEY (auction_id);
-- ALTER TABLE item ADD CONSTRAINT PK_item PRIMARY KEY (item_id);
-- ALTER TABLE bid ADD CONSTRAINT PK_bid PRIMARY KEY (bid_id);

select * From bid;

