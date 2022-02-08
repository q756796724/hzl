"ui";
storage = storages.create("weiwei配置");
age = storages.create("Doolu_download");
data = {};
宽 = device.width;
高 = device.height;
图片编码 = "jpg";
ww_img_key = [];
ww_task_data = [];
ww_token = "";
ww_img_url = null;
ww_info_data = [];
ww_task_id = null;
主页关注ID = "";
视频关注ID = "";
收藏ID = "";
转发ID = "";
vq_task_data = [];
vq_token = "";
vq_img_url = null;
vq_info_data = [];
vq_task_id = null;
关注 = 0;
点赞 = 0;
评论 = 0;
播放 = 0;
收藏 = 0;
转发 = 0;
人气 = 0;
搜一搜 = 0;
评赞 = 0;
阅读 = 0;
在看 = 0;
公众号关注 = 0;
文章赞 = 0;
time = new Date();
time.setTime(time.getTime());
jt = time.getDate();
ww_dz = storage.get("ww_dz", false);
ww_gz = storage.get("ww_gz", false);
ww_bf = storage.get("ww_bf", true);
ww_sc = storage.get("ww_sc", true);
ww_pl = storage.get("ww_pl", true);
ww_zf = storage.get("ww_zf", true);
ww_rq = storage.get("ww_rq", true);
ww_pz = storage.get("ww_pz", true);
ww_sys = storage.get("ww_sys", true);
ww_tx = storage.get("ww_tx", true);

vq_dz = storage.get("vq_dz", false);
vq_gz = storage.get("vq_gz", false);
vq_bf = storage.get("vq_bf", false);
vq_sc = storage.get("vq_sc", false);
vq_pl = storage.get("vq_pl", false);
vq_zf = storage.get("vq_zf", false);
vq_yd = storage.get("vq_yd", false);
vq_ydgz = storage.get("vq_ydgz", false);
vq_ydzk = storage.get("vq_ydzk", false);
vq_ydwzz = storage.get("vq_ydwzz", false);

dhj = storage.get("dhj", false);
ssjpt = storage.get("ssjpt", true);  // 搜索进平台
shuaxin = storage.get("shuaxin", true); // 返回时自动刷新页面

视频等待 = storage.get("输入框_视频等待", 30);
关注等待 = storage.get("输入框_关注等待", 30);
wait_one = storage.get("wait_one", 30);
wait_two = storage.get("wait_two", 30);
wait_three = storage.get("wait_three", 30);

点赞数量 = storage.get("输入框_点赞数量", 999);
关注数量 = storage.get("输入框_关注数量", 999);

指定昵称 = storage.get("输入框_指定昵称", "文件传输助手");
微微链接 = storage.get("输入框_微微链接", "http://aa.sph.xfeixfei.com");
微圈链接 = storage.get("输入框_微圈链接", "https://vquan.gratefullifewcopa.net.cn/");

微微api = "http://core.xfeixfei.com/";
微圈api = "https://vquan.gratefullifewcopa.net.cn/";

ps = "wangjifa20000805";
gzh = false;
版本号 = "1.6.6"
话术arr = [];
转发check = false;
提现 = false;
暂无悦读 = 0;
未响应 = 0;
转发评论str = "为了火也是拼了----我喜欢。----拍摄的很专业。----我已笑抽。----66666。----看一遍笑一遍。----厉害。----真的6----调皮了。----确实抖了。----配音都不换的吗？----有点儿意思。----确实是高手。----看一次笑一次。----第二个。----差一步。----每天看一遍。----牛----我好喜欢这样的。----看了十遍。----带跑了。----笑坏我了。----配音----路过。----抖音真是有毒。----这只是配音，不是他的声音。----对。----儿子重复看了20次。----六六。----太他m坏了。----评论有毒。----很可爱。----你是我关注的第101个。----左下角是个好东西。----天上的星星特别多啊。----谅我不厚道的笑了。----本来胃疼，一笑更疼。----我买点儿饼干。----看了好几遍。----配音的。----看一个笑一个。----你是吗？----找不回调。----很六----笑的肚子疼啊。----快点儿！----顾得。----快点----好犀利。----火了。----演得好----天上的星星参北斗啊。----我知道。----这是谁？----好玩儿，好好玩儿。----越看越搞笑。----1----居然玩抖音也不告诉我。----原来是你。----爱你。----装修赞----墙都不服就服你。----戏精。----你又调皮了。----厉害。----不符合。----叫人家。----有点儿意思啊！----好玩儿的厉害。----鬼知道我看了多少遍。----配乐太可以了。----学坏了----同城世界真小。----没毛病，666。----不是李东东吗？真像----眼睛让我无法自拔。----喜欢你。----戏精。----就你评论最逗。----求歌名----真的？----你们不一样。----看三遍以上的举手。----配音最好玩儿。----老铁，别跟我抢。----太厉害了。----要办手续的。----有毒----你们都不看右下角的吗？----有点儿感觉。----看这个不暂停我都打不了字了。----他又不是原声。----零个赞。----诶。----请问背景音乐是什么？----太好了！----专业的？----不行了，岔气儿了。----扶我起来，我还能笑。----就服这个能力。----猝不及防。----我无话可说。----算我一个，编号9527。----这个版本儿看了好几个了。----用这个bdm送我入狱。----就是有意思。----动作到位。----厉害了----没毛病，绝对没毛病。----都是预备好的吗？----顶我上去。----虽然有版本，但你也是戏精。----你好。----莫名看了好几遍。----溜溜的哇。----非原音----根本停不下来。----后起之秀都没有你秀。----蒂花之秀。----不是吗？----这到底是哪个国家的歌这么火？----晕----有灵性我去。----qq上的----我觉得现在很寂寞。----皮----有好几个版本了，很好笑。----都不服就服你。----一般不评论，只要一个眼神，我啥都说。----别人家的都是好的。----几个意思啊？----太六了吧，哈哈哈。----确认过眼神，你是最牛的人。----有点儿特别，有点儿意思。----用心拍的作品就是好看。----越来越精彩了。----看了一次又一次，上瘾了怎么办？----一直被模仿，从未被超越。----今天好多人看啊。----没情况啊。----感觉明天会突然火起来。----喜欢你这样的视频。----精彩人生从这里开始。----用心演绎，用心生活。----直接，我喜欢。----霸气了。----哈哈哈酷。----为了火也是拼了。----是认真的吗？----换个音乐效果会更好。----拍摄的很专业啊。----哈哈，真的假的？----祝福你。----音乐背景改一下。----无与伦比。----这种风格应该是很多人会喜欢的吧。----每一秒都是那么精彩。----原创最值得尊敬。----很卖力呀。----挺你。----其实还好吧？----好视频，值得推荐。----这视频也就这样了。----拍摄技术有待提高啊。----有人喜欢吗？----好啊，很给力。----真好，我会继续支持你的。----哇，太好了，哈哈哈。----赞你一个。----反正我是喜欢了。----加油啊，有好多人看好你的。----哈哈，拍得太好啦！----啦啦啦。----后面得跟上。----内容有点儿短----越来越精彩了。----这作品有深度啊。----良心作品。----我也想要拍。----越来越好看了，真有你的。----来看看，不错的作品。----有人喜欢吗？----可以上热门了，拍的太好了。---- 视频值得推荐。----这作品能拿第一了。----这个要火好长一段时间了吧。----什么情况啊。----在一个记得回访啊。----这是什么节奏啊？----火了？----这作品会有更多人来转发的。----你们一起支持他会很高兴。----应该会火吧。----会火的，放心睡吧。----不错，赞一个。----一看就停不下来。----不多说了，只管转发。----可以说很优秀啦。----这么好的作品必须转发，错过了就可惜了。----这视频还是很给力呀。----向你学习！----谢谢分享。----真让人羡慕。----一看就学会了。----第一次看就被吸引啦。----别翻了，我在这。----这么劲暴的视频，我喜欢。----还可以呀，有点儿意思。----我觉得我飘了。----意外惊喜。----同城路过。----火！力！全！开！----该你火一下了，支持你。----你们看到我了么？----是认真的吗？----舍不得走。----我有点喜欢了。我会看看其他作品。----有个性的我喜欢。----有人喜欢我吗  哈哈----别玩了。----未完待续。----这么好，应该会火吧，你们说是不是？----厉害了，我的哥。----就是这么牛！----确认过眼神，你是最牛的人。----如果更新能快一点儿就好了。----真好看，赞----希望越来越火，好多人看好你。----好看，可能时间太短了。----静静的看着。----加油，下次再出更好的作品。----这个好像之前在哪看过。不过你的拍的更好。----确实不错，没几个人能拍出这样的效果。----已经很不错了，如果拍的技术再提高一点点就完美了。----这视频太短了。----很喜欢你哦，每个视频我都看。----很喜欢这种风格的有深度。----关于这个，好像还有故事呢。----超长发挥了。----不错啊，有空我也拍个试试。----结尾与开头完美衔接。----这个平台真好，还能看到这种视频。----很有创意呀，这是自己想到的吗？好厉害。----有点模糊，下次再高清一点儿就好啦。----大家注意第五秒。----很好看，时间太短不过瘾，再多看几次吧。----这要拍多少次才有这种效果啊？太厉害了。----没让我失望。----不合理不合理。----好久没更新了。等的好着急呀。----你终于想起了你的抖音密码。----想法真好，就是拍的技术还要提高一点。----怎么有一股莫名的习惯。----这个太好了，怎么做到的？----越来越好看了，真有你的。----真是强大。----谢谢你治好了我多年的近视，因为我已经瞎了。----不佩服都不行，太厉害了。----我也是看上瘾了。----信我，这一定会火的。----现在的人都这么有才的吗？----你已经成功引起了我的注意。----嘿嘿，人才一个。----好聪明啊，这样都能想的到。----第十秒有亮点。----又学到了很多。----真好----什么软件剪辑。----热门----江山辈有人才出，朕很欣慰啊兄弟。----有瑕疵。----任意门----还没睡的集合。----加油！----为你点赞----让我来。顶我上去。----真的超喜欢。----赞赞赞赞赞赞！----我觉得你会火。----前排留名我不信楼主会回复我这个。----成功永远是留给有准备的人，给你赞。----火钳刘明。----你厉害。----第一个评论给你了，哈哈哈。----拍的很好呢。----非常好哦。----红红火火恍恍惚惚。----E打开抖音就看见你。----社会，社会。----什么时候我能这样拍个视频。----502个赞。----还真会。----好好看啊。----真的很不容易。----要火咯。----我居然看完了。----忍不住赞了，忍不住看抖音。----喜欢，一种莫名其妙的感觉。----目测会火，火了叫我。----翻牌翻牌。----不给力。----支持支持。----双击必须滴。----给你增人气。----果断赞转评。----么么哒。----喜欢你，可以回复我吗？哈哈哈。----必须点心。----完了，好喜欢。----好的，发光了，不要忘记我。----噢！----太棒了，给你100个赞。----为什么你回复那么多人不回复我？----火了。----这个可以。----好好好，路转粉。----上去。----快来围观。----支持你。----三遍以上。----百分百炸。----感觉太棒了。----这个必须给你赞太棒了。----这个视频表达的内容很特别的。----拍的太好了，哈哈哈。----我是喜欢。----没什么特别的地方，不过还是赞一个。----很好，在哪学的？----几个意思啊。----点特别有点儿意思。----用心拍的作品就是好看。----用心做事的人就是不一样。----作品能拿第一了。----太霸气了。----你学习。----可以说是很优秀了。----别翻了，我在这儿。----这个很成功。----服你。----没让我失望。----真的强大。----堪比好莱坞大片儿。----什么时候在更新啊，太好看了。----一秒都那么精彩。----还有比这个更好的吗？没有了。----这是我看过的最值得推荐的作品。----多看几次会看出不同的东西。----其实还好吧？----虽然没有更多的修饰，但是这种平淡确是我们所需要的。----哇，太好了，哈哈哈。----虽然拍摄技术不怎么样，不过还是很用心的。----好视频，值得推荐。----哈哈哈，拍的太好啦！----短短十几秒就表现这么多，绝了----剧情就是没得说。----太帅了，怎么做到的？----很卖力呀。----这视频也就这样儿了。----什么特别的地方----加油，你是最棒的。----好魔性。----这挺好看的。----真心很赞。----这是在哪里？----果断转发支持。----喜欢这种范。----必需扩散一下。----又来了。----这个可以有。----已关注。----嘤嘤。----已经关注你很久了。----不错，挺好看的。----有人喜欢吗？----有点儿短啦。----这个不火天理难容顶我上去。----万一火了呢。----厉害，我也要火。----年轻真好。----火----火前关注留名。----差距不大，继续努力。----什么都不要说来吧。----牛批----秀儿，是你吗？----哈哈哈，笑掉我的西班牙和葡萄牙。----看的一脸懵逼。----恕我直言在座的各位都是垃圾。----热门看到了。----中招的右边。----陌生人告诉我你在哪儿，找你撸串----看热门儿的一个作品就是这个视频。----背景音乐是啥？----感觉自己懂得太多了。----阿弥陀佛。----要是玩抖音为什么你的粉丝这么少，你怎么看？----多发点。---- 不上瘾都不行。----买了否冷。----我也是。----来我办公室搞不死你个小样得。----不按套路出牌呀。----升职加薪，走上人生巅峰。----哦，原来不是买了否冷。----在没看见他更新抖音了。----我就想问问然后呢？----优秀。----刚看了原创来个山寨闪了我的腰。----没有下集。----刷到这个视频是不是好多人看到了自己曾经的影子。----兄弟们，你们快看他相信爱情哈哈哈哈哈哈哈哈哈哈哈。----说的真好。----还是年轻好。----Wc这年轻人。----感动一切都好。----我曾经，唉，不想说了。----青春不在了。----我是来看评论的。----作者能不能写一段视频说明？----干嘛这是？----想起了自己。----要不要这么幽默？----资料需要给你。----个个评论都那么感人肺腑，没有你很优秀。----总感觉评论席是最精彩的。----其实你不得不承认，有时候刷抖音，不知不觉就会很伤感。----你快走吧，我妈不让我跟傻子玩。----原谅我不厚道的笑了。----为什么我笑了？----幸好我暂停了，没事儿吧？----不要再反抗了。----打你电话你不接，发信息你不回，你居然在这儿拍抖音我不管啦砖你自己搬吧。----内容过于真实。----堪比好莱坞大片儿。----什么时候在更新啊，太好看了。----一秒都那么精彩。----还有比这个更好的吗？没有了。----这是我看过的最值得推荐的作品。----多看几次会看出不同的东西。----其实还好吧？----虽然没有更多的修饰，但是这种平淡确是我们所需要的。----哇，太好了，哈哈哈。----虽然拍摄技术不怎么样，不过还是很用心的。----好视频，值得推荐。----哈哈哈，拍的太好啦！----短短十几秒就表现这么多，绝了----剧情就是没得说。----太帅了，怎么做到的？----拍的很好呢。----非常好哦。----红红火火恍恍惚惚。----E打开抖音就看见你。----社会，社会。----什么时候我能这样拍个视频。----502个赞。----还真会。----好好看啊。----真的很不容易。----要火咯。----我居然看完了。----忍不住赞了，忍不住看抖音。----喜欢，一种莫名其妙的感觉。----目测会火，火了叫我。----翻牌翻牌。----不给力。----支持支持。----双击必须滴。----给你增人气。----果断赞转评。----么么哒。----喜欢你，可以回复我吗？哈哈哈。----精彩人生从这里开始。----用心演绎，用心生活。----直接，我喜欢。----霸气了。----哈哈哈酷。----为了火也是拼了。----是认真的吗？----换个音乐效果会更好。----拍摄的很专业啊。----哈哈，真的假的？----祝福你。----音乐背景改一下。----无与伦比。----这种风格应该是很多人会喜欢的吧。----每一秒都是那么精彩。----原创最值得尊敬。----谅我不厚道的笑了。----本来胃疼，一笑更疼。----我买点儿饼干。----看了好几遍。----配音的。----看一个笑一个。----你是吗？----找不回调。----很六----笑的肚子疼啊。----快点儿！----顾得。----快点----人生难免经受挫折，风雨过后就是彩虹----年轻是我们唯一有权力去编织梦想的时光----人生那么短，我就选择做那种又盲目又热情的傻瓜。----永远年轻;永远热泪盈眶;永远相信梦想;----相信努力的意义;相信遗憾会比失败更可怕。----不成功的人生，它只是不完美，但是它完整。----不要气馁，坚持下去.----不历经风雨，又怎能见彩虹?----山不辞土，故能成其高;海不辞水，故能成其深!----人生总会遇到挫折与坎坷，有无数次的跌倒就要有无数次的爬起。----付出就要赢得回报，这是永恒的真理.----许多事情，坚持坚持，就过来了。----你凭什么不努力，又什么都想要。----不管失败多少次，都要面对生活，充满希望。----人生就像一座山，重要的不是它的高低，而在于灵秀.----不管现在有多么艰辛，我们也要做个生活的舞者。----如果你能像看别人缺点一样看自己，那么你的生命将会不平凡。----一切伟大的行动和思想，都有一个微不足道的开始。----业精于勤而荒于嬉，行成于思而毁于随。----勤奋是你生命的密码----命运如同手中的掌纹，无论多曲折，终掌握在自己手中。----心的梦想，及是飞上天堂，我的梦想是实现理想。----生活难免遭受苦难，雨过天晴终有阳光.----要跟成功者有同样的结果，就必须采取同样的行动.----都会过去的，烦躁的心情孤独的生活，还有努力也没用的事。----太阳升起的瞬间，对于昨天已成永远！----每天醒来都有两个选择，继续做梦或起身追逐梦想。----成功的秘诀是努力，所有的第一名都是练出来的。----青年是学习智慧的时期，老年是付诸实践的时期。----人的一生没有一帆风顺的坦途。----别回头，路在你的前面，后面只是你的影子。----别总听悲伤的歌，别总想从前的事----没有目标就没有方向，每一个学习阶段都应该给自己树立一个目标。----有梦就该勇敢去追.----在真实的生命里，每桩伟业都由信心开始，并由信心跨出第一步。----如果要挖井，就要挖到水出为止。----坚定的人，懂得在听不到赞美和肯定的时候，多爱自己一点。----忌妒别人，不会给自己增加任何的好处。----得不到的，就一笑而过；躲不开的，就勇往直前。----成功的关键在于相信自己有成功的能力。----没有人可以回到过去重新开始，但谁都可以从今日开始，书写一个全然不同的结局！----成大事不在于力量多少，而在能坚持多久。----斩断自己的退路，才能更好地赢得出路。----你要做的就是让成功的速度大于父母老去的速度。----大道理人人都懂，小情绪却是难以自控。----人要是不失掉方向，就不会丧失自己。----每当迷茫的时候，就疯狂去学新的东西，总有一天你会用得上。----有些事，藏在心里是莫大的委屈。话到嘴边、又觉得无足挂齿不值一提。----瀑布跨过险峻陡壁时，才显得格外雄伟壮观。----你若是找不到坚持下去的理由，那么你就找一个重新开始的理由.----要努力呀，为了想要的生活.----世间事，凡有一得必有一失，凡有一失必有一得----不懂别人就少说话，人最大的修养是知人不评人更不讽人.----人的生活如果没有理想的鼓舞，就会变得空虚而渺小。----年轻不为梦想埋单，老了拿什么话说当年。----你永远都无法借别人的翅膀，飞上自己的天空。----泪水不是为了排除外在的悲伤，而是为了自由的哭泣。----生活总是两难，再多执着，再多不肯，最终不得不学会接受。----就算全世界都否定我，还有我自己相信我。----一旦人的命运不宠你，请你别伤害自己。----加油 路在脚下  梦在远方----你就是一道风景，没必要在别人风景里面仰视。----只要你还愿意努力，世界会给你惊喜。----愿每个独自走夜路的你都足够坚强。----一切的成就，一切的财富，都始于一个意念。----别说不行，你都还没做怎么会知道？----逆风的方向，更适合飞翔----目标的坚定是性格中最必要的力量源泉之一----掉下水里不会死，一直呆在水里才会死。----努力造就实力，态度决定高度。 ----失败只是代表你的努力还不够。 ----莫等闲，白了少年头，空悲切。 ----大胆的尝试只等于成功的一半。 ----勤奋，是步入成功之门的通行证。 ----更新你的思想，你就能获得新生。 ----我努力，我坚持，我就一定能成功。 ----人生难得几回搏，此时不搏何时搏。 ----平凡的脚步也可以走完伟大的行程。 ----不是境况造就人，而是人造就境况。 ----人生最大的错误是不断担心会犯错。 ----书山有路勤为径，学海无涯苦作舟。 ----成名每在穷苦日，败事多因得意时。 ----成功的秘诀，在永不改变既定的目的。----人生是一种信念，相信美好，自然能遇见美好。----经过奋斗，终于拨开了云雾，见到了日出.----面对取得的成绩，不要骄傲，再接再励，继续向前行。----用自己的双手去创造生活，用辛勤的汗水实现人生的梦想。----不甘心的时候，就是在进步。----痛苦的时候，就是在成长。----我始终相信一句话，只有自己强大，才不会被别人践踏。----逼着你往前走的，不是前方梦想的微弱光芒，而是身后现实的万丈深渊。----有时候我们需要的不是安慰，而是一个巴掌。----我从不担心我努力了不优秀，只担心优秀的人都比我更努力。----思考的越多，得到的越多。因为思考可以释放能量。----做决定之前仔细考虑，一旦作了决定就要勇往直前、坚持到底。----强者创造事变，弱者受制于上帝给他铺排的事变。----如果你有鸭梨，把它放冰箱里，它就会变成冻梨。----任何时候都可以做自己想做的事情，勿需用年龄来束缚自己。----永远成功的秘密，就是每天淘汰自己！----有时候，坚持了你最不想干的事情之后，便可得到你最想要的东西。----不要为已消逝之年华叹息，须正视欲匆匆溜走的时光。----人总有一些并非无法放下，而是不想放下的习惯。----只有第一名可以教你如何成为第一名。----九十九次的理论不如一次的行动来得实际。----一个胜利者不会放弃，而一个放弃者永远不会胜利。----觉得自己做得到和做不到，其实只在一念之间。----要想成为强者，决不能绕过挡道的荆棘也不能回避风雨的冲刷。----人的一生，可以有所作为的时机只有一次，那就是现在。----行动不一定带来快乐，而无行动则决无快乐。----成功者绝不放弃。----成功永远属于马上行动的人。----下定决心一定要，才是成功的关键。----成功等于目标，其他都是这句话的注解。----成功是一个过程，并不是一个结果。----成功者学习别人的经验，一般人学习自己的经验。----你要求的次数愈多，你就越容易得到你要的东西----与其在风雨中逃避，不如在雷电中舞蹈----世界会向那些有目标和远见的人让路。----经过大海的一番磨砺，卵石才变得更加美丽光滑。----河流之所以能够到达目的地，是因为它懂得怎样避开障碍。----不可压倒一切，但你也不能被一切压倒。----一个人的成败，与他的心量有很大关系。----人生没有对错，只有选择后的坚持，不后悔，走下去，就是对的。----生活不会向你许诺什么，尤其不会向你许诺成功。它只会给你挣扎、痛苦和煎熬的过程。----每个人真正强大起来都要度过一段没人帮忙，没人支持的日子。----想要看清事实，必须要经历一些疼痛。----在这个横冲直撞的世界，我们需要拥有强悍无比的内心。----无论这个世界对你怎样，都请你一如既往的努力、勇敢、充满希望。----每个成功者，都要穿越不为人知的黑暗。----泪水和汗水的化学成分相似，前者只能为你换来同情，后则却可以为你赢得成功。----胜利属于坚持到最后的人。----生命不是要超越别人，而是要超越自己。----生气是拿别人做错的事来惩罚自己。----每一个成功者都有一个开始.----世界上只有想不通的人，没有走不通的路。----一个人是在对周围生活环境的反抗中创造成功的。----做一个决定，并不难，难的是付诸行动，并且坚持到底。----当你跌到谷底时，那正表示，你只能往上，不能往下!----没有哪一个聪明人会否定痛苦与忧愁的锻炼价值。----一份耕耘，一份收获，付出就有回报.----经验不是发生在一个人身上的事件，而是一个人如何看待发生在他身上的事。----加倍努力，证明你想要的不是空中楼阁。----胜利是在多次失败之后才姗姗而来。----做最好的今天，回顾最好的昨天，迎接最美好的明天。----无论你觉得自己多么的不幸，永远有人比你更加不幸。----宁愿跑起来被拌倒无数次，也不愿规规矩矩走一辈子。----在哪里跌倒，就在那爬起来----世上没有绝望的处境，只有对处境绝望的人。----经验是由痛苦中粹取出来的。----不经历风雨 ，怎么会见到彩虹----唐僧经历了九九八十一难，才修成正果。你这点挫折又算什么----一个从来没有失败过的人，必然是一个从未尝试过什么的人。----与其在别人的生活里跑龙套，不如精彩做自己。----路的尽头，仍然是路，只要你愿意走。----一个人至少拥有一个梦想，有一个理由去坚强.----对于不可改变的事实，你除了接受以外，没有更好的办法了。----成功的路上，失败是必然的 。----觉得自己做的到和不做的到，其实只在一念之间。----路在自己脚下，没有人可以决定我的方向。----命运是不存在的，它不过是失败者拿来逃避现实的借口----所有的成功，都来自不倦的努力和奔跑----如果你的生活已处于低谷，那就，大胆走，因为你怎样走都是在向上。----你的选择是做或不做，但不做就永远不会有机会。----不要慨叹生活的痛苦----人生是一次旅程，有上坡也有下坡。----不要在乎自己的终点是坡顶还是谷底，沿途的风景不要错过----比别人多一点努力，你就会多一份成绩.----生活远没有咖啡那么苦涩，关键是喝它的人怎么品味!----每个人都喜欢和向往随心所欲的生活，殊不知随心所欲根本不是生活。----有时候，渺小的开始，可以成就雄伟而宏大的事业----万事开头难，坚持就是胜利----拼一年春夏秋冬，搏一生无怨无悔----要努力，至少不给未来得自己回忆时，留下任何遗憾----贵在坚持，难在坚持，成在坚持----努力和上进，不是为了做给别人看，是为了不辜负自己----现在奋斗，就是为了将来有吹牛逼的资本。----如果这一生都没有奋斗过，那么你的人生就太无味了----上路吧，出发吧，干吧，为了自己想要的生活----有没有出息靠自己 脸靠自己挣的----每天都在忙着成长----不要急着说你别无选择，也许、在下个路口你就会遇见希望----成长的过程总是要经历几次坎坷、遇见几个人，然后看清世事的----成长，就是实现独立生存、完成独立思考能力的自我奋斗----学会与自己的伤痛和平共处，这就是成长的意义----人的一生全靠奋斗，唯有奋斗才能成功----人生能有几回博，此时不博何时博----多留一点汗，少留一滴泪----何必等以后呢，梦想就在当下----只要路是对的，就不怕路远----该坚强就别懦弱下去。----不尝试一下，你怎么就知道自己不会成功.----能把在面前行走的机会抓住的人，十有八九都会成功----不经一翻彻骨寒，怎得梅花扑鼻香----不要安于现状，要敢于挑战----活鱼会逆流而上，死鱼才会随波逐流----要战胜恐惧，而不是退缩----每一个发奋努力的背后，必有加倍的赏赐----成功与不成功之间有时只有一步之遥----不经一翻彻骨寒，怎得梅花扑鼻香----努力攀登向上 才能看的更远----冲刺拼搏，在前进中寻找乐趣----努力向前走一步，离梦想就更近一步----现在的我不配喊累，因为我一无所有----不摔的惨烈，如何享受涅磐重生的快乐----只要你还愿意努力，世界会给你惊喜----没有走不通的路，只有不敢走的人！----没有平日的失败，就没有最终的成功----没有口水与汗水，就没有成功的泪水----成功就在于面临挫折打击时，勇敢的再跨一步。----做一件事并不难，难得是在于坚持----要有积极的人生态度，不要受了点挫折就想不开----世界上唯一可以不劳而获的就是贫穷，所以你要努力----只有让自己更加强大，才能真正地撑起一片天。----你总要为了梦想，全力以赴一次。----有些压力总是得自己扛过去----生活从未变得容易，只不过是我们变得更加坚强----自己都不努力 又有什么理由难过.----不断的努力，为了更好的自己。----有人看风景，有人努力成为风景。----努力，才是我们人生的态度。----忘掉失败，不过要牢记失败中的教训----强者总是把压力转换成动力----给生活比个耶----只有自己强大，才不会被别人践踏。----天再高又怎样，踮起脚尖就更接近阳光。----如果你想要从未拥有过的东西，那么你必须做你从未做过的事。----没有什么可惜不可惜，只有现在有没有努力！----不是井里没有水，而是你挖的不够深----若是自己没有尽力，就没有资格批评别人不用心。----勇士搏出惊涛骇流而不沉沦，懦夫在风平浪静也会溺水。----成功不是将来才有的，而是从决定去做的那一刻持续累积而成。----想要的东西必须自己拿，不然就算别人给你也要不起。----不要放弃，你要配的上自己的野心----只要你自己不倒，别人可以把你按倒在地上，却不能阻止你满面灰尘遍体伤痕地站起来。----有些路很远，走下去会很累，可是，不走，又会后悔。----选一种姿态，让自己活得无可替代，没有所谓的运气，只有绝对的努力。----泪，自己尝。痛，自己扛。未来，自己去闯。----你不能改变过去，但你可以改变未来。----别人拥有的，你不必羡慕，只要努力，你也会拥有。----如果你想要从未拥有过的东西，那么你必须做你从未做过的事。----华丽的跌倒，胜过无谓的徘徊。----行动是治愈恐惧的良药，而犹豫拖延将不断滋养恐惧。----不举步，越不过栅栏；不迈腿，登不上高山。----只会在水泥地上走路的人，永远不会留下深深的脚印。----愚蠢的人总是为昨天悔恨，为明天祈祷，可惜的是少了今天的努力。----克服困难，勇敢者自有千方百计，怯懦者只感到万般无奈。----不从泥泞不堪的小道上迈步，就踏不上铺满鲜花的大路。----你既然认准一条道路，何必去打听要走多久。----即使脚步下是一片岩石，它也会迸发出火花----新路开始常是狭窄的，但它却是自己延伸拓宽的序曲。----成功是优点的发挥，失败是缺点的累积。----压力是无知者颓丧的前奏，更是有志者奋进的序曲。----马行软地易失蹄，人贪安逸易失志。----高峰只对攀登它而不是仰望它的人来说才有真正意义。----如果把才华比作剑，那么勤奋就是磨刀石。----通过云端的道路，只亲吻攀登者的足迹。----你既然认准一条道路，何必去打听要走多久。----萤火虫的光点虽然微弱，但亮着便是向黑暗挑战。----拒绝严峻的冶炼，矿石并不比被发掘前更有价值。----壮志与毅力是事业的双翼。----顽强的毅力可以征服世界上任何一座高峰！----一时的挫折往往可以通过不屈的搏击，变成学问及见识。----希望，只有和勤奋作伴，才能如虎添翼。----志不立，天下无可成之事。----年轻是我们唯一有权力去编织梦想的时光。----耕耘者的汗水是哺育种子成长的乳汁。----不管多么险峻的高山，总是为不畏艰难的人留下一条攀登的路。----经过海浪的一番磨砺，卵石才变得更加美丽光滑。----如果把才华比作剑，那么勤奋就是磨刀石。----命运把人抛入最低谷时，往往是人生转折的最佳期----痛苦的记忆是泪水洗不净的，只有汗水才能把它冲掉。----如果没有艰险也就不成为英雄了。----克服困难，勇敢者自有千方百计，怯懦者只感到万般无奈。----不去耕耘，不去播种，再肥的沃土也长不出庄稼----志在峰巅的攀登者，不会陶醉在沿途的某个脚印之中。----不要等待机会，而要创造机会。----谁笑到最后，谁笑得最美!----尝试所有你未曾经历的事情，不论好坏。----悲观些看成功，乐观些看失败。----过去的就把它忘了重新开始。----昨天，删去，今天，争取，明天，努力。----我会把每一次改变当做成长，哪怕是痛也值得。----要先打败任何事情得先学会打败自己。----没有人可以打倒我，除非我自己先趴下!----勤奋是你生命的密码，能译出你一部壮丽的史诗。----不怕苦，吃苦三五年;怕吃苦，吃苦一辈子。----没有伞的孩子必须努力奔跑!----你不勇敢，没人替你坚强----不要给自己的失败找借口!----吃得苦中苦，方为人上人。----当机会来临时，你已经准备好了。----含泪播种的人一定能含笑收获。----没有天生的信心，只有不断培养的信心。----没有一种不通过蔑视忍受和奋斗就可以征服的命运。----让信念坚持下去，梦想就会实现。----如果你不努力争取你想要的，那你永远都不会拥有它。----如果放弃太早，你永远都不知道自己会错过什么。----低头哭过别忘了抬头继续走。----有种脾气叫，不放弃。----成长就是逼着自己坚强"
话术arr = 转发评论str.split("-")

