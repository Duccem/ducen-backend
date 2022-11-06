/* eslint-disable no-unused-vars */
let messaging = null;
try {
  if (typeof importScripts === 'function') {
    importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
    firebase.initializeApp({
      apiKey: 'AIzaSyCilxE4LWycy3kihxRsxrGosXLuSFGl_Qc',
      authDomain: 'ducen-1d5a5.firebaseapp.com',
      projectId: 'ducen-1d5a5',
      storageBucket: 'ducen-1d5a5.appspot.com',
      messagingSenderId: '855370219440',
      appId: '1:855370219440:web:4b6594f21318790cf66075',
    });
    messaging = firebase.messaging();
    messaging.bgMessageHandler = (payload) => {
      console.log('On bg:', payload);
    };
  }
} catch (error) {
  console.error(error);
}
