import { StyleSheet, View, ScrollView, RefreshControl, useColorScheme, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchUserAnalytics } from '../../../../../logic/redux/admin/AdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { BarChart } from 'react-native-gifted-charts';
import Tooltip from 'react-native-walkthrough-tooltip';

const Useranalytics = () => {
    const theme = useTheme();
    const scheme = useColorScheme();
    const { userAnalytics } = useSelector((state) => state.admin);
    const [refreshing, setRefreshing] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [selectedBar, setSelectedBar] = useState(null); // State to track the selected bar
    const dispatch = useDispatch();

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(fetchUserAnalytics()).finally(() => setRefreshing(false));
    };

    useEffect(() => {
        dispatch(fetchUserAnalytics());
    }, [dispatch]);

    const isDataAvailable = userAnalytics && userAnalytics.data && userAnalytics.data.length >= 10;

    const barData = isDataAvailable
        ? [
            { value: userAnalytics.data[0], label: 'Patient', frontColor: '#4ABFF4', onPress: () => handleBarPress('Patient', userAnalytics.data[0]) },
            { value: userAnalytics.data[1], label: 'Doctor', frontColor: '#79C3DB', onPress: () => handleBarPress('Doctor', userAnalytics.data[1]) },
            { value: userAnalytics.data[2], label: 'Pathologist', frontColor: '#28B2B3', onPress: () => handleBarPress('Pathologist', userAnalytics.data[2]) },
            { value: userAnalytics.data[3], label: 'Pharmacy', frontColor: '#4ADDBA', onPress: () => handleBarPress('Pharmacy', userAnalytics.data[3]) },
            { value: userAnalytics.data[4], label: 'ResearchLab', frontColor: '#91E3E3', onPress: () => handleBarPress('ResearchLab', userAnalytics.data[4]) },
        ]
        : [];

    const barData2 = isDataAvailable
        ? [
            { value: userAnalytics.data[5], label: 'Patient', frontColor: '#4ABFF4', onPress: () => handleBarPress('Patient (Premium)', userAnalytics.data[5]) },
            { value: userAnalytics.data[6], label: 'Doctor', frontColor: '#79C3DB', onPress: () => handleBarPress('Doctor (Premium)', userAnalytics.data[6]) },
            { value: userAnalytics.data[7], label: 'Pathologist', frontColor: '#28B2B3', onPress: () => handleBarPress('Pathologist (Premium)', userAnalytics.data[7]) },
            { value: userAnalytics.data[8], label: 'Pharmacy', frontColor: '#4ADDBA', onPress: () => handleBarPress('Pharmacy (Premium)', userAnalytics.data[8]) },
            { value: userAnalytics.data[9], label: 'ResearchLab', frontColor: '#91E3E3', onPress: () => handleBarPress('ResearchLab (Premium)', userAnalytics.data[9]) },
        ]
        : [];

    const handleBarPress = (label, value) => {
        setSelectedBar({ label, value });
        setTooltipVisible(true);
    };

    const containerBackgroundColor = scheme === 'dark' ? theme.colors.background : theme.colors.background;
    const textColor = scheme === 'dark' ? theme.colors.text : theme.colors.text;
    const ttextColor = scheme === 'light' ? theme.colors.primary : theme.colors.primary;
    const indicatorColor = scheme === 'dark' ? theme.colors.primary : theme.colors.primary;

    return (
        <View style={[styles.container, { backgroundColor: containerBackgroundColor }]}>
            {userAnalytics.loading ? (
                <ActivityIndicator size="large" color={indicatorColor} />
            ) : (
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    horizontal={true}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.chartContainer}>
                        {isDataAvailable ? (
                            <>
                                <BarChart
                                    showFractionalValue
                                    showYAxisIndices
                                    noOfSections={5}
                                    maxValue={50}
                                    data={barData}
                                    isAnimated
                                    barWidth={50}
                                    barSpacing={85}
                                    xAxisLabelTextStyle={{
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: ttextColor,
                                    }}
                                />
                                <Text style={[styles.chartLabel, { color: ttextColor }]}>Number of Total Users</Text>

                                <BarChart
                                    showFractionalValue
                                    showYAxisIndices
                                    noOfSections={5}
                                    maxValue={50}
                                    data={barData2}
                                    isAnimated
                                    barWidth={50}
                                    barSpacing={85}
                                    xAxisLabelTextStyle={{
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: ttextColor,
                                    }}
                                />
                                <Text style={[styles.chartLabel, { color: ttextColor }]}>Number of Premium Subscriptions</Text>


                                {selectedBar && (
                                    <Tooltip
                                        isVisible={tooltipVisible}
                                        content={<Text style={[styles.tooltipText, { color: ttextColor }]}>{selectedBar.label}: {selectedBar.value}</Text>}
                                        placement="center"
                                        onClose={() => setTooltipVisible(false)}
                                        topAdjustment={10} // Adjust as needed
                                        showChildInTooltip={false}
                                    />
                                )}
                            </>
                        ) : (
                            <Text style={[styles.errorText, { color: ttextColor }]}>No data available</Text>
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default Useranalytics;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    chartLabel: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    errorText: {
        fontSize: 16,
        marginTop: 20,
    },
    tooltipText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red', // Ensure text color is black
    },
    tooltipTrigger: {
        width: 0,
        height: 0,
    },
});
