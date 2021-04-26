import { ZoomMeetingRecordingFileType, ZoomMeetingRecordingType } from './common'
import request from './util/request'

export type GetAccountRecordingsParams = {
  page_size?: number
  next_page_token?: string
  from?: string
  to?: string
}

export type GetAccountRecordingsResponse = {
  next_page_token: string
  from: string
  to: string
  page_size: number
  total_records: number
  meetings: {
    uuid: string
    id: string
    host_id: string
    topic: string
    start_time: string
    duration: number
    total_size: number
    recording_count: number
    recording_files: {
      id: string
      recording_start: string
      recording_end: string
      file_type: ZoomMeetingRecordingFileType
      file_size: number
      play_url: string
      download_url: string
      status: string
      recording_type: ZoomMeetingRecordingType
      meeting_id: string
    }[]
  }[]
}

export type DeleteMeetingRecordingsParams = {
  action?: 'trash' | 'delete'
}
export type DeleteMeetingRecordingsResponse = {
  // No-op response
}

export default function recordings(zoomRequest: ReturnType<typeof request>) {
  return {
    GetAccountRecordings(accountId: string, params?: GetAccountRecordingsParams) {
      return zoomRequest<GetAccountRecordingsResponse>({
        method: 'GET',
        path: `/accounts/${accountId}/recordings`,
        params,
      })
    },
    DeleteMeetingRecordings(meetingId: string, params?: DeleteMeetingRecordingsParams) {
      return zoomRequest<DeleteMeetingRecordingsResponse>({
        method: 'DELETE',
        path: `/meetings/${meetingId}/recordings`,
        params,
      })
    },
  }
}
