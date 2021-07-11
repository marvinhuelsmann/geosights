export const store = {
    state: {
        googleUser: {
            id: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token')
        }
    },
    mutations: {
        SET_USER(id, name, email, token) {
            localStorage.setItem('id', id)
            localStorage.setItem('name', name)
            localStorage.setItem('email', email)
            localStorage.setItem('token', token)
        },
        REMOVE_USER() {
            localStorage.removeItem('id')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            localStorage.removeItem('token')
        },
        isInSession() {
            const headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("grant_type", "refresh_token");
            urlencoded.append("refresh_token", store.state.googleUser.token);

            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: urlencoded,
                redirect: 'follow'
            };

            let isVerify = false;

            fetch("https://securetoken.googleapis.com/v1/token?key=AIzaSyAqILfnF8tzoBx1ofE5BWtUtMs8cuHtYgY", requestOptions)
                .then(response => response.text())
                .then(result => {
                    if (JSON.parse(result)['user_id'] === store.state.googleUser.id) {
                        isVerify = true;
                        return true;
                    } else store.mutations.REMOVE_USER()
                })
                .catch(() => {
                    store.mutations.REMOVE_USER()
                    return false;
                })

            return isVerify
        }
    }
}