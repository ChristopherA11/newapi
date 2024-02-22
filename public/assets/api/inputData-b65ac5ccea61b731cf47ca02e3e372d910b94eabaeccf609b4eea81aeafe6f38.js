// const { getCensusTrackData, getBucketColor } = require('../../app/javascript/api/metricData.helper')


// const radarData = [
//     {tract_id: 1, radar_metric_id: "a", metric_index: "0", current_value: "50", compare_value: "60", denominator_current_value: "70", denominator_compare_value: "80"},

//     {tract_id: 2, radar_metric_id: "b", metric_index: "1", current_value: "30", compare_value: "40", denominator_current_value: "20", denominator_compare_value: "50"}
// ]
// const mockEntries = [
//     {id: "1", metricIndex: "0", numerator_aggregate_type: "avg", denominator_column: "2"},
//     {id: "2", metricIndex: "1", numerator_aggregate_type: "abc", denominator_column: "3"},
// ]

// const censusTrackData=[
//     {trackId: "1", metricData:[{1:{currentValue: "50", compareValue: "60", change: "70"}}, 
//     {2:{currentValue: "110", compareValue: "120", change: "90"}}]},

//     {trackId: "2", metricData:[{3:{currentValue: "80", compareValue: "70", change: "60"}}, 
//     {4:{currentValue: "80", compareValue: "90", change: "60"}}]}
// ]


// BUCKET INPUT
// const matricvalue =  {change: 10}
//const buckets=[
// {start: 10, end: 20, color: "red"},
// {start: 0, end: 10, color: "blue"},
// {start: 30, end: 40, color: "green"},
//]



//INPUT
// const metricData = [
//   { current_value: 10, compare_value: 5, denominator_current_value: 2, denominator_compare_value: 1 },
//   { current_value: 20, compare_value: 10, denominator_current_value: 4, denominator_compare_value: 2 },
// ];
//const metricEntry = {denominator_column: ""}

// OutPut
// {currentValue=10, compareValue=20, change=10}



// INPUT 
// const allMetricsData =[
//   {radar_metric_id: "", metric_index: "", currentValue: "", compareValue: "", denominator_compare_value: "", denominator_current_value: ""}
// ]
// metricEntries = [
//     {id: 'ac', metricIndex: '2', 'numerator_aggregate_type': 'abc', 'denominator_column': ''}, 
//     {id: 'ab', metricIndex: '2', 'numerator_aggregate_type': 'avg'}, 
//   ]

// OUTPUT 
// metricWiseData=[{id: "", currentValue: "", compareValue:"", change: ""}]




// jest.mock('lodash', () => ({
  //   each: jest.fn(),
  //   get: jest.fn(),
  //   min: jest.fn(),
  //   max: jest.fn(),
  //   chain: jest.fn(),
  //   range: jest.fn(),
  //   map: jest.fn(),
  //   filter: jest.fn(),
  // }));
