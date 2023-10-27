import React, { useEffect, useState } from 'react';
import MQTT from 'react-mqtt';

const MQTTComponent = () => {
  const [messages, setMessages] = useState([]);

  const onMessageArrived = (message) => {
    console.log('Received message:', message.payloadString);
    setMessages((prevMessages) => [...prevMessages, message.payloadString]);
  };

  useEffect(() => {
    // 组件挂载时执行
    return () => {
      // 组件卸载时执行
    };
  }, []);

  return (
    <div>
      <MQTT
        url="mqtt://192.168.9.2:1883"
        topics={['/dev/from_esp32']}
        onMessage={onMessageArrived}
      />
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default MQTTComponent;
