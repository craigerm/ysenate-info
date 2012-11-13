
/*
 * GET home page.
 */

exports.legal = function(req, res){
  res.render('legal', {title: 'YSenate'});
};
exports.binpub = function(req, res) {
  res.render('gitlaw', {title: 'YSenate'});
};

