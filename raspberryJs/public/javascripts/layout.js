
//onloadイベントハンドラ
/* onloadイベント発生した時に行う処理を記述 */
function init() {
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
//ボタンクリックイベントハンドラ
//html側では引数としてarguments[0]を与えて下しあ
function doActionButton(e,id) {
    //var id = e.srcElement.id;//senderとしたeventから送信者のidを取得します
    var input = document.getElementById(id);//ここの文字列はlayout.jade中の文字を得たい要素のidを指定する

    var callback = function () {
        var target = document.getElementById("buttontxt");//ここの文字列はlayout.jade中の文字を返したい要素のidを指定する
        var res = JSON.parse(ajax.getResponse());
        target.textContent = "Motor Status : " + res.msgMotor0+" : "+res.msgMotor1;//ここから指定したlayout.jadeの要素にテキストとして書き込む
    }
    ajax = new AjaxObject('/layout?buttonName=' + 
                    input.value, callback);//ここからindex.tsへpostされる(layoutが名前となりコントローラーにバインドされる関数がどこから来たのか区別するために使われます、?以降がクエリ文字列としてコントローラーに引き渡されます)
}

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
        console.log(e.value);
        ajax = new AjaxObject('/layout?sliderValue=' + 
                    e.value, callback);
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