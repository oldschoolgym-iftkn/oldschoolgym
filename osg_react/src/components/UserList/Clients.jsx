import { useEffect, useState } from 'react';
import ClientCard from './ClientCard';
import useAxios from '../../hooks/useAxios';
import Loading from '../Loading';

// const clients = [
// 	{ id: 1, avatar: '/media/default_M.png', first_name: 'Олег', last_name: 'Варкрафт' },
// 	{ id: 2, avatar: '/media/default_F.png', first_name: 'Олена', last_name: 'Квітка' },
// 	{ id: 3, avatar: '/media/default_M.png', first_name: 'Володимир', last_name: 'Молочний' },
// 	{ id: 4, avatar: '/media/default_M.png', first_name: 'Billy', last_name: 'Herington' },
// ];

const Clients = () => {
	const [clientsList, setClientsList] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const axios = useAxios();
	const getClients = () => {
		axios
			.get('/user/api/')
			.then((res) => {
				setClientsList(res.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		getClients();
	}, []);
	return (
		<div className="flex flex-col h-full border border-black rounded-3xl">
			<div className="flex-1 p-4 overflow-y-auto text-2xl">
				<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-stretch gap-8">
					{isLoading ? (
						<Loading />
					) : (
						clientsList.map((p, index) => <ClientCard key={p.id} {...p} />)
					)}
				</div>
			</div>
		</div>
	);
};

export default Clients;
