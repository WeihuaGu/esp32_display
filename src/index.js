import { Client } from 'paho-mqtt';
// 消息列表
const messageList = [];
// 更新消息列表显示
function updateMessageList() {
  const messageListElement = document.getElementById('message-list');
  messageListElement.innerHTML = '';
  for (const message of messageList) {
    const messageElement = document.createElement('li');
    messageElement.textContent = message;
    messageListElement.appendChild(messageElement);
  }
  // 自动滚动到最新消息
  messageListElement.scrollTop = messageListElement.scrollHeight;
}


// 创建 MQTT 客户端
const client = new Client('192.168.9.2',1884, 'clientId');

function onConnect(){
  console.log('Connected to MQTT broker');
  client.subscribe('/dev/from_esp32');
}
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  // 添加消息到列表
  messageList.push(message.payloadString);
  // 更新消息列表显示
  updateMessageList();
}
// 连接到 MQTT 代理服务器
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});
