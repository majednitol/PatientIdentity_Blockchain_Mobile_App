// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, AppState } from 'react-native';
// import { MMKV } from 'react-native-mmkv';

// const storage = new MMKV();
// export const setLocalStorageData = (key, value) => {
//   storage.set(key, JSON.stringify(value));
// };

// export const getLocalStorageData = (key) => {
//   const storedValue = storage.getString(key);
//   return storedValue ? JSON.parse(storedValue) : null;
// };
// const LocalStorage = () => {
  

//   useEffect(() => {
 
  
//     const handleAppStateChange = (nextAppState) => {
//       if (nextAppState === 'background') {
//         storage.clearAll();
//         console.log('App is in background, storage cleared');
//       }
//     };

//     const subscription = AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       subscription.remove();
//     };
//   }, []);
  

//   return (
//     <>
//     </>
//   );
// };

// export default LocalStorage;



// LocalStorage.js
import { MMKV } from 'react-native-mmkv';

// Initialize storage
const storage = new MMKV();

// Save data to storage
export const saveToStorage = (key, value) => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving data to storage for key "${key}":`, error);
  }
};

// Retrieve data from storage
export const retrieveFromStorage = (key) => {
  try {
    const storedValue = storage.getString(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error(`Error retrieving data from storage for key "${key}":`, error);
    return null;
  }
};

