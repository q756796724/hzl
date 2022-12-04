//自动重启香蕉

var versionNum = "v1.0.7";



auto.waitFor()//检查无障碍服务是否已经启用，会在在无障碍服务启动后继续运行。
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
} else {
    toastLog("请求截图成功");
}
toastLog("版本号:" + versionNum);
setInterval(() => { }, 1000);
var w = floaty.rawWindow(
    <frame gravity="center">
        <text id="text">。 。 。</text>
    </frame>
);

//w.setPosition(500, 3);
w.setPosition(33, 298);
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
//if (app.autojs.versionName == '4.1.1 Alpha2') {
sleep(1000);
KeepAliveService.stop();
sleep(5000);
KeepAliveService.start("xiangjiao", "香蕉");
//}


home()
sleep(2000)
if (!files.exists("/sdcard/xiangjiao.png")) {
    let img = captureScreen();
    //let clip = images.clip(img, device.width * 0.04, device.height * 0.155, device.width * 0.1, device.height * 0.05);
    let clip = images.clip(img, 40, 293, device.width * 0.08, device.height * 0.04);
    images.save(clip, "/sdcard/xiangjiao.png");
    img.recycle();
    clip.recycle();
}

sleep(5000);
app.launch("com.feige.autoapp004");

date = new Date().toLocaleDateString();
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

//app保活双进程守护
function setAppAlive(name) {
    let temp = null;
    try {
        temp = http.post("175.178.60.114:8081/fanqie/setAppAlive", {
            "serial": name
        });
        if (temp && temp.statusCode == 200) {
            temp = temp.body.string();
            let rep = JSON.parse(temp);
            let repState = rep["state"];
            if (repState == 1) {
                return true
            } else {
                console.warn("setAppAlive失败" + temp);
                return false
            }
        }
        return false
    } catch (err) {
        console.error("setAppAlive报错,原因:" + err);
        return false
    }

}
function getAppAlive(name) {
    let temp = null;
    try {
        temp = http.post("175.178.60.114:8081/fanqie/getAppAlive", {
            "serial": name
        });
        if (temp && temp.statusCode == 200) {
            temp = temp.body.string();
            let rep = JSON.parse(temp);
            let repState = rep["state"];
            if (repState == 1) {
                let repData = rep["data"];
                return repData
            } else {
                console.warn("getAppAlive获取数据失败" + temp);
            }
        }
    } catch (err) {
        console.error("getAppAlive报错,原因:" + err);
    }
}
function startrun() {
    let cBtn = packageName("com.feige.autoapp004").className("android.widget.Button").text("开始赚钱").findOne(30000);
    if (cBtn != null) {
        sleep(8000);
        cBtn.click();
        sleep(5000);
        cBtn = packageName("com.feige.autoapp004").className("android.widget.CheckBox").find()
        if (cBtn != null && cBtn.length == 4) {
            for (let i = 0; i < cBtn.length; i++) {
                if (i == 0 && cBtn[i].checked() == false) {
                    /*cBtn[i].click();
                    log("未启动无障碍")
                    exit()*/
                    break
                }
                if (i == 3 && cBtn[i].checked() == false) {
                    cBtn[i].click();
                    let wBtn = textMatches(/(确定|立即开始)/).findOne(3000);
                    if (wBtn != null) {
                        wBtn.click();
                        sleep(3000)
                    }
                }
            }
        }
        for (let i = 0; i < 5; i++) {
            let cBtn = packageName("com.feige.autoapp004").className("android.widget.Button").text("开始赚钱").findOne(5000)
            if (cBtn != null) {
                cBtn.click();
                sleep(5000)
                continue
            }
            cBtn = packageName("com.feige.autoapp004").className("android.widget.Button").text("停止任务").findOne(5000)
            if (cBtn != null) {
                break
            }
        }
    }else{
        cBtn = packageName("com.feige.autoapp004").className("android.widget.CheckBox").find()
        if (cBtn != null && cBtn.length == 4) {
            for (let i = 0; i < cBtn.length; i++) {
                if (i == 0 && cBtn[i].checked() == false) {
                    /*cBtn[i].click();
                    log("未启动无障碍")
                    exit()*/
                    break
                }
                if (i == 3 && cBtn[i].checked() == false) {
                    cBtn[i].click();
                    let wBtn = textMatches(/(确定|立即开始)/).findOne(3000);
                    if (wBtn != null) {
                        wBtn.click();
                        sleep(3000)
                    }
                }
            }
        }
        for (let i = 0; i < 5; i++) {
            let cBtn = packageName("com.feige.autoapp004").className("android.widget.Button").text("开始赚钱").findOne(5000)
            if (cBtn != null) {
                cBtn.click();
                sleep(5000)
                continue
            }
            cBtn = packageName("com.feige.autoapp004").className("android.widget.Button").text("停止任务").findOne(5000)
            if (cBtn != null) {
                break
            }
        }
    }
}
for (; ;) {
    setAppAlive(device.serial)
    let repData = getAppAlive(device.serial + "-1");
    if (repData != undefined && repData["boolean"] != undefined && repData["boolean"] == false) {
        log("重启守护应用")
        home();
        sleep(5000);
        app.launch("com.fanqie.shouhu");
    }
    if (date != new Date().toLocaleDateString()) {
        date = new Date().toLocaleDateString();
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

    if (currentPackage() != "com.feige.autoapp004" && currentActivity() != "com.stardust.autojs.execution.ScriptExecuteActivity") {
        let gb = images.read("/sdcard/xiangjiao.png");
        let faultCount = 0;
        for (let i = 0; i < 5; i++) {
            sleep(3000)
            if (currentPackage() == "com.feige.autoapp004" || currentActivity() == "com.stardust.autojs.execution.ScriptExecuteActivity") {
                startrun()
                break;
            }
            // 截图并找图
            let img = captureScreen();
            /*let p = findImage(img, gb, {
                region: [0, device.height * 0.1, device.width * 0.3, device.height * 0.3],
                threshold: 0.9
            });*/
            let p = findImage(img, gb, {
                region: [0, 200, 300, 400],
                threshold: 0.9
            });
            img.recycle();
            if (!p) {
                faultCount++
                //log(faultCount)
                if (faultCount == 5) {
                    log("没有找到,启动香蕉");
                    home();
                    sleep(5000);
                    app.launch("com.feige.autoapp004");
                    startrun()
                }
            } else {
                break;
            }
        }
        gb.recycle();
    }

    sleep(30 * 1000);
}
