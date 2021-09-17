import { RecordingMeeting } from './common';
import request from './util/request';

export type GetAccountRecordingsParams = {
  page_size?: number;
  next_page_token?: string;
  from?: string;
  to?: string;
};

export type GetAccountRecordingsResponse = {
  next_page_token: string;
  from: string;
  to: string;
  page_size: number;
  total_records: number;
  meetings: RecordingMeeting[];
};

export type DeleteMeetingRecordingsParams = {
  action?: 'trash' | 'delete';
};
export type DeleteMeetingRecordingsResponse = {
  // No-op response
};

export default function recordings(zoomRequest: ReturnType<typeof request>) {
  return {
    GetAccountRecordings(accountId: string, params?: GetAccountRecordingsParams) {
      return zoomRequest<GetAccountRecordingsResponse>({
        method: 'GET',
        path: `/accounts/${accountId}/recordings`,
        params,
      });
    },
    DeleteMeetingRecordings(meetingId: string, params?: DeleteMeetingRecordingsParams) {
      return zoomRequest<DeleteMeetingRecordingsResponse>({
        method: 'DELETE',
        path: `/meetings/${meetingId}/recordings`,
        params,
      });
    },
  };
}
