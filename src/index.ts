import users from './users';
import meetings from './meetings';
import { ZoomOptions } from './common';

export default function(zoomApiOpts: ZoomOptions) {
  return {
    users: users(zoomApiOpts),
    meetings: meetings(zoomApiOpts)
  };
}

export * from './webhooks';
export * from './common';
export * from './users';
export * from './meetings';
