import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome, FontAwesome6} from '@expo/vector-icons'; 

const Headbar = ({ headBarText,subHeadBarText,onSearchPress, onFiltersPress,onSettingsPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.focusText}>{headBarText}</Text>
        <Text style={styles.upcomingEventsText}>{subHeadBarText}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onSearchPress}>
        <FontAwesome6 name="arrow-up-a-z" size={24} color="black" style={styles.icon} /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={onFiltersPress}>
          <MaterialCommunityIcons name="filter" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        <TouchableOpacity onPress={onSettingsPress}>
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
    padding: 20,
  },
  focusText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  upcomingEventsText: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.6,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
});

export default Headbar;