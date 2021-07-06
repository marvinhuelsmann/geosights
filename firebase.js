import firebase from 'firebase'
import {ref, onUnmounted} from "vue";

const firebaseConfig = {
    apiKey: "AIzaSyAqILfnF8tzoBx1ofE5BWtUtMs8cuHtYgY",
    authDomain: "geosights-afa5b.firebaseapp.com",
    projectId: "geosights-afa5b",
    storageBucket: "geosights-afa5b.appspot.com",
    messagingSenderId: "985479079486",
    appId: "1:985479079486:web:a1a1915d051be15f23936f",
    measurementId: "G-N0XGRPG4HK"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
firebase.analytics();

const db = firebaseApp.firestore()
const userCollection = db.collection('user')

export const createUser = user => {
    return userCollection.add(user)
}

export const getUser = async id => {
    const user = await userCollection.doc(id).get()
    return user.exists
        ? user.data()
        : null
}

export const updateUser = (id, user) => {
    return userCollection.doc(id)
        .update(user)
}

export const deleteUser = id => {
    return userCollection.doc(id).delete()
}

export const useLoadUsers = () => {
    const users = ref([])
    const close = userCollection.onSnapshot(snapshot => {
        users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return users
}

