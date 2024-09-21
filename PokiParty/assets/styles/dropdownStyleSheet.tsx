import { StyleSheet } from "react-native";

// use this as a method of setting up style sheets!
// documetation : https://reactnative.dev/docs/stylesheet
export const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingBottom: 20
      },
    radio : {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    button : {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    option : {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
    leftSpacing : {
        marginLeft : 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    width: {
        width: '40%'
    }
});