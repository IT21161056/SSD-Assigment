import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [userDetails, setUserDetails] = useState(() => {
        const savedUserDetails = sessionStorage.getItem("userDetails");
        return savedUserDetails ? JSON.parse(savedUserDetails) : [];
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const savedIsAuthenticated = sessionStorage.getItem("isAuthenticated");
        return savedIsAuthenticated === "true";
    });

    const [userName, setUserName] = useState(() => {
        return sessionStorage.getItem("userName") || "";
    });

    useEffect(() => {
        sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
        sessionStorage.setItem("isAuthenticated", isAuthenticated.toString());
        sessionStorage.setItem("userName", userName);
    }, [userDetails, isAuthenticated, userName]);

    return (
        <AuthContext.Provider
            value={{ userDetails, setUserDetails, isAuthenticated, setIsAuthenticated, userName, setUserName }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
