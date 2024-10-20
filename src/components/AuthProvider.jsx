import React, { useState, useEffect, useLayoutEffect, createContext, useContext } from "react";
import { authenticate, api } from "../services/Apis";

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
};

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem("authToken"));
    const [expires, setExpires] = useState(parseInt(sessionStorage.getItem("authTokenExpiry"), 10));

    // useEffect(() => {
    //     const fetchToken = async () => {
    //         try {
    //             const response = await authenticate();
    //             setToken(response.data.jwtToken);
    //             setExpires(new Date(response.data.expires).getTime());
    //         } catch {
    //             setToken(null);
    //         }
    //     };

    //     if (!token || Date.now() >= expires) {
    //         fetchToken();
    //     }
    // }, [expires]);

    useEffect(() => {
        if (!expires) return;

        const currentTime = Date.now();
        const timeUntilExpiry = expires - currentTime;

        if (timeUntilExpiry > 0) {
            const timer = setTimeout(async () => {
                try {
                    const response = await authenticate();
                    setToken(response.data.jwtToken);
                    setExpires(new Date(response.data.expires).getTime());
                } catch {
                    setToken(null);
                }
            }, timeUntilExpiry);

            return () => clearTimeout(timer);
        }
    }, [expires]);

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization = !config._retry && token
                ? `Bearer ${token}`
                : config.headers.Authorization;
            return config;
        });

        return () => {
            api.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
