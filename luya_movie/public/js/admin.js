$(function () {
  // 后台 电影 删除
  $('#movieDel').click(function (e) {
    const target = $(e.target);
    const id = target.data('id');
    const tr = $('.item-id-' + id);

    $.ajax({
      type: 'DELETE',
      url: '/admin/movielist?id=' + id
    })
    .done(function (results) {
      if(results.success === 1) {
        if(tr.length > 0) {
          tr.remove();
        }
      }
    });
  });

  // 豆瓣api
  $('#douban').blur(function(){
    const $douban = $(this);
    const id = $douban.val();

    if(id) {
      $.ajax({
        url: 'http://api.douban.com/v2/movie/subject/' + id,
        cache: true,
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true, //跨域
        jsonp: 'callback',
        success: function(data){
          $('#inputTitle').val(data.title)
          $('#inputDoctor').val(data.directors[0].name)
          $('#inputCountry').val(data.countries[0])
          $('#inputPoster').val(data.images.large)
          $('#inputYear').val(data.year)
          $('#inputSummary').val(data.summary)
        }
      });
    }
  });

});