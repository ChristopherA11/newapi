import { calculateMetricData } from "../../../app/javascript/api/MetricData.helper";
import _ from "lodash";

describe("calculateMetricData call", () => {
  it("calculateMetricData value expected", () => {
    const metricData = [
      { 'current_value': 10, 'compare_value': 15, 'denominator_current_value': 20, 'denominator_compare_value': 25 },
      { 'current_value': 5, 'compare_value': 10, 'denominator_current_value': 10, 'denominator_compare_value': 15 },
    ];
    const metricEntry = { denominator_column: "1" }
    const result = calculateMetricData(metricData, metricEntry)
    expect(result).toEqual({ currentValue: 0.5, compareValue: 0.63, change: -20 })
  })
  it("calculateMetricData denominator_column is empty", () => {
    const metricData = [
      { 'current_value': 10, 'compare_value': 15, 'denominator_current_value': 20, 'denominator_compare_value': 25 },
      { 'current_value': 5, 'compare_value': 10, 'denominator_current_value': 10, 'denominator_compare_value': 15 },
    ];
    const metricEntry = { denominator_column: "" }
    const result = calculateMetricData(metricData, metricEntry)
    expect(result).toEqual({ currentValue: 15, compareValue: 25, change: -40 })
  })
  it("calculateMetricData currentValue 0", () => {
    const metricData = [
      { 'current_value': 0, 'compare_value': 10, 'denominator_current_value': 20, 'denominator_compare_value': 25 },
      { 'current_value': 0, 'compare_value': 10, 'denominator_current_value': 10, 'denominator_compare_value': 15 },
    ];
    const metricEntry = { denominator_column: "" }
    const result = calculateMetricData(metricData, metricEntry)
    expect(result).toEqual({ currentValue: 0, compareValue: 20, change: -100 })
  })
  it("calculateMetricData compareValue 0", () => {
    const metricData = [
      { 'current_value': 10, 'compare_value': 0, 'denominator_current_value': 20, 'denominator_compare_value': 25 },
      { 'current_value': 20, 'compare_value': 0, 'denominator_current_value': 10, 'denominator_compare_value': 15 },
    ];
    const metricEntry = { denominator_column: "" }
    const result = calculateMetricData(metricData, metricEntry)
    expect(result).toEqual({ currentValue: 30, compareValue: 0, change: 100 })
  })
  it("calculateMetricData denominator_current_value 0", () => {
    const metricData = [
      { 'current_value': 10, 'compare_value': 10, 'denominator_current_value': 0, 'denominator_compare_value': 25 },
      { 'current_value': 20, 'compare_value': 15, 'denominator_current_value': 0, 'denominator_compare_value': 15 },
    ];
    const metricEntry = { denominator_column: "" }
    const result = calculateMetricData(metricData, metricEntry)
    expect(result).toEqual({ currentValue: 30, compareValue: 25, change: 20 })
  })
  it("calculateMetricData denominator_compare_value 0", () => {
    const metricData = [
      { 'current_value': 10, 'compare_value': 10, 'denominator_current_value': 20, 'denominator_compare_value': 0 },
      { 'current_value': 20, 'compare_value': 15, 'denominator_current_value': 30, 'denominator_compare_value': 0 },
    ];
    const metricEntry = { denominator_column: "" }
    const result = calculateMetricData(metricData, metricEntry)
    expect(result).toEqual({ currentValue: 30, compareValue: 25, change: 20 })
  })
})