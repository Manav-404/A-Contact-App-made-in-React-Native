import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Linking,
	Platform,
	Alert,
	AsyncStorage,
} from "react-native";
import { Card, CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons";
import EditContact from "./EditContact";

export default function ViewContact({ route, navigation }) {
	const [cont, setCont] = useState({
		fname: "a",
		lname: "a",
		phone: "a",
		email: "a",
		address: "a",
		key: "a",
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
				setCont({
					...cont,
					fname: c.fname,
					lname: c.lname,
					phone: c.phone,
					email: c.email,
					address: c.address,
					key: c.key,
				});
			})
			.catch((err) => console.log(err));
	};

	const editContact = (key) => {
		navigation.navigate("Edit", {
			key: key,
		});
	};

	const deleteContact = (key) => {
		Alert.alert("Delete Contact", `${cont.fname} ${cont.lname}`, [
			{
				text: "Cancel",
				onPress: () => console.log("cancelled"),
			},
			{
				text: "OK",
				onPress: async () => {
					AsyncStorage.removeItem(key)
						.then(() => navigation.goBack())
						.catch((err) => console.log(err));
				},
			},
		]);
	};

	const callAction = (phone) => {
		let phoneNumber = phone;
		if (Platform.OS !== "android") {
			phoneNumber = `telpromt:${phone}`;
		} else {
			phoneNumber = `tel:${phone}`;
		}
		Linking.canOpenURL(phoneNumber)
			.then((supported) => {
				if (!supported) {
					Alert.alert("Phone Number Not Available");
				} else {
					return Linking.openURL(phoneNumber);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.contactIconContainer}>
				<Text style={styles.contactIcon}>{cont.fname[0].toUpperCase()}</Text>
				<View style={styles.nameContainer}>
					<Text style={styles.name}>
						{cont.fname} {cont.lname}
					</Text>
				</View>
			</View>

			<View style={styles.infoContainer}>
				<Card>
					<CardItem bordered>
						<Text style={styles.infoText}>Phone</Text>
					</CardItem>
					<CardItem bordered>
						<Text>{cont.phone}</Text>
					</CardItem>
					<CardItem bordered>
						<Text style={styles.infoText}>Email</Text>
					</CardItem>
					<CardItem bordered>
						<Text>{cont.email}</Text>
					</CardItem>
					<CardItem bordered>
						<Text style={styles.infoText}>Address</Text>
					</CardItem>
					<CardItem bordered>
						<Text>{cont.address}</Text>
					</CardItem>
				</Card>
			</View>
			<Card style={styles.actionContainer}>
				<CardItem bordered style={styles.actionButton}>
					<TouchableOpacity
						onPress={() => {
							callAction(cont.phone);
						}}
					>
						<Entypo name="phone" size={22} color="black" />
					</TouchableOpacity>
				</CardItem>
			</Card>
			<Card style={styles.actionContainer}>
				<CardItem bordered style={styles.actionButton}>
					<TouchableOpacity
						onPress={() => {
							editContact(cont.key);
						}}
					>
						<Entypo name="edit" size={22} color="black" />
					</TouchableOpacity>
				</CardItem>
			</Card>
			<Card style={styles.actionContainer}>
				<CardItem bordered style={styles.actionButton}>
					<TouchableOpacity
						onPress={() => {
							deleteContact(cont.key);
						}}
					>
						<Entypo name="trash" size={22} color="black" />
					</TouchableOpacity>
				</CardItem>
			</Card>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	contactIconContainer: {
		height: 200,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	contactIcon: {
		fontSize: 100,
		fontWeight: "bold",
		color: "#fff",
	},
	nameContainer: {
		width: "100%",
		height: 70,
		padding: 10,
		backgroundColor: "rgba(255,255,255,0.5)",
		justifyContent: "center",
		position: "absolute",
		bottom: 0,
	},
	name: {
		fontSize: 24,
		color: "#fff",
		fontWeight: "900",
	},
	infoText: {
		fontSize: 18,
		fontWeight: "300",
	},
	actionContainer: {
		flexDirection: "row",
	},
	actionButton: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	actionText: {
		color: "#B83227",
		fontWeight: "900",
	},
	infoContainer: {
		flexDirection: "column",
	},
});
