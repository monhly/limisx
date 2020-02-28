$(function () {
    // 给左侧导航栏添加鼠标移入事件,去掉高亮的区域
    $('.layui-side-scroll li').on('mouseover', function () {
        $(this).addClass('layui-this').siblings().removeClass('layui-this')
    })






})