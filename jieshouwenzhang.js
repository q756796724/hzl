"ui";

storage = storages.create("fanqiekankan配置");
toolsStorage = storages.create("tools配置");
wifiOptions = "XiaoMiWifi_5G|XiaoMiWifi_2.4G|XiaoMiWifi3G_5G|XiaoMiWifi3G_2.4G|XiaoMiWifi4A|guest|WifiPro|WifiPro_5G|myg";
zwifi = storage.get("zwifi", "XiaoMiWifi3G_5G");
dlwifi = storage.get("dlwifi", "XiaoMiWifi3G_2.4G");
qiehuanjiaoben = storage.get("qiehuanjiaoben", true);
removePhoneNum = storage.get("removePhoneNum", false);
addJieshou = storage.get("addJieshou", false);
zhengtian = storage.get("zhengtian", false);
autoX = storage.get("autoX", false);

lastUrl = "";//上一url
latestUrl = "";//当前url

phoneNum = storage.get("phoneNum", "");
jieshouwifi = storage.get("jieshouwifi", "WifiPro_5G");

sffs = false;//是否副手

if (storage.get("readdays") == undefined) {
    storage.put("readdays", 0);
}
readdays = storage.get("readdays");//阅读天数
sxreaddays = 1;//上限阅读天数
ws = null

// 获取所有正在运行的脚本引擎
var allEngines = engines.all();
// 遍历所有脚本引擎，并终止除当前脚本外的其他脚本
for (var i = 0; i < allEngines.length; i++) {
    var engine = allEngines[i];
    if (engine != engines.myEngine()) {
        engine.forceStop();
    }
}

