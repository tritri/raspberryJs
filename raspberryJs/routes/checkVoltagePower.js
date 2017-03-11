"use strict";
var MCP3425 = 0x68; //MCP3425 i2cアドレス
var CONFIG = 0x88;
var deltaWait = 70000; //70ms
var i2c = require('i2c'); //i2cなしのデバッグの場合はここをコメントアウト
var sleep = require('sleep'); //i2cなしのデバッグの場合はここをコメントアウト
var addr = MCP3425;
var wire;
var checkVoltagePower = (function () {
    /**
     * コンストラクタ
     */
    function checkVoltagePower() {
        this.beforeDriveDir = "standy";
        this.voltageBefore = 0;
        this.voltage = 0;
        //i2cなしのデバッグの場合はここをコメントアウト
        wire = new i2c(MCP3425, { device: '/dev/i2c-1', debug: false });
    }
    checkVoltagePower.prototype.checkVoltage = function () {
        var _this = this;
        var voltage;
        console.log("check voltage start!\n");
        /*
        //テストコードここから
        var err: number = 3;

        this.test((err) => {
            return err;
        });

        //ここまで
        */
        wire.writeByte(CONFIG, function (err) {
            if (err) {
                console.log("i2c initialize error!\n");
            }
        });
        var bufPresData;
        var raw = 0;
        var volParBit;
        sleep.usleep(deltaWait);
        voltage = wire.read(2, function (err, res) {
            if (err) {
                console.log("i2c read error!\n");
            }
            else {
                console.log("res!!! : " + res + "\n");
                raw = res[0] << 8;
                raw = raw | res[1];
                if (raw > 32767) {
                    raw -= 65535;
                }
                volParBit = 2.048 / 32767;
                _this.voltage = volParBit * raw;
                console.log("power voltage : " + _this.voltage + "\n");
            }
            return voltage;
        });
        console.log("voltage!!! : " + this.voltage + "V\n");
        return this.voltage;
    };
    checkVoltagePower.prototype.test = function (test) {
        test(4);
    };
    return checkVoltagePower;
}());
exports.checkVoltagePower = checkVoltagePower;
//# sourceMappingURL=checkVoltagePower.js.map