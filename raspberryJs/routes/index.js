var express = require('express');
var i2c = require('i2c'); //i2cモジュールの読み込み
var router = express.Router();
var DRV8830_0 = 0x60;
var DRV8830_1 = 0x62;
var CONTROL_REG = 0x00;
var FAULT_REG = 0x01;
var STANBY = 0x00;
var NEG_ROT = 0x02;
var POS_ROT = 0x01;
var BREAK = 0x03;
var motorDriveInnner = (function () {
    /**
     * コンストラクタ
     */
    function motorDriveInnner() {
        this.addr = DRV8830_0;
        this.wire0 = new i2c(DRV8830_0, { device: '/dev/i2c-1', debug: false });
        this.wire1 = new i2c(DRV8830_1, { device: '/dev/i2c-1', debug: false });
    }
    motorDriveInnner.prototype.drive = function (voltage, motorNum, driveDir) {
        var vSetF = voltage; //voltクエリにて電圧を取得
        var vSet = ((vSetF * 100)) / 8;
        var drive = STANBY;
        var driveStr = driveDir; //driveクエリにて回転方向を取得
        if (driveStr == 'pos') {
            drive = POS_ROT;
        }
        else if (driveStr == 'neg') {
            drive = NEG_ROT;
        }
        else if (driveStr == 'break') {
            drive = BREAK;
        }
        else {
        }
        var controlData = CONTROL_REG;
        var byteData = (vSet << 2) | drive;
        console.log(byteData);
        var motorNo = motorNum;
        //var wire;
        if (motorNo == 0) {
            this.wire0.writeBytes(controlData, [byteData], function (err, res) { });
        }
        else {
            this.wire1.writeBytes(controlData, [byteData], function (err, res) { });
        }
        //wire.writeBytes(0x16, [0x05], function(err, res){});
        return true;
    };
    return motorDriveInnner;
})();
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
    var motor = new motorDriveInnner();
    motor.drive(2.0, 0, "pos");
    res.json({
        messagetxt: str,
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map