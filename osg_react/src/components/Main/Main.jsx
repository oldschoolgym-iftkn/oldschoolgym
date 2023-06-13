import React from 'react';
import Button from './ButtonCTA';
import ButtonCTA from './ButtonCTA';

const Main = () => {
	return (
		<>
			<section
				className="min-h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_hero_1.png')",
				}}>
				<div className="container items-center h-full px-4 mx-auto space-y-4 text-white sm:px-2">
					<h2
						className="text-4xl text-center uppercase sm:text-5xl pt-36 sm:text-left"
						style={{ fontFamily: "'Russo One', sans-serif" }}>
						Ви маєте ціль,
						<br /> ми надаємо
						<br /> можливості
					</h2>
					<div className="text-center sm:text-left">
						<Button linkTo={'/register'}>Долучитись</Button>
					</div>
					<p
						className=" text-xl sm:text-3xl text-center max-w-[730px] ml-auto uppercase sm:text-right"
						style={{ fontFamily: "'Russo One', sans-serif" }}>
						Дізнайтеся більше про нашу різноманітну спільноту тренерів, власні програми навчання та
						інтуїтивно зрозумілі функції платформи. Розпочніть свій шлях до перетворень вже
						сьогодні!
					</p>
				</div>
			</section>
			<section
				className="min-h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_section_2.png')",
				}}>
				<div className="container items-center h-full px-2 pb-16 mx-auto text-white">
					<p className="py-16 text-3xl sm:text-4xl">Чому варто обрати OLDSCHOOLGYM?</p>
					<div className="flex flex-col gap-4 mx-auto text-xl leading-none text-left text-white max-sm:px-4 sm:text-2xl max-w-7xl">
						<div className="max-w-xl space-y-4 max-sm:mx-auto sm:mr-auto">
							<p className="w-full px-4 py-2 text-2xl text-center text-black rounded-full sm:py-5 sm:text-3xl bg-neutral-100">
								Великий каталог спеціалістів
							</p>
							<div className="flex gap-4 max-[400px]:flex-col max-[400px]:items-center">
								<img
									src="img/big_catalog.png"
									alt=""
									className="object-scale-down max-[400px]:w-40 w-28 sm:w-48 mix-blend-color-burn"
								/>
								<p className="flex-1 my-auto text-center">
									Доступ до широкого спектру висококваліфікованих тренерів з різним досвідом та
									знаннями.
								</p>
							</div>
						</div>
						<div className="max-w-xl space-y-4 max-sm:mx-auto sm:ml-auto xl:-mt-24">
							<p className="w-full px-4 py-2 text-2xl text-center text-black rounded-full sm:py-5 sm:text-3xl bg-neutral-100">
								Зручний інтерфейс
							</p>
							<div className="flex gap-4 max-sm:flex-row-reverse max-[400px]:flex-col max-[400px]:items-center">
								<img
									src="img/ui.png"
									alt=""
									className="object-scale-down max-[400px]:w-40 w-28 sm:w-48 mix-blend-color-burn"
								/>
								<p className="flex-1 my-auto text-center">
									Інтуїтивно зрозуміла платформа забезпечує безперебійну та безпроблемну роботу як
									для клієнтів, так і для тренерів.
								</p>
							</div>
						</div>
						<div className="max-w-xl space-y-4 max-sm:mx-auto sm:mr-auto xl:-mt-24">
							<p className="w-full px-4 py-2 text-2xl text-center text-black rounded-full sm:py-5 sm:text-3xl bg-neutral-100">
								Безпека та конфіденційність
							</p>
							<div className="flex gap-4 max-[400px]:flex-col max-[400px]:items-center">
								<img
									src="img/security.png"
									alt=""
									className="object-scale-down max-[400px]:w-40 w-28 sm:w-48 mix-blend-color-burn"
								/>
								<p className="flex-1 my-auto text-center">
									Ми надаємо пріоритет вашій конфіденційності та забезпечуємо безпечне середовище
									для всіх ваших взаємодій і даних
								</p>
							</div>
						</div>
						<div className="max-w-xl space-y-4 max-sm:mx-auto sm:ml-auto xl:-mt-24">
							<p className="w-full px-4 py-2 text-2xl text-center text-black rounded-full sm:py-5 sm:text-3xl bg-neutral-100">
								Перевірені тренери
							</p>
							<div className="flex gap-4 max-sm:flex-row-reverse max-[400px]:flex-col max-[400px]:items-center">
								<img
									src="img/verification.png"
									alt=""
									className="object-scale-down max-[400px]:w-40 w-28 sm:w-48 mix-blend-color-burn"
								/>
								<p className="flex-1 my-auto text-center">
									Інтуїтивно зрозуміла платформа забезпечує безперебійну та безпроблемну роботу як
									для клієнтів, так і для тренерів.
								</p>
							</div>
						</div>
						<div className="mt-8 space-y-2 text-center sm:mx-auto">
							<p
								style={{ fontFamily: "'Russo One', sans-serif" }}
								className="w-full text-4xl text-center text-white">
								Приєднуйтесь до нашої спільноти вже сьогодні!
							</p>
							<p className="max-w-[770px] mx-auto text-center">
								Зареєструйтеся зараз і розпочніть свою тренерську діяльність або знайдіть ідеального
								наставника, який приведе вас до успіху.
							</p>
							<ButtonCTA className="mt-6" linkTo={'/register'}>
								Приєднатись
							</ButtonCTA>
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
					<div className="flex flex-col h-full my-20 space-y-4">
						<p
							style={{ fontFamily: "'Russo One', sans-serif" }}
							className="w-full text-5xl text-center text-white sm:text-left drop-shadow-xl">
							Ви тренер?
						</p>
						<p
							// uppercase
							className="font-medium text-3xl leading-[3rem] text-center sm:text-left">
							Розширюйте своє охоплення та спілкуйтеся з клієнтами. Розвивайте свою діяльність,
							залучайте нових клієнтів і робіть значущий вплив на їхнє життя. Приєднуйтесь до нашої
							спільноти тренерів і розкрийте свій потенціал.
						</p>
						<Button linkTo={'/register'} className="shadow-2xl sm:mt-16">
							Стати тренером
						</Button>
					</div>
				</div>
			</section>
			<section
				className="min-h-[800px] bg-white bg-center bg-cover"
				style={{
					backgroundImage: "url('img/main_section_5.png')",
				}}>
				<div className="container grid items-start h-full grid-cols-1 px-2 mx-auto text-white md:grid-cols-2 ">
					<div className="flex flex-col h-full col-start-2 my-20 space-y-4">
						<p
							style={{ fontFamily: "'Russo One', sans-serif" }}
							className="w-full text-5xl text-center text-white sm:text-right drop-shadow-xl">
							Знайдіть свого ідеального наставника
						</p>
						<p
							// uppercase
							className="mt-36 mb-16 text-3xl font-medium leading-[3rem] text-center sm:text-right">
							Наша платформа з'єднає вас з досвідченими фахівцями з різних дисциплін. Відкрийте для
							себе спеціалістів, які спеціалізуються на фітнес-тренуваннях, атлетиці, боксі та
							багато чому іншому. Знайдіть ідеальну пропозицію та розпочніть свою подорож до змін
							вже сьогодні.
						</p>
						<Button linkTo={'/coaches'} className="shadow-2xl sm:mt-16">
							Знайти тренера
						</Button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Main;
