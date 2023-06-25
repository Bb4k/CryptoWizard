import { createContext, useState, useMemo } from "react";
import { Dimensions } from 'react-native';
import axios from "axios";
import { navigate } from "../navigation/root.navigation";

const AppContext = createContext();

function AppProvider(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [themeColors, setThemeColors] = useState({
    primary: '#263963',
    almostWhite: '#ECF0F1',
    darkPrimary: '#1B2A53',
    lightPrimary: '#C5FEED',
    bulletBackground: 'rgba(183, 186, 192, 0.75)',
    subtext: '#A2A2A2',
    loss: '#B20F0F',
    scrollbar: '#B7BAC0',
  })

  const [lightArrow, setLightArrow] = useState('https://i.ibb.co/4PyHD87/right-arrow.png');
  const [darkArrow, setDarkArrow] = useState('https://i.ibb.co/nfY83my/right-arrow-dark.png');

  const [user, setUser] = useState(null);
  const [investments, setInvestments] = useState(null);
  const [plan, setPlan] = useState(null);
  const [follows, setFollows] = useState(null);

  const [failedLogin, setFailedLogin] = useState(null);
  const [API_URL, SET_API_URL] = useState("http://127.0.0.1:8000/api");

  const [deviceW, setDeviceW] = useState(Dimensions.get('window').width);
  const [deviceH, setDeviceH] = useState(Dimensions.get('window').height);

  const handleLogin = (formData) => {
    axios({
      method: "post",
      url: `${API_URL}/user-login/${formData.email}`,
      data: { user_password: formData.password },
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        if (response.data === 'User exists in db') {
          setFailedLogin(null);
          axios({
            method: "get",
            url: `${API_URL}/user-data/${formData.email}`,
          })
            .then((responseData) => {
              setPlan(responseData.data[0]);
              setInvestments(responseData.data[1]);
              setFollows(responseData.data[2]);
              setUser(responseData.data[3]);
              navigate("Dashboard");
            })
            .catch((response) => {
              try {
                show({ message: response, type: "error" });
              } catch (e) {
                console.log("Response user-data: ", response);
              }
            });
        } else {
          setFailedLogin(response.data);
        }
      })
      .catch((response) => {
        try {
          show({ message: response, type: "error" });
        } catch (e) {
          console.log("Response login attempt: ", response);
        }
      });
  };

  const handleSignup = async (formData) => {

    axios({
      method: "post",
      url: `${API_URL}/user-create/`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        if (response.data != 'Failed to Add.') {
          axios({
            method: "get",
            url: `${API_URL}/user-data/${formData.user_email}`,
          })
            .then((responseData) => {
              console.log(responseData.data);
              setPlan(responseData.data[0]);
              setInvestments([]);
              setFollows([]);
              setUser(responseData.data[3]);
              navigate("Dashboard");
            })
            .catch((responseData) => {
              try {
                show({ message: response, type: "error" });
              } catch (e) {
                console.log("Response user-data: ", responseData);
              }
            });
        }
      })
      .catch((response) => {
        try {
          show({ message: response.response?.data?.message, type: "error" });
        } catch (e) {
          console.log("Response rgvv: ", response);
        }
      });
  };

  const handleSignout = async () => {
    setUser(null);
  };

  const store = {
    // General app
    isLoading,
    setIsLoading,
    lightArrow,
    darkArrow,

    // User data
    user,
    setUser,
    failedLogin,
    investments,
    setInvestments,
    plan,
    setPlan,
    follows,
    setFollows,

    // API
    API_URL,

    // Auth
    handleLogin,
    handleSignup,
    handleSignout,

    // Color Pallete
    themeColors,

    // Device
    deviceW,
    deviceH,
  };

  const storeForProvider = useMemo(() => store, [store]);
  return <AppContext.Provider value={storeForProvider}>{props.children}</AppContext.Provider>;
}

export { AppContext };
export default AppProvider;
