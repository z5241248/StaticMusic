//定义ajax通用地址
var basePath="/";

//定义头像图片地址
var pagePath="http://127.0.0.1/StaticMusic";


//消息弹窗
function ok(id)
{
    <!-- 提示弹窗 -->
    syalert.syopen(id);
}

function getInter()
{
    var tab=$(".dropdown-content");
    tab.empty();
    singerList();
    list();
    ranking();
    typeList();
    recommend();

    $(function()
    {
        $('.cherry').Cherry_Blossoms({
            is_Cherry:true,//是否生成樱花
            image_min:5,//花瓣最小宽度和高度
            image_max:20,//花瓣最大宽度和高度
            time_min:12000,//花瓣最快下坠时间
            time_max:20000,//花瓣最慢下坠时间
            interval:500//花瓣生成时间间隔
        })
    });
}

//下拉菜单
// ---------------------------------------------------
function singerList()
{
    var url=basePath+"SakuraMusic/selectRandSinger";
    $.post(url,function (data)
    {
        var tab=$("#tab1");
        $.each(data,function (i,n)
        {
            var p="<p style='cursor: pointer;width: 100%' onclick='selectTabMusic(this)'><a style='text-decoration: none'>"+n.name+"</a></p>";
            tab.append(p);
        });
        var more="<p style='cursor: pointer;color: black' onclick='more()'>更多</p>";
        tab.append(more);
    })
}


function list()
{
    var url=basePath+"SakuraMusic/selectMaxByMusicLikecount";
    $.post(url,function (data)
    {
        var tab=$("#tab2");
        $.each(data,function (i,n)
        {
            var p="<p style='cursor: pointer;width: 100%' onclick='getPlay(this)'><a style='text-decoration: none'>"+n.name+"</a></p>" +
                "<img src='image/play.png' style='width: 20px;float: right;position: relative;top: 20px;left: 1px'>";
            tab.append(p);
        });
        var more="<p style='cursor: pointer;color: black' onclick='more()'>更多</p>";
        tab.append(more);
    })
}


function ranking()
{
    var url=basePath+"SakuraMusic/selectMaxByAlbumLikecount";
    $.post(url,function (data)
    {
        var tab=$("#tab3");
        $.each(data,function (i,n)
        {
            var p="<p style='cursor: pointer;width: 100%'><a style='text-decoration: none'>"+n.name+"</a></p>";
            tab.append(p);
        });
        var more="<p style='cursor: pointer;color: black' onclick='more()'>更多</p>";
        tab.append(more);
    })
}


function typeList()
{
    var url=basePath+"SakuraMusic/selectAllMusicType";
    $.post(url,function (data)
    {
        var tab=$("#tab4");
        $.each(data,function (i,n)
        {
            var p="<p style='cursor: pointer;width: 100%' onclick='searchTabType(this)'><a style='text-decoration: none' >"+n.musictype+"</a></p>";
            tab.append(p);
        });
        var more="<p style='cursor: pointer;color: black' onclick='more()'>更多</p>";
        tab.append(more);
    })
}

function recommend()
{
    var url=basePath+"SakuraMusic/selectRandMusic";
    $.post(url,function (data)
    {
        var tab=$("#tab5");
        $.each(data,function (i,n)
        {
            var p="<p style='cursor: pointer;width: 100%' onclick='clickPlay(this)'><a style='text-decoration: none'>"+n.name+"</a>" +
                "<label style='display: none'>"+n.singer+"</label>" +
                "</p><img src='image/play.png' style='width: 20px;height: 20px;float: right;position: relative;top: 19px;left: 1%'>";
            tab.append(p);
        });
        var more="<p style='cursor: pointer;color: black' onclick='more()'>更多</p>";
        tab.append(more);
    })
}
// ---------------------------------------------------


