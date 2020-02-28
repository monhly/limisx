$(function () {
    var layer = layui.layer
    // 进入页面以后开始请求数据
    getData()
    // 给左侧导航栏添加鼠标移入事件,去掉高亮的区域
    $('.layui-side-scroll li ').on('mouseover', function () {
        $(this).addClass('layui-this').siblings().removeClass('layui-this')
    })

    // 点击退出区域开始了
    $('.exit').on('click', function () {
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            layer.close(index);
            localStorage.removeItem('token')
            location.href = '/login.html'
        });
    })





})
// 封装获取用户新息的函数
function getData() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // 此处注意一定要把状态填写上, 否则会影响后面
            // 权限的设置
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 获取用户信息成功
            // 渲染用户的头像和欢迎的文本内容
            // render 渲染的意思
            // Avatar 头像的意思
            modefiction(res.data)
        },


    })
}
// 封装一个改变个人中心以及登录的函数
function modefiction(data) {
    var name = data.nickname || data.username;
    var src = data.user_pic
    $('.userLogin').html('欢迎&nbsp;&nbsp;' + name);
    if (src) {
        $('.layui-nav-img').prop('src', src).show()
        $('.Ut').hide()

    } else {
        var name = name[0].toUpperCase()
        $('.Ut').html(name).show()
        $('.layui-nav-img').hide()
    }

}