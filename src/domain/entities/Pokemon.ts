export interface PokemonData {
  name: string
  url: string
  image: string
}

export class Pokemon {
  constructor(public name: string, public url: string, public image: string) {}

  static setPokemonData(obj: PokemonData): Pokemon {
    return new Pokemon(obj.name, obj.url, obj.image)
  }
}
