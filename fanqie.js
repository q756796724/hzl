var topPackage = "";
var topActivity = "";

var MAIN_PKG = "com.fanqie.cloud";
var PKG_NAME = "com.tencent.mm";
var MAIN_PAGE = "com.tencent.mm.ui.LauncherUI";
var versionNum = "v1.2.2";

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

function onMainPage() {
    log("进入v成功");
    //id("cns").className("android.widget.TextView").text("我").waitFor();
    //id("cns").className("android.widget.TextView").text("我").findOne().parent().parent().click();
    let wBtn=className("android.widget.TextView").text("我").findOne(3000); 
    for(let i=0;i<8;i++){
        if(wBtn!=null&&wBtn.clickable()){
            wBtn.click();
            sleep(3000);
            if(className("android.widget.TextView").text("收藏").findOne(5000)!=null){
                break;
            };
        }else{
            wBtn=wBtn.parent();
        }
    }

    if (结束未响应()) {
        return;
    }
    if(className("android.widget.TextView").text("收藏").findOne(5000)==null){
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
    if(text("我的收藏").findOne(5000)==null){
        return;
    }
    log("进入收藏成功");
    sleep(3000);
    if (className("android.widget.TextView").textMatches(/(.*RHtWWJm|.*migokkm|.*ckmokkm|.*gPmokkm)/).findOne(5000) == null) {
        toastLog("未添加到收藏夹");
        exit();
    }

    let 阅读 = className("android.widget.TextView").textMatches(/(.*RHtWWJm|.*migokkm|.*ckmokkm|.*gPmokkm)/).findOne(5000).bounds();
    click(阅读.right - 1, 阅读.bottom - 1);
    sleep(3000);
    阅读 = className("android.widget.TextView").textMatches(/(.*RHtWWJm|.*migokkm|.*ckmokkm|.*gPmokkm)/).findOne(5000).bounds();
    sleep(3000);
    click(阅读.right - 1, 阅读.bottom - 1);
    log("点击链接成功");

    /*if (textMatches(/(.*登陆超时.*|.*重试.*)/).findOne(3000) != null) {
        let qBtn=textMatches(/(.*确定.*)/).findOne(3000);
        if(qBtn!=null){
            qBtn.click();
        }
        sleep(1000);
        
    }*/
    if(页面异常处理()){
        返回v首页();
        return;
    }
    if (结束未响应()) {
        return;
    }
    if(className("android.view.View").textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和)/).findOne(5000)!=null){
        log("渠道匹配");
        kz();
        if(textMatches(/(.*任务上限.*|.*阅读限制.*)/).findOne(3000)!=null){
            lunCount=99;
            return;
        }
        click("开始阅读");
        for (var i = 0; i < 5; i++) {
            sleep(3000);
            if (className("android.view.View").textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和)/).findOne(3000) != null) {
                log("重试点击开始阅读成功");
                let sBtn = textMatches(/(.*开始阅读.*)/).findOne(3000);
                if (sBtn != null) {
                    sBtn.click();
                }
            } else {
                log("点击开始阅读成功");
                if (yuedu()) {
                    lunCount++;
                }
    
                return;
            }
        }
    }else{
        返回v首页();
        return;
    }
    
    if(textMatches(/(.*暂无任务可做)/).findOne(3000)!=null){
        lunSleep(random(86400000, 130000000));
    }else{
        lunSleep();
    }

}

function lunSleep(sleepTime) {
    返回v首页();
    home();
    if(sleepTime==undefined){
        sleepTime = random(3600000, 7200000);
    }
    log(sleepTime / 1000 / 60 + "分钟");
    sleepLongTime(sleepTime);
}


