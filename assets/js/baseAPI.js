// 永远在发送请求之前对数据进行拦截
$.ajaxPrefilter(function (option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url
    // 进行数据的判断, 如果是需要使用headers的地方可以进行立面使用
    if (option.url.indexOf('/my') !== -1) {
        option.headers = { Authorization: localStorage.getItem('token') }
    }
    option.complete = function (res) {
        // 使用 res.responseJSON 获取到服务器的响应内容
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 用户没有登录，就来访问 index 页面
            // 1. 清空假 token
            localStorage.removeItem('token')
            // 2. 强制用户跳转到 登录页面
            location.href = '/login.html'
        }
    }


})