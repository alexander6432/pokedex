<script setup>
import { onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import PokeApIn from "../services/PokeIndividual";
import Evolution from "./Evolution.vue";

const route = useRoute()
const pokemonId = route.params.id

const service = new PokeApIn();
const pokemon = service.getPokemon()

onBeforeMount(async () => {
    await service.fetchPokemon(pokemonId)
});

watch(() => route.params.id, async (actual) => {
    await service.fetchPokemon(actual)
})


</script>

<template>
    <v-app style="background-color: aquamarine;">
        <v-container class="d-flex justify-center align-center">
            <v-sheet rounded elevation="16" max-width="1200" width="90%" height="500px"
                class="d-flex align-center justify-center flex-wrap text-center">
                <v-col>
                    <v-row class="d-flex justify-space-around">
                        <h1>{{ pokemon.name }}</h1>
                        <h1>{{ pokemon.id }}</h1>
                    </v-row>
                </v-col>
                <v-divider></v-divider>
                <v-row class="d-flex justify-space-beetween align-center">
                    <v-col>
                        <h2 v-if="pokemon.baby">Fase Baby</h2>
                        <h2 v-if="pokemon.legendary">Legendary</h2>
                        <h2 v-if="pokemon.mythical">Mythical</h2>
                    </v-col>
                    <v-col>
                        <p>{{ pokemon.generation }}</p>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col>
                        <h3 class="d-flex align-center justify-center" v-for="type of pokemon.types"
                            style="margin-top: 10px;">
                            <span
                                style="background-color: #00000090; padding: 3px; padding-inline:20px;  border-radius: 12px">
                                Type: {{ type }}
                            </span>
                        </h3>
                    </v-col>
                    <v-col class="d-flex justify-end align-end">
                        <img v-if="pokemon.image != null" :src="pokemon.image" />
                        <img v-else :src="pokemon.imageSecond" />
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col>
                        <Evolution :url="pokemon.url" :color="pokemon.color" />
                    </v-col>
                </v-row>
            </v-sheet>
        </v-container>
    </v-app>

</template>
<style scoped>
img {
    width: 250px;
    height: 250px;
}
</style>