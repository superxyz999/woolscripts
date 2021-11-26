dsj-new.js
电视家已经更新，自行更新js和boxjs    默认不提现，请自行设置，   随机提现正常，固定提现增加了个概率性，后续看情况调整

{
    "userid": "",
    "randTx": "",
    "tx00031": "",
    "tx000041": "",
    "tx0030": "",
    "tx00025": "",
    "tx00005": "",
    "tx00006": ""
}

提现ck格式如上，


重写不变，可自动获取
http://api.gaoqingdianshi.com/api/* url script-request-header https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/dsj.js


环境变量为  DSJ_dsjTX

建议定时设置在11.57以及19.57之后   以及21点以后

每天跑满10次
抓包CK格式 http://api.gaoqingdianshi.com/api/v2/cash/withdrawal?  这个 ? 后面的所有就是提现CK                                       {
    "userid": "000000000000",
    "randTx": "code=randTx&rs=xxxxxx&sign=xxxxxxx",
    "tx00031": "code=tx00031&rs=xxxxxx&sign=xxxxxxx",
    "tx000041": "code=tx000041&rs=xxxxxx&sign=xxxxxxx",
    "tx0030": "code=tx0030&rs=xxxxxx&sign=xxxxxxx",
    "tx00025": "code=tx00025&rs=xxxxxx&sign=xxxxxxx",
    "tx00005": "code=tx00005&rs=xxxxxx&sign=xxxxxxx",
    "tx00006": "code=tx00006&rs=xxxxxx&sign=xxxxxxx"
}