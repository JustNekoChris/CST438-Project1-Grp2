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
    alignSelf: 'center',
    justifyContent: 'center'
  },
  spacedUp: {
    alignSelf: 'center',
    paddingTop: 30
  },
  spacedDown: {
    alignSelf: 'center',
    paddingBottom: 20
  },
  box : {
    width: 100,
    height: 125,
    margin: 4, 
    justifyContent: 'center'
  },
  boxedImage : {
    width: 100, 
    height: 100
  },
  boxedBackgroundImage : {
    alignSelf: 'center',
    flex: 1,
    width: 80,
    height: 80,
    opacity: 0.25
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  statNameCell: {
    justifyContent: 'flex-start',
    paddingVertical: 6,
    flex: 2,
  },
  statValueCell: {
    justifyContent: 'flex-end',
    paddingVertical: 6,
    flex: 1,
  },
  rowEven: {
    backgroundColor: '#f9f9f9',
  },
  rowOdd: {
    backgroundColor: '#fff',
  }
});