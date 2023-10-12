
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from "@expo/vector-icons/Ionicons";
import { themeColors } from '../../styles/base';
import { styles } from '../../styles/mainCss';
const selectOneOption = (props) => {

    return (
        <SelectDropdown
            data={props.options}
            buttonTextStyle={{ fontSize: 15 }}
            selectedRowStyle={{ backgroundColor: themeColors.primary }}
            renderDropdownIcon={isOpened => {
                return <Ionicons name={isOpened ? 'chevron-up-sharp' : 'chevron-down-sharp'} color={"#7a9e9f"} size={18} />;
            }}
            defaultValue={props.options[0]}
            buttonStyle={styles.selecteOneOption}
            onSelect={(selectedItem, index) => {
                switch (props.formControl) {
                    case 'genderPreference':
                        props.formData.genderPreference = selectedItem;
                        break;
                    case 'houseType':
                        props.formData.houseType = selectedItem;
                        break;
                    case 'laundryType':
                        props.formData.laundryType = selectedItem;
                        break;
                    case 'parkingType':
                        props.formData.parkingType = selectedItem;
                        break;
                    case 'currency':
                        props.formData.currency = selectedItem;
                        break;
                    case 'airConditioner':
                        props.formData.airConditioner = selectedItem;
                        break;
                    case 'default':
                        break;
                }
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
        />
    )
}


export default selectOneOption;