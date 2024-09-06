import { Pokemon } from '../../domain/entities/Pokemon'

import client from '../../infrastructure/network/PokemonApiClient'

import { IPokemonRepository } from '../models/IPokemonRepository'

export class PokemonRepository implements IPokemonRepository {
  async getAllPokemons(limit: number, offset: number): Promise<Pokemon[]> {
    const response = await client.get('pokemon', {
      params: { limit, offset }
    })

    const data = response?.data

    return data?.results.map(({ name, url }: any) =>
      Pokemon.setPokemonData({
        image: `https://img.pokemondb.net/artwork/${name}.jpg`,
        name,
        url
      })
    )
  }
}
