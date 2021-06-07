

/* Global Variables */

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

const subID = jsPsych.randomization.randomID(8)


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
    stimulus: `<p>在每一部分的问题前都有详细的指导语，请务必仔细阅读指导语后再进行作答。每个人的行为或想法都不一样，所以问题的答案没有好与坏之分，您只需要按照内心的直觉作答即可。如果不是理解错误导致的错选，您无需反复修改您的答案。</p><p>您的回答不会被用于除研究以外的其他用途或透露给与研究无关的人员，本研究也不会记录任何事后能将您与本问卷回答进行联系或追溯的个人信息，请放心作答。</p><p>遇到没有选择按钮时，请尝试使用滚轮向下查看。</p>`,
    choices: ['<span id="timer">10</span>秒后继续'],
    button_html: btn_html_timer
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}

var instr_ms = {
    type: 'instructions',
    pages: [
        `<p>道德羞耻唤起</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var instr_as = {
    type: 'instructions',
    pages: [
        `<p>接下来要做的是一个有趣的练习，请看下面的例题。</p><p>在这张图中，上面的图像是缺了一部分的，图案下面的小图片的形状都与上图所缺部分一样，但内容不同，不是每一张小图片都能补全上面的图案。请看第一张小图片，显然不行，第二、三张也对不上，第六张好像可以，但也有一小块空白。最后只有第四张是最合适的，所以，此题正确答案是4。</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var instr_control = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        中性任务</p>`,
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
    on_finish: function(data) { addRespFromButton(data) }
}

var Age = {
    type: 'survey-html-form',
    data: { varname: 'Age' },
    preamble: '你的年龄',
    html: `
    <p><input name="Q0" type="number" placeholder="15~99" min=15 max=99
    oninput="if(value.length>2) value=value.slice(0,2)" required style="font-size:20px" /></p>`,
    button_label: '继续',
        //此处需要注意name="Q0",下面这个语段是记录被试的回答，且只记录单个答案，且通过name="Q0"定位
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Email = {
    type: 'survey-html-form',
    data: { varname: 'Email' },
    preamble: '你的邮箱',
    html: '<p><input name="Q0" type="email" placeholder="非必填" /></p>',
    button_label: '继续',
    //此处需要注意name="Q0",下面这个语段是记录被试的回答，且只记录单个答案，且通过name="Q0"定位
    on_finish: function(data) { addRespFromSurvey(data) }
}

var School = {
    type: 'survey-html-form',
    data: { varname: 'School' },
    preamble: '你的最高学历',
    html: `
    <p><select name="Q0" size=10>
    <option>大专及大专在读</option>
    <option>本科及本科在读</option>
    <option>硕士及硕士在读</option>
    <option>硕士以上</option>
    <option>其他</option>
    </select></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

/*var Language = {
    type: 'survey-multi-select',
    data: { varname: 'Language' },
    questions: [{
        prompt: '你会哪些语言？',
        options: ['汉语', '英语', '日语', '韩语', '西班牙语', '其他'],
        horizontal: false,
        required: false
    }],
    button_label: '继续',
    on_finish: function(data) { replaceComma(data) }
}*/

var SSGS = {
    timeline: [{
        type: 'html-slider-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请基于你此时此刻的感受，表明你对下列陈述的同意程度<br/>
        （1 = 非常不同意，7 = 非常同意）</p>`,
        choices: ['1', '2', '3', '4', '5'],
        //当你要记录likert量表的多个问题答案时，可以用addRespFromButtonScale(data,'你的量表名var空格后的名字')
        on_finish: function(data) { addRespFromButtonScale(data, 'SSGS') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 }, s: '我好想找个地洞钻进去，从这里消失' },
        { data: { i: 2 }, s: '我觉得自己很渺小' },
        { data: { i: 3 }, s: '我感觉自己是个糟糕的人' },
        { data: { i: 4 }, s: '我感到难堪、丢脸' },
        { data: { i: 5 }, s: '我觉得自己毫无价值，缺少力量' },
    ],
    randomize_order: false
}

var OpenEnded = {
    type: 'survey-text',
    data: { varname: 'OpenEnded' },
    questions: [{
        prompt: '实验已全部完成，请你猜测本实验的研究目的：',
        rows: 5,
        columns: 50,
        required: false
    }],
    button_label: '完成',
    on_finish: function(data) { addRespFromSurvey(data) }
}


/* Blocks: Experiments */

// Stimuli

/*var EAST_attrib_words = [
    { data: { stim_type: 'pos' }, s: '健康' },
    { data: { stim_type: 'pos' }, s: '快乐' },
    { data: { stim_type: 'pos' }, s: '美好' },
    { data: { stim_type: 'neg' }, s: '邪恶' },
    { data: { stim_type: 'neg' }, s: '吝啬' },
    { data: { stim_type: 'neg' }, s: '卑鄙' },
]

var blu = 'rgb(0, 125, 150)'
var grn = 'rgb(0, 150, 125)'
var EAST_target_words = [
    { data: { stim_type: blu, x: 'a' }, s: '玫瑰' },
    { data: { stim_type: blu, x: 'a' }, s: '牡丹' },
    { data: { stim_type: blu, x: 'b' }, s: '空气' },
    { data: { stim_type: blu, x: 'b' }, s: '土地' },
    { data: { stim_type: blu, x: 'c' }, s: '蟑螂' },
    { data: { stim_type: blu, x: 'c' }, s: '蚊子' },
    { data: { stim_type: grn, x: 'a' }, s: '玫瑰' },
    { data: { stim_type: grn, x: 'a' }, s: '牡丹' },
    { data: { stim_type: grn, x: 'b' }, s: '空气' },
    { data: { stim_type: grn, x: 'b' }, s: '土地' },
    { data: { stim_type: grn, x: 'c' }, s: '蟑螂' },
    { data: { stim_type: grn, x: 'c' }, s: '蚊子' },
]

var tag_LR1 = `<div class="tag-left">按“F”键:<br/>积极词</div>
               <div class="tag-right">按“J”键:<br/>消极词</div>`

var tag_LR2 = `<div class="tag-left">按“F”键:<br/><span style="color:${blu}">蓝色</span></div>
               <div class="tag-right">按“J”键:<br/><span style="color:${grn}">绿色</span></div>`

var tag_LR3 = `<div class="tag-left">按“F”键:<br/>积极词<br/>或<br/><span style="color:${blu}">蓝色</span></div>
               <div class="tag-right">按“J”键:<br/>消极词<br/>或<br/><span style="color:${grn}">绿色</span></div>`

// Instructions
// Exp. Blocks

var EAST_prac1 = {
    // stimulus items
    timeline_variables: EAST_attrib_words,
    // single trial
    timeline: [{
            // fixation
            type: 'html-keyboard-response',
            stimulus: '+',
            choices: jsPsych.NO_KEYS,
            prompt: tag_LR1,
            trial_duration: 500,
            post_trial_gap: 0,
            response_ends_trial: false
        },
        {
            // word stimulus
            type: 'categorize-html',
            data: jsPsych.timelineVariable('data'),
            stimulus: jsPsych.timelineVariable('s'),
            choices: ['f', 'j'],
            key_answer: function() {
                switch (jsPsych.timelineVariable('data', true).stim_type) {
                    case 'pos':
                        return keyCode('f')
                    case 'neg':
                        return keyCode('j')
                }
            },
            prompt: tag_LR1,
            correct_text: tag_LR1 + feedback_right,
            incorrect_text: tag_LR1 + feedback_wrong,
            feedback_duration: 500,
            force_correct_button_press: true
        },
    ],
    // trial presentation
    repetitions: 2,
    randomize_order: true
}*/

var rawen = [
    {img: }
    {img: }
    {img: }
    {img: }
    {img: }
]

var coinlist = [
    { data: { varname: "z",face: 1 }, s0:0.5, s1:0, r0:1, r1:1, },
    { data: { varname: "z",face: 0 }, s0:0.5, s1:1, r0:0.5, r1:0.5, },
    { data: { varname: "z",face: 1 }, s0:2, s1:1, r0:0.5, r1:0.5, },
    { data: { varname: "z",face: 0 }, s0:1, s1:2, r0:1, r1:1, },
    { data: { varname: "s",face: 1 }, s0:0.5, s1:0.5, r0:2, r1:1, },
    { data: { varname: "s",face: 0 }, s0:1, s1:1, r0:0, r1:1, },
    { data: { varname: "s",face: 1 }, s0:0.5, s1:0.5, r0:1, r1:-1, },
    { data: { varname: "s",face: 0 }, s0:2, s1:2, r0:-1, r1:2, },
    { data: { varname: "s",face: 1 }, s0:1.5, s1:1.5, r0:1, r1:0, },
    { data: { varname: "s",face: 0 }, s0:1, s1:1, r0:0, r1:1, },

]
//硬币
var cointrust = {
    timeline_variables: coinlist,
    timeline: [{
            type: 'html-button-response',
            data: jsPsych.timelineVariable('data'),
            stimulus: function() {
                var html = '<table border="1" style="min-width: -webkit-fill-available;"><tbody><tr><th>收益表</th><th>国徽面</th><th>数字面</th></tr><tr><td>报告者</td><td>'+jsPsych.timelineVariable("s0")+'</td><td>'+jsPsych.timelineVariable("s1")+'</td></tr><tr><td>接收者（你）</td><td>'+jsPsych.timelineVariable("r0")+'</td><td>'+jsPsych.timelineVariable("r1")+'</td></tr></tbody></table><div id="euro" class="trans'+jsPsych.timelineVariable('data', true).face+'"><article class="back"></article><article class="middle" style="transform: translateZ(1px)"></article><article class="middle" style="transform: translateZ(2px)"></article><article class="middle" style="transform: translateZ(3px)"></article><article class="middle" style="transform: translateZ(4px)"></article><article class="middle" style="transform: translateZ(5px)"></article><article class="middle" style="transform: translateZ(6px)"></article><article class="middle" style="transform: translateZ(7px)"></article><article class="middle" style="transform: translateZ(8px)"></article><article class="middle" style="transform: translateZ(9px)"></article><article class="front"></article></div>';

                return html;
            },
            prompt: '你认为你的搭档将会报告哪一面',
            choices:['国徽面', '数字面'],
            button_html:'<button class="jspsych-btn">%choice%</button>'
        },
        {
            type: 'html-keyboard-response',
            stimulus: '继续……',
            choices: jsPsych.NO_KEYS,
            trial_duration: Math.floor(Math.random()*1000+1000),
        },
        ],
    // trial presentation
    randomize_order: true
}



/* Combine Timelines */

var demographics = {
    timeline: [
        Sex, Age,  School, Email,
    ]
}

/*var surveys = {
    timeline: [
        NameLiking, RSES, SWLS,
        debrief1,
    ]
}*/


var main_timeline = [
    set_html_style,
    open_fullscreen,
    welcome,
    /*warmup,
    demographics,*/
    cointrust,
    warmup,
    /*surveys,
    OpenEnded,*/
    close_fullscreen,
]


/* Launch jsPsych */

jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', `data_exp_demo_${subID}.csv`) // download from browser
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
    }
})