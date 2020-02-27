$(function () {

    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        ceshi: function (value) {
            var inp = $('.zhuce [name=password]').val()
            if ()


         }


    })
    // 给登录和注册的按钮绑定点击事件
    $('#zhu').on('click', function () {
        $('.denglu').hide()
        $('.zhuce').show()
    })
    $('#deng').on('click', function () {
        $('.zhuce').hide()
        $('.denglu').show()
    })







})