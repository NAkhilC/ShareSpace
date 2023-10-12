import { StyleSheet } from "react-native";
import { fontSize, themeColors } from "./base";
export const styles = StyleSheet.create({
  topBottomFlex: {
    flex: 1,
  },
  containerFlex: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    height: "96%",
    backgroundColor: themeColors.primary
  },
  headerView: {
    marginTop: 30,
    marginLeft: "40%",
  },
  headerText: {
    fontSize: 30,
    color: "white",
    textAlign: 'center'
  },
  body: {
    flex: 9,
    backgroundColor: "#f0ede9",
  },
  footer: {
    backgroundColor: themeColors.peimarynext,
    flexDirection: "row",
    height: 100,
    flexGrow: 0,
    flexShrink: 0,
  },
  footerSub: {
    width: "25%",
  },
  input: {
    height: 40,
    width: "70%",
    marginLeft: "3%",
    padding: 10,
    borderWidth: 2,
    borderColor: themeColors.primary,
  },
  homeSearch: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: themeColors.primary
  },
  searchIcon: {
    height: "100%",
    width: "10%",
    padding: 2,
    backgroundColor: themeColors.primary,
  },
  FilterIcon: {
    height: "100%",
    width: "10%",
    padding: 2,
    marginLeft: "5%",
  },
  popular_Item_block: {
    width: 100, height: 130, marginLeft: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: themeColors.peimarynext
  },

  //listings
  bodyView: { flexDirection: "row", flexWrap: "wrap", padding: 5 },
  bodyViewHome: {},
  eachViewItem: {
    height: 200,
    width: 100,
    flex: 1,
    marginTop: 1,
    borderWidth: 0,
    borderColor: "black",
  },
  itemImage: {
    height: "77%",
  },
  itemText: {
    textAlign: "center",
  },
  itemTextAddress: {
    textAlign: "center",
  },
  infoImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  //models
  centeredView: {
    flex: 3,
    alignItems: "center",
    marginTop: 2,
  },
  modalView: {
    margin: 30,
    width: "100%",
    height: 600,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewSmall: {
    margin: 30,
    width: "100%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  //listItems
  mainItemView: {
    margin: 0,
  },
  itemViewImageContainer: {
    height: 360,
  },
  itemViewImage: { height: 310 },
  imageMainFooter: { height: 60, flexDirection: "row" },
  imageSubFooter1: { width: "50%", flexDirection: "row" },
  imageFooterIcon1: {
    width: "50%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageFooterIcon2: {
    padding: 5,
    marginLeft: "60%",
    justifyContent: "right",
    alignItems: "right",
  },
  itemViewGeneralInfo: {
    backgroundColor: "white",
    marginTop: 10,
    minHeight: 400,
    padding: 15,
  },
  itemViewGeneralInfoDesc: {
    marginTop: 10,
    padding: 15,
  },
  viewItemName: {
    fontSize: fontSize.md,
    fontWeight: 700,
  },
  viewItemDetails: {
    marginTop: 10,
  },
  viewItemDetailLabel: {
    fontSize: 15,
    fontWeight: 700,
  },
  timeAndLocation: {
    marginTop: 10,
    fontSize: 15
  },
  homeMainText: {
    flexDirection: "row",
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "space-between",
    height: 40,
    width: '80%'
  },
  addItem: {
    padding: 20,
  },
  addItemTitleInput: {
    height: 40,
    borderColor: "black",
    borderBottomWidth: 3,
    borderColor: themeColors.primary,
    borderRadius: 10,
    backgroundColor: themeColors.peimarynext,
    padding: 5,
    height: 50
  },
  addItemTitle: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
  },
  addItemTitleTextInput: {
    height: 120,
    borderColor: "black",
    padding: 5,
    borderColor: themeColors.primary,
    borderRadius: 10,
    backgroundColor: themeColors.secondary,
    borderBottomColor: themeColors.primary,
    borderBottomWidth: 2
  },
  inputTextBoxItem: {
    backgroundColor: 'white', height: 50, borderRadius: 5, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, paddingLeft: 15, marginTop: 5, borderWidth: 1, borderColor: 'gray',
    shadowRadius: 4,
  },
  addItemTitleIndividualTextInput: {
    height: 150,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    borderColor: themeColors.primary,
  },
  individaulItems: {
    marginTop: 30,
  },
  individaulItemsTextLabel: {
    marginTop: 10,
  },
  eachItem: {
    borderWidth: 1,
    padding: 5,
    borderColor: themeColors.primary,
    overflow: "hidden",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    marginRight: "10%",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 5,
    backgroundColor: themeColors.primary,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 15,
    backgroundColor: themeColors.primary,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  imagePicked: {
    width: "46%",
    height: 130,
    margin: 5,
    borderWidth: 2,
    borderRadius: 5,
    overflow: "hidden",
    borderColor: themeColors.primary,
  },
  eachImagePicked: {
    width: "100%",
    height: "80%",
  },
  removelinkOnImgae: {
    height: "20%",
    alignItems: "center",
    padding: 2,
  },

  //login
  loginContainer: {
    width: "90%",
    height: 300,
    backgroundColor: "red",
    marginLeft: "5%",
    alignItems: "center",
    backgroundColor: themeColors.peimarynext,
  },
  loginIcon: {
    width: "15%",
    height: 50,
    margin: 5,
    borderRadius: 999,
    overflow: "hidden",
    alignItems: "center",
  },
  loginTextInput: {
    width: "100%",
    height: 150,
    alignItems: "center",
  },
  loginTextInputBox: {
    width: "90%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    overflow: "hidden",
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primary,
  },
  loginTextInputIcon: {
    width: "15%",
    height: "100%",
    paddingTop: 10,
    alignItems: "center",
  },
  LoginInputValue: {
    width: "100%",
    overflow: "hidden",
  },

  //signUp
  signUpContainer: {
    width: "90%",
    height: 430,
    backgroundColor: "red",
    marginLeft: "5%",
    alignItems: "center",
    backgroundColor: themeColors.peimarynext,
  },
  signUpHeaderText: {
    fontSize: 30,
    marginTop: 20,
    color: themeColors.primary,
  },

  //toggle
  toggleSwitchContainer: {
    marginTop: 130,
  },
  toggleSwitch: {
    width: "90%",
    marginLeft: "5%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: themeColors.peimarynext,
  },
  loginToggle: {
    width: "50%",
    borderBottomWidth: 3,
    alignItems: "center",
    backgroundColor: themeColors.peimarynext,
    padding: 5,
  },
  toggleText: {
    fontSize: 30,
    color: themeColors.primary,
  },
  toastBanner: {
    display: "flex",
    height: 70,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  mainToastBanner: {
    marginTop: 250,
    zIndex: 100,
    marginLeft: "5%",
    position: "absolute",
    width: "90%",
    alignItems: "center",
    backgroundColor: themeColors.peimarynext,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: themeColors.primary
  },
  successToastButton: {
    width: "50%",
    height: 40,
    alignItems: "center",
    backgroundColor: themeColors.primary,
    padding: 5,
    borderRadius: 3,
    marginBottom: 25
  },
  toggleTextSuccessOk: {
    fontSize: 20,
    color: themeColors.peimarynext,
  },

  imageChangerLeftButton: {
    position: "absolute",
    width: "25%",
    height: "100%",
    zIndex: 10,
    opacity: 0.2,
  },
  currentImageHighlighter: {
    position: "absolute",
    bottom: 5,
    height: "8%",
    width: "40%",
    overflow: "hidden",
    alignItems: "center",
    marginLeft: "25%",
    zIndex: 10,
    opacity: 0.8,
    backgroundColor: "black",
    borderRadius: 15,
  },
  currentImageInnerView: { flexDirection: "row", display: "flex", flexWrap: "nowrap", marginTop: 3 },

  imageChangerRightButton: { position: "absolute", right: 0, width: "25%", height: "100%", zIndex: 10, opacity: 0.2 },

  iconContainer: {
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  savedInterestedView: {
    width: "96%",
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "2%",
  },
  savedInterestedViewItem: {
    width: "100%",
    marginTop: 10,
    height: 100,
    flexDirection: "row",
    display: "flex",
  },
  savedInterestedViewItemImage: {
    width: "40%",
    height: 100,
    overflow: "hidden",
  },
  savedInterestedViewItemText: {
    overflow: "hidden",
    width: "60%",
    padding: 5,
  },
  addressFlexItem: {
    flexGrow: 1,
    flexDirection: "row",
    marginTop: 5,
  },
  addGeneralMain: {
    flexDirection: "row",
    height: 200,
    position: "relative",
    marginBottom: 20,
  },
  addGeneralDisplay: {
    flex: 1,
  },

  container: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    margin: 5,
    height: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  adContainer: {
    flex: 1,
    backgroundColor: "gray", // Example background color for ads
    margin: 4,
    height: 150, // Adjust the height as needed for a complete row ad
  },
  itemText: {
    fontSize: 16,
  },
  itemImage: {
    width: "50%",
    height: 150,
    marginBottom: 8,
  },

  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
  listItemContainer: { width: '100%', backgroundColor: 'white', marginTop: 20, padding: 10 },
  listItemTextContainer: { fontSize: 15, color: themeColors.primary, marginTop: 15 },
  displayFlex: {
    flexDirection: "row", display: "flex"
  },
  listItemPreference: { width: '100%', height: 50, backgroundColor: 'white', marginTop: 5, display: 'flex', flexDirection: 'row', borderBottomWidth: 5, borderBottomColor: themeColors.primary },

  switchMain: {
    flexDirection: 'row', display: 'flex', width: '100%', marginTop: 20, borderWidth: 0.5, borderColor: themeColors.primary,
    shadowOffset: { width: 0, height: 2 },
  },
  switchBar: { width: 5, backgroundColor: themeColors.primary, padding: 3 },
  switchBarText: { fontSize: 18, marginTop: 4, width: '78%', marginLeft: 5 },
  switchSwitchView: { alignContent: 'flex-end', padding: 3 },

  addListing: {
    fontSize: 25, marginTop: 20, marginLeft: 10, fontWeight: 600,
    color: themeColors.primary
  },
  addListingSubHeading: { width: '100%', marginTop: 10, height: 40, backgroundColor: themeColors.primary, marginTop: 10 },
  addListingSubTitle: {
    fontSize: 20, padding: 8, color: "white"
  },
  priceInput: { width: '65%', marginTop: 0, marginRight: '5%' },
  selecteOneOption: {
    flex: 1,
    width: '40%',
    backgroundColor: 'white', height: 50, borderRadius: 5, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5, paddingLeft: 5, borderWidth: 0, borderColor: themeColors.primary,
    shadowRadius: 4,
  },
  multiselectDropDown: {
    flex: 1, backgroundColor: 'white'
  },
  renderCustomChip: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  renderEachChip: { padding: 10, backgroundColor: themeColors.primary, borderRadius: 5, margin: 3 },
  renderChipValue: { color: 'white', marginTop: 5 },
  renderChipContainer: {
    backgroundColor: themeColors.primary,
    borderRadius: 5,
    marginTop: 0,
    zIndex: 0
  },
  renderChipWrapper: {
    backgroundColor: 'red',
    marginTop: 0,
    padding: 7,
    flexWrap: 'nowrap',
    height: 100,
    overflow: 'scroll'
  },
  renderTextToggle: {
    borderRadius: 5,
    padding: 0,
    paddingLeft: 0
  },
  irrgegular1: {
    height: 420,
    width: 300,
    backgroundColor: themeColors.peimarynext,
    opacity: 0.08,
    borderRadius: 999,
    marginTop: -100,
    marginLeft: -10,
    borderBottomLeftRadius: 700,
    borderBottomRightRadius: 999,
  },
  irrgegular2: {
    height: 270,
    width: 260,
    backgroundColor: themeColors.peimarynext,
    opacity: 0.2,
    borderRadius: 999,
    marginTop: -70,
    marginLeft: -40,
    position: 'absolute',
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
  },
  irrgegularText: {
    position: 'absolute',
    marginTop: 100,
    marginLeft: 50,
    opacity: 1.0,
    zIndex: 100
  },
  loginBlock1: { marginLeft: '5%', height: 80, width: '90%', marginTop: 10 },
  Icontext: {
    fontSize: 15, marginLeft: 5, color: themeColors.primary, marginTop: 5
  },
  loginBlockTextInput: {
    height: 40, borderBottomWidth: 2, borderBottomColor: themeColors.primary
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
