import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Button,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
} from "react-native";
import PokemonCard from "../components/PokemonCard";

export default function HomeScreen({ navigation }) {
    const [pokemons, setPokemons] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPokemons = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0");
            const json = await res.json();

            const detalhes = await Promise.all(
                json.results.map(async (p) => {
                    const resDetalhe = await fetch(p.url);
                    return await resDetalhe.json();
                })
            );

            setPokemons(detalhes);
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
        } finally {
            setLoading(false);
        }
    };

    const pokemonsFiltrados = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filtro.toLowerCase())
    );

    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokémons</Text>
            <TextInput
                style={styles.input}
                placeholder="Pesquisar por nome..."
                value={filtro}
                onChangeText={setFiltro}
            />
            <TouchableOpacity style={styles.button} onPress={fetchPokemons}>
                <Text style={styles.buttonText}>Recarregar</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" style={styles.loader} />
            ) : (
                <FlatList
                    data={pokemonsFiltrados}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <PokemonCard
                            pokemon={item}
                            onPress={() =>
                                navigation.navigate("Detalhes", {
                                    pokemonUrl: `https://pokeapi.co/api/v2/pokemon/${item.id}/`,
                                })
                            }
                        />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 16,
        backgroundColor: "#f2f2f2",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 10,
        padding: 8,
    },
    loader: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#006400',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
