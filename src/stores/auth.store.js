import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import {ref} from "vue";


export const useAuthStore = defineStore('authStore', () => {
    const token = ref(null);
    const session = ref(null);
    const user = ref(null);
    const isLoggedIn = ref(false);

    const login = async ({username, password}) => {
        const response = await axios.post('jwt/create/', {
            username: username,
            password: password
        }).catch(error => {
            console.log(error);
        });

        if (response?.status !== 200) {
            resetAuth();

            return false;
        }

        token.value = response.data;
        isLoggedIn.value = true;
        session.value = getSessionFromToken(token.value.access);
        localStorage.setItem('token', JSON.stringify(token.value));
        axios.defaults.headers.common['Authorization'] = 'JWT ' + token.value.access;
        await getUser();

        return true;
    }

    const loginFromSession = async () => {
        if (isLoggedIn.value && user.value && isAuthenticated()) {
            return true;
        }

        const localToken = JSON.parse(localStorage.getItem('token')) || null;

        console.log(localToken);
        if (! localToken?.access || checkIsTokenExpired(localToken.access)) {
            resetAuth();

            return false;
        }

        token.value = localToken;
        session.value = getSessionFromToken(token.value.access);
        axios.defaults.headers.common['Authorization'] = 'JWT ' + token.value.access;
        isLoggedIn.value = await getUser();

        return isLoggedIn.value;
    }

    const logout = () => {
        resetAuth();
        router.push('/login');
    }

    const createAccount = async ({username, email, password, rePassword}) => {
        return null
    }

    const isTokenExpired = () => {
        return token?.access && Math.floor(new Date().getTime() / 1000) >= session.value?.exp;
    }

    const isAuthenticated = () => {
        return isLoggedIn.value && ! isTokenExpired();
    }

    const getUser = async () => {
        const response = await axios.get('users/me/');

        if (response?.status !== 200) {
            resetAuth();
            return false;
        }

        user.value = response.data;

        return true;
    }

    const resetAuth = () => {
        token.value = null;
        session.value = null;
        user.value = null;
        isLoggedIn.value = false;
        localStorage.removeItem('token');
    }

    const getSessionFromToken = (localToken) => {
        let base64Url = localToken.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    const checkIsTokenExpired = (localToken) => {
        if (! localToken) {
            return false;
        }
        const localSession = getSessionFromToken(localToken);

        return localSession?.access && Math.floor(new Date().getTime() / 1000) >= localSession?.exp;
    }

    return { login, loginFromSession, logout, createAccount, getUser, isTokenExpired, isAuthenticated, token, session, user, isLoggedIn };
})
