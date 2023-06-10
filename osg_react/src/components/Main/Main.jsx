import React from 'react';
import Button from './ButtonCTA';

const Main = () => {
	return (
		<>
			<section
				className="min-h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_hero_1.png')",
				}}>
				<div className="container items-center h-full px-2 mx-auto text-white ">
					<h2
						className="pt-40 text-4xl text-center uppercase sm:text-left"
						style={{ fontFamily: "'Russo One', sans-serif" }}>
						Ви маєте ціль,
						<br /> ми надаємо
						<br /> можливості
					</h2>
				</div>
			</section>

			<section
				className="min-h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_section_3.png')",
				}}>
				<div className="container grid items-start h-full grid-cols-1 px-2 mx-auto text-black sm:grid-cols-2 ">
					<p className="mt-24 text-3xl text-center uppercase sm:text-left">
						На нашому сервісі ви зможете: <br /> знайти тренера <br /> стати тренером <br />
					</p>
				</div>
			</section>
			<section
				className="min-h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_section_2.png')",
				}}>
				<div className="container items-center h-full px-2 pb-16 mx-auto text-white">
					<p className="py-20 text-4xl">Переваги сервісу</p>
					<div className="flex flex-col mx-auto space-y-12 text-2xl leading-none text-left text-black max-w-7xl">
						<div className="flex items-center justify-center sm:space-x-4">
							<div className="w-16 h-16 bg-white rounded-full aspect-square max-sm:hidden">
								{/* <CheckIcon opacity={0.5} className="w-full h-full text-black" /> */}
								<img src={'img/check.svg'} alt="" className="w-full h-full text-black" />
							</div>
							<p className="flex-grow col-span-8 px-10 py-5 bg-white rounded-full">
								можливість займатися з ким хочеш і коли хочеш
							</p>
						</div>
						<div className="flex items-center justify-center sm:space-x-5">
							<div className="w-16 h-16 bg-white rounded-full aspect-square max-sm:hidden">
								<img src={'img/check.svg'} alt="" className="w-full h-full text-black" />
							</div>
							<p className="flex-grow col-span-8 px-10 py-5 bg-white rounded-full">
								комунікація клієнта з тренером та навпаки в особистому чаті
							</p>
						</div>
						<div className="flex items-center justify-center sm:space-x-5">
							<div className="w-16 h-16 bg-white rounded-full aspect-square max-sm:hidden">
								<img src={'img/check.svg'} alt="" className="w-full h-full text-black" />
							</div>
							<p className="flex-grow col-span-8 px-10 py-5 bg-white rounded-full">
								зручніть, зрозумілість та доступність платформи
							</p>
						</div>
					</div>
				</div>
			</section>
			<section
				className="min-h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_section_4.png')",
				}}>
				<div className="container grid items-start h-full grid-cols-1 px-2 mx-auto text-black md:grid-cols-2 ">
					<div className="h-full my-12">
						<p
							// uppercase
							className="my-16 font-medium text-3xl leading-[3rem] text-center sm:text-left">
							Налаштовуйте власні вправи, плануйте тренування, створюйте програми тренувань
							доручайте спортсменам виконувати їх вдома, на полі чи в тренажерному залі.
						</p>
						<Button linkTo={'/register'}>Стати тренером</Button>
					</div>
				</div>
			</section>
			<section
				className="min-h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_section_5.png')",
				}}>
				<div className="container grid items-start h-full grid-cols-1 px-2 mx-auto text-white md:grid-cols-2 ">
					<div className="h-full col-start-2">
						<p
							// uppercase
							className="mt-36 mb-16 text-3xl font-medium leading-[3rem] text-center sm:text-right">
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
