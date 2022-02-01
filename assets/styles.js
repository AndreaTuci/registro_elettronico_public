import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({


  absences: {
    position: 'relative',
    left: 5,
    alignContent: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: "700",
    minWidth: 28,
    minHeight: 28,

  },

  exit: {
    position: 'relative',
    left: 5,
    alignContent: 'center',
    backgroundColor: '#FFCC00',
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: "700",
    minWidth: 28,
    minHeight: 28,
  },

  delays: {
    position: 'relative',
    alignContent: 'center',
    left: 75,
    backgroundColor: '#f69e4e',
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: "700",
    minWidth: 28,
    minHeight: 28,

  },

  partial: {
    position: 'relative',
    alignContent: 'center',
    left: 61,
    backgroundColor: '#00b8cf',
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: "700",
    minWidth: 28,
    minHeight: 28,

  },


  absences_label:{
    position: 'relative',
    left: 20,
    paddingTop: 1,
  },
  exit_label:{
    position: 'relative',
    left: 20,
    paddingTop: 1,
  },
  delays_label:{
    position: 'relative',
    left: 90,
    paddingTop: 1,
  },
  partial_label:{
    position: 'relative',
    left: 76,
    paddingTop: 1,
  },


  main_container:{
    backgroundColor: '#ffffff',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    minHeight: 400,
    padding: 24,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 18,
    alignSelf: 'center',
    paddingTop: 12,
    color: 'white',

  },
  base:{
    backgroundColor:'#00b8cf',
    height:'100%',
    flex:1,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,

  },
  buttonStyle: {
    backgroundColor: '#f69e4e',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#f69e4e',
    height: 40,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#303030',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default styles
