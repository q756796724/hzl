//茄子云com.fanqie.cloud
/**
 * 个人配置
 */
 var versionNum = "v2.0.3";
var 用户名 = "q756796724"  //需要更换用户名
var 仓库名 = "hzl"     //需要更换仓库名
var 脚本名 = "tools.js"       //需要更换github中需要运行的脚本名
var urls=["https://github.com/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip",
"hub.fastgit.org/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip",
"https://ghproxy.com/"+"https://github.com/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip",
"https://github.com.cnpmjs.org/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip",
"https://shrill-pond-3e81.hunsh.workers.dev/"+"https://github.com/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip",
"https://gh.api.99988866.xyz/"+"https://github.com/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip"
 ]
var tryCount=0;
//保持脚本运行
setInterval(() => { }, 10000);

//threads.start(main);//启动线程运行main函数
main();
/**
 * 主函数:利用脚本引擎运行指定的代码
 */
function main() {
    sleep(5000);
    console.show();   //打开控制台
    var github下载的脚本 = 下载Github文件(urls[tryCount]);//这个方法返回的就是要运行的代码
    //console.info("下载完成的代码为:"+'\n'+github下载的脚本);
    engines.execScript('tools', github下载的脚本);  //运行脚本
    console.hide();

}

/**
 * 通过get请求从github下载zip文件
 */
function 下载Github文件(githubUrl) {
    try {
        //var githubUrl = "https://github.com/" + 用户名 + "/" + 仓库名 + "/archive/Cloud-update.zip"
        //var githubUrl = "https://codeload.github.com/" + 用户名 + "/" + 仓库名 + "/zip/refs/heads/maiPn" //单个文件时
        //var githubUrl = "https://github.com/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip" 
        //var githubUrl = "https://ghproxy.com/"+"https://github.com/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip" //github代理下载
        //var githubUrl = "https://shrill-pond-3e81.hunsh.workers.dev/"+"https://github.com/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip" //github代理下载
        //var githubUrl = "https://gh.api.99988866.xyz/"+"https://github.com/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip" //github代理下载
        //var githubUrl = "https://github.com.cnpmjs.org/" + 用户名 + "/" + 仓库名 + "/archive/refs/heads/main.zip" //github代理下载
        console.log(githubUrl)
        http.__okhttp__.setTimeout(5000);
        var r = http.get(githubUrl)  //开始请求
        console.log('请求状态码Code:', r.statusCode) //请求状态码
        if(r.statusCode==200){
            var zipFile = r.body.bytes() //这里下载的是二进制数据 
            if (zipFile) {
                var 代码路径 = Github文件夹(zipFile)//将请求成功的文件写入手机路径
                return files.read(代码路径)   //读取解压后脚本的内容
            } else {
                console.error('下载github代码失败')
                exit()
            }
        }else{
            tryCount++
            if(tryCount<urls.length){
                return 下载Github文件(urls[tryCount])
            }else{
                exit()
            }
            
        }
    } catch (err) {
        console.error(err)  //抛出异常
        tryCount++
        if(tryCount<urls.length){
            return 下载Github文件(urls[tryCount])
        }else{
            exit()
        }
    }
}


/**
 * 将下载好的zip文件保存在手机
 */
function Github文件夹(zipFile) {
    var path = files.join(files.cwd(), "tools.zip")//1、定义文件路径名  2、files.cwd()会返回:  /sdcard/脚本/  3、path=/sdcard/脚本/tools.zip
    files.createWithDirs(path)  //开始创建文件
    console.info("创建好的文件路径path:", path)//输出创建好的文件路径
    files.writeBytes(path, zipFile)//把下载好的二进制数据写入文件中
    if (app.autojs.versionName == 'Pro 7.0.4-1') {
        var r = 解压zip文件2(path) //解压zip文件
    } else if (app.autojs.versionName == '4.1.1 Alpha2') {
        var r = 解压zip文件(path) //解压zip文件
    }

    return r
}

/**
 * 在同一目录下解压zip文件
 */
function 解压zip文件(文件路径) {
    var 解压后的文件夹路径 = 文件路径.replace(".zip", "") + "/"  //利用replace方法将.zip去掉  
    com.stardust.io.Zip.unzip(new java.io.File(文件路径), new java.io.File(解压后的文件夹路径))//将zip文件进行解压
    console.warn('解压后的文件夹路径=', 解压后的文件夹路径)
    return 解压后的文件夹路径 + 仓库名 + "-main" + "/" + 脚本名   //返回解压后的目录   返回对象：r
}

/**
     * zip压缩文 解压
     */
function 解压zip文件2(文件路径) {
    var 解压后的文件夹路径 = 文件路径.replace(".zip", "") + "/"  //利用replace方法将.zip去掉  
    $zip.unzip(文件路径, 解压后的文件夹路径);
    return 解压后的文件夹路径 + 仓库名 + "-main" + "/" + 脚本名   //返回解压后的目录   返回对象：r
}

