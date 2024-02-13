import { StyleSheet } from "react-native";
class DV{
    // All
    public static readonly backgroundColor: '#FFFFFF';
    public static fontColor: '#000000';

    // Settings
    public static readonly bigIconSize = 30;
    public static readonly normalIconSize = 24;

    //Styles
    public static readonly globalStyles = StyleSheet.create({
        // All
        background:{
            backgroundColor: DV.backgroundColor,
        },
        normalText:{
            fontSize: 18,
            fontWeight: 'bold',
            color: DV.fontColor,
        },
        smallText:{
            fontSize: 14,
            fontWeight: 'bold',
            color: DV.fontColor,
        },

        // Header
        headerCaptionText:{
              fontSize: 32,
              fontWeight: 'bold',
              color: DV.fontColor,
        },
        headerSubcaptionText:{
            fontSize: 16,
            color: '#000000',
            opacity: 0.6,
        },

        // Settings
        settingsEntry:{
            marginHorizontal: 5,
            marginVertical: 4,
            padding: 5,
            justifyContent: 'space-between'
        },

        // OnBoardingHeader
        onBoardingHeader:{
            padding: 40
        },
        onBoardingBackGround:{
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            textAlign: 'center',
        },
        onBoardingCaption:{
            paddingTop: 40,
            textAlign: 'center',
        },
        onBoardingText:{
            textAlign: 'center',
            paddingVertical: 20,
        },

        // CalendarMonth
        monthContainer: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginBottom: 10,
            width: '100%',
          },
        
        // Calendar
        calendarScrollView: {
            flex: 1,
            backgroundColor: '#fff',
          },
        calendarScrollViewContent: {
            flexGrow: 1,
            alignItems: 'center',
          },
        calendarScrollViewContentExtended: {
            flexGrow: 1,
            alignItems: 'center',
            paddingTop: 100, // Adjust as needed for your extended view
          },
        calendarContainer: {
            flex: 1,
            backgroundColor: '#fff',
          },
          //AI Chat Bot
        AIkeyboardAvoidingView: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        AIcontainer: {
            backgroundColor: '#FFF',
            paddingTop: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: '50%',
        },
        AImessagesContainer: {
            paddingHorizontal: 10,
        },
        AIinputContainer: {
            borderTopWidth: 1,
            borderColor: '#EEE',
            padding: 10,
        },
        AIinput: {
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 15,
        },
    });

}

export default DV;
