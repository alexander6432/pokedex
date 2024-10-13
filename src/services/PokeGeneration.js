import { ref } from 'vue'

export default class Generation {
  constructor() {
    this.generation = ref([])

  }

  getGeneration() {
    return this.generation
  }

  async fetchGeneration() {
    let gen = 9 
    for (let i = 1; i <= gen; i++) {
      try {
        const url = `https://pokeapi.co/api/v2/generation/${i}`
        const response = await fetch(url)
        const json = await response.json()

        this.generation.value[i - 1] = []

        for(let j = 0; j < json.pokemon_species.length; j++){
          this.generation.value[i-1].push(json.pokemon_species[j].name)
        }
       
      } catch (error) {
        console.error(error)
      }
    }
  }
}
