//进程守护

var versionNum = "v1.0.5";



auto.waitFor()//检查无障碍服务是否已经启用，会在在无障碍服务启动后继续运行。
toastLog("版本号:" + versionNum);
setInterval(() => { }, 1000);
var w = floaty.rawWindow(
    <frame gravity="center">
        <text id="text">。 。 。</text>
    </frame>
);

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
//if (app.autojs.versionName == '4.1.1 Alpha2') {
sleep(1000);
KeepAliveService.stop();
sleep(5000);
KeepAliveService.start("keepalive", "进程守护");
//}


//app保活双进程守护
// function setAppAlive(name) {
//     let temp = null;
//     try {
//         temp = http.post("106.55.225.58:8081/fanqie/setAppAlive", {
//             "serial": name
//         });
//         if (temp && temp.statusCode == 200) {
//             temp = temp.body.string();
//             let rep = JSON.parse(temp);
//             let repState = rep["state"];
//             if (repState == 1) {
//                 return true
//             } else {
//                 console.warn("setAppAlive失败" + temp);
//                 return false
//             }
//         }
//         return false
//     } catch (err) {
//         console.error("setAppAlive报错,原因:" + err);
//         return false
//     }

// }
// function getAppAlive(name) {
//     let temp = null;
//     try {
//         temp = http.post("106.55.225.58:8081/fanqie/getAppAlive", {
//             "serial": name
//         });
//         if (temp && temp.statusCode == 200) {
//             temp = temp.body.string();
//             let rep = JSON.parse(temp);
//             let repState = rep["state"];
//             if (repState == 1) {
//                 let repData = rep["data"];
//                 return repData
//             } else {
//                 console.warn("getAppAlive获取数据失败" + temp);
//             }
//         }
//     } catch (err) {
//         console.error("getAppAlive报错,原因:" + err);
//     }
// }
function setAppAlive(name) {
    log(name)
    toolsStorage.put(name, new Date().getTime());
}
function getAppAlive(name) {
    if(toolsStorage.get(name)!=undefined){
        if(new Date().getTime()-toolsStorage.get(name)<3*60*1000){
            return true
        }else{
            return false
        }

    }else{
        return true
    }
}
for (; ;) {
    setAppAlive(device.serial+ "-1")
    if (getAppAlive(device.serial) == false) {
        setAppAlive(device.serial)
        log("重启主应用")
        home();
        sleep(5000);
        app.launch("com.fanqie.cloud");

        // log("重启主应用")
        // home();
        // sleep(3000);
        // app.launch("com.fanqie.xiangjiao");
        // sleep(60000);
        // if(currentPackage() == "com.fanqie.xiangjiao"){
        //     app.launch("com.feige.autoapp004");
        // }
    }
   
    sleep(30 * 1000);
}
