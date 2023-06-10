import React from 'react';
import DualRangeSlider from '../DualRangeSlider';

const Filter = ({ specs, className }) => {
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
					className="block w-full px-6 py-2 text-xl border border-white rounded-lg focus:ring-gray-500 focus:border-gray-500 ">
					<option defaultChecked className="text-lg">
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
					<div className="space-x-2">
						<input
							type="checkbox"
							name="lessonsType"
							id="lesson1"
							className="rounded checked:bg-black focus:ring-gray-500"
						/>
						<label htmlFor="lesson1">онлайн</label>
					</div>
					<div className="space-x-2">
						<input
							type="checkbox"
							name="lessonsType"
							id="lesson2"
							className="rounded checked:bg-black focus:ring-gray-500"
						/>
						<label htmlFor="lesson2">офлайн</label>
					</div>
				</div>
			</div>
			<div className="px-6 py-6 space-y-4 border-2 border-black rounded max-sm:py-2">
				<div className="">Досвід роботи</div>
				<DualRangeSlider minValue={0} maxValue={30} outFromValue outToValue />
			</div>
		</div>
	);
};

export default Filter;