function yuedu() {
    var count = backCount+1;//次数
    let maxCount=random(19, 23);

    for (; ;) {
        kz();
        sleep(8000);
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
        if(页面异常处理()){
            if (textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和)/).findOne(3000) != null || textMatches(/(.*开始阅读.*)/).findOne(3000) != null) {
                let sBtn = textMatches(/(.*开始阅读.*)/).findOne(3000);
                if (sBtn != null) {
                    sBtn.click();
                }
            }
        }

        //判断阅读提前结束
        if (className("android.view.View").textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和)/).findOne(3000) != null) {
            for (var i = 0; i < 5; i++) {
                kz();
                sleep(3000);
                if (className("android.view.View").textMatches(/(.*ZhaoLin|.*小青|.*miu|.*平和)/).findOne(3000) != null || textMatches(/(.*开始阅读.*)/).findOne(3000) != null) {
                    if (i < 3) {
                        log("重试点击开始阅读成功");
                        let sBtn = textMatches(/(.*开始阅读.*)/).findOne(3000);
                        if (sBtn != null) {
                            sBtn.click();
                        }
                    } else {
                        log("本轮结束，完成第" + lunCount + "轮,第" + count + "次");
                        count = 31;
                    }

                }
            }
        }

        if (count > 20) {
            backCount = 0;
            lunSleep();
            return true;
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
        swapeToRead()
        sleep(random(3000, 7000));
        if (device.brand == "samsung") {
            for (let i=0; i<20;i++) {
                kz();
                swapeToRead();
                sleep(random(3000, 7000));
                if (checkWatchFull()) {
                    log("到底了");
                    break;
                }
            }
        }else{
            for (let i=0; i<20;i++) {
                kz();
                var img = captureScreen();
                var imgH = img.height;
                var clip = images.clip(img, 0, img.height - 200, 200, 20);
                swapeToRead();
                sleep(random(3000, 7000));
                var p = findImage(captureScreen(), clip, {
                    region: [0, imgH - 300, 220, 150],
                    threshold: 1
                });
                img.recycle();//不再使用需要手动回收
                if (p) {
                    log("到底了");
                    break;
                }
            }
        }
        
        if (结束未响应()) {
            backCount = count;
            return;
        } else {
            backCount = 0;
        }
        back();
        count++;
    }
}
//长时间睡眠保持唤醒，单位毫秒
function sleepLongTime(sleepTime) {
    for (let i = 0; i < sleepTime / 1000 / 60; i++) {
        kz();
        if (device.brand != "Xiaomi" && device.brand != "Meizu") {
            device.wakeUp();
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
    for (; ;) {
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
            break;
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
        }

        refreshStateInfo();
        let wBtn=className("android.widget.TextView").text("我").findOne(3000);
        if (topActivity != MAIN_PAGE && wBtn==null) {
            back();
            sleep(5000);
        } else {
            break;
        }
    }
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
    let x1 = device.width * random(200, 500) / 1000;
    let y1 = device.height * random(700, 900) / 1000;
    let x2 = device.width * random(300, 800) / 1000;
    let y2 = device.height * random(200, 500) / 1000;
    //swipe(x1, y1, x2, y2, random(1200, 1500));
    sml_move(x1, y1, x2, y2, random(1200, 1500));

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
//保持屏幕常亮
device.keepScreenDim();

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


var backCount = 0;//备份当轮阅读次数
var lunCount = 1;//每天最大轮回次数
for (; ;) {
    kz();
    var nowHour = new Date().getHours();
    log("当前时间:" + nowHour + "时");
    if (nowHour < 6 || nowHour > 23) {
        console.clear();
        lunCount = 1;//重置每天轮回次数
        log("当前时间:" + nowHour + "时,休息中");
        sleepLongTime(3600000);
        continue;
    }

    if (lunCount > 8) {
        log("当天已轮回" + (lunCount - 1).toString() + "次,休息中");
        sleepLongTime(3600000);
        continue;
    }

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
        continue;
    }



    refreshStateInfo();
    /*if(topPackage != PKG_NAME){
        continue;
    }*/
    let wBtn=className("android.widget.TextView").text("我").findOne(3000);
    if (topActivity == MAIN_PAGE && wBtn!=null) {
        log("第" + lunCount + "轮");
        onMainPage();
        continue;
    } else {
        log(wBtn);
        返回v首页();
    }


    sleep(10000);

}
