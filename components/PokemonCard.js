import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function PokemonCard({ pokemon, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Image
                    source={{ uri: pokemon.sprites.front_default }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{pokemon.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginVertical: 6,
        padding: 12,
        borderRadius: 8,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
});
