import { LOG_IN, LOG_OUT } from "./actionTypes";

export const logIn = user => ({
    type: LOG_IN,
    user: user
})

export const logOut = () => ({
    type: LOG_OUT
})