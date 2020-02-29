$(function () {
    var layer = layui.layer
    // 发送数据的请求,进行页面的渲染
    xuan()
    function xuan() {
        $.get('/my/article/cates', function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            console.log(res);

            var str = template('template', res)
            $('tbody').html(str)

        })
    }
    // 点击添加按钮
    var index = null
    $('.newfa').on('click', function () {
        index = layer.open({

            type: 1, // 页面层
            title: '添加文章分类', // 标题
            content: $('#xrN').html(), // 弹出层的主体
            area: ['500px', '250px'] // 设置层的宽和高
        })
    })
    // 点击确认按钮提交数据,然后进行页面的渲染
    // 因为此处的按钮是自动生成的,所以需要事件委托
    $('body').on('submit', '.calss', function (e) {

        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $('.calss').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 关闭遮罩层
                layer.close(index)
                // 请求数据渲染页面
                xuan()
            }





        })




    })
});













