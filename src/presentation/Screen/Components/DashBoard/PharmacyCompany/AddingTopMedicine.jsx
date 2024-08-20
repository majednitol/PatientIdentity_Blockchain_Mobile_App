import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';

import { ActivityIndicator, Button, TextInput } from 'react-native-paper';

import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { addTopMedicine } from '../../../../../logic/redux/pharmacy company/pharmacyCompanySlice';

const AddingTopMedichine = () => {
  const {  smartAccount} = useContext(HealthContext);
  const { loading:isLoading, error:accountCreationError } = useSelector((state) => state.pharmacyCompany);
  const [topMedicine, setTopMedicine] = useState('');
  const [errors, setErrors] = useState({ topMedicine: false });
  const dispatch = useDispatch();
  const submitMedicine = async () => {
    // Reset errors state before submitting
    setErrors({ topMedicine: false });

    try {
      if (topMedicine.trim() !== '') {
        dispatch(addTopMedicine({topMedicine}));
        console.info('Contract call success');
      } else {
        setErrors(prevErrors => ({ ...prevErrors, topMedicine: true }));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleInputChange = (name, value) => {
    if (name === 'topMedicine') {
      setTopMedicine(value);

      // Reset errors state when input changes
      setErrors({ topMedicine: false });
    }
  };

  return (
    <Animated.View
      style={{ flex: 1, justifyContent: 'center' }}
      entering={FadeInDown.springify()}
      exiting={FadeInUp.springify()}>
      <View style={{ marginHorizontal: 16 }}>
        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          keyboardType="default"
          value={topMedicine}
          error={errors.topMedicine}
          onChangeText={value => handleInputChange('topMedicine', value)}
          label="Enter topMedicine"
        />
        {errors.topMedicine && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}
        <Button
          style={{ margin: 30 }}
          color="blue"
          onPress={submitMedicine}
          mode="contained">
          {isLoading ? <ActivityIndicator color="white"  />  : <Text style={{ color: 'white' }}>Submit</Text>}
        </Button>
        {/* {isLoading === true ? <ActivityIndicator color="white" style={{ position: 'relative', top: -62 }} /> : null} */}
      </View>
    </Animated.View>
  );
};

export default AddingTopMedichine;
