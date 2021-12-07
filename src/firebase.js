import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// firebase config
const config = {
  apiKey: 'AIzaSyC-ZmPMnWgNDOVr34SQdMilwJWSI9yhQ9w',
  authDomain: 'ecommerce-72937.firebaseapp.com',
  projectId: 'ecommerce-72937',
  messagingSenderId: '693094425114',
  appId: '1:693094425114:web:cf30dfe7f7520cdcb267a3',
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
