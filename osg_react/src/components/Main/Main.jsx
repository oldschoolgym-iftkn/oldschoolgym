import React from 'react';
import Button from './ButtonCTA';

const Main = () => {
	return (
		<>
			<section
				className="h-[800px] pt-[60px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_hero_1.png')",
				}}>
				<div className="container grid items-center h-full grid-cols-5 mx-auto text-white ">
					<h2
						className="pb-40 text-4xl text-left uppercase"
						style={{ fontFamily: "'Russo One', sans-serif" }}>
						Ви маєте ціль, ми надаємо можливості
					</h2>
				</div>
			</section>

			<section
				className="h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_section_3.png')",
				}}>
				<div className="container grid items-start h-full grid-cols-4 mx-auto text-black ">
					<p className="mt-24 text-3xl uppercase text-start">
						На цьому сервісі ви зможете: <br /> знайти тренера <br /> стати тренером <br /> ....
					</p>
				</div>
			</section>
			<section
				className="h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_section_2.png')",
				}}>
				<div className="container items-center h-full mx-auto text-white ">
					<p className="py-20 text-5xl">Переваги сервісу</p>
					{/* <div className="container grid grid-rows-3 gap-12 text-3xl text-black"> */}
					<div className="flex flex-col mx-auto space-y-12 text-4xl leading-none text-left text-black max-w-7xl">
						{/* <div className="grid justify-center grid-cols-10"> */}
						<div className="flex justify-center space-x-5">
							<div className="w-24 h-24 bg-white rounded-full">
								{/* <CheckIcon opacity={0.5} className="w-full h-full text-black" /> */}
								<img src={'img/check.svg'} alt="" className="w-full h-full text-black" />
							</div>
							<p className="flex-grow col-span-8 px-10 bg-white rounded-full py-7">
								можливість займатися з ким хочеш і коли хочеш
							</p>
						</div>
						{/* <div className="grid justify-center grid-cols-10"> */}
						<div className="flex justify-center space-x-5">
							<div className="w-24 h-24 bg-white rounded-full">
								<img src={'img/check.svg'} alt="" className="w-full h-full text-black" />
							</div>
							<p className="flex-grow col-span-8 px-10 bg-white rounded-full py-7">
								комунікація клієнта з тренером та навпаки в чаті
							</p>
						</div>
						{/* <div className="grid justify-center grid-cols-10"> */}
						<div className="flex justify-center space-x-5">
							<div className="w-24 h-24 bg-white rounded-full">
								<img src={'img/check.svg'} alt="" className="w-full h-full text-black" />
							</div>
							<p className="flex-grow col-span-8 px-10 bg-white rounded-full py-7">
								зручніть, зрозумілість та доступність платформи
							</p>
						</div>
					</div>
				</div>
			</section>
			<section
				className="h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_section_4.png')",
				}}>
				<div className="container grid items-start h-full grid-cols-2 mx-auto text-black ">
					<div className="h-full">
						<p
							// uppercase
							className="my-24 text-[2.5rem] leading-[3rem] text-start">
							Налаштовуйте власні вправи, плануйте тренування, створюйте програми тренувань
							доручайте спортсменам виконувати їх вдома, на полі чи в тренажерному залі.
						</p>
						<Button linkTo={'/register'}>Стати тренером</Button>
					</div>
				</div>
			</section>
			<section
				className="h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_section_5.png')",
				}}>
				<div className="container grid items-start h-full grid-cols-2 mx-auto text-white ">
					<div className="h-full col-start-2">
						<p
							// uppercase
							className="mt-36 mb-16 text-[2.5rem] leading-[3rem] text-right">
							Ознайомтесь зі списком тренерів та підберіть спеціаліста за своїми критеріями,
							вподобаннями та інтересами.
						</p>
						<Button linkTo={'/coaches'}>Тренери</Button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Main;