在看无效 = 0;
微微连续失败次数=0;
微圈连续失败次数=0;
var versionNum = "v1.0.6";


function jm() {
    ui.statusBarColor("#4FB3FF");
    ui.layout(
        '<vertical w="*" h="*">\
            <appbar>\
                <tabs id="标签" bg="#4FB3FF" />\
            </appbar>\
            <viewpager id="标签页" >\
                <frame w="*" h="*" >\
                        <vertical>\
                            <vertical margin="0 2" bg="#ffffff" elevation="1dp" padding="0 0 0 0" w="*" h="auto">\
                                <Switch w="*" checked="{{auto.service != null}}" textColor="#666666" text="无障碍服务" id="wzaqx" h="20" />\
                                </vertical>\
                                <vertical margin="0 2" bg="#ffffff" elevation="1dp" padding="0 0 0 0" w="*" h="auto">\
                            <horizontal>\
                                    <text text="wei微任务:" textSize="12sp" w="60" />\
                                    <checkbox text="点赞" id="ww_dz" checked="{{ww_dz}}" layout_weight="1" textSize="12sp" />\
                                    <checkbox text="关注" id="ww_gz" checked="{{ww_gz}}" layout_weight="1" textSize="12sp" />\
                                    <checkbox text="播放" id="ww_bf" checked="{{ww_bf}}" layout_weight="1" textSize="12sp" />\
                                    <checkbox text="收藏" id="ww_sc" checked="{{ww_sc}}" layout_weight="1" textSize="12sp" />\
                                    <checkbox text="评论" id="ww_pl" checked="{{ww_pl}}" layout_weight="1" textSize="12sp" />\
                                    </horizontal>\
                                    <horizontal>\
                                <checkbox text="转发" id="ww_zf" checked="{{ww_zf}}" layout_weight="1" textSize="12sp" />\
                                <checkbox text="人气" id="ww_rq" checked="{{ww_rq}}" layout_weight="1" textSize="12sp" />\
                                <checkbox text="评赞" id="ww_pz" checked="{{ww_pz}}" layout_weight="1" textSize="12sp" />\
                                <checkbox text="搜一搜" id="ww_sys" checked="{{ww_sys}}" layout_weight="1" textSize="12sp" />\
                                <checkbox text="自提" id="ww_tx" checked="{{ww_tx}}" textSize="12sp" />\
                                </horizontal>\
                                </vertical>\
                                <vertical margin="0 2" bg="#ffffff" elevation="1dp" padding="0 0 0 0" w="*" h="auto">\
                                <horizontal>\
                                <text text="wei圈任务:" textSize="12sp" w="60" h="auto" layout_gravity="center" />\
                                <checkbox text="点赞" id="vq_dz" checked="{{vq_dz}}" layout_weight="1" textSize="12sp" />\
                                <checkbox text="关注" id="vq_gz" checked="{{vq_gz}}" layout_weight="1" textSize="12sp" />\
                                <checkbox text="播放" id="vq_bf" checked="{{vq_bf}}" layout_weight="1" textSize="12sp" />\
                                <checkbox text="收藏" id="vq_sc" checked="{{vq_sc}}" layout_weight="1" textSize="12sp" />\
                                <checkbox text="评论" id="vq_pl" checked="{{vq_pl}}" layout_weight="1" textSize="12sp" />\
                                <checkbox text="转发" id="vq_zf" checked="{{vq_zf}}" layout_weight="1" textSize="12sp" />\
                                </horizontal>\
                                <horizontal>\
                                <text text="wei圈阅读:" textSize="12sp" w="60" />\
                            <checkbox text="阅读" id="vq_yd" checked="{{vq_yd}}" layout_weight="1" textSize="12sp" />\
                            <checkbox text="关注" id="vq_ydgz" checked="{{vq_ydgz}}" layout_weight="1" textSize="12sp" />\
                            <checkbox text="在看" id="vq_ydzk" checked="{{vq_ydzk}}" layout_weight="1" textSize="12sp" />\
                            <checkbox text="文章赞" id="vq_ydwzz" checked="{{vq_ydwzz}}" layout_weight="1" textSize="12sp" />\
                             </horizontal>\
                            </vertical>\
                                <vertical margin="0 2" bg="#ffffff" elevation="1dp" padding="0 0 0 0" w="*" h="auto">\
                                <horizontal  >\
                                <text text="点赞数量:" textSize="12sp" />\
                                    <input id="输入框_点赞数量" text="{{点赞数量}}" textSize="12sp" w="50" inputType="number" />\
                                    <text text="个        关注数量:" textSize="12sp" />\
                                    <input id="输入框_关注数量" text="{{关注数量}}" textSize="12sp" w="50" inputType="number" />\
                                    <text text="个" textSize="12sp" />\
                                </horizontal>\
                                <horizontal  >\
                                    <text text="视频等待:" textSize="12sp" />\
                                    <input id="输入框_视频等待" text="{{视频等待}}" textSize="12sp" w="50" inputType="number" />\
                                    <text text="秒        关注等待:" textSize="12sp" />\
                                    <input id="输入框_关注等待" text="{{关注等待}}" textSize="12sp" w="50" inputType="number" />\
                                    <text text="秒" textSize="12sp" />\
                                </horizontal>\
                                <horizontal  >\
                                    <text text="小程序1等待:" textSize="12sp" />\
                                    <input id="wait_one" text="{{wait_one}}" textSize="12sp" w="50" inputType="number" />\
                                    <text text="秒，2等待:" textSize="12sp" />\
                                    <input id="wait_two" text="{{wait_two}}" textSize="12sp" w="50" inputType="number" />\
                                    <text text="秒，3等待:" textSize="12sp" />\
                                    <input id="wait_three" text="{{wait_three}}" textSize="12sp" w="50" inputType="number" />\
                                    <text text="秒" textSize="12sp" />\
                                </horizontal>\
                                <horizontal  >\
                                    <text text="指定昵称:" textSize="12sp" />\
                                    <input id="输入框_指定昵称" text="{{指定昵称}}" textSize="12sp" w="200"  />\
                                </horizontal>\
                                <horizontal  >\
                                    <text text="微微链接:" textSize="12sp" />\
                                    <input id="输入框_微微链接" text="{{微微链接}}" textSize="12sp" w="200"  />\
                                </horizontal>\
                                <horizontal  >\
                                    <text text="微圈链接:" textSize="12sp" />\
                                    <input id="输入框_微圈链接" text="{{微圈链接}}" textSize="12sp" w="200" />\
                                </horizontal>\
                                <horizontal  >\
                                    <checkbox text="搜索进平台" id="ssjpt" checked="{{ssjpt}}" layout_weight="1" textSize="12sp" />\
                                    <checkbox text="返回刷新主页" id="shuaxin" checked="{{shuaxin}}" layout_weight="1" textSize="12sp" />\
                                </horizontal>\
                                <checkbox text="导航键(全面屏手机屏幕下面是不是有虚拟按键,没有或者不是全面屏手机无视)" id="dhj" checked="{{dhj}}" layout_weight="1" textSize="12sp" />\
                            </vertical>\
                            <linear margin="0 0 0 0">\
                                <button text="详细日志" id="按钮_日志" w="auto" h="40" style="Widget.AppCompat.Button.Borderless.Colored" layout_weight="1" />\
                            </linear>\
                        </vertical>\
                    <button id="start1" text="加载悬浮窗" color="#ffffff" bg="#FF4FB3FF" layout_gravity="bottom" h="50" />\
                </frame>\
            </viewpager>\
        </vertical>', null);
}
var window
var windows
var str = versionNum;
console_arr = android.util.SparseArray();
console_arr.put(android.util.Log.VERBOSE, java.lang.Integer(colors.parseColor("#ffa500")));
console_arr.put(android.util.Log.DEBUG, java.lang.Integer(colors.parseColor("#ffffff")));
console_arr.put(android.util.Log.INFO, java.lang.Integer(colors.parseColor("#64dd17")));
console_arr.put(android.util.Log.WARN, java.lang.Integer(colors.parseColor("#00ddff")));
console_arr.put(android.util.Log.ERROR, java.lang.Integer(colors.parseColor("#ff0000")));
console_arr.put(android.util.Log.ASSERT, java.lang.Integer(colors.parseColor("#ffff534e")));
function floatyModule() {
    demo = ('<vertical id="win" visibility="gone" bg="#80000000" h="{{Math.floor(高 *0.5)}}px" >\
     <View bg="#00ccff" h="1px"  w="{{Math.floor(宽*0.8)}}px"  />\
        <text  id="wz" textColor="#FFFFFFFF" textSize="12" textStyle="bold" text=""  textIsSelectable="true"  maxliness="1"  />\
    <View bg="#00ccff" h="1px" textSize="10"  w="{{Math.floor(宽*0.8)}}px" />\
    <com.stardust.autojs.core.console.ConsoleView    id="console"   />\
</vertical>');
    threads.start(function () {
        window = floaty.rawWindow(demo);
        ui.run(function () { window.console.findViewById(context.getResources().getIdentifier("input_container", "id", context.getPackageName())).setVisibility(8); });
        window.console.setColors(console_arr);
        window.console.setConsole(runtime.console);
        window.setTouchable(false);
        window.setPosition(0, 高 * 0.2);
        //保持悬浮窗不被关闭,从而保持脚本运行（应该要写在悬浮窗线程里）
        setInterval(()=>{}, 1000);
    })
    this.show = function () {
        if (window) ui.run(() => { window.win.visibility = 0 })
        else setTimeout(() => { this.show() }, 200)
    }
    this.hide = function () {
        if (window) ui.run(() => { window.win.visibility = 8; })
        else setTimeout(() => { this.show() }, 200)
    }
    this.clearLog = function () {
        runtime.console.clear();
    }
    this.update = function () {
        if (window) ui.run(() => { window.win.adapter.notifyDataSetChanged(); })

    }
    this.setXY = function (x, y) {
        x = x || 1;
        y = y || 1;
        if (window) ui.run(() => { window.setPosition(x, y); })
    }
    this.setsize = function (w, h) {
        w = w || 宽 / 5;
        h = h || 高 / 6;
        if (window) ui.run(() => { window.setSize(w, h); })
    }

}
events.observeToast();
events.onToast(function (toast) {
    var pkg = toast.getPackageName();
    if (pkg == "com.tencent.mm" && (toast.getText() == "已分享" || toast.getText() == "微信：已分享")) {
        转发check = true;
    }
});

