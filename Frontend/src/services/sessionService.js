export class SessionService {
    static set(user) {
        localStorage.setItem('userLogged', user)
    }

    static get() {
        return localStorage.getItem('userLogged')
    }
}