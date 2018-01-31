const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CategorySchema = new Schema({
  name: String,
  movies: [{
    type: ObjectId,
    ref: 'Movie'
  }],
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
CategorySchema.pre('save', function (next) {
  // 如果是新加的
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
});

// 查询静态方法
CategorySchema.statics = {
  // 用来取出当前数据库所有数据
  fetch: function (cb) {
    return this
      .find()
      // 按更新时间排序
      .sort('meta.updateAt')
      .exec(cb);
  },
  // 查询当前数据
  findById: function (id, cb) {
    return this
      .findOne({
        _id: id
      })
      .exec(cb);
  }
};

module.exports = CategorySchema;