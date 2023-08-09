import React from 'react';
import UserInfo from './UserInfo';
import ProfileCoach from './ProfileCoach';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
	const { user } = useAuth();
	console.log('profile_user_role', user.role);
	return (
		<div className="w-full h-full space-y-6">
			<UserInfo className={user.role === 1 ? '' : 'h-full'} />
			{user.role === 1 && <ProfileCoach />}
		</div>
	);
};

export default Profile;
