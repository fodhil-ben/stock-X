import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

console.log('env:', import.meta.env.A);
console.log('Pusher Key:', import.meta.env.VITE_REVERB_APP_KEY);
console.log('Pusher Host:', import.meta.env.VITE_REVERB_HOST);
console.log('Pusher Port:', import.meta.env.VITE_REVERB_PORT);
console.log('Pusher Scheme:', import.meta.env.VITE_REVERB_SCHEME);


window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});
