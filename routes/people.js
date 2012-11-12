
/*
 * GET home page.
 */

exports.people = function(req, res){
  res.render('people', {title: 'YSenate'});
};

exports.legal = function(req, res){
  res.render('legal', {title: 'YSenate'});
};
