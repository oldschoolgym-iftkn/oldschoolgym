import React from 'react';
import Button from '../Button';

const CoachCard = ({ coach }) => {
	return (
		<div className="flex flex-col border-2 border-black rounded-lg h-fit">
			<div className="p-4 space-y-4">
				<img
					src={coach.avatarUrl}
					alt="Coach"
					className="w-64 h-64 mx-auto mt-2 rounded-[6rem] "
					loading="lazy"
				/>
				<div className="text-2xl">{coach.name}</div>
			</div>
			<div className="p-4 space-y-8 text-lg text-left border-black border-y">
				<div>Специфікація: {coach.spec}</div>
				<div>Тип занять: {coach.type}</div>
				<div>Досвід: {coach.exp}</div>
			</div>
			<div className="py-6">
				<Button linkTo={`/coaches/${coach?.id}`}>Переглянути профіль</Button>
			</div>
		</div>
	);
};

export default CoachCard;
