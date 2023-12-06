import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCiThpa46AF2O0G8j7PwMMWb_rimnKFdhs',
  authDomain: 'singkat-app.firebaseapp.com',
  projectId: 'singkat-app',
  storageBucket: 'singkat-app.appspot.com',
  messagingSenderId: '26856397370',
  appId: '1:26856397370:web:6a740c17310a30efc5f303',
  measurementId: 'G-3E24YK6B8Z',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
