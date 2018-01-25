const mongoose = require('../db.js');
var bcrypt = require('bcryptjs');  // 加盐
const Schema = mongoose.Schema;

const UserSchema = new Schema({          
  name : { 
    unique: true,
    type: String 
  },                    
  password: { type: String }, 
  // role:{
  //   type: Number,
  //   default: 0
  // }, 
  isAdmin: {
    type: Boolean,
    default: false
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

// 每次执行都会调用，时间更新操作
UserSchema.pre('save', function(next){
  var user = this;
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }

  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err); 
      user.password = hash;
      next();
    })
  })
});

UserSchema.methods = {
  comparePassword: function(_password, cb){
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if(err){
        return cb(err)
      }
      cb(null, isMatch);
    })
  }
}

// 查询的静态方法
UserSchema.statics = {
  // 用来取出当前数据库所有数据
  fetch: function(cb){
    return this
      .find()
      .sort('meta.updateAt')
      .exec(cb)
  },
  findByName: function(name, cb){
    return this
      .findOne({name: new RegExp(name, 'i')})
      .exec(cb)
  }
};

module.exports = UserSchema;