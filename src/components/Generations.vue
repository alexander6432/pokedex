<script setup>
import PokeGeneration from "../services/PokeGeneration.js"
import { onMounted, ref } from "vue";

const service = new PokeGeneration
const generation = service.getGeneration()

onMounted(async () => {
    await service.fetchGeneration()
})

const listGen = [];
for (let i = 1; i <= 9; i++) {
    listGen.push(i);
}

const selector = ref(0)

const drawer = ref(false)

</script>

<template>
    <v-app-bar elevation="4" scroll-behavior="hide" color="red">
        <template v-slot:prepend>
            <v-btn icon="mdi-pokeball" color="blue" @click.stop="drawer = !drawer">

            </v-btn>
        </template>

        <v-app-bar-title>
            <RouterLink to="/">
                <v-img src="../assets/pokemon-logo.svg" class="pokemon"></v-img>
            </RouterLink>
        </v-app-bar-title>
    </v-app-bar>


    <v-navigation-drawer temporary v-model="drawer">
        <v-list bg-color="red">
            <v-list-item prepend-avatar="../assets/pokemon-trainer.svg" subtitle="Buscador"
                title="Pokemon"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-btn variant="tonal" block>
            generación {{ selector + 1 }}
            <v-menu open-on-hover activator="parent">
                <v-list>
                    <v-list-item v-for="numero of listGen" @click="selector = numero - 1"> Generación: {{
                        numero }}</v-list-item>
                </v-list>
            </v-menu>
        </v-btn>

        <v-list density="compact" nav>
            <v-list-item v-for="pokemon of generation[selector]">
                <router-link :to="{ name: 'pokemon', params: { id: pokemon } }">
                    <v-list-item-title>
                        {{ pokemon }}
                    </v-list-item-title>
                </router-link>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
.pokemon {
    height: 60px;
}
</style>
