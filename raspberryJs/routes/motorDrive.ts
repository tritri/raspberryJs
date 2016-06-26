    const DRV8830_0 = 0x60;
    const DRV8830_1 = 0x62;
    const CONTROL_REG = 0x00;
    const FAULT_REG = 0x01;

    const STANBY = 0x00;
    const NEG_ROT = 0x02;
    const POS_ROT = 0x01;
    const BREAK = 0x03;
    var i2c = require('i2c');
    var addr = DRV8830_0;

    var wire0;
    var wire1;


    export class motorDrive {


        /**
         * コンストラクタ
         */
        constructor() {

            wire0 = new i2c(DRV8830_0, { device: '/dev/i2c-1', debug: false });
            wire1 = new i2c(DRV8830_1, { device: '/dev/i2c-1', debug: false });
        }
    
        /**
         *  GET users listing. 
         *以下の感じでurlを入力すれば実行できる
         *http://192.168.1.98:3000/users?num=0&drive=break&volt=1.0
         * @param queryDatas
         */
        public drive(voltage: number, motorNum: number, driveDir: string): boolean {

            var vSetF = voltage;//voltクエリにて電圧を取得
            var vSet = ((vSetF * 100)) / 8;
            var drive = STANBY;

            var driveStr = driveDir;//driveクエリにて回転方向を取得

            if (driveStr == 'pos') {
                drive = POS_ROT;
            } else if (driveStr == 'neg') {
                drive = NEG_ROT;
            } else if (driveStr == 'break') {
                drive = BREAK;
            } else {
            }

            var controlData = CONTROL_REG;
            var byteData = (vSet << 2) | drive;
            console.log(byteData);

            var motorNo = motorNum;
            //var wire;

            if (motorNo == 0) {
                console.log("motor0 Start!\n");
                wire0.writeBytes(controlData, [byteData], function (err, res) { });
                //wire = new i2c(DRV8830_0, {device: '/dev/i2c-1',debug: false});
            } else {
                console.log("motor1 Start!\n");
                wire1.writeBytes(controlData, [byteData], function (err, res) { });
                //wire = new i2c(DRV8830_1, {device: '/dev/i2c-1',debug: false});
            }
            //wire.writeBytes(0x16, [0x05], function(err, res){});
            return true;

        }
    }