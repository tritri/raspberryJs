﻿    const MCP3425 = 0x68;//MCP3425 i2cアドレス
    const CONFIG = 0x88;
    const deltaWait = 70000;//70ms

    var i2c = require('i2c');//i2cなしのデバッグの場合はここをコメントアウト
    var sleep = require('sleep');//i2cなしのデバッグの場合はここをコメントアウト

    var addr = MCP3425;
    var wire;
    import {Promise} from 'es6-promise'

    export class checkVoltagePower {
        
        private beforeDriveDir: string = "standy";
        private voltageBefore: number = 0;
        
        //private voltage: number = 0;
        /**
         * コンストラクタ
         */
        constructor() {
            //i2cなしのデバッグの場合はここをコメントアウト
            wire = new i2c(MCP3425, { device: '/dev/i2c-1', debug: false });
        }



        private outputVoltage = function (callback) {
            wire.read(2, (err, res) => {
                var tmpVoltage: number = 0;
                var raw;
                var volParBit;
                if (err) {
                    console.log("i2c read error!\n");
                } else {
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
        
        public checkVoltage(req, res, next): void {

            var voltage: number;

            console.log("check voltage start!\n");

            /*
            //テストコードここから
            var dattest: number = 0;

            this.test((dat) => {
                dattest = dat;
                voltage = 9999;
            });
            console.log("dattest:" + dattest + " new voltage:" + voltage + "\n");
            //ここまで
            */
            
            //i2c初期化
            wire.writeByte(CONFIG, function (err) {
                if (err) {
                    console.log("i2c initialize error!\n");
                }
            });

            var bufPresData: Array<number>;
            var raw: number = 0;
            var volParBit: number;
            sleep.usleep(deltaWait);
            

            
            var process1 = new Promise(
                wire.read(2, (err, res) => {
                    if (err) {
                        console.log("i2c read error!\n");
                        return err;
                    } else {
                        console.log("res!!! : " + res + "\n");
                        raw = res[0] << 8;
                        raw = raw | res[1];
                        if (raw > 32767) {
                            raw -= 65535;
                        }

                        volParBit = 2.048 / 32767;
                        voltage = volParBit * raw;

                        res.json(
                            {
                                msgPowerVolt: '電圧: ' + voltage + '99999V'
                            }
                        );
                        console.log("power voltage_1 : " + voltage + "\n");
                        return null;
                    }
                })
            )
            
            var process2 = new Promise(() => {
                console.log("voltage_2!!! : " + voltage + "V\n");
                }
            );
            
            Promise.all([process2, process1]);
            

            console.log("voltage_3 : " + voltage + "V\n");

        }

        public test(test: any): void {
            test(4);
        }
    }