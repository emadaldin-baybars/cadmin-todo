import React, {useEffect, useState} from 'react'
import {
    ScrollView,
    VStack,
    useColorModeValue,
    View,
    Text
} from 'native-base'
import AnimatedColorBox from '../components/animated-color-box'
import Masthead from '../components/masthead'
import Navbar from '../components/navbar'
import { Dimensions } from "react-native";
import {api_url} from '../api-params';
import {
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { iUser } from '../models/loginResponse'
import { iChartsData } from '../models/chartsData'
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes'


const ChartsScreen = (props: {navigation: any, user: iUser}) => {

    const {navigation, user} = props;

    const [chartsData, setChartsData] = useState<iChartsData|null>();
    const screenWidth = Dimensions.get("window").width - 20;
    const chartConfig: ChartConfig = {
        backgroundColor: "#FFF",
        backgroundGradientFrom: "#FFF",
        backgroundGradientTo: "#F1F1F1",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => '#333',
        labelColor: (opacity = 1) => `#333`,
        style: {
            borderRadius: 16
        },
    }
    const today = new Date();
    const data = {
        labels: getHorizontalAxeLabels(chartsData),
        datasets: [
            {
                data: chartsData?.chartBars.map(p => p.trackedTime.hours) ?? []
            }
        ]
    }

    function dates(current: Date) {
        var week= new Array(); 
        // Starting Monday not Sunday
        current.setDate((current.getDate() - current.getDay() +1));
        for (var i = 0; i < 7; i++) {
            week.push(
                new Date(current).toUTCString().split(',')[0]
            ); 
            current.setDate(current.getDate() +1);
        }
        return week; 
    }

    function getChartsData() {
        fetch(
          `${api_url}time-accounting/chart-data`, {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + user.jwtBearerToken,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: null, startWeekDate: null})
          }) 
          .then((response) => response.json())
          .then((json) => {
            setChartsData(json)
          })
          .catch((error) => {
              console.error('err', error);
          });
    }

    function getDay(date: Date): string{
        return date.toUTCString().split(',')[0]
    }

    function getHorizontalAxeLabels(data: iChartsData|null|undefined){
        if(data != null && data != undefined){
            let dates = data.chartBars.map(p => p.date);
            let days: Array<string> = [];
            for (let index = 0; index < dates.length; index++) {
                let thatDate = new Date(dates[index])
                thatDate.setDate(thatDate.getDate() + 1)
                days.push(getDay(thatDate));
            }
    
            return days
        }

        return [];
    }

    useEffect(() => {
        setChartsData(null);
        getChartsData();
    }, [])
    return (
        <AnimatedColorBox
            flex={1}
            bg={useColorModeValue('warmGray.50', 'warmGray.900')}
            w="full">
            <Masthead
                title="Charts"
                image={require('../assets/masthead.png')}>
                <Navbar main={false}/>
            </Masthead>
            <ScrollView
                borderTopLeftRadius="20px"
                borderTopRightRadius="20px"
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                mt="-20px"
                pt="30px"
                p={4}>
                <VStack flex={1} space={4}>
                    <View 
                        style={{
                            marginHorizontal: 10, 
                            justifyContent: 'center', 
                            flex:1, 
                            alignItems: 'center'}}>
                        <Text 
                            style={{
                                flex: 1, 
                                width: '100%',
                                fontWeight: '500',
                                marginBottom: 10
                            }}>
                                Time Tracking
                        </Text>
                        <BarChart
                            data={data}
                            width={screenWidth} // from react-native
                            height={200}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={chartConfig}
                            showValuesOnTopOfBars={true}
                            fromZero={true}
                            withInnerLines={false}
                            style={{
                                marginVertical: 8,
                            }}
                        />
                    </View>
                </VStack>
            </ScrollView>
        </AnimatedColorBox>
    )
}

export default ChartsScreen