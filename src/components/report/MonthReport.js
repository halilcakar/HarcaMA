import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {reportData} from "../../store/actions";

import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph} from 'react-native-chart-kit';


class MonthReport extends Component {

  componentDidMount() {
    this.props.reportData();
  }

  render() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [20, 45, 28, 80, 99, 43]
      }]
    };
    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    };
    return (
      <View>
        <Text>
          Bezier Line Chart
        </Text>
        <LineChart
          data={data}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reportData: () => dispatch(reportData()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthReport);