//进程守护

var versionNum = "v1.2.9";
toolsStorage = storages.create("tools配置");

// 获取所有正在运行的脚本引擎
var allEngines = engines.all();
// 遍历所有脚本引擎，并终止除当前脚本外的其他脚本
for (var i = 0; i < allEngines.length; i++) {
    var engine = allEngines[i];
    if (engine != engines.myEngine()) {
        engine.forceStop();
    }
}

auto.waitFor()//检查无障碍服务是否已经启用，会在在无障碍服务启动后继续运行。

var zhu_setting = files.join("/sdcard/fanqie/", "zhu_setting.txt")//1、定义文件路径名  2、files.cwd()会返回:  /sdcard/脚本/  3、path=/sdcard/脚本/fanqie.zip
var shouhu_setting = files.join("/sdcard/fanqie/", "shouhu_setting.txt")//1、定义文件路径名  2、files.cwd()会返回:  /sdcard/脚本/  3、path=/sdcard/脚本/fanqie.zip
if (!files.exists(shouhu_setting)) {
    初始化配置(shouhu_setting);
    toastLog("初始化配置shouhu_setting");
}

if (!files.exists(zhu_setting)) {
    初始化配置(zhu_setting);
    toastLog("初始化配置zhu_setting");
}
shouhu_setting配置 = 读取配置(shouhu_setting);
shouhu_setting配置[device.serial + "守护"] = new Date().getTime() + 3 * 60 * 1000
保存配置(shouhu_setting, shouhu_setting配置);

toastLog("版本号:" + versionNum);
setInterval(() => { }, 1000);
/*var w = floaty.rawWindow(
    <frame gravity="center">
        <text id="text">。 。 。</text>
    </frame>
);*/
document.writeln("var w = floaty.rawWindow(");
document.writeln("    <frame gravity=\"center\">");
document.writeln("        <text id=\"text\">。 。 。</text>");
document.writeln("    </frame>");
document.writeln(");");

w.setPosition(500, 50);
//w.setPosition(device.width * 0.03, device.height * 0.158);
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

sleep(1000);
KeepAliveService.stop();
sleep(5000);
KeepAliveService.start("keepalive", "进程守护");


function 初始化配置(path) {
    files.createWithDirs(path)  //开始创建文件
    let jsonContent = {
        /*"date": new Date().toLocaleDateString(),
        "lunCount": 1,
        "count": 1,
        "lunCountllb": 1,
        "countllb": 1*/
    }
    //jsonContent[name] = new Date().getTime()
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


function setShouhuAppAlive(name) {
    shouhu_setting配置 = 读取配置(shouhu_setting);
    shouhu_setting配置[name] = new Date().getTime();
    保存配置(shouhu_setting, shouhu_setting配置);
    //toolsStorage.put(name, new Date().getTime());
}
function getAppAlive(name) {
    zhu_setting配置 = 读取配置(zhu_setting);
    if (zhu_setting配置[name] != undefined) {
        if (new Date().getTime() - zhu_setting配置[name] < 5 * 60 * 1000) {
            return true
        } else {
            return false
        }
    } else {
        console.error("zhu_setting配置[name] == undefined");
        return true
    }
    /*if(toolsStorage.get(name)!=undefined){
        if(new Date().getTime()-toolsStorage.get(name)<3*60*1000){
            return true
        }else{
            return false
        }

    }else{
        return true
    }*/
}

for (; ;) {
    setShouhuAppAlive(device.serial + "守护")
    if (getAppAlive(device.serial) == false) {
        //setAppAlive(device.serial)
        log("重启主应用")
        home();
        sleep(5000);
        app.launch("com.fanqie.cloud");
        sleep(300000);
        if (getAppAlive(device.serial) == false) {
            back();
            sleep(5000);
            app.launch("com.fanqie.cloud");
            sleep(300000);
        }
    }

    sleep(30 * 1000);
}
