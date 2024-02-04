import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 

const Headbar = ({ showSearchIcon, headbarText, onSearchPress, onOptionsPress }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.text}>
        {headbarText}
      </Text>
      <View style={styles.iconsContainer}>
        {showSearchIcon && (
          <TouchableOpacity onPress={onSearchPress}>
            <AntDesign name="search1" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onOptionsPress}>
          <FontAwesome name="gear" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#ffffff', // Changed to white to match the image
    marginBottom: 15, // Margin to have a better result when there is something below the headbar
    marginTop: 15
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15, 
  },
  text: {
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#000000', 
    flex: 1, 
    marginRight: 15
  },
});

export default Headbar;
