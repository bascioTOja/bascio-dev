import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";


export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            const response = await axios.post('v1/jwt/create/', {
                username: username,
                password: password
            })
            this.token = response.data;

            localStorage.setItem('token', JSON.stringify(this.token));

            router.push(this.returnUrl || '/')
        },
        logout() {
            console.log('asd')
            this.token = null;
            localStorage.removeItem('token');
            router.push('/login')
        }
    }
})
