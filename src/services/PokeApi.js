import { ref } from 'vue'

export default class PokeApi {
  constructor() {
    this.pokeList = ref([])

  }

  getPokeList() {
    return this.pokeList
  }

  async fetchPokeList(cantidad, inicio) {
    let total = cantidad + inicio
    for (inicio; inicio <= total; inicio++) {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${inicio}`
        const response = await fetch(url)
        const json = await response.json()

        const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${inicio}`
        const responseSpecies = await fetch(urlSpecies)
        const jsonSpecies = await responseSpecies.json()

        this.pokeList.value.push({
          id: json.id,
          name: json.name,
          image: json.sprites.other.dream_world.front_default,
          imageSecond: json.sprites.other.home.front_default,
          types: [],
          url: jsonSpecies.evolution_chain.url,
          generation: jsonSpecies.generation.name,
          
        })
       
        for(let j = 0; j < json.types.length; j++){
          this.pokeList.value[this.pokeList.value.length - 1].types.push(json.types[j].type.name)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
