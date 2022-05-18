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

  const [API_URL, SET_API_URL] = useState("http://192.168.0.111:8000");

  const [deviceW, setDeviceW] = useState(Dimensions.get('window').width);
  const [deviceH, setDeviceH] = useState(Dimensions.get('window').height);

  const handleLogin = (formData) => {
    setIsLoading(true);

    const bodyFormData = new FormData();
    bodyFormData.append("username", formData.username);
    bodyFormData.append("password", formData.password);
    bodyFormData.append("role", formData.role);

    axios({
      method: "post",
      url: `${API_URL}/auth-login`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        setIsLoading(false);

        /*
            response:
            {
                username: "",
                userId: "",
                role: "",
                wallets: [
                    {
                        type: "elrond",
                        logo: "",
                        ... [to-do]
                    },
                    ... pt fiecare portofel cu care s-a conectat vreodata
                ],
                NFTs: [
                    {
                        collectionTicker: "",
                        associateStoreId: ""
                    },
                    ... pt fiecare colectie de NFT-uri
                ],
                cooldownedNFTs: [
                    {
                        NFTicker: "",
                        usedDate: "",
                        cooldown: ""
                    },
                    ... pt fiecare NFT
                ]
            }
            */

        setUser(response.data);

        navigate("Dashboard");
      })
      .catch((response) => {
        setIsLoading(false);
        try {
          show({ message: response.response.data.message, type: "error" });
        } catch (e) {
          console.log("Response h3e4a: ", response);
        }
      });
  };

  const handleSignup = async (formData) => {

    const bodyFormData = new FormData();
    bodyFormData.append("user_f_name", formData.firstname);
    bodyFormData.append("user_l_name", formData.lastname);
    bodyFormData.append("user_email", formData.email);
    bodyFormData.append("password", formData.password);
    bodyFormData.append("user_plan", Math.random() * 4 + 1);

    axios({
      method: "post",
      url: `${API_URL}/user-create/`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        if (response.ok) {
          setUser(bodyFormData);
          navigate("Dashboard");
        } else {
          console.log(response.ok);
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
