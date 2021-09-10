import { MetricMeeting, PaginatedResponse } from './common';
import request from './util/request';

export type GetMetricsMeetingsParams = {
  type?: 'past' | 'pastOne' | 'live';
  from: string;
  to: string;
  page_size?: number;
  page_next_token?: string;
  include_fields?: 'tracking_fields';
};

export type GetMetricsMeetingsResponse = PaginatedResponse & {
  from: string;
  to: string;
  next_page_token: string;
  meetings: MetricMeeting[]
};

export default function metrics(zoomRequest: ReturnType<typeof request>) {
  return {
    GetMeetings(params?: GetMetricsMeetingsParams) {
      return zoomRequest<GetMetricsMeetingsResponse>({
        method: 'GET',
        path: '/metrics/meetings',
        params,
      });
    }
  };
}
