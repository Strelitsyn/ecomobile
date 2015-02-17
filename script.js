// Wait for Cordova to connect with the device
//
document.addEventListener("deviceready",onDeviceReady,false);

// Cordova is ready to be used!
//
function onDeviceReady() {
}

// Массив со ссылками на фото
var images = []; 

// Коммент
var comment;

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
	ft.upload(imageURI, encodeURI("http://ecomobile.tioo.ru/actions.php"), win, fail, options);
}

function win(r){
	console.log("Code = "+ r.responseCode);
	console.log("Response = "+ r.response);
	console.log("Sent = "+ r.bytesSent);
}

function fail(error){
	alert("An error has occurred: Code = "+ error.code);
	console.log("upload error source "+ error.source);
	console.log("upload error target "+ error.target);
}



$(document).ready(function(){
	
	$(".js-take-photo").click(function(){
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
		uploadPhoto(images[0]);
	
	});
});