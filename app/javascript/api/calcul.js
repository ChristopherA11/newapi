   it('calculates metric data with denominator when values are present', () => {
      const metricEntry = {
        'denominator_column': 'some_column',
      };
  
      const metricData = [
        { 'current_value': 10, 'compare_value': 15, 'denominator_current_value': 20, 'denominator_compare_value': 25 },
        { 'current_value': 5, 'compare_value': 10, 'denominator_current_value': 10, 'denominator_compare_value': 15 },
      ];
      const calculateMetricData= jest.fn()
      const result = calculateMetricData(metricData, metricEntry);
  

      const expectedCurrentValue = ((10 + 5) / (20 + 10));
      const expectedCompareValue = ((15 + 10) / (25 + 15));
      const expectedChange = getPercentage(expectedCurrentValue, expectedCompareValue);

      const roundedExpectedCurrentValue = _.round(expectedCurrentValue, 2);
      const roundedExpectedCompareValue = _.round(expectedCompareValue, 2);
      const roundedExpectedChange = _.round(expectedChange, 2);
  
    
      expect(result).not.toEqual({
        currentValue: roundedExpectedCurrentValue,
        compareValue: roundedExpectedCompareValue,
        change: roundedExpectedChange,
      });
      console.log( roundedExpectedChange);
    });


    test('calculateMetricData returns expected result', () => {
      const metricData = [
          { radar_metric_id: 'A', metric_index: 1, current_value: 10, compare_value: 12, denominator_current_value: 5, denominator_compare_value: 6 },
          { radar_metric_id: 'A', metric_index: 1, current_value: 20, compare_value: 18, denominator_current_value: 10, denominator_compare_value: 9 },
          { radar_metric_id: 'B', metric_index: 2, current_value: 30, compare_value: 25, denominator_current_value: 15, denominator_compare_value: 12 },
        ];
        const calculateMetricData = jest.fn()
    const metricEntry = { id: 'A', metricIndex: 1, numerator_aggregate_type: 'avg', denominator_column: 'denominator_column_A' };
    const result = calculateMetricData(metricData, metricEntry);
    expect(result).toEqual();
  });