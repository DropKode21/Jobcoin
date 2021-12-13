import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn, Account } from '../screens'

export const AppRoute = { SIGN_IN: 'SignIn', ACCOUNT: 'Account' }

const Stack = createStackNavigator()

const stackScreens = [
	{ name: AppRoute.SIGN_IN, component: SignIn },
	{ name: AppRoute.ACCOUNT, component: Account },
]

export const AppNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				cardOverlayEnabled: true,
				gestureEnabled: true,
				headerShown: false,
				headerMode: 'screen',
				presentation: 'modal',
			}}
		>
			{stackScreens.map(screen => (
				<Stack.Screen
					key={screen.name}
					name={screen.name}
					component={screen.component}
				/>
			))}
		</Stack.Navigator>
	)
}
