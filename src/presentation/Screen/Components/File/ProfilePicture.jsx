import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert, Image } from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { HealthContext } from '../../../../logic/context/health';
import SmartAccount from '../../../../service/wallet connect/SmartAccount';
import Contract from '../../../../data/repository/contract/contractRepo';
import { contractAddress } from '../../../../service/constant';
import { PaymasterMode } from '@biconomy/account';
import FastImage from 'react-native-fast-image';


const mime = require('mime');

const ProfilePicture = ({ userData }) => {

  const { setPploader,smartAccount } = useContext(HealthContext);
  const [ipfsFile, setIPFSFile] = useState('');
  const profilePic = userData;
  console.log('profilePic3', profilePic);
  const [file, setFile] = useState(null);

  const showProfile = async () => {
    setIPFSFile(profilePic);
  };

  useEffect(() => {
    if (profilePic !== undefined && profilePic !== null) { 
      showProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePic]);

  const handleFilePick = async () => {
    try {
      const document = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setFile(document[0]);
      uploadImage(document[0]);
    } catch (error) {
      Alert.alert('Error', 'Unable to pick file');
      console.warn(error);
    }
  };

  const uploadImage = async (image) => {
    if (image && image.uri) {
      try {
        setPploader(true);
        const formData = new FormData();
        formData.append('file', {
          uri: image.uri,
          name: image.name,
          type: mime.getType(image.name),
        });

        const resFile = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            headers: {
              pinata_api_key: '64d5d15b5ac74493751a',
              pinata_secret_api_key: '919d0da362d48604415344f0507d1ee303b4778066cff4a8b5d561e81b4bbcc3',
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        const imgHash = `ipfs://${resFile.data.IpfsHash}`;
        const contract = await Contract.fetchContract()
    const tx = await contract.populateTransaction.addProfilePic( imgHash)
      const tx1 = {
        to: contractAddress,
        data: tx?.data,
      };
      const userOpResponse = await smartWallet?.sendTransaction(tx1, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      console.log('userOpResponse',userOpResponse)
      
        // addProfilePic(imgHash, smartAccount);
        
        
        setPploader(false);
        Alert.alert('Successfully set profile pic');
      } catch (error) {
        console.error('Error uploading image to Pinata:', error);
        setPploader(false);
        Alert.alert('Unable to set profile pic');
      }
    } else {
      Alert.alert('Error', 'Please pick a file for profile pic');
    }
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={handleFilePick}>
          {file ? (
            <FastImage 
              source={{ uri: file.uri }}
              style={{ height: 130, width: 130, borderRadius: 65 }}
            />
          ) : profilePic === '' || profilePic === undefined || profilePic === null ? (
            <FastImage
              source={require('../../../../../assets/icon.png')}
              style={{ height: 130, width: 130, borderRadius: 65 }}
            />
          ) : ipfsFile === null ? setPploader(true) : (
            <FastImage
              source={{
                uri: `https://gateway.pinata.cloud/ipfs${ipfsFile.substring(6)}`,
              }}
              style={{ height: 130, width: 130, borderRadius: 65 }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>

        {console.log('ipfs', ipfsFile)}
      </View>
    </View>
  );
};

export default ProfilePicture;
