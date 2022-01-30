//每隔一段时间清理空间及返回V首页
var topPackage = "";
var topActivity = "";

var MAIN_PKG = "com.fanqie.cloud";
var PKG_NAME = "com.tencent.mm";
var MAIN_PAGE = "com.tencent.mm.ui.LauncherUI";
var versionNum = "v2.0.4";

function refreshStateInfo() {
    sleep(1000);
    topPackage = currentPackage();
    sleep(1000);
    topActivity = currentActivity();
    log("==> topPackage: " + topPackage);
    log("==> topActivity: " + topActivity);
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




function lunSleep(sleepTime) {
    返回v首页();
    if (sleepTime == undefined) {
        sleepTime = random(3600000, 7200000);
    }
    log(sleepTime / 1000 / 60 + "分钟");
    清空文件夹("/sdcard/Android/data/com.tencent.mm/cache/");
    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/xlog/");
    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/CheckResUpdate/");
    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxvideotmp/");
    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxvideocache/");
    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxanewfiles/");
    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxafiles/");
    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxacache/");
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

//长时间睡眠保持唤醒，单位毫秒
function sleepLongTime(sleepTime) {
    let jindou;
    let JindouCount=0;//金豆不变次数
    for (let i = 0; i < sleepTime / 1000 / 60; i++) {
        //device.wakeUp();
        //device.keepScreenOn(3600 * 1000);
        if(className("android.view.View").text('今日金豆').findOne(10000)!= null){
            sleep(2000);
            let jingdoutxt=className("android.view.View").indexInParent(6).findOne(1000);
            if(jingdoutxt!=null){
                if(jingdoutxt.text()==jindou){
                    findJindouCount++;
                }else{
                    findJindouCount=0;
                    jindou=jingdoutxt.text();
                }
                toastLog(jindou);
            }
           
           if(findJindouCount>=5){
            findJindouCount=0;
            返回v首页();
           }
        }
        sleep(60 * 1000);
    }
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
                click(cBounds.right - 1, cBounds.bottom - 1);
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


auto.waitFor()//检查无障碍服务是否已经启用，会在在无障碍服务启动后继续运行。
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
} else {
    toastLog("请求截图成功");
}
toastLog(device.brand);
toastLog("版本号:" + versionNum);
setInterval(() => { }, 1000);
var w = floaty.rawWindow(
    <frame gravity="center">
        <text id="text">.</text>
    </frame>
);

w.setPosition(500, 0);
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
    lunSleep();
}
