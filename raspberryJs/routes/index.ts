import express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req: express.Request, res: express.Response, next: Function) {
    res.render('index', { title: 'Express' });
});


 
//layout.jadeに書いたformのpostはこのように受ける
//formの属性、action="/"としないとここには飛んでこない
router.post('/', function (req, res, next) {
    var str = req.body['input1'];
    
    //レスポンスはなぜか直接レスポンス先のjadeファイルを指定しないとだめ？
    res.render('layout',
        { 
            titletxt: '伺が',
            messagetxt: "センター" ,
        }
    );
});
module.exports = router;