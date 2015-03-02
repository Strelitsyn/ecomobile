<!DOCTYPE html>
<html>
	<head>
		<script src="http://code.jquery.com/jquery-1.5.1.min.js"></script>
		<script type="text/javascript" charset="utf-8">
			$(document).ready(function(){
				$(".button1").click(function() {
					$.ajax({
						type: "POST",
						url: "/login.php",
						data: {login: $(".js-login1").val(), password: $(".js-password1").val()},
						dataType: "json", 
						success: function(res){
							if (!res.error) {
								alert(res.user_id);
								return res.user_id;
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
		<input type="text" class="js-login1"/>
		<input type="text" class="js-password1"/>
		<button class="button1">Войти</button>
	</body>
</html>