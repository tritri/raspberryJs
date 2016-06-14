import express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req: express.Request, res: express.Response, next: Function) {
    res.render('node', { title: 'Express' });
});


 

router.post('index', function (req, res, next) {
    var str = req.body['input1'];
    res.render('helo',
        {
            title: 'HELO Page',
            msg: "you typed: " + str,
            input: str
        }
    );
});
module.exports = router;