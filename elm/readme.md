APP : 饿了么
饿了么吃货豆，需要点外卖同学的福利
脚本说明：目前只支持部分任务，500，1000吃货豆换无门槛外卖红包
圈X重写：https://h5.ele.me/svip/task-list url script-request-header https://gitee.com/xiecoll/radish-script/raw/master/ELM/lb_elm.js
青龙环境变量  export elmck='.............'
抓包 h5.ele.me 域名下的任何url 请求头中的Cookie，饿了么小程序的Cookie好像也可以
获取数据 饿了么App->我的-> 赚吃货豆
 多账户 @
！！本次更新：增加推送，获取优惠券显示！！
脚本 
脚本更新命令：ql repo https://gitee.com/xiecoll/radish-script.git "ELM|lb_elm" "sendNotify"

抓包：
https://h5.ele.me/ 登录进去后，F12截取cookie可以跑起来，不用管安卓或ios了
cron：
5 12,18 * * * 