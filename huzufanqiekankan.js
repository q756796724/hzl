if ((nowHour > 13 && todayTxCount < 1) || (nowHour > 21 && todayTxCount < 2)) {
                        let jfTxt = packageName("com.tencent.mm").className("android.view.View").textContains("积分:").findOnce()
                        if (jfTxt) {
                            if (jfTxt != null && parseInt(jfTxt.text().split("积分:")[1]).toString() != 'NaN' && parseInt(jfTxt.text().split("积分:")[1]) > 100) {
                                todayTxCount++
                                click("积分兑换")
                                sleep(6000);
                                cBtn = packageName("com.tencent.mm").className("android.widget.Button").text("确定").findOne(3000);
                                if (cBtn != null) {
                                    sleep(500)
                                    cBtn.click();

                                }
                                sleep(1000);
                                let txBtn = packageName("com.tencent.mm").id('doWithdraw').className("android.widget.Button").findOnce();
                                if (txBtn) {
                                    txBtn.click();
                                } else {
                                    txBtn = packageName("com.tencent.mm").className("android.widget.Button").text("提现").findOne(3000);
                                    if (txBtn) {
                                        txBtn.click();
                                    }
                                }
                                sleep(8000);
                                cBtn = packageName("com.tencent.mm").className("android.widget.Button").text("确定").findOne(3000);
                                if (cBtn != null) {
                                    sleep(500)
                                    cBtn.click();
                                    sleep(1000);
                                } else {
                                    back();
                                }
                                if (xianzhidays > 5) {
                                    返回v首页();
                                    return;
                                }
                                for (var i = 0; i < 3; i++) {
                                    sleep(3000);
                                    let sBtn = textMatches(/(.*开始阅读.*)/).findOne(3000);
                                    if (sBtn == null) {
                                        back();
                                    } else {
                                        break;
                                    }

                                }

                            }
                        }
                    }
