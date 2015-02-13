<?
/*if ($_POST["send"]) {
	echo($_POST["num"]);
}*/

if(is_uploaded_file($_FILES["photo"]["tmp_name"])){
	$newFileName = uniqid() . ".jpg";
	if (move_uploaded_file($_FILES["photo"]["tmp_name"], "upload/" . $newFileName) == false){
		$error = $_FILES["photo"]["name"].": Ошибка при загрузке файла";
	}
}


?>

<!DOCTYPE html>
<html>
	<head>
		<title>title</title>
		<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
	</head>
	
	<body>
		<img src="upload/<?=$newFileName?>" style="width: 200px; height: 200px">
	</body>
</html>