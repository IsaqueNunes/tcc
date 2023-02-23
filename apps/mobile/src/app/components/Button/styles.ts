import { StyleSheet } from "react-native";

export const styles = (backgroundColor, width, onlyIcon, margin, icon) => StyleSheet.create({
  buttonContainer: {
    width: width,
    backgroundColor: backgroundColor,
    borderWidth: onlyIcon ? 1 : 0,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: (icon !== '' && !onlyIcon) ? 'space-between' : 'center',
    borderRadius: 10,
    height: onlyIcon ? 50 : 46,
    marginTop: onlyIcon ? 0 : margin.marginTop ? 30 : 10
  },
  text: {
    fontSize: 14,
    color: 'white'
  },
})
