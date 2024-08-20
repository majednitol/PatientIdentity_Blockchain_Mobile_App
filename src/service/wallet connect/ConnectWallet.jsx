import React, { useContext, useEffect } from 'react';
import {
  View,
  Image,
} from 'react-native';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import EncryptedStorage from 'react-native-encrypted-storage';
import Web3Auth, {
  OPENLOGIN_NETWORK,
} from '@web3auth/react-native-sdk';
import { HealthContext } from '../../logic/context/health';
import { Button } from 'react-native-paper';
import SignUpComponent from '../../presentation/Screen/signup/SignUpComponent';

import Contract from '../../data/repository/contract/contractRepo';
import Dashboard from '../../presentation/Screen/Components/DashBoard/Dashboard';

import LottieView from 'lottie-react-native';
import SmartAccount from './SmartAccount';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConnectedUser } from '../../logic/redux/connectedUserType/connectedUserSlice';
import { getPrivateKey, setPrivateKey } from '../../logic/redux/privateKey/privateKeySlice';
const scheme = 'web3authrnexample'; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;
const clientId =
  'BFbJxeU7FChnXTRefZILPjluJxgki8Qt-vUDsQ-R3liRp7TV31ac9quxwUv5B-c1cgjePqQQuzq-XXrf9pjzmaQ';
const web3auth = new Web3Auth(WebBrowser, EncryptedStorage, {
  clientId,
  network: OPENLOGIN_NETWORK.SAPPHIRE_DEVNET,
  loginConfig: {
    google: {
      verifier: 'patient',
      verifierSubIdentifier: "identitygoogle",
      typeOfLogin: 'google',
      clientId:
        '519228911939-cri01h55lsjbsia1k7ll6qpalrus75ps.apps.googleusercontent.com',
    },
    auth0emailpasswordless: {
      verifier: 'patient',
      verifierSubIdentifier: 'idenitypasswordless',
      typeOfLogin: 'jwt',
      clientId: 'QiEf8qZ9IoasbZsbHvjKZku4LdnRC1Ct',
      jwtParameters: {
        domain: 'https://web3auth.au.auth0.com',

        verifierIdField: 'email',
        isVerifierIdCaseSensitive: false,
      },
    },
    auth0github: {
      verifier: 'patient',
      verifierSubIdentifier: 'identitygithub',
      typeOfLogin: 'jwt',
      clientId: 'hiLqaop0amgzCC0AXo4w0rrG9abuJTdu',
      jwtParameters: {
        domain: 'https://web3auth.au.auth0.com',
        verifierIdField: 'email',
        isVerifierIdCaseSensitive: false,
      },
    },
  },

});

const ConnectWallet = () => {
  // const [key, setKey] = useState('');

  const { setKey, setEmailAddress, web3Auth, setWeb3Auth, smartAccountAddress, setSmartAccountAddress } = useContext(HealthContext);

  //   const [smartAccount, setSmartAccount] =
  //   useState<BiconomySmartAccountV2 | null>(null);
  // const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
  //   null
  // );


  const dispatch = useDispatch();

  const { connectedUserType, } = useSelector((state) => state.connectedUser);
  useEffect(() => {

    // dispatch(fetchConnectedUser());
  }, []);
  const privateKey = useSelector(getPrivateKey)

  const login = async (loginProvider) => {
    try {
      if (!web3auth) {
        console.log('Web3auth not initialized');
        return;
      }

      console.log('Logging in');
      await web3auth.login({
        loginProvider,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: 'default',
        curve: 'secp256k1',
      });
      console.log(`Logged in ${web3auth.privKey}`);
      if (web3auth.privKey) {
        dispatch(setPrivateKey(web3auth.privKey))
        dispatch(setWeb3Auth(web3auth.privKey))
        setWeb3Auth(web3auth)
        setKey(web3auth.privKey);
        SmartAccount.setKey(web3auth.privKey)
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        console.log('jjjjjjjjjjjjjjjjjjj', saAddress)
        setSmartAccountAddress(saAddress)

        console.log('Logged In');
        setEmailAddress(web3auth.userInfo().email);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  // const logout = async () => {
  //   if (!web3auth) {
  //     console.log('Web3auth not initialized');
  //     return;
  //   }

  //   console.log('Logging out');
  //   await web3auth.logout();

  //   if (!web3auth.privKey) {
  //     setPrivateKey('')
  //     setKey('');
  //     console.log('Logged out');
  //   }
  // };

  useEffect(() => {
    const initialize = async () => {
      // Initialize web3auth
      await web3auth.init();


      if (web3auth.privKey) {
        console.log('Re-logged in');

        setKey(web3auth.privKey);
        dispatch(setPrivateKey(web3auth.privKey))

        SmartAccount.setKey(privateKey)
        setWeb3Auth(web3auth)
        // Contract.setKey(web3auth.privKey);

        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        console.log('dddddddddddddddddddddddd', saAddress)
        setSmartAccountAddress(saAddress)
        await Contract.fetchContract();

        console.log("connectedUserType", privateKey)
        setEmailAddress(web3auth.userInfo().email);
        console.log("Email:", web3auth.userInfo().email);

      }
    };


    initialize();
  }, []);

  const getUser = async () => {
    if (privateKey) {
      SmartAccount.setKey(privateKey)
      await SmartAccount.connectedSmartAccount().then(() => {
        dispatch(fetchConnectedUser());
      })


      console.log("connectedUserType2", connectedUserType)
    }
  }

  useEffect(() => {


    getUser()
  }, [privateKey])


  const unloggedInView = (


    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        icon={({ color, size }) => (
          <Image
            source={require('../../../assets/Google.png')} // Replace with your Google logo image
            style={{ width: size, height: size, tintColor: color }}
          />
        )}
        mode="outlined"
        onPress={() => login('google')}
        style={{ marginBottom: 10 }}
      >
        Login with Google
      </Button>

      <Button
        icon={({ color }) => (
          <Image
            source={require('../../../assets/email.png')} // Replace with your email logo image
            style={{ width: 30, height: 30, tintColor: color }}
          />
        )}
        mode="outlined"
        onPress={() => login('auth0emailpasswordless')}
        style={{ marginBottom: 10 }}
      >
        Email Passwordless
      </Button>

      <Button
        icon={({ color, size }) => (
          <Image
            source={require('../../../assets/github.png')} // Replace with your GitHub logo image
            style={{ width: size, height: size, tintColor: color }}
          />
        )}
        mode="outlined"
        onPress={() => login('auth0github')}
      >
        Login with GitHub
      </Button>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
      }}>

      {privateKey ? connectedUserType === null ? <LottieView style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }} source={require('../../../assets/lo.json')} autoPlay loop /> : (connectedUserType) === '1' ||
        (connectedUserType) === '2' ||
        (connectedUserType) === '3' ||
        (connectedUserType) === '4' ||
        (connectedUserType) === '5' ||
        (connectedUserType) === '6'? (
        <Dashboard />
      ) : (connectedUserType) === '0' ? (
        <SignUpComponent />
      ) : (
        <LottieView style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }} source={require('../../../assets/lo.json')} autoPlay loop />


      ) : unloggedInView}

    </View>
  );
};

export default ConnectWallet;
