// Сервер
var serverAddress = "http://ecomobile.tioo.ru";
// Массив со ссылками на фото
var images = []; 
// Коммент
var comment;
// Имена файлов фото на сервере
var serverImages = [];
// Геолокация
var latitude;
var longitude;


document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
}

// Сделать фото
function takePhoto() {
	navigator.camera.getPicture(
		function(imageURI) {
			images.push(imageURI);
			$(".photo").show();
			$(".photo").attr("src", imageURI);
		}, 
		function(message) {
			alert('Failed because: ' + message);
		},
		{ 
			quality: 100, 
			allowEdit: false,
			sourceType : navigator.camera.PictureSourceType.CAMERA, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			saveToPhotoAlbum: true,
			correctOrientation: true
		}
	);
}

// Получить координаты
function getLocation() {
	navigator.geolocation.getCurrentPosition(
		function(position){
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
		}, 
		function(error){
			alert("Ошибка геолокации: " + error.message);
		}
	);
}

// Отправить фото
function uploadPhoto(imageURI){
	var options = new FileUploadOptions();
	options.fileKey="file";
	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType="image/jpeg";

	var params ={};
	params.value1 ="test";
	params.value2 ="param";

	options.params = params;

	var ft = new FileTransfer();
	ft.upload(
		imageURI, 
		encodeURI(serverAddress + "/actions.php"), 
		function(r){
			console.log("Code = "+ r.responseCode);
			console.log("Response = "+ r.response);
			console.log("Sent = "+ r.bytesSent);
			if (r.response == "error") {
				$(".sendMessage").html("Ошибка");
			}
			else {
				serverImages.push(r.response);
				$.ajax({
					type: "POST",
					url: serverAddress + "/create_card.php",
					data: {comment: comment, latitude: latitude, longitude: longitude, photo: serverImages[0]},
					success: function(msg){
						$(".sendMessage").html("Отправка завершена!");
					}
				});
			}
		}, 
		function(error){
			$(".sendMessage").html("Ошибка");
			alert("Ошибка фото: Code = "+ error.code);
			console.log("upload error source "+ error.source);
			console.log("upload error target "+ error.target);
		}, 
		options
	);
}

function showLoader(){
	$.mobile.loading("show",{
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false,
		html: ""
    });
}

function hideLoader() {
	$.mobile.loading("hide");
}



$(document).ready(function(){
	
	$(".js-take-photo").click(function(){
		getLocation();
		takePhoto();
	});
	
	$(".set").click(function(){
		alert(images[0]);
		$(".js-card-form input[type=file]").val(images[0]);
	});
	
	$(".send").click(function(){
		$(".js-card-form").submit();
	});
	
	$(".js-set-comment").click(function(){
		comment = $(".js-comment").val();
	});
	
	$(".js-send-card").click(function(){
		$(".sendMessage").html("Подождите, идёт отправка...");
		uploadPhoto(images[0]);
	});
	
	$(".qwe").click(function(){
		alert(1);
		$.ajax({
			type: "POST",
			url: "http://ecomobile.tioo.ru/create_card.php",
			data: {comment: "123", latitude: 12, longitude: 12, photo: "qwe"},
			dataType: "json", 
			success: function(msg){
				alert(msg.res);
			}
		});
	});
    
});