日志 = new floatyModule();
jm()
ui.wzaqx.on("check", function (checked) {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

ui.emitter.on("resume", function () {
    ui.wzaqx.checked = auto.service != null;
})

ui.按钮_日志.on("click", () => {
    app.startActivity('console');
});



ui.start1.on("click", () => {
    if (ui.start1.text() == "加载悬浮窗") {
        //engines.execScriptFile("ce.js")
        
        ui.run(()=>{
            //这里写针对UI的操作
            ui.start1.setText("关闭脚本");
        });
        threads.start(function () {
            if (!requestScreenCapture()) {
                alert("请求截图失败");
                exit();
            }
            保存配置();
            home();
            悬浮窗();
            threads.start(function () {
                auto.setWindowFilter((info) => {
                    // try{
                    //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
                    // }catch(e){
                    //    return true
                    // }
                    return true
                })
                function 关闭浮窗() {
                    var c = null
                    c = packageName("com.tencent.mm").id("cvt").findOnce()
                    if (c) {
                        c.click()
                    }
                    c = packageName("com.tencent.mm").id("ifb").findOnce()
                    if (c) {
                        c.click()
                    }
                    return 关闭浮窗;
                }
                setInterval(关闭浮窗(), 5000);

                function 任务归位() {
                    if (点赞 < 点赞数量) {
                        ww_dz = storage.get("ww_dz", false);
                    }
                    if (关注 < 关注数量) {
                        ww_gz = storage.get("ww_gz", false);
                    }
                    ww_bf = storage.get("ww_bf", true);
                    ww_sc = storage.get("ww_sc", true);
                    ww_pl = storage.get("ww_pl", true);
                    ww_zf = storage.get("ww_zf", true);
                    ww_rq = storage.get("ww_rq", true);
                    ww_pz = storage.get("ww_pz", true);
                    ww_sys = storage.get("ww_sys", true);
                    ww_tx = storage.get("ww_tx", true);

                    if (点赞 < 点赞数量) {
                        vq_dz = storage.get("vq_dz", false);
                    }
                    if (关注 < 关注数量) {
                        vq_gz = storage.get("vq_gz", false);
                    }
                    vq_bf = storage.get("vq_bf", false);
                    vq_sc = storage.get("vq_sc", false);
                    vq_pl = storage.get("vq_pl", false);
                    vq_zf = storage.get("vq_zf", false);
                    return 任务归位;
                }
                setInterval(任务归位(), 30 * 1000 * 60);

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

                function 清理空间() {
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/cache/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/xlog/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/CheckResUpdate/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxvideotmp/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxvideocache/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxanewfiles/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxafiles/");
                    清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxacache/");

                    return 清理空间;
                }
                setInterval(清理空间(), 60 * 1000 * 60);

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
                                click(cBounds.right - 1, cBounds.bottom - 1);
                            } else {
                                log(new Date().toLocaleString() + "-" + "----------------------------------------------等待未响应成功");
                                return 1;
                            }
                            cBtn = textMatches(/(等待)/).findOne(3000);
                            if (cBtn != null) {
                                log(new Date().toLocaleString() + "-" + "----------------------------------------------等待未响应失败");
                                return 0;
                            } else {
                                log(new Date().toLocaleString() + "-" + "----------------------------------------------等待未响应成功");
                                return 1;
                            }
                        }
                    }
                    return -1;
                }
                
                function 定时结束未响应() {
                    if (等待未响应() == 0) {
                        结束未响应()
                    }
                    return 定时结束未响应;
                }
                setInterval(定时结束未响应(), 10000);
            });
            //threads.start(关闭浮窗)
            //threads.start(任务归位)
            device.keepScreenDim();
            日志.show()
            统计复位()
            微微总操作()
        })
    } else {
        exit();
    }
});

//device.keepScreenDim();
threads.start(检测更新);

/*function 任务归位() {
    while (1) {
        if (点赞 < 点赞数量) {
            ww_dz = storage.get("ww_dz", false);
        }
        if (关注 < 关注数量) {
            ww_gz = storage.get("ww_gz", false);
        }
        ww_bf = storage.get("ww_bf", true);
        ww_sc = storage.get("ww_sc", true);
        ww_pl = storage.get("ww_pl", true);
        ww_zf = storage.get("ww_zf", true);
        ww_rq = storage.get("ww_rq", true);
        ww_pz = storage.get("ww_pz", true);
        ww_sys = storage.get("ww_sys", true);
        ww_tx = storage.get("ww_tx", true);

        if (点赞 < 点赞数量) {
            vq_dz = storage.get("vq_dz", false);
        }
        if (关注 < 关注数量) {
            vq_gz = storage.get("vq_gz", false);
        }
        vq_bf = storage.get("vq_bf", false);
        vq_sc = storage.get("vq_sc", false);
        vq_pl = storage.get("vq_pl", false);
        vq_zf = storage.get("vq_zf", false);

        清空文件夹("/sdcard/Android/data/com.tencent.mm/cache/");
        清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/xlog/");
        清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/CheckResUpdate/");
        清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxvideotmp/");
        清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxvideocache/");
        清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxanewfiles/");
        清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxafiles/");
        清空文件夹("/sdcard/Android/data/com.tencent.mm/MicroMsg/wxacache/");

        sleep(60 * 1000 * 60)
    }
}*/
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
function 保存配置() {
    storage.put("ww_dz", ui.ww_dz.isChecked());
    storage.put("ww_gz", ui.ww_gz.isChecked());
    storage.put("ww_bf", ui.ww_bf.isChecked());
    storage.put("ww_sc", ui.ww_sc.isChecked());
    storage.put("ww_pl", ui.ww_pl.isChecked());
    storage.put("ww_zf", ui.ww_zf.isChecked());

    storage.put("ww_rq", ui.ww_rq.isChecked());
    storage.put("ww_pz", ui.ww_pz.isChecked());
    storage.put("ww_sys", ui.ww_sys.isChecked());
    storage.put("ww_tx", ui.ww_tx.isChecked());

    storage.put("vq_dz", ui.vq_dz.isChecked());
    storage.put("vq_gz", ui.vq_gz.isChecked());
    storage.put("vq_bf", ui.vq_bf.isChecked());
    storage.put("vq_sc", ui.vq_sc.isChecked());
    storage.put("vq_pl", ui.vq_pl.isChecked());
    storage.put("vq_zf", ui.vq_zf.isChecked());
    storage.put("vq_yd", ui.vq_yd.isChecked());
    storage.put("vq_ydgz", ui.vq_ydgz.isChecked());
    storage.put("vq_ydzk", ui.vq_ydzk.isChecked());
    storage.put("vq_ydwzz", ui.vq_ydwzz.isChecked());

    storage.put("dhj", ui.dhj.isChecked());
    storage.put("ssjpt", ui.ssjpt.isChecked());
    storage.put("shuaxin", ui.shuaxin.isChecked());
    storage.put("wait_one", ui.wait_one.text());
    storage.put("wait_two", ui.wait_two.text());
    storage.put("wait_three", ui.wait_three.text());
    storage.put("输入框_视频等待", ui.输入框_视频等待.text());
    storage.put("输入框_关注等待", ui.输入框_关注等待.text());
    storage.put("输入框_点赞数量", ui.输入框_点赞数量.text());
    storage.put("输入框_关注数量", ui.输入框_关注数量.text());
    storage.put("输入框_指定昵称", ui.输入框_指定昵称.text());
    storage.put("输入框_微微链接", ui.输入框_微微链接.text());
    storage.put("输入框_微圈链接", ui.输入框_微圈链接.text());

    视频等待 = storage.get("输入框_视频等待", 30) * 1000;
    关注等待 = storage.get("输入框_关注等待", 30) * 1000;
    wait_one = storage.get("wait_one", 30) * 1000;
    wait_two = storage.get("wait_two", 30) * 1000;
    wait_three = storage.get("wait_three", 30) * 1000;
    点赞数量 = storage.get("输入框_点赞数量", 999);
    关注数量 = storage.get("输入框_关注数量", 999);
    指定昵称 = storage.get("输入框_指定昵称", "文件传输助手");
    微微链接 = storage.get("输入框_微微链接", "http://aa.sph.xfeixfei.com");
    微圈链接 = storage.get("输入框_微圈链接", "https://vquan.gratefullifewcopa.net.cn/");
    ww_dz = storage.get("ww_dz", false);
    ww_gz = storage.get("ww_gz", false);
    ww_bf = storage.get("ww_bf", true);
    ww_sc = storage.get("ww_sc", true);
    ww_pl = storage.get("ww_pl", true);
    ww_zf = storage.get("ww_zf", true);

    ww_rq = storage.get("ww_rq", true);
    ww_pz = storage.get("ww_pz", true);
    ww_sys = storage.get("ww_sys", true);
    ww_tx = storage.get("ww_tx", true);

    vq_dz = storage.get("vq_dz", false);
    vq_gz = storage.get("vq_gz", false);
    vq_bf = storage.get("vq_bf", false);
    vq_sc = storage.get("vq_sc", false);
    vq_pl = storage.get("vq_pl", false);
    vq_zf = storage.get("vq_zf", false);
    vq_yd = storage.get("vq_yd", false);

    vq_ydgz = storage.get("vq_ydgz", false);
    vq_ydzk = storage.get("vq_ydzk", false);
    vq_ydwzz = storage.get("vq_ydwzz", false);
    dhj = storage.get("dhj", false);
    ssjpt = storage.get("ssjpt", true);
    shuaxin = storage.get("shuaxin", true);
}

function ww_get_token() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    var p = null;
    setClip("");
    console.info("开始获取微微token");
    while (1) {
        p = textStartsWith("sph").findOnce();
        if (p) {
            ww_token = p.text()
            console.info("获取微微token成功,验证是否过期");
            if (ww_get_info()) {
                console.info("微微token验证成功");
                return true
            } else {
                刷新token();
            }
        } else {
            进入微微();
        }
        sleep(5000)
    }
}


function ww_get_task() {
    var temp = null;
    var ids = 0;
    ww_task_id = null;
    if (ww_dz && 点赞 < 点赞数量) {
        ids = ids + 1;
    }
    if (ww_gz && 关注 < 关注数量) {
        ids = ids + 2;
    }
    if (ww_bf) {
        ids = ids + 32;
    }
    if (ww_sc) {
        ids = ids + 8;
    }
    if (ww_pl) {
        ids = ids + 4;
    }
    if (ww_zf) {
        ids = ids + 16;
    }
    if (ww_rq) {
        ids = ids + 64;
    }
    if (ww_pz) {
        ids = ids + 128;
    }
    if (ww_sys) {
        ids = ids + 256;
    }
    for (var i = 0; i < 15; i++) {
        var myDate = new Date();
        if (ui.vq_yd.isChecked() && myDate.getHours() + "" + myDate.getMinutes() == "00") {
            vq_yd = true;
            return false
        }
        try {
            temp = http.post(微微api + "sphao/task/pull/one", {
                "access": ids,
                "is_supsw": "true"
            }, {
                headers: {
                    "Token": ww_token
                }
            });
            if (temp && temp.statusCode == 200) {
                temp = temp.body.string();
                // console.log(temp);
                if (/操作成功/.test(temp)) {
                    temp = JSON.parse(temp);
                    ww_task_data = temp["data"];
                    ww_task_id = ww_task_data["id"]
                    return true;
                } else if (/暂无/.test(temp)) {
                    console.verbose("微微视频没订单,稍后重试," + ids);
                } else if (/无符合条件/.test(temp)) {
                    console.warn("无符合条件的订单");
                    return false;
                } else if (/请重新登录/.test(temp)) {
                    刷新token();
                } else {
                    console.warn("微微视频获取任务" + temp);
                }
            } else {
                console.warn("微微视频获取任务失败,网络异常");
            }
        } catch (err) {
            console.error("微微视频获取任务报错,原因:" + err);
        }
        sleep(6000);
    }
    return false;
}



function ww_submit_task() {
    var temp = null;
    if (ww_task_id) {
        for (var i = 0; i < 10; i++) {
            try {
                temp = http.post(微微api + "sphao/task/submit/one", {
                    "id": ww_task_id,
                    "shot_img": ww_img_url
                }, {
                    headers: {
                        "Token": ww_token
                    }
                });
                if (temp && temp.statusCode == 200) {
                    temp = temp.body.string();
                    if (/操作成功/.test(temp)) {
                        return true;
                    } else if (/拒绝操作/.test(temp)) {
                        console.warn("微微视频任务提交拒绝操作");
                        return false;
                    } else if (/请重新登录/.test(temp)) {
                        刷新token();
                    } else {
                        console.warn("微微视频任务提交" + temp);
                    }
                } else {
                    console.warn("微微视频任务提交失败,网络异常");
                }
            } catch (err) {
                console.error("微微视频任务提交报错,原因:" + err);
            }
            sleep(5000);
        }
    } else {
        console.error("微微视频任务id无效,放弃任务")
    }
}



function ww_giveup_task() {
    var temp = null;
    if (ww_task_id) {
        for (var i = 0; i < 10; i++) {
            try {
                temp = http.post(微微api + "sphao/task/giveup", {
                    "id": ww_task_id
                }, {
                    headers: {
                        "Token": ww_token
                    }
                });
                if (temp && temp.statusCode == 200) {
                    temp = temp.body.string();
                    if (/操作成功/.test(temp)) {
                        return true;
                    } else if (/拒绝操作/.test(temp)) {
                        return false;
                    } else if (/请重新登录/.test(temp)) {
                        刷新token();
                    } else {
                        console.warn("微微视频放弃任务" + temp);
                    }
                } else {
                    console.warn("微微视频放弃任务失败,网络异常");
                }
            } catch (err) {
                console.warn("微微视频放弃任务报错,原因:" + err);
            }
            sleep(5000);
        }
    }
}

