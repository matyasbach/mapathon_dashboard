'use strict';

import moment from "moment";

export function getAccumulatedFeatures(startDateTime, endDateTime, features = []) {

  let point = { timestamp: startDateTime, count: 0 };

  const chartData = features.reduce((chartData, feature) => {
    const { timestamp } = feature.properties;
    if (point && point.timestamp == timestamp) {
      point.count++;
    }
    else {
      point = { timestamp: timestamp, count: point && point.count + 1 || 1 };
      chartData.push(point);
    }
    return chartData;
  }, [point]);

  chartData.push({ timestamp: endDateTime, count: point.count });
  chartData.forEach(item => item.timestamp = moment(item.timestamp).toISOString());

  return chartData;
}
