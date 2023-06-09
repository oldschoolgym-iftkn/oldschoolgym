import React from 'react';

import CalendarPlanCard from './CalendarPlanCard';

const plansList = [1, 1, 1];

const CalendarCoach = () => {
	return (
		<div className="flex flex-col h-full border border-black rounded-3xl">
			<div className="flex-1 p-4 overflow-y-auto text-2xl">
				<div className="flex flex-wrap [&>*]:m-4 justify-center">
					{
						// isLoading ? (
						//     <Loading />
						// ) : (
						plansList.map((p, index) => (
							<CalendarPlanCard key={p.index} {...p} />
						))
						// )
					}
				</div>
			</div>
		</div>
	);
};

export default CalendarCoach;
