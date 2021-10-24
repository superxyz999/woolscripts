
/*
Zack

软件名称：中青看点极速版极速版

万分感谢！！

cron 每半个小时执行一次

[MITM]
hostname = user.youth.cn


*/
const $ = new Env("中青看点极速版-看看赚");
const apiUrl = 'https://user.youth.cn/v1/Nameless/adlickstart.json' //重写目标 zq_speed_kkz.js
const apiFinishUrl = 'https://user.youth.cn/v1/Nameless/bannerstatus.json'
const apiEndUrl = 'https://user.youth.cn/v1/Nameless/adlickend.json'

const notify = $.isNode() ? require('./sendNotify') : '';
message = ""
/**
 * @type string
 */
let zqspeedkkz = $.isNode() ? (process.env.zqspeedkkz ? process.env.zqspeedkkz : "") : ($.getdata('zqspeedkkz') ? $.getdata('zqspeedkkz') : "")
/**
 * @type string[]
 */
let zqspeedkkzArr = []
let zqspeedCKArr = []
// let zqspeedkkzs = ""
const qdheader = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': '482',
    'Host': 'user.youth.cn',
    'Origin': 'https://user.youth.cn',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors'
};

if (zqspeedkkz) {
    if (zqspeedkkz.indexOf("@") == -1) {
        zqspeedkkzArr.push(zqspeedkkz)
    } else {
        zqspeedkkzArr = zqspeedkkz.split("@")
        console.log(zqspeedkkzArr.length)
    }
} else if ($.isNode()) {
    var { readFileSync, existsSync } = require("fs");
    var fileName = 'zqspeedkkz.txt'
    if (existsSync(fileName))
        zqspeedkkz = readFileSync("zqspeedkkz.txt", "utf8");
    if (zqspeedkkz !== `undefined`) {
        zqspeedkkzArr = zqspeedkkz.split("@");
    }
}
//移除集合中的空字符
zqspeedkkzArr = zqspeedkkzArr.filter(Boolean)

// var time1 = Date.parse(new Date()).toString();
// time1 = time1.substr(0, 10);

// zqspeedkkzArr.forEach(x => {
//     var body = JSON.parse(x)
//     var boxBody = `uid=${body.uid}&token=${body.token}&token_id=${body.token_id}&app_version=2.5.2&openudid=2845f0c4d21cf94b&channel=c6004&device_id=34352522&device_model=MIX2&device_brand=XIAOMI&resolution=1080*2160&os_version=28&is_wxaccount=1&active_channel=c6004&access=wifi&v=1635069733773&request_time=1635069745&id=0&sign=0b606c7c591aca2608131baaa71cb024`
//     if (zqspeedCKArr.findIndex(x => x == body.token))
//         zqspeedCKArr.push(x)
// })
//获取body,ck
if (typeof $request !== "undefined") {
    getzqspeedkkz()
    $.done()
}
else {
    if (zqspeedkkzArr.length <= 0) {
        $.msg($.name, '【提示】请点击看看赚以获取body，明天再跑一次脚本测试', '不知道说啥好', {
            "open-url": "给您劈个叉吧"
        });
        $.done()
        // throw new Error("Something went badly wrong!");
    }
    else
        !(async () => {
            console.log(`共${zqspeedkkzArr.length}个看看赚`)
            for (let k = 0; k < zqspeedkkzArr.length; k++) {
                $.message = ""
                // console.log(`${zqspeedkkz1}`)
                console.log(`--------第 ${k + 1} 个看看赚任务执行中--------\n`)
                await dozqspeedkkz(zqspeedkkzArr[k])
                await $.wait(1000);
                console.log("\n\n")
            }

            // date = new Date()
            // if ($.isNode() && date.getHours() == 11 && date.getMinutes() < 10) {
            //     if (message.length != 0) {
            //         await notify.sendNotify("中青看点极速版看看赚", `${message}\n\n shaolin-kongfu`);
            //     }
            // } else {
            //     $.msg($.name, "", message)
            // }

        })()
            .catch((e) => $.logErr(e))
            .finally(() => $.done())
}

