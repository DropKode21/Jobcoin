import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { render, fireEvent } from '@testing-library/react-native'

import { AppNavigator } from '../src/navigation'

describe('Testing Jobcoins', () => {
	test('sign in page contains welcome title, input field, and button', () => {
		const component = (
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		)

		const { getByText, getByPlaceholderText } = render(component)
		const buttonLabel = getByText('Sign In')
		const title = getByText('Welcome to Jobcoins')
		const inputPlaceholder = getByPlaceholderText('Enter your address')
	
		expect(title).not.toBeNull()
		expect(buttonLabel).not.toBeNull()
		expect(inputPlaceholder).not.toBeNull()
	})

	test('submitting an address navigates to account screen', async () => {
		const component = (
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		)

		const { findByText, getByText, getByPlaceholderText } = render(component)
		fireEvent(getByPlaceholderText('Enter your address'), 'onChangeText', 'Kyle')
		const onPress = getByText('Sign In')
		fireEvent(onPress, 'press')
		const welcomeText = await findByText('Welcome back, Kyle')
	
		expect(welcomeText).toBeTruthy()
	})

	test('tapping sign out navigates back to account screen', async () => {
		const component = (
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		)

		const { findByText, getByText, getByPlaceholderText } = render(component)
		fireEvent(getByPlaceholderText('Enter your address'), 'onChangeText', 'Kyle')
		const onPressSignIn = getByText('Sign In')
		fireEvent(onPressSignIn, 'press')
		const onPressSignOut = await getByText('Sign out')
		fireEvent(onPressSignOut, 'press')
		const title = getByText('Welcome to Jobcoins')
	
		expect(title).toBeTruthy()
	})
})