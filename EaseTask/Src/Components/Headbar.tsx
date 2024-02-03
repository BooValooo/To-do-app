
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';


const Headbar = ({ showSearchIcon, headbarText, onSearchPress, onOptionsPress }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.text}>
        {headbarText}
      </Text>
      {showSearchIcon ?
        (<TouchableOpacity onPress={onSearchPress} style={styles.iconContainer}>
          <AntDesign name="search1" size={24} color="black" />
         </TouchableOpacity>
        ) : null}
      <TouchableOpacity onPress={onOptionsPress} style={styles.iconContainer}>
        <FontAwesome6 name="gear" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: '#e0e0e0',
    height: 80,
  },
  iconContainer: {
    padding: 10,
  },
  text: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginLeft: 10,
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: "auto"
  },
});

export default Headbar;
