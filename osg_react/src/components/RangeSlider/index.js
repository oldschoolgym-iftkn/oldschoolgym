import React, { useState, useRef } from 'react';
import styles from './styles.module.css';

export const DualRangeSlider = ({
	inRangeStartVal,
	inRangeEndVal,
	sliderOneVal,
	sliderTwoVal,
	outSelectedFromValue,
	outSelectedToValue,
	_fnSliderOneHandler,
	_fnSliderTwoHandler,
}) => {
	// const [sliderOneVal, outSelectedFromValue] = useState(inFilterRangeStart);
	// const [sliderTwoVal, outSelectedToValue] = useState(inFilterRangeEnd);

	const [minValue] = useState(inRangeStartVal);
	const [maxValue] = useState(inRangeEndVal);

	const sliderTrack = useRef('');

	// const _fnSliderOneHandler = (e) => {
	// 	const _this = e.target;
	// 	const val1 = _this.value;
	// 	if (sliderTwoVal - val1 > minGap) {
	// 		const sliderOneVal = sliderTwoVal - minGap;
	// 		outSelectedFromValue(sliderOneVal);
	// 	}
	// };
	// const _fnSliderTwoHandler = (e) => {
	// 	const _this = e.target;
	// 	const val2 = _this.value;
	// 	if (val2 - sliderOneVal <= minGap) {
	// 		const sliderTwoVal = sliderOneVal + minGap;
	// 		outSelectedToValue(sliderTwoVal);
	// 	}
	// };

	return (
		<div className={styles.range__wrapper}>
			<div className={styles.container__cls}>
				<div className={styles.slider__tracker} ref={sliderTrack}></div>
				<input
					type="range"
					id="slider-1"
					min={minValue}
					max={maxValue}
					value={sliderOneVal}
					onChange={(e) => {
						_fnSliderOneHandler(e.target.value);
					}}
				/>
				<input
					type="range"
					id="slider-2"
					min={minValue}
					max={maxValue}
					value={sliderTwoVal}
					onChange={(e) => {
						_fnSliderTwoHandler(e.target.value);
					}}
				/>
			</div>
		</div>
	);
};
