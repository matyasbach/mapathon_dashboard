'use strict';

import moment from "moment";

export function getAccumulatedFeatures(startDateTime, endDateTime, features = []) {

  let point = { t: startDateTime, y: 0 };
  
  const chartData = features
    .sort((featureA, featureB) => new Date(featureA.properties.timestamp) - new Date(featureB.properties.timestamp))
    .reduce((chartData, feature) => {
      const { timestamp } = feature.properties;
      if (point && point.t == timestamp) {
        point.y++;
      }
      else {
        point = { t: timestamp, y: point && point.y + 1 || 1 };
        chartData.push(point);
      }
      return chartData;
    }, [point]);

  chartData.push({ t: endDateTime, y: point.y });
  chartData.forEach(item => item.t = moment(item.t).toISOString());

  return chartData;
}
