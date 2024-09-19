import { StyleSheet } from "react-native";

// use this as a method of setting up style sheets!
// documetation : https://reactnative.dev/docs/stylesheet
export const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems: "center"
  },
  list: {
    marginTop: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  column: {
    flex: 1,
    margin: 5,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginTop: 50,
    marginBottom: 10,
  },
  footer: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  Button: {
    color : '#bf0d0a'
  }
  }  
);