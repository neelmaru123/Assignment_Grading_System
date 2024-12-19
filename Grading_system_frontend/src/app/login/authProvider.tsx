
import { ReactNode, useState, createContext, useContext } from 'react';
import Login from '../page';
import { useRouter } from 'next/router';
import toast from "react-hot-toast";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    token: string | null;
    login: (loginData: any) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const router = useRouter();

    const login = async (loginData: any) => {
        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            })
            const resData = await res.json();

            const { data } = resData;
            localStorage.setItem('token', data)

            if (resData.success) {
                toast.success('Login Successfull');
                router.push("/");
            } else {
                alert("Invalid credentials");
            }

        }
        catch (e) {
            console.error(e);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;