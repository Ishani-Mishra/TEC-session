import axios from 'axios';

const userUrl = 'http://localhost:4000/account';
const adUrl = 'http://localhost:4000/ads'

export const signupNewUser = (user) => axios.post(`${userUrl}/signup`, user);
export  const signinExistingUser = (user) => axios.post(`${userUrl}/signin`, user);

export const getUserDetails = (token) => axios({
    method: "GET",
    url: `${userUrl}/verify/user`,
    headers: {
        Authorization: `BEARER ${token}`,
    },
});

export const getAllAds = () => axios({
    method: "GET",
    url: `${adUrl}/display/all`
});

export const getUserAds = (userid, token) => axios({
    method: "GET",
    url: `${adUrl}/display/user=${userid}`,
    headers: {
        Authorization: `BEARER ${token}`,
    },
});

export const composeAd = (adDetails, token) => axios.post(`${adUrl}/compose`, adDetails, 
    {
        headers: {
            Authorization: `BEARER ${token}`,
        }
    }
);

export const deleteAd = (adid, token) => axios.post(`${adUrl}/delete/blog=${adid}`, null, 
    {
        headers: {
            Authorization: `BEARER ${token}`,
        }
    }
);


