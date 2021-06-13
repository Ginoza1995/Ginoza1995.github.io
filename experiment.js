

/* Global Variables */
const { Query, User } = AV;

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

//0、1随机分配被试组别，0为能力组，1为道德组，2为控制组。
const condition = Math.round(Math.random()*2)
var mt = 360
var timelimit
var subName=''
var xueli=''
/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
            if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
                (event.ctrlKey && event.keyCode in { 85: 'U' })
            ) { return false }
        }
    },
}

var set_html_style_EAST = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
        document.body.style.fontSize = '32pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'normal'
        document.body.style.lineHeight = '1.2em'
        document.body.style.cursor = 'none'
    },
}


/* Blocks: Basics */

var open_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在测验过程中不要退出全屏或刷新页面<br/>
    （5）务必认真作答<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var welcome = {
    type: 'instructions',
    data: { value: new Date().toLocaleTimeString() },
    pages: [ `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与我们的实验</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <b>实验过程中请勿退出全屏</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    江西师范大学<br/>2021年</p>`],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

/*var welcome = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与我们的实验</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <按空格键继续><br/>
    <b>实验过程中请勿退出全屏</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    江西师范大学<br/>2021年</p>`,
    choices: [' ',],
    //post_trial_gap: n   下个页面呈现前将有持续n毫秒的空白页
    post_trial_gap: 100
}*/

var warmup = {
    type: 'html-button-response',
    stimulus: `<p>在每一部分的问题前都有详细的指导语，请务必仔细阅读指导语后再进行作答。每个人的行为或想法都不一样，所以问题的答案没有好与坏之分，您只需要按照内心的直觉作答即可。如果不是理解错误导致的错选，您无需反复修改您的答案。</p><p>您的回答不会被用于除研究以外的其他用途或透露给与研究无关的人员，本研究也不会记录任何事后能将您与本问卷回答进行联系或追溯的个人信息，请放心作答。</p>`,
    choices: ['<span id="timer">10</span>秒后继续'],
    button_html: btn_html_timer
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}

var instr_ms = {
    type: 'survey-text',
    data: { varname: 'moral'},
    questions: [{
        prompt:`<p>指导语：请你仔细阅读以下文字，并思考你是否有如此相类似的经历，让你感到自己是个没有道德感的人。如果有请写下你的经历，如果没有请抄写下面这段文字。</p><p>我在街上碰到一个好像是癫痫的病人发病，没有上前去帮助他。当时看到时，第一反应是应该把他扶起来，叫救护车或把他送往医院，却没有实施，只是在远远地看着……所幸是有人帮他做了一些急救措施，而且叫了救护车。我就在想我是否就是所谓的道德缺失的人。</p>`,
        placeholder: `请尽可能回忆类似的情境，填写字数需大于100.`,
        rows: 10,
        columns: 120,
        required: true
    }],
    button_label: '继续',
    required_word:100,
    on_finish: function(data) { data.value = data.response.Q0 }
}

var instr_as = {
    type: 'instructions',
    data: { varname: 'ability'},
    pages: [
        `<p>接下来要做的是一个数图推理测验，它能较好地反应一个人的逻辑推理能力。每道题中的各个选项的得分有所不同，最低0分，最高5分。请看下面的例题：</p><img src="images/例.png"><p>在这张图中，上面的图像是缺了一部分的，图案下面的小图片的形状都与上图所缺部分一样，但内容不同，不是每一张小图片都能补全上面的图案。请看第一张小图片，显然不行，第二、三张也对不上，第六张好像可以，但也有一小块空白。最后只有第四张是最合适的，所以，4将获得最高得分。</p><p><b style="color:#a70b0b">每题限时30秒，共11题，请尽力作答。你的成绩将被上传，所有参与本实验的人都将看到。</b></p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续',
}

var rank = {
    type: 'instructions',
    pages: function(){
        var xl=''
        switch(xueli){
            case "1" :
                xl = "其它";
                break;
            case "2":
                xl = "大专及大专在读";
                break;
            case "3":
                xl = "本科及本科在读";
                break;
            case "4":
                xl = "硕士及硕士在读";
                break;
            case "5":
                xl = "硕士以上";
                break;
        }
        var ads = [];
        var str = "<p>历史得分排名</p><table id='rank'><thead style='text-align:center;'><tr><th>名次(55/55)</th><th>姓名</th><th style='width:200px;'>学历</th><th style='width:100px;'>分数</th></tr></thead><tbody><tr><td>1</td><td>余庆华</td><td>硕士以上</td><td>55</td></tr><tr><td>1</td><td>施囡</td><td>硕士及硕士在读</td><td>55</td></tr><tr><td>3</td><td>王维俊</td><td>本科及本科在读</td><td>54</td></tr><tr><td>3</td><td>广姗然</td><td>硕士及硕士在读</td><td>54</td></tr><tr><td>5</td><td>王慧敏</td><td>本科及本科在读</td><td>53</td></tr><tr><td>.</td><td>.</td><td>.</td><td>.</td></tr><tr><td>.</td><td>.</td><td>.</td><td>.</td></tr><tr><td>.</td><td>.</td><td>.</td><td>.</td></tr><tr><td>40</td><td>王汉华</td><td>大专及大专在读</td><td>21</td></tr><tr style='background-color:#ffff66;'><td>41</td><td>"+subName+"</td><td>"+xl+"</td><td>20</td></tr><tr><td>41</td><td>秋瑾兰</td><td>其他</td><td>20</td></tr><tr><td>.</td><td>.</td><td>.</td><td>.</td></tr><tr><td>.</td><td>.</td><td>.</td><td>.</td></tr></tbody></table>";
        ads[0]=str;
        return ads
    },
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续',
}

var instr_control = {
    type: 'survey-text',
    data: { varname: 'control'},
    questions: [{
        prompt: `指导语：</br>请回忆以下这个校园生活中常遇到的场景：你打算在食堂吃饭，在点餐后找到了位置，就坐吃饭。请尽量生动具体地在脑海里想象这个过程，当你能成功地回忆这段经历时，请在下方写下这段经历。请尽量描述每一个细节，你不需要写成一段连贯的文字，也无需描述自己的心情，任何与之相关的细节都可以被记录下来，例如，人流量怎么样、你是如何挑选食物、座位的，等等。<b style="color:#a70b0b">请至少填写150字</b>`,
        placeholder: `请注意，请尽可能地描述日常大多数时候会发生的细节，而不是某几次偶然发生却给你留下深刻印象的细节`,
        rows: 10,
        columns: 120,
        required: true
    }],
    button_label: '继续',
    required_word:150,
    on_finish: function(data) { data.value = data.response.Q0 }
}

var instr_coin = {
    type: 'instructions',
    pages: [
        `<p>接下来，你将线上匹配一位搭档来进行猜硬币的游戏。<b style="color:#a70b0b">你是接收者，你的搭档是报告者。</b>报告者的报告情况将决定你们两人的收益，每次游戏的收益情况都会发生变化，<b style="color:#a70b0b">收益表以及硬币面向对于你们两人都可见</b>。</p><img src="images/ins_coin.png"><p>你每猜对一次报告者的选择,将获得0.5的收益。</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}


/* Blocks: Surveys */

var Sex = {
    type: 'html-button-response',
    data: { varname: 'Sex' },
    stimulus: '你的性别',
    choices: ['男', '女'],
    on_finish: function(data) { data.value = addRespFromButton(data) }
}

var Age = {
    type: 'survey-html-form',
    data: { varname: 'Age' },
    preamble: '你的年龄',
    html: `
    <p><input name="Q0" type="number" placeholder="15~99" min=15 max=99
    oninput="if(value.length>2) value=value.slice(0,2)" required style="font-size:20px" /></p>`,
    button_label: '继续',
    on_finish: function(data) { data.value = data.response.Q0 }
}

var AName = {
    type: 'survey-html-form',
    data: { varname: 'Name' },
    preamble: '你的姓名',
    html: `<p><input name="Q0" type="text
    " required style="font-size: 20px;" placeholder="姓名"></p>`,
    button_label: '继续',
    on_finish: function(data) {data.value = data.response.Q0;subName = data.response.Q0 ;}
}

/*var Email = {
    type: 'survey-html-form',
    data: { varname: 'Email' },
    preamble: '你的邮箱',
    html: '<p><input name="Q0" type="email" placeholder="非必填" /></p>',
    button_label: '继续',
    //此处需要注意name="Q0",下面这个语段是记录被试的回答，且只记录单个答案，且通过name="Q0"定位
    on_finish: function(data) { addRespFromSurvey(data) }
}*/

var School = {
    type: 'survey-html-form',
    data: { varname: 'School' },
    preamble: '你的最高学历',
    html: `
    <p><select name="Q0" size=10 style="font-size:20px;">
    <option value="2">大专及大专在读</option>
    <option value="3">本科及本科在读</option>
    <option value="4">硕士及硕士在读</option>
    <option value="5">硕士以上</option>
    <option value="1">其他</option>
    </select></p>`,
    button_label: '继续',
    on_finish: function(data) { data.value = data.response.Q0;xueli = data.value}
}

var instr_ssgs = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        指导语：<br/>
        认真阅读之后的句子，<br/>
        并选择符合你内心感受的按钮。<br/><br/>
        1 = 完全没感觉<br/>
        2 = 比较没感觉<br/>
        3 = 有一点感觉<br/>
        4 = 比较有感觉<br/>
        5 = 感觉强烈<br/>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var SSGS = {
    timeline: [{
        type: 'html-slider-response',
        data: jsPsych.timelineVariable('data'),
        on_load: function() { setSliderAttr() },
        stimulus: jsPsych.timelineVariable('s'),
        labels: ['完全没感觉', '比较没感觉', '有一点感觉', '比较有感觉', '感觉强烈'],
        min: 1,   
        max: 5,
        slider_start: 3,
        prompt: '<b id="slider-value">_</b><br/><br/>',
        button_label: '继续',
        require_movement: true,
    }],
    timeline_variables: [
        { data: { i: 1 }, s: '我好想找个地洞钻进去，从这里消失' },
        { data: { i: 2 }, s: '我觉得自己很渺小' },
        { data: { i: 3 }, s: '我感觉自己是个糟糕的人' },
        { data: { i: 4 }, s: '我感到难堪、丢脸' },
        { data: { i: 5 }, s: '我觉得自己毫无价值，缺少力量' },
        { data: { i: 6 }, s: '我感到羞耻' }
    ],
    randomize_order: false,
    on_finish: function(data) { addRespFromButtonScale(data, 'SSGS') },
    post_trial_gap: 100

}

var OpenEnded = {
    type: 'survey-text',
    data: { varname: 'OpenEnded' },
    questions: [{
        prompt: '实验已全部完成，你可以分享任何疑问、想法或是对实验目的的猜测：',
        rows: 5,
        columns: 50,
        required: false
    }],
    button_label: '完成',
    on_finish: function(data) { data.response = data.response.Q0;data.value = new Date().toLocaleTimeString() }
}

var test_st = [
    {img:"images/d11.png" },
    {img:"images/d12.png" },
    {img:"images/e10.png" },
    {img:"images/e12.png" },
    {img:"images/g15.png" },
    {img:"images/m12.jpg" },
    {img:"images/m16.jpg" },
    {img:"images/m18.jpg" },
    {img:"images/m23.jpg" },
    {img:"images/m35.jpg" },
    {img:"images/m36.jpg" },
]

var coinlist = [
    { data: { varname: "z",face: 1 }, s0:0.5, s1:0, r0:1, r1:1, face: 1 },
    { data: { varname: "z",face: 0 }, s0:0.5, s1:1, r0:0.5, r1:0.5, face: 0 },
    { data: { varname: "z",face: 1 }, s0:2, s1:-1, r0:0.5, r1:0.5, face: 1 },
    { data: { varname: "z",face: 0 }, s0:1, s1:2, r0:1, r1:1, face: 0 },
    { data: { varname: "z",face: 0 }, s0:-0.5, s1:1.5, r0:1, r1:1,face: 0 },
    { data: { varname: "s",face: 1 }, s0:0.5, s1:0.5, r0:2, r1:1, face: 1 },
    { data: { varname: "s",face: 0 }, s0:1, s1:1, r0:0, r1:1, face: 0 },
    { data: { varname: "s",face: 1 }, s0:0.5, s1:0.5, r0:1, r1:-1, face: 1 },
    { data: { varname: "s",face: 0 }, s0:2, s1:2, r0:-1, r1:2, face: 0 },
    { data: { varname: "s",face: 1 }, s0:1.5, s1:1.5, r0:1, r1:0, face: 1 },
    { data: { varname: "s",face: 0 }, s0:1, s1:1, r0:0, r1:1,face: 0 },
    { data: { varname: "sp",face: 1 }, s0:1, s1:1, r0:0, r1:1,face: 1 },
    { data: { varname: "sp",face: 0 }, s0:0.5, s1:0.5, r0:2, r1:1,face: 0 },
    { data: { varname: "sp",face: 1 }, s0:0.5, s1:0.5, r0:0, r1:-1,face: 0 },
    { data: { varname: "sp",face: 0 }, s0:-1, s1:0.5, r0:-1, r1:1,face: 1 },
    { data: { varname: "sp",face: 1 }, s0:2, s1:3, r0:-1, r1:2,face: 1 },

]
//硬币
var cointrust = {
    timeline_variables: coinlist,
    timeline: [{
            type: 'html-button-response',
            data: jsPsych.timelineVariable('data'),
            stimulus: function() {
                var html = '<table border="1" style="min-width: -webkit-fill-available;"><tbody><tr><th>收益表</th><th>国徽面</th><th>数字面</th></tr><tr><td>报告者（搭档）</td><td>'+jsPsych.timelineVariable("s0")+'</td><td>'+jsPsych.timelineVariable("s1")+'</td></tr><tr><td>接收者（你）</td><td>'+jsPsych.timelineVariable("r0")+'</td><td>'+jsPsych.timelineVariable("r1")+'</td></tr></tbody></table><div id="euro" class="trans'+jsPsych.timelineVariable('face')+'"><article class="back"></article><article class="middle" style="transform: translateZ(1px)"></article><article class="middle" style="transform: translateZ(2px)"></article><article class="middle" style="transform: translateZ(3px)"></article><article class="middle" style="transform: translateZ(4px)"></article><article class="middle" style="transform: translateZ(5px)"></article><article class="middle" style="transform: translateZ(6px)"></article><article class="middle" style="transform: translateZ(7px)"></article><article class="middle" style="transform: translateZ(8px)"></article><article class="middle" style="transform: translateZ(9px)"></article><article class="front"></article></div>';
                return html;
            },
            prompt: '实际掷出情况如上图，你认为你的搭档将会报告哪一面',
            choices:['国徽面', '数字面'],
            post_trial_gap: 400,
        },
        ],
    // trial presentation
    randomize_order: true,
}

var shame_test = {
    timeline_variables: test_st,
    timeline:[{
        type: 'html-button-response',
        stimulus:function(){
            var html = '<div id="timelimit" style="text-align:center;font-size:15px;margin-bottom:30px;"></div><img src="'+jsPsych.timelineVariable("img")+'"></img>';
            return html;
        },
        choices:['1','2','3','4','5','6','7','8'],
        prompt: '请选择最合适的图片',
    }],
    trial_duration:30000,
    }

/* Combine Timelines */

var demographics = {
    timeline: [
        AName, Sex, Age,  School, 
    ]
}


if (condition==0){
    var test = {
    timeline: [
        instr_as,shame_test,rank,
        ],
    }
} else if (condition==2){
    var test = {
    timeline: [
        instr_control,
        ],}
} else if (condition==1){
    var test = {
    timeline: [
        instr_ms,
        ],
    }
}

if(condition==0){
    var pre = {
    type: 'preload',
    trials:[shame_test,instr_coin,cointrust],
    }
} else {
    var pre = {
    type: 'preload',
    trials:[instr_coin,cointrust],
    }
}


var main_timeline = [
    set_html_style,
    open_fullscreen,pre,
    welcome,
    warmup,
    demographics,
    test,instr_coin,
    cointrust,instr_ssgs,
    SSGS,
    OpenEnded,
    close_fullscreen,
]


/* Launch jsPsych */

jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        AV.init({
            appId: "d55NTeJhoxxP2c1gJCp4BPgn-MdYXbMMI",
            appKey: "pYdEA7V25uOUXwtmNYCVb3ys",
        });
        var fs = new Blob([jsPsych.data.get().csv()],{type : 'text/csv'});
        const file = new AV.File(`${condition}ST_${subName}.csv`, fs);
        file.save().then((file) => {
        console.log(`文件保存完成。objectId：${file.id}`);
            }, (error) => {
  //        保存失败，可能是文件无法被读取，或者上传过程中出现问题
        });/*
        jsPsych.data.get().localSave('csv', `ST_${subName}.csv`) // download from browser*/
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
        if(condition==0){
            document.getElementById('jspsych-content').innerHTML += '实验过程中图形推理的排名是我们杜撰，并非您的真实能力反应，请勿有任何消极情绪'
        }
    }
})