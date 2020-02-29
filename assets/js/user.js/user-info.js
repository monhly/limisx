$(function () {
    // 更新输入框的内容
    var layer = layui.layer
    var form = layui.form
    // 先发起ajax的请求获取用户的信息进行数据的渲染
    user()
    function user() {
        $.get('/my/userinfo', function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }

            // 成功以后在进行对数据的渲染

            // 此处的f1是表单的名称 res.data是需要替换的值
            form.val('f1', res.data)
        })
    }
    // 对表单进行验证
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{1,12}$/
            , '不能出现空格'
        ],
        username: function (value) { //value：表单的值、item：表单的DOM对象
            var inp = $('.uName').val()
            if (inp === value) {
                return '昵称不能重复'
            }
        }
    });
    // 进行数据的发送
    $('.userForm').on('submit', function (e) {
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $('.userForm').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                window.parent.getData()
                layer.msg('注册成功')
            }
        })




    })
    // 对重置按钮进行事件的绑定
    $('.layui-btn-primary').on('click', function (e) {
        e.preventDefault()
        user()
    })
})