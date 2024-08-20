
import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Alert, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { ActivityIndicator, Text } from 'react-native-paper';
import { HealthContext } from '../../../../logic/context/health';
import { contractAddress } from '../../../../service/constant';
import { PaymasterMode } from '@biconomy/account';
import SmartAccount from '../../../../service/wallet connect/SmartAccount';
import { setScanAddress } from '../../../../logic/redux/scanner/scanAddressSlice';
import Contract from '../../../../data/repository/contract/contractRepo';
import { Image as CompressorImage } from 'react-native-compressor';

const { width, height } = Dimensions.get('window');
const mime = require('mime');

const FileUpload = ({ userAddress }) => {
  const { forceUpdate } = useContext(HealthContext);

  const [files, setFiles] = useState(null);
  const [loader, setLoader] = useState(false);

  const isValidAddress = /^0x[a-fA-F0-9]{40}$/;

  const handleSubmit = async () => {
    try {
      if (!userAddress || !isValidAddress.test(userAddress)) {
        Alert.alert('Invalid Address', 'Please provide a valid address.');
        return;
      }

      if (!files || files.length === 0) {
        Alert.alert('Warning', 'Please select a file for upload');
        return;
      }

      setLoader(true);
      const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
      const imgHashes = await Promise.all(
        files.map(async (file) => {
          const compressedUri = await compressImage(file.uri);
          console.log('file.uri',compressedUri)
          const formData = new FormData();
          formData.append('file', {
            uri: file.uri,
            name: file.name,
            type: mime.getType(file.name),
          });
          // console.log(formData)
          const resFile = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            formData,
            {
              headers: {
                pinata_api_key: '64d5d15b5ac74493751a',
                pinata_secret_api_key: '919d0da362d48604415344f0507d1ee303b4778066cff4a8b5d561e81b4bbcc3',
                'content-type': 'multipart/form-data',
              },
            },
          );

          return `ipfs://${resFile.data.IpfsHash}`;
        })
      );

        const contract = await Contract.fetchContract()
      const tx = await contract.populateTransaction.addPrescription(userAddress, imgHashes)
        const tx1 = {
          to: contractAddress,
          data: tx?.data,
        };
        const userOpResponse = await smartWallet?.sendTransaction(tx1, {
          paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        });
        console.log('userOpResponse',userOpResponse)
      setScanAddress('');
      Alert.alert('Successfully Image Uploaded');
      setFiles(null);
      setLoader(false);
    } catch (error) {
      Alert.alert(error.message);
      console.warn('fileupload', error.message)
      setLoader(false);
    }
    forceUpdate()
  };
  const compressImage = async (uri) => {
    const compressedImage = await CompressorImage.compress(uri, {
      // compressionMethod: 'auto',
      quality: 1.0,
      maxWidth: 1080,
      maxHeight: 2400,
    });
    return compressedImage;
  };
  const handleFilePick = async () => {
    try {
      const documents = [];
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });

      results.forEach((result) => {
        const { name, uri, size, type, fileCopyUri } = result;
        documents.push({ uri: uri, type: type, size: size, name: name, fileCopyUri: fileCopyUri });
      });

      setFiles(documents);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'Unable to pick file');
        console.warn(error);
      }
    }
  };

  return (

    < >
      {files && (<>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.imageContainer}>
            {files &&
              files.map((file, index) => (
                <TouchableOpacity key={index} onPress={handleFilePick}>
                  <Image source={{ uri: file.uri }} style={styles.image} />
                </TouchableOpacity>
              ))}

          </View>
        </ScrollView>


        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          {loader ? <ActivityIndicator color="white" /> : <Text style={{ color: 'white', fontWeight: 'bold' }}>Upload File</Text>}
        </TouchableOpacity>

      </>)}
      <View style={styles.container}>
        {!files && (<View>
          <TouchableOpacity onPress={handleFilePick}>
            <Image
              source={require('../../../../../assets/prescription.png')}
              style={{ width: 200, height: 200, marginLeft: width * 0.11 }}
            />
          </TouchableOpacity>


          <TouchableOpacity onPress={handleSubmit} style={styles.button2}>
            {loader ? <ActivityIndicator color="white" /> : <Text style={{ color: 'white', fontWeight: 'bold' }}>Upload File</Text>}
          </TouchableOpacity>

        </View>)}
      </View>


    </>
  );
};

export default FileUpload;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',

  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',

    marginLeft: width * (0.031),
    marginTop: width * (0.031),

  },
  image: {
    width: width * 0.3,
    height: height * 0.2,
    marginRight: 5,
    marginTop: 5,
    borderRadius: 5


  },
  button: {
    backgroundColor: 'rgb(108, 99, 255)',
    height: height * 0.05, 
    width: width * 0.8, 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * (0.1),
    borderRadius: 10,
    paddingHorizontal: 100, marginTop: 90, marginBottom: 100
  },
  button2: {
    backgroundColor: 'rgb(108, 99, 255)',
    height: height * 0.05, // 20% of window height
    width: width * 0.8, // 80% of window width
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 100, marginTop: 60,
    borderRadius: 10,

  }
});
