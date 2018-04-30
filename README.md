# raspberryJs
raspberrypi用NodeJsWebページ（モーターコントロール鯖）

1.Wirngpiインストール
$ git clone git://git.drogon.net/wiringPi
$ ./build

確認
$ gpio -v

２．i2ctoolsインストール
$ sudo apt-get install libi2c-dev

確認
$ sudo i2cdetect -y 1
