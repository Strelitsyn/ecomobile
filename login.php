<?
$mysqli = new mysqli("mysql.hostinger.ru", "u581243753_mob", "mh9XqRYNK7p8JUP2", "u581243753_mob");
$salt = "salt";

$hash = crypt($_POST["password"], $salt);

$arResult = array();
$dbResult = $mysqli->query("SELECT user_pass_hash, user_id FROM eco_user WHERE user_login = '".$_POST['login']."'");
if (!$dbResult) {
	echo json_encode(array("error" => "Ошибка")); die;
}
while ($row = $dbResult->fetch_assoc()) {
	$arResult[] = $row;
}
if (count($arResult) == 0) {
	echo json_encode(array("error" => "Неверный логин")); die;
}
if ($arResult[0]["user_pass_hash"] == $hash) {
	session_start();
	$_SESSION["userId"] = $arResult[0]["user_id"];
	echo json_encode(array("user_id" => $arResult[0]["user_id"]));
}
else {
	echo json_encode(array("error" => "Неверный пароль")); die;
}



?>