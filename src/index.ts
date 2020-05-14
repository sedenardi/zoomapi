import users from './users';
import meetings from './meetings';

export type ZoomOptions = {
  apiKey: string;
  apiSecret: string;
  tokenExpiresIn?: string | number;
};
export type PaginatedResponse = {
  page_count: number;
  page_number: number;
  page_size: number;
  total_records: number;
};
export default function(zoomApiOpts: ZoomOptions) {
  return {
    users: users(zoomApiOpts),
    meetings: meetings(zoomApiOpts)
  };
}
