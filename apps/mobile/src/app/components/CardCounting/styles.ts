import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

export const style = StyleSheet.create({
  cardContainer: {
    padding: 25,
    ...commonStyles.defaultShadow,
    alignItems: 'center',
    borderRadius: 5,
    width: 150,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    ...commonStyles.textBlack,
  },
  counting: {
    fontSize: 16,
    ...commonStyles.textBlack,
    fontWeight: 'bold'
  }
});
