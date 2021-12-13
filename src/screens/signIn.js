import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AppRoute } from '../navigation'
import { SignInButton, SignInTextInput, TitleText } from '../components'
import COLORS from '../styles/colors'

export const SignIn = ({ navigation }) => {
	const [address, setAddress] = useState('')
	const [errMsg, setErrMsg] = useState('')
	const signIn = () => {
		if (address.length === 0) {
			setErrMsg('Please enter an address')
			setTimeout(() => {
				setErrMsg('')
			}, 3000)
			return
		}
		navigation.navigate(AppRoute.ACCOUNT, { address })
	}

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<TitleText text={'Welcome to Jobcoins'} />
			</View>
			<View style={styles.iconContainer}>
				<FontAwesome5 name='coins' size={80} color={COLORS.electricBlue} />
			</View>
			<View style={styles.signInContent}>
				<SignInTextInput
					setInput={setAddress}
					value={errMsg || address}
					color={errMsg ? 'red' : COLORS.electricBlue}
				/>
				<SignInButton onPress={signIn} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: 'black'},
	iconContainer: { flex: 0.5, alignItems: 'center' },
	signInContent: { flex: 1, justifyContent: 'space-evenly' },
	titleContainer: { flex: 1, paddingTop: '16%', alignItems: 'center' },
})