//播放音乐
//----------------------------------------------------
function getPlay(e)
{
    var name = $(e).text();
    var url=basePath+"SakuraMusic/favoriteMusic/"+name;
    $.post(url,function (data)
    {
        var frame=window.parent.document.getElementById("audioControl");
        frame.contentWindow.change(data.name,data.singer);

        //信息提示
        $('.tips').initTips
        ({
            title: "正在播放", // head头部显示的标题内容
            message:""+data.name+"",// 内容区域
            duration:3500, // 提示框停留时间(毫秒为单位)  默认值为5000ms
            space:10, // 通知窗之间上下间隔 单位px(默认值为8)
            firstSpace:8, // 第一个提示框距离页面 上方或(下,左,右)的距离 (默认值为8)
            margin:15, // 提示框 距离左右两边的距离 (默认值15px)
            toastType:'info',// 提示类型 有四个样式可选 info warning error success(默认info)
            width:150, // 提示框宽度,默认为auto不换行
            // limit:4, // 限制提示框数量(默认值为4)
            // timingFun:'linear',// 动画运动曲线(默认值为ease)
            // direction:'right bottom', // 提示框滑出方向默认right bottom
            // type:'click', // 触发方式(内容区域)
            // 上方type属性的事件触发后的回调函数
            // action: function () {
            //     console.log(1)
            // }
        });

        //窗口弹出
        // var show=window.parent.show();
    });
}


//播放搜索的音乐
function searchPlay(e)
{
    var name = $(e).text();
    var singerName=$(e).next("td").text();
    var url=basePath+"SakuraMusic/selectByName2/"+singerName;
    $.post(url,function (data)
    {
        play(name,data.id);
    })
}


//集成播放
function play(name,id)
{
    var searchUrl=basePath+"SakuraMusic/searchPlay?name="+name+"&singer="+id+"";
    $.post(searchUrl,function (da)
    {
        var address=da.musicaddress;
        if(address!="" || address!=null)
        {
            var frame=window.parent.document.getElementById("audioControl");
            // $(frame).attr("src",address);
            frame.contentWindow.change(name,id);

            //信息提示
            $('.tips',parent.document).initTips
            ({
                title: "正在播放", // head头部显示的标题内容
                message:""+name+"",// 内容区域
                duration:3500, // 提示框停留时间(毫秒为单位)  默认值为5000ms
                space:10, // 通知窗之间上下间隔 单位px(默认值为8)
                firstSpace:8, // 第一个提示框距离页面 上方或(下,左,右)的距离 (默认值为8)
                margin:15, // 提示框 距离左右两边的距离 (默认值15px)
                toastType:'info',// 提示类型 有四个样式可选 info warning error success(默认info)
                width:150, // 提示框宽度,默认为auto不换行
                // limit:4, // 限制提示框数量(默认值为4)
                // timingFun:'linear',// 动画运动曲线(默认值为ease)
                // direction:'right bottom', // 提示框滑出方向默认right bottom
                // type:'click', // 触发方式(内容区域)
                // 上方type属性的事件触发后的回调函数
                // action: function () {
                //     console.log(1)
                // }
            });

            //窗口弹出
            // var show=window.parent.show();
        }
    })
}


//播放点击的音乐
function clickPlay(e)
{
    //得到选中得歌曲名称和歌手id
    var name=$(e).find("a").text();
    var id=$(e).find("label").text();
    play(name,id);
}



//获得session
// ---------------------------------------------------
function getSession()
{
    var url=basePath+"SakuraMusic/selectUserSession";
    $.post(url,function (data)
    {
        if(data!=null && data!="")
        {
            $("#login").css("display","none");
            $("#headImg").css("visibility","visible");
            $("#center").css("display","inline-block");

            var headPath=pagePath + data.image;
            $("#headImg img").attr("src",headPath);
        }
    })
}


// 搜索信息
// ---------------------------------------------------
function selectTabMusic(e)
{
    var name=$(e).children("a").text();
    $("#centerIframe").attr("src","infoIframe.html?type=singer&name="+name);
}


