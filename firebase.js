import firebase from 'firebase/app'
import 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';        // for authentication
import 'firebase/firestore';   // for cloud firestore
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
export const sightCollection = db.collection('sights')
export const gameStatisticCollection = db.collection('statistics')

export const createGameStatistic = user => {
    return gameStatisticCollection.add(user)
}

export const getSight = async id => {
    const sight = await sightCollection.doc(id).get()
    return sight.exists
        ? sight.data()
        : null
}

export const getStatistic = async id => {
    const allUserStatistic = await gameStatisticCollection.doc(id).get()
    return allUserStatistic.exists
        ? allUserStatistic.data()
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
    // eslint-disable-next-line no-unused-vars
    let count = 0;
    const users = ref([])
    const close = sightCollection.onSnapshot(snapshot => {
            users.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            users.value = users.value.splice(0, 6)
    })
    onUnmounted(close)
    return users
}

export const getRandomSight = () => {
    const user = ref([])
    const close = sightCollection.onSnapshot(snapshot => {
        const allSights = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        user.value = allSights[Math.floor(Math.random() * allSights.length)]
    })
    onUnmounted(close)
    return user
}
