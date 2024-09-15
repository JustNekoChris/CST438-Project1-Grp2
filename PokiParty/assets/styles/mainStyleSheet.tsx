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
    justifyContent:'center'
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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  Button: {
    color : '#bf0d0a'
  }
  }  
);