import { useEffect } from 'react';

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';

const Profile = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	});
	return (
		<div className="flex flex-col h-full ">
			<Header />
			<div className="flex flex-row h-screen pt-[60px]">
				<SideBar />
				<main className="flex-1 h-full overflow-y-auto text-5xl p-7 ">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/requests" element={<div>Requests</div>} />
						<Route path="/messages" element={<div>Messages</div>} />
						<Route path="/clients" element={<div>Clients</div>} />
						<Route path="/calendar" element={<div>Calendar</div>} />
					</Routes>
				</main>
			</div>
		</div>
	);
};

export default Profile;
