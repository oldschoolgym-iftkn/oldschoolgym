import React from 'react';
import Button from '../Button';

const CoachCard = ({ coach }) => {
	return (
		<div className="flex flex-col text-center border-2 border-black rounded-lg h-fit">
			<div className="p-4 space-y-4">
				<img
					src={process.env.REACT_APP_API_URL + coach.user_profile.avatar}
					alt="Coach"
					className="w-64 h-64 mx-auto mt-2 rounded-[6rem] "
					loading="lazy"
				/>
				<div className="text-2xl">
					{coach.user_profile.last_name + ' ' + coach.user_profile.first_name}
				</div>
			</div>
			<div className="p-4 space-y-8 text-lg text-left border-black border-y">
				<div>Специфікація: {coach.category}</div>
				<div>Тип занять: {coach.type_training}</div>
				<div>Досвід: {coach.experience}</div>
			</div>
			<div className="py-6 mx-auto">
				<Button linkTo={`/coaches/${coach.id}`}>Переглянути профіль</Button>
			</div>
		</div>
	);
};

export default CoachCard;
