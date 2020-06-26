//import * as $ from "jquery";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$(() => __awaiter(this, void 0, void 0, function* () {
    const commonFunc = class {
        /**
        * formatDate - returns formatted date
        *
        * @param {any} date : specific time
        * @param {string} format : time format
        * @return {string} : formatted date
        */
        formatDate(date, format) {
            if (!format)
                format = "YYYY-MM-DD hh:mm:ss.SSS";
            format = format.replace(/YYYY/g, date.getFullYear());
            format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
            format = format.replace(/DD/g, ("0" + date.getDate()).slice(-2));
            format = format.replace(/hh/g, ("0" + date.getHours()).slice(-2));
            format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
            format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
            if (format.match(/S/g)) {
                const milliSeconds = ("00" + date.getMilliseconds()).slice(-3);
                const length = format.match(/S/g).length;
                for (let i = 0; i < length; i++)
                    format = format.replace(/S/, milliSeconds.substring(i, i + 1));
            }
            return format;
        }
        /**
        * wait - async function to wait for specific millisecs
        *
        * @param msec {number} millisecs to wait
        * @return {Promise<{}>}
        */
        wait(msec) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, msec);
                });
            });
        }
        /**
        * getUrlVars - get the parameters of the current page
        *
        * @return vars {Vars}  an array of the parameters of the current page
        */
        getUrlVars() {
            let vars = {};
            let array = [];
            const url = window.location.search;
            const hash = url.slice(1).split("&");
            const max = hash.length;
            for (let i = 0; i < max; i++) {
                array = hash[i].split("=");
                vars[array[0]] = array[1];
            }
            return vars;
        }
        /**
         * public showBg - show loading screen while scraping documents
         *
         * @return {void}
         */
        showBg() {
            $("html").append("<div id='_wrapper'><div class='throbber throbber_large'></div><p>Now Loading...<br><span id='details'></span></p><p><span id='error'></span></p></div><style>#_wrapper{text-align:center;position:fixed;z-index:9999; top:0; opacity:1; color:#aaa;background:rgba(65,65,65,0.85);width:100%;height:100%;display:flex; flex-direction:column; justify-content:center;align-items:center;} .throbber {  width: 50px;  height: 50px; padding-bottom:15px; display: -webkit-box;  display: -webkit-flex;  display: -moz-box;  display: -ms-flexbox;  display: flex;  -webkit-box-align: center;  -webkit-align-items: center;  -moz-box-align: center;  -ms-flex-align: center;  align-items: center;  -webkit-box-pack: center;  -webkit-justify-content: center;  -moz-box-pack: center;  -ms-flex-pack: center;  justify-content: center;} .throbber:after {  display: block;  position: relative;  width: 20px;  height: 20px;  -webkit-animation: rotate 0.6s linear infinite;  -moz-animation: rotate 0.6s linear infinite;  -ms-animation: rotate 0.6s linear infinite;  -o-animation: rotate 0.6s linear infinite;  animation: rotate 0.6s linear infinite;  -webkit-border-radius: 100%;  -moz-border-radius: 100%;  border-radius: 100%;  border-top: 1px solid #545a6a;  border-bottom: 1px solid #d4d4db;  border-left: 1px solid #545a6a;  border-right: 1px solid #d4d4db;  content: '';  opacity: .5;} .throbber.throbber_large:after {  width: 40px;  height: 40px;}@keyframes rotate {  0% {    transform: rotateZ(-360deg);    -webkit-transform: rotateZ(-360deg);    -moz-transform: rotateZ(-360deg);    -o-transform: rotateZ(-360deg);  }  100% {    transform: rotateZ(0deg);    -webkit-transform: rotateZ(0deg);    -moz-transform: rotateZ(0deg);    -o-transform: rotateZ(0deg);  }}@-webkit-keyframes rotate {  0% {    transform: rotateZ(-360deg);    -webkit-transform: rotateZ(-360deg);    -moz-transform: rotateZ(-360deg);    -o-transform: rotateZ(-360deg);  }  100% {    transform: rotateZ(0deg);    -webkit-transform: rotateZ(0deg);    -moz-transform: rotateZ(0deg);    -o-transform: rotateZ(0deg);  }}@-moz-keyframes rotate {  0% {    transform: rotateZ(-360deg);    -webkit-transform: rotateZ(-360deg);    -moz-transform: rotateZ(-360deg);    -o-transform: rotateZ(-360deg);  }  100% {    transform: rotateZ(0deg);    -webkit-transform: rotateZ(0deg);    -moz-transform: rotateZ(0deg);    -o-transform: rotateZ(0deg);  }}@-o-keyframes rotate {  0% {    transform: rotateZ(-360deg);    -webkit-transform: rotateZ(-360deg);    -moz-transform: rotateZ(-360deg);    -o-transform: rotateZ(-360deg);  }  100% {    transform: rotateZ(0deg);    -webkit-transform: rotateZ(0deg);    -moz-transform: rotateZ(0deg);    -o-transform: rotateZ(0deg);  }}</style>");
            $("#details").html("");
            return;
        }
        /**
         * public removeBg - remove loading screen after finishing all processes or when occuring error
         *
         * @return {void}
         */
        removeBg() {
            $("#_wrapper").fadeOut("slow", () => $("#_wrapper").remove());
        }
        /**
         * public noImg - change information texts when there're nothing to save.
         *
         * @return {void}
         */
        noImg() {
            $("#details").html("<p>表示する画像が見つかりませんでした</p><p><a href='#' class='close'>× 閉じる</a></p><script>$('.close').on('click',function(){$('#_wrapper').fadeOut('slow',function(){$('#_wrapper').remove();});return false;});</script>");
            return;
        }
    };
    const mainFunc = class {
        constructor() {
            this.geturiv = $("html").html().match(/\/\/nijie.poyashi.me\/main\.js.*?"/)[0];
            this.defaultExps = {
                "mozamoza": new RegExp(/<img class="mozamoza ngtag" illust_id=.*? user_id=/g),
                "mainContainer": new RegExp(/<div class="clear-left clearfix">.*?<div class="kabu">/g),
                "mainContainerNotLeft": new RegExp(/<div class="clearfix">.*?<div class="kabu">/g),
                "memIndex": new RegExp(/<div class="mem-index clearboth">.*?<div class="kabu">/g),
                "membersMainContainer": new RegExp(/<div id="members_dlsite_left" class="clearboth">.*?<div id="members_right">/g),
                "memIndexToApplication": new RegExp(/<div class=("|')mem-index clearboth("|')>(.|\n)*?<script type=("|')application\/ld\+json("|')>/g),
                "formMethod": new RegExp(/<form method="post" name="content_delete".*?<div class="delete_footer_button">/g),
            };
            this.promptText = "DLするページ範囲を選択してください。\n書式:XX-YY(XXページからYYページまで) または ZZ(ZZページのみ)";
            this.commonErrorMes = "エラーが発生しました。コンソールを参照してください。";
            this.box = "mozamoza";
            this.urlPrefix = "?";
            this.str = [];
            this.array = [];
        }
        destructor() {
            this.str = [];
            this.array = [];
            this.startPoint = null;
            this.endPoint = null;
            console.log("destructor method called - all processes has been perished");
        }
        setTarget(input) {
            this.target = input;
            return;
        }
        /**
        * private ajax - main method to obtain the html source of the specific content
        *
        * @param  {string} url - specific
        * @return {{data:string;error:boolean}}
        */
        ajax(url) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield common.wait(300);
                    const res = yield $.ajax(url, {
                        type: "GET",
                        dataType: "html"
                    });
                    return { "data": res, "error": false };
                }
                catch (e) {
                    if (e.status === 404) {
                        return { "data": null, "error": false };
                    }
                    console.log(e, "at private method ajax()");
                    return { "data": e.message, "error": true };
                }
            });
        }
        view() {
            return __awaiter(this, void 0, void 0, function* () {
                const queries = common.getUrlVars();
                this.array = [queries["id"]];
                common.showBg();
                yield this.getImg();
                return 0;
            });
        }
        likeduser() {
            return __awaiter(this, void 0, void 0, function* () {
                this.container = "mainContainer";
                return this.execute();
            });
        }
        userpage() {
            return __awaiter(this, void 0, void 0, function* () {
                const queries = common.getUrlVars();
                const fileName = window.location.href.match(".+/(.+?)([\?#;].*)?$")[1];
                this.container = fileName === "members_illust.php" ? "membersMainContainer" : "memIndexToApplication";
                this.urlPrefix = "?id=" + queries["id"];
                return this.execute();
            });
        }
        likeview() {
            return __awaiter(this, void 0, void 0, function* () {
                const queries = common.getUrlVars();
                this.container = "memIndex";
                this.urlPrefix = "?id=" + queries["id"];
                return this.execute();
            });
        }
        illustview() {
            return __awaiter(this, void 0, void 0, function* () {
                this.container = "mainContainer";
                return this.execute();
            });
        }
        okazu() {
            return __awaiter(this, void 0, void 0, function* () {
                common.showBg();
                const html = $("#okazu_list").html();
                const matched = html.match(/<a href="\/view.php\?id=\d{1,15}"/g);
                for (let i = 0; i < matched.length; ++i) {
                    this.array.push(matched[i].match(/\d{1,15}/g)[0]);
                    $("#details").html(`<p>PROGRESS: ${i} of ${matched.length} (${Math.round(i / matched.length) * 100} %)<br>${matched[i].match(/\d{1,15}/g)[0]}</p>`);
                }
                yield this.getImg();
                return 0;
            });
        }
        search() {
            return __awaiter(this, void 0, void 0, function* () {
                let queries = common.getUrlVars();
                if (!queries["sort"]) {
                    queries["sort"] = "0";
                }
                if (!queries["illust_type"]) {
                    queries["illust_type"] = "0";
                }
                if (!queries["word"]) {
                    queries["word"] = "";
                }
                queries["sort"] = Number(queries["sort"]);
                queries["illust_type"] = Number(queries["illust_type"]);
                this.urlPrefix = `?sort=${queries["sort"]}&illust_type=${queries["illust_type"]}&word=${queries["word"]}`;
                this.container = "mainContainerNotLeft";
                return this.execute();
            });
        }
        favorite() {
            return __awaiter(this, void 0, void 0, function* () {
                let queries = common.getUrlVars();
                if (!queries["sort"]) {
                    queries["sort"] = 0;
                }
                queries["sort"] = Number(queries["sort"]);
                this.container = "formMethod";
                this.urlPrefix = "?sort=" + queries["sort"];
                return this.execute();
            });
        }
        execute() {
            return __awaiter(this, void 0, void 0, function* () {
                const range = this.showRangePrompt();
                if (!range) {
                    return 1;
                }
                common.showBg();
                if (~range.indexOf("-")) {
                    const ranges = range.split("-");
                    this.startPoint = Number(ranges[0]);
                    this.endPoint = Number(ranges[1]);
                    for (let i = this.startPoint; i < this.endPoint + 1; ++i) {
                        const { res, error } = yield this.scraper(this.urlPrefix + "&p=" + i);
                        if (error) {
                            return 1;
                        }
                        Array.prototype.push.apply(this.array, res);
                    }
                }
                else {
                    const { res, error } = yield this.scraper(this.urlPrefix + "&p=" + range);
                    if (error) {
                        return 1;
                    }
                    Array.prototype.push.apply(this.array, res);
                }
                if (this.array) {
                    yield this.getImg();
                    return 0;
                }
                return 1;
            });
        }
        showRangePrompt() {
            let res = window.prompt(this.promptText, "");
            if (!res) {
                return null;
            }
            res = res.replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => {
                return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
            }).replace(/(ー|－|―)/g, "-");
            if (!res.match(/^(\d+\-\d+|\d+)$/)) {
                alert("フォーマットにエラーがあります。");
                return this.showRangePrompt();
            }
            return res;
        }
        /**
         * private scraper
         * @param  {string} params - parameters for target url
         * @return  {Promise<{res?:string[],error:boolean}>}
         */
        scraper(params) {
            return __awaiter(this, void 0, void 0, function* () {
                let array = [];
                const url = "//nijie.info/" + this.target + params;
                const { data, error } = yield this.ajax(url);
                console.log(url);
                try {
                    if (error) {
                        throw new Error("thrownError");
                    }
                    let scrap = data.match(this.defaultExps[this.container]);
                    if (!scrap) {
                        throw new Error("noimg");
                    }
                    scrap = scrap[0].match(this.defaultExps[this.box]);
                    if (!scrap) {
                        throw new Error("noimg");
                    }
                    for (let s = 0; s < scrap.length; ++s) {
                        const targetId = scrap[s].match(/\d{1,7}/g)[0];
                        array.push(targetId);
                        const current = params.match(/p\=\d+/)[0].replace("p=", "");
                        $("#details").html(`<p>GETTING ILLUST SUMMARY: (${current} of ${this.startPoint ? this.endPoint - this.startPoint + 1 : current})</p>`);
                    }
                    return { res: array, error: false };
                }
                catch (e) {
                    console.log(e, e.message);
                    switch (e.message) {
                        case "noimg":
                            common.noImg();
                            break;
                        case "thrownError":
                            alert(this.commonErrorMes);
                            break;
                    }
                    return { error: true, res: [] };
                }
            });
        }
        /**
        * private getImg - get image lists
        *
        * @return {Promise<any>}
        */
        getImg() {
            return __awaiter(this, void 0, void 0, function* () {
                let urlarr = [];
                let count = 0;
                let stimes = 0;
                let processtimes = 0;
                const timer = this.array.length;
                for (let i = 0; i < timer; i++) {
                    const { data, error } = yield this.ajax("//nijie.info/view_popup.php?id=" + this.array[i]);
                    if (error) {
                        console.log(data);
                        alert(this.commonErrorMes);
                        return false;
                    }
                    if (data === null) { // when server responded with error response code
                        continue;
                    }
                    count++;
                    let j = data.match(/<div id=('|")img_window('|").*?<div id=('|")view-center('|")/g)[0].match(/('|")\/\/pic(|\d+).*?('|")/g);
                    let title = data.match(/<title>.*?<\/title>/);
                    let ogp = data.match(/<meta name="twitter:url".*?<meta name="twitter:title"/);
                    ogp = ogp[0].match(/\d{1,15}/);
                    for (let s = 0; s < j.length; s++) {
                        let datalist = new Object();
                        processtimes++;
                        datalist["id"] = ogp[0];
                        datalist["illustrator"] = title[0].replace(/(ニジエ|<title>|<\/title>)/g, "").replace(/\//g, "／").match(/ \| .*? \|/g)[0].replace(/ \| | \|/g, "").replace(/%/g, "％");
                        datalist["title"] = title[0].match(/<title>.*? \| /g)[0].replace(/(<title>| \| )/g, "").replace(/%/g, "％");
                        datalist["url"] = j[s].replace(/"/g, "");
                        datalist["cnt"] = processtimes;
                        datalist["current"] = s + 1;
                        datalist["pageSum"] = j.length;
                        $("#details").html(`<p>PROGRESS : ${count} of ${timer} completed. (${Math.round(count / timer * 100)} %)<br>${j[s]}<br>${title}</p>`);
                        if (this.geturiv.match(/storage=(2|3)/)) {
                            let existence = false;
                            this.str.push(JSON.stringify(datalist));
                            for (let i = 0; i < localStorage.length; i++) {
                                let getItem = $.parseJSON(localStorage.getItem("illust-" + ("0000" + Number(i + 1)).slice(-5)));
                                if (getItem && getItem["url"].match(j[s].replace(/__rs_l120x120\//g, ""))) {
                                    stimes++;
                                    existence = true;
                                    break;
                                }
                            }
                            if (!existence) {
                                this.setItemToStorage(datalist);
                            }
                        }
                        else {
                            urlarr.push(JSON.stringify(datalist));
                            if (count === timer) {
                                this.post(urlarr.toString());
                            }
                        }
                    }
                    if (this.geturiv.match(/storage=2/) && count == timer) {
                        this.sendSt2(stimes, processtimes);
                    }
                    else if (this.geturiv.match(/storage=3/) && count == timer) {
                        yield this.download(processtimes);
                    }
                }
            });
        }
        /**
        * private sendSt2 - description
        *
        * @param  {number} stimes
        * @param  {number} ptimes
        * @param  {string} data
        * @return {boolean} success or fail
        */
        sendSt2(stimes, ptimes) {
            const messages = {
                def: ptimes + "個の画像を追加しました。\n",
                dup: stimes + "個の重複ファイルは追加されませんでした。",
                conf: "\n現在追加されているファイル一覧をニジエダウンローダに送信しますか？\n(現在" + localStorage.length + "枚追加済み)"
            };
            const conftxt = stimes !== 0 ? messages.def + messages.dup + messages.conf : messages.def + messages.conf;
            const noconftxt = stimes !== 0 ? messages.def + messages.dup : messages.def;
            if (!this.geturiv.match("noconf=1")) {
                if (confirm(conftxt)) {
                    if (confirm("送信後、localStorageに蓄積されたファイル一覧をクリアしますか？")) {
                        localStorage.clear();
                    }
                    $("#details").html("取得に成功しました.ページを移動しています");
                    this.post(JSON.stringify(localStorage), "lang=jp&storage=2");
                }
            }
            else {
                alert(noconftxt);
            }
            common.removeBg();
            return true;
        }
        /**
        * private download - description
        *
        * @param  {number} ptimes
        * @return {boolean} success or fail
        */
        download(ptimes) {
            return __awaiter(this, void 0, void 0, function* () {
                let fname = this.geturiv.match(/&quot;.*?&quot;/)[0].replace(/&quot;/g, "");
                if (!fname) {
                    fname = "$o";
                }
                if (!this.geturiv.match("noconf=1")) {
                    if (!confirm(ptimes + "個の画像をダウンロードしますか？")) {
                        $("#_wrapper").fadeOut("slow", function () {
                            $("#_wrapper").remove();
                        });
                        return false;
                    }
                }
                let i = 0;
                let arr = new Array();
                for (let key of this.str) {
                    key = $.parseJSON(key);
                    const oname = key["url"].match(".+/(.+?)([\?#;].*)?$")[1];
                    const oid = oname.match(/.*?_/) ? oname.match(/.*?_/)[0].replace("_", "") : "unknown";
                    const fileext = oname.split(".") ? oname.split(".")[1] : "jpg";
                    const ffname = oname.split(".") ? oname.split(".")[0] : "unknown";
                    const filename = fname.replace(/\$o/g, ffname)
                        .replace(/\$r/g, common.formatDate(new Date(), "YYYYMMDD"))
                        .replace(/\$d/g, common.formatDate(new Date(), "hhmmssSSS"))
                        .replace(/\$n/, key["current"])
                        .replace(/\$s/g, key["pageSum"])
                        .replace(/\$u/g, key["illustrator"])
                        .replace(/\$l/g, oid)
                        .replace(/\$i/g, key["id"])
                        .replace(/\$t/g, key["title"]);
                    arr.push({ "filename": filename + "." + fileext, "href": key["url"] });
                    i++;
                }
                const proxy = "https://proxy.poyashi.me/?type=nijie&url=";
                if (!arr) {
                    return false;
                }
                for (let j = 0; j < arr.length; j++) {
                    $("#details").html(arr.length + "枚中" + Number(j + 1) + "枚目のダウンロードを準備しています...<br/>" + arr[j]["filename"]);
                    const res = yield fetch(proxy + arr[j]["href"], { method: "GET" });
                    if (!res.ok) {
                        alert("Invalid status code returned while processing requests.");
                        console.log(res);
                    }
                    const link = document.createElement('a');
                    link.download = arr[j]["filename"];
                    link.href = window.URL.createObjectURL(yield res.blob());
                    link.click();
                }
                $("#details").html("ダウンロードが完了しました");
                return true;
            });
        }
        /**
        * public post - description
        *
        * @param  {string} query url query parameter to send
        * @param  {string} params url parameters to set up
        * @return {boolean}       success or fail
        */
        post(query, params = "?lang=jp") {
            $('<form/>', {
                action: 'https://nijie.poyashi.me/downloader' + params,
                method: 'post'
            })
                .append($('<input/>', {
                type: 'hidden',
                name: 'q',
                value: query
            }))
                .appendTo(document.body)
                .submit();
            return true;
        }
        setItemToStorage(datalist) {
            let num = 0;
            let id;
            do {
                ++num;
                id = "illust-" + ("0000" + num).slice(-5);
                if (!localStorage.getItem(id)) {
                    break;
                }
            } while (true);
            localStorage.setItem(id, JSON.stringify(datalist));
        }
        sender() {
            let tmp;
            $("html").append("<div id='wrapper'><div id='content_downloader_wrapper'>Loading data. Please wait</div></div><img src='' id='thumbs' style='position: absolute;left: 1376px;top: 461px;display:none;z-index: 114514;border: 1px solid #777;box-shadow: 0px 0px 4px #222;'><style>" +
                "body{transition:.2s; filter:blur(0px)}" +
                "#content_downloader_wrapper button#send, #content_downloader_wrapper button.close {padding: 10px;font-family: YuGothic,'Yu Gothic',sans-serif;color: #222;width: 30%;font-weight: 500;}" +
                "#content_downloader_wrapper button#send{background-color:#e6fff9;}" +
                "#content_downloader_wrapper button.close{background-color:#dddddd;}" +
                "#content_downloader_wrapper button { background: #efefef; border: 1px solid #ccc; padding: 5px;}" +
                "#content_downloader_wrapper h1 {font-family: YuGothic,'Yu Gothic',sans-serif;font-weight: 300; border-bottom: 1px solid #888; width: 60%;margin: 5px auto 18px auto; color: #333;}" +
                "#content_downloader_wrapper table{margin:15px auto; border:1px solid #ccc;}" +
                "#content_downloader_wrapper{border:1px solid #222; box-shadow:0px 0px 4px #ccc; border-radius:2px; width:80%; height:80%; overflow-y:scroll; padding:15px; background:#fff; color:#222;}" +
                "#wrapper{text-align:center;position:fixed;z-index:9999; top:0; opacity:1; color:#aaa;background:rgba(65,65,65,0.85);width:100%;height:100%;display:flex; flex-direction:column; justify-content:center;align-items:center;}" +
                ".pcursor{cursor:pointer !important;}" +
                "</style>");
            $("body").css("filter", "blur(15px)");
            $("#wrapper").fadeIn();
            if (this.geturiv.match("noconf=1") && localStorage.length > 0) {
                tmp = "<h1>Confirm</h1><p class='sure'>" + localStorage.length + "個のアイテムをダウンローダに送信します。</p><p><button id='send'>Send</button> <button class='close'>Close</button></p><p style='user-select:none;'><input type='checkbox' class='daias pcursor' id='daias'><label for='daias'>送信後に保存されたデータを削除</label></input> | <a class='delallitems pcursor'>保存されたデータを削除</a><table><tr><td>Title</td><td>Illustrator</td><td>Id</td><td>Url</td><td>Delete</td></tr>";
                for (let illust in localStorage) {
                    if (localStorage.getItem(illust) && illust.match(/illust/)) {
                        const illustr = $.parseJSON(localStorage.getItem(illust));
                        tmp += "<tr><td>" + illustr["title"] + "</td><td>" + illustr["illustrator"] + "</td><td><a href='http://nijie.info/view.php?id=" + illustr["id"] + "' target='_blank'>" + illustr["id"] + "</a></td><td><a href='http:" + illustr["url"] + "' target='_blank' class='thumb'>http:" + illustr["url"] + "</a></td><td><button class='delbtn' id='" + illust + "'>Delete</button></td></tr>";
                    }
                }
                tmp += `</table><a href='#' class='close'>× Close</a><p>Nijie Downloader - <a href='https://nijie.poyashi.me/' target='_blank'>nijie.poyashi.me</a> powered by <a href='http://twitter.com/#!/_2r5' target='_blank'>@_2r5</a></p>`;
            }
            else if (this.geturiv.match("noconf=1") && localStorage.length == 0) {
                tmp = "<h1>Error</h1><p class='sure'>キューされたアイテムが存在しません。</p><a class='close' style='cursor:pointer;'>Close</a>";
            }
            else {
                tmp = "<h1>Error</h1><p class='sure'>パラメータの値が不正です。<br>storage=<i>Number</i> および noconf=<i>Number</i> を指定し、ページを再読込してください。 </p><a class='close' style='cursor:pointer;'>Close</a>";
            }
            $("#content_downloader_wrapper").html("");
            $("#content_downloader_wrapper").append(tmp);
            return 0;
        }
    };
    const common = new commonFunc();
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            const _destruct = () => {
                common.removeBg();
                main.destructor();
            };
            if (!window.location.href.match("nijie.info")) {
                return alert("対応サイト上でのみ本ブックマークレットをお使いいただけます。");
            }
            const currentPage = window.location.href.match(".+/(.+?)([\?#;].*)?$")[1];
            const main = new mainFunc();
            main.setTarget(currentPage);
            try {
                const res = () => __awaiter(this, void 0, void 0, function* () {
                    switch (currentPage) {
                        case "view_popup.php":
                        case "view.php": return yield main.view();
                        case "like_user_view.php": return yield main.likeduser();
                        case "members_illust.php":
                        case "members_dojin.php": return yield main.userpage();
                        case "okiniiri.php": return yield main.favorite();
                        case "illust_view.php": return yield main.illustview();
                        case "user_like_illust_view.php": return yield main.likeview();
                        case "okazu.php": return yield main.okazu();
                        case "search.php":
                        case "search_all.php":
                        case "search_dojin.php": return yield main.search();
                        case "index.php":
                        case "nijie.info/": return main.sender();
                        default: return 2;
                    }
                });
                res().then(res => {
                    if (res === 2) {
                        alert("このページには対応していません。");
                    }
                    _destruct();
                });
            }
            catch (e) {
                alert("エラーが発生したため処理を続行できません。\nコンソールを確認してください。");
                console.log(e);
                _destruct();
            }
            return 0;
        });
    }
    init();
    const nijieDLTopsend = () => {
        var dataTmp = JSON.stringify(localStorage);
        if ($(".daias").is(":checked")) {
            localStorage.clear();
        }
        const main = new mainFunc();
        main.post(dataTmp, "?lang=jp&storage=2");
    };
    $(document).on("click", "#send", () => nijieDLTopsend());
    $.fn.thumbnail = function () {
        return this.each(() => {
            $(this).hover((e) => {
                $("#thumbs").attr("src", $(":hover")[7]["href"].replace("nijie.info/", "nijie.info/__rs_l120x120/"));
                $("#thumbs").css("left", e.pageX + 10);
                $("#thumbs").css("top", e.pageY + 10);
                $("#thumbs").show();
            }, function () {
                $("#thumbs").hide();
            });
        });
    };
    $(".thumb").thumbnail();
    $(document).on("click", ".delallitems", () => {
        const delAllItems = () => {
            localStorage.clear();
            const errmes = `<h1>Error</h1><p class="sure">キューされたアイテムが存在しません。</p><a class="close" style="cursor:pointer;">Close</a>`;
            $("#content_downloader_wrapper").html(errmes);
        };
        if (confirm("キューされたアイテムを削除しますか？")) {
            delAllItems();
        }
    });
    $(document).on("click", ".delbtn", function () {
        if (confirm("このアイテムをリストから削除しますか?")) {
            localStorage.removeItem($(this).attr("id"));
            $("#" + $(this).attr("id")).parent().parent().remove();
            $(".sure").html(localStorage.length + "個のアイテムをダウンローダに送信します。");
            if (localStorage.length == 0) {
                const errmes = '<h1>Error</h1><p class="sure">キューされたアイテムが存在しません。</p><a class="close" style="cursor:pointer;">Close</a><script>$(".close").on("click",function(){$("body").css("filter","blur(0px)"); $("#wrapper").fadeOut("slow",function(){$("#wrapper").remove();})});</script>';
                $("#content_downloader_wrapper").html(errmes);
            }
        }
    });
}));
