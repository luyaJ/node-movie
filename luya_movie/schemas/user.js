const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs'); 

const UserSchema = new Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
  // 0: nomal user
  // >10: admin
  // >50: super admin
  role: {
    type: Number,
    default: 0
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

// 每次存储数据之前，我们都调用一下这个方法
UserSchema.pre('save', function(next){
  const user = this;
  // 如果是新加的
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  // 密码加密
  bcryptjs.genSalt(10, function(err, salt){
    if(err) return next(err);
    bcryptjs.hash(user.password, salt, function(err, hash){
      if(err) return next(err); 
      user.password = hash;
      next();
      })
    })
});

// 增加 登录密码匹配比较方法
UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcryptjs.compare(_password, this.password, function(err, isMatch) {
      if(err) return cb(err);
      cb(null, isMatch);
    })
  }
}

// 查询静态方法
UserSchema.statics = {
  // 用来取出当前数据库所有数据
  fetch: function(cb){
    return this
      .find()
      // 按更新时间排序
      .sort('meta.updateAt')
      .exec(cb);
  },
  // 查询当前数据
  findById: function(id, cb){
    return this
      .findOne({_id: id})
      .exec(cb);
  }
};

module.exports = UserSchema;