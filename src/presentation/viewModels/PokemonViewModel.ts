import { useInfiniteQuery } from 'react-query'
import { GetPokemonsUseCase } from '../../domain/usecases/GetPokemonsUseCase'
import { PokemonRepository } from '../../application/repositories/PokemonRepository'
import { useCallback, useMemo, useState } from 'react'

const pokemonRepository = new PokemonRepository()
const getPokemonUseCase = new GetPokemonsUseCase(pokemonRepository)

const fetchPokemons = async ({ pageParam = 0 }) => {
  const limit = 10
  const offset = pageParam * limit

  return await getPokemonUseCase.execute(limit, offset)
}

export default function usePokemonViewModel() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const {
    data,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery(
    ['pokemons'],
    ({ pageParam }) => fetchPokemons({ pageParam }),
    {
      getNextPageParam: (_, allPages) => {
        return allPages.length
      }
    }
  )

  const onRefresh = useCallback(() => {
    if (!isRefreshing) {
      setIsRefreshing(true)

      refetch()
        .then(() => setIsRefreshing(false))
        .catch(() => setIsRefreshing(false))
    }
  }, [isRefreshing, refetch])

  const loadNext = useCallback(() => {
    hasNextPage && fetchNextPage()
  }, [fetchNextPage, hasNextPage])

  const flattenData = useMemo(() => {
    return data?.pages.flat() || []
  }, [data?.pages])

  return {
    pokemons: flattenData,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isRefreshing,
    fetchNextPage: loadNext,
    onRefresh
  }
}