function ww_shot_img() {
    var temp = null;
    for (var i = 0; i < 10; i++) {
        try {
            temp = http.get(微微api + "sphao/oss/shotimg", {
                headers: {
                    "Token": ww_token
                }
            });
            if (temp && temp.statusCode == 200) {
                temp = temp.body.string();
                if (/操作成功/.test(temp)) {
                    temp = JSON.parse(temp);
                    ww_img_key = temp["data"];
                    return true;
                } else {
                    console.warn("微微获取密钥" + temp);
                }
            } else {
                console.warn("微微获取密钥失败,网络异常");
            }
        } catch (err) {
            console.error("微微获取密钥报错,原因:" + err);
        }
        sleep(5000);
    }
}


function ww_submit_img() {
    var temp = null;
    ww_img_url = "";
    if (ww_shot_img()) {
        for (var i = 0; i < 10; i++) {
            try {
                var 时间戳 = new Date().getTime();
                var key = ww_img_key["dir"] + "/" + ww_id + 时间戳 + random(1000, 9999) + "." + 图片编码
                temp = http.postMultipart(ww_img_key["host"], {
                    key: key,
                    policy: ww_img_key["policy"],
                    OSSAccessKeyId: ww_img_key["accessid"],
                    signature: ww_img_key["signature"],
                    success_action_status: "200",
                    file: open("/sdcard/任务." + 图片编码)
                });
                if (temp && temp.statusCode == 200) {
                    temp = temp.body.string();
                    if (temp == "") {
                        ww_img_url = ww_img_key["host"] + "/" + key;
                        return true;
                    } else {
                        console.warn("微微上传图片" + temp);
                    }
                } else {
                    console.warn("微微上传图片失败,网络异常");
                }
            } catch (err) {
                console.error("微微上传图片报错,原因:" + err);
            }
            sleep(5000);
        }
    }

}

function ww_get_info() {
    var temp = null;
    try {
        temp = http.get(微微api + "sphao/account/info", {
            headers: {
                "Token": ww_token
            }
        });
        if (temp && temp.statusCode == 200) {
            temp = temp.body.string();
            if (/操作成功/.test(temp)) {
                ww_info_data = JSON.parse(temp);
                ww_info_data = ww_info_data["data"];
                ww_id = ww_info_data["sphuid"]
                return true;
            } else if (/请重新登录/.test(temp)) {
                刷新token();
            } else {
                console.warn("微微获取数据" + temp);
            }
        }
    } catch (err) {
        console.error("微微获取数据报错,原因:" + err);
    }

}


function 微微关注() {
    auto.setWindowFilter((info) => { return true })
    var p = null;
    sleep(5000);
    for (var i = 0; i < 10; i++) {
        try {
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.parent().click();
                sleep(2000);
            }
            p = textStartsWith("微信识别二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() - 200);
                sleep(3000);
                press(宽 / 2, 高 / 2, 2000);
            }
            p = textStartsWith("直接识别二维码").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() - 200, 2000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = text("打开视频").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(5000);
            }
            p = text("打开视频-小程序").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(wait_one);
                p = desc("打开").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_two);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
                p = id("weuiAgree").checkable(false).findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(3000);
                }
                p = id("btnNext").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(5000);
                }
                p = text("允许").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_three);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
            }
            p = textStartsWith("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = id("tm").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = id("x1").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = id("cyl").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = textStartsWith("视频号：").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("fwidth").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY(), 2000);
            }
            p = text("取消").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("关注").className("android.widget.TextView").findOnce();
            if (!p) {
                p = id(主页关注ID).findOnce();
                if (!p) {
                    p = id("e5r").findOnce();
                }
            }
            if (p) {
                sleep(关注等待);
                p.click();
                p.parent().click();
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_gz = false;
                    images.save(captureScreen(), "/sdcard/关注.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                p = text("关注").className("android.widget.TextView").findOnce();
                if (!p) {
                    if (截图()) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } catch (err) {
            console.error("视频号关注报错" + err);
            return false;
        }
        sleep(1000)
    }
    return false
}

function 微微点赞() {
    auto.setWindowFilter((info) => { return true })
    try {
        var p = null;
        sleep(5000);
        for (var i = 0; i < 10; i++) {
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.parent().click();
                sleep(2000);
            }
            p = textStartsWith("微信识别二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() - 200);
                sleep(3000);
                press(宽 / 2, 高 / 2, 2000);
            }
            p = textStartsWith("直接识别二维码").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() - 200, 2000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = text("打开视频").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(5000);
            }
            p = text("打开视频-小程序").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(wait_one);
                p = desc("打开").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_two);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
                p = id("weuiAgree").checkable(false).findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(3000);
                }
                p = id("btnNext").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(5000);
                }
                p = text("允许").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_three);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
            }
            p = textStartsWith("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = text("fwidth").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY(), 2000);
            }

            p = text("取消").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("u1").findOnce()
            if (p) {
                for (var i = 0; i < 5; i++) {
                    var t = id("u1").findOnce()
                    if (t) {
                        if (t.bounds().bottom >= 高 - 100) {
                            swipe(宽 / 2, 高 * 0.3, 宽 / 2, 高 * 0.2, 1000);
                            sleep(1000);
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                sleep(视频等待);
                日志.hide()
                sleep(2000);
                p = id("u1").findOnce()
                var img = captureScreen();
                var color = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2);
                日志.show()
                if (colors.red(color) == 255 && colors.green(color) == 255 && colors.blue(color) == 255) {
                    p.click();
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2)
                    var clip = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().bottom - p.bounds().top), (p.bounds().bottom - p.bounds().top));
                    images.save(clip, "/sdcard/1.png");
                    console.warn("颜色不符合,没有点赞")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_dz = false;
                    images.save(captureScreen(), "/sdcard/点赞.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = id("xk").findOnce()
            if (p) {
                for (var i = 0; i < 5; i++) {
                    var t = id("xk").findOnce()
                    if (t) {
                        if (t.bounds().bottom >= 高 - 50) {
                            swipe(宽 / 2, 高 * 0.3, 宽 / 2, 高 * 0.2, 1000);
                            sleep(1000);
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                sleep(视频等待);
                日志.hide()
                sleep(2000);
                p = id("xk").findOnce()
                var img = captureScreen();
                if (p.childCount() > 1) {
                    if (p.child(0).childCount() > 0) {
                        var color = images.pixel(img, p.child(0).child(0).bounds().left + (p.child(0).child(0).bounds().right - p.child(0).child(0).bounds().left) / 2, p.child(0).child(0).bounds().top + (p.child(0).child(0).bounds().right - p.child(0).child(0).bounds().left) / 2);
                        var color2 = images.pixel(img, p.child(0).child(0).bounds().left + (p.child(0).child(0).bounds().bottom - p.child(0).child(0).bounds().top) / 2, p.child(0).child(0).bounds().top + (p.child(0).child(0).bounds().bottom - p.child(0).child(0).bounds().top) / 2);
                    } else {
                        var color = images.pixel(img, p.child(0).bounds().left + (p.child(0).bounds().right - p.child(0).bounds().left) / 2, p.child(0).bounds().top + (p.child(0).bounds().right - p.child(0).bounds().left) / 2);
                        var color2 = images.pixel(img, p.child(0).bounds().left + (p.child(0).bounds().bottom - p.child(0).bounds().top) / 2, p.child(0).bounds().top + (p.child(0).bounds().bottom - p.child(0).bounds().top) / 2);
                    }
                } else {
                    var color = images.pixel(img, p.bounds().left + (p.bounds().right - p.bounds().left) / 2, p.bounds().top + (p.bounds().right - p.bounds().left) / 2);
                    var color2 = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2);
                }
                // var color = images.pixel(img, p.bounds().left + (p.bounds().right - p.bounds().left) / 2, p.bounds().top + (p.bounds().right - p.bounds().left) / 2);
                // var color2 = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2);
                日志.show()
                if (colors.red(color) == 204 && colors.green(color) == 204 && colors.blue(color) == 204) {
                    p.click();
                } else if (colors.red(color) > 200 && colors.green(color) > 200 && colors.blue(color) > 200) {
                    p.click();
                } else if (colors.red(color2) == 255 && colors.green(color2) == 255 && colors.blue(color2) == 255) {
                    p.click();
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p.bounds().left + (p.bounds().right - p.bounds().left) / 2, p.bounds().top + (p.bounds().right - p.bounds().left) / 2)
                    console.log(colors.red(color2), colors.green(color2), colors.blue(color2), p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2)
                    var clip = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().right - p.bounds().left), (p.bounds().right - p.bounds().left));
                    var clip2 = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().bottom - p.bounds().top), (p.bounds().bottom - p.bounds().top));
                    images.save(clip, "/sdcard/1.png");
                    images.save(clip2, "/sdcard/2.png");
                    console.warn("颜色不符合,没有点赞")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_dz = false;
                    images.save(captureScreen(), "/sdcard/点赞.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = id("a2s").findOnce()
            if (p) {
                for (var i = 0; i < 5; i++) {
                    var t = id("a2s").findOnce()
                    if (t) {
                        if (t.bounds().bottom >= 高 - 100) {
                            swipe(宽 / 2, 高 * 0.3, 宽 / 2, 高 * 0.2, 1000);
                            sleep(1000);
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                sleep(视频等待);
                日志.hide()
                sleep(2000);
                p = id("a2s").findOnce()
                var img = captureScreen();
                var color = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + ((p.bounds().bottom - p.bounds().top) / 3));
                日志.show()
                if (colors.red(color) >= 200 && colors.green(color) >= 200 && colors.blue(color) >= 200) {
                    p.click();
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + ((p.bounds().bottom - p.bounds().top) / 3))
                    var clip = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().bottom - p.bounds().top), (p.bounds().bottom - p.bounds().top));
                    images.save(clip, "/sdcard/1.png");
                    console.warn("颜色不符合,没有点赞")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_dz = false;
                    images.save(captureScreen(), "/sdcard/点赞.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("视频号点赞报错" + err);
        return false;
    }
}

function 微微人气() {
    auto.setWindowFilter((info) => { return true })
    try {
        var p = null;
        sleep(5000);
        for (var i = 0; i < 10; i++) {
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.parent().click();
                sleep(2000);
            }
            p = textStartsWith("微信识别二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() - 200);
                sleep(3000);
                press(宽 / 2, 高 / 2, 2000);
            }
            p = textStartsWith("直接识别二维码").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() - 200, 2000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = text("打开视频").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(5000);
            }
            p = text("打开视频-小程序").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(wait_one);
                p = desc("打开").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_two);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
                p = id("weuiAgree").checkable(false).findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(3000);
                }
                p = id("btnNext").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(5000);
                }
                p = text("允许").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_three);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
            }
            p = textStartsWith("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = text("fwidth").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY(), 2000);
            }
            p = text("取消").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = id("cyl").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }

            p = id("tm").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = id("x1").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = textContains("进入直播间").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = text("直播中").findOnce()
            if (p) {
                var p_bounds = p.bounds();
                click((p_bounds.centerX() + random(-50, 50)), (p_bounds.centerY() + random(-5, 5)));
                sleep(6000);
            }
            p = text("直播中").findOnce()
            if (p) {
                var p_bounds = p.bounds();
                click((p_bounds.centerX() + random(-50, 50)), (p_bounds.centerY() + random(-5, 5)));
                sleep(6000);
            }
            p = textContains("进入直播间").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = textContains("我知道了").findOnce();
            if (p) {
                sleep(1000);
                var p_bounds = p.bounds();
                click((p_bounds.centerX() + random(-50, 50)), (p_bounds.centerY() + random(-5, 5)));
                sleep(2000);
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            }
            p = textContains("人看过").findOnce()
            p2 = text("直播中").findOnce()
            if (p && !p2) {
                sleep(10000)
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("视频号点赞报错" + err);
        return false;
    }
}

function 微微转发() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    转发check = false
    try {
        var p = null;
        sleep(5000);
        for (var i = 0; i < 10; i++) {
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.parent().click();
                sleep(2000);
            }
            p = textStartsWith("微信识别二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() - 200);
                sleep(3000);
                press(宽 / 2, 高 / 2, 2000);
            }
            p = textStartsWith("直接识别二维码").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() - 200, 2000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = text("打开视频").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(5000);
            }
            p = text("打开视频-小程序").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(wait_one);
                p = desc("打开").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_two);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
                p = id("weuiAgree").checkable(false).findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(3000);
                }
                p = id("btnNext").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(5000);
                }
                p = text("允许").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_three);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
            }
            p = textStartsWith("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }

            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = text("fwidth").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY(), 2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("取消").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = text("转发").findOnce()
            if (p) {
                sleep(视频等待);
                p.parent().click()
                sleep(2000);
            }
            p = id(转发ID).findOnce()
            if (p) {
                sleep(视频等待);
                p.click()
                sleep(2000);
            }
            p = id("jid").findOnce()
            if (p) {
                sleep(视频等待);
                p.click()
                sleep(2000);
            }
            p = text("分享到朋友圈").findOnce()
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("发表").findOnce()
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                for (var i = 0; i < 10; i++) {
                    if (转发check) {
                        if (截图()) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    sleep(500)
                }
                return false
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("视频号转发报错" + err);
        return false;
    }
}

function 微微收藏() {
    auto.setWindowFilter((info) => { return true })
    try {
        var p = null;
        sleep(5000);
        for (var i = 0; i < 10; i++) {
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.parent().click();
                sleep(2000);
            }
            p = textStartsWith("微信识别二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() - 200);
                sleep(3000);
                press(宽 / 2, 高 / 2, 2000);
            }
            p = textStartsWith("直接识别二维码").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() - 200, 2000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = text("打开视频").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(5000);
            }
            p = text("打开视频-小程序").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(wait_one);
                p = desc("打开").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_two);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
                p = id("weuiAgree").checkable(false).findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(3000);
                }
                p = id("btnNext").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(5000);
                }
                p = text("允许").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_three);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
            }
            p = textStartsWith("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = text("fwidth").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY(), 2000);
            }
            p = text("取消").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p_sc = id(收藏ID).findOnce()
            if (p_sc) {
                日志.hide()
                sleep(2000);
                var img = captureScreen();
                var p_bounds = p_sc.bounds();
                var color = images.pixel(img, p_bounds.left + (p_bounds.bottom - p_bounds.top) / 2, p_bounds.top + (p_bounds.bottom - p_bounds.top) / 3);
                日志.show()
                if (colors.red(color) >= 200 && colors.green(color) >= 200 && colors.blue(color) >= 200) {
                    sleep(视频等待);
                    click((p_bounds.centerX() + random(-5, 5)), (p_bounds.centerY() + random(-5, 5)));
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p_bounds.left + 28, p_bounds.top + 28)
                    var clip = images.clip(img, p_bounds.left, p_bounds.top, (p_bounds.bottom - p_bounds.top), (p_bounds.bottom - p_bounds.top));
                    images.save(clip, "/sdcard/1.png");
                    console.warn("颜色不符合,没有收藏")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_sc = false;
                    images.save(captureScreen(), "/sdcard/收藏.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                日志.hide()
                var img = captureScreen();
                var color = images.pixel(img, p_bounds.left + (p_bounds.bottom - p_bounds.top) / 2, p_bounds.top + (p_bounds.bottom - p_bounds.top) / 3);
                if (colors.red(color) >= 200 && colors.green(color) >= 200 && colors.blue(color) >= 200) {
                    p_sc.click();
                }
                sleep(2000);
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p_sc = id("k0h").findOnce()
            if (p_sc) {
                日志.hide()
                sleep(2000);
                var img = captureScreen();
                var p_bounds = p_sc.bounds();
                var color = images.pixel(img, p_bounds.left + (p_bounds.bottom - p_bounds.top) / 2, p_bounds.top + (p_bounds.bottom - p_bounds.top) / 3);
                日志.show()
                if (colors.red(color) >= 200 && colors.green(color) >= 200 && colors.blue(color) >= 200) {
                    sleep(视频等待);
                    click((p_bounds.centerX() + random(-5, 5)), (p_bounds.centerY() + random(-5, 5)));
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p_bounds.left + 28, p_bounds.top + 28)
                    var clip = images.clip(img, p_bounds.left, p_bounds.top, (p_bounds.bottom - p_bounds.top), (p_bounds.bottom - p_bounds.top));
                    images.save(clip, "/sdcard/1.png");
                    console.warn("颜色不符合,没有收藏")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_sc = false;
                    images.save(captureScreen(), "/sdcard/收藏.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                日志.hide()
                var img = captureScreen();
                var color = images.pixel(img, p_bounds.left + (p_bounds.bottom - p_bounds.top) / 2, p_bounds.top + (p_bounds.bottom - p_bounds.top) / 3);
                if (colors.red(color) >= 200 && colors.green(color) >= 200 && colors.blue(color) >= 200) {
                    p_sc.click();
                }
                sleep(2000);
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = id(转发ID).findOnce()
            if (p) {
                sleep(视频等待);
                p.click()
                sleep(2000);
            }
            p = id("jid").findOnce()
            if (p) {
                sleep(视频等待);
                p.click()
                sleep(2000);
            }
            p = text("收藏").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
                sc = true;
            }
            p = text("取消收藏").findOnce();
            var p2 = id(转发ID).findOnce();
            if (!p && p2) {
                p2.click()
                sleep(2000);
                p = text("取消收藏").findOnce();
            }
            if (p) {
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("视频号收藏报错" + err);
        return false;
    }
}

function 微微播放(sj) {
    auto.setWindowFilter((info) => { return true })
    try {
        var p = null;
        sleep(5000);
        for (var i = 0; i < 10; i++) {
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.parent().click();
                sleep(2000);
            }
            p = textStartsWith("微信识别二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() - 200);
                sleep(3000);
                press(宽 / 2, 高 / 2, 2000);
            }
            p = textStartsWith("直接识别二维码").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() - 200, 2000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = text("打开视频").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(5000);
            }
            p = text("打开视频-小程序").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(wait_one);
                p = desc("打开").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_two);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
                p = id("weuiAgree").checkable(false).findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(3000);
                }
                p = id("btnNext").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(5000);
                }
                p = text("允许").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_three);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
            }
            p = textStartsWith("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = text("fwidth").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY(), 2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("取消").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(2000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("u1").findOnce()
            if (p) {
                if (sj && sj > 0) {
                    sleep(sj * 1000);
                } else {
                    sleep(视频等待);
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = id("xk").findOnce()
            if (p) {
                if (sj && sj > 0) {
                    sleep(sj * 1000);
                } else {
                    sleep(视频等待);
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = id("a2s").findOnce()
            if (p) {
                if (sj && sj > 0) {
                    sleep(sj * 1000);
                } else {
                    sleep(视频等待);
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        console.error("视频号播放报错" + err);
        return false;
    }
}

function 微微评论() {
    auto.setWindowFilter((info) => { return true })
    try {
        var p = null;
        sleep(5000);
        for (var i = 0; i < 10; i++) {
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.parent().click();
                sleep(2000);
            }
            p = textStartsWith("微信识别二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() - 200);
                sleep(3000);
                press(宽 / 2, 高 / 2, 2000);
            }
            p = textStartsWith("直接识别二维码").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() - 200, 2000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = text("打开视频").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(5000);
            }
            p = text("打开视频-小程序").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(wait_one);
                p = desc("打开").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_two);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
                p = id("weuiAgree").checkable(false).findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(3000);
                }
                p = id("btnNext").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(5000);
                }
                p = text("允许").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_three);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
            }
            p = textStartsWith("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = text("fwidth").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY(), 2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("取消").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("axg").findOnce()
            if (p) {
                sleep(视频等待);
                p.click();
                sleep(2000);
            }
            p = id("b8z").findOnce()
            if (p) {
                sleep(视频等待);
                p.click();
                sleep(2000);
            }
            p = id("ax8").findOnce()
            if (p) {
                var hs_str = 话术arr[random(0, 话术arr.length - 1)];
                sleep(2000);
                p.setText(hs_str);
                sleep(2000);
                p = id("ax8").findOnce()
                if (p && p.text() == hs_str) {
                    click(宽 - 80, p.bounds().centerY());
                    sleep(2000);
                    if (id("ax8").textEndsWith("发表评论").findOnce()) {
                        if (截图()) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
            p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
            if (p) {
                ww_pl = false;
                return false;
            }
            p = text("我知道了").className("android.widget.Button").findOnce();
            if (p) {
                p.click()
                return false
            }
            p = id("b8q").findOnce()
            if (p) {
                var hs_str = 话术arr[random(0, 话术arr.length - 1)];
                sleep(2000);
                p.setText(hs_str);
                sleep(2000);
                p = id("b8q").findOnce()
                if (p && p.text() == hs_str) {
                    click(宽 - 80, p.bounds().centerY());
                    sleep(2000);
                    if (id("b8q").textEndsWith("发表评论").findOnce()) {
                        if (截图()) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
            p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
            if (p) {
                ww_pl = false;
                images.save(captureScreen(), "/sdcard/评论.jpg", "jpg", 20);
                return false;
            }
            p = text("我知道了").className("android.widget.Button").findOnce();
            if (p) {
                p.click()
                return false
            }
        }
        return false;
    } catch (err) {
        console.error("视频号评论报错" + err);
        return false;
    }
}

function 微微评赞() {
    auto.setWindowFilter((info) => { return true })
    var js = 0;
    try {
        var p = null;
        sleep(5000);
        for (var i = 0; i < 10; i++) {
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.parent().click();
                sleep(2000);
            }
            p = textStartsWith("微信识别二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() - 200);
                sleep(3000);
                press(宽 / 2, 高 / 2, 2000);
            }
            p = textStartsWith("直接识别二维码").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() - 200, 2000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = text("打开视频").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(5000);
            }
            p = text("打开视频-小程序").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(wait_one);
                p = desc("打开").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_two);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
                p = id("weuiAgree").checkable(false).findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(3000);
                }
                p = id("btnNext").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(5000);
                }
                p = text("允许").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_three);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
            }
            p = textStartsWith("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = text("fwidth").findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY(), 2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("取消").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(4000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("axg").findOnce()
            if (p) {
                sleep(视频等待);
                p.click();
                sleep(2000);
            }
            p = id("b8z").findOnce()
            if (p) {
                sleep(视频等待);
                p.click();
                sleep(2000);
            }
            p = id("xm").boundsInside(1, 高 * 0.1, 宽, 高 - 100).find()
            if (p.length > 1) {
                var img = captureScreen();
                for (var j = 0; j < p.length; j++) {
                    var color = images.pixel(img, p[j].bounds().centerX(), p[j].bounds().centerY());
                    if (colors.red(color) == 255 && colors.green(color) == 255 && colors.blue(color) == 255) {
                        js++
                        p[j].click()
                        sleep(500)
                    }
                }
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_pl = false;
                    images.save(captureScreen(), "/sdcard/评论.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                if (js >= 2) {
                    if (截图()) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }

            }

        }
        return false;
    } catch (err) {
        console.error("视频号评论报错" + err);
        return false;
    }
}

