import React, { useContext, useState } from "react";

import DisplayFile from "../../File/DisplayFile";

import { View, Text, ScrollView, RefreshControl } from "react-native";
import { HealthContext } from "../../../../../logic/context/health";



const SharedDataFromPathologist = () => {
 
  const {
    doctorData,isLoading,getDoctorAllData
  } = useContext(HealthContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getDoctorAllData()

    setRefreshing(false);

  };
  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      {isLoading ? <Text>loading</Text> : <DisplayFile userData={doctorData} />}
    </ScrollView>
  );
};

export default SharedDataFromPathologist;