function searchTab(e)
{
    var name=$(e).text();
    var centerIframe=window.parent.document.getElementById("centerIframe");
    $(centerIframe).attr("src","infoIframe.html?type=singer&name="+name);
}


function searchTabType(e)
{
    var name=$(e).text();
    var centerIframe=window.parent.document.getElementById("centerIframe");
    $(centerIframe).attr("src","infoIframe.html?type=type&name="+name);
}

function more()
{
    // alert("更多")
}

// ---------------------------------------------------



//登陆相关
// ---------------------------------------------------
function showLogin()
{
    $("#dialog").show(500);
    $("#dialog").css
    ({
        "background":"url('image/background.jpg')",
        "background-size":"100% 100%"
    });
}

function showRegister()
{
    $("#dialog2").show(500);
    $("#dialog2").css
    ({
        "background":"url('image/background.jpg')",
        "background-size":"100% 100%"
    });
}

function hideDialog()
{
    $("#dialog").hide(500);
    $("#dialog2").hide(500);
}



function login()
{
    var text1=$("#myform input:nth-of-type(1)").val().trim();
    var text2=$("#myform input:nth-of-type(2)").val().trim();
    if(text1==null || text1=="" || text2==null || text2=="")
    {
        // alert("请输入完整登陆信息!");
        syalert.syopen("s2");
    }
    else
    {
        var form=$("#myform").serialize();
        var url=basePath + "SakuraMusic/login";
        $.post(url,form,function (data)
        {
            if(data!=null && data!="")
            {
                if(data.seal=="1")
                {
                    //清除session,封号提示
                    var url=basePath+"SakuraMusic/takeOff";
                    $.post(url,function (){});
                    syalert.syopen("sealOff");
                }
                else
                {
                    hideDialog();
                    $("#login").css("display","none");
                    $("#headImg").css("visibility","visible");
                    $("#center").css("display","inline-block");

                    var headPath=pagePath + data.image;
                    $("#headImg img").attr("src",headPath);

                    if(data.type==0)
                    {
                        $("#tempLabel").text("管理中心");
                    }
                    else
                    {
                        $("#tempLabel").text("会员中心");
                    }

                    document.getElementById('audioControl').contentWindow.location.reload(true);
                }
            }
            else
            {
                // alert("用户名或密码错误!");
                syalert.syopen("s3");
            }
        })
    }
}


//注册判断第一步
function register()
{
    var text1=$("#myform2 input:nth-of-type(1)").val().trim();
    var text2=$("#myform2 input:nth-of-type(2)").val().trim();
    var text3=$("#myform2 input:nth-of-type(3)").val().trim();
    var text4=$("#myform2 input:nth-of-type(4)").val().trim();
    if(text1=="存在相同账户,请重新设置!")
    {
        // alert("存在相同账户,请重新设置!");
        syalert.syopen("s4")
    }
    else if(text1==null || text1=="" || text2==null || text2=="" || text3==null || text3=="" || text4==null || text4=="")
    {
        // alert("请输入完整注册信息!");
        syalert.syopen("s5")
    }
    else if(text3 != text4)
    {
        // alert("两次输入的密码不同!")
        syalert.syopen("s6")
    }
    else
    {
        $("#myform2").fadeOut(0);
        $("#message").fadeIn(400);
    }
}


//注册判断第二步
function binding()
{
    var form=$("#myform2").serialize();
    var url=basePath + "SakuraMusic/insertUser";
    var code1=$("#code1").val().trim();

    var judgeUrl=basePath+"SakuraMusic/judge/"+code1;
    $.post(judgeUrl,function (num)
    {
        if(num==1)
        {
            var phone=$("#phone1").val().trim();
            form+="&phone="+phone;
            $.post(url,form,function (data)
            {
                if(data > 0)
                {
                    // alert("注册成功!");
                    syalert.syopen("s7")
                    $("#myform2 input").val("");
                    hideDialog();
                    showLogin();

                    document.getElementById('audioControl').contentWindow.location.reload(true);
                }
                else
                {
                    // alert("注册失败!请稍后再重试!");
                    syalert.syopen("s8")
                }
            })
        }
    })
}


