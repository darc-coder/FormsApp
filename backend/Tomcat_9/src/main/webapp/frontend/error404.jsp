<!DOCTYPE html>
<html>
<head>
    <title>Error 404</title>
    <link rel="stylesheet" href="resources/error.css">
    <script src="resources/error.js" defer></script>
</head>
<body>
<div class="container">
    <div class="card">
        <div class="left">
            <span class="cutout"></span>
            <div class="heading">
                404
            </div>
            <div class="main-text">
                <h1>Oops!</h1>
                <h4>The Page you are looking for Does not Exist.</h4>
            </div>

            <a href="${pageContext.request.contextPath}/">
                <button type="button" class="btn">Take Me Back</button>
            </a>
        </div>
        <div class="right">
            <div class="background">
                <div class="planet"></div>
                <img src="resources/astronaut.png" class="astronaut" alt="Astronaut">
            </div>
        </div>
    </div>
</div>
</body>
</html>
