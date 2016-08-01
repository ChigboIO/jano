class HomeController {
  /* GET home page. */
  index(req, res) {
    // console.log(req.params);
    res.render('index', { title: 'Express' });
  }
}

module.exports = HomeController;
