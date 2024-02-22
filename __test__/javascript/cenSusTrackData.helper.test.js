import { getCensusTrackData, getMetricWiseData } from "../../app/javascript/api/MetricData.helper"
import _ from "lodash";

describe('cenSus TrackData', () => {
  test('getCensusTrackData tract_id value pass', () => {
    const radarData = [
      { tract_id: '001', radar_metric_id: 'A', metric_index: 1, current_value: 10, compare_value: 12, denominator_current_value: 5, denominator_compare_value: 6 },
      { tract_id: '002', radar_metric_id: 'A', metric_index: 1, current_value: 15, compare_value: 14, denominator_current_value: 7, denominator_compare_value: 8 },
    ];
    const metricEntries = [
      { id: 'A', metricIndex: 1, numerator_aggregate_type: 'avg', denominator_column: 'denominator_column_A' },
    ];

    const censusTrackData = getCensusTrackData(radarData, metricEntries);
    expect(censusTrackData).toEqual([{ "metricData": [{ "A": { "change": 0, "compareValue": 2, "currentValue": 2 } }], "trackId": "001" }, { "metricData": [{ "A": { "change": 22.45, "compareValue": 1.75, "currentValue": 2.14 } }], "trackId": "002" }]);
  });  

  // TRACT_ID undefined use to RADAR_TRACK_OTHER
  test('getCensusTrackData tract_id value pass', () => {
    const radarData = [
      { tract_id: undefined, radar_metric_id: 'A', metric_index: 1, current_value: 10, compare_value: 12, denominator_current_value: 5, denominator_compare_value: 6 },
      { tract_id: undefined, radar_metric_id: 'A', metric_index: 1, current_value: 20, compare_value: 18, denominator_current_value: 10, denominator_compare_value: 9 },
      { tract_id: undefined, radar_metric_id: 'A', metric_index: 1, current_value: 15, compare_value: 14, denominator_current_value: 7, denominator_compare_value: 8 },
    ];
    const RADAR_TRACK_OTHER = "10"
    const metricEntries = [
      { id: 'A', metricIndex: 1, numerator_aggregate_type: 'avg', denominator_column: 'denominator_column_A' },
    ];

    const censusTrackData = getCensusTrackData(radarData, metricEntries);
    expect(censusTrackData).toEqual( [{"metricData": [{"A": {"change": 6.92, "compareValue": 1.91, "currentValue": 2.05}}], "trackId": RADAR_TRACK_OTHER}]
    );
  });

  test('getCensusTrackData tract_id undefined and no match id', () => {
    const radarData = [
      { tract_id: undefined, radar_metric_id: 'A', metric_index: 1, current_value: 10, compare_value: 12, denominator_current_value: 5, denominator_compare_value: 6 },
      { tract_id: undefined, radar_metric_id: 'A', metric_index: 1, current_value: 20, compare_value: 18, denominator_current_value: 10, denominator_compare_value: 9 },
      { tract_id: undefined, radar_metric_id: 'A', metric_index: 1, current_value: 15, compare_value: 14, denominator_current_value: 7, denominator_compare_value: 8 },
    ];
    const RADAR_TRACK_OTHER = "10"
    const metricEntries = [
      { id: 'B', metricIndex: 1, numerator_aggregate_type: 'avg', denominator_column: 'denominator_column_A' },
    ];

    const censusTrackData = getCensusTrackData(radarData, metricEntries);
    expect(censusTrackData).toEqual([{"metricData": [{"B": {"change": 0, "compareValue": 0, "currentValue": 0}}], "trackId": "10"}]);
  });

// else condition statisfied with  numerator_aggregate_type: 'min'
  it('getMetricWiseData expected Output', () => {
    const allMetricsData = [
      { radar_metric_id: 'A', metric_index: 1, current_value: 10, compare_value: 12, denominator_current_value: 5, denominator_compare_value: 6 },
      { radar_metric_id: 'A', metric_index: 1, current_value: 20, compare_value: 18, denominator_current_value: 10, denominator_compare_value: 9 },
    ];
    const metricEntries = [
      { id: 'A', metricIndex: 1, numerator_aggregate_type: 'min', denominator_column: 'denominator_column_A' },
    ];
    const metricWiseData = getMetricWiseData(allMetricsData, metricEntries, false, false);

    expect(metricWiseData).toEqual([{ "A": { "change": 0, "compareValue": 2, "currentValue": 2 } }]
    );
  });

// if condition statisfied
  it('getMetricWiseData filter the condition and metric data is empty', () => {
    const allMetricsData = [
      { radar_metric_id: 'B', metric_index: 3, current_value: 10, compare_value: 12, denominator_current_value: 5, denominator_compare_value: 6 },
      { radar_metric_id: 'B', metric_index: 3, current_value: 20, compare_value: 18, denominator_current_value: 10, denominator_compare_value: 9 },
    ];
    const metricEntries = [
      { id: 'A', metricIndex: 1, numerator_aggregate_type: 'avg', denominator_column: 'denominator_column_A' },
    ];
    const metricWiseData = getMetricWiseData(allMetricsData, metricEntries, true, true);
    expect(metricWiseData).toEqual([{ A: { currentValue: 'N/A', compareValue: 'N/A', change: 'N/A' } }]
    );
  });

// elseIf condition statisfied
  it('getMetricWiseData numerator_aggregate_type avg elseIf codition pass', () => {
    const allMetricsData = [
      { radar_metric_id: 'A', metric_index: 1, current_value: 10, compare_value: 12, denominator_current_value: 5, denominator_compare_value: 6 },
      { radar_metric_id: 'A', metric_index: 1, current_value: 20, compare_value: 18, denominator_current_value: 10, denominator_compare_value: 9 },
    ];
    const metricEntries = [
      { id: 'A', metricIndex: 1, numerator_aggregate_type: 'avg', denominator_column: 'denominator_column_A' },
    ];
    const metricWiseData = getMetricWiseData(allMetricsData, metricEntries, true, true);
    expect(metricWiseData).toEqual([{ A: { currentValue: 'N/A', compareValue: 'N/A', change: 'N/A' } }]
    );
  });

//   numerator_aggregate_type: 'Avg' else condition pass
  it('getMetricWiseData numerator_aggregate_type avg codition pass', () => {
    const allMetricsData = [
      { radar_metric_id: 'A', metric_index: 1, current_value: 10, compare_value: 12, denominator_current_value: 5, denominator_compare_value: 6 },
      { radar_metric_id: 'A', metric_index: 1, current_value: 20, compare_value: 18, denominator_current_value: 10, denominator_compare_value: 9 },
    ];
    const metricEntries = [
      { id: 'A', metricIndex: 1, numerator_aggregate_type: 'Avg', denominator_column: 'denominator_column_A' },
    ];
    const metricWiseData = getMetricWiseData(allMetricsData, metricEntries,);
    expect(metricWiseData).toEqual([{ A: { currentValue: 2, compareValue: 2, change: 0 } }]
    );
  });
});
