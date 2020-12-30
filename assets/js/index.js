$(function () {
  getUserInfo()
  $('#btnout').on('click', function () {
    layer.confirm('确定退出登录 ?', {icon: 3, title:'提示'}, function(index){
      //do something
      //跳转登录界面
      location.href = '/login.html'
      //清除浏览器缓存
      localStorage.removeItem('token')
      layer.close(index);
    });
  })
})
function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      // headers 就是请求头配置对象
      // headers: {
      //   Authorization: localStorage.getItem('token') || ''
      // },
      success: function(res) {
          
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败！')
        }
        //调用 renderAvatar 渲染用户的头像
        renderAvatar(res.data)
      }
    })
  }
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    if (user.user_pic !==null) {
        //渲染图片头像
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-avatar').hide()
    } else {
        //渲染文字头像
     
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}