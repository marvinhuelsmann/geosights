import firebase from "firebase";
import {getStatistic} from "../../firebase";
import {store} from "../store";


export default {
    data() {
        return {
            displayName: localStorage.getItem('name'),
            isLoggedIn: false,
            statisticId: new URLSearchParams(window.location.search).get('id'),
            statistic: {
                id: null,
                name: "Max Mustermann",
                points: 100,
                date: null,
                sights: 6
            }
        }
    },
    methods: {
        getStatistics() {
            /* Get current statistic */
            getStatistic(
                this.statisticId).then(r => {
                this.statistic = r
                if (this.statistic.id === store.state.googleUser.id) {
                    console.log(r)
                } else {
                    this.statistic = null;
                    window.location.href = "../"
                    console.log("not the same id as you user Acoount!")
                }
            }).catch(e => console.log(e))
        },
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
                    this.isLoggedIn = true

                }).catch(error => {
                    console.log(error)
                })
            } else this.isLoggedIn = true;
        }
    },
    mounted() {
        this.getStatistics()
        if (store.mutations.isInSession()) {
            this.isLoggedIn = true
        } else {
            this.isLoggedIn = false
            this.signInWithGoogle()
        }
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