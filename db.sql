DROP TABLE IF EXISTS eco_card, eco_photo, eco_link_card_photo, eco_video, eco_link_card_video, eco_status;

CREATE TABLE eco_card(
	card_id INT(11) NOT NULL AUTO_INCREMENT, 
	card_timestamp TIMESTAMP NOT NULL, 
	card_user_id INT(11) NOT NULL, 
	card_name VARCHAR(100), 
	card_comment TEXT NOT NULL, 
	card_coord_lat DECIMAL(18,15) NOT NULL, 
	card_coord_lon DECIMAL(19,15) NOT NULL, 
	card_status_id INT(11) NOT NULL,
	PRIMARY KEY (card_id)
) AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE eco_photo(
	photo_id INT(11) NOT NULL AUTO_INCREMENT, 
	photo_path VARCHAR(256), 
	PRIMARY KEY (photo_id)
) AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE eco_link_card_photo (
	link_card_photo_card_id INT(11) NOT NULL,
	link_card_photo_photo_id INT(11) NOT NULL,
	UNIQUE KEY link_card_photo_id (link_card_photo_card_id, link_card_photo_photo_id)
);

CREATE TABLE eco_video(
	video_id INT(11) NOT NULL AUTO_INCREMENT, 
	video_path VARCHAR(256), 
	PRIMARY KEY (video_id)
) AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE eco_link_card_video (
	link_card_video_card_id INT(11) NOT NULL,
	link_card_video_video_id INT(11) NOT NULL,
	UNIQUE KEY link_card_video_id (link_card_video_card_id, link_card_video_video_id)
);

CREATE TABLE eco_status(
	status_id INT(11) NOT NULL AUTO_INCREMENT, 
	status_desc VARCHAR(100), 
	PRIMARY KEY (status_id)
) AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE eco_user(
	user_id INT(11) NOT NULL AUTO_INCREMENT,
	user_timestamp TIMESTAMP NOT NULL,
	user_email VARCHAR(256),
	user_login VARCHAR(100),
	user_pass_hash VARCHAR(600),
	PRIMARY KEY (user_id)
) AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO eco_status (status_desc) VALUES ("Ожидает модерации"), ("Добавлено");
