import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	AsyncStorage,
	TouchableOpacity,
} from "react-native";
import { Card } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
	const [data, setData] = useState([]);

	const getAllContacts = async () => {
		await AsyncStorage.getAllKeys()
			.then(async (keys) => {
				try {
					const result = await AsyncStorage.multiGet(keys);
					setData(
						result.sort(function (a, b) {
							if (JSON.parse(a[1]).fname < JSON.parse(b[1]).fname) {
								return -1;
							}
							if (JSON.parse(a[1]).fname > JSON.parse(b[1]).fname) {
								return 1;
							}
							return 0;
						}),
					);
				} catch (err) {
					return console.log(err);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		navigation.addListener("focus", () => {
			getAllContacts();
		});
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({ item }) => {
					var contact = JSON.parse(item[1]);
					return (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("View", {
									key: item[0].toString(),
								});
							}}
						>
							<Card style={styles.listItem}>
								<View style={styles.iconContainer}>
									<Text style={styles.contactIcon}>
										{contact.fname[0].toUpperCase()}
									</Text>
								</View>
								<View style={styles.infoContainer}>
									<Text style={styles.infoText}>
										{contact.fname + " " + contact.lname}
									</Text>
									<Text style={styles.infoText}>{contact.phone}</Text>
								</View>
							</Card>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(item, index) => item[0].toString()}
			/>

			<TouchableOpacity
				style={styles.floatButton}
				onPress={() => navigation.navigate("Add")}
			>
				<Entypo
					style={styles.contactIcon}
					name="plus"
					size={40}
					color="#000000"
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	listItem: {
		flexDirection: "row",
		padding: 20,
	},
	iconContainer: {
		width: 50,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#000000",
		borderRadius: 100,
	},
	contactIcon: {
		fontSize: 28,
		color: "#fff",
	},
	infoContainer: {
		flexDirection: "column",
	},
	infoText: {
		fontSize: 16,
		fontWeight: "400",
		paddingLeft: 10,
		paddingTop: 2,
	},
	floatButton: {
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.2)",
		alignItems: "center",
		justifyContent: "center",
		width: 60,
		position: "absolute",
		bottom: 10,
		right: 10,
		height: 60,
		backgroundColor: "#000000",
		borderRadius: 100,
	},
});
