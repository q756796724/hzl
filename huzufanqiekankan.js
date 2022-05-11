"ui";

storage = storages.create("fanqiekankan配置");
zwifi = storage.get("zwifi", "XiaoMiWifi");
dlwifi = storage.get("dlwifi", "XiaoMiWifi_5G");
auto_tx = storage.get("auto_tx", false);
//readurl = storage.get("readurl", "");
readurl = "";
//xianzhidate = storage.get("xianzhidate", "2022-03-20");//限制时间
if (storage.get("xianzhidays") == undefined) {//限制天数
    storage.put("xianzhidays", 0);
}
xianzhidays = storage.get("xianzhidays");
ui.layout(
    <vertical padding="16">
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" />
        <text textSize="16sp" textColor="black" text="请输入主Wifi" />
        <input id="zwifi" text="{{zwifi}}" />
        <text textSize="16sp" textColor="black" text="请输入代理Wifi" />
        <input id="dlwifi" text="{{dlwifi}}" />
        <text textSize="16sp" textColor="black" text="url" />
        <input id="readurl" text="{{readurl}}" />
        <checkbox text="tx" id="auto_tx" checked="{{auto_tx}}" textSize="18sp" />\
        <button id="ok" text="开始运行" />
    </vertical>

);





//隐藏ui
//activity.moveTaskToBack(true);

ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});
setTimeoutA = setTimeout(() => {
    ui.ok.click()
}, 30000);
//指定确定按钮点击时要执行的动作
ui.ok.click(function () {
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    threads.start(function () {
        //这里写你的流程代码
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









        var topPackage = "";
        var topActivity = "";

        var MAIN_PKG = "com.fanqie.cloud";
        var PKG_NAME = "com.tencent.mm";
        var MAIN_PAGE = "com.tencent.mm.ui.LauncherUI";
        var versionNum = "v3.0.4";
        var readNum = 0;//最近获取到的阅读次数
        var retryCount = 0;//进入页面重试次数
        var todayTxCount = 0;
        var totificationlistenersetting = function (actionname) {
            try {
                let i = app.intent({
                    action: "android.settings.WIFI_SETTINGS",
                    flags: ["activity_new_task"]
                    // data: "file:///sdcard/1.png"
                });
                context.startActivity(i);
            } catch (err) {
                console.error("错误原因:" + err);
            }
        }

        function refreshStateInfo() {

            sleep(1000);
            topPackage = currentPackage();
            sleep(1000);
            topActivity = currentActivity();
            //log("==> topPackage: " + topPackage);
            //log("==> topActivity: " + topActivity);
        }
        function clickx(x, y) {
            x = x + random(-5, -1)
            y = y + random(-5, -1)
            click(x < 0 ? 1 : x, y < 0 ? 1 : y)
        }

        var 悬浮窗 = floaty.window(
            <frame id="jbkz" h="auto" w="auto" gravity="center" bg="#77ff0000">
                <button id="console" text="暂停" />
            </frame>
        );

        悬浮窗.setPosition(10, device.height / 2);   //设置位置（x，y）
        悬浮窗.setAdjustEnabled(true);   //显示调节位置控件
        悬浮窗.exitOnClose();   //关闭悬浮窗时自动结束脚本运行

        /*var 悬浮窗2 = floaty.rawWindow(
            <frame  gravity="center" bg="#40808080">
                 <vertical>
        
                 <text text="日志" />
        
        <com.stardust.autojs.core.console.ConsoleView id="consoleView" layout_weight="1" />
                 </vertical>
                 
            </frame>
        );*/

        /*
        // 设置控制台字体颜色
        let c = new android.util.SparseArray();
        
        let Log = android.util.Log;
        
        c.put(Log.VERBOSE, new java.lang.Integer(colors.parseColor("#dfc0c0c0")));
        
        c.put(Log.DEBUG, new java.lang.Integer(colors.parseColor("#cc000000")));
        
        c.put(Log.INFO, new java.lang.Integer(colors.parseColor("#ff64dd17")));
        
        c.put(Log.WARN, new java.lang.Integer(colors.parseColor("#ff2962ff")));
        
        c.put(Log.ERROR, new java.lang.Integer(colors.parseColor("#ffd50000")));
        
        c.put(Log.ASSERT, new java.lang.Integer(colors.parseColor("#ffff534e")));
        
        悬浮窗2.consoleView.setColors(c);
        悬浮窗2.consoleView.setConsole(runtime.console);
        悬浮窗2.setTouchable(false);
        悬浮窗2.setSize(-1, device.height / 1.3);*/
        var logDemo = ('<vertical id="win"  bg="#80000000" h="{{Math.floor(device.height *0.7)}}px" >\
     <View bg="#00ccff" h="1px"  w="{{Math.floor(device.width*0.8)}}px"  />\
        <text  id="wz" textColor="#FFFFFFFF" textSize="12" textStyle="bold" text=""  textIsSelectable="true"  maxliness="1"  />\
    <View bg="#00ccff" h="1px" textSize="10"  w="{{Math.floor(device.width*0.8)}}px" />\
    <com.stardust.autojs.core.console.ConsoleView    id="consoleLog"   />\
</vertical>');
        var console_arr = android.util.SparseArray();
        console_arr.put(android.util.Log.VERBOSE, java.lang.Integer(colors.parseColor("#ffa500")));
        console_arr.put(android.util.Log.DEBUG, java.lang.Integer(colors.parseColor("#ffffff")));
        console_arr.put(android.util.Log.INFO, java.lang.Integer(colors.parseColor("#64dd17")));
        console_arr.put(android.util.Log.WARN, java.lang.Integer(colors.parseColor("#00ddff")));
        console_arr.put(android.util.Log.ERROR, java.lang.Integer(colors.parseColor("#ff0000")));
        console_arr.put(android.util.Log.ASSERT, java.lang.Integer(colors.parseColor("#ffff534e")));
        var 悬浮窗2 = floaty.rawWindow(logDemo);
        ui.run(function () { 悬浮窗2.consoleLog.findViewById(context.getResources().getIdentifier("input_container", "id", context.getPackageName())).setVisibility(8); });
        悬浮窗2.consoleLog.setColors(console_arr);
        悬浮窗2.consoleLog.setConsole(runtime.console);
        悬浮窗2.setTouchable(false);
        悬浮窗2.setPosition(0, device.height * 0.1);

        setInterval(() => { }, 1000);






        //指定确定按钮点击时要执行的动作
        悬浮窗.console.click(function () {
            反状态 = 悬浮窗.console.getText();  //获得id="console"的按钮的文字
            if (反状态 == "暂停") {
                toast("脚本已暂停");
                ui.run(function () {
                    悬浮窗.console.setText("开始");  //设置按钮文本
                });
            } else {
                toast("脚本已继续");
                ui.run(function () {
                    悬浮窗.console.setText("暂停");
                });
            }
        });
        function kz() {
            while (1) {
                反状态 = 悬浮窗.console.getText();
                //log(反状态)
                if (反状态 == "开始") {//反状态为开始时，脚本要暂停，即被阻塞
                    toastLog("脚本暂停中");
                    sleep(2000) //这个只影响主程序，就是你可以在这期间点开始运行，在sleep结束后，主程序会继续运行
                } else {//反状态为暂停时，脚本要运行，即跳出死循环
                    break
                }
            }
        }
        String.prototype.TextFilter = function () {
            //[]内输入你要过滤的字符，这里是我的
            let pattern = new RegExp("[`~!@#^=''?~《》！@#￥……&——‘”“'？*()（）〔〕，,。、<>； ％%]");
            let rs = "";
            for (let i = 0; i < this.length; i++) {
                rs += this.substr(i, 1).replace(pattern, '');
            }
            return rs;
        }

        //获取接收人数
        function getjieshouCount() {
            let temp = null;
            try {
                temp = http.get("106.55.225.58:8081/fanqie/getjieshouCount");
                if (temp && temp.statusCode == 200) {
                    temp = temp.body.string();
                    let rep = JSON.parse(temp);
                    let repState = rep["state"];
                    if (repState == 1) {
                        let repData = rep["data"];
                        return repData
                    } else {
                        console.warn("getjieshouCount获取数据失败" + temp);
                    }
                }
            } catch (err) {
                console.error("getjieshouCount报错,原因:" + err);
            }

        }
        //增加接收人数
        function addjieshouCount() {
            let temp = null;
            try {
                temp = http.get("106.55.225.58:8081/fanqie/addjieshouCount");
                if (temp && temp.statusCode == 200) {
                    temp = temp.body.string();
                    let rep = JSON.parse(temp);
                    let repState = rep["state"];
                    if (repState == 1) {
                        let repData = rep["data"];
                        return repData
                    } else {
                        console.warn("addjieshouCount获取数据失败" + temp);
                    }
                }
            } catch (err) {
                console.error("addjieshouCount报错,原因:" + err);
            }

        }
        //减少接收人数
        function reducejieshouCount() {
            let temp = null;
            try {
                temp = http.get("106.55.225.58:8081/fanqie/reducejieshouCount");
                if (temp && temp.statusCode == 200) {
                    temp = temp.body.string();
                    let rep = JSON.parse(temp);
                    let repState = rep["state"];
                    if (repState == 1) {
                        let repData = rep["data"];
                        return repData
                    } else {
                        console.warn("reducejieshouCount获取数据失败" + temp);
                    }
                }
            } catch (err) {
                console.error("reducejieshouCount报错,原因:" + err);
            }

        }

        function getConfig() {
            let temp = null;
            try {
                temp = http.get("106.55.225.58:8081/fanqie/getConfig");
                if (temp && temp.statusCode == 200) {
                    temp = temp.body.string();
                    let rep = JSON.parse(temp);
                    let repState = rep["state"];
                    if (repState == 1) {
                        let repData = rep["data"];
                        return repData
                    } else {
                        console.warn("getConfig获取数据失败" + temp);
                    }
                }
            } catch (err) {
                console.error("getConfig报错,原因:" + err);
            }

        }
        function setConfig(lastTalkName, lastLinkTitle) {
            let temp = null;
            log(new Date().toLocaleString() + "-" + "-----------------发言人:" + lastTalkName + ",标题:" + lastLinkTitle);
            try {
                temp = http.postJson("106.55.225.58:8081/fanqie/setConfig", {
                    "lastTalkName": lastTalkName,
                    "lastLinkTitle": lastLinkTitle
                });
                if (temp && temp.statusCode == 200) {
                    temp = temp.body.string();
                    let rep = JSON.parse(temp);
                    let repState = rep["state"];
                    if (repState == 1) {
                        return true
                    } else {
                        console.warn("setConfig失败" + temp);
                        return false
                    }
                }
                return false
            } catch (err) {
                console.error("setConfig报错,原因:" + err);
                return false
            }

        }
        function fenxiangwenzhang(name) {
            if (havejieshouren(2) == false) {
                return
            }
            sleep(random(2000, 3000));
            let repData = getjieshouCount()
            if (repData != undefined && repData["jieshouCount"] != undefined && repData["jieshouCount"] > 0) {
                let cBtn = packageName("com.tencent.mm").id("js_bottom_share_btn").className("android.widget.Button").findOne(3000)
                if (cBtn != null) {
                    sleep(random(1000, 2000));
                    cBtn.click();
                    log("底部fenxiang1");
                } else {
                    cBtn = packageName("com.tencent.mm").className("android.widget.Button").text("分享").findOne(2000)
                    if (cBtn != null) {
                        sleep(random(2000, 3000));
                        cBtn.click();
                        log("底部fenxiang2");
                    } else {
                        log("2")
                        cBtn = packageName("com.tencent.mm").className("android.widget.ImageView").desc("返回").findOnce();
                        if (cBtn != null && cBtn.parent() != null && cBtn.parent().clickable()) {
                            sleep(random(2000, 3000));
                            click(device.width - random(1, 10), cBtn.bounds().bottom - random(1, 5));;
                            log("按右上fenxiang");
                        } else {
                            console.error("寻找fenxiang失败")
                            return false
                        }
                    }
                }
                cBtn = packageName("com.tencent.mm").className("android.widget.TextView").text("发送给朋友").findOne(4000);
                if (cBtn != null && cBtn.parent() != null && cBtn.parent().clickable()) {
                    sleep(random(2000, 3000));
                    cBtn.parent().click();
                    cBtn = packageName("com.tencent.mm").className("android.widget.TextView").text(name).findOne(5000);
                    if (cBtn != null && cBtn.parent() != null && cBtn.parent().clickable()) {
                        sleep(random(2000, 3000));
                        cBtn.parent().click();
                        cBtn = packageName("com.tencent.mm").className("android.widget.Button").text("发送").findOne(2000);
                        if (cBtn != null && cBtn.clickable()) {
                            sleep(random(2000, 3000));
                            cBtn.click();
                            return true
                        }
                    } else {
                        console.error("发送给" + name + "失败");
                        back();
                        return false
                    }
                } else {
                    console.error("notfound发送给朋友");
                    return false
                }
            } else {
                log("havejieshouren1false")
                return false
            }
        }
        function jieshouwenzhang() {
            //进入指定群，接收文章
            if (联网验证(zwifi) != true) {
                连接wifi(zwifi, 5000);
                app.launch(PKG_NAME);
            }

            返回v首页();

            refreshStateInfo();
            let wBtn = packageName("com.tencent.mm").className("android.widget.TextView").text("通讯录").findOne(3000);
            if (topActivity == MAIN_PAGE && wBtn != null) {
                log("返回首页成功");
                wBtn = className("android.widget.TextView").text("微信").findOne(3000);
                try {
                    for (let i = 0; i < 8; i++) {
                        if (wBtn != null && wBtn.clickable()) {
                            wBtn.click();
                            if (packageName("com.tencent.mm").id("nk").className("android.widget.TextView").textMatches(/(微信.*)/).findOne(5000) != null) {
                                break;
                            };
                        } else {
                            wBtn = wBtn.parent();
                        }
                    }
                } catch (e) {
                    log(wBtn)
                    if (wBtn != null) {
                        wBtn.click();
                    }

                }

            }
            wBtn = packageName("com.tencent.mm").id('a4k').findOnce();//8.0.10
            if (wBtn==null) {
                wBtn = packageName("com.tencent.mm").id('bg1').findOnce();//8.0.1
            }
            if (wBtn != null) {
                sleep(1000)
                wBtn.click();
                sleep(3000);
                wBtn = packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(大家庭.*)/).findOne(5000);//id=ipv
                if (wBtn != null) {
                    addjieshouCount()
                    let icount = random(360, 400) //random(720, 840);
                    let latestTalkName = "";//当前发言人
                    let latestLinkTitle = "";//当前文章的标题
                    let latestLink;//当前文章
                    let news = packageName("com.tencent.mm").className("android.widget.ListView").findOne(5000);
                    if (news != null && news.children() != null) {
                        let newsList = news.children();
                        if (newsList.length > 0) {
                            //最新消息
                            let latestNews = newsList[newsList.length - 1];
                            if (latestNews.className() == "android.widget.RelativeLayout") {
                                latestNews.children().forEach(function (child) {
                                    if (child.className() == "android.widget.ImageView" && child.desc()) {
                                        latestTalkName = child.desc();
                                        latestTalkName = latestTalkName.TextFilter()
                                    }
                                    if (child.className() == "android.widget.FrameLayout") {
                                        latestLink = child;
                                        latestLinkTitle = child.children()[0].text();
                                        latestLinkTitle = latestLinkTitle.TextFilter()
                                    }
                                })
                            }
                        }
                    }
                    if (latestTalkName == "" && latestLinkTitle == "") {
                        console.error(new Date().toLocaleString() + "-" + "-----------------当前发言人:" + latestTalkName + ",当前标题:" + latestLinkTitle);
                    }

                    for (let i = 0; i < icount; i++) {
                        let repData = getConfig();
                        if (repData == undefined) {
                            sleep(10000)
                            continue;
                        }
                        //log(repData)
                        let lastTalkName = repData["lastTalkName"] != undefined ? repData["lastTalkName"] : "";//上一发言人
                        let lastLinkTitle = repData["lastLinkTitle"] != undefined ? repData["lastLinkTitle"] : "";//上一文章的标题


                        news = packageName("com.tencent.mm").className("android.widget.ListView").findOne(5000);
                        if (news != null && news.children() != null) {
                            newsList = news.children();
                            if (newsList.length > 0) {
                                //最新消息
                                let latestNews = newsList[newsList.length - 1];
                                if (latestNews.className() == "android.widget.RelativeLayout") {
                                    latestNews.children().forEach(function (child) {
                                        if (child.className() == "android.widget.ImageView" && child.desc()) {
                                            latestTalkName = child.desc();
                                            latestTalkName = latestTalkName.TextFilter()
                                        }
                                        if (child.className() == "android.widget.FrameLayout") {
                                            latestLink = child;
                                            latestLinkTitle = child.children()[0].text();
                                            latestLinkTitle = latestLinkTitle.TextFilter()
                                        }
                                    })
                                }
                            }
                        }

                        if (latestTalkName != "" && latestTalkName != lastTalkName) {
                            //log(new Date().toLocaleString() + "-" + "-----------------发言人变化,上一发言人:" + lastTalkName + ",当前发言人:" + latestTalkName);

                            if (setConfig(latestTalkName, latestLinkTitle)) {
                                if (latestLinkTitle != "") {
                                    //log(" <标题不为空点击>");
                                    latestLink.click();
                                    reducejieshouCount()
                                    阅读到底();
                                    addjieshouCount()
                                }
                            }

                        } else {
                            if (lastLinkTitle != "" && lastLinkTitle != latestLinkTitle) {
                                //log(new Date().toLocaleString() + "-" + "-----------------发言内容变化,上一标题:" + lastLinkTitle + ",当前标题:" + latestLinkTitle);

                                if (setConfig(latestTalkName, latestLinkTitle)) {
                                    if (latestLinkTitle != "") {
                                        //log(" <标题不为空点击>");
                                        latestLink.click();
                                        reducejieshouCount()
                                        阅读到底();
                                        addjieshouCount()
                                    }
                                }
                            }
                        }
                        sleep(10000)
                        if (i % 5 == 0) {
                            if (联网验证(zwifi) != true) {
                                连接wifi(zwifi, 5000);
                                app.launch(PKG_NAME);
                            }
                        }

                    }
                    reducejieshouCount()
                    back();
                    sleep(random(3000, 5000))
                    home();
                    sleep(random(300000, 600000));
                } else {
                    console.error("not found 大家庭")
                    lunSleep();
                }
            } else {
                console.error("not found bg1")
                lunSleep();
            }
        }
        function 进入收藏() {
            打开v();
            返回v首页();
            refreshStateInfo();
            let wBtn = className("android.widget.TextView").text("我").findOne(3000);
            if (topActivity == MAIN_PAGE && wBtn != null) {
                log("返回v首页成功！");
                let wBtn = className("android.widget.TextView").text("我").findOne(3000);
                for (let i = 0; i < 8; i++) {
                    if (wBtn != null && wBtn.clickable()) {
                        wBtn.click();
                        sleep(3000);
                        if (className("android.widget.TextView").text("收藏").findOne(5000) != null) {
                            break;
                        };
                    } else {
                        wBtn = wBtn.parent();
                    }
                }

                if (结束未响应()) {
                    return;
                }
                if (className("android.widget.TextView").text("收藏").findOne(5000) == null) {
                    return;
                };
                log("进入我成功");
                sleep(5000);
                click("收藏");
                /*className("android.widget.TextView").text("链接").waitFor();
                click("链接");
                sleep(1000);*/
                sleep(1000);
                if (结束未响应()) {
                    return;
                }
                if (text("我的收藏").findOne(5000) == null) {
                    return;
                }
                log("进入收藏成功");
                sleep(3000);
            }
        }
        //判断是否有接收人
        function havejieshouren(peoplecCount) {
            let repData = getjieshouCount()
            if (repData != undefined && repData["jieshouCount"] != undefined && repData["jieshouCount"] >= peoplecCount) {
                return true
            } else {
                return false
            }
        }



        function 阅读到底() {
            sleep(5000);
            log("滑动");
            swapeToRead();
            sleep(random(3000, 7000));
            swapeToRead();
            sleep(random(3000, 7000));
            swapeToRead()
            sleep(random(3000, 7000));
            if (device.brand == "samsung") {
                for (let i = 0; i < 7; i++) {
                    kz();
                    swapeToRead();
                    sleep(random(4000, 5000));
                    if (checkWatchFull()) {
                        log("到底了");
                        break;
                    }
                }
            } else {
                for (let i = 0; i < 7; i++) {
                    kz();
                    var img = captureScreen();
                    var imgH = img.height;
                    var clip = images.clip(img, 0, img.height - 200, 200, 20);
                    swapeToRead();
                    sleep(random(4000, 5000));
                    var p = findImage(captureScreen(), clip, {
                        region: [0, imgH - 300, 220, 150],
                        threshold: 1
                    });
                    img.recycle();//不再使用需要手动回收
                    if (p || checkWatchFull()) {
                        log("到底了");
                        break;
                    }
                }
            }

            等待未响应();
            back();
        }
        /**
 * 日期相减获取天数（用于公式计算）
 * @param date1 日期一 '2020-06-05'
 * @param date2 日期二 '2020-06-04'
 * @returns {string}
 */
        function calcDateDayDiff(date1Str, date2Str) {
            //异常返回内容
            var errorResult = "";
            //解析
            let date1 = parseDate(date1Str)
            let date2 = parseDate(date2Str)
            try {
                //进行计算
                var result = (date1 - date2) / (1000 * 60 * 60 * 24);
                //保留0位小数
                result = result.toFixed(0);
                return result;
            } catch (e) {
                console.error("计算日期相差天数异常");
                return errorResult;
            }
        }
        /**
                     * 将日期格式化成指定格式的字符串
                     * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
                     * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
                     * @returns 返回格式化后的日期字符串
                     */
        function formatDate(date, fmt) {
            date = date == undefined ? new Date() : date;
            date = typeof date == 'number' ? new Date(date) : date;
            fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
            var obj =
            {
                'y': date.getFullYear(), // 年份，注意必须用getFullYear
                'M': date.getMonth() + 1, // 月份，注意是从0-11
                'd': date.getDate(), // 日期
                'q': Math.floor((date.getMonth() + 3) / 3), // 季度
                'w': date.getDay(), // 星期，注意是0-6
                'H': date.getHours(), // 24小时制
                'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
                'm': date.getMinutes(), // 分钟
                's': date.getSeconds(), // 秒
                'S': date.getMilliseconds() // 毫秒
            };
            var week = ['天', '一', '二', '三', '四', '五', '六'];
            for (var i in obj) {
                fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
                    var val = obj[i] + '';
                    if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
                    for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
                    return m.length == 1 ? val : val.substring(val.length - m.length);
                });
            }
            return fmt;
        }
        /**
                     * 将字符串解析成日期
                     * @param str 输入的日期字符串，如'2014-09-13'
                     * @param fmt 字符串格式，默认'yyyy-MM-dd'，支持如下：y、M、d、H、m、s、S，不支持w和q
                     * @returns 解析后的Date类型日期
                     */
        function parseDate(str, fmt) {
            fmt = fmt || 'yyyy-MM-dd';
            var obj = { y: 0, M: 1, d: 0, H: 0, h: 0, m: 0, s: 0, S: 0 };
            fmt.replace(/([^yMdHmsS]*?)(([yMdHmsS])\3*)([^yMdHmsS]*?)/g, function (m, $1, $2, $3, $4, idx, old) {
                str = str.replace(new RegExp($1 + '(\\d{' + $2.length + '})' + $4), function (_m, _$1) {
                    obj[$3] = parseInt(_$1);
                    return '';
                });
                return '';
            });
            obj.M--; // 月份是从0开始的，所以要减去1
            var date = new Date(obj.y, obj.M, obj.d, obj.H, obj.m, obj.s);
            if (obj.S !== 0) date.setMilliseconds(obj.S); // 如果设置了毫秒
            return date;
        }

        function 页面异常处理() {
            if (className("android.widget.TextView").textMatches(/(.*请在微信上正常阅读.*|.*异常.*|.*失败.*|.*登陆超时.*|.*重试.*)/).findOne(3000) != null) {
                log("异常回退：" + className("android.widget.TextView").textMatches(/(.*请在微信上正常阅读.*|.*异常.*|.*失败.*|.*登陆超时.*|.*重试.*)/).findOne(3000));
                let qBtn = textMatches(/(.*确定.*)/).findOne(3000);
                if (qBtn != null) {
                    qBtn.click();
                }
                sleep(3000);
                return true;
            } else {
                return false;
            }
        }

        function 初始化配置(path) {
            files.createWithDirs(path)  //开始创建文件
            let jsonContent = {
                "date": new Date().toLocaleDateString(),
                "lunCount": 1,
                "count": 1
            }
            files.write(path, JSON.stringify(jsonContent));
            sleep(1000);
        }

        function 保存配置(path, jsonContent) {
            files.createWithDirs(path)  //开始创建文件
            files.write(path, JSON.stringify(jsonContent));
            sleep(1000);
        }

        function 读取配置(path) {
            return JSON.parse(files.read(path));
        }

        //多线程demo
        /*var thread = threads.start(function () {
       function 结束未响应() {
           if (textMatches(/(.*未响应.*|.*没有响应.*)/).findOne(3000) != null && textMatches(/(.*等待.*)/).findOne(3000) != null) {
               log(new Date().toLocaleString() + "-" + "检测到应用未响应");
               textMatches(/(.*确定.*|.*关闭.*)/).findOne(3000).click();
               log(new Date().toLocaleString() + "-" + "----------------------------------------------结束未响应成功");
           }
           return 结束未响应;
       }
       setInterval(结束未响应(), 6000);
   });*/
        function 打开v() {
            refreshStateInfo();
            if (topPackage == MAIN_PKG || topPackage != PKG_NAME) {
                home();
                sleep(2000);
                log("打开" + PKG_NAME);
                app.launch(PKG_NAME);
                sleep(15000);
            }
            refreshStateInfo();
            if (topPackage == MAIN_PKG || topPackage != PKG_NAME) {
                home();
                sleep(2000);
                log("打开" + PKG_NAME);
                app.launch(PKG_NAME);
                sleep(10000);
            }

            refreshStateInfo();
            if (topPackage != PKG_NAME) {
                关闭应用(PKG_NAME);
                sleep(3000);
                log("打开" + PKG_NAME);
                app.launch(PKG_NAME);
                sleep(30000);
            }
        }

        function onMainPage() {
            log("进入v成功");
            //id("cns").className("android.widget.TextView").text("我").waitFor();
            //id("cns").className("android.widget.TextView").text("我").findOne().parent().parent().click();
            /*let wBtn = className("android.widget.TextView").text("我").findOne(3000);
            for (let i = 0; i < 8; i++) {
                if (wBtn != null && wBtn.clickable()) {
                    wBtn.click();
                    sleep(3000);
                    if (className("android.widget.TextView").text("收藏").findOne(5000) != null) {
                        break;
                    };
                } else {
                    wBtn = wBtn.parent();
                }
            }*/
            let wBtns = className("android.widget.TextView").text("我").find();
            for (let i = 0; i < wBtns.length; i++) {
                let wBtn = wBtns[i];
                for (let i = 0; i < 4; i++) {
                    if (wBtn != null && wBtn.clickable()) {
                        wBtn.click();
                        sleep(5000);
                        if (className("android.widget.TextView").text("收藏").findOne(5000) != null) {
                            break;
                        };
                    } else if (wBtn != null && wBtn.parent() != null) {
                        wBtn = wBtn.parent();
                    }
                }
            }

            if (结束未响应()) {
                return;
            }
            if (className("android.widget.TextView").text("收藏").findOne(5000) == null) {
                return;
            };
            log("进入我成功");
            sleep(5000);
            click("收藏");
            /*className("android.widget.TextView").text("链接").waitFor();
            click("链接");
            sleep(1000);*/
            sleep(1000);
            if (结束未响应()) {
                return;
            }
            if (text("我的收藏").findOne(5000) == null) {
                return;
            }
            log("进入收藏成功");
            sleep(3000);

            if (className("android.widget.TextView").textContains("RHtWWJm").findOne(5000) == null
                && className("android.widget.TextView").textContains("migokkm").findOnce() == null
                && className("android.widget.TextView").textContains("ckmokkm").findOnce() == null
                && className("android.widget.TextView").textContains("gPmokkm").findOnce() == null
                && className("android.widget.TextView").textContains("JVJAkkm").findOnce() == null
                && className("android.widget.TextView").textContains("TiLAkkm").findOnce() == null) {
                toastLog("未添加到收藏夹");
                exit();
            }

            let 阅读;
            if (className("android.widget.TextView").textContains("RHtWWJm").findOne(5000) != null) {
                阅读 = className("android.widget.TextView").textContains("RHtWWJm").findOnce().bounds();
            } else if (className("android.widget.TextView").textContains("migokkm").findOnce() != null) {
                阅读 = className("android.widget.TextView").textContains("migokkm").findOnce().bounds();
            } else if (className("android.widget.TextView").textContains("ckmokkm").findOnce() != null) {
                阅读 = className("android.widget.TextView").textContains("ckmokkm").findOnce().bounds();
            } else if (className("android.widget.TextView").textContains("gPmokkm").findOnce() != null) {
                阅读 = className("android.widget.TextView").textContains("gPmokkm").findOnce().bounds();
            } else if (className("android.widget.TextView").textContains("JVJAkkm").findOnce() != null) {
                阅读 = className("android.widget.TextView").textContains("JVJAkkm").findOnce().bounds();
            } else if (className("android.widget.TextView").textContains("TiLAkkm").findOnce() != null) {
                阅读 = className("android.widget.TextView").textContains("TiLAkkm").findOnce().bounds();
            } else {
                return;
            }

            clickx(阅读.right, 阅读.bottom);
            sleep(3000);

            if (auto_tx) {
                if (className("android.widget.TextView").textContains(readurl).findOne(5000) != null) {
                    阅读 = className("android.widget.TextView").textContains(readurl).findOnce().bounds();
                } else {
                    return;
                }
            } else {
                if (className("android.widget.TextView").textContains("RHtWWJm").findOne(5000) != null) {
                    阅读 = className("android.widget.TextView").textContains("RHtWWJm").findOnce().bounds();
                } else if (className("android.widget.TextView").textContains("migokkm").findOnce() != null) {
                    阅读 = className("android.widget.TextView").textContains("migokkm").findOnce().bounds();
                } else if (className("android.widget.TextView").textContains("ckmokkm").findOnce() != null) {
                    阅读 = className("android.widget.TextView").textContains("ckmokkm").findOnce().bounds();
                } else if (className("android.widget.TextView").textContains("gPmokkm").findOnce() != null) {
                    阅读 = className("android.widget.TextView").textContains("gPmokkm").findOnce().bounds();
                } else if (className("android.widget.TextView").textContains("JVJAkkm").findOnce() != null) {
                    阅读 = className("android.widget.TextView").textContains("JVJAkkm").findOnce().bounds();
                } else if (className("android.widget.TextView").textContains("TiLAkkm").findOnce() != null) {
                    阅读 = className("android.widget.TextView").textContains("TiLAkkm").findOnce().bounds();
                } else {
                    return;
                }
            }

            clickx(阅读.right, 阅读.bottom);
            sleep(8000);
            log("点击链接成功");
            let ntext = packageName("com.tencent.mm").textContains("获取你的昵称").findOnce();
            if (ntext != null) {
                click("允许");
                sleep(3000);
            }

            /*if (textMatches(/(.*登陆超时.*|.*重试.*)/).findOne(3000) != null) {
                let qBtn=textMatches(/(.*确定.*)/).findOne(3000);
                if(qBtn!=null){
                    qBtn.click();
                }
                sleep(1000);
                
            }*/
            if (页面异常处理()) {
                返回v首页();
                return;
            }
            if (结束未响应()) {
                return;
            }
            if (auto_tx) {
                let cBtn = packageName("com.tencent.mm").id('read_box').className("android.view.View").findOnce();
                if (cBtn) {
                    cBtn.click();
                    sleep(10000);
                    let ntext = packageName("com.tencent.mm").textContains("获取你的昵称").findOnce();
                    if (ntext != null) {
                        click("允许");
                        sleep(3000);
                    }
                    if ((nowHour > 13 && todayTxCount < 1) || (nowHour > 21 && todayTxCount < 2)) {
                        let jfTxt = packageName("com.tencent.mm").className("android.view.View").textContains("积分:").findOnce()
                        if (jfTxt) {
                            if (jfTxt != null && parseInt(jfTxt.text().split("积分:")[1]).toString() != 'NaN' && parseInt(jfTxt.text().split("积分:")[1]) > 100) {
                                todayTxCount++
                                click("积分兑换")
                                sleep(6000);
                                cBtn = packageName("com.tencent.mm").className("android.widget.Button").text("确定").findOne(3000);
                                if (cBtn != null) {
                                    sleep(500)
                                    cBtn.click();

                                }
                                sleep(1000);
                                let txBtn = packageName("com.tencent.mm").id('doWithdraw').className("android.widget.Button").findOnce();
                                if (txBtn) {
                                    txBtn.click();
                                } else {
                                    txBtn = packageName("com.tencent.mm").className("android.widget.Button").text("提现").findOne(3000);
                                    if (txBtn) {
                                        txBtn.click();
                                    }
                                }
                                sleep(8000);
                                cBtn = packageName("com.tencent.mm").className("android.widget.Button").text("确定").findOne(3000);
                                if (cBtn != null) {
                                    sleep(500)
                                    cBtn.click();
                                    sleep(1000);
                                } else {
                                    back();
                                }
                                for (var i = 0; i < 3; i++) {
                                    sleep(3000);
                                    let sBtn = textMatches(/(.*开始阅读.*)/).findOne(3000);
                                    if (sBtn == null) {
                                        back();
                                    } else {
                                        break;
                                    }

                                }

                            }
                        }
                    }
                }
            }
            if (className("android.view.View").textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和|.*韩玥|.*云雨)/).findOne(5000) != null) {
                log("渠道匹配");
                retryCount = 0;
                kz();
                let readNumDiv = packageName("com.tencent.mm").id("todayReadNum").findOne(5000)
                if (readNumDiv != null && parseInt(readNumDiv.text()).toString() != 'NaN' && parseInt(readNumDiv.text()) > readNum) {
                    readNum = parseInt(readNumDiv.text());
                }
                if (textMatches(/(.*任务上限.*|.*阅读限制.*)/).findOne(3000) != null) {
                    if (auto_tx) {
                        lunCount++;
                        配置["lunCount"] = lunCount;
                        配置["count"] = 1;
                        保存配置(settingPath, 配置);
                        返回v首页();
                        sleep(1000);
                        home();
                        lunSleep();
                    } else {
                        lunCount = 99;
                        配置["lunCount"] = 99;
                        保存配置(settingPath, 配置);
                        返回v首页();
                    }
                    return;
                }

                if (readNum > 150) {
                    if (auto_tx) {
                        lunCount++;
                        配置["lunCount"] = lunCount;
                        配置["count"] = 1;
                        保存配置(settingPath, 配置);
                        返回v首页();
                        sleep(1000);
                        home();
                        lunSleep();
                    } else {
                        lunCount = 99;
                        配置["lunCount"] = 99;
                        保存配置(settingPath, 配置);
                        返回v首页();
                    }
                    return;
                }
                click("开始阅读");
                for (var i = 0; i < 5; i++) {
                    sleep(3000);
                    if (className("android.view.View").textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和|.*韩玥|.*云雨)/).findOne(3000) != null) {
                        log("重试点击开始阅读成功");
                        let sBtn = textMatches(/(.*开始阅读.*)/).findOne(3000);
                        if (sBtn != null) {
                            sBtn.click();
                        }
                    } else {
                        log("点击开始阅读成功");
                        if (yuedu()) {
                            lunCount++;

                            配置["lunCount"] = lunCount;
                            配置["count"] = 1;
                            保存配置(settingPath, 配置);
                            //判断是否接收文章
                            if (xianzhidays == 0) {//昨天限制今天可以的话第一轮不接收，昨天没限制第一轮接收
                                jieshouwenzhang();
                            } else {
                                lunSleep();
                            }


                        }

                        return;
                    }
                }
            } else {
                let stopPage = packageName("com.tencent.mm").textContains("已停止访问该网页").findOnce()
                if (stopPage != null) {
                    exit();
                }
                if (retryCount > 3) {
                    retryCount = 0;
                    关闭应用(PKG_NAME);
                } else {
                    retryCount++
                    返回v首页();
                }
                return;
            }

            if (textMatches(/(.*暂无任务可做)/).findOne(3000) != null) {
                xianzhidays = storage.put("xianzhidays", 5);
                //xianzhidate = formatDate(new Date(), "yyyy-MM-dd");
                //storage.put("xianzhidate", xianzhidate);
                if (auto_tx) {
                    lunSleep();
                } else {
                    lunSleep(random(8640000, 13000000));
                }
            } else {
                lunSleep();
            }

        }

        function quGuan(sleepTime) {
            log("进入v成功");

            let wBtn = className("android.widget.TextView").text("通讯录").findOne(3000);
            for (let i = 0; i < 8; i++) {
                if (wBtn != null && wBtn.clickable()) {
                    wBtn.click();
                    sleep(3000);
                    if (className("android.widget.TextView").text("公众号").findOne(5000) != null) {
                        break;
                    };
                } else {
                    wBtn = wBtn.parent();
                }
            }

            if (结束未响应()) {
                return;
            }
            if (className("android.widget.TextView").text("公众号").findOne(5000) == null) {
                return;
            };
            log("进入通讯录成功");
            click("公众号");

            if (结束未响应()) {
                return;
            }
            if (text("公众号").findOne(5000) == null) {
                return;
            }
            log("进入公众号成功");
            sleep(3000);
            let faultCount = 0;
            for (let i = 0; i < sleepTime / 1000 / 60; i++) {
                kz();
                if (faultCount > 10) {
                    home();
                    sleep(60 * 1000);
                    continue;
                }
                for (let i = 0; i < 6; i++) {
                    if (text("公众号").findOne(5000) != null) {
                        let x1 = device.width * random(400, 900) / 1000;
                        let y1 = device.height * random(400, 800) / 1000;
                        if (random(1, 10) < 7) {
                            press(x1, y1, random(2000, 2500));
                            sleep(random(1000, 2000));
                            if (text("不再关注").findOne(5000) != null) {
                                faultCount = 0;
                                click("不再关注");
                                sleep(random(1000, 2000));
                                if (text("不再关注").findOne(5000) != null) {
                                    click("不再关注");
                                }
                            } else {
                                faultCount++;
                                continue;
                            }
                            sleep(random(4000, 6000));
                        } else {
                            //进入明细
                            click(x1, y1);
                            if (text("公众号").findOne(random(3000, 5000)) == null) {
                                back();
                                sleep(random(4000, 6000));
                            }
                        }
                    } else {
                        back();
                        sleep(5000);
                    }

                }
            }
        }

        function lunSleep(sleepTime) {
            返回v首页();
            if (联网验证(zwifi) != true) {
                连接wifi(zwifi, 5000);
            }
            sleep(random(300000, 600000));
            home();
            if (sleepTime == undefined) {
                sleepTime = random(3600000, 4000000);
            }
            log(new Date().toLocaleString() + "-" + "-----------" + "当天已轮回" + (lunCount - 1).toString() + "次,休息" + sleepTime / 1000 / 60 + "分钟");
            sleepLongTime(sleepTime);
        }
        function 清空文件夹(path) {
            var arr = files.listDir(path);
            for (let i = 0; i < arr.length; i++) {
                if (files.isDir(path + arr[i])) {
                    files.removeDir(path + arr[i]);
                } else {
                    files.remove(path + arr[i]);
                }
            }
        }
        function 查询目录下文件个数(path) {
            let fileCount = 0;
            let arr = files.listDir(path);
            for (let i = 0; i < arr.length; i++) {
                if (!files.isDir(path + arr[i])) {
                    fileCount++
                }
            }
            return fileCount;
        }

        function yuedu() {
            配置 = 读取配置(settingPath);
            var count = 配置["count"];//次数

            let wifiCount = count;
            for (; ;) {
                kz();
                /*if(className("android.widget.TextView").textContains("请在微信上正常阅读").findOne(3000)!=null){
                    click("确定");
                    log("回退");
                    sleep(3000);
                    if(className("android.view.View").textContains("ZhaoLin").findOne(3000)!=null){
                       click("开始阅读");
                    }
                }*/

                /*if (className("android.widget.TextView").textMatches(/(.*请在微信上正常阅读.*|.*异常.*|.*失败.*)/).findOne(3000) != null) {
                    log("异常回退：" + className("android.widget.TextView").textMatches(/(.*请在微信上正常阅读.*|.*异常.*|.*失败.*)/).findOne(3000));
                    click("确定");
                    sleep(3000);
                    if (textContains("ZhaoLin").findOne(3000) != null || textMatches(/(.*开始阅读.*)/).findOne(3000) != null) {
                        let sBtn = textMatches(/(.*开始阅读.*)/).findOne(3000);
                        if (sBtn != null) {
                            sBtn.click();
                        }
                    }
                }*/
                if (页面异常处理()) {
                    if (textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和|.*韩玥|.*云雨)/).findOne(5000) != null) {
                        let sBtn = textMatches(/(.*开始阅读.*)/).findOne(3000);
                        if (sBtn != null) {
                            sBtn.click();
                        } else {
                            返回v首页();
                            return false;
                        }
                    } else {
                        返回v首页();
                        return false;
                    }
                }

                //判断阅读提前结束
                /*if (className("android.view.View").textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和|.*韩玥|.*云雨)/).findOne(3000) != null) {
                    for (var i = 0; i < 5; i++) {
                        kz();
                        sleep(3000);
                        if (className("android.view.View").textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和|.*韩玥|.*云雨)/).findOne(3000) != null) {
                            if (i < 3) {
                                log("重试点击开始阅读成功");
                                let sBtn = textMatches(/(.*开始阅读.*)/).findOne(3000);
                                if (sBtn != null) {
                                    sBtn.click();
                                }
                            } else {
                                log("本轮结束，完成第" + lunCount + "轮,第" + count + "次");
                                count = 41;
                            }

                        }
                    }
                }*/
                if (className("android.view.View").textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和|.*韩玥|.*云雨)/).findOne(3000) != null) {
                    for (var i = 0; i < 5; i++) {
                        kz();
                        if (className("android.view.View").textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和|.*韩玥|.*云雨)/).findOne(3000) != null) {
                            if (i < 3) {
                                log("按返回尝试进入阅读");
                                back()
                                sleep(8000);
                            } else {
                                log("本轮结束，完成第" + lunCount + "轮,第" + count + "次");
                                if (xianzhidays == 0 && lunCount == 1 && count < 7) {
                                    xianzhidays = storage.put("xianzhidays", 5);
                                }
                                count = 41;
                                break
                            }
                        } else if (packageName("com.tencent.mm").textMatches(/(.*无法打开网页.*|.*网页无法打开.*)/).findOne(5000)) {
                            break
                        } else {
                            log("本轮结束，完成第" + lunCount + "轮,第" + count + "次");
                            if (xianzhidays == 0 && lunCount == 1 && count < 7) {
                                xianzhidays = storage.put("xianzhidays", 5);
                            }
                            count = 41;
                            break
                        }
                    }
                }

                if (count > 40) {
                    return true;
                }
                //判断是否需要互助
                if (count == wifiCount && xianzhidays > 0) {
                    let cBtn = packageName("com.tencent.mm").id("activity-name").className("android.view.View").findOne(8000)
                    if (cBtn != null && cBtn.text() != undefined && cBtn.text() != "") {
                        fenxiangwenzhang("大家庭");
                    } else {
                        console.error(标题识别失败);
                        sleep(6000)
                        fenxiangwenzhang("大家庭");
                    }

                    sleep(8000);
                }
                log("第" + lunCount + "轮,第" + count + "次");

                //长距离测试
                //sml_move(400, 1800, 800, 230, 2000);
                //短距离测试
                //sml_move(400, 1000, 800, 600, 2000);
                log("滑动");
                swapeToRead();
                sleep(random(3000, 7000));
                swapeToRead();
                sleep(random(3000, 7000));
                swapeToRead();
                sleep(random(3000, 5000));
                swapeToRead();
                sleep(random(2000, 4000));
                if (count == wifiCount) {
                    连接wifi(dlwifi, 5000);
                    app.launch(PKG_NAME);
                }
                if (count % 5 == 0) {
                    if (联网验证(dlwifi) != true) {
                        连接wifi(dlwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                }

                if (等待未响应() == 0) {
                    if (结束未响应()) {
                        配置["count"] = count;
                        保存配置(settingPath, 配置);
                        return false;
                    }
                }


                back();
                配置["count"] = count;
                保存配置(settingPath, 配置);
                count++;

            }
        }

        //长时间睡眠保持唤醒，单位毫秒
        function sleepLongTime(sleepTime) {
            /*打开v();
            refreshStateInfo();
            let wBtn = className("android.widget.TextView").text("通讯录").findOne(3000);
            if (topActivity == MAIN_PAGE && wBtn != null) {
                quGuan(sleepTime);
            } else {
                log(wBtn);
                返回v首页();
                let wBtn = className("android.widget.TextView").text("通讯录").findOne(3000);
                if (wBtn != null) {
                    quGuan(sleepTime);
                } else {
                    for (let i = 0; i < sleepTime / 1000 / 60; i++) {
                        kz();
                        //device.wakeUp();
                        //device.keepScreenOn(3600 * 1000)
                        sleep(60 * 1000);
                    }
                }
            }*/
            toastLog("版本号:" + versionNum);
            log(new Date().toLocaleString() + "-" + "-----------" + readNum + "次");
            for (let i = 0; i < sleepTime / 1000 / 60; i++) {
                kz();
                //device.wakeUp();
                //device.keepScreenOn(3600 * 1000)
                sleep(60 * 1000);
            }
            console.clear();
            toastLog("版本号:" + versionNum);
        }
        function 关闭应用(packageName) {
            log("尝试关闭" + packageName);
            var name = getPackageName(packageName);
            if (!name) {
                if (getAppName(packageName)) {
                    name = packageName;
                } else {
                    log("关闭" + packageName + "失败");
                    return false;
                }
            }
            app.openAppSetting(name);
            sleep(2000);
            if (text(app.getAppName(name)).findOne(5000) != null && text("卸载").findOne(5000) != null) {
                let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne(3000);
                if (is_sure != null) {
                    if (is_sure.enabled()) {
                        is_sure.click();
                        sleep(2000);
                        let closeBtn = textMatches(/(.*确定|.*停止)/).findOne(3000);
                        if (closeBtn != null) {
                            closeBtn.click();
                        }
                        log(app.getAppName(name) + "应用已被关闭");
                        sleep(2000);
                        back();
                    } else {
                        log(app.getAppName(name) + "应用不能被正常关闭或不在后台运行");
                        back();
                    }
                } else {
                    log("没有找到" + app.getAppName(name) + "应用强行结束");
                }
            } else {
                log("不在" + app.getAppName(name) + "应用设置界面");
            }

        }

        function 返回v首页() {
            for (let i = 0; i < 15; i++) {
                if (结束未响应()) {
                    return;
                }
                kz();
                refreshStateInfo();
                if (topPackage != PKG_NAME) {
                    关闭应用(PKG_NAME);
                    sleep(2000);
                    home();
                    sleep(1000);
                    return;
                }
                /*if(className("android.widget.TextView").textContains("请在微信上正常阅读").findOne(3000)!=null){
                    log(className("android.widget.TextView").textContains("请在微信上正常阅读").findOne(3000));
                    click("确定");
                    sleep(8000);
                    continue;
                }*/
                /*if (className("android.widget.TextView").textMatches(/(.*请在微信上正常阅读.*|.*异常.*|.*失败.*)/).findOne(3000) != null) {
                    log("异常确定：" + className("android.widget.TextView").textMatches(/(.*请在微信上正常阅读.*|.*异常.*|.*失败.*)/).findOne(3000));
                    click("确定");
                    sleep(8000);
                    continue;
                }*/
                if (页面异常处理()) {
                    log("页面异常处理");
                    continue;
                }
                //点击左上角的x
                /*let xbtn=id("dm").className("android.widget.LinearLayout").findOne(3000);
                if (xbtn != null) {
                    xbtn.click();
                    sleep(3000);
                    continue;
                }
                let xbtn=id("eh").className("android.widget.LinearLayout").findOne(3000);
                if (xbtn != null) {
                    xbtn.click();
                    sleep(3000);
                    continue;
                }*/
                let rBtn = className("android.widget.ImageView").desc("返回").findOne(3000);
                if (rBtn != null && rBtn.parent() != null) {
                    rBtn.parent().click();
                    log("按左上角返回");
                }

                let wBtn = className("android.widget.TextView").text("通讯录").findOne(5000);
                refreshStateInfo();
                if (topActivity != MAIN_PAGE || wBtn == null) {
                    log("按返回键" + wBtn);
                    back();
                    sleep(5000);
                } else {
                    return;
                }
            }
            关闭应用(PKG_NAME);
            sleep(2000);
            home();
            sleep(1000);
        }


        function moreCommentVisible() {
            var btn = textStartsWith("查看更多").findOne(500);
            if (btn) {
                var rect = btn.bounds();
                if (rect.top < device.height && rect.top > 0) {
                    return true;
                }
            }

            return false;
        }

        //到底判断
        function checkWatchFull() {
            var btn = textStartsWith("分享").boundsInside(0, 0, device.width, device.height - 1).findOne(3000);
            if (btn) {
                return true;
            } else {
                return false;
            }
        }



        //此代码由飞云脚本圈整理提供（www.feiyunjs.com）

        function scrollUp() {
            console.log("scrollUp");
            var starx = random(500, 600);
            var starty = random(600, 700);
            swipe(starx, starty, starx, starty - 300, random(400, 500));
        }

        function swapeToRead() {
            if (currentPackage() != "com.miui.home") {
                let x1 = device.width * random(200, 500) / 1000;
                let y1 = device.height * random(700, 900) / 1000;
                let x2 = device.width * random(300, 800) / 1000;
                let y2 = device.height * random(200, 500) / 1000;
                //swipe(x1, y1, x2, y2, random(1200, 1500));
                sml_move(x1, y1, x2, y2, random(1200, 1500));
            }
        }
        //曲线滑动---贝塞尔曲线
        function bezier_curves(cp, t) {
            cx = 3.0 * (cp[1].x - cp[0].x);
            bx = 3.0 * (cp[2].x - cp[1].x) - cx;
            ax = cp[3].x - cp[0].x - cx - bx;
            cy = 3.0 * (cp[1].y - cp[0].y);
            by = 3.0 * (cp[2].y - cp[1].y) - cy;
            ay = cp[3].y - cp[0].y - cy - by;

            tSquared = t * t;
            tCubed = tSquared * t;
            result = {
                "x": 0,
                "y": 0
            };
            result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
            result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
            return result;
        };

        //仿真随机带曲线滑动  
        //qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
        function sml_move(qx, qy, zx, zy, time) {
            var xxy = [time];
            var point = [];
            var dx0 = {
                "x": qx,
                "y": qy
            };

            var dx1 = {
                "x": random(qx - 100, qx + 100),
                "y": random(qy, qy + 50)
            };
            var dx2 = {
                "x": random(zx - 100, zx + 100),
                "y": random(zy, zy + 50),
            };
            var dx3 = {
                "x": zx,
                "y": zy
            };
            for (var i = 0; i < 4; i++) {

                eval("point.push(dx" + i + ")");

            };
            //log(point[3].x)

            for (let i = 0; i < 1; i += 0.08) {
                xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]

                xxy.push(xxyy);

            }

            //log(xxy);
            gesture.apply(null, xxy);
        };

        function 结束未响应() {
            if (textMatches(/(.*未响应.*|.*没有响应.*|.*无响应.*)/).findOne(3000) != null) {
                log(new Date().toLocaleString() + "-" + "检测到应用未响应");
                let cBtn = textMatches(/(确定|关闭|关闭应用)/).findOne(3000);
                if (cBtn != null) {
                    cBtn.click();
                    sleep(1000);
                    cBtn = textMatches(/(确定|关闭|关闭应用)/).findOne(3000);
                    if (cBtn != null) {
                        log("控件关闭失败，参数坐标点击关闭");
                        let cBounds = cBtn.bounds();
                        clickx(cBounds.right, cBounds.bottom);
                    } else {
                        log(new Date().toLocaleString() + "-" + "----------------------------------------------结束未响应成功");
                        return true;
                    }
                    cBtn = textMatches(/(确定|关闭|关闭应用)/).findOne(3000);
                    if (cBtn != null) {
                        log(new Date().toLocaleString() + "-" + "----------------------------------------------结束未响应失败");
                        return false;
                    } else {
                        log(new Date().toLocaleString() + "-" + "----------------------------------------------结束未响应成功");
                        return true;
                    }
                }
            }
            return false;
        }

        function 等待未响应() {
            if (textMatches(/(.*未响应.*|.*没有响应.*|.*无响应.*)/).findOne(3000) != null) {
                log(new Date().toLocaleString() + "-" + "检测到应用未响应");
                let cBtn = textMatches(/(等待)/).findOne(3000);
                if (cBtn != null) {
                    cBtn.click();
                    sleep(1000);
                    cBtn = textMatches(/(等待)/).findOne(3000);
                    if (cBtn != null) {
                        log("等待控件关闭失败，参数坐标点击关闭");
                        let cBounds = cBtn.bounds();
                        clickx(cBounds.right, cBounds.bottom);
                    } else {
                        log(new Date().toLocaleString() + "-" + "----------------------------------------------等待未响应成功");
                        return 1;
                    }
                    cBtn = textMatches(/(等待)/).findOne(3000);
                    if (cBtn != null) {
                        log(new Date().toLocaleString() + "-" + "----------------------------------------------等待未响应失败");
                        return 0;
                    } else {
                        log(new Date().toLocaleString() + "-" + "----------------------------------------------等待未响应成功");
                        return 1;
                    }
                }
            }
            return -1;
        }


        function 连接wifi(wifiName, connectTime) {
            if (zwifi.toString() != dlwifi.toString()) {
                ui.run(function () { 悬浮窗.jbkz.visibility = 8 });
                sleep(1000);
                totificationlistenersetting()
                sleep(2000);
                let cBtn = text(wifiName).findOne(5000);
                if (cBtn != null) {
                    let cBounds = cBtn.bounds();
                    clickx(cBounds.right, cBounds.bottom);
                }
                wifi弹窗处理();
                sleep(connectTime);

                for (let i = 0; i < 5; i++) {
                    if (联网验证(wifiName) != true) {
                        log("第" + (i + 1) + "次连接重试")
                        cBtn = text(wifiName).findOne(5000);
                        if (cBtn != null) {
                            cBounds = cBtn.bounds();
                            clickx(cBounds.right, cBounds.bottom);
                        }
                        wifi弹窗处理();
                        sleep(connectTime);
                    } else {
                        log("连接正常")
                        break
                    }
                }

                back();
                sleep(1000);
                ui.run(function () { 悬浮窗.jbkz.visibility = 0 });
                sleep(1000);
            }
        }
        function 联网验证(wifiName) {
            http.__okhttp__.setTimeout(3000);
            if (wifiName == zwifi) {
                try {
                    let url = "www.baidu.com";
                    //log("url="+url)
                    let r = http.get(url);
                    if (r.statusCode == "200") {
                        return true
                    }
                } catch (err) {
                    //log(err.name)
                    //if (err.name == "JavaException")
                    return false
                }
            } else if (wifiName == dlwifi) {
                try {
                    //let url = readurl;
                    let url = "www.csdn.net";
                    //log("url="+url)
                    let r = http.get(url.toString());
                    if (r.statusCode == "200") {
                        try {
                            url = "www.baidu.com";
                            //log("url="+url)
                            r = http.get(url);
                            //if (r.statusCode == "200") {
                            return false
                            //}
                        } catch (err) {
                            log(err)
                            return true
                        }
                    }
                } catch (err) {
                    //log(err.name)
                    //if (err.name == "JavaException")
                    return false
                }
            }
        }
        function wifi弹窗处理() {
            let qBtn = textMatches(/(完成|连接)/).findOne(1000);
            if (qBtn != null && qBtn.enabled()) {
                sleep(500)
                qBtn.click();
            } else {
                qBtn = textMatches(/(取消)/).findOne(1000);
                if (qBtn != null) {
                    sleep(500)
                    qBtn.click();
                }
            }
        }
        function 启动x5() {
            if (联网验证(zwifi) != true) {
                连接wifi(zwifi, 5000);
            }
            打开v();
            返回v首页();

            refreshStateInfo();
            let wBtn = packageName("com.tencent.mm").className("android.widget.TextView").text("通讯录").findOne(3000);
            if (topActivity == MAIN_PAGE && wBtn != null) {
                log("进入v成功");
                /*let wBtn = className("android.widget.TextView").text("我").findOne(3000);
                for (let i = 0; i < 8; i++) {
                    if (wBtn != null && wBtn.clickable()) {
                        wBtn.click();
                        sleep(3000);
                        if (className("android.widget.TextView").text("收藏").findOne(5000) != null) {
                            break;
                        };
                    } else {
                        wBtn = wBtn.parent();
                    }
                }*/
                let wBtns = className("android.widget.TextView").text("我").find();
                for (let i = 0; i < wBtns.length; i++) {
                    let wBtn = wBtns[i];
                    for (let i = 0; i < 4; i++) {
                        if (wBtn != null && wBtn.clickable()) {
                            wBtn.click();
                            sleep(5000);
                            if (className("android.widget.TextView").text("收藏").findOne(5000) != null) {
                                break;
                            };
                        } else if (wBtn != null && wBtn.parent() != null) {
                            wBtn = wBtn.parent();
                        }
                    }
                }

                if (结束未响应()) {
                    return;
                }
                if (className("android.widget.TextView").text("收藏").findOne(5000) == null) {
                    return;
                };
                log("进入我成功");
                sleep(5000);
                click("收藏");
                sleep(1000);
                if (结束未响应()) {
                    return;
                }
                if (text("我的收藏").findOne(5000) == null) {
                    return;
                }
                log("进入收藏成功");
                sleep(3000);
                let x5;
                if (className("android.widget.TextView").textContains("debugmm.qq.com/?forcex5=true").findOne(5000) != null) {
                    x5 = className("android.widget.TextView").textContains("debugmm.qq.com/?forcex5=true").findOne(5000).bounds();
                    clickx(x5.right, x5.bottom);
                    sleep(3000);
                    if (className("android.widget.TextView").textContains("debugmm.qq.com/?forcex5=true").findOne(5000) != null) {
                        x5 = className("android.widget.TextView").textContains("debugmm.qq.com/?forcex5=true").findOne(5000).bounds();
                        clickx(x5.right, x5.bottom);
                        sleep(random(5000, 8000));
                        p = packageName("com.tencent.mm").className("android.widget.TextView").textContains("force use x5 switch is on").findOne(3000)
                        if (p) {
                            console.info("x5成功")
                            sleep(random(1000, 2000));
                            back()
                            返回v首页();
                        }
                    }
                }
            }
        }

        //auto.waitFor()//检查无障碍服务是否已经启用，会在在无障碍服务启动后继续运行。
        //console.show();
        /*sleep(1000);
        console.setSize(device.width -100, device.height / 4);
        sleep(2000);*/
        if (!requestScreenCapture()) {
            toastLog("请求截图失败");
            exit();
        } else {
            toastLog("请求截图成功");
        }
        toastLog(device.brand);
        toastLog("版本号:" + versionNum);
        zwifi = ui.zwifi.getText();
        log("主Wifi:" + zwifi);
        dlwifi = ui.dlwifi.getText();
        log("代理Wifi:" + dlwifi);
        readurl = ui.readurl.getText();
        log("readurl:" + readurl);
        auto_tx = ui.auto_tx.isChecked();
        log("tx:" + auto_tx);

        storage.put("zwifi", ui.zwifi.text());
        storage.put("dlwifi", ui.dlwifi.text());
        storage.put("auto_tx", ui.auto_tx.isChecked());
        storage.put("readurl", ui.readurl.text());
        device.keepScreenDim();
        home();
        //定义
        /** 前台服务保活 */
        let KeepAliveService = {
            /** 开启 */
            start: function (idStr, nameStr) {
                try {
                    idStr = idStr || "";
                    let channel_id = idStr + ".foreground";
                    let channel_name = nameStr + " 前台服务通知";

                    let content_title = nameStr + " 正在运行中";
                    let content_text = "此为前台保活,请勿手动移除该通知";

                    let ticker = nameStr + "已启动";

                    let manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
                    let notification;
                    let icon = context.getResources().getIdentifier("ic_3d_rotation_black_48dp", "drawable", context.getPackageName());
                    if (device.sdkInt >= 26) {
                        let channel = new android.app.NotificationChannel(channel_id, channel_name, android.app.NotificationManager.IMPORTANCE_DEFAULT);
                        channel.enableLights(true);
                        channel.setLightColor(0xff0000);
                        channel.setShowBadge(false);
                        manager.createNotificationChannel(channel);
                        notification = new android.app.Notification.Builder(context, channel_id).setContentTitle(content_title).setContentText(content_text).setWhen(new Date().getTime()).setSmallIcon(icon).setTicker(ticker).setOngoing(true).build();
                    } else {
                        notification = new android.app.Notification.Builder(context).setContentTitle(content_title).setContentText(content_text).setWhen(new Date().getTime()).setSmallIcon(icon).setTicker(ticker).build();
                    }
                    manager.notify(1, notification);
                } catch (error) {
                    toastLog("前台保活服务启动失败:" + error);
                    toastLog("保活服务启动失败,不影响辅助的正常运行,继续挂机即可.");
                }
            },
            /** 停止 */
            stop: function () {
                let manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
                manager.cancelAll();
            },
        };
        if (app.autojs.versionName == '4.1.1 Alpha2') {
            sleep(1000);
            KeepAliveService.stop();
            sleep(5000);
            KeepAliveService.start("fanqie", "茄子云");
        }


        var settingPath = files.join(files.cwd(), "setting.txt")//1、定义文件路径名  2、files.cwd()会返回:  /sdcard/脚本/  3、path=/sdcard/脚本/fanqie.zip
        if (!files.exists(settingPath)) {
            初始化配置(settingPath);
            toastLog("初始化配置");
        }


        var lunCount = 1;//轮回次数
        for (; ;) {
            kz();
            var nowHour = new Date().getHours();
            log("当前时间:" + nowHour + "时");
            配置 = 读取配置(settingPath);
            if (配置["date"] != new Date().toLocaleDateString()) {
                readNum = 0;
                todayTxCount = 0;
                初始化配置(settingPath);
                console.clear();
                toastLog("每天初始化配置");
                if (storage.get("xianzhidays") > 0) {
                    xianzhidays = storage.get("xianzhidays") - 1;
                    storage.put("xianzhidays", xianzhidays);
                }
                //重置接收人数
                for (; ;) {
                    let repData = getjieshouCount()
                    if (repData != undefined && repData["jieshouCount"] != undefined && repData["jieshouCount"] > 0) {
                        reducejieshouCount();
                        sleep(1000)
                    } else {
                        break
                    }
                }
                if (new Date().getDate() % 3 == 0) {
                    app.launch("com.ss.android.ugc.aweme");
                    sleep(60000)
                    if (currentPackage() == "com.ss.android.ugc.aweme") {
                        home();
                        sleep(5000);
                        关闭应用("com.ss.android.ugc.aweme");
                        sleep(10000)
                    }
                    app.launch("com.smile.gifmaker");
                    sleep(60000)
                    if (currentPackage() == "com.smile.gifmaker") {
                        home();
                        sleep(5000);
                        关闭应用("com.smile.gifmaker");
                        sleep(10000)
                    }
                    app.launch("com.ss.android.ugc.live");
                    sleep(60000)
                    if (currentPackage() == "com.ss.android.ugc.live") {
                        home();
                        sleep(5000);
                        关闭应用("com.ss.android.ugc.live");
                        sleep(10000)
                    }
                    app.launch("com.ss.android.article.news");
                    sleep(60000)
                    if (currentPackage() == "com.ss.android.article.news") {
                        home();
                        sleep(5000);
                        关闭应用("com.ss.android.article.news");
                        sleep(10000)
                    }
                }




                if (new Date().getDate() % 5 == 0) {
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/cache/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/xlog/");
                    if (files.listDir("/sdcard/Android/data/com.tencent.mm/MicroMsg/CheckResUpdate/").length > 100) {
                        清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/CheckResUpdate/");
                    }
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxvideotmp/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxvideocache/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxanewfiles/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxafiles/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxacache/");
                    清空文件夹("/sdcard/Pictures/WeiXin/");
                    let path = "/sdcard/Android/data/com.tencent.mm/MicroMsg/";
                    let arr = files.listDir(path);
                    for (let i = 0; i < arr.length; i++) {
                        if (files.isDir(path + arr[i]) && arr[i].length == 32) {
                            path = path + arr[i] + '/'
                            if (files.listDir(path + "finder/image/").length > 30) {
                                清空文件夹(path + "finder/image/");
                            }
                            if (files.listDir(path + "finder/video/").length > 8) {
                                清空文件夹(path + "finder/video/");
                            }
                            if (files.listDir(path + "finder/tmp/").length > 100) {
                                清空文件夹(path + "finder/tmp/");
                            }
                            if (查询目录下文件个数(path + "finder/avatar/") > 100) {
                                清空文件夹(path + "finder/avatar/");
                            }
                            if (files.listDir(path + "image2/").length > 30) {
                                清空文件夹(path + "image2/");
                            }
                            if (files.listDir(path + "record/").length > 30) {
                                清空文件夹(path + "record/");
                            }
                            if (files.listDir(path + "video/").length > 30) {
                                清空文件夹(path + "video/");
                            }
                        }
                    }
                }


                启动x5()

            }

            配置 = 读取配置(settingPath);
            lunCount = 配置["lunCount"];
            if (lunCount > 12) {
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                }
                sleep(5000);
                home();
                log(new Date().toLocaleString() + "-" + "----------------------------------------------" + "当天已轮回" + (lunCount - 1).toString() + "次,休息中");
                sleepLongTime(random(3600000, 5000000));
                continue;
            }

            if (zwifi.toString() != dlwifi.toString()) {
                if (xianzhidays > 0 && nowHour < 11) {
                    log(new Date().toLocaleString() + "-" + "----------------------------------------------" + "休息中");
                    sleepLongTime(random(3600000, 5000000));
                    continue;
                } else if (xianzhidays == 0 && nowHour < 7) {
                    log(new Date().toLocaleString() + "-" + "----------------------------------------------" + "休息中");
                    sleepLongTime(random(3600000, 5000000));
                    continue;
                }
            }


            sleep(3000);
            if (联网验证(zwifi) != true) {
                连接wifi(zwifi, 5000);
            }
            打开v();


            refreshStateInfo();
            /*if(topPackage != PKG_NAME){
                continue;
            }*/
            let wBtn = className("android.widget.TextView").text("我").findOne(3000);
            if (topActivity == MAIN_PAGE && wBtn != null) {
                log("第" + lunCount + "轮");
                onMainPage();
            } else {
                log(wBtn);
                返回v首页();
                continue;
            }

            /*if (联网验证(zwifi) != true) {
                连接wifi(zwifi, 5000);
            }
            打开v();
            sleep(5000);
            refreshStateInfo();
            if (topPackage == PKG_NAME && calcDateDayDiff(formatDate(new Date(), "yyyy-MM-dd"), xianzhidate) < 4) {
                sleep(random(600000, 1200000));
            } else {
                sleep(random(10000, 30000));
            }*/


        }

    });
});




