const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const MovieSchema = new Schema({
  title: String,
  doctor: String,
  country: String, 
  language: String,
  poster: String,
  flash: String,
  vPic: String,
  year: Number,
  summary: String,
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  pv: {
    type: Number,
    default: 0
  },
  // 创建及更新时间
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
MovieSchema.pre('save', function(next){
  // 如果是新加的
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
});

// 查询静态方法
MovieSchema.statics = {
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

module.exports = MovieSchema;