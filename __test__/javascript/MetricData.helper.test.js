import _ from 'lodash'
import {  getBucketColor, getShapeWiseChoroplethData,  getPercentage} from '../../app/javascript/api/MetricData.helper'



describe("Helper Function ", () => {
  const buckets = [
    { start: 0, end: 10, color: "red" },
    { start: 15, end: 20, color: "black" },
  ]
 
  // getShapeWiseChoroplethData
  
  describe("getShapeWiseChoroplethData", () => {
    it("getShapeWiseChoroplethData condition pass", () => {    
      const radarData = [
        { tract_id: 1, radar_metric_id: 1, metric_index: 1, current_value: 10, compare_value: 5, denominator_current_value: 20, denominator_compare_value:30 },
        { tract_id: 1, radar_metric_id: 1, metric_index: 1, current_value: 20, compare_value: 15, denominator_current_value: 10, denominator_compare_value: 20 },
      ];
      const metricEntry = { id: 1, metricIndex: 1 }  
      const result = getShapeWiseChoroplethData(radarData, metricEntry);        
      expect(result).toHaveLength(1)
      expect(result[0].shape_id).toBe('1'); 
      expect(result[0].count).toBe(50); 
    })


    it("getShapeWiseChoroplethData not match in the metricIndex ", () => {    
      const radarData = [
        { tract_id: 1, radar_metric_id: 2, metric_index: 2, current_value: 10, compare_value: 5, denominator_current_value: 20, denominator_compare_value:30 },
        { tract_id: 1, radar_metric_id: 3, metric_index: 3, current_value: 20, compare_value: 15, denominator_current_value: 10, denominator_compare_value: 20 },
      ];
      const metricEntry = { id: 1, metricIndex: 1 }  
      const result = getShapeWiseChoroplethData(radarData, metricEntry);        
      expect(result).toHaveLength(1)
      expect(result[0].shape_id).toBe('1'); 
      expect(result[0].count).toBe(0); 
    })


    // getBucketColor
    describe("getBucketColor call the fn", () => {
      it("getBucketColor metricValue true", () => {
        const metricValue = { change: 10 }
        const result = getBucketColor(metricValue, buckets)
        expect(result).toEqual("red")
      })
      it("render the noMetricValue", () => {
        const nonMetricValue = { change: 25 }
        const result = getBucketColor(nonMetricValue, buckets)
        const defaultColor = buckets[buckets.length - 1].color
        expect(result).toEqual(defaultColor)
      })
    })

    // getPercentage
    describe("getPercentage call the fn", () => {
      it("getPercentage", () => {
        const currentValue = 20;
        const compareValue = 10;
        const result = getPercentage(currentValue, compareValue)
        expect(result).toBe(100)
      })
      it("currentValue and compareValue 0", () => {
        const currentValue = 0
        const compareValue = 0
        const result = getPercentage(currentValue, compareValue)
        expect(result).toBe(0)
      })
      it(" compareValue 0 && currentavalue 100", () => {
        const currentValue = 100
        const compareValue = 0
        const result = getPercentage(currentValue, compareValue)
        expect(result).toBe(100)
      })
      it("result in NaN ", () => {
        const currentValue = "hello"
        const compareValue = 20
        const result = getPercentage(currentValue, compareValue)
        expect(result).toBe(0)
      })
    })
  });
})
