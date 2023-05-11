import meetings from './meetings';
import metrics from './metrics';
import recordings from './recordings';
import reports from './reports';
import users from './users';
import webinars from './webinars';
import webhooks from './webhooks';
import oauth from './oauth';

import { ZoomOptions } from './common';
import request from './util/request';

export default function (zoomApiOpts: ZoomOptions) {
  const zoomRequest = request(zoomApiOpts);

  return {
    meetings: meetings(zoomRequest),
    metrics: metrics(zoomRequest),
    recordings: recordings(zoomRequest),
    reports: reports(zoomRequest),
    users: users(zoomRequest),
    webinars: webinars(zoomRequest),
    webhooks: webhooks(zoomApiOpts),
    oauth: oauth(zoomApiOpts),
  };
}

export * from './common';
export * from './meetings';
export * from './metrics';
export * from './recordings';
export * from './reports';
export * from './users';
export * from './webhooks';
export * from './webinars';
export * from './oauth';
