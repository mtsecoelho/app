import { LOG_IN, LOG_OUT } from "./actionTypes";

export const logIn = username => ({
    type: LOG_IN,
    username: username
})

export const logOut = () => ({
    type: LOG_OUT
})