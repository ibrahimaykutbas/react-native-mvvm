import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import React from 'react'

import usePokemonViewModel from '../viewModels/PokemonViewModel'

import { Pokemon } from '../../domain/entities/Pokemon'

import { FlashList } from '@shopify/flash-list'

import FastImage from 'react-native-fast-image'

const PokemonScreen = () => {
  const {
    pokemons,
    error,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isRefreshing,
    fetchNextPage,
    onRefresh
  } = usePokemonViewModel()

  if (isFetching && !isFetchingNextPage) {
    return <ActivityIndicator size="large" />
  }

  if (error) {
    return <Text>Unexpected Error</Text>
  }

  return (
    <View style={styles.container}>
      <FlashList<Pokemon>
        data={pokemons}
        estimatedItemSize={10}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <FastImage
              style={styles.image}
              source={{
                uri: item.image,
                priority: FastImage.priority.high
              }}
              resizeMode={FastImage.resizeMode.contain}
            />

            <View style={styles.textContainer}>
              <Text style={styles.title} adjustsFontSizeToFit>
                {item.name}
              </Text>
            </View>
          </View>
        )}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage()
        }}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.8}
        ListEmptyComponent={
          <View>
            <Text>Empty Data</Text>
          </View>
        }
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  )
}

export default PokemonScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
    textTransform: 'capitalize'
  },
  textContainer: {
    gap: 5
  }
})
