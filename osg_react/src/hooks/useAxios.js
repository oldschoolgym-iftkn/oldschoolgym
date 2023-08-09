import axios from '../api/axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const REFRESH_URL = '/user/api/token/refresh/';
const useAxios = () => {
	const { auth, logOutUser, loadUserProfile, setAuth, setUser } = useContext(AuthContext);
	if (auth) {
		const axiosProtected = axios.create({
			baseURL: process.env.REACT_APP_API_URL,
			headers: { Authorization: `Bearer ${auth.access}` },
			withCredentials: false,
		});

		axiosProtected.interceptors.request.use(async (req) => {
			const user = jwt_decode(auth.access);
			const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
			if (!isExpired) {
				return req;
			}
			console.log('Access token expired!');
			try {
				const response = await axios.post(REFRESH_URL, {
					refresh: auth.refresh,
				});
				if (response.status === 200) {
					const access = response?.data?.access;

					setAuth({ ...auth, access });
					setUser(jwt_decode(access));
					loadUserProfile();
					localStorage.setItem('authTokens', JSON.stringify({ ...auth, access }));
					req.headers.Authorization = `Bearer ${response.data.access}`;
				}
			} catch {
				console.log('Refresh token expired!');
				logOutUser();
			}

			return req;
		});
		return axiosProtected;
	} else {
		return axios.create({
			baseURL: process.env.REACT_APP_API_URL,
			withCredentials: false,
		});
	}
};

export default useAxios;
