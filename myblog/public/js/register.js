$(function () {
  var $registerform = $('#registerForm');
  var $loginform = $('#loginForm');

  // 注册
  $registerform.find('.button').on('click', function () {
    const name = $registerform.find('[name="name"]').val();
    const password = $registerform.find('[name="password"]').val();
    const repassword = $registerform.find('[name="repassword"]').val()
    if (password != repassword) {
      $registerform.find('[name="password"]').css("border","1px solid red");
      $registerform.find('[name="repassword"]').css("border","1px solid red");      
    } else if (password === repassword) {
      $.ajax({
        type: 'post',
        url: '/register',
        data: {
          name: name,
          password: password,
          repassword: repassword,
        },
        dataType: 'json',
        success: function (data, status) {
          if (status == 'success') {
            location.href = 'login';
          }
        },
        error: function (data, err) {
          location.href = "register";
        }
      });
    }
  });

  // 登录
  $loginform.find('.button').on('click', function () {
    const name = $loginform.find('[name="name"]').val();
    const password = $loginform.find('[name="password"]').val();
    $.ajax({
      type: 'post',
      url: '/login',
      data: {
        name: name,
        password: password
      },
      dataType: 'json',
      success: function (data, status) {
        if (status == 'success') {
          location.href = '/';
        }
      },
      error: function (data, status) {
        if (status == 'error') {
          location.href = 'login';
        }
      }
    });
  });
});