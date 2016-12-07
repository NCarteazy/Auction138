SET foreign_key_checks = 0;
drop database if exists auction138;
create database auction138;
use auction138;


CREATE TABLE user  (user_id INTEGER NOT NULL,                                           
                        firstname VARCHAR(20) NOT NULL,
                        lastname VARCHAR(20) NOT NULL,
                        username VARCHAR(20) NOT NULL,
                        st_add VARCHAR(70) NOT NULL,
                        state CHAR(2) NOT NULL,
                        city VARCHAR(20) NOT NULL,
                        zipcode INTEGER NOT NULL,
                        country VARCHAR(20) NOT NULL,
                        email VARCHAR(40) NOT NULL,
                        mobilenum char(10),
                        homenum char(10),
                        pay_info varbinary(100) NOT NULL,
                        acc_create TIMESTAMP DEFAULT NOW(),
                        last_login TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
                        user_rating INTEGER NULL,
                        primary key (user_id));


CREATE TABLE auctioneer (user_id INTEGER,
                                                auction_id INTEGER,
                                                primary key(user_id,auction_id),
                        FOREIGN KEY(user_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
                        FOREIGN KEY(auction_id) REFERENCES auction(auction_id) ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE bidder (user_id INTEGER,
                                                bid_id INTEGER NOT NULL,
                        primary key(user_id,bid_id),
                        FOREIGN KEY(user_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
                        FOREIGN KEY(bid_id) REFERENCES bid(bid_id) ON UPDATE CASCADE ON DELETE CASCADE);


CREATE TABLE auction    (auction_id INTEGER NOT NULL,                                                   
                        status VARCHAR(20) NOT NULL,
                        auction_type VARCHAR(20) NOT NULL,
                        start_price INTEGER NOT NULL,
                        reserve_price INTEGER NOT NULL,
                        buyout_price INTEGER NOT NULL,
                        current_price INTEGER NULL,
                        end_price INTEGER NULL,
                        quantity INTEGER,
                        start_time TIMESTAMP DEFAULT NOW(),
                        min_bid_incr INTEGER,
                        end_time TIMESTAMP NOT NULL,
                        num_of_bids INTEGER,
                        item_id INTEGER NOT NULL,
                        bid_id INTEGER NOT NULL,
                        unique (item_id),
                        unique(bid_id),
                                                primary key (auction_id));


CREATE TABLE item       (item_id INTEGER NOT NULL,
                        model_num VARCHAR(30) NOT NULL,
                        item_condition VARCHAR(10) NOT NULL,
                        item_name VARCHAR(40) NOT NULL,
                        item_rating INTEGER NULL,
                        SKU VARCHAR(30),
                        unit_count INTEGER NOT NULL,
                        image_url VARCHAR(100),
                        manufacturer VARCHAR(40) NOT NULL,
                        description VARCHAR(100),
                        retail_price INTEGER NOT NULL,
                        state VARCHAR(50),
                        country VARCHAR(50),
                        type_id INTEGER NOT NULL,
                        primary key (item_id), -- );
                        unique(type_id),
                                                FOREIGN KEY(item_id) REFERENCES auction(item_id) ON UPDATE CASCADE ON DELETE CASCADE);


CREATE TABLE type       (type_id INTEGER,
                        item_name VARCHAR(50) NOT NULL,
                        primary key(type_id),
                        FOREIGN KEY(type_id) REFERENCES item(type_id) ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE bid        (bid_id INTEGER NOT NULL,
                        bid_currency VARCHAR(20) NOT NULL,
                        bid_created TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
                        bid_updated TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
                        bid_status VARCHAR(20) NOT NULL,
                        bid_current_amt INTEGER NULL,
                        primary key(bid_id));
                        
CREATE TABLE employed_by  (employer_id INTEGER,
                                                                employee_id INTEGER, 
                                commission INTEGER,
                                primary key(employer_id, employee_id),
                                FOREIGN KEY(employer_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
                                FOREIGN KEY(employee_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE);


CREATE TABLE placed_on          (bidref_id INTEGER,
                                auctionref_id INTEGER,
                                primary key(bidref_id, auctionref_id),
                                FOREIGN KEY(bidref_id) REFERENCES bid(bid_id) ON UPDATE CASCADE ON DELETE CASCADE,
                                FOREIGN KEY(auctionref_id) REFERENCES auction(auction_id) ON UPDATE CASCADE ON DELETE CASCADE);




insert into user values ('100', 'john', 'smith', 'user1', '5467 first street', 'CA', 'san jose', '95122', 'USA', 'user1@gmail.com', '4086867393', '4086798765', AES_ENCRYPT('123456789012', 'jayz'), NULL, NULL, '5');
insert into user values ('101', 'michael', 'jordan', 'user2', '8580 main road', 'NY', 'new york', '90055', 'USA', 'user2@gmail.com', '5108756737', '5105984658', AES_ENCRYPT('00004782971', 'jayz'), NULL, NULL, '3.5');
insert into user values ('102', 'sam', 'smith', 'testuser', '4857 9th street', 'AZ', 'scottsdale', '98757', 'USA', 'user3@gmail.com', '6708905478', '6708904678', AES_ENCRYPT('2947194001649', 'jayz'), NULL, NULL, '4.2');
insert into user values ('103', 'larry', 'fitzgerald', 'user4', '2384 bark street', 'WA', 'seattle', '91890', 'USA', 'user4@gmail.com', '5124568322', '5124545662', AES_ENCRYPT('03856847263', 'jayz'), NULL, NULL, '3.9');
insert into user values ('104', 'carlos', 'hyde', 'user5', '1234 north east way', 'CA', 'san francisco', '95909', 'USA', 'user5@gmail.com', '4086785463', NULL, AES_ENCRYPT('098765432123', 'jayz'), NULL, NULL, '2.5');
        -- '2016-11-22 11:24:00'                                                                                                                                                                                                                
  
                                                -- auctionid, status, type, startprice, reserveprice, buyoutprice, currentprice,endprice, quantity, start_time, minbidincr, endtime, numofbids, itemid, bidid
insert into auction values ('200', 'Active', 'live', '0', '50', '200', '5', NULL, '1', '2016-11-27 03:00:00', '1', NOW() + INTERVAL 12 HOUR, '5', '1', '3');
insert into auction values ('201', 'Active', 'live', '0', '1000', '8000', '500', NULL, '500', '2016-11-27 09:00:00', '1', NOW() + INTERVAL 12 HOUR, '1', '2', '2');
insert into auction values ('202', 'Active', 'live', '0', '350', '600', '415', NULL, '1', '2016-11-27 12:00:00', '5', NOW() + INTERVAL 12 HOUR, '2', '3', '1');
insert into auction values ('203', 'Active', 'live', '0', '400', '700', '250', NULL, '1', '2016-11-27 13:00:00', '1', NOW() + INTERVAL 12 HOUR, '1', '4', '4');
insert into auction values ('204', 'Expired', 'live', '0', '25', '150', '40', '40', '1', '2016-11-27 13:00:00', '1', NOW() + INTERVAL 12 HOUR, '2', '5', '5');


                                        --   item_id, model, condition,name, rating, sku, count, image, manufacturer, description, retail_price, state, country, type_id)
insert into item values ('1', 'm10456', 'new', 'camera', '4.2', 'pas67857', '1', NULL, 'sony', 'High-definition, brand new', '65', 'CA', 'USA', '304');
insert into item values ('2', 'a158361', 'used', 'dirt bike', '3', 'h586876', '1', NULL, 'honda', 'slightly used, new wheels', '3500', 'CA', 'USA', '303');
insert into item values ('3', 'x3384', 'used', 'xbox one', '4', NULL, '1', NULL, 'microsoft', '500GB, comes with two controllers', '300', 'CA', 'USA', '309');
insert into item values ('4', 'x3663', 'new', 'xbox two', '5', NULL, '1', NULL, 'microsoft', '1TB, comes with three controllers', '350', 'CA', 'USA', '310');
insert into item values ('5', 'frjn55', 'new', 'monitor', '3', 'hp5648', '1', NULL, 'hp', '15inches, widescreen', '100', 'CA', 'USA', '302');

                                        -- typeid, typename
insert into type values ('300', 'food');
insert into type values ('301', 'watches');
insert into type values ('304', 'cameras');
insert into type values ('303', 'vehicles');
insert into type values ('309', 'videogames');
insert into type values ('302', 'computers');


                                        -- bidid, currency, createtime, updatetime, status, current_Amt
insert into bid values ('1', '$', '2016-11-22 10:33:00', '2016-11-22 11:00:00', 'NotActive', '23');
insert into bid values ('2', '$', '2016-11-22 10:33:00', '2016-11-22 11:22:00', 'Active', '455');
insert into bid values ('3', '$', '2016-11-22 10:38:00', '2016-11-22 11:00:00', 'Active', '2');
insert into bid values ('4', '$', '2016-11-22 12:33:00', '2016-11-22 13:00:00', 'NotActive', '256');
insert into bid values ('5', '$', '2016-11-22 22:33:00', '2016-11-22 23:00:00', 'NotActive', '1001');
-- insert into bid values ('8', '$', NULL, NULL, 'Active', '123123');

                                                -- user_id, bid_id
insert into bidder values ('100', '2');

                                                -- user_id, auction_id
insert into auctioneer values ('102', '200');
insert into auctioneer values ('102', '201');
insert into auctioneer values ('102', '202');
insert into auctioneer values ('102', '203');

                                                        -- employer_id, employee_id, commission
insert into employed_by values ('104', '100', '10');
insert into employed_by values ('103', '102', '15');

 

SET foreign_key_checks = 1;


-- select * From item;
-- select * From auction;

/*
SELECT pay_info
FROM user;
*/

SELECT *, 
       CAST(AES_DECRYPT(pay_info, 'jayz') AS CHAR(50)) pay_info_decrypt 
FROM   user

/*
select A.auction_id, A.status, I.item_name, I.manufacturer, I.description, I.item_condition,A.reserve_price, A.buyout_price, A.current_price, A.quantity, A.min_bid_incr, A.end_time
From auction as A, item as I 
WHERE A.item_id = I.item_id AND A.status = 'active';
*/


-- ******************************************Delete Example****************************************************
-- select * From auction;

-- delete from auction where auction_id = '204';

-- select * From auction;

-- *****************************************Update Example ****************************************************

-- SELECT * FROM bid;

-- UPDATE bid 
-- SET  bid_current_amt = '500'
-- WHERE bid_id = '2';

-- SELECT * FROM bid;

-- *****************************************AddExample*********************************************************


-- SELECT * FROM user;


-- insert into user values ('105', 'kate', 'tonch', 'newuser', '587 10th st', 'CA', 'san jose', '95148', 'USA', 'newuser@gmail.com', '4086869893', '4088747967', 'credit', NULL, NULL, '5');


-- SELECT * FROM user;


