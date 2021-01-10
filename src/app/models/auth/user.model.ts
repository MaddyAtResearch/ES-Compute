class User {
    id: number
    username: string
    email: string
}

export class AuthUser {
    user: User
    token: string
    constructor(token: string, user: User) {
        this.token = token
        this.user = user
    }

    getToken() {
        if (!!this.token) {
            return this.token
        }
        else {
            return null
        }
    }
}