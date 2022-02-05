var topPackage = "";
var topActivity = "";

var MAIN_PKG = "com.fanqie.cloud";
var PKG_NAME = "com.tencent.mm";
var MAIN_PAGE = "com.tencent.mm.ui.LauncherUI";
var versionNum = "v1.0.0";

function refreshStateInfo() {
    sleep(1000);
    topPackage = currentPackage();
    sleep(1000);
    topActivity = currentActivity();
    log("==> topPackage: " + topPackage);
    log("==> topActivity: " + topActivity);
}

var 悬浮窗 = floaty.window(
    <frame h="auto" w="auto" gravity="center" bg="#77ff0000">
        <button id="console" text="暂停" />
    </frame>
);
悬浮窗.setPosition(10, device.height/2);   //设置位置（x，y）
悬浮窗.setAdjustEnabled(true);   //显示调节位置控件
悬浮窗.exitOnClose();   //关闭悬浮窗时自动结束脚本运行

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

function 页面异常处理(){
    if (className("android.widget.TextView").textMatches(/(.*请在微信上正常阅读.*|.*异常.*|.*失败.*|.*登陆超时.*|.*重试.*)/).findOne(3000) != null) {
        log("异常回退：" + className("android.widget.TextView").textMatches(/(.*请在微信上正常阅读.*|.*异常.*|.*失败.*|.*登陆超时.*|.*重试.*)/).findOne(3000));
        let qBtn=textMatches(/(.*确定.*)/).findOne(3000);
        if(qBtn!=null){
            qBtn.click();
        }
        sleep(3000);
        return true;
    }else{
        return false;
    }
}

function quGuan(sleepTime) {
    log("进入v成功");
    
    let wBtn=className("android.widget.TextView").text("通讯录").findOne(3000); 
    for(let i=0;i<8;i++){
        if(wBtn!=null&&wBtn.clickable()){
            wBtn.click();
            sleep(3000);
            if(className("android.widget.TextView").text("公众号").findOne(5000)!=null){
                break;
            };
        }else{
            wBtn=wBtn.parent();
        }
    }

    if (结束未响应()) {
        return;
    }
    if(className("android.widget.TextView").text("公众号").findOne(5000)==null){
        return;
    };
    log("进入通讯录成功");
    click("公众号");
   
    if (结束未响应()) {
        return;
    }
    if(text("公众号").findOne(5000)==null){
        return;
    }
    log("进入公众号成功");
    sleep(3000);
    let faultCount=0;
    for (let i = 0; i < sleepTime / 1000 / 60; i++) {
        kz();
        if(faultCount>10){
            home();
            sleep(60 * 1000);
            continue;
        }
        for(let i=0;i<6;i++){
            if(text("公众号").findOne(5000)!=null){
                let x1 = device.width * random(400, 900) / 1000;
                let y1 = device.height * random(400, 800) / 1000;
                if(random(1, 10)<7){
                    press(x1,y1,random(2000, 2500));
                    sleep(random(1000, 2000));
                   if(text("不再关注").findOne(5000)!=null){
                    faultCount=0;
                   click("不再关注");
                   sleep(random(1000, 2000));
                   if(text("不再关注").findOne(5000)!=null){
                   click("不再关注");
                   }
                  }else{
                    faultCount++;
                      continue;
                  }
                  sleep(random(4000, 6000));
                }else{
                    //进入明细
                    click(x1,y1);
                    if(text("公众号").findOne(random(3000, 5000))==null){
                        back();
                        sleep(random(4000, 6000));
                        }
                }
            }else{
                back();
                sleep(5000);
            }
            
        }
    }
}





//长时间睡眠保持唤醒，单位毫秒
function sleepLongTime(sleepTime) {
    打开v();
    refreshStateInfo();
    let wBtn=className("android.widget.TextView").text("通讯录").findOne(3000);
    if (topActivity == MAIN_PAGE && wBtn!=null) {
        quGuan(sleepTime);
    } else {
        log(wBtn);
        返回v首页();
        let wBtn=className("android.widget.TextView").text("通讯录").findOne(3000);
        if (wBtn!=null) {
            quGuan(sleepTime);
        }else{
            for (let i = 0; i < sleepTime / 1000 / 60; i++) {
                kz();
                //device.wakeUp();
                //device.keepScreenOn(3600 * 1000)
                sleep(60 * 1000);
            }
        }
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
    for (let i=0;i<15 ;i++) {
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
        if(页面异常处理()){
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
        let rBtn=className("android.widget.ImageView").desc("返回").findOne(3000);
        if(rBtn!=null&&rBtn.parent()!=null){
            rBtn.parent().click();
            log("按左上角返回");
        }
        
        let wBtn=className("android.widget.TextView").text("通讯录").findOne(5000);
        refreshStateInfo();
        if (topActivity != MAIN_PAGE || wBtn==null) {
            log("按返回键"+wBtn);
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
        let cBtn=textMatches(/(确定|关闭|关闭应用)/).findOne(3000);
        if(cBtn!=null){
            cBtn.click();
            sleep(1000);
            cBtn=textMatches(/(确定|关闭|关闭应用)/).findOne(3000);
            if(cBtn!=null){
                log("控件关闭失败，参数坐标点击关闭");
                let cBounds = cBtn.bounds();
                click(cBounds.right - 1, cBounds.bottom - 1);
            }else{
                log(new Date().toLocaleString() + "-" + "----------------------------------------------结束未响应成功");
                return true;
            }
            cBtn=textMatches(/(确定|关闭|关闭应用)/).findOne(3000);
            if(cBtn!=null){
                log(new Date().toLocaleString() + "-" + "----------------------------------------------结束未响应失败");
                return false;
            }else{
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
console.show();
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
setInterval(() => { }, 1000);
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
 if(app.autojs.versionName=='4.1.1 Alpha2'){
    sleep(1000);
  KeepAliveService.stop();
  sleep(5000);
  KeepAliveService.start("fanqie", "茄子云");
  }
  
  
  

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


function 打开v(){
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
var lunCount = 1;//轮回次数
for (; ;) {
    kz();
    sleepLongTime(3600000);
}
