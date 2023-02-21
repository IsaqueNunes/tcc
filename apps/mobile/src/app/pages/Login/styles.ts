import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textRegisterAccountContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textRegisterAccount: {
    ...commonStyles.textBlack,
    marginTop: 5,
    marginRight: 5,
  }
});
