import _ from "lodash";
import { tractMapBuckets } from "../../../app/javascript/api/MetricData.helper";

describe("render the ", () => {
   
    it("tractMapBuckets call the fn", () => {
        const censusTrackData=[
            {trackId: "1", metricData:[{1:{currentValue: "50", compareValue: "60", change: "70"}}, 
            {2:{currentValue: "110", compareValue: "120", change: "90"}}]},
        
            {trackId: "2", metricData:[{3:{currentValue: "80", compareValue: "70", change: "60"}}, 
            {4:{currentValue: "80", compareValue: "90", change: "60"}}]}
        ]
        const metricEntries = [
            { id: 'A', metricIndex: 1, numerator_aggregate_type: 'avg', denominator_column: 'denominator_column_A' },
          ];
       const result = tractMapBuckets(censusTrackData, metricEntries)
       expect(result).toEqual( {"A": [{"color": "red", "end": 1, "start": 0}, {"color": "blue", "end": 2, "start": 1}, {"color": "green", "end": 3, "start": 2}, {"color": "black", "end": 4, "start": 3}, {"color": "white", "end": 5, "start": 4}, {"color": "orange", "end": 6, "start": 5}, {"color": "lightGreen", "end": 7, "start": 6}, {"color": "lightBlue", "end": 8, "start": 7}, {"color": "purble", "end": 9, "start": 8}]})
    });
})
