$(function () {
    //初始化滚动条
    //这个方法定义在scroll.js
    resetui()

    //为发送的按钮绑定鼠标点击事件
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim()//获取用户输入到内容
        if (text.length <= 0) {
            //若用户没输入内容 则将输入框清空
            return $('#ipt').val('')
        }
        //若输入了内容，将内容追加到页面上显示
        //    let $li =('<li class="right_word"><img src="img/person02png" /> <span>ddd</span></li>')
        $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
        //清空输入框的内容
        $('#ipt').val('')
        //重置滚动条到位置
        resetui()
        //发起请求，获取聊天内容
        getMsg(text)

    })

    //获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {

                console.log(res)
                if (res.message === 'success')
                    //接受聊天消息
                    var msg = res.data.info.text
                $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
                //重置滚动条的位置
                resetui()

                //调用 getVoice函数
                getVoice(msg)
            }

        })
    }


    //将机器人的聊天内容转换为语音
    function getVoice(text){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text
            },
            success:function(res){
                //请求成功，则res.voiceUrl 是服务器返回的音频url地址
                console.log(res)
                if(res.status===200){
                    $('#voice').attr('src',res.voiceUrl)
                }
            }
        })
    }


//回车键发送消息
$('#ipt').on('keyup',function(e){

    if(e.keyCode===13){
        $('#btnSend').trigger('click')
    }

})

})



// Ajax课程资料聊天机器人接口更新
// 原接口1：http://ajax.fontend.itheima.net:3006/api/robot
// 原接口2：http://ajax.fontend.itheima.net:3006/api/synthesize

//新接口1：http://www.liulongbin.top:3006/api/robot   (获取消息)
//新接口2：http://www.liulongbin.top:3006/api/synthesize （转换成语音）
