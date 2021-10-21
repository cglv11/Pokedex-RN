import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { Tabs } from './src/navigation/Tabs';
// import { Navigator } from './src/navigation/Navigator';

const App = () => {
  return (
    <NavigationContainer>
      {/* <Navigator /> */}
      <Tabs />
    </NavigationContainer>
  )
}

export default App
