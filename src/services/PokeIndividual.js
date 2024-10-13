import { ref } from 'vue'

export default class PokeApIn {
  constructor() {
    this.pokemon = ref({})

  }

  getPokemon() {
    return this.pokemon
  }

  async fetchPokemon(numero) {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${numero}`
      const response = await fetch(url)
      const json = await response.json()

      const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${numero}`
      const responseSpecies = await fetch(urlSpecies)
      const jsonSpecies = await responseSpecies.json()

      this.pokemon.value = {
        url: jsonSpecies.evolution_chain.url,
        color:jsonSpecies.color.name,
        baby: jsonSpecies.is_baby,
        legendary: jsonSpecies.is_legendary,
        mythical: jsonSpecies.is_mythical,
        generation: jsonSpecies.generation.name,
        id: json.id,
        name: json.name,
        image: json.sprites.other.dream_world.front_default,
        imageSecond: json.sprites.other.home.front_default,
      
        types: [],
        }
        for(let i = 0; i < json.types.length; i++){
          this.pokemon.value.types.push(json.types[i].type.name)
      }

    } catch (error) {
      console.error(error)
    }
  }
}
