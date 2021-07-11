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
const sightCollection = db.collection('sights')

export const createSight = user => {
    return sightCollection.add(user)
}

export const getSight = async id => {
    const sight = await sightCollection.doc(id).get()
    return sight.exists
        ? sight.data()
        : null
}

export const updateSight = (id, user) => {
    return sightCollection.doc(id)
        .update(user)
}

export const deleteSight = id => {
    return sightCollection.doc(id).delete()
}

export const useLoadSights = () => {
    const users = ref([])
    const close = sightCollection.onSnapshot(snapshot => {
        users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return users
}

