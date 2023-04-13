import React from 'react';

export default function Footer() {
	return (
		<footer className="bg-black text-white">
			<div className="container mx-auto py-6">
				<span className="inline-block text-2xl">Зв’язок з технічною підтримкою</span>
				<div className="grid grid-cols-12 gap-5 my-5 text-2xl">
					<div className="col-start-3 col-span-4 space-y-4">
						<span className="block">Номер телефону</span>
						<span className="block">+380633688777</span>
					</div>
					<div className="col-start-7 col-span-4 space-y-4">
						<span className="block">Електронна пошта</span>
						<span className="block">oldschoolgym@gmail.com</span>
					</div>
				</div>
			</div>
			<div className="w-full items-center mx-auto text-black bg-white border-black border-2">
				<span className="inline-block my-2 text-2xl">Gym, 2023 р. Усі права захищено.</span>
			</div>
		</footer>
	);
}
