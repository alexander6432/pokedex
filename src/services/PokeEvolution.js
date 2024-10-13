import { ref } from 'vue'

export default class PokeEvol {
  constructor() {

    this.pokeEvolution = ref({})

  }

  getPokeEvolution() {
    return this.pokeEvolution
  }

  async fetchPokeEvolution(link) {
    try {
      const response = await fetch(link)
      const json = await response.json()
      this.pokeEvolution.value={
        id: json.id,
        name: json.chain.species.name,
        evol1: [],
        evol2: [],
      }

      for(let i = 0; i < json.chain.evolves_to.length; i++){
        this.pokeEvolution.value.evol1.push(json.chain.evolves_to[i].species.name)
      } 

      for (let j = 0; j < json.chain.evolves_to.length; j++) {
        const firstEvolution = json.chain.evolves_to[j]
      
        for (let k = 0; k < firstEvolution.evolves_to.length; k++) {
          this.pokeEvolution.value.evol2.push(firstEvolution.evolves_to[k].species.name)
        }
      }

    } catch (error) {
      console.error(error)
    }
  }
}
