$(function(){
    $('.submit-btn').click(ev=>{
        ev.preventDefault()
        var name = $('.user-name').val()
        var pwd = $('.user-pwd').val()
        // console.log(name, pwd)
        $.ajax({
            method: 'post',
            url: '/',
            data: {
                name, pwd
            },
            success(res){
                console.log(res)
            }
        })
    })
})