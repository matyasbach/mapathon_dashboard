'use strict';

import moment from 'moment';
import PubSub from './PubSub';
import { getOSMData } from './Actions';
import { DATETIME_FORMAT } from './Variables';

export function submitReport(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  
  console.log("AAAAAA");
  
  const params = {
    projectId: ev.target.parentElement[0].value,
    startDateTime: moment(ev.target.parentElement[1].value, DATETIME_FORMAT),
    endDateTime: moment(ev.target.parentElement[2].value, DATETIME_FORMAT),
    server: ev.target.parentElement[3].value
  };
  PubSub.publish('ACTIONS', getOSMData(params));
  return false;
}

export function submitDashboard(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  
  console.log("BBBBB");
  
  const params = {
    projectId: ev.target.parentElement[0].value,
    startDateTime: moment(ev.target.parentElement[1].value, DATETIME_FORMAT),
    endDateTime: moment(ev.target.parentElement[2].value, DATETIME_FORMAT),
    server: ev.target.parentElement[3].value
  };
  PubSub.publish('ACTIONS', getOSMData(params));
  return false;
}
