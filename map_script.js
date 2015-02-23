﻿var styles = [
	{}, 
	{ preset: 'islands#dotIcon', iconColor: "#777" }, //ожидает модерации
	{ preset: 'islands#dotIcon', iconColor: "#f00" }, //добавлено
	{ preset: 'islands#dotIcon', iconColor: "#fc0" }, //в процессе решения
	{ preset: 'islands#dotIcon', iconColor: "#0f0" }, //решена
];
var dbData = [];
var serverAddress = "http://ecomobile.tioo.ru";

/*function markClick(e) {
	var eCard = e.get('target');
	// Получение информации по карточке
	$.ajax({
		type: "POST",
		url: "/eco/actions.php",
		data: { action: "get_card_info", card_id: eCard.id },
	}).done(function(result) {
		dbData = JSON.parse(result);
		if (!dbData.error) {
			$(".card_description .comment").html(dbData[0].card_comment);
			$(".card_description .date").html(dbData[0].card_timestamp);
			$.ajax({
				type: "POST",
				url: "/eco/actions.php",
				data: { action: "get_user_info", user_id: dbData[0].card_user_id },
			}).done(function(result) {
				userData = JSON.parse(result);
				$(".card_description .user_name").html(userData.data.display_name);
			});
			$(".card_description .status").html(dbData[0].status_desc);
			$(".card_description").show();
		}
		else {
			$(".error").html(res.error);
		}
	});
	// Получение фото
	$.ajax({
		type: "POST",
		url: "/eco/actions.php",
		data: { action: "get_card_photos", card_id: eCard.id },
	}).done(function(result) {
		dbData = JSON.parse(result);
		if (!dbData.error) {
			for (i = 0; i < dbData.length; i++) {
				$(".card_description .media.photo").append("<img class='gallery_preview' src='"+UPLOAD_PATH+dbData[i].photo_path+"'/>");
			}
		}
		else {
			$(".error").html(res.error);
		}
	});
}*/

function initMap() { 
	map = new ymaps.Map ("mapBlock", {
		center: [55.1, 36.6],
		zoom: 12,
	});
}

function locateMarks() {
	alert("locateMarks");
	// Получение списка всех карточек
	$.ajax({
		type: "POST",
		url: serverAddress + "/get_cards.php",
		data: { },
		dataType: "json"
	}).done(function(dbData) {
		alert(dbData[0].card_coord_lat);
		//if (!dbData.error) {
			for (i = 0; i < dbData.length; i++) {
				cards[i] = new ymaps.Placemark([dbData[i].card_coord_lat, dbData[i].card_coord_lon], {}, styles[dbData[i].card_status_id]);
				cards[i].id = dbData[i].card_id;
				map.geoObjects.add(cards[i]);
				
				// Клик по метке
				/*cards[i].events.add('click', function(e) {
					markClick(e);
				});*/
			}
		/*}
		else {
			alert(dbData.error);
		}*/
	});
}

ymaps.ready(function() {
	initMap();
});
	

$(document).ready(function() {
	$(".js-locate_marks").click(function(){
		locateMarks();
	});

	$(".qwe").click(function(){
		alert(1);
		$.ajax({
			type: "POST",
			url: "http://ecomobile.tioo.ru/get_cards.php",
			data: {comment: "123", latitude: 12, longitude: 12, photo: "qwe"},
			dataType: "json", 
			success: function(msg){
				alert(msg.res);
			}
		});
	});
});
