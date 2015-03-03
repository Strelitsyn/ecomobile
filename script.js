// Сервер
var serverAddress = "http://ecomobile.16mb.com";
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
				showError("Ошибка");
			}
			else {
				serverImages.push(r.response);
				$.ajax({
					type: "POST",
					url: serverAddress + "/create_card.php",
					data: {comment: comment, latitude: latitude, longitude: longitude, photo: serverImages[0], userId: getCurrentUserId()},
					success: function(msg){
						showMessage("Отправка завершена!");
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

function register(login, password) {
	$.ajax({
		type: "POST",
		url: serverAddress + "/register.php",
		data: {login: login, password: password},
		dataType: "json", 
		success: function(res){
			if (!res.error) {
				alert(res.res);
				return res.res;
			}
			else {
				alert(res.error);
			}
		}
	});
}

function login(login, password) {
	$.ajax({
		type: "POST",
		url: serverAddress + "/login.php",
		data: {login: login, password: password},
		dataType: "json", 
		success: function(res){
			if (!res.error) {
				bindUser(res.user_id);
				return res.user_id;
			}
			else {
				alert(res.error);
			}
		}
	});
}

function bindUser(userId) {
	localStorage.setItem('userId', userId);
}

function getCurrentUserId() {
	return localStorage.getItem('userId');
}

function logout() {
	localStorage.setItem('userId', 0);
}

function showMessage(msg) {
	$(".infoMessage").html(msg);
}

function clearMessage() {
	$(".infoMessage").html("");
}

function showError(msg) {
	$(".errorMessage").html(msg);
}

function clearError() {
	$(".errorMessage").html("");
}



$(document).ready(function(){
	
	$(".qwe1").click(function(){
		localStorage.setItem('key', 'value');
	});
	
	$(".qwe2").click(function(){
		alert(localStorage.getItem('key'));
	});
	
	$(".qwe3").click(function(){
		alert(getCurrentUserId());
	});
	
	$(".js-register-button").click(function() {
		register($("#register .js-login").val(), $("#register .js-password").val());
	});
	
	$(".js-login-button").click(function() {
		login($("#login .js-login").val(), $("#login .js-password").val());
	});
	
	$(".js-logout-button").click(function() {
		logout();
	});
	
	$(".button1").click(function() {
		//bindUser(login($("#login .js-login").val(), $("#login .js-password").val()));
		alert(login($(".js-login1").val(), $(".js-password1").val()));
	});
	
	$(".js-take-photo").click(function(){
		getLocation();
		takePhoto();
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
    
});