function 返回() {
    auto.setWindowFilter((info) => { return true });
    var p = null;
    console.info("开始返回接单界面")
    for (var i = 0; i < 20; i++) {
        if (text("开启活动订单").findOnce()) {
            console.info("返回接单界面成功")
            if (shuaxin) {
                p = className("android.widget.ImageView").boundsInside(宽 * 0.7, 30, 宽, 500).packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(2000);
                }
                p = text("刷新").findOnce()
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            return true
        } else if (text("首页").findOnce()) {
            console.info("返回接单界面成功")
            return true
        } else {
            if (text("视频号").findOnce()) {
                back();
                sleep(10000);
            } else if (text("网络已断开").findOnce()) {
                p = text("网络已断开").findOnce()
                if (p) {
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            } else {
                back();
                sleep(3000);
            }
        }
        sleep(1000)
    }
    按名称关闭应用("com.tencent.mm");
    进入微微();
}

function 返回二() {
    auto.setWindowFilter((info) => { return true })
    var p = null;
    console.info("开始返回文件传输界面")
    for (var i = 0; i < 20; i++) {
        if (text("文件传输助手").findOnce()) {
            console.info("返回文件传输界面成功")
            return true
        } else {
            back();
            sleep(3000);
        }
        sleep(1000)
    }
}

function 返回三() {
    auto.setWindowFilter((info) => { return true })
    var p = null;
    console.info("开始微信界面")
    if (currentPackage() != "com.tencent.mm") {
        按名称关闭应用("com.tencent.mm");
        sleep(2000);
        home();
        sleep(1000);
        return;
    }
    for (var i = 0; i < 20; i++) {
        if (text("通讯录").findOnce()) {
            console.info("返回微信界面成功")
            return true
        } else {
            back();
            sleep(3000);
        }
        sleep(1000)
    }
}


function 截图() {
    日志.hide()
    ui.run(function () { windows.jbkz.visibility = 8 });
    sleep(500)
    try {
        images.save(captureScreen(), "/sdcard/任务.jpg", "jpg", 20);
        日志.show()
        ui.run(function () { windows.jbkz.visibility = 0 });
        return true;
    } catch (err) {
        日志.show()
        ui.run(function () { windows.jbkz.visibility = 0 });
        console.error("截图报错,原因:" + err);
        return false;
    }
}

function ui_log() {
    ui.run(function () {
        window.wz.setText("威信名称:" + ww_info_data["wxnickname"] + "\n" + "关:" + 关注 + " 赞:" + 点赞 + " 播:" + 播放 + " 藏:" + 收藏 + " 评:" + 评论 + " 转:" + 转发 + " 人:" + 人气 + " 评赞:" + 评赞 + " 搜:" + 搜一搜 + "\n" + "金豆总额:" + ww_info_data["wallet"] + "\n版本号:" + versionNum);
    });
    time = new Date();
    time.setTime(time.getTime());
    var jt_temp = time.getDate();
    if (jt_temp == jt) {
        files.write("/sdcard/jl.txt", JSON.stringify({ "jlt": jt, "dz": 点赞, "gz": 关注, "sc": 收藏, "bf": 播放, "pl": 评论, "zf": 转发, "rq": 人气, "sys": 搜一搜, "pz": 评赞, "yd": 阅读, "gzhgz": 公众号关注, "zk": 在看, "wzz": 文章赞 }));
    } else {
        jt = jt_temp;
        点赞 = 0;
        关注 = 0;
        收藏 = 0;
        播放 = 0;
        评论 = 0;
        转发 = 0;
        人气 = 0;
        搜一搜 = 0;
        评赞 = 0;
        阅读 = 0;
        提现 = true;
        在看 = 0;
        公众号关注 = 0;
        文章赞 = 0;
        在看无效 = 0;
        files.write("/sdcard/jl.txt", JSON.stringify({ "jlt": jt, "dz": 点赞, "gz": 关注, "sc": 收藏, "bf": 播放, "pl": 评论, "zf": 转发, "rq": 人气, "sys": 搜一搜, "pz": 评赞, "yd": 阅读, "gzhgz": 公众号关注, "zk": 在看, "wzz": 文章赞 }));
        日志.clearLog();
    }

}

function 统计复位() {
    var temp = null;
    try {
        if (files.isFile("/sdcard/jl.txt")) {
            temp = files.read("/sdcard/jl.txt");
            var jl = JSON.parse(temp);
            var jlt = jl["jlt"];
            if (jlt == jt) {
                点赞 = jl["dz"] || 0;
                关注 = jl["gz"] || 0;
                收藏 = jl["sc"] || 0;
                播放 = jl["bf"] || 0;
                评论 = jl["pl"] || 0;
                转发 = jl["zf"] || 0;
                人气 = jl["rq"] || 0;
                搜一搜 = jl["sys"] || 0;
                评赞 = jl["pz"] || 0;
                阅读 = jl["yd"] || 0;
                在看 = jl["zk"] || 0;
                公众号关注 = jl["gzhgz"] || 0;
                文章赞 = jl["wzz"] || 0;
            } else {
                提现 = true;
                console.info("记录天不同,数据归零");
                点赞 = 0;
                关注 = 0;
                收藏 = 0;
                播放 = 0;
                评论 = 0;
                转发 = 0;
                人气 = 0;
                搜一搜 = 0;
                阅读 = 0;
                在看 = 0;
                公众号关注 = 0;
                文章赞 = 0;
                files.write("/sdcard/jl.txt", JSON.stringify({ "jlt": jt, "dz": 点赞, "gz": 关注, "sc": 收藏, "bf": 播放, "pl": 评论, "zf": 转发, "rq": 人气, "sys": 搜一搜, "pz": 评赞, "yd": 阅读, "gzhgz": 公众号关注, "zk": 在看, "wzz": 文章赞 }));
            }

        } else {
            提现 = true;
            console.info("未找到指定文件,数据归零");
            点赞 = 0;
            关注 = 0;
            收藏 = 0;
            播放 = 0;
            评论 = 0;
            转发 = 0;
            人气 = 0;
            搜一搜 = 0;
            阅读 = 0;
            在看 = 0;
            公众号关注 = 0;
            文章赞 = 0;
            files.write("/sdcard/jl.txt", JSON.stringify({ "jlt": jt, "dz": 点赞, "gz": 关注, "sc": 收藏, "bf": 播放, "pl": 评论, "zf": 转发, "rq": 人气, "sys": 搜一搜, "pz": 评赞, "yd": 阅读, "gzhgz": 公众号关注, "zk": 在看, "wzz": 文章赞 }));
        }
    } catch (err) {
        console.info("统计复位报错,数据归零");
        点赞 = 0;
        关注 = 0;
        收藏 = 0;
        播放 = 0;
        评论 = 0;
        转发 = 0;
        人气 = 0;
        搜一搜 = 0;
        阅读 = 0;
        files.write("/sdcard/jl.txt", JSON.stringify({ "jlt": jt, "dz": 点赞, "gz": 关注, "sc": 收藏, "bf": 播放, "pl": 评论, "zf": 转发, "rq": 人气, "sys": 搜一搜, "pz": 评赞, "yd": 阅读, "gzhgz": 公众号关注, "zk": 在看, "wzz": 文章赞 }));
    }

}

function 悬浮窗() {
    windows = floaty.window(
        '<button style="Widget.AppCompat.Button.Colored" id="jbkz" text="关闭脚本" h="50" bg="#ff0000" />'
    );
    windows.exitOnClose();
    windows.setPosition(0, 高 * 0.05);
    windows.jbkz.click(() => {
        exit();

    });
}

function 微微视频() {
    auto.setWindowFilter((info) => { return true })
    var 任务结果;
    while (1) {
        var myDate = new Date();
        if (ui.vq_yd.isChecked() && myDate.getHours() + "" + myDate.getMinutes() == "00") {
            console.info("手机到达凌晨12点,开始阅读任务")
            vq_yd = true;
            return true
        }
        if (提现 && ww_tx) {
            微微提现();
        }
        if (text("开启活动订单").findOnce()) {
            if (ww_get_info()) {
                ui_log()
            }
            if (点赞 >= 点赞数量 && ww_dz) {
                ww_dz = false;
                vq_dz = false;
            }
            if (关注 >= 关注数量 && ww_gz) {
                ww_gz = false;
                vq_gz = false;
            }
            if (!ww_dz && !ww_gz && !ww_bf && !ww_pl && !ww_pz && !ww_zf && !ww_rq && !ww_sys && !ww_sc) {
                return false;
            }
            if (ww_get_task()) {
                var ww_type = ww_task_data["type"];
                if ((!ww_dz && ww_type == 1) || (!ww_gz && ww_type == 2)) {
                    ww_giveup_task();
                    return false;
                }
                if (ww_type == 1) {
                    console.info("开始进行视频号点赞")
                    if (ww_task_data["article_url"] || ww_task_data["qrcode"] || ww_task_data["schemeurl"]) {
                        任务结果 = 微微点赞()
                    } else if (ww_task_data["input_vtitle"]) {
                        任务结果 = 微微点赞二(ww_task_data["input_vtitle"])
                        返回二()
                        进入微微()
                    } else if (ww_task_data["input_vuser"]) {
                        任务结果 = 微微点赞三(ww_task_data["input_vuser"])
                        返回二()
                        进入微微()
                    }
                } else if (ww_type == 2) {
                    console.info("开始进行视频号关注")
                    if (ww_task_data["article_url"] || ww_task_data["qrcode"] || ww_task_data["schemeurl"]) {
                        任务结果 = 微微关注()
                    } else {
                        任务结果 = 微微关注二(ww_task_data["input_vuser"])
                        返回二()
                        进入微微()
                    }
                } else if (ww_type == 32) {
                    console.info("开始进行视频号播放," + ww_task_data["duration"] + "秒")
                    任务结果 = 微微播放(ww_task_data["duration"])
                } else if (ww_type == 8) {
                    console.info("开始进行视频号收藏")
                    任务结果 = 微微收藏()
                } else if (ww_type == 4) {
                    console.info("开始进行视频号评论")
                    任务结果 = 微微评论()
                } else if (ww_type == 16) {
                    console.info("开始进行视频号转发")
                    任务结果 = 微微转发()
                } else if (ww_type == 64) {
                    console.info("开始进行视频号人气")
                    任务结果 = 微微人气()
                } else if (ww_type == 256) {
                    console.info("开始进行视频号搜一搜")
                    任务结果 = 微微搜一搜(ww_task_data["input_vuser"])
                    返回三()
                    进入微微()
                } else if (ww_type == 128) {
                    console.info("开始进行视频号评赞")
                    任务结果 = 微微评赞()
                }
                if (!任务结果) {
                    微微连续失败次数++;
                    console.error(ww_type == 1 && "点赞任务失败" || ww_type == 2 && "关注任务失败" || ww_type == 32 && "播放任务失败" || ww_type == 8 && "收藏任务失败" || ww_type == 4 && "评论任务失败" || ww_type == 16 && "转发任务失败" || ww_type == 64 && "人气任务失败" || ww_type == 256 && "搜一搜任务失败" || ww_type == 128 && "评赞任务失败")
                }
                返回();
                if (任务结果) {
                    微微连续失败次数=0;
                    if (ww_submit_img()) {
                        if (ww_submit_task()) {
                            console.info(ww_type == 1 && "点赞任务提交成功" || ww_type == 2 && "关注任务提交成功" || ww_type == 32 && "播放任务提交成功" || ww_type == 8 && "收藏任务提交成功" || ww_type == 4 && "评论任务提交成功" || ww_type == 16 && "转发任务提交成功" || ww_type == 64 && "人气任务提交成功" || ww_type == 256 && "搜一搜任务提交成功" || ww_type == 128 && "评赞任务提交成功")
                            if (ww_type == 1) {
                                点赞++;
                            } else if (ww_type == 2) {
                                关注++;
                            } else if (ww_type == 32) {
                                播放++;
                            } else if (ww_type == 8) {
                                收藏++;
                            } else if (ww_type == 4) {
                                评论++;
                            } else if (ww_type == 16) {
                                转发++;
                            } else if (ww_type == 64) {
                                人气++;
                            } else if (ww_type == 256) {
                                搜一搜++;
                            } else if (ww_type == 128) {
                                评赞++;
                            }
                        }
                    } else {
                        console.error("图片上传失败")
                    }
                } else {
                    ww_giveup_task()
                    if(微微连续失败次数>5){
                        按名称关闭应用("com.tencent.mm");
                    }
                }
            } else {
                if (vq_dz || vq_gz || vq_bf || vq_pl || vq_zf || vq_sc || vq_yd || vq_ydgz || vq_ydzk || vq_ydwzz) {
                    return false
                }
            }
        } else {
            返回三();
            进入微微();
        }
        if (gzh) {
            sleep(5000);
            gzh = false;
        } else {
            sleep(1000);
        }
    }
}

function 微圈视频() {
    auto.setWindowFilter((info) => { return true })
    var 任务结果;
    while (1) {
        var myDate = new Date();
        if (ui.vq_yd.isChecked() && myDate.getHours() + "" + myDate.getMinutes() == "00") {
            console.info("手机到达凌晨12点,开始阅读任务")
            vq_yd = true;
            return true
        }
        if (text("开启活动订单").findOnce()) {
            if (vq_get_info()) {
                vqui_log()
            }
            if (点赞 >= 点赞数量 && ww_dz) {
                ww_dz = false;
                vq_dz = false;
            }
            if (关注 >= 关注数量 && ww_gz) {
                ww_gz = false;
                vq_gz = false;
            }
            if (!vq_dz && !vq_gz && !vq_bf && !vq_pl && !vq_zf && !vq_sc && !vq_ydzk && !vq_ydgz && !vq_ydwzz) {
                return false;
            }

            if (vq_get_task()) {
                var vq_type = vq_task_data["votetypeToText"]
                if ((!vq_dz && vq_type == "视频号点赞") || (!vq_gz && vq_type == "视频号关注")) {
                    vq_giveup_task();
                    return false;
                }
                if (vq_type == "视频号点赞") {
                    console.info("开始进行视频号点赞")
                    任务结果 = 微圈点赞()
                } else if (vq_type == "视频号关注") {
                    console.info("开始进行视频号关注")
                    任务结果 = 微圈关注()
                } else if (vq_type == "视频号播放") {
                    console.info("开始进行视频号播放")
                    任务结果 = 微圈播放()
                } else if (vq_type == "视频号收藏") {
                    console.info("开始进行视频号收藏")
                    任务结果 = 微圈收藏()
                } else if (vq_type == "视频号评论") {
                    console.info("开始进行视频号评论")
                    任务结果 = 微圈评论()
                } else if (vq_type == "视频号转发") {
                    console.info("开始进行视频号转发")
                    任务结果 = 微圈转发()
                } else if (vq_type == "在看") {
                    console.info("开始进行阅读在看")
                    任务结果 = 阅读在看()
                } else if (vq_type == "关注") {
                    console.info("开始进行阅读关注")
                    任务结果 = 阅读关注()
                } else if (vq_type == "文章赞") {
                    console.info("开始进行阅读文章赞")
                    任务结果 = 阅读文章赞()
                }
                if (!任务结果) {
                    微圈连续失败次数++;
                    console.error(vq_type == "视频号点赞" && "点赞任务失败" || vq_type == "视频号关注" && "关注任务失败" || vq_type == "视频号播放" && "播放任务失败" || vq_type == "视频号收藏" && "收藏任务失败" || vq_type == "视频号评论" && "评论任务失败" || vq_type == "视频号转发" && "转发任务失败" || vq_type == "在看" && "在看任务失败" || vq_type == "关注" && "阅读关注任务失败" || vq_type == "文章赞" && "文章赞任务失败")
                }
                返回();
                if (任务结果) {
                    微圈连续失败次数=0;
                    if (vq_submit_img()) {
                        if (vq_submit_task()) {
                            console.info(vq_type == "视频号点赞" && "点赞任务提交成功" || vq_type == "视频号关注" && "关注任务提交成功" || vq_type == "视频号播放" && "播放任务提交成功" || vq_type == "视频号收藏" && "收藏任务提交成功" || vq_type == "视频号评论" && "评论任务提交成功" || vq_type == "视频号转发" && "转发任务提交成功" || vq_type == "在看" && "在看任务提交成功" || vq_type == "关注" && "阅读关注任务提交成功" || vq_type == "文章赞" && "文章赞任务提交成功")
                            if (vq_type == "视频号点赞") {
                                点赞++;
                            } else if (vq_type == "视频号关注") {
                                关注++;
                            } else if (vq_type == "视频号播放") {
                                播放++;
                            } else if (vq_type == "视频号收藏") {
                                收藏++;
                            } else if (vq_type == "视频号评论") {
                                评论++;
                            } else if (vq_type == "视频号转发") {
                                转发++;
                            } else if (vq_type == "在看") {
                                在看++;
                            } else if (vq_type == "关注") {
                                公众号关注++;
                            } else if (vq_type == "文章赞") {
                                文章赞++;
                            }
                            if (vq_type == "在看") {
                                在看无效 = 0;
                            }
                        } else {
                            vq_giveup_task()
                            if (vq_type == "在看") {
                                在看无效++
                            }
                        }
                        if (在看无效 >= 5) {
                            console.warn("在看无效超过5次,今天不做在看任务")
                            vq_ydzk = false;
                        }
                    } else {
                        console.error("图片上传失败")
                    }
                } else {
                    vq_giveup_task()
                    if(微圈连续失败次数>5){
                        按名称关闭应用("com.tencent.mm");
                    }
                }
            } else {
                if (ww_dz || ww_gz || ww_bf || ww_pl || ww_pz || ww_zf || ww_rq || ww_sys || ww_sc || vq_yd) {
                    return false
                }
            }

        } else {
            进入微圈();
        }
    }
}
function 微微提现() {
    var temp = null;
    try {
        var temp = http.get(微微api + "sphao/wallet/info", {
            headers: {
                "Token": ww_token
            }
        });
        if (temp && temp.statusCode == 200) {
            temp = temp.body.string();
            if (/操作成功/.test(temp)) {
                temp = JSON.parse(temp);
                temp = temp["data"]
                if (temp["wallet"] - temp["wallet_freeze"] > 3000) {
                    var 金豆 = temp["wallet"] - temp["wallet_freeze"]
                    金豆 = 金豆.toString().substring(0, 金豆.toString().length - 3);
                    var 金豆 = 金豆 + "000"
                    temp = http.post(微微api + "sphao/wallet/tocash/do", {
                        "coin": 金豆
                    }, {
                        headers: {
                            "Token": ww_token
                        }
                    });
                    if (temp && temp.statusCode == 200) {
                        temp = temp.body.string();
                        if (/操作成功/.test(temp)) {
                            console.info("微微视频申请提现成功")
                            return true;
                        } else {
                            console.warn("微微视频提现," + temp);
                        }
                    } else {
                        console.warn("微微视频提现失败,网络异常");
                    }
                    提现 = false
                }
            }
        }
    } catch (err) {
        console.error(err)
    }

}

function 刷新token() {
    auto.setWindowFilter((info) => { return true })
    var p = null
    console.info("微微token过期,开始刷新")
    返回();
    while (1) {
        p = className("android.widget.ImageView").boundsInside(宽 * 0.7, 30, 宽, 500).packageName("com.tencent.mm").findOnce()
        if (p) {
            sleep(1000);
            clickx(p.bounds().centerX(), p.bounds().centerY());
            sleep(2000);
        }
        p = text("刷新").findOnce()
        if (p) {
            sleep(1000);
            clickx(p.bounds().centerX(), p.bounds().centerY());
            sleep(5000);
        }
        p = textStartsWith("sph").findOnce();
        if (p) {
            ww_token = p.text()
            if (ww_get_info()) {
                return true
            }
        } else {
            进入微微();
        }
        sleep(5000)
    }
}


function decode(content, password) {
    var key = javax.crypto.spec.SecretKeySpec(md5(password), "AES");
    var cipher = javax.crypto.Cipher.getInstance("AES/CBC/PKCS5Padding");
    var byteContent = android.util.Base64.decode(content, 0);
    cipher.init(javax.crypto.Cipher.DECRYPT_MODE, key, javax.crypto.spec.IvParameterSpec(md5(password.length)));
    var result = java.lang.String(cipher.doFinal(byteContent));
    return result.substring(4, result.length());
}
function md5(str) {
    var md5 = java.security.MessageDigest.getInstance("MD5");
    md5.update(java.lang.String(str).getBytes());
    return md5.digest();
}
function randomx(n) {
    var str = "";
    for (var i = 0; i < n; i++) {
        str += String.fromCharCode(random(0, 65535));
    }
    return str;
}

function 检测更新() {
    var temp = null;
    temp = http.get("http://43.132.202.156/weiwei/gg.txt");
    if (temp && temp.statusCode == 200) {
        temp = temp.body.json();
        主页关注ID = temp["index_guanzhu_id"];
        视频关注ID = temp["video_guanzhu_id"];
        收藏ID = temp["shoucang_id"];
        转发ID = temp["zhuanfa_id"];
        if (temp['vq_domain']) {
            var tmp_vq_url = storage.get("输入框_微圈链接", "");
            if (tmp_vq_url == 'https://vquan.gratefullifewcopa.net.cn/' && temp['vq_domain'] != 'https://vquan.gratefullifewcopa.net.cn/') {
                微圈链接 = temp['vq_domain']
                ui.输入框_微圈链接.setText(微圈链接);
            }
        }
        if (temp['vq_api']) {
            微圈api = temp['vq_api']
        }
        if (temp['vv_domain']) {
            var tmp_vv_url = storage.get("输入框_微微链接", "");
            if (tmp_vv_url == 'http://aa.sph.xfeixfei.com' && temp['vv_domain'] != 'http://aa.sph.xfeixfei.com') {
                微微链接 = temp['vv_domain']
                ui.输入框_微微链接.setText(微微链接);
            }
        }
        if (temp['vv_api']) {
            微微api = temp['vv_api']
        }
        toastLog("加载完成");
        //禁用自动更新
        /*if (temp["ver"] != 版本号) {
            data.ver = temp["ver"]
            data.apk_url = temp["apk_url"]
            data.apk_path = temp["apk_path"]
            data.apk_name = temp["apk_name"]
            data.title = temp["title"]
            data.subTitle = temp["subTitle"]
            data.text = temp["text"]
            data.butClose = temp["butClose"]
            data._app = temp["_app"]
            age.put("data", data);
            setClip(temp["apk_url"])
            engines.execScriptFile("./res/js/window_download.js");
        } else {
            toastLog("无需更新");
        }*/
    } else {
        toastLog("检测更新失败");
    }
}

function 微微点赞二(str) {
    var 发送 = false;
    var p = null;
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    try {
        str = str.replace(/[\.\。 \，\,\#\s\@]+/g, "");
        storage.put("str", str);
        sleep(5000);
        for (var i = 0; i < 10; i++) {
            if (text("开启活动订单").findOnce()) {
                sleep(1000)
                back()
                sleep(2000)
            }
            p = className("android.widget.EditText").boundsInside(0, device.height * 0.7, device.width, device.height).packageName("com.tencent.mm").findOnce();
            if (p) {
                sleep(1000)
                p.setText("#" + str)
                sleep(2000)
            }
            p = text("发送").className("android.widget.Button").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
                发送 = true
            }
            if (发送) {
                p = descEndsWith("头像").className("android.widget.ImageView").packageName("com.tencent.mm").find()
                if (p.length > 0) {
                    sleep(1000)
                    click(p[p.length - 1].bounds().centerX() - 300, p[p.length - 1].bounds().centerY());
                    sleep(2000)
                }
            }
            p = textContains("视频号动态").className("android.view.View").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().left + 200, p.bounds().centerY() + 200);
                sleep(2000);
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("u1").findOnce()
            if (p) {
                for (var i = 0; i < 5; i++) {
                    var t = id("u1").findOnce()
                    if (t) {
                        if (t.bounds().bottom >= 高 - 100) {
                            swipe(宽 / 2, 高 * 0.3, 宽 / 2, 高 * 0.2, 1000);
                            sleep(1000);
                        } else {
                            p = t;
                            break;
                        }
                    } else {
                        break;
                    }
                }
                日志.hide()
                sleep(2000);
                p = id("u1").findOnce()
                var img = captureScreen();
                var color = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2);
                日志.show()
                if (colors.red(color) == 255 && colors.green(color) == 255 && colors.blue(color) == 255) {
                    sleep(视频等待);
                    p.click();
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2)
                    var clip = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().bottom - p.bounds().top), (p.bounds().bottom - p.bounds().top));
                    images.save(clip, "/sdcard/1.png");
                    console.warn("颜色不符合,没有点赞")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    images.save(captureScreen(), "/sdcard/点赞.jpg", "jpg", 20);
                    ww_dz = false;
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = id("xk").findOnce()
            if (p) {
                for (var i = 0; i < 5; i++) {
                    var t = id("xk").findOnce()
                    if (t) {
                        if (t.bounds().bottom >= 高 - 100) {
                            swipe(宽 / 2, 高 * 0.3, 宽 / 2, 高 * 0.2, 1000);
                            sleep(1000);
                        } else {
                            p = t;
                            break;
                        }
                    } else {
                        break;
                    }
                }
                日志.hide()
                sleep(2000);
                p = id("xk").findOnce()
                var img = captureScreen();
                var color = images.pixel(img, p.bounds().left + (p.bounds().right - p.bounds().left) / 2, p.bounds().top + (p.bounds().right - p.bounds().left) / 2);
                var color2 = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2);
                日志.show()
                if (colors.red(color) == 204 && colors.green(color) == 204 && colors.blue(color) == 204) {
                    sleep(视频等待);
                    p.click();
                } else if (colors.red(color) > 200 && colors.green(color) > 200 && colors.blue(color) > 200) {
                    sleep(视频等待);
                    p.click();
                } else if (colors.red(color2) == 255 && colors.green(color2) == 255 && colors.blue(color2) == 255) {
                    sleep(视频等待);
                    p.click();
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p.bounds().left + (p.bounds().right - p.bounds().left) / 2, p.bounds().top + (p.bounds().right - p.bounds().left) / 2)
                    console.log(colors.red(color2), colors.green(color2), colors.blue(color2), p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2)
                    var clip = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().right - p.bounds().left), (p.bounds().right - p.bounds().left));
                    var clip2 = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().bottom - p.bounds().top), (p.bounds().bottom - p.bounds().top));
                    images.save(clip, "/sdcard/1.png");
                    images.save(clip2, "/sdcard/2.png");
                    console.warn("颜色不符合,没有点赞")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_dz = false;
                    images.save(captureScreen(), "/sdcard/点赞.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("视频号点赞报错" + err);
        return false;
    }
}

