<script setup>
import PokeApi from "../services/PokeApi.js"
import { onMounted } from "vue";


const service = new PokeApi()
const pokemones = service.getPokeList()
let cantidad = 150
let inicio = 1


onMounted(async () => {
    await service.fetchPokeList(cantidad, inicio)
})

const getColor = (types) => {
    const typeColor = {
        grass: "green",
        fire: "red",
        water: "blue",
        electric: "yellow",
        ice: "lightblue",
        psychic: "purple",
        dark: "black",
        fairy: "pink",
        bug: "light-green",
        flying: "blue-grey",
        normal: "amber",
        poison: "deep-purple",
        ground: "brown",
        fighting: "indigo",
        rock: "grey-darken-1",
        ghost: "deep-purple-accent-4",
        ice: "light-blue-lighten-4",
        dragon: "teal",


        default: "grey"
    };
    return typeColor[types[0].toLowerCase()] || typeColor.default;
};

</script>

<template>
    <v-row class="px-8" style="margin-top: 16px">
        <v-col cols=" 12" md="4" v-for="pokemon in pokemones" :key="pokemon.id">
            <v-card elevation="16" height="200" :color="getColor(pokemon.types)">
                <v-row>
                    <v-col cols="12">
                        <v-col class="d-flex justify-space-between">
                            <v-card-title>{{ pokemon.id }}</v-card-title>
                            <v-card-title>{{ pokemon.name }}</v-card-title>
                        </v-col>

                        <v-card-subtitle>{{ pokemon.generation }}</v-card-subtitle>
                        <v-card-text v-for="type of pokemon.types">
                            <span style="background-color: #00000040; border-radius: 15px; padding: 7px;">
                                {{ type }}
                            </span>
                        </v-card-text>
                    </v-col>
                    <v-col class="d-flex align-center">
                        <router-link :to="{ name: 'pokemon', params: { id: pokemon.id } }">
                            <img v-if="pokemon.image != null" :src="pokemon.image" class="poke-image position-absolute"
                                style="bottom: 8px; right: 8px" />
                            <img v-else :src="pokemon.imageSecond" class="poke-image" />
                        </router-link>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>

</template>

<style scoped>
.poke-image {
    width: 100px;
    height: 100px;
}
</style>