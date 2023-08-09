import React from 'react';
import Button from '../Button';

const HomeCoach = () => {
	return (
		<div className="h-full p-4 border border-black rounded-3xl">
			<div className="grid xl:grid-cols-[repeat(2,1fr)] xl:grid-rows-[repeat(2,minmax(0,1fr))] h-full gap-2 sm:gap-8 px-4 text-lg sm:text-2xl font-semibold grid-cols-1 ">
				<div className="flex flex-col h-full">
					<h4 className="text-center">План занять</h4>
					{/* <div className="flex-1 p-6 overflow-y-auto border border-black rounded-3xl"> */}
					<div className="flex flex-col justify-between h-full p-4 space-y-4 border border-black rounded-3xl">
						<div className="flex-1 block overflow-y-auto ">
							<div className="flex-1 space-y-2">
								<p>01.02.2023 / 11:15-12:35 / Одне заняття </p>
							</div>
						</div>
						<div className="mx-auto w-fit ">
							<Button linkTo={'/cabinet/calendar'}>Переглянути</Button>
						</div>
					</div>
					{/* </div> */}
				</div>
				<div className="flex flex-col h-full">
					<h4 className="text-center">Клієнти</h4>
					{/* <div className="flex-1 p-6 border border-black rounded-3xl"> */}
					<div className="flex flex-col justify-between h-full p-4 space-y-4 border border-black rounded-3xl">
						<div className="flex items-center justify-center flex-1 ">
							<img
								src="/img/client_big_icon.svg"
								alt="clientIcon"
								className="flex items-center w-32 h-32 mx-auto"
							/>
						</div>
						<div className="mx-auto w-fit ">
							<Button linkTo={'/cabinet/clients'}>Переглянути</Button>
						</div>
					</div>
					{/* </div> */}
				</div>
				<div className="flex flex-col h-full">
					<h4 className="text-center">Чати</h4>
					{/* <div className="flex-1 p-6 border border-black rounded-3xl"> */}
					<div className="flex flex-col justify-between h-full p-4 space-y-4 border border-black rounded-3xl ">
						<div className="flex items-center justify-center flex-1 space-x-4 max-sm:flex-col">
							<img
								src="/img/message_big_icon.svg"
								alt="message_big_iconIcon"
								className="inline-block w-32 h-32"
							/>
							<p className="text-lg font-normal text-center sm:text-xl h-fit">
								Будьте на зв’язку, переглядаючи чати зі своїми клієнтами
							</p>
						</div>
						<div className="mx-auto w-fit ">
							<Button linkTo={'/cabinet/messages'}>Переглянути</Button>
						</div>
					</div>
					{/* </div> */}
				</div>
				<div className="flex flex-col h-full">
					<h4 className="text-center">Заявки</h4>
					{/* <div className="flex-1 p-6 border border-black rounded-3xl"> */}
					<div className="flex flex-col justify-between h-full p-4 space-y-4 overflow-y-auto border border-black rounded-3xl ">
						<div className="flex items-center justify-center flex-1 space-x-4">
							<img src="/img/request_big_icon.svg" alt="requestIcon" className="w-32 h-32" />
						</div>
						<div className="mx-auto w-fit ">
							<Button linkTo={'/cabinet/requests'}>Переглянути</Button>
						</div>
					</div>
					{/* </div> */}
				</div>
			</div>
		</div>
	);
};

export default HomeCoach;
