export class SessionService {
    static set(user) {
        localStorage.setItem('userLogged', JSON.stringify(user))
    }

    static get() {
        return JSON.parse(localStorage.getItem('userLogged'))
    }
    static remove() {
        localStorage.removeItem('userLogged')
    }
}