setInterval(() => { }, 1000);

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
ui.layout(
    <vertical padding="16">
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" />
        <text textSize="16sp" textColor="black" text="请输入主Wifi" />
        {/*<input id="zwifi" text="{{zwifi}}" /> */}
        <spinner id="zwifi_spinner" entries={wifiOptions} />
        <text textSize="16sp" textColor="black" text="请输入代理Wifi" />
        {/* <input id="dlwifi" text="{{dlwifi}}" /> */}
        <spinner id="dlwifi_spinner" entries={wifiOptions} />
        <text textSize="16sp" textColor="black" text="jieshouwifi" />
        <input id="jieshouwifi" text="{{jieshouwifi}}" />
        <text textSize="16sp" textColor="black" text="编号" />
        <input id="phoneNum" text="{{phoneNum}}" />
        <horizontal>
            <checkbox text="是否切换" id="qiehuanjiaoben" checked="{{qiehuanjiaoben}}" textSize="18sp" />\
            <checkbox text="添加到接收" id="addJieshou" checked="{{addJieshou}}" textSize="18sp" />\
        </horizontal>
        <horizontal>
            <checkbox text="清除号码" id="removePhoneNum" checked="{{removePhoneNum}}" textSize="18sp" />\
            <checkbox text="整天" id="zhengtian" checked="{{zhengtian}}" textSize="18sp" />\
            <checkbox text="X" id="autoX" checked="{{autoX}}" textSize="18sp" />\
        </horizontal>
        <button id="ok" text="开始接收" />
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
var thread1 = threads.start(function () {
    setTimeoutA = setTimeout(() => {
        if (currentPackage() == "com.fanqie.cloud") {
            toastLog("自动开始")
            ui.run(() => {
                //这里写针对UI的操作
                ui.ok.click()
            });
        }
    }, 30000);
});
var zwifispinner = ui.zwifi_spinner;
zwifispinner.setSelection(wifiOptions.split("|").indexOf(zwifi));
var dlwifispinner = ui.dlwifi_spinner;
dlwifispinner.setSelection(wifiOptions.split("|").indexOf(dlwifi));

//指定确定按钮点击时要执行的动作
ui.ok.click(function () {
    thread1.interrupt()
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    var lock2 = threads.lock();
    threads.start(function () {
        lock2.lock(); // 获取锁
        try {
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
            var versionNum = "接收v7.7.1";

            log("thread1.isAlive=" + thread1.isAlive())
            toastLog(device.brand);
            toastLog("版本号:" + versionNum);
            //zwifi = ui.zwifi.getText();
            zwifi = ui.zwifi_spinner.getSelectedItem();
            log("主Wifi:" + zwifi);
            //dlwifi = ui.dlwifi.getText();
            dlwifi = ui.dlwifi_spinner.getSelectedItem();
            log("代理Wifi:" + dlwifi);
            phoneNum = ui.phoneNum.getText();
            log("phoneNum:" + phoneNum);
            jieshouwifi = ui.jieshouwifi.getText();
            log("jieshouwifi:" + jieshouwifi);
            qiehuanjiaoben = ui.qiehuanjiaoben.isChecked();
            removePhoneNum = ui.removePhoneNum.isChecked();
            zhengtian = ui.zhengtian.isChecked();
            addJieshou = ui.addJieshou.isChecked();
            autoX = ui.autoX.isChecked();


            storage.put("zwifi", zwifi);
            storage.put("dlwifi", dlwifi);
            storage.put("phoneNum", ui.phoneNum.text());
            storage.put("jieshouwifi", ui.jieshouwifi.text());
            storage.put("qiehuanjiaoben", ui.qiehuanjiaoben.isChecked());
            storage.put("removePhoneNum", ui.removePhoneNum.isChecked());
            storage.put("zhengtian", ui.zhengtian.isChecked());
            storage.put("addJieshou", ui.addJieshou.isChecked());
            storage.put("autoX", ui.autoX.isChecked());


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
            function longclickx(x, y) {
                x = x + random(-5, 5)
                y = y
                press(x < 0 ? 1 : x, y < 0 ? 1 : y, random(2400, 2500));
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

            function getdaili() {
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                    home();
                }
                let temp = null;
                let repData = "";
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/getdaili", {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        repData = rep["data"];
                    } else {
                        throw Error("getdaili失败" + temp)
                    }
                } catch (err) {
                    console.error("getdaili报错,原因:" + err);
                }
                return repData

            }

            //获取接收人数
            function getjieshouCount(type) {
                let temp = null;
                let repData = 0;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/getjieshouCount?type=" + type, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            let repData = rep["data"];
                            return repData
                        } else {
                            //console.warn("getjieshouCount获取数据失败" + temp);
                            throw Error("getjieshouCount获取数据失败" + temp)
                        }
                    } else {
                        throw Error("获取数据失败" + temp)
                    }
                } catch (err) {
                    console.error("getjieshouCount报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(8000)
                    repData = getjieshouCount(type);

                }
                return repData

            }
            //增加接收人数
            function addjieshouCount(txt) {
                let temp = null;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/addjieshouCount?phoneNum=" + txt, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            //console.info(new Date().toLocaleString() + "-------"+txt);
                            let repData = rep["data"];
                            return repData
                        } else if (repState == 0) {
                            return false
                        } else {
                            //console.error("addjieshouCount获取数据失败" + temp);
                            throw Error("addjieshouCount获取数据失败" + temp)
                        }
                    } else {
                        throw Error("获取数据失败" + temp)
                    }
                } catch (err) {
                    if (err == 'JavaException: java.util.concurrent.TimeoutException: null') {
                        console.error("addjieshouCount报错,原因:正常");
                        return true
                    }
                    console.error("addjieshouCount报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(10000)
                    return addjieshouCount(txt)
                }

            }

            //增加接收人数Fu
            function addjieshouCountFu(txt) {
                let temp = null;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/addjieshouCountFu?phoneNum=" + txt, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            //console.info(new Date().toLocaleString() + "-------"+txt);
                            let repData = rep["data"];
                            return repData
                        } else if (repState == 0) {
                            return false
                        } else {
                            //console.error("addjieshouCountFu获取数据失败" + temp);
                            throw Error("addjieshouCountFu获取数据失败" + temp)
                        }
                    } else {
                        throw Error("获取数据失败" + temp)
                    }
                } catch (err) {
                    if (err == 'JavaException: java.util.concurrent.TimeoutException: null') {
                        console.error("addjieshouCountFu报错,原因:正常");
                        return true
                    }
                    console.error("addjieshouCountFu报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(10000)
                    return addjieshouCountFu(txt)
                }

            }

            //减少接收人数
            function reducejieshouCount(txt) {
                let temp = null;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/reducejieshouCount?phoneNum=" + txt, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            console.info(new Date().toLocaleString() + "-------" + txt);
                            let repData = rep["data"];
                            return repData
                        } else {
                            console.error("reducejieshouCount获取数据失败" + temp);
                            throw Error("reducejieshouCount获取数据失败" + temp)
                        }
                    } else {
                        throw Error("获取数据失败" + temp)
                    }
                } catch (err) {
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(10000)
                    return reducejieshouCount(txt)
                }

            }
            //是否检测方
            function isInJiancegongzhonghao(txt) {
                let temp = null;
                let repData = true;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/isInJiancegongzhonghao?txt=" + txt, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        throw Error("isInJiancegongzhonghao获取数据失败" + temp)
                    }
                } catch (err) {
                    console.error("isInJiancegongzhonghao报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(8000)
                    repData = isInJiancegongzhonghao(txt);

                }
                return repData

            }

            //减少接收人数
            function reducejieshouCountFu(txt) {
                let temp = null;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/reducejieshouCountFu?phoneNum=" + txt, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            console.info(new Date().toLocaleString() + "-------" + txt);
                            let repData = rep["data"];
                            return repData
                        } else {
                            console.error("reducejieshouCountFu获取数据失败" + temp);
                            throw Error("reducejieshouCountFu获取数据失败" + temp)
                        }
                    } else {
                        throw Error("获取数据失败" + temp)
                    }
                } catch (err) {
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(10000)
                    return reducejieshouCountFu(txt)
                }

            }

            //去掉检测方
            function deleteJiancegongzhonghao(txt) {
                let temp = null;
                let repData = true;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/deleteJiancegongzhonghao?txt=" + txt, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            return true;
                        } else {
                            throw Error("deleteJiancegongzhonghao获取数据失败" + temp)
                        }
                    } else {
                        throw Error("deleteJiancegongzhonghao获取数据失败" + temp)
                    }
                } catch (err) {
                    console.error("deleteJiancegongzhonghao报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(2000)
                    repData = deleteJiancegongzhonghao(txt);

                }
                return repData

            }

            /*function getConfig() {
                let temp = null;
                try {
                    temp = http.get("http://175.178.60.114:8081/fanqie/getConfig");
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
                    }else {
                        throw Error("获取数据失败" + temp)
                    }
                } catch (err) {
                    console.error("getConfig报错,原因:" + err);
                }
    
            }*/
            function getConfig() {
                let temp = null;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/getConfig", {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            let repData = rep["data"];
                            return repData
                        } else {
                            //console.warn("getConfig获取数据失败" + temp);
                        }
                    } else {
                        throw Error("获取数据失败" + temp)
                    }
                } catch (err) {
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    //console.error("getConfig报错,原因:" + err);
                }

            }
            function setConfig(lastTalkName, lastLinkTitle, lastLinkTitle, phone) {
                let temp = null;
                try {
                    temp = http.postJson("http://175.178.60.114:8081/fanqie/setConfig", {
                        "lastTalkName": lastTalkName,
                        "lastLinkTitle": lastLinkTitle,
                        "phone": phone
                    });
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            //log(new Date().toLocaleString() + "-" + "-----------------发言人:" + lastTalkName + ",标题:" + lastLinkTitle);
                            return true
                        }
                    } else {
                        throw Error("获取数据失败" + temp)
                    }
                    return false
                } catch (err) {
                    console.error("setConfig报错,原因:" + err);
                    return false
                }

            }

            //获取当前接收号码
            function getjieshouNum() {
                let temp = null;
                let repData = "0";
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/getJieShouNum", {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            let repData = rep["data"];
                            return repData
                        } else {
                            throw Error("getJieShouNum获取数据失败" + temp)
                        }
                    } else {
                        throw Error("获取数据失败" + temp)
                    }
                } catch (err) {
                    console.error("getJieShouNum报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(8000)
                    repData = getjieshouNum();

                }
                return repData

            }

            //获取当前接收号码副
            function getjieshouNumFu() {
                let temp = null;
                let repData = "0";
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/getJieShouNumFu", {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            let repData = rep["data"];
                            return repData
                        } else {
                            throw Error("getjieshouNumFu获取数据失败" + temp)
                        }
                    } else {
                        throw Error("获取数据失败" + temp)
                    }
                } catch (err) {
                    console.error("getjieshouNumFu报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(8000)
                    repData = getjieshouNumFu();

                }
                return repData

            }

            //限制次数+1
            function addXianZhi() {
                while (1) {
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        sleep(8000)
                    } else {
                        refreshStateInfo();
                        if (topPackage != PKG_NAME) {
                            app.launch(PKG_NAME);
                            sleep(5000)
                        }
                        //跳出死循环
                        break
                    }
                }

                let temp = null;
                let repData = "0";
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/addXianZhi", {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            let repData = rep["data"];
                            return repData
                        } else {
                            throw Error("addXianZhi获取数据失败" + temp)
                        }
                    } else {
                        throw Error("获取数据失败" + temp)
                    }
                } catch (err) {
                    console.error("addXianZhi报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(8000)
                    //repData = addXianZhi();

                }
                return repData

            }
            //发送提醒
            function sendTx(url) {
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                    app.launch(PKG_NAME);
                    sleep(10000);
                }
                try {
                    let temp = http.get(url);
                    if (temp && temp.statusCode == 200) {
                        return true
                    } else {
                        return false
                    }
                } catch (err) {
                    console.error(new Date().toLocaleString() + "----------sendTx报错,原因:" + err);
                    return false
                }
            }
            function jieshouwenzhang() {
                //进入指定群，接收文章
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                    app.launch(PKG_NAME);
                }
                sleep(10000)
                返回v首页();

                refreshStateInfo();
                let wBtn = packageName("com.tencent.mm").className("android.widget.TextView").text("通讯录").findOne(3000);
                if (topActivity == MAIN_PAGE && wBtn != null) {
                    log("返回首页成功");
                } else {
                    打开v()
                }
                let wBtns = className("android.widget.TextView").text("微信").find();
                for (let i = 0; i < wBtns.length; i++) {
                    if (packageName("com.tencent.mm").id("nk").className("android.widget.TextView").textMatches(/(微信.*)/).findOnce() != null && packageName("com.tencent.mm").id("nk").className("android.widget.TextView").textMatches(/(微信.*)/).findOnce().bounds().left > 0) {
                        log("进入列表成功")
                        break;
                    };
                    let wBtn = wBtns[i];
                    for (let i = 0; i < 4; i++) {
                        if (wBtn != null && wBtn.clickable()) {
                            sleep(1000);
                            wBtn.click();
                            sleep(5000);
                            if (packageName("com.tencent.mm").id("nk").className("android.widget.TextView").textMatches(/(微信.*)/).findOnce() != null && packageName("com.tencent.mm").id("nk").className("android.widget.TextView").textMatches(/(微信.*)/).findOnce().bounds().left > 0) {
                                break;
                            };
                        } else if (wBtn != null && wBtn.parent() != null) {
                            wBtn = wBtn.parent();
                        }
                    }
                }
                wBtns = packageName("com.tencent.mm").id('a4k').find();//8.0.10
                if (wBtns.length == 0) {
                    wBtns = packageName("com.tencent.mm").id('bg1').find();//8.0.1
                }
                if (wBtns.length > 0) {
                    sleep(random(8000, 10000))

                    if (random(0, 1) == 0) {
                        for (let i = 1; i > -1; i--) {
                            longclickx(wBtns[i].bounds().centerX(), wBtns[i].bounds().centerY())
                            //wBtns[i].longClick()
                            sleep(random(2000, 4000));
                            if (text("取消置顶").findOne(3000) != null) {
                                back();
                                sleep(2000)
                                click(wBtns[i].bounds().centerX() + random(-5, 5), wBtns[i].bounds().centerY())
                                //wBtns[i].click();
                                sleep(random(1500, 2000))
                                if (packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(大家庭.*)/).findOne(3000) != null) {
                                    log("进入了大家庭");
                                    break
                                } else {
                                    sleep(random(30000, 120000))
                                    back();
                                    sleep(3000)
                                    continue;
                                }
                            } else {
                                console.error("置顶not found 大家庭")
                                关闭应用(PKG_NAME);
                                lunSleep(30000);
                                return
                            }
                        }
                    } else {
                        for (let i = 0; i < wBtns.length; i++) {
                            longclickx(wBtns[i].bounds().centerX(), wBtns[i].bounds().centerY())
                            //wBtns[i].longClick()
                            sleep(random(2000, 4000));
                            if (text("取消置顶").findOne(3000) != null) {
                                back();
                                sleep(2000)
                                click(wBtns[i].bounds().centerX() + random(-5, 5), wBtns[i].bounds().centerY())
                                wBtns[i].click();
                                sleep(random(1500, 2000))
                                if (packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(大家庭.*)/).findOne(3000) != null) {
                                    log("进入了大家庭");
                                    break
                                } else {
                                    sleep(random(30000, 120000))
                                    back();
                                    sleep(3000)
                                    continue;
                                }
                            } else {
                                console.error("置顶not found 大家庭")
                                关闭应用(PKG_NAME);
                                lunSleep(30000);
                                return
                            }
                        }
                    }



                    wBtn = packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(大家庭.*)/).findOne(5000);
                    if (wBtn != null) {
                        //addjieshouCount("进入大家庭+1")
                        let icount = random(10, 20); //读10~20次才结束
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
                                        if (child != null) {
                                            if (child.className() == "android.widget.ImageView" && child.desc()) {
                                                latestTalkName = child.desc();
                                                latestTalkName = latestTalkName.TextFilter()
                                            }
                                            if (child.className() == "android.widget.FrameLayout") {
                                                if (child.children() != null && child.children()[0] != null) {
                                                    latestLink = child;
                                                    latestLinkTitle = child.children()[0].text() + child.children()[2].text();
                                                    latestLinkTitle = latestLinkTitle.TextFilter()
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        }
                        if (latestTalkName == "" && latestLinkTitle == "") {
                            console.error(new Date().toLocaleString() + "-" + "-----------------当前发言人:" + latestTalkName + ",当前标题:" + latestLinkTitle);
                        }


                        let loopCount = 0;//循环次数
                        let starttime = new Date().getTime();
                        let readluntime = random(3000000, 4000000)
                        for (let i = 0; i < icount;) {
                            //3000~4000秒休息一次
                            if (new Date().getTime() - starttime > readluntime) {
                                break;
                            }
                            if (addjieshouCount(phoneNum.toString()) == false) {
                                //console.error(new Date().toLocaleString() + "-" + "-----------------接收失败---休整");
                                sleep(random(30000, 180000))
                                //reducejieshouCount(phoneNum.toString())
                                返回v首页();
                                sleep(random(7200000, 14400000));
                                return
                            }
                            loopCount++
                            if (loopCount % 25 == 0) {
                                配置 = 读取配置(settingPath);
                                if (配置["date"] != new Date().toLocaleDateString()) {
                                    //reducejieshouCount("跨日结束-1")
                                    返回v首页();
                                    sleep(random(3000, 5000))
                                    home();
                                    return;
                                }
                                if (联网验证(zwifi) != true) {
                                    连接wifi(zwifi, 5000);
                                    app.launch(PKG_NAME);
                                    sleep(10000)
                                }
                            }
                            wBtn = packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(大家庭.*)/).findOne(5000);//id=ipv
                            if (wBtn != null) {
                                if (loopCount % 30 == 0 && 列表到底() == false) {
                                    home();
                                    continue;
                                }
                                let repData = getConfig();
                                if (repData == undefined) {
                                    sleep(10000)
                                    continue;
                                }
                                //log(repData)
                                let lastTalkName = repData["lastTalkName"] != undefined ? repData["lastTalkName"] : "";//上一发言人
                                let lastLinkTitle = repData["lastLinkTitle"] != undefined ? repData["lastLinkTitle"] : "";//上一文章的标题
                                lastLinkTitle = lastLinkTitle.split("&&")[0];


                                news = packageName("com.tencent.mm").className("android.widget.ListView").findOne(5000);
                                if (news != null && news.children() != null) {
                                    newsList = news.children();
                                    if (newsList.length > 0) {
                                        //最新消息
                                        let latestNews = newsList[newsList.length - 1];
                                        if (latestNews != null && latestNews.className() == "android.widget.RelativeLayout") {
                                            latestNews.children().forEach(function (child) {
                                                if (child != null) {
                                                    if (child.className() == "android.widget.ImageView" && child.desc()) {
                                                        latestTalkName = child.desc();
                                                        latestTalkName = latestTalkName.TextFilter()
                                                    }
                                                    if (child.className() == "android.widget.FrameLayout") {
                                                        if (child.children() != null && child.children()[0] != null) {
                                                            latestLink = child;
                                                            latestLinkTitle = child.children()[0].text() + child.children()[2].text();
                                                            latestLinkTitle = latestLinkTitle.TextFilter()
                                                        }
                                                    }
                                                }
                                            })
                                        } else {
                                            latestTalkName = ""
                                            latestLinkTitle = ""
                                        }
                                    } else {
                                        latestTalkName = ""
                                        latestLinkTitle = ""
                                    }
                                } else {
                                    latestTalkName = ""
                                    latestLinkTitle = ""
                                }

                                let jieshouc = getjieshouCount(2);
                                if (latestTalkName != "" && latestLinkTitle != "" && latestTalkName != lastTalkName) {
                                    log(new Date().toLocaleString() + "-" + "-----------------发言人变化,上一发言人:" + lastTalkName + ",当前发言人:" + latestTalkName);
                                    if (jieshouc < 3 || random(0, 1) == 1) {
                                        latestLink.click();
                                        //接收文章进入阅读
                                        sleep(1000)
                                        reducejieshouCount(phoneNum.toString())
                                        let cBtn = packageName("com.tencent.mm").id("activity-name").className("android.view.View").findOne(15000)
                                        sleep(5000)
                                        cBtn = packageName("com.tencent.mm").id("activity-name").className("android.view.View").findOne(5000)
                                        let js_name = packageName("com.tencent.mm").id("js_name").className("android.view.View").findOne(5000)
                                        let publish_time = packageName("com.tencent.mm").id("publish_time").className("android.view.View").findOne(5000)
                                        if (cBtn != null && cBtn.text() != undefined && cBtn.text() != "" && js_name != null && js_name.desc() != undefined && js_name.desc() != "" && publish_time != null && publish_time.text() != undefined && publish_time.text() != "") {
                                            latestLinkTitle = latestLinkTitle + "&&" + new Date(Date.parse(publish_time.text().replace(/-/g, "/"))).getTime()
                                            setConfig(latestTalkName, latestLinkTitle, phoneNum.toString())
                                        }

                                        阅读到底();
                                        sleep(random(30000, 60000))
                                        i = i + 1
                                        console.log(new Date().toLocaleString() + "-" + "----------第" + i)
                                        wBtn = packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(大家庭.*)/).findOnce();//id=ipv
                                        if (wBtn != null) {
                                            //addjieshouCount("阅读完成正常返回+1")
                                        } else {
                                            返回v首页();
                                            sleep(random(3000, 5000))
                                            home();
                                            return;
                                        }
                                    }

                                } else {
                                    if (latestTalkName != "" && latestLinkTitle != "" && lastLinkTitle != latestLinkTitle) {
                                        log(new Date().toLocaleString() + "-" + "-----------------发言内容变化,上一标题:" + lastLinkTitle + ",当前标题:" + latestLinkTitle);

                                        if (jieshouc < 3 || random(0, 1) == 1) {
                                            latestLink.click();
                                            //接收文章进入阅读
                                            sleep(1000)
                                            reducejieshouCount(phoneNum.toString())
                                            let cBtn = packageName("com.tencent.mm").id("activity-name").className("android.view.View").findOne(15000)
                                            sleep(5000)
                                            cBtn = packageName("com.tencent.mm").id("activity-name").className("android.view.View").findOne(5000)
                                            let js_name = packageName("com.tencent.mm").id("js_name").className("android.view.View").findOne(5000)
                                            let publish_time = packageName("com.tencent.mm").id("publish_time").className("android.view.View").findOne(5000)
                                            if (cBtn != null && cBtn.text() != undefined && cBtn.text() != "" && js_name != null && js_name.desc() != undefined && js_name.desc() != "" && publish_time != null && publish_time.text() != undefined && publish_time.text() != "") {
                                                latestLinkTitle = latestLinkTitle + "&&" + new Date(Date.parse(publish_time.text().replace(/-/g, "/"))).getTime()
                                                setConfig(latestTalkName, latestLinkTitle, phoneNum.toString())
                                            }

                                            阅读到底();
                                            sleep(random(30000, 60000))
                                            i = i + 1
                                            console.log(new Date().toLocaleString() + "-" + "----------第" + i)
                                            wBtn = packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(大家庭.*)/).findOnce();//id=ipv
                                            if (wBtn != null) {
                                                //addjieshouCount("阅读完成正常返回+1")
                                            } else {
                                                返回v首页();
                                                sleep(random(3000, 5000))
                                                home();
                                                return;
                                            }
                                        }
                                    }
                                }
                            } else {
                                //reducejieshouCount("找不到大家庭退出-1")
                                返回v首页();
                                sleep(random(3000, 5000))
                                home();
                                return;
                            }

                            sleep(10000)

                        }
                        //reducejieshouCount("阅读循环结束-1")
                        返回v首页();
                        sleep(random(3000, 5000))
                        home();
                        sleep(random(150000, 300000));
                        关闭应用(PKG_NAME);
                        sleep(random(150000, 300000));
                    } else {
                        console.error("not found 大家庭")
                        关闭应用(PKG_NAME);
                        sleep(300000);
                    }

                } else {
                    console.error("not found bg1")
                    关闭应用(PKG_NAME);
                    sleep(300000);
                }
            }
            function jieshouwenzhang2() {
                //进入指定群，接收文章
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                    app.launch(PKG_NAME);
                }
                sleep(10000)
                返回v首页();

                refreshStateInfo();
                let wBtn = packageName("com.tencent.mm").className("android.widget.TextView").text("通讯录").findOne(3000);
                if (topActivity == MAIN_PAGE && wBtn != null) {
                    log("返回首页成功");
                } else {
                    打开v()
                }
                let wBtns = className("android.widget.TextView").text("微信").find();
                for (let i = 0; i < wBtns.length; i++) {
                    if (packageName("com.tencent.mm").id("nk").className("android.widget.TextView").textMatches(/(微信.*)/).findOnce() != null && packageName("com.tencent.mm").id("nk").className("android.widget.TextView").textMatches(/(微信.*)/).findOnce().bounds().left > 0) {
                        log("进入列表成功")
                        break;
                    };
                    let wBtn = wBtns[i];
                    for (let i = 0; i < 4; i++) {
                        if (wBtn != null && wBtn.clickable()) {
                            sleep(1000);
                            wBtn.click();
                            sleep(5000);
                            if (packageName("com.tencent.mm").id("nk").className("android.widget.TextView").textMatches(/(微信.*)/).findOnce() != null && packageName("com.tencent.mm").id("nk").className("android.widget.TextView").textMatches(/(微信.*)/).findOnce().bounds().left > 0) {
                                break;
                            };
                        } else if (wBtn != null && wBtn.parent() != null) {
                            wBtn = wBtn.parent();
                        }
                    }
                }
                wBtns = packageName("com.tencent.mm").id('a4k').find();//8.0.10
                if (wBtns.length == 0) {
                    wBtns = packageName("com.tencent.mm").id('bg1').find();//8.0.1
                }
                if (wBtns.length > 1) {
                    sleep(2000)
                    click(wBtns[0].bounds().centerX() + random(-10, 10), wBtns[0].bounds().centerY())
                    sleep(random(1500, 2000))
                    if (packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(文件传输助手)/).findOne(3000) != null) {
                        log("进入了文件传输助手");
                    }

                    // sleep(random(8000, 10000))

                    // if (random(0, 1) == 0) {
                    //     for (let i = 2; i > -1; i--) {
                    //         if (i > wBtns.length - 1) {
                    //             continue
                    //         }
                    //         longclickx(wBtns[i].bounds().centerX(), wBtns[i].bounds().centerY())
                    //         //wBtns[i].longClick()
                    //         sleep(random(2000, 4000));
                    //         if (text("取消置顶").findOne(3000) != null) {
                    //             back();
                    //             sleep(2000)
                    //             click(wBtns[i].bounds().centerX() + random(-5, 5), wBtns[i].bounds().centerY())
                    //             //wBtns[i].click();
                    //             sleep(random(1500, 2000))
                    //             if (packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(文件传输助手)/).findOne(3000) != null) {
                    //                 log("进入了文件传输助手");
                    //                 break
                    //             } else {
                    //                 sleep(random(10000, 20000))
                    //                 back();
                    //                 sleep(3000)
                    //                 continue;
                    //             }
                    //         } else {
                    //             if (i == 0) {
                    //                 console.error("置顶not found 文件传输助手")
                    //                 关闭应用(PKG_NAME);
                    //                 lunSleep(30000);
                    //                 return
                    //             }
                    //             continue;

                    //         }
                    //     }
                    // } else {
                    //     for (let i = 0; i < wBtns.length; i++) {
                    //         longclickx(wBtns[i].bounds().centerX(), wBtns[i].bounds().centerY())
                    //         //wBtns[i].longClick()
                    //         sleep(random(2000, 4000));
                    //         if (text("取消置顶").findOne(3000) != null) {
                    //             back();
                    //             sleep(2000)
                    //             click(wBtns[i].bounds().centerX() + random(-5, 5), wBtns[i].bounds().centerY())
                    //             //wBtns[i].click();
                    //             sleep(random(1500, 2000))
                    //             if (packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(文件传输助手)/).findOne(3000) != null) {
                    //                 log("进入了文件传输助手");
                    //                 break
                    //             } else {
                    //                 sleep(random(10000, 20000))
                    //                 back();
                    //                 sleep(3000)
                    //                 continue;
                    //             }
                    //         } else {
                    //             console.error("置顶not found 文件传输助手")
                    //             关闭应用(PKG_NAME);
                    //             lunSleep(30000);
                    //             return
                    //         }
                    //     }
                    // }



                    wBtn = packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(文件传输助手)/).findOne(5000);
                    if (wBtn != null) {
                        let icount = random(1000, 2000); //读1000~2000次才结束
                        let loopCount = 0;//循环次数
                        let starttime = new Date().getTime();
                        let readluntime = random(3000000, 4000000)
                        for (let i = 0; i < icount;) {
                            //3000~4000秒休息一次
                            /*if (new Date().getTime() - starttime > readluntime) {
                                break;
                            }*/
                            if (sffs) {
                                if (addjieshouCountFu(phoneNum.toString()) == false) {
                                    sleep(random(30000, 60000));
                                    return
                                }
                            } else if (addjieshouCount(phoneNum.toString()) == false) {
                                sleep(random(30000, 60000));
                                return
                            }
                            loopCount++
                            if (loopCount % 25 == 0) {
                                配置 = 读取配置(settingPath);
                                if (配置["date"] != new Date().toLocaleDateString()) {
                                    //reducejieshouCount("跨日结束-1")
                                    返回v首页();
                                    sleep(random(3000, 5000))
                                    home();
                                    return;
                                }
                                if (联网验证(zwifi) != true) {
                                    连接wifi(zwifi, 5000);
                                    app.launch(PKG_NAME);
                                    sleep(10000)
                                }
                            }
                            wBtn = packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(文件传输助手.*)/).findOne(5000);//id=ipv
                            if (wBtn != null) {
                                if (latestUrl != "" && lastUrl != latestUrl) {
                                    lastUrl = latestUrl;
                                    let p = className("android.widget.EditText").boundsInside(0, device.height * 0.7, device.width, device.height).packageName("com.tencent.mm").findOne(5000);
                                    if (p) {
                                        p.setText(latestUrl)
                                        sleep(2000)
                                        p.click();
                                        sleep(1000)
                                        back();
                                        sleep(2000)
                                    }
                                    p = text("发送").className("android.widget.Button").packageName("com.tencent.mm").findOnce()
                                    if (p) {
                                        clickx(p.bounds().centerX(), p.bounds().centerY());
                                        sleep(3000)
                                        p = descEndsWith("头像").className("android.widget.ImageView").packageName("com.tencent.mm").find()
                                        if (p.length > 0) {
                                            sleep(1000)
                                            click(p[p.length - 1].bounds().centerX() - 300, p[p.length - 1].bounds().centerY());
                                        }
                                    }

                                    //接收文章进入阅读
                                    sleep(1000)
                                    if (sffs) {
                                        reducejieshouCountFu(phoneNum.toString())
                                    } else {
                                        reducejieshouCount(phoneNum.toString())
                                    }
                                    let cBtn = packageName("com.tencent.mm").id("activity-name").className("android.view.View").findOne(15000)
                                    sleep(5000)
                                    cBtn = packageName("com.tencent.mm").id("activity-name").className("android.view.View").findOne(5000)
                                    let js_name = packageName("com.tencent.mm").id("js_name").className("android.view.View").findOne(5000)
                                    let publish_time = packageName("com.tencent.mm").id("publish_time").className("android.view.View").findOne(5000)
                                    let fabudibtn = packageName("com.tencent.mm").id("js_ip_wording_wrp").className("android.view.View").findOnce();
                                    let read_area = packageName("com.tencent.mm").id("js_read_area3").textMatches(/(阅读.*)/).findOnce();
                                    let js_focus = packageName("com.tencent.mm").id("js_focus").findOnce();
                                    let read_area_num = "";
                                    if (read_area) {
                                        read_area_num = read_area.text();
                                    }
                                    let fabudi = "";
                                    if (fabudibtn) {
                                        fabudi = fabudibtn.text();
                                    }
                                    if (cBtn != null && cBtn.text() != undefined && cBtn.text() != "" && js_name != null && js_name.desc() != undefined && js_name.desc() != "" && publish_time != null && publish_time.text() != undefined && publish_time.text() != "") {
                                        let latestLinkTitle = cBtn.text() + js_name.desc();
                                        latestLinkTitle = latestLinkTitle.TextFilter();
                                        //latestLinkTitle = latestLinkTitle + "&&" + new Date(Date.parse(publish_time.text().replace(/-/g, "/"))).getTime()
                                        latestLinkTitle = latestUrl
                                        let xiaoyueyuecheckFlag = true
                                        if (sffs) {
                                            if (read_area == null && js_focus == null && isInJiancegongzhonghao(encodeURIComponent(js_name.desc())) == false && fabudi.indexOf("浙江") == -1 && fabudi.indexOf("江西") == -1) {
                                                xiaoyueyuecheckFlag = false;
                                            }
                                            if (read_area && packageName("com.tencent.mm").id("js_read_area3").textMatches(/(.*万.*)/).findOnce()) {
                                                xiaoyueyuecheckFlag = false;
                                            }
                                            if (new Date().getTime() - new Date(Date.parse(publish_time.text().replace(/-/g, "/"))).getTime() < 24 * 3600 * 1000) {
                                                if (read_area && packageName("com.tencent.mm").id("js_read_area3").findOnce().text().match(/\d+/g)[0] > 1000) {
                                                    xiaoyueyuecheckFlag = false;
                                                }
                                            }
                                            if (new Date().getTime() - new Date(Date.parse(publish_time.text().replace(/-/g, "/"))).getTime() < 3 * 24 * 3600 * 1000) {
                                                if (read_area && packageName("com.tencent.mm").id("js_read_area3").findOnce().text().match(/\d+/g)[0] > 3000) {
                                                    xiaoyueyuecheckFlag = false;
                                                }
                                            }
                                            if (new Date().getTime() - new Date(Date.parse(publish_time.text().replace(/-/g, "/"))).getTime() < 7 * 24 * 3600 * 1000) {
                                                if (read_area && packageName("com.tencent.mm").id("js_read_area3").findOnce().text().match(/\d+/g)[0] > 3000) {
                                                    xiaoyueyuecheckFlag = false;
                                                }
                                            }
                                            if (new Date().getTime() - new Date(Date.parse(publish_time.text().replace(/-/g, "/"))).getTime() > 7 * 24 * 3600 * 1000) {
                                                if (read_area && packageName("com.tencent.mm").id("js_read_area3").findOnce().text().match(/\d+/g)[0] > 3000 && fabudi.indexOf("浙江") == -1 && fabudi.indexOf("江西") == -1) {
                                                    xiaoyueyuecheckFlag = false;
                                                }
                                            }
                                            if (read_area) {
                                                if (read_area.bounds().top > device.height * 5) {
                                                    xiaoyueyuecheckFlag = false;
                                                } else if (read_area.bounds().top > device.height * 3 && fabudi.indexOf("浙江") == -1 && fabudi.indexOf("江西") == -1) {
                                                    xiaoyueyuecheckFlag = false;
                                                }
                                            }
                                            if (js_focus) {
                                                if (js_focus.bounds().top > device.height * 5) {
                                                    xiaoyueyuecheckFlag = false;
                                                } else if (js_focus.bounds().top > device.height * 3 && fabudi.indexOf("浙江") == -1 && fabudi.indexOf("江西") == -1) {
                                                    xiaoyueyuecheckFlag = false;
                                                }
                                            }
                                            if (xiaoyueyuecheckFlag == false) {
                                                //去掉检测方
                                                deleteJiancegongzhonghao(encodeURIComponent(js_name.desc()))
                                            } else {
                                                setConfig("latestTalkName", latestLinkTitle, phoneNum.toString())
                                            }
                                        }

                                    }

                                    阅读到底();
                                    sleep(random(3000, 6000))
                                    i = i + 1
                                    console.log(new Date().toLocaleString() + "-" + "----------第" + i)
                                    wBtn = packageName("com.tencent.mm").className("android.widget.TextView").textMatches(/(文件传输助手)/).findOnce();//id=ipv
                                    if (wBtn != null) {
                                        if (sffs) {
                                            fenxiangshibaiFu();
                                        } else {
                                            fenxiangshibai();
                                        }
                                        //addjieshouCount("阅读完成正常返回+1")
                                    } else {
                                        返回v首页();
                                        sleep(random(3000, 5000))
                                        home();
                                        return;
                                    }
                                } else {
                                    sleep(random(3000, 5000))
                                }
                            } else {
                                //reducejieshouCount("找不到文件传输助手退出-1")
                                log("找不到文件传输助手退出")
                                返回v首页();
                                sleep(random(3000, 5000))
                                home();
                                return;
                            }

                            sleep(10000)

                        }
                        //reducejieshouCount("阅读循环结束-1")
                        返回v首页();
                        sleep(random(3000, 5000))
                        home();
                        sleep(random(150000, 300000));
                        关闭应用(PKG_NAME);
                        sleep(random(150000, 300000));
                    } else {
                        console.error("not found 文件传输助手")
                        关闭应用(PKG_NAME);
                        sleep(300000);
                    }

                } else {
                    console.error("not found bg1")
                    关闭应用(PKG_NAME);
                    sleep(300000);
                }
            }
            function 进入收藏() {
                打开v();
                返回v首页();
                refreshStateInfo();
                let wBtn = className("android.widget.TextView").text("我").findOne(3000);
                if (topActivity == MAIN_PAGE && wBtn != null) {
                    log("返回v首页成功！");
                    let wBtns = className("android.widget.TextView").text("我").find();
                    for (let i = 0; i < wBtns.length; i++) {
                        if (className("android.widget.TextView").text("收藏").findOne(5000) != null) {
                            break;
                        };
                        let wBtn = wBtns[i];
                        for (let i = 0; i < 4; i++) {
                            if (wBtn != null && wBtn.clickable()) {
                                wBtn.click();
                                sleep(3000);
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
                }
            }




            function 阅读到底() {
                sleep(5000);
                log("滑动");
                let slideCount = random(10, 15)
                for (let i = 0; i < slideCount; i++) {
                    kz();
                    等待未响应();
                    swapeToRead();
                    sleep(random(3000, 5000));
                    if (checkWatchFull()) {
                        log("到底了");
                        break;
                    }
                }
                // swapeToRead();
                // sleep(random(2000, 4000));
                // swapeToRead();
                // sleep(random(2000, 4000));
                // swapeToRead();
                // sleep(random(2000, 4000));
                // swapeToRead();
                // sleep(random(2000, 4000));
                // swapeToRead();
                // sleep(random(2000, 4000));
                // swapeToRead();
                // sleep(random(2000, 4000));
                // if (device.brand == "samsung") {
                //     for (let i = 0; i < 7; i++) {
                //         kz();
                //         swapeToRead();
                //         sleep(random(2000, 4000));
                //         if (checkWatchFull()) {
                //             log("到底了");
                //             break;
                //         }
                //     }
                // } else {
                //     try {
                //         for (let i = 0; i < 7; i++) {
                //             kz();
                //             var img = captureScreen();
                //             var imgH = img.height;
                //             var clip = images.clip(img, 0, img.height - 200, 200, 20);
                //             swapeToRead();
                //             sleep(random(4000, 5000));
                //             var p = findImage(captureScreen(), clip, {
                //                 region: [0, imgH - 300, 220, 150],
                //                 threshold: 0.9
                //             });
                //             img.recycle();//不再使用需要手动回收
                //             if (p || checkWatchFull()) {
                //                 log("到底了");
                //                 break;
                //             }
                //         }
                //     } catch (e) {
                //         for (let i = 0; i < 7; i++) {
                //             kz();
                //             swapeToRead();
                //             sleep(random(2000, 4000));
                //             if (checkWatchFull()) {
                //                 log("到底了");
                //                 break;
                //             }
                //         }
                //     }
                // }

                // 等待未响应();
                back();
            }

            function 列表到底() {
                for (let i = 0; i < 15; i++) {
                    等待未响应();
                    kz();
                    var img = captureScreen();
                    var imgH = img.height;
                    var clip = images.clip(img, 0, img.height - 300, 300, 200);
                    swapeToRead();
                    sleep(random(4000, 5000));
                    var p = findImage(captureScreen(), clip, {
                        region: [0, imgH - 400, 350, 400],
                        threshold: 0.9
                    });
                    img.recycle();//不再使用需要手动回收
                    if (p) {
                        //log("到底了");
                        return true
                    } else if (i == 14) {
                        log("未到底");
                        return false
                    }
                }

            }


            function 页面异常处理() {
                if (className("android.widget.TextView").textMatches(/(.*请从微信正常阅读.*|.*异常.*|.*失败.*|.*登陆超时.*|.*重试.*)/).findOne(3000) != null) {
                    log("异常回退：" + className("android.widget.TextView").textMatches(/(.*请从微信正常阅读.*|.*异常.*|.*失败.*|.*登陆超时.*|.*重试.*)/).findOne(3000));
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
                log("初始化配置")
                files.createWithDirs(path)  //开始创建文件
                let jsonContent = {
                    "date": new Date().toLocaleDateString(),
                    "lunCount": 1,
                    "count": 1
                }
                files.write(path, JSON.stringify(jsonContent));
                sleep(1000);
                if (random(0, 10) == 5) {
                    启动x5()
                }
            }

            function 初始化配置2(path) {
                files.createWithDirs(path)  //开始创建文件
                let jsonContent = {
                    /*"date": new Date().toLocaleDateString(),
                    "lunCount": 1,
                    "count": 1,
                    "lunCountllb": 1,
                    "countllb": 1*/
                }
                //jsonContent[device.serial] = new Date().getTime()
                files.write(path, JSON.stringify(jsonContent));
                sleep(1000);
            }

            function 保存配置(path, jsonContent) {
                try {
                    files.createWithDirs(path)  //开始创建文件
                    files.write(path, JSON.stringify(jsonContent));
                    sleep(1000);
                } catch (e) {
                    console.error(e);
                    sleep(1000);
                    return 保存配置(path, jsonContent);
                }

            }

            function 读取配置(path) {
                try {
                    var rDate = JSON.parse(files.read(path));
                    sleep(1000);
                    return rDate
                } catch (e) {
                    console.error(e);
                    sleep(1000);
                    return 读取配置(path);
                }

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
                jieshouwenzhang2();
                返回v首页();
            }

            function quGuan(sleepTime) {
                log("进入v成功");
                let wBtns = className("android.widget.TextView").text("通讯录").find();
                for (let i = 0; i < wBtns.length; i++) {
                    if (className("android.widget.TextView").text("公众号").findOne(5000) != null) {
                        break;
                    };
                    let wBtn = wBtns[i];
                    for (let i = 0; i < 4; i++) {
                        if (wBtn != null && wBtn.clickable()) {
                            wBtn.click();
                            sleep(3000);
                            if (className("android.widget.TextView").text("公众号").findOne(5000) != null) {
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
                    sleepTime = random(4000000, 8400000);
                }
                log(new Date().toLocaleString() + "-" + "-----------" + "休息" + sleepTime / 1000 / 60 + "分钟");
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
                log(new Date().toLocaleString() + "-" + "-----------");
                for (let i = 0; i < sleepTime / 1000 / 60; i++) {
                    配置 = 读取配置(settingPath);
                    if (i % 10 == 0) {
                        if (联网验证(zwifi) != true) {
                            连接wifi(zwifi, 5000);
                        }
                        if (配置["date"] != new Date().toLocaleDateString()) {
                            break
                        }
                    }
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
                        sleep(2000);
                        log("topPackage != PKG_NAME打开PKG_NAME" + PKG_NAME);
                        app.launch(PKG_NAME);
                        sleep(15000);
                        refreshStateInfo();
                        if (topPackage != PKG_NAME) {
                            log("无法打开PKG_NAME" + PKG_NAME);
                            关闭应用(PKG_NAME);
                            sleep(2000);
                            home();
                            sleep(1000);
                            return;
                        }
                    }
                    /*if(className("android.widget.TextView").textContains("请从微信正常阅读").findOne(3000)!=null){
                        log(className("android.widget.TextView").textContains("请从微信正常阅读").findOne(3000));
                        click("确定");
                        sleep(8000);
                        continue;
                    }*/
                    /*if (className("android.widget.TextView").textMatches(/(.*请从微信正常阅读.*|.*异常.*|.*失败.*)/).findOne(3000) != null) {
                        log("异常确定：" + className("android.widget.TextView").textMatches(/(.*请从微信正常阅读.*|.*异常.*|.*失败.*)/).findOne(3000));
                        click("确定");
                        sleep(8000);
                        continue;
                    }*/
                    /*if (页面异常处理()) {
                        log("页面异常处理");
                        continue;
                    }*/
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
                        log("topActivity=" + topActivity + ",按返回键" + wBtn);
                        back();
                        sleep(5000);
                    } else {
                        sleep(5000);
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
                var btn = textStartsWith("分享").boundsInside(0, 0, device.width, device.height - 1).findOnce();
                if (btn) {
                    return true;
                }
                let read_area = packageName("com.tencent.mm").id("js_read_area3").textMatches(/(阅读.*)/).findOnce();
                let js_focus = packageName("com.tencent.mm").id("js_focus").findOnce();
                if (read_area && read_area.bounds().top < device.height) {
                    return true;
                }
                if (js_focus && js_focus.bounds().top < device.height) {
                    return true;
                }
                return false;
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
                if (wifiName == zwifi) {
                    log("连接zwifi")
                } else if (wifiName == dlwifi) {
                    log("连接dlwifi")
                }
                if (zwifi.toString() != dlwifi.toString()) {
                    ui.run(function () { 悬浮窗.jbkz.visibility = 8 });
                    sleep(1000);
                    totificationlistenersetting()
                    sleep(3000);
                    if (device.brand == 'Meizu') {
                        let wifiSwitch = id("wifi_switch").className("com.meizu.common.widget.Switch").findOne(3000);
                        if (wifiSwitch != null) {
                            if (!wifiSwitch.checked()) {
                                sleep(1000);
                                wifiSwitch.click();
                                sleep(5000);
                            }
                        }
                    } else if (device.brand == 'Xiaomi') {

                    }
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
                            sleep(3000)
                            cBtn = text(wifiName).findOne(2000);
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
                    //log("zwifi验证")
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
                    //log("dlwifi验证")
                    try {
                        //let url = readurl;
                        let url = "mail.sina.com.cn"//"www.csdn.net";//mail.sina.com.cn
                        //log("url="+url)
                        let r = http.get(url.toString());
                        if (r.statusCode == "200") {
                            try {
                                url = "www.baidu.com";
                                //log("url="+url)
                                r = http.get(url);
                                //log(r)
                                //if (r.statusCode == "200") {
                                return false
                                //}
                            } catch (err) {
                                //log(err)
                                return true
                            }
                        }
                    } catch (err) {
                        console.error("错误原因:" + err);
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
                    qBtn = textMatches(/(取消)/).findOnce();
                    if (qBtn != null) {
                        sleep(500)
                        qBtn.click();
                    }
                }
                qBtn = textMatches(/(.*保持连接.*)/).findOne(1000);
                if (qBtn != null && qBtn.enabled()) {
                    sleep(500)
                    qBtn.click();
                }
            }

            //回滚回接收
            function rollbackJieshou(phoneNum) {
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                    app.launch(PKG_NAME);
                }
                let temp = null;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/rollbackJieshou?phoneNum=" + phoneNum, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                        } else {
                            throw Error("rollbackJieshou失败" + temp)
                        }
                    } else {
                        throw Error("rollbackJieshou失败" + temp)
                    }
                } catch (err) {
                    console.error("rollbackJieshou报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(8000)
                    rollbackJieshou(phoneNum);

                }
            }

            //清除号码
            function removePhone(phoneNum) {
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                    app.launch(PKG_NAME);
                }
                let temp = null;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/removePhoneNum?phoneNum=" + phoneNum, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                        } else {
                            throw Error("removePhoneNum失败" + temp)
                        }
                    } else {
                        throw Error("removePhoneNum失败" + temp)
                    }
                } catch (err) {
                    console.error("removePhoneNum报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(8000)
                    removePhone(phoneNum);

                }
            }
            function fenxiangshibai() {
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                    app.launch(PKG_NAME);
                }
                let temp = null;
                try {
                    temp = http.postJson("http://175.178.60.114:8081/fanqie/fenxiangshibai", {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            return true
                        }
                    } else {
                        throw Error("fenxiangshibai获取数据失败" + temp)
                    }
                    return false
                } catch (err) {
                    console.error("fenxiangshibai报错,原因:" + err);
                    return false
                }
            }

            function fenxiangshibaiFu() {
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                    app.launch(PKG_NAME);
                }
                let temp = null;
                try {
                    temp = http.postJson("http://175.178.60.114:8081/fanqie/fenxiangshibaiFu", {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                            return true
                        }
                    } else {
                        throw Error("fenxiangshibaiFu获取数据失败" + temp)
                    }
                    return false
                } catch (err) {
                    console.error("fenxiangshibaiFu报错,原因:" + err);
                    return false
                }
            }

            //是否在接收列表
            function isInJieshou(phoneNum) {
                let temp = null;
                let repData = 0;;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/isInJieshou?phoneNum=" + phoneNum, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        repData = repState;
                    } else {
                        throw Error("isInJieshou失败" + temp)
                    }
                } catch (err) {
                    console.error("isInJieshou报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(8000)
                    repData = isInJieshou(phoneNum);
                }
                return repData

            }

            //添加到接收列表
            function addJieshouList(phoneNum) {
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                    app.launch(PKG_NAME);
                }
                let temp = null;
                try {
                    temp = http.post("http://175.178.60.114:8081/fanqie/addJieshou?phoneNum=" + phoneNum, {});
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        let rep = JSON.parse(temp);
                        let repState = rep["state"];
                        if (repState == 1) {
                        } else {
                            throw Error("addJieshou失败" + temp)
                        }
                    } else {
                        throw Error("addJieshou失败" + temp)
                    }
                } catch (err) {
                    console.error("addJieshou报错,原因:" + err);
                    if (联网验证(zwifi) != true) {
                        连接wifi(zwifi, 5000);
                        app.launch(PKG_NAME);
                    }
                    sleep(8000)
                    addJieshouList(phoneNum);

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
                        if (className("android.widget.TextView").text("收藏").findOne(5000) != null) {
                            break;
                        };
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

            let jietuThread = threads.start(function () {
                if (auto.service != null) {  //如果已经获得无障碍权限//由于系统间同意授权的文本不同，采用正则表达式
                    let Allow = textMatches(/(允许|立即开始|统一)/).findOne(10 * 1000);
                    if (Allow) {
                        Allow.click();
                    }
                }
            });
            // 请求屏幕截图权限
            if (!requestScreenCapture(true)) {
                toastLog("请求截图失败");
                exit();
            } else {
                jietuThread.interrupt()
                toastLog("请求截图成功");
            }


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
            var zhu_setting = files.join("/sdcard/fanqie/", "zhu_setting.txt")//1、定义文件路径名  2、files.cwd()会返回:  /sdcard/脚本/  3、path=/sdcard/脚本/fanqie.zip
            var shouhu_setting = files.join("/sdcard/fanqie/", "shouhu_setting.txt")//1、定义文件路径名  2、files.cwd()会返回:  /sdcard/脚本/  3、path=/sdcard/脚本/fanqie.zip

            if (!files.exists(settingPath)) {
                初始化配置(settingPath);
                toastLog("初始化文件配置");
            }
            if (!files.exists(zhu_setting)) {
                初始化配置2(zhu_setting);
                toastLog("初始化文件zhu_setting");
            }
            if (!files.exists(shouhu_setting)) {
                初始化配置2(shouhu_setting);
                toastLog("初始化文件shouhu_setting");
            }


            //app保活双进程守护
            function setAppAlive(name) {
                zhu_setting配置 = 读取配置(zhu_setting);
                zhu_setting配置[name] = new Date().getTime();
                保存配置(zhu_setting, zhu_setting配置);
                //toolsStorage.put(name, new Date().getTime());
            }

            setAppAlive(device.serial)


            function setShouhuAppAlive(name) {
                shouhu_setting配置 = 读取配置(shouhu_setting);
                shouhu_setting配置[name] = new Date().getTime();
                保存配置(shouhu_setting, shouhu_setting配置);
                //toolsStorage.put(name, new Date().getTime());
            }
            function getShouhuAppAlive(name) {
                shouhu_setting配置 = 读取配置(shouhu_setting);
                if (shouhu_setting配置 == undefined) {
                    toastLog("重置文件shouhu_setting配置");
                    初始化配置2(shouhu_setting);
                }
                if (shouhu_setting配置[name] != undefined) {
                    setAppAlive(device.serial)
                    if (new Date().getTime() - shouhu_setting配置[name] < 60 * 1000) {
                        return true
                    } else {
                        return false
                    }

                } else {
                    return true
                }
                /*if (toolsStorage.get(name) != undefined) {
                    if (new Date().getTime() - toolsStorage.get(name) < 60 * 1000) {
                        return true
                    } else {
                        return false
                    }
            
                } else {
                    return true
                }*/
            }

            function ShouhuAppIsStart(name) {
                shouhu_setting配置 = 读取配置(shouhu_setting);
                if (shouhu_setting配置 == undefined) {
                    toastLog("重置文件shouhu_setting配置");
                    初始化配置2(shouhu_setting);
                }
                if (shouhu_setting配置[name] != undefined) {
                    setAppAlive(device.serial)
                    if (new Date().getTime() - shouhu_setting配置[name] < 0) {
                        return true
                    } else {
                        return false
                    }

                } else {
                    console.error("shouhu_setting配置[name] == undefined");
                    return true
                }

            }

            var 进程守护lock = threads.lock();
            function 进程守护() {
                //log("进程守护")
                // 获取锁
                进程守护lock.lock();
                try {
                    if (getShouhuAppAlive(device.serial + "守护") == false) {
                        setShouhuAppAlive(device.serial + "守护")
                        log("重启守护应用")
                        home();
                        sleep(5000);
                        app.launch("com.fanqie.shouhu");
                        sleep(8000);
                        //back();
                        if (ShouhuAppIsStart(device.serial + "守护") == false) {
                            if (currentPackage() == "com.fanqie.shouhu") {
                                back();
                                sleep(5000);
                            }
                            app.launch("com.fanqie.shouhu");
                            sleep(8000);
                        }
                    }
                } finally {
                    // 释放锁
                    进程守护lock.unlock();
                }

                return 进程守护
            }

            threads.start(function () {
                setInterval(进程守护(), 60000);
            });
            配置 = 读取配置(settingPath);
            if (配置 == undefined) {
                初始化配置(settingPath);
            }

            var content = getdaili();//"要设置的剪贴板内容";
            setClip(content);
            log(getClip());

            if (addJieshou) {
                addJieshouList(phoneNum.toString());
                storage.put("addJieshou", false);
                storage.put("readdays", 0);
            }

            if (removePhoneNum) {
                removePhone(phoneNum.toString());
                storage.put("removePhoneNum", false);
                storage.put("readdays", 0);
                sleep(3000);
                exit();
            }

            function initws() {
                if (联网验证(zwifi) != true) {
                    连接wifi(zwifi, 5000);
                    app.launch(PKG_NAME);
                }
                ws = web.newWebSocket("ws://175.178.60.114:8081/fanqie/ws", {
                    eventThread: 'io'
                    /*eventThread {any} WebSocket事件派发的线程，默认为io
                    io 事件将在WebSocket的IO线程触发
                    this 事件将在创建WebSocket的线程触发，如果该线程被阻塞，则事件也无法被及时派发*/
                });
                ws.on("open", (res, ws) => {
                    log("WebSocket已连接");
                    ws.send(JSON.stringify({ "type": "ping", "phoneNum": phoneNum.toString() }))
                })/*.on("failure", (err, res, ws) => {
                log("WebSocket连接失败");
                console.error(err);
                ws.close(1000, null);
            })*/.on("closing", (code, reason, ws) => {
                    log("WebSocket关闭中");
                }).on("text", (text, ws) => {
                    //console.info("收到文本消息: ", text);
                    try {
                        if (JSON.parse(text)["url"] != undefined) {
                            console.info("latestUrl: ", JSON.parse(text)["url"]);
                            latestUrl = JSON.parse(text)["url"];
                        }
                    } catch (e) { }
                }).on("binary", (bytes, ws) => {
                    console.info("收到二进制消息：大小 ", bytes.size());
                    console.info("hex: ", bytes.hex());
                    console.info("base64: ", bytes.base64());
                    console.info("md5: ", bytes.md5());
                    console.info("bytes: ", bytes.toByteArray());
                    ws.send(ByteString.of($files.readBytes('./test.png'))); // 从byte\[\]创建二进制数据并发送
                    ws.send(ByteString.encodeUtf8('你好')); // 将字符串按UTF8编码并创建二进制数据并发送
                    ws.send(ByteString.decodeBase64('QXV0by5qcyBQcm8geXlkcw==')); // 解码Base64并创建二进制数据并发送
                    ws.send(ByteString.decodeHex('621172314F60')); // 解码hex并创建二进制数据并发送
                }).on("closed", (code, reason, ws) => {
                    log("WebSocket已关闭: code = %d, reason = %s", code, reason);
                });

            }
            // 脚本退出时取消WebSocket
            events.on('exit', () => {
                log("WebSocket已关闭");
                ws.close(1000, null);
            });

            function startWebSocket() {
                try {
                    if (ws == null) {
                        initws();
                    }
                    let success = ws.send(JSON.stringify({ "type": "ping", "phoneNum": phoneNum.toString() }))
                    if (!success) {
                        ws.close(1000, null);
                        sleep(1000)
                        initws();
                    }
                } catch (e) {
                    log(e)
                }
                return startWebSocket;
            }
            setInterval(startWebSocket(), 10000);

            if (jieshouwifi != null && jieshouwifi != "") {
                zwifi = jieshouwifi
            }

            var lock1 = threads.lock();
            threads.start(function () {
                lock1.lock(); // 获取锁
                try {
                    for (; ;) {
                        kz();
                        nowHour = new Date().getHours();
                        log("当前时间:" + nowHour + "时");
                        toastLog("版本号:" + versionNum);

                        配置 = 读取配置(settingPath);
                        if (配置["date"] != new Date().toLocaleDateString()) {
                            storage.put("zhengtian", false);
                            zhengtian = false
                            sleep(random(10000, 60000));
                            if (联网验证(zwifi) != true) {
                                连接wifi(zwifi, 5000);
                                sleep(10000);
                            }
                            if (getjieshouNum() == phoneNum.toString()) {
                                if (readdays >= sxreaddays) {
                                    sendTx("http://miaotixing.com/trigger?id=tmHi58G&text=num:" + phoneNum + "期满,任期" + readdays + "天");//切换
                                    while (1) {
                                        addXianZhi()
                                        sleep(5000)
                                        if (getjieshouNum() != phoneNum.toString()) {
                                            readdays = 0
                                            //跳出死循环
                                            break
                                        }
                                    }

                                    if (qiehuanjiaoben) {
                                        if (isInJieshou(phoneNum.toString()) == 0) {
                                            //转yuedu
                                            toolsStorage.put("toolsSelectIdx", 2);
                                            engines.execScriptFile(toolsStorage.get("脚本路径") + "juhefenxiang.js");
                                            exit();
                                        }
                                    } else {
                                        //回滚回接收
                                        rollbackJieshou(phoneNum.toString());
                                    }

                                } else {
                                    readdays++;
                                }
                            } else {
                                readdays = 0
                            }
                            storage.put("readdays", readdays);

                            初始化配置(settingPath);
                            console.clear();
                            toastLog("每天初始化配置");

                            /*if (new Date().getDate() % 3 == 0) {
                                app.launch("com.ss.android.ugc.aweme");
                                sleep(60000)
                                if (currentPackage() == "com.ss.android.ugc.aweme") {
                                    home();
                                    sleep(5000);
                                    关闭应用("com.ss.android.ugc.aweme");
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
                            }*/

                            if (random(0, 7) == 5) {
                                home()
                                lunSleep(random(1800000, 7200000));
                                关闭应用(PKG_NAME);
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

                        }

                        配置 = 读取配置(settingPath);
                        lunCount = 配置["lunCount"];
                        if (配置["lunCount"] == undefined) {
                            初始化配置(settingPath);
                        }

                        if (!zhengtian) {
                            if (nowHour < 6) {
                                home()
                                log(new Date().toLocaleString() + "-" + "----------------------------------------------" + "休息中");
                                sleepLongTime(random(1800000, 3000000));
                                关闭应用(PKG_NAME);
                                continue;
                            }
                        }


                        sleep(3000);
                        if (联网验证(zwifi) != true) {
                            连接wifi(zwifi, 5000);
                        }

                        if (getjieshouNum() != phoneNum.toString()) {
                            if (readdays > 0) {
                                sendTx("http://miaotixing.com/trigger?id=tmHi58G&text=num:" + phoneNum + "提前休息，已任天数" + (readdays));//切换
                                readdays = 0
                                storage.put("readdays", readdays);
                                if (qiehuanjiaoben) {
                                    //转yuedu
                                    toolsStorage.put("toolsSelectIdx", 2);
                                    engines.execScriptFile(toolsStorage.get("脚本路径") + "juhefenxiang.js");
                                    exit();
                                } else {
                                    //回滚回接收
                                    rollbackJieshou(phoneNum.toString());
                                }
                            }

                            if (getjieshouNumFu() != phoneNum.toString()) {
                                sffs = false;
                                if (random(0, 8 == 8)) {
                                    打开v();
                                    refreshStateInfo();
                                    /*if(topPackage != PKG_NAME){
                                        continue;
                                    }*/
                                    let wBtn = className("android.widget.TextView").text("我").findOne(3000);
                                    if (topActivity == MAIN_PAGE && wBtn != null) {
                                        onMainPage();
                                        sleep(random(7200000, 14400000));
                                    } else {
                                        返回v首页();
                                        lunSleep(1200000);
                                    }
                                } else if (random(0, 1 == 1)) {
                                    home();
                                    lunSleep(1200000);
                                }
                                continue;
                            } else {
                                sffs = true;
                            }
                        } else {
                            sffs = false;
                            if (readdays == 0) {
                                readdays = 1
                                storage.put("readdays", readdays);
                                sendTx("http://miaotixing.com/trigger?id=tmHi58G&text=num:" + phoneNum + "上任");//切换
                            }
                        }

                        打开v();


                        refreshStateInfo();
                        /*if(topPackage != PKG_NAME){
                            continue;
                        }*/
                        let wBtn = className("android.widget.TextView").text("我").findOne(3000);
                        if (topActivity == MAIN_PAGE && wBtn != null) {
                            onMainPage();
                        } else {
                            log(wBtn);
                            返回v首页();
                            continue;
                        }

                    }
                } finally {
                    lock1.unlock(); // 释放锁
                }
            });
        } finally {
            lock2.unlock(); // 释放锁
        }
    });
});




