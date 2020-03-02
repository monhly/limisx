$(function () {
    // 发送数据请求,渲染页面
    var layer = layui.layer;
    var form = layui.form;
    // 引用分页
    laypage = layui.laypage

    var obj = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',


    }
    // 设置函数判断数字是否小于10
    function panD(data) {
        return data < 10 ? '0' + data : data;
    }
    list()
    // 渲染页面
    function list() {
        $.get('/my/article/list', obj, function (res) {
            if (res.status !== 0) {
                return layer.msg('请求数据失败')
            }

            template.defaults.imports.filter = function (date) {
                var pan = new Date(date)

                var y = pan.getFullYear()
                var m = panD(pan.getMonth() + 1)
                var d = panD(pan.getDate())

                var hh = panD(pan.getHours())
                var mm = panD(pan.getMinutes())
                var ss = panD(pan.getSeconds())

                // 2012-12-12 12:12:12

                return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss









            };
            var total = res.total
            lay(total)
            var str = template('go', res)
            $('tbody').html(str)
            // 分页log的渲染
        })
    }
    // 筛选的区域开始了
    $.get('/my/article/cates', function (res) {
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        var str = template('template', res);
        $('.xiala').html(str)
        // 通知表单元素,重新渲染页面
        form.render()
    })
    // 对表单进行事件的监听
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 拿到表单中的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        obj.cate_id = cate_id;
        obj.state = state
        list()
    })
    // 分页的渲染
    function lay(data) {
        //执行一个laypage实例
        laypage.render({
            elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
            , count: data //数据总数，从服务端得到,
            , limit: obj.pagesize //每页显示的页数,
            // , curr: obj.pagenum
            , limits: [2, 5, 10],
            curr: obj.pagenum
            , layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
            jump: function (obj1, first) {
                //obj包含了当前分页的所有参数，比如：

                obj.pagenum = obj1.curr
                //得到当前页，以便向服务端请求对应页的数据。


                // 获取最新的条目数，并且设置给 q.pagesize
                obj.pagesize = obj1.limit

                //首次不执行
                if (!first) {
                    //do something
                    // 根据当前页获取当前页的数据
                    list()

                }
            }
        });
    }
    // 绑定删除
    $('tbody').on('click', '.delete', function () {
        // 发送数据请求,获取所在id的数据
        var id = $(this).data('id');
        console.log(id);

        $.ajax({
            type: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.confirm('确定要删除吗', { icon: 3, title: '提示' }, function (index) {
                    //do something
                    // 关闭弹出层
                    layer.close(index)
                    // 进行数据的渲染
                    list()
                    layer.msg(res.message)
                });
            }
        })





    })

})