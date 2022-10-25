import  firebase  from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBTd1fBPCC68vwSABUUSlOpzWXto2jp5H0",
  authDomain: "testphp-d3f2c.firebaseapp.com",
  databaseURL: "https://testphp-d3f2c-default-rtdb.firebaseio.com",
  projectId: "testphp-d3f2c",
  storageBucket: "testphp-d3f2c.appspot.com",
  messagingSenderId: "464281819500",
  appId: "1:464281819500:web:a5b8c5ccc523ab4e503b49"
};

 const app = firebase.initializeApp(firebaseConfig)
  // eslint-disable-next-line no-console
 


  export const db = app.database()

   let requests = db.ref('requests')  
   let notificatons = db.ref('orders')  
   let ordersNotification = db.ref('notification')  

   export const notifications = requests
   export const newRequest = notificatons
   export const Onotify = ordersNotification