<!DOCTYPE html>
<html>
	<head>
		<script src="http://code.jquery.com/jquery-1.5.1.min.js"></script>
		<script type="text/javascript" charset="utf-8">
			$(document).ready(function(){
				$(".js-register-button1").click(function() {
					alert("register");
					$.ajax({
						type: "POST",
						url: "/register.php",
						data: {login: $(".js-register-login1").val(), password: $(".js-register-password1").val()},
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
				});
			});
		</script>
	</head>
	<body>
		<input type="text" class="registerLogin js-register-login1"/>
		<input type="text" class="registerPassword js-register-password1"/>
		<button class="registerButton js-register-button1">Зарегистрироваться</button>
	</body>
</html>