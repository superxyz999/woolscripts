`jrttjsb.js`
老用户每天几毛，新用户可能收益高点
普通版定时： 1-59/15 6-23 * * *
激进版定时： 1-59/5 * * * *
多用户跑的时间会久一点，自己看着改定时吧

V2P重写：
[task_local]
#今日头条极速版
1-59/15 6-23 * * *  https://raw.githubusercontent.com/leafxcy/JavaScript/main/jrttjsb.js, tag=今日头条极速版, enabled=true
[rewrite_local]
luckycat/lite/v1/task/page_data url script-request-header https://raw.githubusercontent.com/leafxcy/JavaScript/main/jrttjsb.js
[MITM]
hostname = i.snssdk.com //安卓版
hostname = api3-normal-lq.toutiaoapi.com //IOS版

青龙把极速版捉包里面的cookie放到jrttjsbHeader里，多账户用@隔开

增加了一个每日阅读奖励，我的号做完10次有1000金币

自定义农场和种树任务：现在默认不做，收益太低，需要做的，把变量jrttjsbFarm填为1
增加自定义每次运行阅读文章的数量：填到变量jrttjsbReadNum，不填默认10篇
自己修改jrttjsbReadNum之后可以灵活定时，群里有3分钟跑一次的，半天8000+阅读金币，不过我不建议哈

增加了一个推送奖励，应该是每天20次，做完有2000金币