function Previous()
{
    $("#myform2").fadeIn(400);
    $("#message").fadeOut(0);
}


function changeSms()
{
    if($("#changeSms").text().trim()=="使用短信验证码登陆")
    {
        $("#myform").fadeOut(0);
        $("#loginMessage").fadeIn(400);
        $("#changeSms").text("使用账号密码登陆");
    }
    else
    {
        $("#myform").fadeIn(400);
        $("#loginMessage").fadeOut(0);
        $("#changeSms").text("使用短信验证码登陆");
    }
}


function smsLoginJudge()
{
    var phone=$("#loginPhone").val().trim();
    var code=$("#code").val().trim();
    if(phone=="" || code=="")
    {
        syalert.syopen("s2");
    }
    else
    {
        var judgeUrl=basePath+"SakuraMusic/judge/"+code;
        $.post(judgeUrl,function (num)
        {
            if(num==1)
            {
                var selectByPhoneUrl=basePath+"SakuraMusic/selectByPhone/"+phone;
                $.post(selectByPhoneUrl,function (data)
                {
                    if(data.seal=="1")
                    {
                        //清除session,封号提示
                        var url=basePath+"SakuraMusic/takeOff";
                        $.post(url,function (){});
                        syalert.syopen("sealOff");
                    }
                    else
                    {
                        $("#myform input:nth-of-type(1)").val(data.name);
                        $("#myform input:nth-of-type(2)").val(data.password);
                        login();
                    }
                })
            }
        })
    }
}


function changeTemp(e)
{
    var text = e.text.trim();
    if(text=="注册用户")
    {
        $("#dialog2").css
        ({
            "background":"url('image/background.jpg')",
            "background-size":"cover",
        });
        $("#dialog").fadeOut(500);
        $("#dialog2").fadeIn(500);
    }
    else if(text=="直接登陆")
    {
        $("#dialog").css
        ({
            "background":"url('image/background.jpg')",
            "background-size":"cover",
        });
        $("#dialog2").fadeOut(500);
        $("#dialog").fadeIn(500);
    }
}



//退出登陆
function takeOff()
{
    var url=basePath+"SakuraMusic/takeOff";
    $.post(url,function ()
    {
        window.location.href="index.html";

    });
}


//得到url中?后的信息
// ---------------------------------------------------
function getRequest() {
    //获取url中"?"符后的字串
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}



//查询
// ---------------------------------------------------
function hideLine()
{
    $("#searchDiv label").css("border-bottom","none")
}


function searchMusic(name)
{
    hideLine();
    $("#searchDiv label:nth-of-type(1)").css("border-bottom","1px solid darkgray");

    var searchText=name;
    if(searchText=="" || searchText==null)
    {
        alert("请输入点儿线索哦!");
    }
    else
    {
        $("#carousel-example-generic").css("display","none");
        $("section").css("display","none");
        $("#nav").css("display","block");

        var searchText=name;
        var url=basePath+"SakuraMusic/selectMusicByName/"+searchText;
        $.post(url,function (data)
        {
            var table=$("#mytable");
            table.empty();

            var th=$("<tr style='height: 60px;font-size: 22px;font-weight: 800'></tr>");//行
            var tdd="<td>歌曲</td>";
            tdd+="<td>歌手</td>";
            tdd+="<td>专辑</td>";
            tdd+="<td>收藏数</td>";
            th.append(tdd);
            table.append(th);
            $.each(data,function (i,n)
            {
                var SingerUrl=basePath+"SakuraMusic/selectSingerById/"+n.singer;
                var singer;
                $.ajax
                ({
                    type:"POST",
                    url:SingerUrl,
                    async:false,
                    success:function (ds)
                    {
                        singer=ds.name;
                    }
                });

                var AlbumUrl=basePath+"SakuraMusic/selectAlbumById/"+n.album;
                var album;
                $.ajax
                ({
                    type:"POST",
                    url:AlbumUrl,
                    async:false,
                    success:function (da)
                    {
                        album=da.name;
                    }
                });


                var tr=$("<tr style='height: 40px;font-size: 17px;'></tr>");//行
                var td="<td style='text-align: center;cursor: pointer;text-decoration: underline;' title='点击播放' onclick='searchPlay(this)'>"+n.name+"" +
                    "<img src='image/play.png' style='width: 20px;height: 20px;float: right;position: relative;right: 23%;top: 1px'></td></td>";
                td+="<td style='text-align: center;text-decoration: underline;cursor: pointer' onclick='searchTab(this)'>"+singer+"</td>";
                td+="<td style='text-align: center'>"+album+"</td>";
                td+="<td style='text-align: center'>"+n.likecount+"</td>";
                tr.append(td);
                table.append(tr);
            })
        })
    }
}


