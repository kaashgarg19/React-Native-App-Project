import * as firebase from 'firebase/app'

var firebaseConfig = {
  apiKey: "AIzaSyBwrADfIEGvoZXt_Cijzc79m22qArAlx8M",
  authDomain: "blooddonation-83d0a.firebaseapp.com",
  databaseURL: "https://blooddonation-83d0a.firebaseio.com",
  projectId: "blooddonation-83d0a",
  storageBucket: "blooddonation-83d0a.appspot.com",
  messagingSenderId: "179494511912",
  appId: "1:179494511912:web:3272be5307a3f0bb149c1d"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app;

