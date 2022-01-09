 rl.js

 燃旅export RL_rlURL= access_token=&user_token=&client=1&member_id=&redouble=1&video_id=117318
点击 http://ran.lvfacn.com/pages/share/invit?to_user_id=232726 下载 或者appstore搜索 燃旅
定时 1小时一次   收益均0.5  登录必须插卡登录 提现必须绑定支付宝提现   实名需要 支付宝姓名与身份证号码匹配 不需要与手机号实名匹配，证件照随意(啥意思自己猜)
1 条ck 默认支持代理软件以及v2p获取ck
 
无法获取ck的自己抓包任意一条包含 access_token和user_token 的 url 即可

昵称自行修改，若包含 用户 二字，则脚本自动修改为手机号

hostname = ranlv.lvfacn.com
############## 圈x   
#燃旅获取url
https://ranlv.lvfacn.com/api.php/* url script-request-header https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/rl.js

############## loon
#燃旅获取url
http-request https://ranlv.lvfacn.com/api.php/* script-path=https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/rl.js,requires-header=true, tag=燃旅获取url

############## surge
#燃旅获取url
燃旅获取url = type=https://ranlv.lvfacn.com/api.php/*,script-path=https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/rl.js