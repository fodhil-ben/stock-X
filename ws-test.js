const ws = new WebSocket('ws://127.0.0.1:8001/app/4msegpdlcz3xebbbhnpt?protocol=7&client=js&version=8.4.0-rc2&flash=false');

ws.onopen = () => {
    console.log('WebSocket connection opened');
};

ws.onmessage = (event) => {
    console.log('Message received:', event.data);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
};
