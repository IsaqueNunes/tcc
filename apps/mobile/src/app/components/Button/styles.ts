import { StyleSheet } from "react-native";

export const styles = (backgroundColor, width, onlyIcon, margin, icon) => StyleSheet.create({
  buttonContainer: {
    minWidth: width,
    backgroundColor: backgroundColor,
    borderWidth: onlyIcon ? 1 : 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: icon !== '' ? 'space-between' : 'center',
    borderRadius: 10,
    height: onlyIcon ? 50 : 46,
    paddingHorizontal: icon !== '' ? 40 : 0,
    marginTop: onlyIcon ? 0 : margin.marginTop ? 30 : 10
  },
  text: {
    fontSize: 14,
    color: 'white'
  },
})
