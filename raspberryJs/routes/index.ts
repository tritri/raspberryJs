import express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req: express.Request, res: express.Response, next: Function) {
    res.render('index', { title: 'Express' });
});

module.exports = router;