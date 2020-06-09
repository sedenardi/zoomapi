import users from './users';
import meetings from './meetings';
import webinars from './webinars';
import { ZoomOptions } from './common';

export default function(zoomApiOpts: ZoomOptions) {
  return {
    users: users(zoomApiOpts),
    meetings: meetings(zoomApiOpts),
    webinars: webinars(zoomApiOpts)
  };
}

export * from './webhooks';
export * from './common';
export * from './users';
export * from './meetings';
