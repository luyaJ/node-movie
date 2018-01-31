var mongoose = require('mongoose')
const Comment = require('../models/comment');

// comment post 
exports.save = function (req, res) {
  const _comment = req.body.comment;
  const movieId = _comment.movie;

  // 判断评论是否存在
  // if (_comment.cid) {
  //   Comment.findById(_comment.cid, function (err, comment) {
  //     const reply = {
  //       from: _comment.from,
  //       to: _comment.tid,
  //       content: _comment.content
  //     }

  //     comment.reply.push(reply);
  //     comment.save(function (err, comment) {
  //       if (err) {
  //         console.log(err)
  //       }

  //       res.redirect('/movie/' + movieId)
  //     })
  //   })
  // } else {
    const comment = new Comment(_comment);

    comment.save(function (err, comment) {
      if (err) {
        console.log(err);
      }
      res.redirect('/movie/' + movieId);
    });
}