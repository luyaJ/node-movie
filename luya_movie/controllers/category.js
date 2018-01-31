const Category = require('../models/category'); 

// category_admin new
exports.new = function (req, res) {
  res.render('category_admin', {
    title: "后台分类录入页",
    category: {}
  });
}

// category_admin post 到从后台录入页传来的信息(保存)
exports.save = function (req, res) {
  const _category = req.body.category;
  const category = new Category(_category);

  category.save(function (err, category) {
    if (err) {
      console.log(err);
    }
    res.redirect('/admin/categorylist')
  });
}

// categoryList
exports.categoryList = function (req, res) {
  Category.fetch(function (err, categories) {
    if (err) {
      console.log(err);
    }
    res.render('categorylist', {
      title: "分类列表页",
      categories: categories
    });
  });
}
