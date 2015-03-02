<?
$mysqli = new mysqli("mysql.hostinger.ru", "u581243753_mob", "mh9XqRYNK7p8JUP2", "u581243753_mob");
$salt = "salt";

$login = $_POST["login"];
$hash = crypt($_POST["password"], $salt);

echo json_encode(array("res" => $login));die();

$mysqli->query("INSERT INTO eco_user (user_login, user_pass_hash) VALUES ('$login', '$hash')");
$photoId = $mysqli->insert_id;

echo json_encode(array("res" => "ok"));
?>