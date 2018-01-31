$(function () {
  $('.reply').click(function (e) {
    // data-tid date-cid
    const target = $(this);
    const toId = target.data('tid');
    const commentId = target.data('cid');
    
    // 添加隐藏域
    $('<input>').attr({
      type: 'hidden',
      name: 'comment[tid]',
      value: toId
    }).appendTo('.form')

    $('<input>').attr({
      type: 'hidden',
      name: 'comment[cid]',
      value: commentId
    }).appendTo('.form')

  }); 
});