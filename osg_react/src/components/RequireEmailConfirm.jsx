import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireEmailConfirm = () => {
	const { user } = useAuth();
	const location = useLocation();
	return user?.user_profile?.verifying.is_activate ? (
		<Outlet />
	) : (
		<Navigate to={'/confirm-email'} state={{ from: location }} replace />
	);
};

export default RequireEmailConfirm;
