import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
	const { user } = useAuth();
	const location = useLocation();
	return user?.user_profile ? (
		<Outlet />
	) : (
		<Navigate to="/sign-in" state={{ from: location }} replace />
	);
};

export default RequireAuth;
