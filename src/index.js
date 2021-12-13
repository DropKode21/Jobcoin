import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AppNavigator } from './navigation'
import COLORS from './styles/colors'

function App() {
	return (
		<NavigationContainer>
			<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
				<StatusBar hidden />
				<AppNavigator />
			</SafeAreaView>
		</NavigationContainer>
	)
}

export default App
