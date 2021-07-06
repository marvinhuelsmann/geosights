import {useLoadSights} from "../../firebase";

export default {
    setup() {
        const sights = useLoadSights()
        return {
            sights
        }
    }
}