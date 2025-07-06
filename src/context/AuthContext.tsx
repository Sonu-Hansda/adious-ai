import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

interface User {
    username: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string): boolean => {
        if (email === 'admin@mail.com' && password === 'admin') {
            setUser({ username: 'admin', role: 'administrator' });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};