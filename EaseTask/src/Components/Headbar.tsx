import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome, FontAwesome6} from '@expo/vector-icons'; 
import DV from './defaultValues';

const Headbar = ({ showIcons,headBarText,subHeadBarText,onSearchPress, onFiltersPress,onSettingsPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={DV.styles.headerCaptionText}>{headBarText}</Text>
        <Text style={DV.styles.headerSubcaptionText}>{subHeadBarText}</Text>
      </View>
      {showIcons ? (
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onSearchPress}>
        <FontAwesome6 name="arrow-up-a-z" size={24} color="black" style={styles.icon} /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={onFiltersPress}>
          <MaterialCommunityIcons name="filter" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        {/* <TouchableOpacity onPress={onSettingsPress}>
          <FontAwesome name="gear" size={24} color="black" style={styles.icon} />
        </TouchableOpacity> */}
      </View>) : null}
    </View>
    
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15, 
    justifyContent: 'space-between',
    padding: 20,
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
