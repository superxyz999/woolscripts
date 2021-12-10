 mmsp.js
 
 收益 ： 0.3-0.5/天, 满1元可提现

软件下载地址:   http://ran.lvfacn.com/pages/share/invit?to_user_id=1403031

软件需求:

提现需要绑定支付宝 实名身份证号和支付宝姓名匹配,

身份证照片随意,网上找也可以

进app后记得修改一下昵称

食用方法：
青龙   （其他请自行研究）

以上可以OK的，可以往下看了，不OK的请跳过

变量需求:
抓包
苹果用stream，安卓用小黄鸟

还不会抓包的请站内自行搜索解决。

抓任意一条连接 其中请求中包含 access_token= 和 user_token= 即可 


刷分享阅读变量

分享一个视频复杂链接,粘贴到微信或者QQ或者其他地方会看到链接中有 to_user_id= 的值填变量


获得以上参数后，开始填写变量

变量填写
变量名：   RL_body

变量值：   access_token值&user_token值&to_user_id值

如:f2***a7&ey***aM&14**31

添加任务：   task mmsp.js

定时 ： 自定吧，每天跑5次，一天的任务差不多就完成了。

rl.js
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