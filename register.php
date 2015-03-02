<?
$mysqli = new mysqli("mysql.0hosting.me", "u150398512_eco", "mh9XqRYNK7p8JUP2", "u150398512_eco");
$salt = "salt";

$login = $_POST["login"];
$hash = crypt($_POST["password"], $salt);

$mysqli->query("INSERT INTO eco_user (user_login, user_pass_hash) VALUES ('$login', '$hash')");
$photoId = $mysqli->insert_id;

echo json_encode(array("res" => "ok"));
?>