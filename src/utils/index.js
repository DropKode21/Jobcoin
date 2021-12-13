export const MONTHS = {
	'0': 'JAN',
	'1': 'FEB',
	'2': 'MAR',
	'3': 'APR',
	'4': 'MAY',
	'5': 'JUN',
	'6': 'JUL',
	'7': 'AUG',
	'8': 'SEPT',
	'9': 'OCT',
	'10': 'NOV',
	'11': 'DEC',
}

export const formatTooltip = dataPoint => {
	const outputArr = []
	for (const [key, value] of Object.entries(dataPoint)) {
		switch (key) {
			case 'timestamp': {
				const [trimmedTimestamp] = value.split('.')
				const [date, time] = trimmedTimestamp.split('T')
				outputArr.push(date)
				outputStr = time
				break
			}
			case 'toAddress': {
				outputStr = `to: ${value}`
				break
			}
			case 'fromAddress': {
				outputStr = `from: ${value}`
				break
			}
			default: {
				outputStr = `${key}: ${value}`
				break
			}
		}
		outputArr.push(outputStr)
	}
	return outputArr
}