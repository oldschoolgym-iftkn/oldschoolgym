export const cities = [
	'Вінниця',
	'Дніпро',
	'Донецьк',
	'Житомир',
	'Запоріжжя',
	'Івано-Франківськ',
	'Київ',
	'Кропивницький',
	'Луганськ',
	'Луцьк',
	'Львів',
	'Миколаїв',
	'Одеса',
	'Полтава',
	'Рівне',
	'Севастополь',
	'Сімферополь',
	'Суми',
	'Тернопіль',
	'Ужгород',
	'Харків',
	'Херсон',
	'Хмельницький',
	'Черкаси',
	'Чернівці',
	'Чернігів',
];
export const specs = [
	'Фітнес',
	'Персональний',
	'Бокс',
	'Плавання ',
	'Йога ',
	'Стрільба з лука ',
	'Кросфіт ',
	'Атлетика ',
];

export const type_training = ['онлайн', 'офлайн', 'змішаний'];

export function selectYearDeclension(year) {
	const lastDigit = year % 10;
	const lastTwoDigits = year % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		return year + ' років'; // Наприклад, 111 років
	} else if (lastDigit === 1) {
		return year + ' рік'; // Наприклад, 21 рік
	} else if (lastDigit >= 2 && lastDigit <= 4) {
		return year + ' роки'; // Наприклад, 42 роки
	} else {
		return year + ' років'; // Наприклад, 99 років
	}
}

export const dataUrlToFile = async (url, fileName, mimeType) => {
	const response = await fetch(url);
	const buffer = await response.arrayBuffer();

	return new File([buffer], fileName, { type: mimeType });
};
