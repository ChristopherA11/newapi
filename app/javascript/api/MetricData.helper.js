import _ from "lodash";

export const getCensusTrackData = (radarData, metricEntries) => {
  const RADAR_TRACK_OTHER = "10"
  const censusTrackData = _.map(_.groupBy(radarData, 'tract_id'), (trackData, trackId) => {
    let metricHash = getMetricWiseData(trackData, metricEntries);
    const trackLabel = trackId == "undefined" ? RADAR_TRACK_OTHER : trackId;
    return { trackId: trackLabel, metricData: metricHash };
  });
  return censusTrackData;
}

// const radarData = [
//   {tract_id: '1', 'radar_metric_id': 'ac',metric_index: '2', curent_value: '1', compare_value: '1', denominator_compare_value: '', denominator_current_value: '100'}, 
//   ];
// const metricEntries = [
//     {id: 'ac', metricIndex: '2', 'numerator_aggregate_type': 'abc', 'denominator_column': ''}, 
//     {id: 'ab', metricIndex: '2', 'numerator_aggregate_type': 'avg'},     
//   ]

// matricEntry=[
//   {id: "", metricIndex: "", denominatorColumn: ""}
// ]

// const censusTrackData = [{trackId: '', metricData: [{'ac': {curent_value: '', compareValue: '', change: ''}, 'ab': {currentvalue: "", compareValue: "", change:""} }] }]

export const tractMapBuckets = (censusTrackData, metricEntries) => {
  const metricValues = {};
  _.each(censusTrackData, (censusEntry) => {
    _.each(metricEntries, (metricEntry, index) => {
      const metricId = metricEntry['id'];
      if (_.isEmpty(metricValues[metricId])) {
        metricValues[metricId] = [];
      }
      metricValues[metricId].push(_.get(censusEntry, `metricData[${index}].${metricId}.change`));
    });
  });

  const metricBuckets = {};
  _.each(metricEntries, (metricEntry) => {
    const metricId = metricEntry['id'];
    const values = _.get(metricValues, metricId);
    const min = _.min(values);
    const max = _.max(values);
    const intervals = getLinearBuckets(
      (min == max) ? min - 1 : min,
      (min == max) ? max + 1 : max,
      10,
      "0"
    );

    const radarColorPalette = getRadarColorPalette(_.clamp(intervals.length, 0, 10));
    const bucketRanges = _.chain(0).
      range(intervals.length - 1).
      map((index) => {
        return { start: intervals[index], end: intervals[index + 1] };
      }).
      value();
    metricBuckets[metricId] = _.map(bucketRanges, (bucketRange, index) => {
      return {
        ...bucketRange,
        color: radarColorPalette[index] || _.last(radarColorPalette)
      }
    });
  });
  return metricBuckets;
}

// const censusTrackData = [
//   {
//     metricData: [
//       { id: 'metric1', metric1: { change: 10 } },
//       { id: 'metric2', metric2: { change: 15 } },
//     ],
//   },
// ];

// const metricEntries = [
//   { id: 'metric1', name: 'Metric 1' },
//   { id: 'metric2', name: 'Metric 2' },
// ];


export const getShapeWiseChoroplethData = (radarData, metricEntry) => {
  return _.map(_.groupBy(radarData, 'tract_id'), (trackData, trackId) => {
    const filteredData = _.filter(trackData, (datum) => {
      return (datum['radar_metric_id'] == metricEntry['id'] &&
        datum['metric_index'] == metricEntry['metricIndex']);
    });
    let metricHash = calculateMetricData(filteredData, metricEntry);
    return {
      shape_id: trackId,
      count: metricHash['change'],
      ...metricHash
    };
  });
}
// radarData = [
//   {tract_id: '1', 'radar_metric_id': 'ac',metric_index: '2', curent_value: '1', compare_value: '1', denominator_compare_value: '', denominator_current_value: '100'},
// ]
// matricEntry=[
//   {id: "", metricIndex: "", denominatorColumn: ""}
// ]

//OUTPUT
// {shape_id: "a", count: 10, currentValue: 10, compareValue: 20, change: 20}

export const getMetricWiseData = (allMetricsData, metricEntries, showNA = false, isSmallPage = false) => {
  let metricWiseData = [];
  _.each(metricEntries, (metricEntry) => {
    let metricHash = {}
    const metricData = _.filter(allMetricsData, (datum) => {
      return (datum['radar_metric_id'] == metricEntry['id'] &&
        datum['metric_index'] == metricEntry['metricIndex']);
    });
    if (_.isEmpty(metricData) && showNA && metricEntry['numerator_aggregate_type'] == 'avg') {
      metricHash[metricEntry['id']] = getNaValueObject()
    } else if (showNA && metricEntry['numerator_aggregate_type'] == 'avg' && isSmallPage) {
      metricHash[metricEntry['id']] = getNaValueObject();
    } else {
      metricHash[metricEntry['id']] = calculateMetricData(metricData, metricEntry)
    }
    metricWiseData.push(metricHash);
  });
  return metricWiseData;
}

const getNaValueObject = () => {
  return {
    currentValue: 'N/A',
    compareValue: 'N/A',
    change: 'N/A'
  }
}

export const calculateMetricData = (metricData, metricEntry) => {
  const denominatorColumn = metricEntry['denominator_column'];
  let currentSumValue = 0;
  let compareSumValue = 0;
  let denominatorCurrentSumValue = 0, denominatorCompareSumValue = 0;
  _.each(metricData, (datum) => {
    currentSumValue += Number(datum['current_value'] || 0); 
    compareSumValue += Number(datum['compare_value'] || 0); 
    denominatorCurrentSumValue += Number(datum['denominator_current_value'] || 0); 
    denominatorCompareSumValue += Number(datum['denominator_compare_value'] || 0); 
  });
  let currentValue = currentSumValue; 
  let compareValue = compareSumValue; 
  if (!_.isEmpty(denominatorColumn)) {
    if (denominatorCurrentSumValue != 0) {
      currentValue = (currentValue / denominatorCurrentSumValue);
    }
    if (denominatorCompareSumValue != 0) {
      compareValue = (compareValue / denominatorCompareSumValue);
    }
  }
  let change = getPercentage(currentValue, compareValue);
  return {
    currentValue: _.round(currentValue, 2),
    compareValue: _.round(compareValue, 2),
    change: _.round(change, 2)
  };
}

export const getPercentage = (currentValue, compareValue) => {
  if (compareValue == 0) {
    return currentValue == 0 ? 0 : 100;
  }
  const difference = currentValue - compareValue; 
  const percentage = ((100.00 * difference) / compareValue); 
  return _.isNaN(percentage) ? 0 : percentage; 
}

// currenValue = 10, compareValue = 20

export const getBucketColor = (metricValueEntry, buckets) => {
  const defaultBucket = _.last(buckets);
  const matchingBucket = _.find(buckets, (bucket) => {
    return metricValueEntry.change >= bucket.start && metricValueEntry.change <= bucket.end;
  });
  return _.get((matchingBucket || defaultBucket), 'color');
}

// matricvalue =  {change: 10}
//const buckets = [
//   { start: 0, end: 10, color: "red" },
//   { start: 15, end: 20, color: "black" },
// ]

const getRadarColorPalette = (color) => {
  const colors = ["red", "blue", "green", "black", "white", "orange", "lightGreen", "lightBlue", "purble", "pink"]
  return colors;
}

export const getLinearBuckets = (numbers) => {
  const num = [0,1,2,3,4,5,6,7,8,9]
   return num;
}