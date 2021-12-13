import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import STYLES from '../../styles'
import COLORS from '../../styles/colors'

export const Underline = ({ color, extras }) => <View style={[styles.underline, { backgroundColor: color }, extras]} />

export const AccountInfoText = ({ text, size }) => <Text style={[styles.accountInfoText, { fontSize: size }]}>{text}</Text>

export const ButtonText = ({ text }) => <Text style={styles.buttonText}>{text}</Text>

export const HeaderText = ({ text }) => <Text style={styles.headerText}>{text}</Text>

export const LabelText = ({ text }) => <Text style={styles.labelText}>{text}</Text>

export const TitleText = ({ text }) => <Text style={styles.titleText}>{text}</Text>

export const SignInTextInput = ({ setInput, value, color }) => {
	return (
		<View style={STYLES.centerNoFlex}>
			<TextInput
				value={value}
				textAlign={'center'}
				placeholderTextColor={COLORS.steelTeal}
				placeholder={'Enter your address'}
				onChangeText={input => setInput(input)}
				style={[{ color }, styles.textInput ]}
			/>
			<Underline color={COLORS.electricBlue} extras={{ margin: 8 }} />
		</View>
	)
}

const styles = StyleSheet.create({
	buttonText: { fontSize: 20, color: COLORS.black },
	underline: { width: '92%', height: 4 },
	textInput: { fontSize: 40 },
	accountInfoText: { color: COLORS.electricBlue },
	headerText: { fontSize: 14, color: COLORS.black },
	labelText: {fontSize: 12, color: COLORS.black },
	titleText: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', color: COLORS.electricBlue },
})

