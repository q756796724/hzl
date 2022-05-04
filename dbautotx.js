//duobaoAutoTx
var versionNum = "v1.0.0";
auto.waitFor()//检查无障碍服务是否已经启用，会在在无障碍服务启动后继续运行。

toastLog(device.brand);
toastLog("版本号:" + versionNum);
storage = storages.create("fanqiecloud配置");
var dbTodayTxCount=storage.get("dbTodayTxCount", 0);
var thread = threads.start(function () {
    setInterval(() => { }, 1000);
});

var w = floaty.rawWindow(
    <frame gravity="center">
        <text id="text">。 。 。</text>
    </frame>
);
w.setPosition(500, 50);
app.launch("com.frp.fun");
sleep(20000)
for (; ;) {
    var nowHour = new Date().getHours();
    if (storage.get("date", new Date().toLocaleDateString()) != new Date().toLocaleDateString()) {
        toastLog("初始化配置");
        storage.put("date", new Date().toLocaleDateString());
        storage.put("dbTodayTxCount", 0);
    }
    if (currentPackage() == "com.frp.fun") {

        let cBtn = packageName("com.frp.fun").id('ll_tab_two').findOnce()
        if (cBtn != null) {
            cBtn.click()
            sleep(10000)
            log(packageName("com.frp.fun").id('loginwxbtn').find().length)
        }
        cBtn = packageName("com.frp.fun").id('ll_tab_five').findOnce()
        if (cBtn != null) {
            cBtn.click()
            sleep(10000)
            if ((nowHour > 15  &&nowHour < 20&& dbTodayTxCount < 1) || (nowHour > 17 &&nowHour < 20 && dbTodayTxCount < 2)|| (nowHour > 19 &&nowHour < 20 && dbTodayTxCount < 3)) {
                cBtn = packageName("com.frp.fun").id('tixianlayout').findOnce()
                if (cBtn != null) {
                    dbTodayTxCount++
                    storage.put("dbTodayTxCount", dbTodayTxCount);
                    cBtn.click()
                    sleep(5000)
                    cBtn = packageName("com.frp.fun").id('moneyedit').findOnce()
                    if (cBtn != null) {
                        cBtn.click()
                        sleep(2000)
                        setText(100)
                        sleep(4000)
                        cBtn = packageName("com.frp.fun").id('tixianbtn').findOnce()
                        if (cBtn != null) {
                            cBtn.click()
                            sleep(4000)
                            click("确定")
                            sleep(4000)
    
                            click("确定")
                            sleep(4000)
                            back()
                            sleep(4000)
                            back()
                            sleep(4000)
                            back()
                        }
                    }
                }
            }
        }
    }
    sleep(300000)
}





