// eslint-disable-next-line no-unused-vars
import {sightCollection, createGameStatistic} from "../../firebase.js"
import firebase from "firebase";
import {store} from "../store";
import {onUnmounted, ref} from "vue";

/* All Sights that have been already seen */
const alreadySee = []
/* active Endpoints */
let activePoints = 0
/* The number of how many sights you must to see */
/* default size: 8 */
let maxSights = 8

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const mathRandomSight = () => {
    const user = ref([])
    const close = sightCollection.onSnapshot(snapshot => {
        let allSights = snapshot.docs.map(doc => (
            {id: doc.id, ...doc.data()}))

        /*  */
        allSights = shuffle(allSights).splice(0, maxSights)

        /* Removing sights that are already have been seen */
        const namesToDeleteSet = new Set(alreadySee);
        const filterSights = allSights.filter((name) => {
            // return those elements not in the namesToDeleteSet
            return !namesToDeleteSet.has(name.name);
        });


        /* Check if all sights have been seen */
        if (alreadySee.length < maxSights) {
            /* Getting new sight */
            user.value = filterSights[Math.floor(Math.random() * filterSights.length)]
            console.log(user.value)

            /* Adding old sight into alreadySee */
            const target = Object.assign({}, user.value);
            alreadySee.push(target.name)
        } else {
            /* Adding GameStatistics */
            createGameStatistic({
                id: store.state.googleUser.id,
                date: Date.now(),
                name: store.state.googleUser.name,
                points: activePoints,
                sights: maxSights
            }).then(r => {
                /* Redirecting, because all sights have been seeing */
                window.location.href = '/finish?id=' + r.id
            })

        }
    })
    onUnmounted(close)
    return user
}

export default {
    data() {
        return {
            displayName: localStorage.getItem('name'),
            isLoggedIn: false,
            name: '',
            hasFinished: false,
            gameState: {
                gameSizes: [5, 8, 10],
                hasChooseGameSize: false,
                alreadySeeSights: -1,
                points: 0
            },
            sight: {
                id: null,
                name: null,
                image: null,
                place: null,
                points: 0
            }
        }
    },
    methods: {
        setGameSize(size) {
            /* Set the max size of sights */
            this.gameState.hasChooseGameSize = true
            maxSights = size
        },
        submitForm(e) {
            e.preventDefault(true);
            if (this.name === this.sight.name) {
                /* Counting, because its the truth */
                this.gameState.points = this.gameState.points + this.sight.points;
                activePoints = this.gameState.points
            }
            /* Moving the Sight */
            this.moveSight()
        },
        moveSight() {
            /* Loading new Sight from an random Sight list*/
            this.sight = mathRandomSight()
            this.gameState.alreadySeeSights++;
            this.name = ''
        },
        signInWithGoogle() {
            /* sign in with google Popover */
            if (store.state.googleUser.name === null) {
                window.location.href = '../'
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
        /* Get the first sight */
        this.moveSight()
        /* Check if the session is valid */
        if (store.mutations.isInSession()) {
            this.isLoggedIn = true
        } else {
            this.isLoggedIn = false
            this.signInWithGoogle()
        }
    },
    computed: {
        /* Get the Google username */
        userDisplayName() {
            if (this.displayName !== null) {
                return this.displayName
            } else {
                return "Mit Google anmelden"
            }
        }
    }
}