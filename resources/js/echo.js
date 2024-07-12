import Echo from 'laravel-echo';

// import dotenv

import Pusher from 'pusher-js';
window.Pusher = Pusher;

console.log('env:', process.env);
console.log('Pusher Key:', process.env.VITE_REVERB_APP_KEY);
console.log('Pusher Host:', process.env.VITE_REVERB_HOST);
console.log('Pusher Port:', process.env.VITE_REVERB_PORT);
console.log('Pusher Scheme:', process.env.VITE_REVERB_SCHEME);


window.Echo = new Echo({
    broadcaster: 'reverb',
    key: process.env.VITE_REVERB_APP_KEY,
    wsHost: process.env.VITE_REVERB_HOST,
    wsPort: process.env.VITE_REVERB_PORT ?? 80,
    wssPort: process.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (process.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});
