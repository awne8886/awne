let regExp = /[a-zA-Z]/i;
function nextChar(c) {
  if ( regExp.test(c) ) {
    var res = c == 'z' ? 'a' : c == 'Z' ? 'A' : String.fromCharCode(c.charCodeAt(0) + 1);
    return res;
  } else {
    return c;
  }
}
function generateString(offset, input) {
  let result;
  let currentCharacter = 0;
  let c = input[currentCharacter];
  for ( let i = 0; i < input.length; i++ ) {
    let tbaTemp = nextChar(input[currentCharacter]);
    if ( Math.sign(offset) === -1 ) {
      for ( let i = 0; i < offset - 1; i++ ) {
        tbaTemp = lastChar(tbaTemp);
      }
    } else {
      for ( let i = 0; i < offset - 1; i++ ) {
        tbaTemp = nextChar(tbaTemp);
      }
    }
    result += tbaTemp;
    currentCharacter = currentCharacter + 1;
  }
  return result.substring(9);
}

function start(offsetSetting, textSetting) {
  const raw = (generateString(offsetSetting, textSetting));
  const str = raw;
  const text = document.querySelector(".text");
  const input = document.querySelector(".input");
  content = str;
  function populateText(str) {
      let span = document.createElement("span");
      span.setAttribute("id", "result");
      span.innerText = str;
      text.appendChild(span);
  }
  populateText(str);
}

function updateSettings() {
  if (document.getElementById("offsetInput").value.length === 0) {
    window.alert('You didn\'t provide any valid offset input in the box, so I\'ve used the default 13 letter offset on your string.');
    start(3);
  } else {
    let settingOffset = document.getElementById("offsetInput").value;
    let settingText = document.getElementById("textInput").value;
    start(settingOffset, settingText);
  }
}

function viewRaw() {
  content = document.getElementById("result").innerText;
  let rawWindow = window.open("","");
  rawWindow.document.write(content);
}

function copyResult() {
  const copyText = document.getElementById("result").innerText;
  navigator.clipboard.writeText(copyText);
}

function loadPremade() {
  selectElement = document.querySelector('#premadeModes');
  output = selectElement.value;
  if (output == "none") {
    document.getElementById("offsetInput").value = none[0];
    document.getElementById("textInput").value = none[1];
  }
  if (output == "caesar") {
    document.getElementById("lengthInput").value = caesar[0];
    document.getElementById("textInput").value = caesar[1];
  }
}

document.getElementById('premadeModes').addEventListener('change', function() {
  loadPremade();
});

//-----PREMADE SETTINGS DEFAULTS-----//

const none = ["", "", ""];
const caesar = ["13", ""];

//-----PREMADE SETTINGS DEFAULTS-----//

let dark = 1;
function updateTheme() {
  var r = document.querySelector(':root');
  if (dark == 1) {
    r.style.setProperty('--quietmidnight', '#DFDFFF');
    r.style.setProperty('--hackergreen', '#000');
    dark = 0;
  } else {
    r.style.setProperty('--quietmidnight', '#060710');
    r.style.setProperty('--hackergreen', '#12ee24');
    dark = 1;
  }
}