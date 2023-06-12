import React, { useState } from 'react';
import DualRangeSlider from '../DualRangeSlider';

import { specs } from '../FullCoach/utils.js';

const Filter = ({ setFilterOptions, className }) => {
	const [specFilter, setSpecFilter] = useState('');
	const [typeFilter, setTypeFilter] = useState('');

	const handleChangeType = (e) => {
		setTypeFilter(e.target.value);
		setFilterOptions((prev) => ({ ...prev, type_training: e.target.value }));
	};
	return (
		<div
			className={
				'p-6 text-xl text-left text-black border-2 border-black select-none rounded-r-2xl space-y-14 max-sm:space-y-6' +
				' ' +
				className
			}>
			<div className="border-2 border-black rounded">
				<select
					id="countries"
					value={specFilter}
					onChange={(e) => {
						setSpecFilter(e.target.value);
						setFilterOptions((prev) => ({ ...prev, category: e.target.value }));
						console.log(e.target.value);
					}}
					className="block w-full px-6 py-2 text-xl border border-white rounded-lg focus:ring-gray-500 focus:border-gray-500 ">
					<option defaultChecked value={''} className="text-lg">
						Специфікація
					</option>
					{specs.map((obj, index) => (
						<option key={index} value={index} className="text-lg">
							{obj}
						</option>
					))}
				</select>
			</div>
			<div className="px-6 py-6 space-y-4 border-2 border-black rounded max-sm:space-y-2 max-sm:py-2">
				<div className="">Тип занять</div>
				<div className="pl-2 space-y-2 text-lg">
					<div>
						<input
							id="typeOnline"
							type="radio"
							value="0"
							name="type_training"
							checked={typeFilter === '0'}
							onChange={handleChangeType}
							className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
						/>
						<label htmlFor="typeOnline" className="text-black align-middle">
							Онлайн
						</label>
					</div>
					<div>
						<input
							id="typeOffline"
							type="radio"
							value="1"
							name="type_training"
							checked={typeFilter === '1'}
							onChange={handleChangeType}
							className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
						/>
						<label htmlFor="typeOffline" className="text-black align-middle">
							Офлайн
						</label>
					</div>
					<div>
						<input
							id="typeMixed"
							type="radio"
							value="3"
							name="type_training"
							checked={typeFilter === '3'}
							onChange={handleChangeType}
							className="m-2 text-black border-white ring-offset-2 checked:bg-none ring-black ring-1 focus:ring-1 focus:ring-offset-4"
						/>
						<label htmlFor="typeMixed" className="text-black align-middle">
							Змішаний
						</label>
					</div>
					<button
						onClick={() => {
							setTypeFilter('');
							setFilterOptions((prev) => ({ ...prev, type_training: '' }));
						}}
						className="mx-auto hover:underline text-neutral-500">
						Скинути
					</button>
				</div>
			</div>
			<div className="px-6 py-6 space-y-4 border-2 border-black rounded max-sm:py-2">
				<div className="">Досвід роботи</div>
				<DualRangeSlider
					minValue={1}
					maxValue={30}
					outFromValue={(fromValue) =>
						setFilterOptions((prev) => ({ ...prev, experience: [fromValue, prev.experience[1]] }))
					}
					outToValue={(toValue) =>
						setFilterOptions((prev) => ({ ...prev, experience: [prev.experience[0], toValue] }))
					}
				/>
			</div>
		</div>
	);
};

export default Filter;
