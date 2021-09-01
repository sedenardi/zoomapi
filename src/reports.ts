import { PaginatedResponse } from './common';
import request from './util/request';

export type GetMeetingParticipantReportsParams = {
  next_page_token?: string;
  include_fields?: 'registrant_id';
};

export type GetMeetingParticipantReportsResponse = PaginatedResponse & {
  next_page_token: string;
  participants: {
    id: string;
    user_id: string;
    name: string;
    user_email: string;
    join_time: string;
    leave_time: string;
    duration: number;
    registrant_id?: string
  }[]
};

export default function reports(zoomRequest: ReturnType<typeof request>) {
  return {
    GetMeetingParticipantReports(meetingId: string, params?: GetMeetingParticipantReportsParams) {
      return zoomRequest<GetMeetingParticipantReportsResponse>({
        method: 'GET',
        path: `/report/meetings/${meetingId}/participants`,
        params,
      });
    }
  };
}
