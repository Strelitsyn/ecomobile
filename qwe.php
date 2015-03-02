<!DOCTYPE html>
<html>
	<head>
		<script src="http://code.jquery.com/jquery-1.5.1.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="script.js"></script>
	</head>
	<body>
		<?
		$mysqli = new mysqli("mysql.0hosting.me", "u150398512_eco", "mh9XqRYNK7p8JUP2", "u150398512_eco");
		$dbResult = $mysqli->query("SELECT * FROM eco_user");
		while ($row = $dbResult->fetch_assoc()) {
			print_r($row);
		}?>
		<input type="text" class="registerLogin js-register-login1"/>
		<input type="text" class="registerPassword js-register-password1"/>
		<button class="registerButton js-register-button1">Зарегистрироваться</button>
	</body>
</html>