function 微微点赞三(str) {
    var 发送 = false;
    var p = null;
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    try {
        str = str.replace(/[\.\。 \，\,\#\s\@]+/g, "");
        storage.put("str", str);
        sleep(5000);
        for (var i = 0; i < 10; i++) {
            if (text("开启活动订单").findOnce()) {
                sleep(1000)
                back()
                sleep(2000)
            }
            p = className("android.widget.EditText").boundsInside(0, device.height * 0.7, device.width, device.height).packageName("com.tencent.mm").findOnce();
            if (p) {
                sleep(1000)
                p.setText("#视频号:" + str)
                sleep(2000)
            }
            p = text("发送").className("android.widget.Button").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
                发送 = true
            }
            if (发送) {
                p = descEndsWith("头像").className("android.widget.ImageView").packageName("com.tencent.mm").find()
                if (p.length > 0) {
                    sleep(1000)
                    click(p[p.length - 1].bounds().centerX() - 300, p[p.length - 1].bounds().centerY());
                    sleep(2000)
                }
            }
            p = textStartsWith(str).className("android.view.View").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = text("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() + 200);
                sleep(2000);
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("u1").findOnce()
            if (p) {
                for (var i = 0; i < 5; i++) {
                    var t = id("u1").findOnce()
                    if (t) {
                        if (t.bounds().bottom >= 高 - 100) {
                            swipe(宽 / 2, 高 * 0.3, 宽 / 2, 高 * 0.2, 1000);
                            sleep(1000);
                        } else {
                            p = t;
                            break;
                        }
                    } else {
                        break;
                    }
                }
                日志.hide()
                sleep(2000);
                p = id("u1").findOnce()
                var img = captureScreen();
                var color = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2);
                日志.show()
                if (colors.red(color) == 255 && colors.green(color) == 255 && colors.blue(color) == 255) {
                    sleep(视频等待);
                    p.click();
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2)
                    var clip = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().bottom - p.bounds().top), (p.bounds().bottom - p.bounds().top));
                    images.save(clip, "/sdcard/1.png");
                    console.warn("颜色不符合,没有点赞")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_dz = false;
                    images.save(captureScreen(), "/sdcard/点赞.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = id("xk").findOnce()
            if (p) {
                for (var i = 0; i < 5; i++) {
                    var t = id("xk").findOnce()
                    if (t) {
                        if (t.bounds().bottom >= 高 - 100) {
                            swipe(宽 / 2, 高 * 0.3, 宽 / 2, 高 * 0.2, 1000);
                            sleep(1000);
                        } else {
                            p = t;
                            break;
                        }
                    } else {
                        break;
                    }
                }
                日志.hide()
                sleep(2000);
                p = id("xk").findOnce()
                var img = captureScreen();
                var color = images.pixel(img, p.bounds().left + (p.bounds().right - p.bounds().left) / 2, p.bounds().top + (p.bounds().right - p.bounds().left) / 2);
                var color2 = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2);
                日志.show()
                if (colors.red(color) == 204 && colors.green(color) == 204 && colors.blue(color) == 204) {
                    sleep(视频等待);
                    p.click();
                } else if (colors.red(color) > 200 && colors.green(color) > 200 && colors.blue(color) > 200) {
                    sleep(视频等待);
                    p.click();
                } else if (colors.red(color2) == 255 && colors.green(color2) == 255 && colors.blue(color2) == 255) {
                    sleep(视频等待);
                    p.click();
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p.bounds().left + (p.bounds().right - p.bounds().left) / 2, p.bounds().top + (p.bounds().right - p.bounds().left) / 2)
                    console.log(colors.red(color2), colors.green(color2), colors.blue(color2), p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2)
                    var clip = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().right - p.bounds().left), (p.bounds().right - p.bounds().left));
                    var clip2 = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().bottom - p.bounds().top), (p.bounds().bottom - p.bounds().top));
                    images.save(clip, "/sdcard/1.png");
                    images.save(clip2, "/sdcard/2.png");
                    console.warn("颜色不符合,没有点赞")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_dz = false;
                    images.save(captureScreen(), "/sdcard/点赞.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("视频号点赞报错" + err);
        return false;
    }
}

function 微微关注二(str) {
    auto.setWindowFilter((info) => { return true })
    var p = null;
    var 发送 = false;
    storage.put("str", str);
    sleep(5000);
    for (var i = 0; i < 10; i++) {
        try {
            if (text("开启活动订单").findOnce()) {
                sleep(1000)
                back()
                sleep(2000)
            }
            p = className("android.widget.EditText").boundsInside(0, device.height * 0.7, device.width, device.height).packageName("com.tencent.mm").findOnce();
            if (p) {
                sleep(1000)
                p.setText("#视频号:" + str)
                sleep(2000)
            }
            p = text("发送").className("android.widget.Button").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
                发送 = true
            }
            if (发送) {
                p = descEndsWith("头像").className("android.widget.ImageView").packageName("com.tencent.mm").find()
                if (p.length > 0) {
                    sleep(1000)
                    click(p[p.length - 1].bounds().centerX() - 300, p[p.length - 1].bounds().centerY());
                    sleep(2000)
                }
            }
            p = textStartsWith(str).className("android.view.View").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = text("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() + 200);
                sleep(2000);
            }
            p = text("关注").className("android.widget.TextView").findOnce();
            if (!p) {
                if (id(视频关注ID).exists()) {
                    p = id(视频关注ID).findOnce();
                } else if (id(主页关注ID).exists()) {
                    p = id(主页关注ID).findOnce();
                }
            }
            if (p) {
                sleep(关注等待);
                p.click();
                p.parent().click();
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_gz = false;
                    images.save(captureScreen(), "/sdcard/关注.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                p = text("关注").className("android.widget.TextView").findOnce();
                if (!p) {
                    if (截图()) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } catch (err) {
            console.error("视频号关注报错" + err);
            return false;
        }
        sleep(1000)
    }
    return false
}



function 微微搜一搜(str) {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    var p = null;
    storage.put("str", str);
    sleep(5000);
    for (var i = 0; i < 10; i++) {
        try {
            if (text("开启活动订单").findOnce()) {
                sleep(1000)
                back()
                sleep(2000)
            }
            p = text("文件传输助手").className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                back()
                sleep(2000)
            }
            p = text("发现").boundsInside(0, 1, 宽, 高).findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").className("android.widget.TextView").boundsInside(1, 高 * 0.1, 宽, 高).findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜索").boundsInside(0, 1, 宽, 高).findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
                p.setText(str)
                sleep(2000);
                if (dhj) {
                    click(宽 * 0.9, 高 * 0.9)
                } else {
                    click(宽 * 0.9, 高 * 0.95)
                }

                sleep(3000);
            }
            p = text(str + " - 视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() + 200);
                sleep(3000);
            }
            p = text(str + " - 视频号 更多 ").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() + 200);
                sleep(2000);
            }
            p = text("视频号 更多 ").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() + 200);
                sleep(2000);
            }
            p = text("视频号").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(3000);
            }
            p = textStartsWith(str + " ").clickable(true).className("android.view.View").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = text("视频号").clickable(false).className("android.view.View").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY() + 200);
                sleep(2000);
            }
            p = text("关注").className("android.widget.TextView").findOnce();
            if (!p) {
                p = id(主页关注ID).findOnce();
            }
            if (p) {
                sleep(关注等待);
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = text("私信").className("android.widget.TextView").findOnce();
            if (p) {
                sleep(关注等待);
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch (err) {
            console.error("视频号关注报错" + err);
            return false;
        }
        sleep(1000)
    }
    return false
}


