$(function() {
  const $regform = $('#regForm');
  $regform.find('.button').on('click', function(){
    $.ajax({
      type: 'post',
      url: '/user/register',
      data: {
        name: $regform.find('[name="name"]').val(),
        password: $regform.find('[name="password"]').val(),
        repassword: $regform.find('[name="repassword"]').val(),
      },
      dataType: 'json',
      success: function(result){
        // console.log(result);
      }
    });
  });

  const $logform = $('#logForm');
  $logform.find('.button').on('click', function(){
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        name: $logform.find('[name="name"]').val(),
        password: $logform.find('[name="password"]').val()
      },
      dataType: 'json',
      success: function(result){
        // console.log(result);
      }
    });
  });
});