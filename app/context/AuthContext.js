import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create InfoContext using the Context API
const AuthContext = createContext();

// InfoContext provider component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); 
 

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
            console.log('Logging in user:', { email, password });
            const res = await axios.post('https://queue-app-express-js.onrender.com/api/v1/auth/login', {
                email,
                password,
            });

            const user = res.data;
            setAuth(user);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            return { success: true };
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    // 🧾 Register function
    const register = async (name, email, password) => {
        console.log('Registering user:', { name, email, password });
        try {
            const res = await axios.post('https://queue-app-express-js.onrender.com/api/v1/auth/register', {
                name,
                email,
                password,
            });

            const user = res.data;
            setAuth(user);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            return { success: true };
        } catch (error) {
            console.log('Register error:', error.response?.data || error.message);
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    // 🚪 Logout function
    const logout = async () => {
        try {
            setAuth(null);
            await AsyncStorage.removeItem('user');
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error.message);
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
