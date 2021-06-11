/**
 * Author:
 * Bao H.-W.-S. (https://psychbruce.github.io)
 */


/* Custom JS Functions */

// NOTE: When using JS functions, parameters should be defined in order!

function keyCode(character) {
    return jsPsych.pluginAPI.convertKeyCharacterToKeyCode(character)
}

function inputDialog(title, default_text) {
    var input = prompt(msg = title, defaultText = default_text)
    return input
}

/*function countdown(){
    var a = document.getElementById('timelimit');
    var minutes = Math.floor(mt/60);
    var seconds = Math.floor(mt%60);
    var str = '剩余时间：'+minutes+'分'+seconds+'秒';
    a.innerHTML=str;
    --mt;
    if (mt<=0) {
        clearInterval(timelimit);
        alert("时间到，当前测验已结束！确定以继续实验流程，谢谢。")
        jsPsych.finishTrial(trial_data);
    } 
}*/
//survey text 字数限制
function word_length(ws) {
    var n = document.querySelector("#input-0").textLength;
    var btn = document.querySelector("#jspsych-survey-text-next")
    if(n<ws){
      btn.disabled = true;
      } else {
      btn.disabled = false;
      }
}

function timer() {
    var second = document.getElementById('timer')
    var button = document.getElementsByClassName('jspsych-btn')[0]
    if (second != null) {
        if (second.innerHTML > 1) {
            second.innerHTML = second.innerHTML - 1
        } else {
            button.innerHTML = '继续'
            button.disabled = false
        }
    }
}

function addRespFromButton(data) {
    // compute variables from button-plugin response (for simple item)
    data.response = parseInt(data.response) + 1 // raw: 0, 1, 2, ...
}

function addRespFromButtonScale(data, scale_name, var_i = 'i') {
    // compute variables from button-plugin response (for likert scale)
    data.scale = scale_name
    data.varname = scale_name + data[var_i]
    data.response = parseInt(data.response) + 1 // raw: 0, 1, 2, ...
}

function replaceComma(data, sep = '|') {
    // only for single response ('Q0' in survey-plugin responses)
    data.response = String(JSON.parse(data.response).Q0).split(',').join(sep)
}

function setSliderAttr(event = 'onchange') {
    document.getElementById('jspsych-html-slider-response-response').setAttribute(event, 'addSliderValue()')
}

function addSliderValue(element_id = 'slider-value') {
    var sss = (parseInt(document.getElementById('jspsych-html-slider-response-response').value)-1)
    document.getElementById(element_id).innerHTML = document.getElementsByTagName('span')[sss].getAttribute('value')
    document.getElementById('jspsych-html-slider-response-next').disabled = false
}

function MEAN(scale_name, rev = [0], likert = [1, 7], var_i = 'i', var_response = 'response') {
    var df = jsPsych.data.get().filter({ scale: scale_name }).values() // raw data array (modifiable)
    var sum = 0
    for (var i in df) { // or: for (var i = 0; i < df.length; i++) {...}
        // df[i][j] or df[i]['varname'] or df[i].varname
        if (rev.includes(df[i][var_i]) == false) {
            sum += df[i][var_response]
        } else {
            sum += likert[0] + likert[1] - df[i][var_response]
        }
    }
    return sum / df.length
}


function start()
{
     document.getElementById("jspsych-html-button-response-btngroup").classList.add("disable");
     document.getElementById("jspsych-html-button-response-btngroup").value = 5;
     window.setTimeout("tick()",1000);
}
function tick()
{
    var time = new Number(document.getElementById("jspsych-html-button-response-btngroup").value);
     if(time>0)
     {
         document.getElementById("jspsych-html-button-response-btngroup").value = time-1;
         window.setTimeout("tick()",1000);
     }
     else
     {
         document.getElementById("jspsych-html-button-response-btngroup").classList.remove("disable");
     }
}


/* JS Functions from the R package 'jspsychr' */

save_locally = function() {
    var data = jsPsych.data.get().csv()
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'submit')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ filedata: data }))
};