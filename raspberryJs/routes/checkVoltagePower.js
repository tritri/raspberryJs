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
        this.raw = 0;
        //i2cなしのデバッグの場合はここをコメントアウト
        wire = new i2c(MCP3425, { device: '/dev/i2c-1', debug: false });
    }
    checkVoltagePower.prototype.checkVoltage = function () {
        var _this = this;
        var voltage;
        console.log("check voltage start!\n");
        wire.writeByte(CONFIG, function (err) {
            if (err) {
                console.log("i2c initialize error!\n");
            }
        });
        var bufPresData;
        //var raw: number=0;
        var voltage;
        var volParBit;
        sleep.usleep(deltaWait);
        wire.read(2, function (err, res) {
            if (err) {
                console.log("i2c read error!\n");
            }
            else {
                console.log("res!!! : " + res + "\n");
                _this.raw = res[0] << 8;
                _this.raw = _this.raw | res[1];
                if (_this.raw > 32767) {
                    _this.raw -= 65535;
                }
            }
        });
        /*
        wire.read(2, function (err, res) {
            if (err) {
                console.log("i2c read error!\n");
            } else {
                console.log("res!!! : " + res + "\n");
                raw = res[0] << 8;
                raw = raw | res[1];
                if (raw > 32767) {
                    raw -= 65535;
                }
            }
        });
        */
        console.log("raw!!! : " + this.raw + "\n");
        volParBit = 2.048 / 32767;
        voltage = volParBit * this.raw;
        console.log("power voltage : " + voltage + "\n");
        return voltage;
    };
    return checkVoltagePower;
}());
exports.checkVoltagePower = checkVoltagePower;
//# sourceMappingURL=checkVoltagePower.js.map