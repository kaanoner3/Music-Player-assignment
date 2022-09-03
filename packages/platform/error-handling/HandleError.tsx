import { Button } from '@skoove/design-system.button'
import { Text } from '@skoove/design-system.text'
import { spacing } from '@skoove/design-system.theme'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface HandleErrorProps {
  errorMessage: string
  reset: () => void
}

export const HandleError = ({ errorMessage, reset }: HandleErrorProps) => {
  console.log('burdamı')
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Something went wrong :(</Text>
      <Text style={styles.text}>Error: {errorMessage}</Text>
      <Button onPress={reset} style={styles.button}>
        <Text>Try again</Text>
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f6f6f6',
    borderRadius: 6,
    padding: spacing.s12,
    marginTop: spacing.s8,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingVertical: spacing.s8,
    textAlign: 'center',
    color: '#000',
  },
})
