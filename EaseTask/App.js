// App.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Headbar from './src/Components/Headbar';

const App = () => {
  const handleIcon1Press = () => {
    // Handle the press event for the first icon
    console.log('Icon 1 pressed');
  };

  const handleIcon2Press = () => {
    // Handle the press event for the second icon
    console.log('Icon 2 pressed');
  };

  const showSearchIcon = true;
  const headbarText = "New task"

  return (
    <View style={styles.container}>
      <Headbar showSearchIcon={showSearchIcon} headbarText={headbarText} onSearchPress={handleIcon1Press} onOptionsPress={handleIcon2Press} />
      {/* Add the rest of your app components below */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
