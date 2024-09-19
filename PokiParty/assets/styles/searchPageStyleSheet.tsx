import { StyleSheet } from "react-native";

// use this as a method of setting up style sheets!
// documetation : https://reactnative.dev/docs/stylesheet
export const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonContainer: {
      alignItems: 'center',
      width: '100%'
  },
  searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
  },
  statColumns: {
      flexDirection : 'column',
      alignItems: 'center',
      alignSelf: 'center',
      margin: 5
  },
  search: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: '#F0F0F0',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 10,
  },
  rows: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center'
  },
  center: {
      alignItems: 'center',
      alignSelf: 'center',
      paddingBottom: 20
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection:'row',
    alignContent: 'flex-start',
    alignSelf: 'center'
  },
  spaced: {
    alignSelf: 'center'
  },
  box : {
    width: 100,
    height: 125
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
  },
  modalText: {
      fontSize: 18,
      marginBottom: 15,
  },
});