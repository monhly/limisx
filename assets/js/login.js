$(function () {
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        ceshi: function (value) {
            var inp = $('.zhuce [name=password]').val();
            if (value !== inp) {
                return '两次密码输入不一致'
            }
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
    // 注册页的数据提交
    // http://www.liulongbin.top:3007
    $('.zhuce').on('submit', function (e) {
        //    阻止表单事件的发送
        e.preventDefault()
        // 发送数据的请求
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 登陆成功以后显示,并调用登录的点击事件,跳转到登录页面
                layer.msg(res.message)
                $('#deng').click()
            }

        })
    })
    // 登录页数据的提交
    $('.denglu').on('submit', function (e) {
        //   阻止登录页的提交
        e.preventDefault()
        // 使用ajax进行数据的请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 使用本地存储对身份权限进行存储
                localStorage.setItem('token', res.token)
                location.href = '/index.html'

            }
        })
    })






})