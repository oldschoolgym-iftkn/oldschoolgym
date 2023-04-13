import React from 'react';
import DualRangeSlider from '../DualRangeSlider';

const Filter = ({ specs }) => {
	return (
		<div className="select-none border-2 rounded-r-2xl border-black basis-1/5 p-6 space-y-14 text-black text-xl text-left">
			<div className="border-2 border-black rounded">
				<select
					id="countries"
					className="border border-white rounded-lg text-xl focus:ring-gray-500 focus:border-gray-500 block w-full py-2 px-6 ">
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
			<div className="border-2 border-black rounded py-6 px-6 space-y-4">
				<div className="">Тип занять</div>
				<div className="space-y-2 pl-2 text-lg">
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
			<div className="border-2 border-black rounded py-6 px-6 space-y-4">
				<div className="">Досвід роботи</div>
				<DualRangeSlider minValue={0} maxValue={30} outFromValue outToValue />
			</div>
		</div>
	);
};

export default Filter;
