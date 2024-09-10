import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import React from 'react'

import { useRoute } from '@react-navigation/native'
import { RootRouteProp } from '../../../App'

import useUserViewModel from '../viewModels/UserViewModel'

const UserDetailScreen = () => {
  const { id } = useRoute<RootRouteProp<'UserDetail'>>()?.params

  const { user, loading } = useUserViewModel(id)

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>
            {user?.id}: {user?.name} - {user?.email}
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default UserDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  text: {
    fontSize: 20,
    fontWeight: '500'
  }
})
