
/*
 * GET home page.
 */

exports.colors = function(req, res){
  res.render('colors', {title: 'YSenate'});
};

exports.buttons = function(req, res) {
  res.render('buttons', {title: 'YSenate'});
};
