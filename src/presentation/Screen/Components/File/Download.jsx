import RNFS from 'react-native-fs';
import { Alert, Platform } from 'react-native';

export const downloadFile = async (url) => {
  try {
    const timestamp = new Date().getTime(); 
    const fileName = `prescription_${timestamp}.jpg`; 
    const destinationPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    RNFS.downloadFile({
      fromUrl: url,
      toFile: destinationPath,
      progressDivider: 5, 
      begin: (res) => {
        console.log('Download has begun');
        console.log('Content-Length:', res.contentLength / 1024, 'KB');
      },
      progress: (res) => {
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log('Download progress:', progress.toFixed(2) + '%');
        
        
      },
    })
      .promise.then((response) => {
        console.log('FILE DOWNLOAD SUCCESS:', fileName);
        Alert.alert("Downloaded successfully")
      })
      .catch((error) => {
        console.log('FILE DOWNLOAD FAILED:', error);
      });
  } catch (error) {
    console.error('Error while downloading file:', error);
    return null;
  }
};
