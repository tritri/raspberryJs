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

3.nvmのインストール（nodejsバージョン管理ツール）

$ git clone git://github.com/creationix/nvm.git ~/.nvm

.profileの最後に以下のnvm用スクリプトを追加する

# nvm
.profile
の一番最後の行に以下のスクリプトを追加する

if [[ -s /home/tri/.nvm/nvm.sh ]] ; then
    source /home/tri/.nvm/nvm.sh ;
fi

一度ログアウトし、再度ログインする以下のコマンドを打ち込むと、ばーしょんの表示が出ればOK
$ nvm --version
0.33.11

4.nodejsインストール

まず、Openssl-develのインストールを実行する
$ sudo apt-get install libssl-dev

npmよりnodejsのインストール

$ nvm install v0.4.0




