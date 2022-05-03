//脚本选择器
/**
 * 个人配置
 */
var 仓库名 = "hzl"     //需要更换仓库名
var versionNum = "v1.1.3";

toolsStorage = storages.create("tools配置");
threads.start(main);//启动线程运行main函数

setInterval(进程守护(), 60000);

//app保活双进程守护
function setAppAlive(name) {
    //log(name)
    toolsStorage.put(name, new Date().getTime());
}
function getAppAlive(name) {
    if(toolsStorage.get(name)!=undefined){
        if(new Date().getTime()-toolsStorage.get(name)<60*1000){
            return true
        }else{
            return false
        }

    }else{
        return true
    }
}
function 进程守护() {
    //log("进程守护")
    setAppAlive(device.serial)
    if (getAppAlive(device.serial + "-1") == false) {
        setAppAlive(device.serial+ "-1")
        log("重启守护应用")
        home();
        sleep(5000);
        app.launch("com.fanqie.shouhu");
    }
    return 进程守护
}
//main();
/**
 * 主函数:利用脚本引擎运行指定的代码
 */
function main() {
    console.show();   //打开控制台
    toastLog("版本号:" + versionNum);
    var github下载的脚本;
    var d = dialogs.build({
        title: "请选择",
        positive: "确定",
        negative: "取消",
        items: ["llb互助短", "互助番茄kk", "番茄kk", "微微fuzhu", "weiwei", "取guan", "更新app", "答题", "香蕉更新", "珊友"],
        itemsSelectMode: "singleChoice",
        itemsSelectedIndex: toolsStorage.get("toolsSelectIdx", 0)
    }).on("single_choice", (index, item, dialog) => {
        toast("您选择的是第" + (index + 1) + "项, 选项为" + item);
        toolsStorage.put("toolsSelectIdx", index);
        getSelect(index)
    }).on("dismiss", (dialog) => {
        toast("对话框消失了");
        setTimeout(() => {
            console.info("下载完成的代码为:"+'\n'+github下载的脚本);
            engines.execScript('fanqie', github下载的脚本);  //运行脚本
            console.hide();
        }, 10000);
        
    }).show();
    setTimeout(() => {
        //toast("对话框消失");
        getSelect(toolsStorage.get("toolsSelectIdx", 0))
        d.dismiss();
    }, 10000);
    //var runSelect=dialogs.singleChoice("请选择脚本",["llb互助短","互助番茄kk","番茄kk","微微fuzhu","weiwei","取guan","更新","答题","香蕉更新"], 0);


}

function getSelect(runSelect) {
    toastLog(runSelect)
    if (runSelect == 0) {
        github下载的脚本 = 打开Github文件("llbhuzu.js");//这个方法返回的就是要运行的代码
        //console.info("下载完成的代码为:"+'\n'+github下载的脚本);

    } else if (runSelect == 1) {
        github下载的脚本 = 打开Github文件("huzufanqiekankan.js");//这个方法返回的就是要运行的代码
        //console.info("下载完成的代码为:"+'\n'+github下载的脚本);

    } else if (runSelect == 2) {
        github下载的脚本 = 打开Github文件("fanqiekankan.js");//这个方法返回的就是要运行的代码
        //console.info("下载完成的代码为:"+'\n'+github下载的脚本);

    } else if (runSelect == 3) {
        github下载的脚本 = 打开Github文件("weiweifuzu.js");//这个方法返回的就是要运行的代码
        //console.info("下载完成的代码为:"+'\n'+github下载的脚本);
    } else if (runSelect == 4) {
        github下载的脚本 = 打开Github文件("weiwei.js");//这个方法返回的就是要运行的代码
    } else if (runSelect == 5) {
        github下载的脚本 = 打开Github文件("quguan.js");//这个方法返回的就是要运行的代码
    } else if (runSelect == 6) {
        github下载的脚本 = 打开Github文件("updateapp.js");//这个方法返回的就是要运行的代码
    } else if (runSelect == 7) {
        github下载的脚本 = 打开Github文件("dati.js");//这个方法返回的就是要运行的代码
    } else if (runSelect == 8) {
        try {
            var path = files.join(files.cwd(), "tools.zip")//1、定义文件路径名  2、files.cwd()会返回:  /sdcard/脚本/  3、path=/sdcard/脚本/fanqie.zip
            if (app.autojs.versionName == 'Pro 7.0.4-1') {
                var r = 解压zip文件2(path, "") //解压zip文件
            } else if (app.autojs.versionName == '4.1.1 Alpha2') {
                var r = 解压zip文件(path, "") //解压zip文件
            }
            files.copy(r + "shouhu.js", "/sdcard/fanqie/shouhu.js")
            files.copy(r + "xiangjiao.js", "/sdcard/fanqie/xiangjiao.js")
        } catch (err) {
            console.error(err)  //抛出异常
        }
        exit()
    }else if (runSelect == 9) {
        github下载的脚本 = 打开Github文件("sanyou.js");//这个方法返回的就是要运行的代码
    }
    console.info("下载完成的代码为1:"+'\n'+github下载的脚本);
}

/**
 * 将下载好的zip文件保存在手机
 */
function 打开Github文件(脚本名称) {
    try {
        var path = files.join(files.cwd(), "tools.zip")//1、定义文件路径名  2、files.cwd()会返回:  /sdcard/脚本/  3、path=/sdcard/脚本/fanqie.zip
        if (app.autojs.versionName == 'Pro 7.0.4-1') {
            var r = 解压zip文件2(path, 脚本名称) //解压zip文件
        } else if (app.autojs.versionName == '4.1.1 Alpha2') {
            var r = 解压zip文件(path, 脚本名称) //解压zip文件
        }

        return files.read(r)
    } catch (err) {
        console.error(err)  //抛出异常
        exit()  //退出
    }

}

/**
 * 在同一目录下解压zip文件
 */
function 解压zip文件(文件路径, 脚本名称) {
    var 解压后的文件夹路径 = 文件路径.replace(".zip", "") + "/"  //利用replace方法将.zip去掉  
    com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(解压后的文件夹路径))//将zip文件进行解压
    console.warn('解压后的文件夹路径=', 解压后的文件夹路径)
    return 解压后的文件夹路径 + 仓库名 + "-main" + "/" + 脚本名称   //返回解压后的目录   返回对象：r
}

/**
     * zip压缩文 解压
     */
function 解压zip文件2(文件路径, 脚本名称) {
    var 解压后的文件夹路径 = 文件路径.replace(".zip", "") + "/"  //利用replace方法将.zip去掉  
    $zip.unzip(文件路径, 解压后的文件夹路径);
    return 解压后的文件夹路径 + 仓库名 + "-main" + "/" + 脚本名称   //返回解压后的目录   返回对象：r
}