function 进入微微() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    console.info("开始进入微微")
    while (1) {
        var 发送 = false
        p = text("微信").className("android.widget.TextView").boundsInside(0, 0, 宽, 高).findOnce()
        if (p && p.bounds().centerX() > 0 && p.bounds().centerY() > 0) {
            sleep(1000)
            clickx(p.bounds().centerX(), p.bounds().centerY());
            sleep(2000)
        }
        app.launchPackage("com.tencent.mm")
        for (var i = 0; i < 30; i++) {
            p = text("通讯录").className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
            }
            p = desc("搜索").className("android.widget.RelativeLayout").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
            }
            p = text("搜索").className("android.widget.EditText").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
                // setText("文件传输助手")
                if (ssjpt) {
                    setText(微微链接);
                } else {
                    setText(指定昵称);
                }
                sleep(2000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
            }
            if (ssjpt) {
                p = textStartsWith('搜一搜').className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000)
                }
                p = text('访问网页').packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000)
                }
            } else {
                // p = text("文件传输助手").className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
                p = text(指定昵称).className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(2000)
                }
                p = text("添加到通讯录").className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(2000)
                }
                p = text("发消息").className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(2000)
                }
                p = className("android.widget.EditText").boundsInside(0, device.height * 0.7, device.width, device.height).packageName("com.tencent.mm").findOnce();
                if (p) {
                    sleep(1000)
                    p.setText(微微链接)
                    sleep(2000)
                }
                p = text("发送").className("android.widget.Button").packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(2000)
                    发送 = true
                }

                if (发送) {
                    p = descEndsWith("头像").className("android.widget.ImageView").packageName("com.tencent.mm").find()
                    if (p.length > 0) {
                        sleep(1000)
                        click(p[p.length - 1].bounds().centerX() - 300, p[p.length - 1].bounds().centerY());
                        sleep(3000)
                    }
                }
            }
            p = text("继续访问").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(3000)
            }
            p = text("允许").className("android.widget.Button").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
            }
            p = text("进入视频号专题 >>").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
            }
            p = text("开启活动订单").packageName("com.tencent.mm").findOnce()
            if (p) {
                console.info("进入微微成功")
                sleep(5000);
                return true
            }
            p = text("进入微圈专题 >>").packageName("com.tencent.mm").findOnce()
            if (p) {
                console.info("进入微微成功")
                sleep(5000);
                return true
            }
            sleep(1000)
        }
        关闭应用(true)
    }
}
function 按名称关闭应用(packageName) {
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
                return false;
            }
        } else {
            log("没有找到" + app.getAppName(name) + "应用强行结束");
            return false;
        }
    } else {
        log("不在" + app.getAppName(name) + "应用设置界面");
        return false;
    }
    return true;

}
function 关闭应用(ms) {
    if (ms) {
        for (var d = 0; d < 5; d++) {
            if (text("文件传输助手").findOne(1000)) {
                return true
            }
            back();
        }
    }

    console.info("开始退出微信");
    /*app.openAppSetting("com.tencent.mm");
    for (var i = 0; i < 10; i++) {
        var is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne(1000);
        if (is_sure) {
            if (is_sure.enabled()) {
                is_sure.click();
            } else {
                console.warn("微信不能被正常关闭或不在后台运行");
                sleep(1000);
                back();
                sleep(1000);
                back();
                sleep(2000);
                home();
                return false;
            }
        }
        is_sure = textMatches(/(.*确.*|.*定.*)/).findOne(1000);
        if (is_sure) {
            is_sure.click();
            console.info("微信已被关闭");
            sleep(1000);
            back();
            sleep(1000);
            back();
            sleep(2000);
            home();
            return true;
        }
        is_sure = id("button1").textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne(500);
        if (is_sure) {
            is_sure.click();
            console.info("微信已被关闭");
            sleep(1000);
            back();
            sleep(1000);
            back();
            sleep(2000);
            home();
            return true;
        }
        is_sure = id("button1").textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne(1000);
        if (is_sure) {
            is_sure.click();
            console.info("微信已被关闭");
            sleep(1000);
            back();
            sleep(1000);
            back();
            sleep(2000);
            home();
            return true;
        }
    }
    console.warn("微信不能被正常关闭或不在后台运行");
    sleep(500);
    back();
    sleep(500);
    back();
    sleep(500);
    back();
    sleep(500);
    back();
    sleep(500);
    back();
    sleep(500);
    back();
    sleep(2000);
    home();
    p = text("关闭应用").findOnce()
    if (p) {
        clickx(p.bounds().centerX(), p.bounds().centerY());
    }
    return false;*/

    按名称关闭应用("com.tencent.mm");
}

/*function 关闭浮窗() {
    var c = null
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    while (1) {
        c = packageName("com.tencent.mm").id("cvt").findOnce()
        if (c) {
            c.click()
        }
        c = packageName("com.tencent.mm").id("ifb").findOnce()
        if (c) {
            c.click()
        }
        sleep(10000)
    }
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
}*/

function 微微总操作() {
    关闭应用(false)
    if (vq_yd) {
        vqui_log()
        进入微圈()
        微圈阅读()
        关闭应用(true)
    }
    if (ww_dz || ww_gz || ww_bf || ww_pl || ww_pz || ww_zf || ww_rq || ww_sys || ww_sc) {
        ui_log()
        ww_get_token();
        进入微微()
        微微视频()
        关闭应用(true)
    }
    if (vq_dz || vq_gz || vq_bf || vq_pl || vq_zf || vq_sc || vq_ydzk || vq_ydgz || vq_ydwzz) {
        vqui_log()
        vq_get_token();
        进入微圈()
        微圈视频()
        关闭应用(true)
    }

    while (1) {
        if (vq_yd) {
            vqui_log()
            进入微圈()
            微圈阅读()
            关闭应用(true)
        }
        if (ww_dz || ww_gz || ww_bf || ww_pl || ww_pz || ww_zf || ww_rq || ww_sys || ww_sc) {
            ui_log()
            进入微微()
            微微视频()
            关闭应用(true)
        }
        if (vq_yd) {
            vqui_log()
            进入微圈()
            微圈阅读()
            关闭应用(true)
        }
        if (vq_dz || vq_gz || vq_bf || vq_pl || vq_zf || vq_sc || vq_ydzk || vq_ydgz || vq_ydwzz) {
            vqui_log()
            进入微圈()
            微圈视频()
            关闭应用(true)
        }
    }

}


function vq_get_task() {
    var temp = null;
    var arr = []
    vq_task_id = null;
    if (vq_dz && 点赞 < 点赞数量) {
        arr.push("8")
    }
    if (vq_gz && 关注 < 关注数量) {
        arr.push("9")
    }
    if (vq_pl) {
        arr.push("10")
    }
    if (vq_sc) {
        arr.push("11")
    }
    if (vq_zf) {
        arr.push("12")
    }
    if (vq_bf) {
        arr.push("13")
    }
    if (vq_ydgz) {
        arr.push("2")
    }
    if (vq_ydzk) {
        arr.push("3")
    }
    if (vq_ydwzz) {
        arr.push("4")
    }
    for (var i = 0; i < 15; i++) {
        try {
            var myDate = new Date();
            if (ui.vq_yd.isChecked() && myDate.getHours() + "" + myDate.getMinutes() == "00") {
                vq_yd = true;
                return false
            }
            temp = http.postJson(微圈api + "api/app/v_taskc/getone", {
                types: arr
            }, {
                headers: {
                    "Token": vq_token
                }
            });
            if (temp && temp.statusCode == 200) {
                temp = temp.body.string();
                if (/成功/.test(temp)) {
                    temp = JSON.parse(temp);
                    vq_task_data = temp["data"];
                    vq_task_id = vq_task_data["v_task_log_id"]
                    return true;
                } else if (/没可做任务了/.test(temp)) {
                    console.verbose("微圈视频没订单,稍后重试");
                } else if (/领任务间隔时间6秒/.test(temp)) {
                    console.verbose("领任务间隔时间6秒");
                } else if (/请登录后操作/.test(temp)) {
                    刷新vq_token();
                } else {
                    console.warn("微圈视频获取任务" + temp);
                }
            } else {
                console.warn("微圈视频获取任务失败,网络异常");
            }
        } catch (err) {
            console.error("微圈视频获取任务报错,原因:" + err);
        }
        sleep(6000);
    }
    return false;
}



function vq_submit_task() {
    var temp = null;
    if (vq_task_id) {
        for (var i = 0; i < 10; i++) {
            try {
                temp = http.post(微圈api + "api/app/v_task_logc/submit", {
                    "v_task_log_id": vq_task_id,
                    "file_url": vq_img_url
                }, {
                    headers: {
                        "Token": vq_token
                    }
                });
                if (temp && temp.statusCode == 200) {
                    temp = temp.body.string();
                    if (/提交成功/.test(temp)) {
                        return true;
                    } else if (/任务不要重复提交/.test(temp)) {
                        console.warn("微圈视频任务不要重复提交");
                        return false;
                    } else if (/没上量/.test(temp)) {
                        console.warn("任务没上量");
                        return false;
                    } else if (/没找到次任务/.test(temp)) {
                        console.warn("微圈视频没找到次任务");
                        return false;
                    } else if (/请登录后操作/.test(temp)) {
                        刷新vq_token();
                    } else {
                        console.warn("微圈视频任务提交" + temp);
                    }
                } else {
                    console.warn("微圈视频任务提交失败,网络异常");
                }
            } catch (err) {
                console.error("微圈视频任务提交报错,原因:" + err);
            }
            sleep(5000);
        }
    } else {
        console.error("微圈视频任务id无效,放弃任务")
    }
}


function vq_giveup_task() {
    var temp = null;
    if (vq_task_id) {
        for (var i = 0; i < 10; i++) {
            try {

                temp = http.post(微圈api + "api/app/v_task_logc/fangqi", {
                    "v_task_log_id": vq_task_id
                }, {
                    headers: {
                        "Token": vq_token
                    }
                });

                if (temp && temp.statusCode == 200) {
                    temp = temp.body.string();
                    if (/放弃任务成功/.test(temp)) {
                        return true;
                    } else if (/放弃错误内容/.test(temp)) {
                        return false;
                    } else if (/没找到此任务/.test(temp)) {
                        return false;
                    } else if (/请登录后操作/.test(temp)) {
                        刷新vq_token();
                    } else {
                        console.warn("微圈视频放弃任务" + temp);
                    }
                } else {
                    console.warn("微圈视频放弃任务失败,网络异常");
                }
            } catch (err) {
                console.warn("微圈视频放弃任务报错,原因:" + err);
            }
            sleep(5000);
        }
    }
}



function vq_submit_img() {
    var temp = null;
    vq_img_url = "";
    for (var i = 0; i < 10; i++) {
        try {
            temp = http.postMultipart("http://heimao.ccp3.com/api/app/alioss/upload", {
                image: open("/sdcard/任务." + 图片编码)
            });
            if (temp && temp.statusCode == 200) {
                temp = temp.body.json();
                vq_img_url = temp["data"]["fileurl"]
                return true;

            } else {
                console.warn("微圈上传图片失败,网络异常");
            }
        } catch (err) {
            console.error("微圈上传图片报错,原因:" + err);
        }
        sleep(5000);
    }
}


function vq_get_token() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    var p = null;
    console.info("开始获取微圈token");
    while (1) {
        p = id("user_token").findOnce();
        if (p) {
            vq_token = p.text()
            console.info("获取微圈token成功,验证是否过期");
            if (vq_get_info()) {
                console.info("微圈token验证成功");
                return true
            } else {
                刷新vq_token();
            }
        } else {
            进入微圈();
        }
        sleep(5000)
    }
}


function vq_get_info() {
    var temp = null;
    try {
        temp = http.get(微圈api + "api/app/user", {
            headers: {
                "Token": vq_token
            }
        });
        if (temp && temp.statusCode == 200) {
            temp = temp.body.string();
            if (/获取用户信息成功/.test(temp)) {
                vq_info_data = JSON.parse(temp);
                vq_info_data = vq_info_data["data"];
                return true;
            } else if (/请登录后操作/.test(temp)) {
                刷新vq_token();
            } else {
                console.warn("微圈获取数据" + temp);
            }
        }
    } catch (err) {
        console.error("微圈获取数据报错,原因:" + err);
    }

}



function 刷新vq_token() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    var p = null
    console.info("微圈token过期,开始刷新")
    返回();
    while (1) {
        p = className("android.widget.ImageView").boundsInside(宽 * 0.7, 30, 宽, 500).packageName("com.tencent.mm").findOnce()
        if (p) {
            sleep(1000);
            clickx(p.bounds().centerX(), p.bounds().centerY());
            sleep(2000);
        }
        p = text("刷新").findOnce()
        if (p) {
            sleep(1000);
            clickx(p.bounds().centerX(), p.bounds().centerY());
            sleep(5000);
        }
        p = id("user_token").findOnce();
        if (p) {
            vq_token = p.text()
            if (vq_get_info()) {
                return true
            }
        } else {
            进入微圈();
        }
        sleep(5000)
    }
}


function 进入微圈() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    console.info("开始进入微圈")
    while (1) {
        var 发送 = false
        p = text("微信").className("android.widget.TextView").boundsInside(0, 0, 宽, 高).findOnce()
        if (p && p.bounds().centerX() > 0 && p.bounds().centerY() > 0) {
            sleep(1000)
            clickx(p.bounds().centerX(), p.bounds().centerY());
            sleep(2000)
        }
        app.launchPackage("com.tencent.mm")
        for (var i = 0; i < 30; i++) {
            p = text("通讯录").className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
            }
            p = desc("搜索").className("android.widget.RelativeLayout").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
            }
            p = text("搜索").className("android.widget.EditText").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
                // setText("文件传输助手")
                if (ssjpt) {
                    setText(微圈链接);
                } else {
                    setText(指定昵称);
                }
                sleep(2000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
            }
            if (ssjpt) {
                p = textStartsWith('搜一搜').className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000)
                }
                p = text('访问网页').packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000)
                }
            } else {
                // p = text("文件传输助手").className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
                p = text(指定昵称).className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(2000)
                }
                p = text("添加到通讯录").className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(2000)
                }
                p = text("发消息").className("android.widget.TextView").packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(2000)
                }
                p = className("android.widget.EditText").boundsInside(0, device.height * 0.7, device.width, device.height).packageName("com.tencent.mm").findOnce();
                if (p) {
                    sleep(1000)
                    p.setText(微圈链接)
                    sleep(2000)
                }
                p = text("发送").className("android.widget.Button").packageName("com.tencent.mm").findOnce()
                if (p) {
                    sleep(1000)
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(2000)
                    发送 = true
                }

                if (发送) {
                    p = descEndsWith("头像").className("android.widget.ImageView").packageName("com.tencent.mm").find()
                    if (p.length > 0) {
                        sleep(1000)
                        click(p[p.length - 1].bounds().centerX() - 300, p[p.length - 1].bounds().centerY());
                        sleep(3000)
                    }
                }
            }

            p = text("继续访问").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(3000)
            }
            p = text("允许").className("android.widget.Button").packageName("com.tencent.mm").findOnce()
            if (p) {
                sleep(1000)
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000)
            }

            p = text("开启活动订单").packageName("com.tencent.mm").findOnce()
            if (p) {
                console.info("进入微圈成功")
                sleep(5000);
                return true
            }
            sleep(1000)
        }
        关闭应用(true)
    }
}



function vqui_log() {
    ui.run(function () {
        window.wz.setText("威信名称:" + vq_info_data["nickname"] + "\n" + "关注:" + 关注 + " 点赞:" + 点赞 + " 播放:" + 播放 + " 收藏:" + 收藏 + " 评论:" + 评论 + " 转发:" + 转发 + "\n" + "阅读:" + 阅读 + " 文章关注:" + 公众号关注 + " 在看:" + 在看 + " 文章赞:" + 文章赞 + "\n" + "金币总额:" + vq_info_data["jinbi"] + "\n版本号:" + versionNum);
    });
    time = new Date();
    time.setTime(time.getTime());
    var jt_temp = time.getDate();
    if (jt_temp == jt) {
        files.write("/sdcard/jl.txt", JSON.stringify({ "jlt": jt, "dz": 点赞, "gz": 关注, "sc": 收藏, "bf": 播放, "pl": 评论, "zf": 转发, "rq": 人气, "sys": 搜一搜, "pz": 评赞, "yd": 阅读, "gzhgz": 公众号关注, "zk": 在看, "wzz": 文章赞 }));
    } else {
        jt = jt_temp;
        点赞 = 0;
        关注 = 0;
        收藏 = 0;
        播放 = 0;
        评论 = 0;
        转发 = 0;
        人气 = 0;
        搜一搜 = 0;
        评赞 = 0;
        阅读 = 0;
        提现 = true;
        在看 = 0;
        公众号关注 = 0;
        文章赞 = 0;
        在看无效 = 0;
        files.write("/sdcard/jl.txt", JSON.stringify({ "jlt": jt, "dz": 点赞, "gz": 关注, "sc": 收藏, "bf": 播放, "pl": 评论, "zf": 转发, "rq": 人气, "sys": 搜一搜, "pz": 评赞, "yd": 阅读, "gzhgz": 公众号关注, "zk": 在看, "wzz": 文章赞 }));
        日志.clearLog();
    }

}


