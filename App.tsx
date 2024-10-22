import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar'; // Ensure you're importing from 'expo-status-bar' correctly
import RootNavigation from './src/screens/navigation/RootNavigation';

const App = () => {
  return (
    <Container>
      <StatusBar style="auto" />
      <RootNavigation />
    </Container>
  );
}

export default App;

const Container = styled(View)`
  flex: 1;
`;
