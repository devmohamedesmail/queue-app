import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'toastify-react-native';
import { useTranslation } from 'react-i18next';
import { api } from '../config/api';








const AuthContext = createContext();

// InfoContext provider component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); 
    const {t}=useTranslation()

     // Load auth from storage on app start
     useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setAuth(JSON.parse(userData));
                }
            } catch (err) {
                console.error('Failed to load user from storage', err);
            }
        };
        loadUser();
    }, []);



      // 🔐 Login function
      const login = async (email, password) => {
        try {
            
            const res = await axios.post(`${api.url}api/v1/auth/login`, {
                email,
                password,
            });

            const user = res.data;
            setAuth(user);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            return { user: user };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    // 🧾 Register function
    const register = async (name, email, password) => {
      
        try {
            const res = await axios.post(`${api.url}api/v1/auth/register`, {
                name,
                email,
                password,
            });

            const user = res.data;
            setAuth(user);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            console.log('Registered user:', user);
            return { user: user };
        } catch (error) {
            console.log('Register error from context:', error.response?.data || error.message);
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    // 🚪 Logout function
    const logout = async () => {
        try {
            setAuth(null);
            await AsyncStorage.removeItem('user');
            Toast.show({
                type: 'success',
                text1: t('logout-success'),
                visibilityTime: 3000,
                position: 'top',
            })
            return { success: true };
        } catch (error) {
            console.log('Logout error:', error.message);
            return { success: false, error: 'Logout failed' };
        }
    };


    return (
        <AuthContext.Provider value={{ auth, setAuth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