function 微圈点赞() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    try {
        var p = null;
        for (var i = 0; i < 10; i++) {
            p = text("点赞").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(false).findOnce();
            if (p) {
                p.click();
            }
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.click();
                sleep(2000);
            }
            p = textplus("点击打开文章视频号");
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
                gzh = true;
            }
            p = text("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = id("vueqrcode_2021").findOnce()
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() + 100, 1000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("u1").findOnce()
            if (p) {
                for (var i = 0; i < 5; i++) {
                    var t = id("u1").findOnce()
                    if (t) {
                        if (t.bounds().bottom >= 高 - 100) {
                            swipe(宽 / 2, 高 * 0.3, 宽 / 2, 高 * 0.2, 1000);
                            sleep(1000);
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                sleep(视频等待);
                日志.hide()
                sleep(2000);
                p = id("u1").findOnce()
                var img = captureScreen();
                var color = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2);
                日志.show()
                if (colors.red(color) == 255 && colors.green(color) == 255 && colors.blue(color) == 255) {
                    p.click();
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2)
                    var clip = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().bottom - p.bounds().top), (p.bounds().bottom - p.bounds().top));
                    images.save(clip, "/sdcard/1.png");
                    console.warn("颜色不符合,没有点赞")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_dz = false;
                    images.save(captureScreen(), "/sdcard/点赞.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = id("xk").findOnce()
            if (p) {
                for (var i = 0; i < 5; i++) {
                    var t = id("xk").findOnce()
                    if (t) {
                        if (t.bounds().bottom >= 高 - 50) {
                            swipe(宽 / 2, 高 * 0.3, 宽 / 2, 高 * 0.2, 1000);
                            sleep(1000);
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                sleep(视频等待);
                日志.hide()
                sleep(2000);
                p = id("xk").findOnce()
                var img = captureScreen();
                if (p.childCount() > 1) {
                    if (p.child(0).childCount() > 0) {
                        var color = images.pixel(img, p.child(0).child(0).bounds().left + (p.child(0).child(0).bounds().right - p.child(0).child(0).bounds().left) / 2, p.child(0).child(0).bounds().top + (p.child(0).child(0).bounds().right - p.child(0).child(0).bounds().left) / 2);
                        var color2 = images.pixel(img, p.child(0).child(0).bounds().left + (p.child(0).child(0).bounds().bottom - p.child(0).child(0).bounds().top) / 2, p.child(0).child(0).bounds().top + (p.child(0).child(0).bounds().bottom - p.child(0).child(0).bounds().top) / 2);
                    } else {
                        var color = images.pixel(img, p.child(0).bounds().left + (p.child(0).bounds().right - p.child(0).bounds().left) / 2, p.child(0).bounds().top + (p.child(0).bounds().right - p.child(0).bounds().left) / 2);
                        var color2 = images.pixel(img, p.child(0).bounds().left + (p.child(0).bounds().bottom - p.child(0).bounds().top) / 2, p.child(0).bounds().top + (p.child(0).bounds().bottom - p.child(0).bounds().top) / 2);
                    }
                } else {
                    var color = images.pixel(img, p.bounds().left + (p.bounds().right - p.bounds().left) / 2, p.bounds().top + (p.bounds().right - p.bounds().left) / 2);
                    var color2 = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2);
                }
                // var color = images.pixel(img, p.bounds().left + (p.bounds().right - p.bounds().left) / 2, p.bounds().top + (p.bounds().right - p.bounds().left) / 2);
                // var color2 = images.pixel(img, p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2);
                日志.show()
                if (colors.red(color) == 204 && colors.green(color) == 204 && colors.blue(color) == 204) {
                    p.click();
                } else if (colors.red(color) > 200 && colors.green(color) > 200 && colors.blue(color) > 200) {
                    p.click();
                } else if (colors.red(color2) == 255 && colors.green(color2) == 255 && colors.blue(color2) == 255) {
                    p.click();
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p.bounds().left + (p.bounds().right - p.bounds().left) / 2, p.bounds().top + (p.bounds().right - p.bounds().left) / 2)
                    console.log(colors.red(color2), colors.green(color2), colors.blue(color2), p.bounds().left + (p.bounds().bottom - p.bounds().top) / 2, p.bounds().top + (p.bounds().bottom - p.bounds().top) / 2)
                    var clip = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().right - p.bounds().left), (p.bounds().right - p.bounds().left));
                    var clip2 = images.clip(img, p.bounds().left, p.bounds().top, (p.bounds().bottom - p.bounds().top), (p.bounds().bottom - p.bounds().top));
                    images.save(clip, "/sdcard/1.png");
                    images.save(clip2, "/sdcard/2.png");
                    console.warn("颜色不符合,没有点赞")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_dz = false;
                    images.save(captureScreen(), "/sdcard/点赞.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("视频号点赞报错" + err);
        return false;
    }
}




function 微圈关注() {
    auto.setWindowFilter((info) => { return true })
    var p = null;
    for (var i = 0; i < 10; i++) {
        try {
            p = text("点赞").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(false).findOnce();
            if (p) {
                p.click();
            }
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.click();
                sleep(2000);
            }
            p = id("vueqrcode_2021").findOnce()
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() + 100, 1000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = textplus("点击打开文章视频号");
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
                gzh = true;
            }
            p = text("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = id("tm").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = id("x1").findOnce();
            if (p) {
                sleep(1000);
                p.click()
                sleep(2000);
            }
            p = textStartsWith("视频号：").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("关注").className("android.widget.TextView").findOnce();
            if (!p) {
                p = id(主页关注ID).findOnce();
            }
            if (p) {
                sleep(关注等待);
                p.parent().click();
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_gz = false;
                    images.save(captureScreen(), "/sdcard/关注.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                p = text("关注").className("android.widget.TextView").findOnce();
                if (!p) {
                    if (截图()) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } catch (err) {
            console.error("视频号关注报错" + err);
            return false;
        }
        sleep(1000)
    }
    return false
}


function 微圈评论() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    try {
        var p = null;
        for (var i = 0; i < 10; i++) {
            p = text("点赞").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(false).findOnce();
            if (p) {
                p.click();
            }
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.click();
                sleep(2000);
            }
            p = id("vueqrcode_2021").findOnce()
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() + 100, 1000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = textplus("点击打开文章视频号");
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
                gzh = true;
            }

            p = text("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }

            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("axg").findOnce()
            if (p) {
                sleep(视频等待);
                p.click();
                sleep(2000);
            }
            p = id("b8z").findOnce()
            if (p) {
                sleep(视频等待);
                p.click();
                sleep(2000);
            }
            p = id("ax8").findOnce()
            if (p) {
                var hs_str = 话术arr[random(0, 话术arr.length - 1)];
                sleep(2000);
                p.setText(hs_str);
                sleep(2000);
                p = id("ax8").findOnce()
                if (p && p.text() == hs_str) {
                    click(宽 - 80, p.bounds().centerY());
                    sleep(2000);
                    if (id("ax8").textEndsWith("发表评论").findOnce()) {
                        if (截图()) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
            p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
            if (p) {
                ww_pl = false;
                return false;
            }
            p = text("我知道了").className("android.widget.Button").findOnce();
            if (p) {
                p.click()
                return false
            }
            p = id("b8q").findOnce()
            if (p) {
                var hs_str = 话术arr[random(0, 话术arr.length - 1)];
                sleep(2000);
                p.setText(hs_str);
                sleep(2000);
                p = id("b8q").findOnce()
                if (p && p.text() == hs_str) {
                    click(宽 - 80, p.bounds().centerY());
                    sleep(2000);
                    if (id("b8q").textEndsWith("发表评论").findOnce()) {
                        if (截图()) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
            p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
            if (p) {
                ww_pl = false;
                images.save(captureScreen(), "/sdcard/评论.jpg", "jpg", 20);
                return false;
            }
            p = text("我知道了").className("android.widget.Button").findOnce();
            if (p) {
                p.click()
                return false
            }
        }
        return false;
    } catch (err) {
        console.error("视频号评论报错" + err);
        return false;
    }
}






function 微圈收藏() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    try {
        var p = null;
        for (var i = 0; i < 10; i++) {
            p = text("点赞").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(false).findOnce();
            if (p) {
                p.click();
            }
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.click();
                sleep(2000);
            }
            p = id("vueqrcode_2021").findOnce()
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() + 100, 1000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = textplus("点击打开文章视频号");
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
                gzh = true;
            }

            p = text("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }


            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }

            p_sc = id(收藏ID).findOnce()
            if (p_sc) {
                日志.hide()
                sleep(2000);
                var img = captureScreen();
                var p_bounds = p_sc.bounds();
                var color = images.pixel(img, p_bounds.left + (p_bounds.bottom - p_bounds.top) / 2, p_bounds.top + (p_bounds.bottom - p_bounds.top) / 3);
                日志.show()
                if (colors.red(color) >= 200 && colors.green(color) >= 200 && colors.blue(color) >= 200) {
                    sleep(视频等待);
                    click((p_bounds.centerX() + random(-5, 5)), (p_bounds.centerY() + random(-5, 5)));
                } else {
                    console.log(colors.red(color), colors.green(color), colors.blue(color), p_bounds.left + 28, p_bounds.top + 28)
                    var clip = images.clip(img, p_bounds.left, p_bounds.top, (p_bounds.bottom - p_bounds.top), (p_bounds.bottom - p_bounds.top));
                    images.save(clip, "/sdcard/1.png");
                    console.warn("颜色不符合,没有收藏")
                    return false
                }
                sleep(2000);
                p = text("操作太频繁，请稍后再试").className("android.widget.TextView").findOnce();
                if (p) {
                    ww_sc = false;
                    images.save(captureScreen(), "/sdcard/收藏.jpg", "jpg", 20);
                    return false;
                }
                p = text("我知道了").className("android.widget.Button").findOnce();
                if (p) {
                    p.click()
                    return false
                }
                日志.hide()
                var img = captureScreen();
                var color = images.pixel(img, p_bounds.left + (p_bounds.bottom - p_bounds.top) / 2, p_bounds.top + (p_bounds.bottom - p_bounds.top) / 3);
                if (colors.red(color) >= 200 && colors.green(color) >= 200 && colors.blue(color) >= 200) {
                    p_sc.click();
                }
                sleep(2000);
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = id(转发ID).findOnce()
            if (p) {
                sleep(视频等待);
                p.click()
                sleep(2000);
            }
            p = text("收藏").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
                sc = true;
            }
            p = text("取消收藏").findOnce();
            var p2 = id(转发ID).findOnce();
            if (!p && p2) {
                p2.click()
                sleep(2000);
                p = text("取消收藏").findOnce();
            }
            if (p) {
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("视频号收藏报错" + err);
        return false;
    }
}

function 微圈播放() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    try {
        var p = null;
        for (var i = 0; i < 10; i++) {
            p = text("点赞").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(false).findOnce();
            if (p) {
                p.click();
            }
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.click();
                sleep(2000);
            }

            p = id("vueqrcode_2021").findOnce()
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() + 100, 1000);
                sleep(2000);
            }
            p = text("前往图中包含的视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("识别图中的二维码").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("搜一搜").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
                p = textStartsWith("网址链接").findOnce();
                if (p) {
                    sleep(1000);
                    clickx(p.bounds().centerX(), p.bounds().centerY());
                    sleep(5000);
                }
            }
            p = textplus("点击打开文章视频号");
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
                gzh = true;
            }
            p = text("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }
            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }
            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(2000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }

            p = id("u1").findOnce()
            if (p) {
                sleep(30000);
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            p = id("xk").findOnce()
            if (p) {
                sleep(30000);
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        console.error("视频号播放报错" + err);
        return false;
    }
}



function 微圈阅读() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    var js = 0
    var wxjs = 0
    try {
        var p = null;
        p = text("阅读").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(false).findOnce();
        if (p) {
            p.click();
        }
        p = text("关注").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(true).findOnce();
        if (p) {
            p.click();
        }
        p = text("关注").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(true).findOnce();
        if (p) {
            p.click();
        }
        p = text("在看").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(true).findOnce();
        if (p) {
            p.click();
        }
        p = text("评论赞").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(true).findOnce();
        if (p) {
            p.click();
        }
        while (true) {
            p = text("开始任务").className("android.widget.Button").boundsInside(1, 1, 宽, 高).findOnce();
            if (p) {
                sleep(1000);
                p.click();
                sleep(1000);
            }

            p = text("开启活动订单").className("android.widget.Button").boundsInside(1, 1, 宽, 高).find();
            if (p.length > 1) {
                sleep(1000);
                p[1].click();
                sleep(1000);
            }
            p = text("网络错误").boundsInside(1, 1, 宽, 高).findOnce();
            if (p) {
                back();
            }
            p = text("没上量请6小时之后再试").boundsInside(1, 1, 宽, 高).findOnce();
            if (p) {
                wxjs++
                console.warn("阅读无效")
                sleep(2000)
            }
            p = text("没可做任务了").boundsInside(1, 1, 宽, 高).findOnce();
            if (p) {
                console.verbose("阅读没可做任务了")
                return false
            }
            p = textContains("已经超过90次阅读").boundsInside(1, 1, 宽, 高).findOnce();
            if (p) {
                vq_yd = false;
                console.info("阅读已经完成90次")
                return true
            }
            p = text("阅读成功").boundsInside(1, 1, 宽, 高).findOnce();
            if (p) {
                wxjs = 0
                console.info("阅读成功")
                sleep(2000)
            }
            if (id("js_name").findOnce() || id("acticity-name").findOnce() || id("publish_time").findOnce()) {
                for (var j = 0; j < random(3, 5); j++) {
                    swipe(宽 / 2 + random(-10, 10), 高 * 0.3 + random(-10, 10), 宽 / 2 + random(-10, 10), 高 * 0.2 + random(-10, 10), random(500, 1500));
                    sleep(random(500, 1500));
                }
                阅读++
                js = 0
                vqui_log()
                back()
            }
            js++
            if (js > 30) {
                console.warn("阅读长时间未动,退出阅读")
                return false;
            }
            if (wxjs >= 5) {
                console.warn("阅读无效超过5次,今日不做阅读")
                vq_yd = false;
                return false;
            }
            sleep(500)
        }
    } catch (err) {
        日志.show()
        console.error("微圈阅读报错" + err);
        return false;
    }
}


function 微圈转发() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    转发check = false
    try {
        var p = null;
        for (var i = 0; i < 10; i++) {
            p = text("点赞").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(false).findOnce();
            if (p) {
                p.click();
            }
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.click();
                sleep(2000);
            }
            p = id("vueqrcode_2021").findOnce()
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY() + 100, 1000);
                sleep(2000);
            }

            p = textplus("点击打开文章视频号");
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("打开视频").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(5000);
            }
            p = text("打开视频-小程序").findOnce();
            if (p) {
                gzh = true;
                sleep(1000);
                p.parent().click();
                sleep(wait_one);
                p = desc("打开").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_two);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
                p = id("weuiAgree").checkable(false).findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(3000);
                }
                p = id("btnNext").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(5000);
                }
                p = text("允许").findOnce();
                if (p) {
                    sleep(1000);
                    p.click();
                    sleep(wait_three);
                } else {
                    console.error("小程序打开失败");
                    return false;
                }
            }
            p = text("视频号").findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(6000);
            }
            p = text("该内容已被发布者删除").findOnce();
            if (p) {
                console.warn("该内容已被发布者删除")
                return false;
            }

            p = text("动态已经被设置成隐私").findOnce();
            if (p) {
                console.warn("动态已经被设置成隐私")
                return false;
            }

            p = id("ejr").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200
                );
                sleep(2000);
            }
            p = id("gka").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("j7c").findOnce()
            if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (textContains("私信").findOnce() || descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }
            p = id("d2l").findOnce()
            if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && !text("直播中").findOnce()) {
                clickx(p.bounds().left + 100, p.bounds().top + 200);
                sleep(6000);
            } else if (p && (!textContains("私信").findOnce() || !descContains('私信').findOnce()) && text("直播中").findOnce()) {
                click(宽 - 300, p.bounds().top + 200);
                sleep(2000);
            }

            p = text("转发").findOnce()
            if (p) {
                sleep(视频等待);
                p.parent().click()
                sleep(2000);
            }
            p = id(转发ID).findOnce()
            if (p) {
                sleep(视频等待);
                p.click()
                sleep(2000);
            }
            p = text("分享到朋友圈").findOnce()
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("发表").findOnce()
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                for (var i = 0; i < 10; i++) {
                    if (转发check) {
                        if (截图()) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    sleep(500)
                }
                return false
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("视频号转发报错" + err);
        return false;
    }
}



function 阅读在看() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    try {
        var p = null;
        for (var i = 0; i < 30; i++) {
            p = text("点赞").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(false).findOnce();
            if (p) {
                p.click();
            }
            p = text("开启活动订单").findOnce();
            if (p) {
                sleep(1000);
                p.click();
                sleep(2000);
            }
            p = textplus("点击打开文章");
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            if (id("js_name").findOnce() || id("acticity-name").findOnce() || id("publish_time").findOnce()) {
                swipe(宽 / 2 + random(-10, 10), 高 * 0.7 + random(-10, 10), 宽 / 2 + random(-10, 10), 高 * 0.2 + random(-10, 10), random(500, 1500));
            }
            p = textStartsWith("在看").boundsInside(1, 1, device.width, device.height).findOnce()
            if (p) {
                sleep(1000);
                p.click()
                sleep(3000);
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("阅读在看报错" + err);
        return false;
    }
}



function 阅读关注() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    try {
        var p = null;
        for (var i = 0; i < 30; i++) {
            p = text("点赞").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(false).findOnce();
            if (p) {
                p.click();
            }
            p = text("开启活动订单").boundsInside(1, 1, device.width, device.height).findOnce();
            if (p) {
                sleep(1000);
                p.click();
                sleep(2000);
            }
            p = text("援助结果截图").boundsInside(1, 1, device.width, device.height).findOnce();
            if (p) {
                sleep(1000);
                swipe(device.width * 0.5, device.height * 0.8, device.width * 0.5, device.height * 0.2, 1000)
                sleep(2000);
            }
            p = textStartsWith("code?username=").boundsInside(1, 1, device.width, device.height).findOnce();
            if (p) {
                sleep(1000);
                press(p.bounds().centerX(), p.bounds().centerY(), 2000);
                sleep(2000);
            }
            p = text("前往图中包含的公众号").boundsInside(1, 1, device.width, device.height).findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = text("关注").id("a5h").boundsInside(1, 1, device.width, device.height).findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            p = id("d8").desc("设置").boundsInside(1, 1, device.width, device.height).findOnce();
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }

            p = textStartsWith("发消息").id("a5i").boundsInside(1, 1, device.width, device.height).findOnce()
            if (p) {
                sleep(1000);
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("阅读关注报错" + err);
        return false;
    }
}


function 阅读文章赞() {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    try {
        var p = null;
        for (var i = 0; i < 30; i++) {
            p = text("点赞").className("android.widget.CheckBox").boundsInside(1, 1, 宽, 高).checked(false).findOnce();
            if (p) {
                p.click();
            }
            p = text("开启活动订单").boundsInside(1, 1, 宽, 高).findOnce();
            if (p) {
                sleep(1000);
                p.click();
                sleep(2000);
            }
            p = textplus("点击打开文章");
            if (p) {
                sleep(1000);
                clickx(p.bounds().centerX(), p.bounds().centerY());
                sleep(2000);
            }
            if (id("js_name").findOnce() || id("acticity-name").findOnce() || id("publish_time").findOnce()) {
                swipe(宽 / 2 + random(-10, 10), 高 * 0.7 + random(-10, 10), 宽 / 2 + random(-10, 10), 高 * 0.2 + random(-10, 10), random(500, 1500));
            }
            p = textStartsWith("赞").className("android.widget.Button").id("js_bottom_zan_btn").boundsInside(1, 1, device.width, device.height).findOnce()
            if (p) {
                sleep(1000);
                p.click()
                sleep(3000);
                if (截图()) {
                    return true;
                } else {
                    return false;
                }
            }
            sleep(1000)
        }
        return false
    } catch (err) {
        日志.show()
        console.error("阅读文章赞报错" + err);
        return false;
    }
}

function textplus(str) {
    auto.setWindowFilter((info) => {
        // try{
        //    return info.getRoot().getPackageName()=="com.ss.android.ugc.aweme"
        // }catch(e){
        //    return true
        // }
        return true
    })
    var temp = null
    temp = textStartsWith(str).findOnce();
    if (temp) {
        return temp
    }
    return temp
}

function clickx(x, y) {
    x = x + random(-5, 5)
    y = y + random(-5, 5)
    click(x < 0 ? 1 : x, y < 0 ? 1 : y)
}
