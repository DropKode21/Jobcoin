import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { Rect, Text as TextSVG, Svg, TSpan } from 'react-native-svg'
import { formatTooltip } from '../../utils'
import COLORS from '../../styles/colors'

const { width } = Dimensions.get('window')
const chartConfig = {
	backgroundColor: COLORS.black,
	backgroundGradientFrom: COLORS.steelTeal,
	backgroundGradientToOpacity: 0.9,
	backgroundGradientFromOpacity: 0.5,
	backgroundGradientTo: COLORS.silverSand,
	color: (opacity = 1) => COLORS.electricBlue,
	strokeWidth: 2,
	propsForDots: {
		r: '5',
	}
}

export const TransactionHistory = ({ history, accountInfo }) => {
	const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false, value: '', selected: null })
	const displayTooltip = () => {
		let i = 0
		return tooltip.visible && (
			<Svg>
				<Rect
					x={tooltip.x - 75} 
					y={tooltip.y + 10} 
					width={'100'}
					height={'60'}
					fill={COLORS.black}
				/>
				<TextSVG
					x={tooltip.x - 5}
					y={tooltip.y + 30}
					fill={'white'}
					fontSize={'11'}
					fontWeight={'bold'}
					textAnchor={'middle'}
				>
					{tooltip.value.map((val, idx) => {
						i += 10
						return (
							<TSpan key={`${idx}`} x={tooltip.x - 20} y={tooltip.y + 15 + i} >
								{val}
							</TSpan>
						)
					})}
				</TextSVG>
			</Svg>
		)
	}

	const getDotColor = (dataPoint, index) => {
		if (index === tooltip.selected && tooltip.visible) return COLORS.orange
		return COLORS.lightGray
	}

	const onDataPointClick = data => {
		return tooltip.x === data.x && tooltip.y === data.y
			? setTooltip((previousState) => ({
				...previousState,
				value: formatTooltip(accountInfo.transactions[data.index]),
				visible: !previousState.visible,
				selected: data.index
			}))
			: setTooltip({
				x: data.x,
				y: data.y,
				selected: data.index,
				visible: true,
				value: formatTooltip(accountInfo.transactions[data.index]),
			})
	}

	return (
		<LineChart
			bezier
			data={history}
			width={width}
			height={360}
			withInnerLines={false}
			verticalLabelRotation={30}
			chartConfig={chartConfig}
			decorator={displayTooltip}
			getDotColor={getDotColor}
			onDataPointClick={onDataPointClick}
			style={{ borderRadius: 16 }}
		/>
	)
}