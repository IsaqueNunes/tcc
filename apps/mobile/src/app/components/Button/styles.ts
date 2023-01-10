import { StyleSheet } from "react-native";

export const styles = (backgroundColor, width, onlyIcon) => StyleSheet.create({
  buttonContainer: {
    minWidth: width,
    backgroundColor: backgroundColor,
    borderWidth: onlyIcon ? 1 : 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    height: onlyIcon ? 50 : 36,
    alignSelf: 'flex-end',
    marginTop: onlyIcon ? 0 : 10
  },
  text: {
    fontSize: 14,
    color: 'white'
  },
})
