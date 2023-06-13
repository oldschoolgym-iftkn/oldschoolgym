import React from 'react';
import Button from '../Button';

import { selectYearDeclension, specs, type_training } from '../FullCoach/utils.js';

const CoachCard = ({ coach }) => {
	return (
		<div className="flex flex-col text-center border-2 border-black rounded-lg h-fit">
			<div className="p-2 space-y-2 sm:p-4 sm:space-y-4">
				<img
					src={process.env.REACT_APP_API_URL + coach.user_profile.avatar}
					alt="Coach"
					className="sm:w-64 w-40 sm:h-64 h-4w-40 mx-auto mt-2 rounded-[6rem] object-scale-down"
					loading="lazy"
				/>
				<div className="text-2xl">
					{coach.user_profile.last_name + ' ' + coach.user_profile.first_name}
				</div>
			</div>
			<div className="p-4 space-y-2 text-lg text-left border-black sm:space-y-6 border-y">
				<div>Специфікація: {specs[Number(coach.category)]}</div>
				<div>Тип занять: {type_training[Number(coach.type_training)]}</div>
				<div>Досвід: {selectYearDeclension(coach.experience)}</div>
			</div>
			<div className="py-2 mx-auto sm:py-6">
				<Button linkTo={`/coaches/${coach.id}`}>Переглянути профіль</Button>
			</div>
		</div>
	);
};

export default CoachCard;
