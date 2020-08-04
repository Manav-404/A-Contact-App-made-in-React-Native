import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	AsyncStorage,
	Alert,
} from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";

export default function EditContact({ route, navigation }) {
	const [values, setValues] = useState({
		fname: "",
		lname: "",
		phone: Number,
		email: "",
		address: "",
		key: "",
	});

	useEffect(() => {
		navigation.addListener("focus", () => {
			const { key } = route.params;
			getContact(key);
		});
	}, []);

	const getContact = async (key) => {
		await AsyncStorage.getItem(key)
			.then((contact) => {
				var c = JSON.parse(contact);
				c["key"] = key;
				setValues(c);
			})
			.catch((err) => console.log(err));
	};

	const updateContact = async (key) => {
		if (
			values.fname !== "" &&
			values.lname !== "" &&
			values.phone !== "" &&
			values.email !== "" &&
			values.address !== ""
		) {
			var contact = {
				fname: values.fname,
				lname: values.lname,
				phone: values.phone,
				email: values.email,
				address: values.address,
			};

			await AsyncStorage.mergeItem(key, JSON.stringify(contact))
				.then(() => {
					navigation.goBack();
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.container}>
				<Form>
					<Item>
						<Label style={styles.inputItem}>First Name</Label>
						<Input
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="default"
							value={values.fname}
							onChangeText={(fname) => {
								setValues({ ...values, fname });
							}}
						/>
					</Item>
					<Item>
						<Label style={styles.inputItem}>Last Name</Label>
						<Input
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="default"
							value={values.lname}
							onChangeText={(lname) => setValues({ ...values, lname })}
						/>
					</Item>
					<Item>
						<Label style={styles.inputItem}>Phone</Label>
						<Input
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="number-pad"
							value={values.phone}
							onChangeText={(phone) => setValues({ ...values, phone })}
						/>
					</Item>
					<Item>
						<Label style={styles.inputItem}>Email</Label>
						<Input
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="email-address"
							value={values.email}
							onChangeText={(email) => setValues({ ...values, email })}
						/>
					</Item>
					<Item>
						<Label style={styles.inputItem}>Address</Label>
						<Input
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="default"
							value={values.address}
							onChangeText={(address) => setValues({ ...values, address })}
						/>
					</Item>
				</Form>
				<Button
					full
					rounded
					style={styles.button}
					onPress={() => updateContact(values.key)}
				>
					<Text style={styles.buttonText}>Update</Text>
				</Button>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		margin: 10,
	},
	inputItem: {
		margin: 10,
	},
	button: {
		backgroundColor: "#000000",
		marginTop: 40,
		marginLeft: 20,
		marginRight: 20,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
