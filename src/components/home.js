import {useLoadSights} from "../../firebase";
import firebase from "firebase";
import {store} from "../store";

export default {
    setup() {
        const sights = useLoadSights()
        return {
            sights
        }
    },
    data() {
        return {
            displayName: localStorage.getItem('name')
        }
    },
    methods: {
        signInWithGoogle() {
            if (store.state.googleUser.name === null) {
                const provider = new firebase.auth.GoogleAuthProvider()
                firebase.auth().signInWithPopup(provider).then(user => {
                    const googleUser = user.user
                    store.mutations.SET_USER(
                        googleUser.uid,
                        googleUser.displayName,
                        googleUser.email,
                        googleUser.refreshToken)

                    this.displayName = googleUser.displayName

                }).catch(error => {
                    console.log(error)
                })
            } else {
                window.location.href = "/dashbord/home"
            }
        }
    },
    mounted() {
        store.mutations.isInSession()
    },
    computed: {
        userDisplayName() {
            if (this.displayName !== null) {
                return this.displayName
            } else {
                return "Mit Google anmelden"
            }
        }
    }
}