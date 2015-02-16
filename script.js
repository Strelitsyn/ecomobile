// Wait for Cordova to connect with the device
//
document.addEventListener("deviceready",onDeviceReady,false);

// Cordova is ready to be used!
//
function onDeviceReady() {
}

// Массив со ссылками на фото
var images = []; 

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

$(document).ready(function(){
	
	$(".js-take-photo").click(function(){
		takePhoto();
	});
	
	$(".set").click(function(){
		$(".js-card-form input[type=file]").val(images[0]);
	});
	
	$(".send").click(function(){
		$(".js-card-form").submit();
	});


});