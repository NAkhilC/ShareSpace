import { Text, View, TextInput, Pressable, Switch, ActivityIndicator, Modal } from "react-native";
import React, { useState, useRef, useEffect, } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaskInput from 'react-native-mask-input';
import axios from "axios";

//styles
import { styles } from "../../styles/mainCss";
import { themeColors } from "../../styles/base";

//components
import Header from "../Header";
import RemoteDataSetExample from "../components/GooglePlaces";
import UploadImage from "../components/UploadImage";
import DateTimePickerComponent from "../components/DateTimePicker";
import DropDownSelect from "../components/SelectDropDown";
import SelectOneOption from "../components/selectOptions";
import { airConditioner, currency, gender, houseType, laundryType, parkingType, utilityPills } from "../../constants/app-constants";
import AnimateButton from "./animateButton";
import { Bounce, Plane, Chase, Fold } from 'react-native-animated-spinkit'


export default function ListItem({ navigation }) {
    const [formData, setFormData] = useState({
        title: null,
        address: {
            addressText: null,
            placeId: null,
            latitude: null,
            longitude: null
        },
        images: [],
        description: "",
        eventStart: "",
        phone: "",
        email: null,
        beds: null,
        bath: null,
        price: null,
        currency: currency[0],
        genderPreference: gender[0],
        houseType: houseType[0],
        parkingType: parkingType[0],
        utilities: [],
        isUtilitiesIncluded: false,
        laundryType: laundryType[0],
        airConditioner: airConditioner[0],
        advancedItems: [],
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [errors, setErrors] = useState({
        title: false,
        beds: false,
        bath: false,
        price: false,
    })

    const axiosInstance = axios.create({
        baseURL: process.env.EXPO_PUBLIC_API_URL, // use with scheme
        timeout: 30000,
        headers: {
            "X-Platform": "iOS",
            "X-App-Build-Number": "1.0.0",
        },
    });

    function updateSuccess() {
        navigation.navigate("HomePage");
        setSuccess(false);
        setLoading(false);
    }

    function checkRequired() {
        let filteredErrors = []
        filteredErrors = [
            { data: formData.title, errorName: 'title' },
            { data: formData.beds, errorName: 'beds' },
            { data: formData.bath, errorName: 'bath' },
            { data: formData.price, errorName: 'price' }].filter(val => {
                if (!val.data) {
                    return val;
                }
            })
        if (filteredErrors.length > 0) {
            filteredErrors.forEach(error => {
                switch (error.errorName) {
                    case "title":
                        setErrors({ ...error, title: true });
                        break;
                    case "beds":
                        setErrors({ ...error, beds: true });
                        break;
                    case "bath":
                        setErrors({ ...error, bath: true });
                        break;
                    case "price":
                        setErrors({ ...error, price: true });
                        break;
                    default:
                        break;
                }
            })
            return false;
        } else {
            return true;
        }
    }

    async function submitData() {
        setLoading(true);
        let formData1 = new FormData();
        let filterImages = JSON.stringify(formData);
        filterImages = JSON.parse(filterImages);
        delete filterImages.images;
        formData1.append("data", JSON.stringify(filterImages));
        formData.images.forEach((image, index) => {
            formData1.append("file", {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
        });
        const config = {
            method: "post",
            url: `/upload`,
            responseType: "json",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            transformRequest: (data, headers) => {
                return formData1;
            },
            onUploadProgress: (progressEvent) => { },
            data: formData,
        };

        //send post request and get response
        await axiosInstance.request(config).then(response => {
            if (response && response.data && response.data.status === 200) {
                setSuccess(true);
            } else {
                setSuccess(false);
            }
        }).catch(err => {
            setSuccess(false);
        })
    }

    function submitForm() {
        if (!Object.values(errors).find(val => val === true) && checkRequired()) {
            if (formData.images.length > 0) {
                if (formData.address.placeId) {
                    submitData();
                } else {
                    alert("Please fill address")
                }
            } else {
                alert("Upload atleast one image")
            }
        } else {
            alert("some required data is missing")
        }
    }

    const [utilities, setUtilities] = useState([]);

    return (
        <View style={[styles.containerFlex, { opacity: loading ? 0.2 : 1 }]}>
            {/* Header */}
            <View style={styles.topBottomFlex}>
                <Header></Header>
            </View>
            {/* Body */}
            <View style={[styles.body]}>
                <KeyboardAwareScrollView>

                    <Text style={styles.addListing}>Add Listing</Text>

                    <Modal animationType="slide" transparent={true} visible={loading}>
                        <View style={[styles.centeredView, { overflow: "hidden", marginTop: 150 }]}>
                            <View style={[styles.modalView, { height: 200 }]}>
                                {loading ?
                                    <View>
                                        {success ?
                                            <View>
                                                <Text style={{ fontSize: 20 }}>Item Added</Text>
                                                <AnimateButton name={"Ok"} callingFunction={updateSuccess} ></AnimateButton>
                                            </View>
                                            :
                                            <View>
                                                <Bounce size={100} color={themeColors.primary} />
                                                <Text>Loading</Text>
                                            </View>
                                        }
                                    </View> : <View></View>}
                            </View>
                        </View>
                    </Modal>

                    {/* Basics View */}
                    <View>
                        <View style={styles.addListingSubHeading}>
                            <Text style={styles.addListingSubTitle}>Basics</Text>
                        </View>
                        <View style={[styles.listItemContainer, { marginTop: 0 }]}>
                            <Text style={styles.listItemTextContainer}>Title</Text>
                            <TextInput
                                style={[styles.inputTextBoxItem, { borderColor: errors.title ? 'red' : null }]}
                                placeholder="Enter Title"
                                onChangeText={(text) => {
                                    setFormData({ ...formData, title: text });
                                    if (text.length > 0) {
                                        setErrors({ ...errors, title: false })
                                    } else {
                                        setErrors({ ...errors, title: true })
                                    }
                                }}></TextInput>
                            {errors.title ? (<Text style={{ color: 'red' }}>Title is required</Text>) : null}

                            <Text style={styles.listItemTextContainer}>Enter Address</Text>
                            <RemoteDataSetExample cities={false} setFormData={setFormData} formData={formData}></RemoteDataSetExample>

                            <Text style={styles.listItemTextContainer}>Upload Images</Text>
                            <UploadImage formData={formData} setFormData={setFormData}></UploadImage>

                            <View style={[styles.displayFlex, { marginTop: 20 }]}>
                                <Text style={[styles.listItemTextContainer, { marginTop: 6 }]}>Available From</Text>
                                <DateTimePickerComponent
                                    formData={formData}
                                    setFormData={setFormData}
                                ></DateTimePickerComponent>
                            </View>

                            <View style={[styles.displayFlex, { width: '100%' }]}>
                                <View style={{ width: '45%' }}>
                                    <Text style={[styles.listItemTextContainer]}>Beds</Text>
                                    <TextInput keyboardType="numeric" placeholder="2" style={[styles.inputTextBoxItem, { borderColor: errors.beds ? 'red' : null }]} onChangeText={(text) => {
                                        setFormData({ ...formData, beds: text });
                                        if (Number(text) < 1) {
                                            setErrors({ ...errors, beds: true })
                                        } else {
                                            setErrors({ ...errors, beds: false })
                                        }
                                    }}></TextInput>
                                    {errors.beds ? (<Text style={{ color: 'red' }}>Beds value must be greater than 0</Text>) : null}
                                </View>
                                <View style={{ width: '45%', marginLeft: '10%' }}>
                                    <Text style={[styles.listItemTextContainer]}>Baths</Text>
                                    <TextInput keyboardType="numeric" onChangeText={(text) => {
                                        setFormData({ ...formData, bath: text });
                                        if (Number(text) < 1) {
                                            setErrors({ ...errors, bath: true })
                                        } else {
                                            setErrors({ ...errors, bath: false })
                                        }
                                    }} placeholder="1" style={[styles.inputTextBoxItem, { borderColor: errors.bath ? 'red' : null }]}></TextInput>
                                    {errors.bath ? (<Text style={{ color: 'red' }}>Bath value must be greater than 0</Text>) : null}
                                </View>
                            </View>

                            <Text style={styles.listItemTextContainer}>Price</Text>
                            <View style={[styles.displayFlex, { marginTop: 10 }]}>
                                <View style={styles.priceInput}>
                                    <TextInput
                                        style={[styles.inputTextBoxItem, { borderColor: errors.price ? 'red' : null }]}
                                        placeholder="430"
                                        keyboardType="numeric"
                                        onChangeText={(text) => {
                                            setFormData({ ...formData, price: text });
                                            if (Number(text) < 1) {
                                                setErrors({ ...errors, price: true })
                                            } else {
                                                setErrors({ ...errors, price: false })
                                            }
                                        }}
                                    ></TextInput>
                                    {errors.price ? (<Text style={{ color: 'red' }}>Price must be greater than 0</Text>) : null}
                                </View>
                                <SelectOneOption options={currency} formData={formData} setFormData={setFormData} formControl={"currency"}></SelectOneOption>
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={[styles.listItemTextContainer]}>Phone</Text>
                                <MaskInput keyboardType="numeric" style={[styles.inputTextBoxItem]}
                                    placeholder="(123) 456-7890"
                                    value={formData.phone}
                                    onChangeText={(text) => {
                                        setFormData({ ...formData, phone: text });
                                    }}
                                    maskAutoComplete={true}
                                    ç></MaskInput>
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={[styles.listItemTextContainer]}>Email</Text>
                                <TextInput placeholder="abc@google.com" style={[styles.inputTextBoxItem]} onChangeText={(text) => {
                                    setFormData({ ...formData, email: text });
                                }}></TextInput>
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={[styles.listItemTextContainer]}>Description</Text>
                                <TextInput multiline={true} placeholder="description" style={[styles.inputTextBoxItem, { height: 100, paddingTop: 5 }]} onChangeText={(text) => {
                                    setFormData({ ...formData, description: text });
                                }}></TextInput>
                            </View>
                        </View>
                    </View>

                    {/* Preferences View */}
                    <View style={{ marginTop: 20 }}>
                        <View style={styles.addListingSubHeading}>
                            <Text style={styles.addListingSubTitle}>Preferences</Text>
                        </View>

                        <View>
                            {/* gender */}
                            <View style={styles.listItemPreference}>
                                <Text style={[styles.listItemTextContainer, { width: '50%', marginLeft: 10 }]}>Gender preference</Text>
                                <SelectOneOption options={gender} formData={formData} setFormData={setFormData} formControl={"genderPreference"}></SelectOneOption>
                            </View>

                            {/* house type */}
                            <View style={styles.listItemPreference}>
                                <Text style={[styles.listItemTextContainer, { width: '50%', marginLeft: 10 }]}>House Type</Text>
                                <SelectOneOption options={houseType} formData={formData} setFormData={setFormData} formControl={"houseType"}></SelectOneOption>
                            </View>

                            {/* parking type */}
                            <View style={styles.listItemPreference}>
                                <Text style={[styles.listItemTextContainer, { width: '50%', marginLeft: 10 }]}>Parking</Text>
                                <SelectOneOption options={parkingType} formData={formData} setFormData={setFormData} formControl={"parkingType"}></SelectOneOption>
                            </View>
                        </View>
                    </View>

                    {/* utilities View */}
                    <View style={{ marginTop: 20 }}>
                        <View style={styles.addListingSubHeading}>
                            <Text style={styles.addListingSubTitle}>Utilities</Text>
                        </View>

                        <View style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 4 }}>
                            {utilityPills.map((utility, index) => {
                                return (
                                    <Pressable key={index + 'utilities'} onPress={() => {
                                        if (utilities.includes(utility.name)) {
                                            setUtilities(utilities.filter((item, i) => item !== utility.name));
                                        } else {
                                            setUtilities(utilities => [...utilities, utility.name])
                                        }
                                        setFormData({ ...formData, utilities: utilities });
                                    }}>
                                        <View key={index} style={{ height: 50, backgroundColor: utilities.includes(utility.name) ? themeColors.primary : 'white', marginLeft: 5, marginTop: 10, padding: 10, alignItems: 'center', borderRadius: 10, borderWidth: 2, borderColor: themeColors.primary, display: 'flex', flexDirection: 'row' }}>
                                            <Text style={{ color: utilities.includes(utility.name) ? 'white' : 'black', }}>{utility.name}</Text><Ionicons style={{ marginLeft: 2 }} name={utilities.includes(utility.name) ? 'remove-circle' : 'add-circle'} color={utilities.includes(utility.name) ? 'white' : themeColors.primary} size={18} />
                                        </View>
                                    </Pressable>
                                )
                            })}

                            <View style={[styles.switchMain, { borderWidth: 0 }]}>
                                <View style={styles.switchBar}></View>
                                <Text style={styles.switchBarText}>Is utilities included in price ? </Text>
                                <View style={styles.switchSwitchView}>
                                    <Switch
                                        trackColor={{ false: themeColors.peimarynext, true: themeColors.primary }}
                                        thumbColor={formData.isUtilitiesIncluded ? themeColors.peimarynext : themeColors.primary}
                                        onValueChange={(value) => { setFormData({ ...formData, isUtilitiesIncluded: value }) }}
                                        value={formData.isUtilitiesIncluded}
                                    />
                                </View>
                            </View>
                        </View>


                    </View>

                    {/* Advanced View */}
                    <View style={{ marginTop: 20, height: 320 }}>
                        <View style={styles.addListingSubHeading}>
                            <Text style={styles.addListingSubTitle}>Advanced</Text>
                        </View>

                        <View style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 4, width: '100%' }}>
                            {/* laundry type */}
                            <View style={styles.listItemPreference}>
                                <Text style={[styles.listItemTextContainer, { width: '50%', marginLeft: 10 }]}>Laundry Type</Text>
                                <SelectOneOption options={laundryType} formData={formData} setFormData={setFormData} formControl={"laundryType"}></SelectOneOption>
                            </View>

                            {/* A/c type */}
                            <View style={styles.listItemPreference}>
                                <Text style={[styles.listItemTextContainer, { width: '50%', marginLeft: 10 }]}>A/c Type</Text>
                                <SelectOneOption options={airConditioner} formData={formData} setFormData={setFormData} formControl={"airConditioner"}></SelectOneOption>

                            </View>

                            <Text style={[styles.listItemTextContainer, { width: '50%', marginLeft: 10, marginBottom: 5 }]}>Select item includes</Text>
                            <DropDownSelect formData={formData} setFormData={setFormData}></DropDownSelect>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <AnimateButton name={"submit"} callingFunction={submitForm}></AnimateButton>
                    </View>

                </KeyboardAwareScrollView>
            </View >
        </View >
    )
}