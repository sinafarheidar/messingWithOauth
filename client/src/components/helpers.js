import cookie from 'js-cookie';

// Set Token in the Browser's Cookie (Key = Name of Item saved, Value is the token)
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

// Remove Token from Cookie
export const removeCookie = (key) => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

// Get Token from Cookie...useful for when we need to make request to server with token
export const getCookie = (key) => {
    if (window !== 'undefined') {
        return cookie.get(key)
    }
}

// Set User in Local Storage
export const setUser = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// Remove User from Local Storage
export const removeUser = (key) => {
    if (window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

// Authenticate User by passing data to Cookie and Local Storage during Sign in
export const authenticateUser = (res, next) => {

    // We know res.data from console.logging in the front end (See signin.js Line 34 ;) )
    setCookie('token', res.data.token)
    setUser('user', res.data.user)
    next()
}

// Access User Info from Local Storage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token')

        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}

// Sign Out
export const signOut = (next) => {
    removeCookie('token')
    removeUser('user')
    next()
}