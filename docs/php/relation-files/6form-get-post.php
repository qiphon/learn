<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>form/post/get</title>
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
    <h2>get</h2>
    <form action="./6.1.php" method='get'>
        <input type="text" name="name" /><hr>
        <input type="password" name="pwd" /><hr>
        <button>提交</button>
    </form>
    <h2>post</h2>
    <!-- <form action="./6.1.php" method='post' enctype="multipart/from-data">
        <input type="text" name="name" /><hr>
        <input type="password" name="pwd" /><hr>
        <button>提交</button>
    </form> -->
    <script>
        $('button').click(function(ev){
            ev.preventDefault()
            $.ajax({
                url: './6.1.php',
                method: 'get',
                dataType: 'json',
                data: {
                    name: $('input[name="name"]').val(),
                    pwd: $('input[name="pwd"]').val()
                },
                success: function(res){
                    console.log(res)
                }
            })
        })
    </script>
</body>
</html>