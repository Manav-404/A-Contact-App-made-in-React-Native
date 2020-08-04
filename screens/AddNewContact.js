import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Keyboard,
	AsyncStorage,
	Alert,
	TouchableWithoutFeedback,
	ScrollView,
} from "react-native";
import { Button, Form, Item, Input, Label } from "native-base";

export default function AddNewContact({ navigation }) {
	const [values, setValues] = useState({
		fname: "",
		lname: "",
		phone: Number,
		email: "",
		address: "",
	});

	const saveContact = async () => {
		if (
			values.fname !== "" &&
			values.lname !== "" &&
			values.phone !== "" &&
			values.email !== "" &&
			values.address !== ""
		) {
			const contact = {
				fname: values.fname,
				lname: values.lname,
				phone: values.phone,
				email: values.email,
				address: values.address,
			};

			await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contact))
				.then(() => {
					navigation.goBack();
				})
				.catch((err) => console.log(err));
		} else {
			Alert.alert("All feilds are necessary");
		}
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
			<ScrollView style={styles.container}>
				<Form>
					<Item style={styles.inputItem}>
						<Label>First Name</Label>
						<Input
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="default"
							onChangeText={(fname) => setValues({ ...values, fname: fname })}
						/>
					</Item>
					<Item style={styles.inputItem}>
						<Label>Last Name</Label>
						<Input
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="default"
							onChangeText={(lname) => setValues({ ...values, lname: lname })}
						/>
					</Item>
					<Item style={styles.inputItem}>
						<Label>Phone</Label>
						<Input
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="number-pad"
							onChangeText={(phone) => setValues({ ...values, phone: phone })}
						/>
					</Item>
					<Item style={styles.inputItem}>
						<Label>Email</Label>
						<Input
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="email-address"
							onChangeText={(email) => setValues({ ...values, email: email })}
						/>
					</Item>
					<Item style={styles.inputItem}>
						<Label>Address</Label>
						<Input
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="default"
							onChangeText={(address) =>
								setValues({ ...values, address: address })
							}
						/>
					</Item>
				</Form>
				<Button style={styles.button} full onPress={() => saveContact()}>
					<Text style={styles.buttonText}>Save</Text>
				</Button>
				<View style={styles.empty}></View>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		margin: 10,
		height: 500,
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
		fontSize: 20,
	},
	empty: {
		height: 400,
		backgroundColor: "#FFF",
	},
});
