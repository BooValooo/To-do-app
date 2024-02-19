import { Platform, StyleSheet } from "react-native";

class DV{

    // All
    public static readonly backgroundColor: '#FFFFFF';
    public static fontColor: '#000000';

    // Settings
    public static readonly bigIconSize = 30;
    public static readonly normalIconSize = 24;

    private static appleStyles = {
        headerSubcaptionText:{
            fontSize: 16,
            color: '#00FF00',
            opacity: 0.6,
        },

    }

    private static androidStyles = {
        headerSubcaptionText:{
            fontSize: 16,
            color: '#FF0000',
            opacity: 0.6,
        },

    }

    //Styles
    private static globalStyles = StyleSheet.create({
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
            marginBottom: 20,
            width: '100%',
            },
        
        // Calendar
        calendarScrollView: {
            flex: 1,
            backgroundColor: '#fff',
            // paddingBottom: 100,
            },
        calendarScrollViewContent: {
            flexGrow: 1,
            alignItems: 'center',
            paddingBottom: 100,
            },
        calendarScrollViewContentExtended: {
            flexGrow: 1,
            alignItems: 'center',
            paddingTop: 100, // Adjust as needed for your extended view
            paddingBottom: 100,
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
        //taskbox
        deleteButton: {
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex: 1,
            paddingRight: 20,
          },
          deleteButtonText: {
            color: 'white',
            fontWeight: '600',
            padding: 20,
          },
          taskContainer: {
            flexDirection: 'row',
            // flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 20,
            paddingHorizontal: 16,
            marginHorizontal: 16,
            marginVertical: 8,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            borderRadius: 8,
            backgroundColor: '#fff',
            elevation: 2, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 1 }, 
            shadowOpacity: 0.22, 
            shadowRadius: 2.22, 
          },
          checkbox: {
            // style for the checkbox container, TODO: add styles if needed
          },
          taskDetails: {
            flex: 1,
            marginLeft: 12,
            justifyContent: 'center',
          },
          taskName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 4,
          },
          taskMeta: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          priority: {
            fontSize: 14,
            fontWeight: '600',
            color: '#ff5252',
            marginRight: 8,
          },
          time: {
            fontSize: 14,
            color: '#666',
          },
          menuButton: {
            // Style if needed
          },
    });

    //public static allStyles = Platform.OS === 'android' ? {...DV.globalStyles, ...DV.androidStyles} : {...DV.globalStyles, ...DV.appleStyles};

    public static styles = StyleSheet.create(Platform.OS === 'android' ? {...DV.globalStyles, ...DV.androidStyles} : {...DV.globalStyles, ...DV.appleStyles});
    

}


export default DV;
