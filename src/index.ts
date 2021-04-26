import meetings from './meetings'
import recordings from './recordings'
import reports from './reports'
import users from './users'
import webinars from './webinars'

import { ZoomOptions } from './common'
import request from './util/request'

export default function (zoomApiOpts: ZoomOptions) {
  const zoomRequest = request(zoomApiOpts)

  return {
    meetings: meetings(zoomRequest),
    recordings: recordings(zoomRequest),
    reports: reports(zoomRequest),
    users: users(zoomRequest),
    webinars: webinars(zoomRequest),
  }
}

export * from './common'
export * from './meetings'
export * from './recordings'
export * from './reports'
export * from './users'
export * from './webhooks'
export * from './webinars'
