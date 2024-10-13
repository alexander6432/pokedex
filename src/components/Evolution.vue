<script setup>
import PokeEvol from "../services/PokeEvolution.js";
import { onUpdated } from "vue";

const props = defineProps({
    url: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false,
        default: "grey"
    }
})

const service = new PokeEvol();
const evolution = service.getPokeEvolution();

onUpdated(async () => {
    await service.fetchPokeEvolution(props.url)
});

</script>

<template>
    <v-btn :color="color">
        Evoluciones
        <v-menu activator="parent">
            <v-list>

                <v-list-item>
                    <router-link :to="{ name: 'pokemon', params: { id: evolution.name } }">
                        <v-list-item-title>Inicial: {{ evolution.name }}</v-list-item-title>
                    </router-link>
                </v-list-item>

                <v-list-item v-for="evolucion of evolution.evol1">
                    <router-link :to="{ name: 'pokemon', params: { id: evolucion } }">
                        <v-list-item-title>
                            {{ evolution.evol1.length == 1 ? "1ª Evolución: " : "Evoluciones: " }} {{ evolucion }}
                        </v-list-item-title>
                    </router-link>

                </v-list-item>
                <v-list-item v-for="evolucion2 of evolution.evol2">
                    <router-link :to="{ name: 'pokemon', params: { id: evolucion2 } }">
                        <v-list-item-title>2ª Evolución: {{ evolucion2 }}</v-list-item-title>
                    </router-link>
                </v-list-item>

            </v-list>

        </v-menu>
    </v-btn>
</template>

<style scoped></style>
