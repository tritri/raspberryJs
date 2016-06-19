
class motorDrive{

    static DRV8830_0 = 0x60;
    static DRV8830_1 = 0x62;
    static CONTROL_REG = 0x00;
    static FAULT_REG = 0x01;
    static STANBY = 0x00;
    static NEG_ROT = 0x02;
    static POS_ROT = 0x01;
    static BREAK = 0x03;
    static router = express.Router();
    static i2c = require('i2c');
    static addr = DRV8830_0;
    static wire0 = new i2c(DRV8830_0, { device: '/dev/i2c-1', debug: false });
    static wire1 = new i2c(DRV8830_1, { device: '/dev/i2c-1', debug: false });




    /**
     * コンストラクタ
     */
    constructor(){ 

    }
    /**
     *  GET users listing.
     *以下の感じでurlを入力すれば実行できる
     *http://192.168.1.98:3000/users?num=0&drive=break&volt=1.0
     * @param queryDatas
     */
    public function drive(voltage, motorNum, driveDir): boolean
{
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
            wire0.writeBytes(controlData, [byteData], function (err, res) { });
        }
        else {
            wire1.writeBytes(controlData, [byteData], function (err, res) { });
        }
        //wire.writeBytes(0x16, [0x05], function(err, res){});
        return true;
}


//import express = require('express');
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
//こちらはlayout.jsよりpostされた場合、
//AjaxObjectのコンストラクタへの引数にlayoutが指定されている
router.post('/layout', function (req, res, next) {
    var str = req.query['buttonName'];
    
    /// <reference path="./motorDrive.ts"/>
    var motor= new motorDrive();
    motor.drive(2.0, 0, "pos");

    res.json(
        {
            messagetxt: str,
        }
    );
});

module.exports = router;