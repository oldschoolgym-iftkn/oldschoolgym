import React from 'react';

import CalendarPlanCard from './CalendarPlanCard';

const plansList = [1, 1, 1];

const CalendarCoach = () => {
	return (
		<div className="flex flex-col h-full border border-black rounded-3xl">
			<div className="flex-1 p-4 overflow-y-auto text-xl">
				<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(344px,1fr))] justify-items-stretch gap-6">
					{
						// isLoading ? (
						//     <Loading />
						// ) : (
						plansList.map((p, index) => (
							<CalendarPlanCard key={index} {...p} />
						))
						// )
					}
				</div>
			</div>
		</div>
	);
};

export default CalendarCoach;
