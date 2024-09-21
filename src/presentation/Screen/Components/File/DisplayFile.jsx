
import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Dimensions, useColorScheme } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { downloadFile } from './Download';
import Pinchable from 'react-native-pinchable';
import FastImage from 'react-native-fast-image'
import { ActivityIndicator, Button, IconButton, Text } from 'react-native-paper';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../logic/context/health';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import PaginationDot from 'react-native-animated-pagination-dot'
import { useDispatch, useSelector } from 'react-redux';
import { deletePrescription } from '../../../../logic/redux/patient/PatientSlice';
import { Alert } from 'react-native';
import SmartAccount from '../../../../service/wallet connect/SmartAccount';
// import { deletePrescription } from '../../../../logic/redux/doctor/DoctorSlice';
const { width, height } = Dimensions.get('window');

const QRCodeGenerator = ({ url, onClose }) => {
    return (
        <Modal visible={true} transparent={true} >
            <View style={styles.modalContainer}>
                <View style={styles.qrContainer}>
                    <TouchableOpacity style={styles.closeButtonQr} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    {url ? (
                        <QRCode value={url} size={Math.min(width * 0.5, height * 0.5)} />
                    ) : (
                        <View>
                            <Text>Loading QR Code...</Text>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const DisplayFile = ({ userData, route }) => {
    const { ConnectedAccountUser, reducerValue, anotherUser, isDbVisiable, setIsDbVisiable, downloadProgress, setDownloadProgress, userAddress, setUserAddress } = useContext(HealthContext);
    const dispatch = useDispatch();

    const { connectedUserType } = useSelector((state) => state.connectedUser);

    const { success, deleteLoader, error } = useSelector((state) => state.patient);
    const [images, setImages] = useState([]);
    const { imageUrls } = route?.params ?? {};
    console.log('userData', imageUrls)
    const [selectedImage, setSelectedImage] = useState(null);
    const [fullscreen, setFullscreen] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState(null);
    const [fullscreenQr, setFullscreenQr] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [data, setData] = useState()
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const [curPage, setCurPage] = useState(0);
    const handleSheetChanges = useCallback((index) => {

    }, []);

    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    };

    const colorScheme = useColorScheme();
    const getData = async () => {
        try {
            let dataArray = userData || imageUrls;
            console.log("dataArray", dataArray);
            
            if (typeof userData === 'string' || typeof imageUrls === 'string') {
                if (userData) {
                    dataArray = userData?.split(',').map(item => item.trim()); 
                } else if (imageUrls) {
                    dataArray = imageUrls?.split(',').map(item => item.trim());
                }
            }
            setData(dataArray);
            console.log("dataArray", dataArray);
            // setData(dataArray);
            const imageComponents = dataArray.slice().reverse().map((item, i) => (
                <View key={i} style={styles.imageContainerItem}>

                    <TouchableOpacity onPress={() => openFullscreen(item)}>
                        <IconButton
                            icon="dots-vertical"
                            iconColor='rgb(108, 99, 255)'
                            size={20}
                            style={[styles.iconButton, { backgroundColor: 'rgb(228, 226, 255)' }]}
                            onPress={() => {
                                openBottomSheet()
                                setCurrentImage(item)
                                { setCurrentImageIndex(i) }
                            }
                            } // Open Bottom Sheet on press
                        />

                        <FastImage
                            source={{ uri: `https://gateway.pinata.cloud/ipfs${item.substring(6)}` }}
                            style={styles.image}
                        />

                    </TouchableOpacity>
                </View>
            ));
            setImages(imageComponents);
        } catch (error) {
            console.log(error);
        }
    };
    const handlePageChange = (page) => {
        setCurPage(page);
    };
    useEffect(() => {
        if (imageUrls || userData) {
            getData();
        }
    }, [userData || reducerValue || imageUrls]);

    const openFullscreen = (item) => {
        setSelectedImage(item);
        setFullscreen(true);
    };

    const closeFullscreen = () => {
        setSelectedImage(null);
        setFullscreen(false);
    };


    const goToPreviousPage = () => {
        if (curPage > 0) {
            setCurPage(curPage - 1);
        }
    };


    const goToNextPage = () => {
        const maxPage = Math.ceil(images.length / 9);
        if (curPage < maxPage - 1) {
            setCurPage(curPage + 1);
        }
    };

    return (
        <View>

            <View style={styles.imageContainer} entering={FadeInDown.springify()}
                exiting={FadeInUp.springify()}>
                {images.length > 0 ? (
                    <>
                        {console.log("images.length", images.length)}
                        {images?.slice(curPage * 9, (curPage + 1) * 9)}
                        <View style={styles.navigationButtons}>
                            <Button mode="text" style={{ paddingRight: 5 }} disabled={curPage === 0 ? true : false} onPress={goToPreviousPage}>Previous</Button>
                            <PaginationDot
                                activeDotColor={'blue'}
                                inactiveDotColor={'red'}
                                curPage={curPage}
                                maxPage={Math.ceil(images.length / 9)}
                                onPageChange={(page) => handlePageChange(page)} // Function to handle page change
                            />
                            <Button mode="text" style={{ paddingLeft: 5 }} disabled={curPage === Math.ceil(images.length / 9) - 1} onPress={goToNextPage}>Next</Button>
                        </View>
                    </>
                ) : images.length === 0 ? (
                    <Text>No Prescription to display</Text>
                ) : (
                    <ActivityIndicator
                        size={45}
                        animating={true}
                        color="rgb(108, 99, 255)"
                        style={styles.loadingIndicator}
                    />
                )}
            </View>

            <Modal visible={fullscreen} transparent={true}>
                <Animated.View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeFullscreen}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Pinchable>
                        <FastImage source={{ uri: `https://gateway.pinata.cloud/ipfs${selectedImage?.substring(6)}` }} style={styles.fullscreenImage} resizeMode="contain" />
                    </Pinchable>
                </Animated.View>
            </Modal>

            {fullscreenQr && (
                <QRCodeGenerator
                    url={selectedUrl}
                    onClose={() => setFullscreenQr(false)}
                />
            )}

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}

                backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? 'rgb(19, 18, 44)' : 'rgb(228, 226, 255)' }}
                handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? 'rgb(228, 226, 255)' : 'rgb(19, 18, 44)' }}
            >
                <BottomSheetView style={styles.bottomSheetContainer}>
                    {/* <TouchableOpacity  style={styles.button} onPress={() => {

                        downloadFile(`https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`);
                    }}> <Text>Download</Text></TouchableOpacity>
                    <TouchableOpacity  style={styles.button} onPress={() => {
                        console.log(`Selected URL: https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`);
                        setSelectedUrl(`https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`);
                        setFullscreenQr(true);
                    }} >
                        <Text>QR Code</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.button} onPress={() => {
                        downloadFile(`https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`);
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            {downloadProgress}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        console.log(`Selected URL: https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`);
                        setSelectedUrl(`https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`);
                        setFullscreenQr(true);
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>QR Code</Text>
                    </TouchableOpacity>

                    {((String(connectedUserType) == '5' || String(connectedUserType) == '1' || String(connectedUserType) == '2') && isDbVisiable === true) ? (<TouchableOpacity style={styles.button3} onPress={async () => {
                        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();

                        console.log('data?.length - 1 - currentImageIndex', currentImageIndex)
                        dispatch(deletePrescription(data?.length - 1 - currentImageIndex, saAddress)).then(() => {
                            Alert.alert("Deleted successfully")
                        })
                    }}>{deleteLoader ? <ActivityIndicator color="white" /> : <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>}</TouchableOpacity>) : null}

                </BottomSheetView>
            </BottomSheetModal>

        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    closeButtonQr: {
        position: 'absolute',
        top: -60,
        right: -10,
        zIndex: 2,
        padding: 10,
    },
    iconButton: {
        position: 'absolute',
        top: width * (0.0001),
        right: width * (0.005),
        zIndex: 2,

    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 10,
        zIndex: 2,
        padding: 10,
    },

    closeButtonText: {
        color: 'purple',
        fontSize: 17,
        backgroundColor: "white",
        padding: 8,
        borderRadius: 5
    },
    fullscreenImage: {
        width: width,
        height: height,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginLeft: width * (0.031),
        marginTop: width * (0.031),



    },
    imageContainerItem: {
        position: 'relative',
        marginBottom: width * (0.031),
    },
    image: {
        width: width * 0.3,
        height: height * 0.25,
        marginRight: 5
    },

    button: {
        backgroundColor: 'rgb(108, 99, 255)',
        height: height * 0.05, // 20% of window height
        width: width * 0.8, // 80% of window width
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * (0.05),
        borderRadius: 10,
        marginVertical: 10,

    },
    // marginBottom: width * (0.031),


    button3: {
        backgroundColor: 'red',
        height: height * 0.05, // 20% of window height
        width: width * 0.8, // 80% of window width
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * (0.05),
        borderRadius: 10,
        marginVertical: 10,

    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetContainer: {
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    navigationButtons: {
        // display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: width * (0.19)
    },
});

export default DisplayFile;





// import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from 'react';
// import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions, useColorScheme } from 'react-native';


// import QRCode from 'react-native-qrcode-svg';
// import { downloadFile } from './Download';
// import Pinchable from 'react-native-pinchable';
// import FastImage from 'react-native-fast-image'
// import { ActivityIndicator, Button, IconButton, Text } from 'react-native-paper';
// import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
// import { HealthContext } from '../../../../logic/context/health';
// import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

// const { width, height } = Dimensions.get('window');

// const QRCodeGenerator = ({ url, onClose }) => {
//     return (
//         <Modal visible={true} transparent={true}>
//             <View style={styles.modalContainer}>
//                 <View style={styles.qrContainer}>
//                     <TouchableOpacity style={styles.closeButtonQr} onPress={onClose}>
//                         <Text style={styles.closeButtonText}>Close</Text>
//                     </TouchableOpacity>
//                     {url ? (
//                         <QRCode value={url} size={Math.min(width * 0.5, height * 0.5)} />
//                     ) : (
//                         <View>
//                             <Text>Loading QR Code...</Text>
//                         </View>
//                     )}
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const DisplayFile = ({ userData, route }) => {
//     const { deletePrescription, ConnectedAccountUser, reducerValue, anotherUser, isDbVisiable, setIsDbVisiable } = useContext(HealthContext);
//     const [images, setImages] = useState([]);
//     const { imageUrls } = route?.params ?? {};
//     console.log('userData', userData)
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [fullscreen, setFullscreen] = useState(false);
//     const [selectedUrl, setSelectedUrl] = useState(null);
//     const [fullscreenQr, setFullscreenQr] = useState(false);
//     const [currentImage, setCurrentImage] = useState(null);
//     const [data, setData] = useState()
//     const [currentImageIndex, setCurrentImageIndex] = useState(null);
//     const bottomSheetModalRef = useRef(null);
//     const snapPoints = useMemo(() => ['25%', '50%'], []);
//     const handleSheetChanges = useCallback((index) => {

//     }, []);

//     const openBottomSheet = () => {
//         bottomSheetModalRef.current?.present();
//     };

//     const colorScheme = useColorScheme();
//     const getData = async () => {
//         try {
//             let dataArray = userData || imageUrls;

//             if (typeof userData === 'string') {
//                 dataArray = userData.split(',').map(item => item.trim());
//             }
//             console.log("dataArray", dataArray);
//             setData(dataArray);
//             const imageComponents = dataArray.slice().reverse().map((item, i) => (
//                 <View key={i} style={styles.imageContainerItem}>
//                     {setCurrentImageIndex(i)}
//                     <TouchableOpacity onPress={() => openFullscreen(item)}>
//                         <IconButton
//                             icon="dots-vertical"
//                             iconColor='rgb(108, 99, 255)'
//                             size={20}
//                             style={[styles.iconButton, { backgroundColor: 'rgb(228, 226, 255)' }]}
//                             onPress={() => {
//                                 openBottomSheet()
//                                 setCurrentImage(item)
//                             }
//                             } // Open Bottom Sheet on press
//                         />

//                         <FastImage
//                             source={{ uri: `https://gateway.pinata.cloud/ipfs${item.substring(6)}` }}
//                             style={styles.image}
//                         />

//                     </TouchableOpacity>
//                 </View>
//             ));
//             setImages(imageComponents);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     useEffect(() => {
//         if (imageUrls || userData) {
//             getData();
//         }
//     }, [userData || reducerValue || imageUrls]);

//     const openFullscreen = (item) => {
//         setSelectedImage(item);
//         setFullscreen(true);
//     };

//     const closeFullscreen = () => {
//         setSelectedImage(null);
//         setFullscreen(false);
//     };

//     return (
//         <ScrollView>

//             <View style={styles.imageContainer} entering={FadeInDown.springify()}
//                 exiting={FadeInUp.springify()}>
//                 {images.length > 0 ? (
//                     images
//                 ) : images.length === 0 ? (
//                     <Text>No Prescription to display</Text>
//                 ) : (
//                     <ActivityIndicator
//                         size={45}
//                         animating={true}
//                         color="rgb(108, 99, 255)"
//                         style={styles.loadingIndicator}
//                     />
//                 )}

//             </View>

//             <Modal visible={fullscreen} transparent={true}>
//                 <Animated.View style={styles.modalContainer}>
//                     <TouchableOpacity style={styles.closeButton} onPress={closeFullscreen}>
//                         <Text style={styles.closeButtonText}>Close</Text>
//                     </TouchableOpacity>
//                     <Pinchable>
//                         <FastImage source={{ uri: `https://gateway.pinata.cloud/ipfs${selectedImage?.substring(6)}` }} style={styles.fullscreenImage} resizeMode="contain" />
//                     </Pinchable>
//                 </Animated.View>
//             </Modal>

//             {fullscreenQr && (
//                 <QRCodeGenerator
//                     url={selectedUrl}
//                     onClose={() => setFullscreenQr(false)}
//                 />
//             )}

//             <BottomSheetModal
//                 ref={bottomSheetModalRef}
//                 index={1}
//                 snapPoints={snapPoints}
//                 onChange={handleSheetChanges}

//                 backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? 'rgb(19, 18, 44)' : 'rgb(228, 226, 255)' }}
//                 handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? 'rgb(228, 226, 255)' : 'rgb(19, 18, 44)' }}
//             >
//                 <BottomSheetView style={styles.bottomSheetContainer}>
//                     <Button mode="contained" textColor="white" style={styles.button} onPress={() => {
//                         // if (Platform.OS === 'android') {
//                         //     getDownloadPermissionAndroid().then(granted => {
//                         //         if (granted) {
//                         //             console.log("currentImage", currentImage)
//                         //             downloadFile(`https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`);
//                         //         } else {
//                         //             console.log('no permission to download')
//                         //         }
//                         //     });

//                         // } else {
//                         //     downloadFile(`https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`).then(res => {
//                         //         RNFetchBlob.ios.previewDocument(res.path());
//                         //     });
//                         // }
//                         downloadFile(`https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`);
//                     }}> Download</Button>
//                     <Button mode="contained" textColor="white" style={styles.button} onPress={() => {
//                         console.log(`Selected URL: https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`);
//                         setSelectedUrl(`https://gateway.pinata.cloud/ipfs${currentImage.substring(6)}`);
//                         setFullscreenQr(true);
//                     }} >QR Code</Button>
//                     {((String(ConnectedAccountUser) == '5' || String(ConnectedAccountUser) == '1' || String(ConnectedAccountUser) == '2') && isDbVisiable === true) ? (<Button mode="contained" textColor="white" style={styles.button3} onPress={() => {
//                         console.log('data?.length - 1 - currentImageIndex', currentImageIndex)
//                         deletePrescription(data?.length - 1 - currentImageIndex, anotherUser)
//                     }}>Delete</Button>) : null}

//                 </BottomSheetView>
//             </BottomSheetModal>

//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.8)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     qrContainer: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//     },
//     closeButtonQr: {
//         position: 'absolute',
//         top: -60,
//         right: -10,
//         zIndex: 2,
//         padding: 10,
//     },
//     iconButton: {
//         position: 'absolute',
//         top: width * (0.0001),
//         right: width * (0.005),
//         zIndex: 2,

//     },
//     closeButton: {
//         position: 'absolute',
//         top: 0,
//         right: 10,
//         zIndex: 2,
//         padding: 10,
//     },

//     closeButtonText: {
//         color: 'purple',
//         fontSize: 17,
//         backgroundColor: "white",
//         padding: 8,
//         borderRadius: 5
//     },
//     fullscreenImage: {
//         width: width,
//         height: height,
//     },
//     imageContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'flex-start',
//         marginLeft: width * (0.031),
//         marginTop: width * (0.031),



//     },
//     imageContainerItem: {
//         position: 'relative',
//         marginBottom: width * (0.031),
//     },
//     image: {
//         width: width * 0.3,
//         height: height * 0.2,
//         marginRight: 5
//     },
//     button: {
//         marginBottom: width * (0.031),

//     },
//     button3: {
//         marginBottom: width * (0.031),
//         backgroundColor: 'red'
//     },
//     loadingIndicator: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     bottomSheetContainer: {
//         padding: 16,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,

//     },
// });

// export default DisplayFile;