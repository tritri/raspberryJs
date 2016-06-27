var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('node', { title: 'Express' });
});
router.post('index', function (req, res, next) {
    var str = req.body['input1'];
    res.render('helo', {
        title: 'HELO Page',
        msg: "you typed: " + str,
        input: str
    });
});
router.post('/', function (req, res, next) {
    var str = req.body['input1'];
    res.render('helo', {
        title: 'HELO Page',
        msg: "you typed: " + str,
        input: str
    });
});
module.exports = router;
//# sourceMappingURL=layout.js.map