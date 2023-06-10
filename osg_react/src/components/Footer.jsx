import React from 'react';

export default function Footer() {
	return (
		<footer className="text-white bg-black">
			<div className="container py-6 mx-auto">
				<span className="inline-block text-xl">Зв’язок з технічною підтримкою</span>
				<div className="flex flex-col grid-cols-12 gap-5 my-5 text-xl sm:grid">
					<div className="col-span-4 col-start-3 space-y-4">
						<span className="block">Номер телефону</span>
						<span className="block">+380633688777</span>
					</div>
					<div className="col-span-4 col-start-7 space-y-4">
						<span className="block">Електронна пошта</span>
						<span className="block">oldschoolgym@gmail.com</span>
					</div>
				</div>
			</div>
			<div className="items-center w-full mx-auto text-black bg-white">
				<span className="inline-block my-2 text-xl">Gym, 2023 р. Усі права захищено.</span>
			</div>
		</footer>
	);
}
