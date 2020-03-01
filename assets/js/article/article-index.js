$(function () {
    var layer = layui.layer
    var form = layui.form
    // 发送数据的请求,进行页面的渲染
    xuan()
    function xuan() {
        $.get('/my/article/cates', function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 进行模板引擎的渲染/
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

    // 点击删除按钮删除所在的文件
    $('tbody').on('click', '.delete', function () {
        // 发送数据请求,获取所在id的数据
        var id = $(this).data('id');
        $.ajax({
            type: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                layer.confirm('确定要删除吗', { icon: 3, title: '提示' }, function (index) {
                    //do something
                    // 关闭弹出层
                    layer.close(index)
                    // 进行数据的渲染
                    xuan()
                });


            }



        })





    })
    // 绑定编辑的按钮

    var index = null
    $('tbody').on('click', '.edit', function (res) {
        var id = $(this).data('id')
        // 获取数据的请求
        $.get('/my/article/cates/' + id, function (res) {
            //    弹出数据层

            index = layer.open({
                type: 1, // 页面层
                title: '修改文章分类', // 标题
                content: $('#xiugai').html(), // 弹出层的主体
                area: ['500px', '250px'] // 设置层的宽和高
            })
            form.val('xg', res.data)
        })




    })
    // 为表单设置监听事件因为表单是动态天添加的,所以需要进行事件的委托
    $('body').on('submit', '.XG', function (e) {
        // 阻止表单的提交
        e.preventDefault();
        // 发送数据的请求
        // 发送表单的数据
        $.post('/my/article/updatecate', $(this).serialize(), function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 关闭弹出层的索引
            layer.close(index)
            // 对数据进行渲染
            xuan()
        })




    })
});













