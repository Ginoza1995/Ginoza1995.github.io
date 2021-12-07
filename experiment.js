// 这是善直冲突实验范式，丢硬币

/* Global Variables */
const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

//0、1随机分配被试组别，0为两两比较，1为单独比较
const condition = Math.round(Math.random())
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
    接下来你将与你的游戏搭档进行掷硬币的游戏。
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
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

/*var Email = {
    type: 'survey-html-form',
    data: { varname: 'Email' },
    preamble: '你的邮箱',
    html: '<p><input name="Q0" type="email" placeholder="非必填" /></p>',
    button_label: '继续',
    //此处需要注意name="Q0",下面这个语段是记录被试的回答，且只记录单个答案，且通过name="Q0"定位
    on_finish: function(data) { addRespFromSurvey(data) }
}*/


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



var main_timeline = [
    set_html_style,
    open_fullscreen,
    instr_coin,
    cointrust,
    OpenEnded,
    close_fullscreen,
]


/* Launch jsPsych */
// jatos.onLoad(function() {
//     jsPsych.init({
//     timeline: main_timeline,
//     on_finish: function() {
//         var resultJson = jsPsych.data.get().json();
//         document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
//         if(condition==0){
//             document.getElementById('jspsych-content').innerHTML += '实验过程中图形推理的排名是我们杜撰，并非您的真实能力反应，请勿有任何消极情绪'
//         }
//         // jatos.submitResultData(resultJson, jatos.startNextComponent);
//     }
// });
// });


jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        var resultJson = jsPsych.data.get().json();
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
        if(condition==0){
            document.getElementById('jspsych-content').innerHTML += '实验过程中图形推理的排名是我们杜撰，并非您的真实能力反应，请勿有任何消极情绪'
        }
        // jatos.submitResultData(resultJson, jatos.startNextComponent);
    }
});
