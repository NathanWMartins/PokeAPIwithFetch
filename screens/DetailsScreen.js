import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    ScrollView,
    ImageBackground,
    Dimensions,
} from 'react-native';

import backgroundImage from '../assets/background.jpg';

export default function DetailsScreen({ route }) {
    const { pokemonUrl } = route.params;
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const res = await fetch(pokemonUrl);
                const data = await res.json();
                setPokemon(data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do Pokémon:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    if (loading || !pokemon) {
        return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
    }

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Image
                        source={{ uri: pokemon.sprites.front_default }}
                        style={styles.avatar}
                    />
                    <View style={styles.details}>
                        <Text style={styles.name}>{pokemon.name}</Text>
                        <Text style={styles.infoText}>Peso: {pokemon.weight}</Text>
                        <Text style={styles.infoText}>Altura: {pokemon.height}</Text>

                        <View style={styles.typesBox}>
                            <Text style={styles.typesTitle}>Tipos:</Text>
                            {pokemon.types.map((typeObj) => (
                                <Text key={typeObj.slot} style={styles.type}>
                                    {typeObj.type.name}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('window').height, // Garante que o fundo ocupa toda a altura
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 12,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        alignItems: 'center',
        alignSelf: 'center',
        maxWidth: 350,
        width: '100%',
    },
    avatar: {
        width: 100,
        height: 100,
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: 'capitalize',
    },
    infoText: {
        fontSize: 16,
        marginBottom: 6,
    },
    typesBox: {
        marginTop: 10,
    },
    typesTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    type: {
        fontSize: 14,
        backgroundColor: '#e0e0e0',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        marginRight: 8,
        marginBottom: 4,
        alignSelf: 'flex-start',
        textTransform: 'capitalize',
    },
});
