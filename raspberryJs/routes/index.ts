import express = require('express');
//import i2c = require('i2c');//i2cモジュールの読み込み
import motorP = require('./motorDrive');//外部モジュールmotorDriveの読みこみ

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
    var strControl = req.query['buttonName'];
    var strVolume = req.query['sliderValue'];
    var volt = 2.0;
    var motor = new motorP.motorDrive();
    var str0: string = "No Status";
    var str1: string = "No Status";
    //motor.drive(volt, 0, "break");
    //motor.drive(volt, 1, "break");

    volt = (strVolume*(5.06-0.48)/100+0.48);

    if (strControl != undefined) {
        switch (strControl) {
            case "TopLeft":
                motor.drive(volt, 0, "pos");
                motor.drive(volt, 1, "standy");
                break;
            case "TopCenter":
                motor.drive(volt, 0, "pos");
                motor.drive(volt, 1, "pos");
                break;
            case "TopRight":
                motor.drive(volt, 0, "standy");
                motor.drive(volt, 1, "pos");
                break;
            case "CenterLeft":
                motor.drive(volt, 0, "pos");
                motor.drive(volt, 1, "neg");
                break;
            case "Center":
                motor.drive(volt, 0, "break");
                motor.drive(volt, 1, "break");
                break;
            case "CenterRight":
                motor.drive(volt, 0, "neg");
                motor.drive(volt, 1, "pos");
                break;
            case "DownLeft":
                motor.drive(volt, 0, "standy");
                motor.drive(volt, 1, "neg");
                break;
            case "DownCenter":
                motor.drive(volt, 0, "neg");
                motor.drive(volt, 1, "neg");
                break;
            case "DownRight":
                motor.drive(volt, 0, "neg");
                motor.drive(volt, 1, "standy");
                break;
            case "DriveCheck":
                str0 = motor.getStatus(0);
                str1 = motor.getStatus(1);
                break;
            default:
                motor.drive(volt, 0, "standy");
                motor.drive(volt, 1, "standy");
        }
    }

    res.json(
        {
            msgMotor0: str0,
            msgMotor1: str1,
            msgVoltage: volt
        }
    );
});

module.exports = router;