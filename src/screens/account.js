import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, Dimensions, Pressable, Modal } from 'react-native'
import { GET_ACCOUNT_INFO_URL, POST_ACCOUNT_TRANSACTION_URL } from '../services'
import { MONTHS } from '../utils'
import {
	HeaderText,
	AccountInfoText,
	SendButton,
	Underline,
	LabelText,
	ModalButton,
	TransactionHistory
} from '../components'
import STYLES from '../styles'
import COLORS from '../styles/colors'

const { width } = Dimensions.get('window')
const initialHistory = { labels: [], datasets: [{ data: [] }]}

export const Account = ({ navigation, route }) => {
	const { address } = route.params
	const [accountInfo, setAccountInfo] = useState({ balance: 0, transactions: [] })
	const [sendInfo, setSendInfo] = useState({ to: '', amount: ''})
	const [history, setHistory] = useState(initialHistory)
	const [loading, setLoading] = useState(true)
	const [displayModal, setDisplayModal] = useState(false)
	
	const getAccountInfo = async () => {
		const resp = await fetch(`${GET_ACCOUNT_INFO_URL}/${address}`).then(res => res.json())
		setAccountInfo(resp)
		const transactions = resp.transactions.reduce((data, transaction) => {
			const d = new Date(transaction.timestamp)
			const month = MONTHS[d.getMonth()]
			if (!data.labels.includes(month)) {
				data.labels.push(month)
			}
			const amount = address === transaction.toAddress ? transaction.amount : -Math.abs(transaction.amount)
			data.datasets[0]['data'].push(amount)
			return data
		}, { labels: [], datasets: [{ data: [] }]})
		setHistory(transactions)
		setLoading(false)
	}
	useEffect(() => {
		getAccountInfo()
	}, [])

	const sendCoin = async () => {
		await fetch(`${POST_ACCOUNT_TRANSACTION_URL}?fromAddress=${address}&toAddress=${sendInfo.to}&amount=${sendInfo.amount}`, { method: 'POST'}).then(res => res.json())
		getAccountInfo()
	}

	return (
		<View style={[STYLES.centerFlex, { backgroundColor: COLORS.black }]}>
			<View style={styles.header}>
				<HeaderText text={`Welcome back, ${address}`} />
				<Pressable onPress={() => navigation.goBack()}>
					<HeaderText text={'Sign out'} />
				</Pressable>
			</View>
			<View style={[STYLES.centerFlex, { paddingTop: '16%' }]}>
				<AccountInfoText size={40} text={`$${accountInfo.balance}`} />
				<AccountInfoText size={24} text={'Account Balance'} />
			</View>
			<View style={{ paddingTop: '16%'}}>
				{!loading && <TransactionHistory history={history} accountInfo={accountInfo} />}
			</View>
			<SendButton onPress={() => setDisplayModal(!displayModal)} />
			<Modal animationType='slide' transparent={true} visible={displayModal}>
				<View style={[STYLES.centerFlex, styles.modalOuterContainer]}>
						<View style={styles.modalInnerContainer}>
							<View style={styles.inputContainer}>
								<View style={[STYLES.centerNoFlex, styles.inputSize]}>
									<TextInput
										onChangeText={input => setSendInfo(prevInfo => ({ ...prevInfo, amount: input }))}
										value={sendInfo.amount}
										keyboardType={'number-pad'}
										textAlign={'center'}
										style={styles.textInput}
										autoCorrect={false}
										autoFocus
									/>
								</View>
								<Underline color={COLORS.steelTeal} />
								<LabelText text={'Amount'} />
								<View style={[STYLES.centerNoFlex, styles.inputSize]}>
									<TextInput
										onChangeText={input => setSendInfo(prevInfo => ({ ...prevInfo, to: input }))}
										value={sendInfo.to}
										textAlign={'center'}
										style={styles.textInput}
										autoCorrect={false}
									/>
								</View>
								<Underline color={COLORS.steelTeal} />
								<LabelText text={'To'} />
							</View>
							<View style={styles.buttonContainer}>
								<ModalButton onPress={() => setDisplayModal(!displayModal)} text={'Cancel'} />
								<ModalButton
									onPress={() => {
										sendCoin()
										setDisplayModal(!displayModal)
										setSendInfo({ to: '', amount: ''})
									}}
									text={'Send'}
								/>
							</View>
						</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		padding: '2%',
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 4,
		backgroundColor: COLORS.silverSand,
	},
	modalOuterContainer: {
		elevation: 5,
		backgroundColor: 'transparent',
	},
	modalInnerContainer: {
		backgroundColor:  COLORS.lightGray,
		height: '40%',
		width: width / 1.5,
		borderRadius: 8,
	},
	inputContainer: {
		margin: 10,
		height: '70%',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	inputSize: { width: '90%', height: '30%' },
	textInput: { color: 'black', fontSize: 40 },
	buttonContainer: { justifyContent: 'space-evenly', flexDirection: 'row' },
})
