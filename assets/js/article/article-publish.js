$(function () {
    var layer = layui.layer
    var form = layui.form
    // 获取数据的请求
    // 渲染所有的分类
    $.get('/my/article/cates', function (res) {
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        var str = template('template', res);
        $('[name=cate_id]').html(str)
        // 通知form表单进行数据的渲染
        form.render()


    })
    // 初始化富文本编辑器
    initEditor()
    // 裁剪的区域开始了
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 鼠标点击做绑定事件
    $('.check').on('click', function () {
        $('#file').click()



    })
    // 当表单发生改变的时候
    $('#file').on('change', function (e) {
        var file = e.target.files
        if (file.length === 0) {
            return layer.msg('获取图片失败')
        }
        var newImgURL = URL.createObjectURL(file[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 定义文章的最终住状态
    var art_state = '已发布';
    // 给草稿按钮进行绑定事件
    // 为存为草稿按钮，绑定点击事件
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    $('.for').on('submit', function (e) {
        e.preventDefault()
        // 请求数据
        var fd = new FormData($(this)[0])


        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 5. 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // 6. 发起 ajax 请求
                publishArticle(fd)
            })
        // 封装一个数据请求的函数
        function publishArticle(fd) {
            $.ajax({
                type: 'POST',
                url: '/my/article/add',
                data: fd,
                // 注意：如果提交的是 fd 格式的数据，必须有如下两个配置项
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('发表文章失败！')
                    }
                    layer.msg('发表文章成功！')
                    // 跳转到文章列表页面
                    location.href = '/article/article-list.html'
                }


            })
        }
    })



})

