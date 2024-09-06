import React from 'react'

import {
  DefaultTheme,
  NavigationContainer,
  RouteProp
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import PokemonScreen from './src/presentation/screens/PokemonScreen'

import { QueryClient, QueryClientProvider } from 'react-query'

import { StatusBar } from 'react-native'

const queryClient = new QueryClient()

const theme = Object.freeze({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  }
})

export type AppStackParams = {
  Pokemon: undefined
}

export type RootRouteProp<RouteName extends keyof AppStackParams> = RouteProp<
  AppStackParams,
  RouteName
>

const Stack = createNativeStackNavigator<AppStackParams>()

export default function RootStack() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Pokemon" component={PokemonScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
