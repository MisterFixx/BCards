import JwtDecode from "jwt-decode";
const TOKEN = "token";

export const setTokenInLocalStorage = (encryptedToken) => localStorage.setItem(TOKEN, encryptedToken);

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getToken = () => localStorage.getItem(TOKEN);

export const getUser = () => {
    try {
        const user = localStorage.getItem(TOKEN);
        return JwtDecode(user);
    }
    catch (error) {
        return null;
    }
}

export const loginFailed = () => {
    let failedLogins = JSON.parse(localStorage.getItem("failed-logins")) || [];

    failedLogins.push(Date.now());

    localStorage.setItem("failed-logins", JSON.stringify(failedLogins));

    return hasLoginLimitExceeded();
}

export const hasLoginLimitExceeded = () => {
    let failedLogins       = JSON.parse(localStorage.getItem("failed-logins")) || [];
    var twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
    let recentFailedLogins = 0;

    for(let failedLogin of failedLogins){
        if(failedLogin > twentyFourHoursAgo){
            recentFailedLogins++;
        }
    }

    return recentFailedLogins >= 3;
}

export const clearFailedLogins = () => {
    localStorage.setItem("failed-logins", "[]");
}