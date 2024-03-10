export function getDateString(datetimeIso: string) {
	const date = new Date(datetimeIso);
	return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
		.toString()
		.padStart(2, '0')}.${date.getFullYear()}`;
}

export function getTimeString(datetimeIso: string) {
	const date = new Date(datetimeIso);
	return `${date.getHours().toString().padStart(2, '0')}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;
}

export function getDatetimeString(datetimeIso: string) {
	return `${getDateString(datetimeIso)} - ${getTimeString(datetimeIso)}`;
}
