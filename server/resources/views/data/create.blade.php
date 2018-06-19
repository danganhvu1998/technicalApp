<!DOCTYPE html>
<html>
<head>
	<title>Create Blog Laravel</title>
</head>
<body>
	<h1> Testing Creating Blog Ability</h1>
	<form action="{{route('store')}}" method="post">
		Data: <input type="text" name="data" value="title"><br>
		<input type="submit">
	</form>
</body>
</html>