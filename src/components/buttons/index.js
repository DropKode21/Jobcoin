import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { ButtonText, LabelText } from '../texts'
import STYLES from '../../styles'
import COLORS from '../../styles/colors'


export const SignInButton = ({ onPress }) => (
	<View style={STYLES.centerNoFlex}>
		<Pressable onPress={onPress} style={[styles.signInButton, STYLES.centerNoFlex, styles.borderRadius]}>
			<ButtonText text={'Sign In'} />
		</Pressable>
	</View>
)

export const SendButton = ({ onPress }) => (
	<View style={STYLES.centerFlex}>
		<Pressable style={[STYLES.centerNoFlex, styles.sendButton, styles.borderRadius]} onPress={onPress}>
			<ButtonText text={'Send Jobcoin'} />
		</Pressable>
	</View>
)

export const ModalButton = ({ onPress, text }) => (
	<Pressable onPress={onPress} style={styles.modalButton}>
		<Text>{text}</Text>
	</Pressable>
)


const styles = StyleSheet.create({
	borderRadius: { borderRadius: 8 },
	signInButton: { backgroundColor: COLORS.silverSand, width: '88%', height: 80 },
	sendButton: { backgroundColor: COLORS.silverSand, width: 180, height: '40%' },
	modalButton: {
		padding: 16,
		borderWidth: 4,
		borderRadius: 8,
		width: '40%',
		alignItems: 'center',
		borderColor: '#00E8FC80',
		backgroundColor: COLORS.steelTeal,
	},
})