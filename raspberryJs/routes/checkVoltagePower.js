"use strict";
var MCP3425 = 0x68; //MCP3425 i2cアドレス
var CONFIG = 0x88;
var deltaWait = 70000; //70ms
var i2c = require('i2c'); //i2cなしのデバッグの場合はここをコメントアウト
var sleep = require('sleep'); //i2cなしのデバッグの場合はここをコメントアウト
var addr = MCP3425;
var wire;
var es6_promise_1 = require('es6-promise');
var checkVoltagePower = (function () {
    //private voltage: number = 0;
    /**
     * コンストラクタ
     */
    function checkVoltagePower() {
        this.beforeDriveDir = "standy";
        this.voltageBefore = 0;
        this.outputVoltage = function (callback) {
            wire.read(2, function (err, res) {
                var tmpVoltage = 0;
                var raw;
                var volParBit;
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
                    tmpVoltage = volParBit * raw;
                    console.log("power voltage_1 : " + tmpVoltage + "\n");
                }
                callback(tmpVoltage);
            });
        };
        //i2cなしのデバッグの場合はここをコメントアウト
        wire = new i2c(MCP3425, { device: '/dev/i2c-1', debug: false });
    }
    checkVoltagePower.prototype.checkVoltage = function (req, resWeb, next) {
        var voltage;
        console.log("check voltage start!\n");
        //i2c初期化
        wire.writeByte(CONFIG, function (err) {
            if (err) {
                console.log("i2c initialize error!\n");
            }
        });
        var bufPresData;
        var raw = 0;
        var volParBit;
        sleep.usleep(deltaWait);
        var process1 = new es6_promise_1.Promise(wire.read(2, function (err, res) {
            if (err) {
                console.log("i2c read error!\n");
                return err;
            }
            else {
                raw = res[0] << 8;
                raw = raw | res[1];
                if (raw > 32767) {
                    raw -= 65535;
                }
                volParBit = 2.048 / 32767;
                voltage = volParBit * raw;
                resWeb.json({
                    msgPowerVolt: '電圧: ' + voltage + 'V'
                });
                console.log("power voltage : " + voltage + "\n");
                return null;
            }
        }));
        var process2 = new es6_promise_1.Promise(function () {
            console.log("voltage_2!!! : " + voltage + "V\n");
        });
        es6_promise_1.Promise.all([process2, process1]);
    };
    return checkVoltagePower;
}());
exports.checkVoltagePower = checkVoltagePower;
//# sourceMappingURL=checkVoltagePower.js.map