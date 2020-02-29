$(function () {
    var form = layui.form;
    var layer = layui.layer
    // 对表单进行事件的绑定
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        old: function (value, ) {
            var oldpas = $('.oldpass').val()
            if (oldpas === value) {
                return '新旧密码不能一致'
            }
        },
        new: function (value) {
            var newpass = $('.newpass').val();
            if (newpass !== value) {
                return '两次密码不一致'
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
    });

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.post('/my/updatepwd', $('.layui-form').serialize(), function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('更新密码成功')
            $('.layui-form')[0].reset()
        })
    })







})