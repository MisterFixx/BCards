import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../providers/UserProvider";
import useAxios from "../../cards/hooks/useAxios";
import { login, signup } from "../services/usersApiService";
import { getUser, removeToken, setTokenInLocalStorage, loginFailed, hasLoginLimitExceeded, clearFailedLogins } from "../services/localStorageService";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnackbar } from "../../providers/SnackbarProvider";

const useUsers = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const snack = useSnackbar();
    const { user, setUser, setToken } = useUser();

    useAxios();

    const requestStatus = useCallback(
        (loading, errorMessage, users, user = null) => {
            setLoading(loading);
            setError(errorMessage);
            setUsers(users);
            setUser(user);
        }, [setUser]
    );

    const handleLogin = useCallback(async (user) => {
        if(!hasLoginLimitExceeded()){
            try {
                const token = await login(user);
                setTokenInLocalStorage(token);
                setToken(token);
                const userFromLocalStorage = getUser();
                requestStatus(false, null, null, userFromLocalStorage);
                clearFailedLogins();
                navigate(ROUTES.CARDS);
            }
            catch (error) {
                if(error.response?.data === "Authentication Error: Invalid email or password"){
                    let failedLogins = loginFailed(); //this increments the count and then returns it

                    if(failedLogins >= 3){
                        snack("You have exceeded the daily failed login limit, try again in 24 hours.", "error");
                    }
                }
                else{
                    requestStatus(false, error.message, null);
                }
            }
        }
        else{
            snack("You have exceeded the daily failed login limit, try again in 24 hours.", "error");
        }
    }, [navigate, requestStatus, setToken, snack]);

    const handleLogout = useCallback(() => {
        removeToken();
        setUser(null);
    }, [setUser]);

    const handleSignup = useCallback(
        async (userFromClient) => {
            try {
                const normalizedUser = normalizeUser(userFromClient);
                await signup(normalizedUser);
                await handleLogin({
                    email: userFromClient.email,
                    password: userFromClient.password,
                });
            } catch (error) {
                requestStatus(false, error.message, null);
            }
        }, [requestStatus, handleLogin]
    );

    return {
        handleLogin,
        handleLogout,
        handleSignup,
        users,
        isLoading,
        error,
        user,
    }
};

export default useUsers;
