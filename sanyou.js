
storage = storages.create("fanqiecloud配置");

var topPackage = "";
var topActivity = "";

var MAIN_PKG = "com.fanqie.cloud";
var PKG_NAME = "com.tencent.mm";
var MAIN_PAGE = "com.tencent.mm.ui.LauncherUI";
var versionNum = "v1.0.5";
auto.waitFor()//检查无障碍服务是否已经启用，会在在无障碍服务启动后继续运行。

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

//setInterval(() => { }, 1000);

var settingPath = files.join("/sdcard/fanqie/", "setting.txt")//1、定义文件路径名  2、files.cwd()会返回:  /sdcard/脚本/  3、path=/sdcard/脚本/fanqie.zip
if (!files.exists(settingPath)) {
    初始化配置(settingPath);
    toastLog("初始化配置");
}
function 初始化配置(path) {
    files.createWithDirs(path)  //开始创建文件
    let jsonContent = {
        /*"date": new Date().toLocaleDateString(),
        "lunCount": 1,
        "count": 1,
        "lunCountllb": 1,
        "countllb": 1*/
    }
    jsonContent[device.serial]=new Date().getTime()
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

//app保活双进程守护
function setAppAlive(name) {
    配置 = 读取配置(settingPath);
    配置[name] = new Date().getTime();
    保存配置(settingPath, 配置);
    //toolsStorage.put(name, new Date().getTime());
}
function getAppAlive(name) {
    配置 = 读取配置(settingPath);
    if (配置[name] != undefined) {
        if (new Date().getTime() - 配置[name] < 60 * 1000) {
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
function 进程守护() {
    //log("进程守护")
    setAppAlive(device.serial)
    if (getAppAlive(device.serial + "-1") == false) {
        setAppAlive(device.serial + "-1")
        log("重启守护应用")
        home();
        sleep(5000);
        app.launch("com.fanqie.shouhu");
    }
    return 进程守护
}
setInterval(进程守护(), 60000);





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
function shanyou() {
    let cBtn = packageName("com.tencent.mm").id('ft6').find()
    if (cBtn != null) {
        for (let i = 0; i < cBtn.length; i++) {
            if (cBtn[i].text() == "ROmantic~zZ" || cBtn[i].text() == "群姐" || cBtn[i].text() == "ZhaoLin"|| cBtn[i].text().lastIndexOf('信团队') >-1|| cBtn[i].text().lastIndexOf('传输助手') >-1|| cBtn[i].text().lastIndexOf('别信') >-1) {
                continue
            }
            let wBtn = cBtn[i]
            for (let i = 0; i < 4; i++) {
                if (wBtn != null && wBtn.clickable()) {
                    wBtn.click();
                    break;
                } else if(wBtn != null &&wBtn.parent()!=null){
                    wBtn = wBtn.parent();
                }
            }
            //clickx(cBtn[i].bounds().centerX(), cBtn[i].bounds().bottom);
            sleep(random(3000, 5000))
            let cBtn1 = packageName("com.tencent.mm").id('d8').findOne(8000)
            if (cBtn1 != null && cBtn1.clickable()) {
                cBtn1.click();
                sleep(random(3000, 5000))
                let cBtn2 = packageName("com.tencent.mm").text("删除").findOne(3000)
                if (cBtn2 != null) {
                    click("删除")
                    sleep(random(3000, 5000))
                    let cBtn3 = packageName("com.tencent.mm").id('ffp').findOne(3000)
                    if (cBtn3 != null && cBtn3.clickable()) {
                        cBtn3.click();
                        sleep(random(3000, 5000))
                        return false
                    } else {
                        back()
                        sleep(random(2000, 3000))
                        back()
                        sleep(random(2000, 3000))
                        back()
                        sleep(random(2000, 3000))
                        continue
                    }
                } else {
                    back()
                    sleep(random(2000, 3000))
                    back()
                    sleep(random(2000, 3000))
                    continue
                }
            } else {
                back()
                sleep(random(2000, 3000))
                continue
            }

        }
        return true
    }
}

function onMainPage() {
    //log("进入v成功");

    let wBtn = className("android.widget.TextView").text("通讯录").findOne(3000);
    for (let i = 0; i < 8; i++) {
        if (wBtn != null && wBtn.clickable()) {
            wBtn.click();
            sleep(3000);
            if (className("android.widget.TextView").text("公众号").findOne(5000) != null) {
                break;
            };
        } else if(wBtn != null &&wBtn.parent()!=null){
            wBtn = wBtn.parent();
        }
    }

    if (等待未响应() == 0) {
        if (结束未响应()) {
            return;
        }
    }
    if (className("android.widget.TextView").text("公众号").findOne(5000) == null) {
        return;
    };
    //log("进入通讯录成功");
    for (let i = 0; i < 4; i++) {
        if (等待未响应() == 0) {
            if (结束未响应()) {
                return;
            }
        }
        
        if (shanyou()) {
            if(random(0,1)==1){
                swapeToRead()
            }else{
                swapeDown()
            }
        }
    }
}

function swapeToRead() {
    if (currentPackage() == "com.tencent.mm") {
        let x1 = device.width * random(300, 400) / 1000;
        let y1 = device.height * random(700, 850) / 1000;
        let x2 = device.width * random(400, 500) / 1000;
        let y2 = device.height * random(450, 600) / 1000;
        //swipe(x1, y1, x2, y2, random(1200, 1500));
        sml_move(x1, y1, x2, y2, random(1200, 1500));
    }
}
function swapeDown() {
    if (currentPackage() == "com.tencent.mm") {
        let x1 = device.width * random(300, 400) / 1000;
        let y1 = device.height * random(700, 850) / 1000;
        let x2 = device.width * random(400, 500) / 1000;
        let y2 = device.height * random(450, 600) / 1000;
        //swipe(x1, y1, x2, y2, random(1200, 1500));
        sml_move( x2, y2,x1, y1, random(1200, 1500));
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
        if (等待未响应() == 0) {
            if (结束未响应()) {
                return;
            }
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
                sleep(30000)
                return 1;
            }
            cBtn = textMatches(/(等待)/).findOne(3000);
            if (cBtn != null) {
                log(new Date().toLocaleString() + "-" + "----------------------------------------------等待未响应失败");
                return 0;
            } else {
                log(new Date().toLocaleString() + "-" + "----------------------------------------------等待未响应成功");
                sleep(30000)
                return 1;
            }
        }
    }
    return -1;
}








//console.show();
/*sleep(1000);
console.setSize(device.width -100, device.height / 4);
sleep(2000);*/
/*if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
} else {
    toastLog("请求截图成功");
}*/
toastLog(device.brand);
toastLog("版本号:" + versionNum);



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





for (; ;) {
    kz();
    var nowHour = new Date().getHours();
    if (storage.get("date", new Date().toLocaleDateString()) != new Date().toLocaleDateString()) {
        toastLog("初始化配置");
        storage.put("date", new Date().toLocaleDateString());
        console.clear();
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


    if (nowHour < 7 && nowHour > 6) {
        sleep(random(3600000, 5000000));
        continue;
    }

    打开v();


    refreshStateInfo();
    let wBtn = className("android.widget.TextView").text("通讯录").findOne(3000);
    if (topActivity == MAIN_PAGE && wBtn != null) {
        onMainPage();
    } else {
        返回v首页();
        continue;
    }
    sleep(random(300000, 600000));

}



