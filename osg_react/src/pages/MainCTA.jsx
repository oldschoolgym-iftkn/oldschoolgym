import { useEffect } from 'react';

import Header from '../components/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer';

const MainCTA = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	});
	return (
		<div className="flex flex-col min-h-screen text-center App">
			<Header main full />
			<main className="">
				<Main />
			</main>
			<Footer />
		</div>
	);
};

export default MainCTA;
