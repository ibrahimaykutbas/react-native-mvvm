import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet
} from 'react-native'
import React from 'react'

import useUsersViewModel from '../viewModels/UsersViewModel'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackParams } from '../../../App'

const UsersScreen = () => {
  const { users, loading } = useUsersViewModel()

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>()

  const goToUserDetail = (id: number) =>
    navigation.navigate('UserDetail', { id })

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <Pressable
              style={styles.user}
              onPress={() => goToUserDetail(item?.id)}>
              <Text>{item?.name}</Text>
              <Text>{item?.email}</Text>
            </Pressable>
          )}
          keyExtractor={item => item?.id.toString()}
        />
      )}
    </SafeAreaView>
  )
}

export default UsersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25
  },
  user: {
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  }
})
