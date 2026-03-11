import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from '../axios';
export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));
    const user = ref(null);
    const isAuthenticated = computed(() => !!token.value);
    const login = async (username, password) => {
        try {
            const response = await axios.post('/auth/login', { username, password });
            token.value = response.data.token;
            localStorage.setItem('token', token.value || '');
            user.value = { username };
            localStorage.setItem('user', JSON.stringify(user.value));
        }
        catch (error) {
            throw new Error(`Login failed! ${error}`);
        }
    };
    const register = async (username, password) => {
        try {
            const response = await axios.post('/auth/register', { username, password });
            token.value = response.data.token;
            localStorage.setItem('token', token.value || '');
            user.value = { username };
            localStorage.setItem('user', JSON.stringify(user.value));
        }
        catch (error) {
            throw new Error(`Register failed! ${error}`);
        }
    };
    const logout = () => {
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    const initUser = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                user.value = JSON.parse(storedUser);
            }
            catch {
                user.value = null;
            }
        }
    };
    initUser();
    return {
        token,
        user,
        isAuthenticated,
        login,
        register,
        logout
    };
});
