
//onloadイベントハンドラ
/* onloadイベント発生した時に行う処理を記述 */
function init() {
    currentSliderValue = "0"
    alert("ページが読み込まれました");
}



$(function () {
    if ($.cookie("openTag")) {
        $('a[data-toggle="tab"]').parent().removeClass('active');
        $('a[href=#' + $.cookie("openTag") + ']').click();
    }
    
    $('a[data-toggle="tab"]').on('shown', function (e) {
        var tabName = e.target.href;
        var items = tabName.split("#");
        $.cookie("openTag", items[1], { expires: 700 });
    });
});

var ajax = null;
//キャタピラ操作ボタンクリックイベントハンドラ
//html側では引数としてarguments[0]を与えて下しあ
function doActionButton(e,id) {
    //var id = e.srcElement.id;//senderとしたeventから送信者のidを取得します
    var input = document.getElementById(id);//ここの文字列はlayout.jade中の文字を得たい要素のidを指定する

    var callback = function () {
        var targetVoltTxt = document.getElementById("voltagetxt")
        var target = document.getElementById("buttontxt");//ここの文字列はlayout.jade中の文字を返したい要素のidを指定する
        var res = JSON.parse(ajax.getResponse());
        target.textContent = "Motor Status : " + res.msgMotor0+" : "+res.msgMotor1;//ここから指定したlayout.jadeの要素にテキストとして書き込む
        targetVoltTxt.textContent = res.msgVoltage;
    }
    ajax = new AjaxObject('/driveCrawler?buttonName=' + 
                    input.value, callback);//ここからindex.tsへpostされる(layoutが名前となりコントローラーにバインドされる関数がどこから来たのか区別するために使われます、?以降がクエリ文字列としてコントローラーに引き渡されます)
}
//モーター直接操作ボタンクリックイベントハンドラ
//html側では引数としてarguments[0]を与えて下しあ
function doActionMotorButton(e, id) {
    //var id = e.srcElement.id;//senderとしたeventから送信者のidを取得します
    var input = document.getElementById(id);//ここの文字列はlayout.jade中の文字を得たい要素のidを指定する
    var radioVal1 = $("input[name='radio1']:checked").val();
    var radioVal2 = $("input[name='radio2']:checked").val();
    var callback = function () {
        var target1 = document.getElementById("motor1Status");//ここの文字列はlayout.jade中の文字を返したい要素のidを指定する
        var target2 = document.getElementById("motor2Status");//ここの文字列はlayout.jade中の文字を返したい要素のidを指定する
        var res = JSON.parse(ajax.getResponse());
        target1.textContent = res.msgMotorDrive;//ここから指定したlayout.jadeの要素にテキストとして書き込む
        target2.textContent = res.msgMotorVolt;//ここから指定したlayout.jadeの要素にテキストとして書き込む
    }
    if (id == 'inputValueMotor1') {
        ajax = new AjaxObject('/driveMotor?buttonName=' + 
                    radioVal1+'&voltagePercent='+ input.value, callback);//ここからindex.tsへpostされる(layoutが名前となりコントローラーにバインドされる関数がどこから来たのか区別するために使われます、?以降がクエリ文字列としてコントローラーに引き渡されます)

    } else {
        ajax = new AjaxObject('/driveMotor?buttonName=' + 
                    radioVal2 + '&voltagePercent=' + input.value, callback);
    }
}

//電源電圧取得ボタンクリックイベントハンドラ
//html側では引数としてarguments[0]を与えて下しあ
function doActionGetVoltageButton(e, id) {
    //var id = e.srcElement.id;//senderとしたeventから送信者のidを取得します
    var input = document.getElementById(id);//ここの文字列はlayout.jade中の文字を得たい要素のidを指定する
    var radioVal1 = $("input[name='radio1']:checked").val();
    var radioVal2 = $("input[name='radio2']:checked").val();
    var callback = function () {
        var target1 = document.getElementById("motor1Status");//ここの文字列はlayout.jade中の文字を返したい要素のidを指定する
        var target2 = document.getElementById("motor2Status");//ここの文字列はlayout.jade中の文字を返したい要素のidを指定する
        var res = JSON.parse(ajax.getResponse());
        target1.textContent = res.msgPowerVolt;//ここから指定したlayout.jadeの要素にテキストとして書き込む
    }
    ajax = new AjaxObject('/checkVoltage?buttonName=' + 
                    radioVal1 + '&voltagePercent=' + input.value, callback);//ここからindex.tsへpostされる(layoutが名前となりコントローラーにバインドされる関数がどこから来たのか区別するために使われます、?以降がクエリ文字列としてコントローラーに引き渡されます)
}


//スライダーの現在値
var currentSliderValue;

//スライダーイベントハンドラ
$(function () {
    
    var callback = function () {
        var target = document.getElementById("voltagetxt");//ここの文字列はlayout.jade中の文字を返したい要素のidを指定する
        var res = JSON.parse(ajax.getResponse());
        if(res!==null){
            target.textContent = res.msgVoltage;
        }
    }
    $('#volume').slider().on('slide', function (e) {
        if (currentSliderValue != e.value) {
            console.log(e.value);
            ajax = new AjaxObject('/driveCrawler?sliderValue=' + 
                    e.value, callback);
            currentSliderValue = e.value;
        } else {
            
        }
    });
});

function AjaxObject(url, callback) {
    var response = null;
    var callback = callback;
    
    ajaxStart(url);
    
    this.getResponse = function () {
        return response;
    }
    
    function ajaxStart(url) {
        var req = createRequest();
        if (req == null) {
            alert("実行できません！");
            return;
        }
        req.open("POST", url);
        req.setRequestHeader
                    ("User-Agent", "XMLHttpRequest");
        req.onreadystatechange = function () {
            if (this.readyState == 4 && 
                            this.status == 200) {
                precallback(this);
            }
        }
        req.send();
    }
    
    function createRequest() {
        var httplist = [
            function () {
                return new XMLHttpRequest();
            },
            function () {
                return new ActiveXObjct
                                ("Msxml2.XMLHTTP");
            },
            function () {
                return new ActiveXObject
                                ("Microsoft.XMLHTTP");
            }
        ];
        for (var i = 0; i < httplist.length; i++) {
            try {
                var http = httplist[i]();
                if (http != null) return http;
            } catch (e) {
                continue;
            }
        }
        return null;
    }
    
    function precallback(request) {
        response = request.responseText;
        callback();
    }
}