import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import Loading from './Loading';

const RequireAuth = () => {
	const { user, auth, logOutUser, loadUserProfile, error, success, loading } = useAuth();
	const location = useLocation();

	useEffect(() => {
		if ((error || !auth) && !loading) {
			console.log('logout reqAuth', { error, auth });
			logOutUser();
		}
	}, [auth, error, loading, logOutUser]);
	useEffect(() => {
		if (auth) {
			loadUserProfile();
		}
	}, [auth]);
	// console.log('loading', { user, auth });
	if ((!user?.user_profile && auth) || loading) {
		return <Loading />;
	}
	// console.log('outlet', { success, user });
	if (success && user?.user_profile) {
		return <Outlet />;
	}

	return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default RequireAuth;
