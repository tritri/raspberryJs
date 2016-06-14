
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

function doAction() {
    var input = document.getElementById("upcenter");
    var callback = function () {
        var target = document.getElementById("msg");
        var res = JSON.parse(ajax.getResponse());
        target.textContent = "you send::" + res.msg;
    }
    ajax = new AjaxObject('/layout?centerButton=' + 
                    input.value, callback);
}

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