let socket = new WebSocket('ws://192.168.1.208:8081/');

socket.onopen = wscConnected;
socket.onmessage = wscReceived;
socket.onclose = wscDisconnected;
let input = document.getElementsByTagName('textarea')[0];
let formContainer = document.getElementById('form_container');
let msgContainer = document.getElementById('msg_container');
let sendBtn = document.getElementsByTagName('button')[0];

sendBtn.addEventListener('click', () => {
    let toSend = input.value;
    sendMessage(toSend);
});

function wscConnected (ws) {
    console.log('wsc connected :)');
}

function wscReceived (msg) {
    msg.data.text().then(text => renderMessage(text, 'in'))   
}

function wscDisconnected () {
    console.log('wsc disconnected :(');
}

function sendMessage (text) {
    socket.send(text);
    renderMessage(text, 'out');
    input.value = '';
}

function renderMessage (text, direction) {
    let msg = document.createElement('div');
    msg.className = `msg ${{in: 'l', out: 'r'}[direction]}`;
    msg.innerText = text;
    msgContainer.appendChild(msg);
    let lastMsg = document.querySelector(".msg:last-child");
    let rect = lastMsg.getBoundingClientRect();
    if (rect.bottom > screen.height - formContainer.offsetHeight) {
        msgContainer.style.paddingBottom = formContainer.offsetHeight;
    }
}

window.addEventListener('load', () => {
    document.styleSheets[0].insertRule(`.msg_container::-webkit-scrollbar-track-piece:start { margin-top: ${10 + document.getElementById('form_container').offsetHeight}px; }`, 0);
})