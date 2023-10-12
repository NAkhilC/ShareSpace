import axios from "axios";
import { store } from "../store/store";
import { resetState, userState } from "../store/actions/user.action";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';


//const dispatch = useDispatch();
const storeData = store;
const ERROR_MESSAGES = [{
    data: "NO_USER_FOUND",
    message: "User doesn't exist, Please sign up"
}, {
    data: "USER_EXIST",
    message: "User exists"
}, {
    data: "INVALID_SESSION",
    message: "Invalid session"
}, {
    data: "SOMETHING_WRONG",
    message: "Error occured, please sign in again"
},
{
    data: "OTP_NOT_VALIDATED",
    message: "Entered code is wrong"
},
{
    data: "AUTHENTOCATION_ERROR",
    message: "Authentication failed! Please check credentials"
}]

const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL, // Replace with your API base URL
});

async function setInterested(listingId) {
    return await axiosInstance.post(`/items/interested`, JSON.stringify({ listingId: listingId }), { headers: { "Content-Type": "application/json" } })
        .then((res) => {
            if (res) {
                return res;
            } else {
                alert("Action cannot be performed!");
            }
        });
}

axiosInstance.interceptors.response.use((response) => {
    if (response.data && response.data.status === 200) {
        return response.data.data;

    } else if (response.data && response.data.status === 401) {

        const errorMessage = ERROR_MESSAGES.find(errorMessages => {
            return errorMessages.data === response.data.data;
        })
        if (errorMessage) {
            alert(errorMessage?.message);
        } else {
            alert("Something went wrong on our end.")
        }

        store.dispatch(resetState());
    } else if (response.data && response.data.status === 404 || 500) {
        const errorMessage = ERROR_MESSAGES.find(errorMessages => {
            return errorMessages.data === response.data.data;
        })
        if (errorMessage) {
            alert(errorMessage?.message)
        } else {
            alert("Something went wrong on our end")
        }
    } else {
        alert("Something went wrong on our end");
        return;
    }
}, (error) => {
    alert("Something went wrong");
    return;
})

const userLogin = async (loginForm) => {
    console.log();
    return await axiosInstance
        .post(`/login`, JSON.stringify(loginForm), {
            headers: { "Content-Type": "application/json" },
        })
        .then(async (response) => {
            if (response) {
                // try {
                //     let username = response?.email,
                //         password = response?.password;

                //     console.log(JSON.stringify(username), JSON.stringify(password), "********");
                //     const server = await DeviceInfo.getBundleId();
                //     let options = [{ storage: Keychain.STORAGE_TYPE.FB, accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY, accessControl: Keychain.ACCESS_CONTROL.DEVICE_PASSCODE }];
                //     await Keychain.setGenericPassword(server, '123456', '56789', {
                //         accessControl: Keychain.ACCESS_CONTROL.DEVICE_PASSCODE,
                //         accessGroup: 'akhil',
                //         accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
                //         storage: Keychain.STORAGE_TYPE.AES,
                //     });
                //     Alert.alert('Credentials saved successfully!');
                // } catch (error) {
                //     console.error('Error saving credentials:', error);
                // }
                AsyncStorage.setItem('yourSales_userData', JSON.stringify({ username: response?.email, password: response?.password, isPersistentLogin: true }))
                    .then((data) => { console.log("User data has been set") })
                    .catch((err) => { console.log(err); });
                store.dispatch(
                    userState({
                        userid: response.email,
                        email: response.email,
                        token: response.token,
                        signedIn: true,
                        name: response.name,
                        interested: response.interested,
                        notifications: response.notifications,
                        addressText: response.userPreference?.address?.addressText,
                        placeId: response.userPreference?.address?.placeId,
                        latitude: response.userPreference?.address?.latitude,
                        longitude: response.userPreference?.address?.longitude,
                        range: response.userPreference?.range
                    })
                );
                return true;
            }
            return false;

        })
        .catch((error) => (error));
}

const userSignUp = async (signUp) => {
    console.log(signUp, process.env.EXPO_PUBLIC_API_URL);
    return await axiosInstance
        .post(`/signUp`, JSON.stringify(signUp), {
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if (res) {
                return true;
            };
        });
}

const updateNotifications = async (notificationInfo) => {
    await axiosInstance.post(`/pushNotifications`, JSON.stringify(notificationInfo), {
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res) {
                (res);
            }
        });
}

const getItem = async (data) => {
    return await axiosInstance.get(`/item/${data}`).then(item => {
        return item;
    })

}

const getItemsForUser = async () => {
    return await axiosInstance.get(`/items`).then((response) => {
        if (response) {
            return response;
        }
    });
}

const userPreferencegetData = async (formData) => {
    return await axiosInstance.post(`/userPreference`, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res) {
                return res;
            }
        });
};

const verifyOTP = async (formData) => {
    return await axiosInstance.post(`/verifyOTP`, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res) {
                return res;
            }
        });
};

const filterDataWithInputs = async (formData) => {
    return await axiosInstance.post(`/filterData`, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res) {
                return res;
            }
        });
};

module.exports = {
    userPreferencegetData,
    filterDataWithInputs,
    updateNotifications,
    getItemsForUser,
    setInterested,
    userSignUp,
    userLogin,
    getItem,
    verifyOTP
}