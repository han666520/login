$(function () {
  //点击注册按钮，登录按钮显示
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  //点击登录按钮，注册按钮显示
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码不符合规范"],
    rpwd: function (value) {
      if ($("#pw").val() !== value) {
        return "两次密码不一致";
      }
    },
  });
  //监听表单注册事件

  $('#form_reg').on('submit', function (e) {
      e.preventDefault();

      $.ajax({
          url: '/api/reguser',
          method: 'POST',
          data: $(this).serialize(),
          success:(res) => {
              if (res.status !== 0) {
                  return     layer.msg(res.message || "注册失败")
              }
            layer.msg(res.message || "注册成功")
            $('#link_login').click()
          }
      })
  })
  //监听表单登录事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'post',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
        return layer.msg('登陆失败')
        }
        layer.msg('登录成功')
        console.log(res);
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      
      }
   })
  })
});