//获取看看赚body
function getzqspeedkkz() {
    if ($request.url.indexOf(apiUrl) != -1) {
        bodyVal = $request.body
        var bodyObj = parseQueryParas(bodyVal)
        $.log(`${$.name}获取看看赚: 成功, zqspeedkkzs: ${bodyVal}`);
        // if (zqspeedkkz) {
        var findIndex = isExists(bodyObj.uid, bodyObj.task_id)
        if (findIndex != -1) {
            zqspeedkkzArr[findIndex] = bodyVal
            $.log("此看看赚请求已存在，本次将更新")
        } else
            zqspeedkkzArr.push(bodyVal)

        $.setdata(zqspeedkkzArr.join('@'), 'zqspeedkkz');
        $.msg($.name, "获取第" + zqspeedkkzArr.length + "个看看赚请求: 成功🎉", ``)
    }
}

//看看赚
function dozqspeedkkz(ck, timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: apiUrl,
            headers: qdheader,
            body: ck,
        }
        $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if (result.success === true) {
                    console.log('\n激活看看赚任务成功')
                    comstate = result.items.complete_state
                    if (comstate === 1) {
                        console.log('\n任务: ' + result.items.banner_id + '已完成，跳过')
                    } else {
                        $.log("任务开始，" + result.items.banner_id + result.message);
                        for (let j = 0; j < result.items.see_num - result.items.read_num; j++) {
                            $.log("任务执行第" + parseInt(j + 1) + "次")
                            await $.wait(8000);
                            await dozqspeedkkzread(ck)
                        }
                        await $.wait(10000);
                        await reward(ck)
                    }

                } else {
                    console.log('\n激活看看赚任务失败')
                    smbody = $.getdata('zqspeedkkz').replace(ck + "@", "");
                    $.setdata(smbody, 'zqspeedkkz');
                    console.log("该看看赚任务已自动删除")
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}
function dozqspeedkkzread(ck, timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: apiFinishUrl,
            headers: qdheader,
            body: ck,
        }//xsgbody,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if (result.success === true) {
                    console.log('\n浏览看看赚文章成功')
                } else {
                    console.log('\n浏览看看赚文章失败')
                }

            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//看看赚奖励
function reward(ck, timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: apiEndUrl,
            headers: qdheader,
            body: ck
        }//xsgbody,}
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if (result.items.score !== "undefined") {
                    console.log('\n看看赚获得：' + result.items.score + '金币')
                } else {
                    console.log('\n领取奖励失败')
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

function openbox(id, zq_cookie1, timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: 'https://kandian.wkandian.com/WebApi/Nameless/getBoxReward?id=' + id + '&' + zq_cookie1,
            headers: {
                'Host': 'kandian.wkandian.com',
                //'Referer': 'https://kandian.wkandian.com/h5/20190527watchMoney/?' +zq_cookie1
                'Referer': 'https://kandian.wkandian.com/h5/20190527watchMoney/?keyword_wyq=woyaoq.com&access=WIFI&app-version=8.1.2&app_version=8.1.2&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c1005&' + zq_cookie1
            },
        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)
                if (result.status == 1) {
                    console.log(result.data)
                } else {
                    console.log(result)
                }
            } catch (e) {
            } finally {
                resolve()
            }
        }, timeout)
    })
}

function isExists(uid, taskid) {
    var regex = new RegExp(`(?=.*uid=${uid})(?=.*task_id=${taskid})^.*$`, "gm");
    for (let index = 0; index < zqspeedkkzArr.length; index++) {
        const element = zqspeedkkzArr[index];
        if (regex.test(element))
            return index
    }
    return -1
}

function getQueryPara(url) {
    var strParse = url.substr(url.indexOf('?') + 1)
    return strParse
}
function parseQueryParas(urlorparas) {
    var strParse = urlorparas.substr(urlorparas.indexOf('?') + 1)
    // const urlSearchParams = new URLSearchParams(strParse);
    // const params = Object.fromEntries(urlSearchParams.entries());
    const params = JSON.parse('{"' + decodeURI(strParse).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    return params;
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }