// 这是善直冲突实验范式，丢硬币

/* Global Variables */
const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

//0、1随机分配被试组别，0为两两比较，1为单独比较
// const condition = Math.round(Math.random())
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
        `<p>接下来，你将与搭档来进行猜硬币的游戏。<b style="color:#a70b0b">由你来掷硬币，并如实输入系统。</b>之后将出现收益表，<b style="color:#a70b0b">你的搭档也会看到</b>。你与搭档的收益将由你的搭档最后向系统报告的所决定。`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var wait = {
    type: 'instructions',
    pages: [
        `<p>接下来，你将与搭档来进行猜硬币的游戏。<b style="color:#a70b0b">由你来掷硬币，并如实输入系统。</b>之后将出现收益表，<b style="color:#a70b0b">你的搭档也会看到</b>。你与搭档的收益将由你的搭档最后向系统报告的所决定。`,
    ],
    show_clickable_nav: false,
    allow_backward: false,
    trial_duration:function () {
        return jsPsych.randomization.sampleWithoutReplacement([800, 900, 1000, 1100], 1)[0];
      },
}

var instr_exp = {
    type: 'instructions',
    pages: [
        `<img src="images/ins_coin.png"><p>如在上图这种情况下，你实际掷出的是国徽面。如果你的搭档报告“数字面”，则他获得3积分，你获得2积分。<br>你每猜对一次搭档的报告情况，将额外获得0.5积分，积分最后将与报酬挂钩。</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}


/* Blocks: Surveys */

var rep_coin = {
    type: 'html-button-response',
    choices:['国徽面','数字面'],
    stimulus: '请选择你掷出的硬币面向',

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
    on_finish: function(data) { data.response = data.response.Q0;}
}

// var test_st = [
//     {img:"images/d11.png" },
//     {img:"images/d12.png" },
//     {img:"images/e10.png" },
//     {img:"images/e12.png" },
//     {img:"images/g15.png" },
//     {img:"images/m12.jpg" },
//     {img:"images/m16.jpg" },
//     {img:"images/m18.jpg" },
//     {img:"images/m23.jpg" },
//     {img:"images/m35.jpg" },
//     {img:"images/m36.jpg" },
// ]

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
    { data: { varname: "p",face: 1 }, s0:1, s1:1, r0:0, r1:1,face: 1 },
    { data: { varname: "p",face: 0 }, s0:0.5, s1:0.5, r0:2, r1:1,face: 0 },
    { data: { varname: "a",face: 0 }, s0:0.5, s1:0, r0:0.5, r1:0,face: 0 },    
]
//硬币
var cointrust = {
    timeline_variables: coinlist,
    timeline: [rep_coin,{
            type: 'html-button-response',
            data: jsPsych.timelineVariable('data'),
            stimulus: function() {
                var rp = jsPsych.data.get().last(1).values()[0].response;
                var fc = "国徽面"
                if (rp==1) {fc = "数字面"}
                if (rp==jsPsych.timelineVariable('face')) {
                    var html = '<table border="1" style="min-width: -webkit-fill-available;"><tbody><tr><th>收益表</th><th>国徽面</th><th>数字面</th></tr><tr><td>搭档</td><td>'+jsPsych.timelineVariable("s0")+'</td><td>'+jsPsych.timelineVariable("s1")+'</td></tr><tr><td>你</td><td>'+jsPsych.timelineVariable("r0")+'</td><td>'+jsPsych.timelineVariable("r1")+'</td></tr></tbody></table><p>你掷出了'+fc+'</p>';
                }else{
                    var html = '<table border="1" style="min-width: -webkit-fill-available;"><tbody><tr><th>收益表</th><th>国徽面</th><th>数字面</th></tr><tr><td>搭档</td><td>'+jsPsych.timelineVariable("s1")+'</td><td>'+jsPsych.timelineVariable("s0")+'</td></tr><tr><td>你</td><td>'+jsPsych.timelineVariable("r1")+'</td><td>'+jsPsych.timelineVariable("r0")+'</td></tr></tbody></table><p>你掷出了'+fc+'</p>';
                }
                return html;
            },
            prompt: '你认为你的搭档将会报告哪一面',
            choices:['国徽面', '数字面'],
            post_trial_gap: 400,
        },
        ],
    // trial presentation
    randomize_order: true,
}

// var shame_test = {
//     timeline_variables: test_st,
//     timeline:[{
//         type: 'html-button-response',
//         stimulus:function(){
//             var html = '<div id="timelimit" style="text-align:center;font-size:15px;margin-bottom:30px;"></div><img src="'+jsPsych.timelineVariable("img")+'"></img>';
//             return html;
//         },
//         choices:['1','2','3','4','5','6','7','8'],
//         prompt: '请选择最合适的图片',
//     }],
//     trial_duration:30000,
//     }

/* Combine Timelines */



var main_timeline = [
    set_html_style,
    open_fullscreen,
    instr_coin,instr_exp,
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
//         // jatos.submitResultData(resultJson, jatos.startNextComponent);
//     }
// });
// });


jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        var resultJson = jsPsych.data.get().json();
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
        // jatos.submitResultData(resultJson, jatos.startNextComponent);
    }
});
