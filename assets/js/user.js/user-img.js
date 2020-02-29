// 书写入口函数
$(function () {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    $image.cropper(options)
    // 给上传按钮绑定点击事件
    $('.upload').on('click', function () {
        // 模拟点击上传文件
        $('.file').click()
    })
    // 当上传文件的状态发生改变的时候
    $('.file').on('change', function (e) {
        // e.target.files 是用户选择的文件列表
        var $file = e.target.files
        // files是一个伪数组,所以使用的时候可以根据长度来进行判断
        if ($file.length === 0) {
            return layer.msg('上传图片失败')
        }
        var files = URL.createObjectURL($file[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', files)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 对确定的按钮进行事件的绑定
    $('.ensure').on('click', function () {
        // 1. 将用户选择的区域，转成一个头像图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.post('/my/update/avatar', { avatar: dataURL }, function (res) {
            // 根据状态判断,
            if (res.status !== 0) {
                return layer.msg('上传头像失败')
            }
            // 请求成功以后对头像和个人区域进行渲染
            window.parent.getData()
            layer.msg('图片上传成功')
        })




    })


})