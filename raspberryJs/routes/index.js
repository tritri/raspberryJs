var express = require('express');
//import i2c = require('i2c');//i2cモジュールの読み込み
var motorP = require('./motorDrive'); //外部モジュールmotorDriveの読みこみ
var router = express.Router();
/*
// GET home page.
router.get('/', function (req: express.Request, res: express.Response, next: Function) {
    res.render('index', { title: 'Express' });
});
*/
//layout.jadeに書いたformのpostはこのように受ける
//formの属性、action="/"としないとここには飛んでこない
router.post('/', function (req, res, next) {
    var str = req.body['input1'];
    //レスポンスはなぜか直接レスポンス先のjadeファイルを指定しないとだめ？
    res.render('layout', {
        titletxt: '伺が',
        messagetxt: "センター",
    });
});
//こちらはlayout.jsよりpostされた場合、
//AjaxObjectのコンストラクタへの引数にlayoutが指定されている
router.post('/layout', function (req, res, next) {
    var str = req.query['buttonName'];
    var motor = new motorP.motorDrive();
    motor.drive(2.0, 0, "pos");
    res.json({
        messagetxt: str,
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map