function searchAlbum(name)
{
    hideLine();
    $("#searchDiv label:nth-of-type(2)").css("border-bottom","1px solid darkgray");

    var searchText=name;
    if(searchText=="" || searchText==null)
    {
        alert("请输入点儿线索哦!");
    }
    else
    {
        var url=basePath+"SakuraMusic/selectAlbumByName/"+searchText;
        $.post(url, function (data)
        {
            var table = $("#mytable");
            table.empty();

            var th = $("<tr style='height: 60px;font-size: 22px;font-weight: 800'></tr>");//行
            var tdd = "<td>专辑名称</td>";
            tdd += "<td>歌手</td>";
            tdd += "<td>发行日期</td>";
            th.append(tdd);
            table.append(th);
            $.each(data, function (i, n)
            {
                var SingerUrl=basePath+"SakuraMusic/selectSingerById/"+n.singer;
                var singer;
                $.ajax
                ({
                    type:"POST",
                    url:SingerUrl,
                    async:false,
                    success:function (da)
                    {
                        singer=da.name;
                    }
                });

                var tr = $("<tr style='height: 40px;font-size: 17px'></tr>");//行
                var td = "<td style='text-align: center'>" + n.name + "</td>";
                td += "<td style='text-align: center;text-decoration: underline;cursor: pointer' onclick='searchTab(this)'>" + singer + "</td>";
                td += "<td style='text-align: center'>" + n.date + "</td>";
                tr.append(td);
                table.append(tr);
            })
        })
    }
}


function searchSinger(name)
{
    hideLine();
    $("#searchDiv label:nth-of-type(3)").css("border-bottom","1px solid darkgray");

    var searchText=name;
    if(searchText=="" || searchText==null)
    {
        alert("请输入点儿线索哦!");
    }
    else
    {
        var table = $("#mytable");
        table.empty();

        var url = basePath + "SakuraMusic/selectSingerByName/" + searchText;
        $.post(url, function (data)
        {
            var th = $("<tr style='height: 60px;font-size: 22px;font-weight: 800'></tr>");//行
            var tdd = "<td>姓名</td>";
            tdd += "<td>生日</td>";
            tdd += "<td>专辑</td>";
            th.append(tdd);
            table.append(th);
            $.each(data, function (i, n)
            {
                var tr = $("<tr style='height: 40px;font-size: 17px'></tr>");//行
                var td = "<td style='text-align: center;text-decoration: underline;cursor: pointer' onclick='searchTab(this)'>" + n.name + "</td>";
                td += "<td style='text-align: center'>" + n.birthday + "</td>";
                td += "<td style='text-align: center'>" + n.album + "</td>";
                tr.append(td);
                table.append(tr);
            })
        })
    }
}




//回到主页
// ---------------------------------------------------
function refresh()
{
    $("#centerIframe").attr("src","indexIframe.html");
}



