import { Platform, StyleSheet } from "react-native";

class DV{
    // Light Mode
    public static readonly backgroundColor: '#FFFFFF';
    public static fontColor: '#000000';

    //Icons
    public static readonly bigIconSize = 30;
    public static readonly normalIconSize = 24;

    // OS Depending styles
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

    //all Styles
    private static globalStyles = StyleSheet.create({
        // background
        background:{
            backgroundColor: DV.backgroundColor,
        },

        // text
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
        headerCaptionText:{                         // in Headbar and Onboarding
              fontSize: 32,
              fontWeight: 'bold',
              color: DV.fontColor,
        },

        // Settings
        settingsEntry:{                             // In SettingsShow and SettingsToggle
            marginHorizontal: 5,
            marginVertical: 4,
            padding: 5,
            justifyContent: 'space-between'
        },

        // OnBoardingHeader
        onBoardingHeader:{                          // In OnBoarding 1 and 2
            padding: 40
        },
        onBoardingCaption:{                         // In OnBoarding 1 and 2
            paddingTop: 40,
            textAlign: 'center',
        },
        onBoardingText:{                            // In OnBoarding 1 and 2
            textAlign: 'center',
            paddingVertical: 20,
        },

            // CalendarMonth
        monthContainer: {                           // In CalenderMonth
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginBottom: 20,
            width: '100%',
            },
        
        // Calendar
        calendarScrollView: {                       // In Calendar
            flex: 1,
            backgroundColor: '#fff',
            // paddingBottom: 100,
            },
        calendarScrollViewContent: {                // In Calendar
            flexGrow: 1,
            alignItems: 'center',
            paddingBottom: 100,
            },
        calendarScrollViewContentExtended: {        // In Calendar
            flexGrow: 1,
            alignItems: 'center',
            paddingTop: 100, // Adjust as needed for your extended view
            paddingBottom: 100,
            },
        calendarContainer: {                        // In Calendar
            flex: 1,
            backgroundColor: '#fff',
            },
            //AI Chat Bot
        AIkeyboardAvoidingView: {                   // Not used
            flex: 1,
            justifyContent: 'flex-end',
        },
        AIcontainer: {                              // Not used
            backgroundColor: '#FFF',
            paddingTop: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: '50%',
        },
        AImessagesContainer: {                      // Not used
            paddingHorizontal: 10,
        },
        AIinputContainer: {                         // Not used
            borderTopWidth: 1,
            borderColor: '#EEE',
            padding: 10,
        },
        AIinput: {                                  // Not used
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 15,
        },
        //taskbox
        deleteButton: {                             // In NoteBox and TaskBox
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex: 1,
            paddingRight: 20,
          },
          deleteButtonText: {                       // In NoteBox and TaskBox
            color: 'white',
            fontWeight: '600',
            padding: 20,
          },
          taskContainer: {                          // In NoteBox and TaskBox
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
          checkbox: {                               // empty but in Onboarding2, SettingsShow, SettingsToggle
            // style for the checkbox container, TODO: add styles if needed
          },
          taskDetails: {                            // In NoteBox and TaskBox
            flex: 1,
            marginLeft: 12,
            justifyContent: 'center',
          },
          taskName: {                               // In database_utils, NoteBox and TaskBox
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 4,
          },
          taskMeta: {                               // In NoteBox and TaskBox
            flexDirection: 'row',
            alignItems: 'center',
          },
          priority: {                               // In NoteBox and TaskBox   
            fontSize: 14,
            fontWeight: '600',
            color: '#ff5252',
            marginRight: 8,
          },
          time: {                                   // In NoteBox and TaskBox
            fontSize: 14,
            color: '#666',
          },
          menuButton: {                             // empty but in NoteBox and TaskBox
            // Style if needed
          },

        // Filter
        entryContainer:{                            // In tagManager, Filter
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginStart: 12,
        },
        taskNoteContainer: {                        // In Filter
            width: 310,
            height: 50,
            borderRadius: 25,
            flexDirection: 'row',
            backgroundColor: 'lightgray',
            marginVertical: 10,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginLeft: 14
        },
        taskNoteUnpressed:{                         // in Filter (could be used in SelectTag/Entry)
            backgroundColor: 'lightgray',
            marginVertical: 0,
        },
        taskNotePressed: {                          // in Filter (could be used in SelectTag/Entry)
            backgroundColor: 'white',
            marginVertical: 0,
        },
        entry: {                                    // in tagManager, Filter, NewTaskModal
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10
        },
        entryField: {                               // in Filter
            backgroundColor: 'lightgray',
            width: 330,
            height: 40,
            borderRadius: 10,
            paddingLeft: 10,
            marginLeft: 5,
            textAlignVertical: 'center',
        },                                          
        dateField: {                                // in Filter
            width: 156,
            marginHorizontal: 5,
        },
        closeButton: {                              // in tagManager and Filter
            height: 40,
            width: 150,
            borderRadius: 20,
            backgroundColor: 'gray',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            marginVertical: 20,
        },
        resetVerticalMarginAndPadding: {            // in Filter and NewTaskModal
            marginVertical: 0,
            marginBottom: 0,
            marginTop: 0,
            paddingVertical: 0,
            paddingBottom: 0,
            paddingTop: 0
        }

    });

    // merged styles
    public static styles = StyleSheet.create(Platform.OS === 'android' ? {...DV.globalStyles, ...DV.androidStyles} : {...DV.globalStyles, ...DV.appleStyles});

    // styles depending on Color
    public static colorStyles = (color) => StyleSheet.create({
        circle: {                                   // In ColorSelection, SelectTagEntry, TagEntry
            height: DV.normalIconSize,
            width: DV.normalIconSize,
            borderRadius: DV.normalIconSize,
            backgroundColor: color,
            alignSelf: 'center'
        },
        onBoardingBackGround:{                      // In OnBoarding 1 and 2
            backgroundColor: color,
            alignItems: 'center',
            textAlign: 'center',
        },
    });

}


export default DV;

