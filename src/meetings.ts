import request from './util/request';
import { ZoomOptions, PaginatedResponse } from '.';

/**
 * 1 - Instant meeting.
 * 2 - Scheduled meeting.
 * 3 - Recurring meeting with no fixed time.
 * 8 - Recurring meeting with fixed time.
 */
export type MeetingType = 1 | 2 | 3 | 8;

export type MeetingSettings = {
  host_video?: boolean;
  participant_video?: boolean;
  cn_meeting?: boolean;
  in_meeting?: boolean;
  join_before_host?: boolean;
  mute_upon_entry?: boolean;
  watermark?: boolean;
  use_pmi?: boolean;
  /**
   * 0 - Automatically approve.
   * 1 - Manually approve.
   * 2 - No registration required.
   */
  approval_type?: 0 | 1 | 2;
  /**
   * 1 - Attendees register once and can attend any of the occurrences.
   * 2 - Attendees need to register for each occurrence to attend.
   * 3 - Attendees register once and can choose one or more occurrences to attend.
   */
  registration_type?: 1 | 2 | 3;
  audio?: 'both' | 'telephony' | 'voip';
  auto_recording?: 'local' | 'cloud' | 'none';
  alternative_hosts?: string;
  close_registration?: boolean;
  waiting_room?: boolean;
  global_dial_in_countries?: string[];
  global_dial_in_numbers?: {
    country: string;
    country_name: string;
    city: string;
    number: string;
    type: string;
  }[];
  contact_name?: string;
  contact_email?: string;
  registrants_confirmation_email?: boolean;
  registrants_email_notification?: boolean;
  meeting_authentication?: boolean;
  authentication_option?: string;
  authentication_domains?: string;
  authentication_name?: string;
  additional_data_center_regions?: string[];
};
export type MeetingRecurrence = {
  /**
   * 1 - Daily.
   * 2 - Weekly.
   * 3 - Monthly.
   */
  type: 1 | 2 | 3;
  repeat_interval: number;
  weekly_days: string;
  monthly_day: number;
  monthly_week: number;
  monthly_week_day: number;
  end_times: number;
  end_date_time: string;
};
export type Meeting = {
  uuid?: string;
  id?: string;
  host_id?: string;
  topic?: string;
  type?: MeetingType;
  start_time?: string;
  duration?: number;
  schedule_for?: string;
  timezone?: string;
  created_at?: string;
  join_url?: string;
  agenda?: string;
  start_url?: string;
  password?: string;
  h323_password?: string;
  encrypted_password?: string;
  pmi?: number;
  tracking_fields?: {
    field: string;
    value: string;
  }[];
  occurrences?: {
    occurrence_id: string;
    start_time: string;
    duration: number;
    status: string;
  }[];
  settings?: MeetingSettings;
  recurrence?: MeetingRecurrence;
};
export type ListMeetingsParams = {
  type?: 'scheduled' | 'live' | 'upcoming';
  page_size?: number;
  page_number?: number;
};
export type ListMeetingsResponse = PaginatedResponse & {
  meetings: Meeting[];
};
export type GetMeetingParams = {
  occurrence_id?: string;
};
export type DeleteMeetingParams = {
  occurrence_id?: string;
  schedule_for_reminder?: boolean;
};
export type RegistrantStatus = 'approved' | 'pending' | 'denied';
export type ListRegistrantsParams = {
  occurrence_id?: string;
  status?: RegistrantStatus;
  page_size?: number;
  page_number?: number;
};
export type Question = {
  title: string;
  value?: string;
};
export type MeetingRegistrant = {
  id?: string;
  email: string;
  first_name: string;
  last_name?: string;
  address?: string;
  city?: string;
  country?: string;
  zip?: string;
  state?: string;
  phone?: string;
  industry?: string;
  org?: string;
  job_title?: string;
  purchasing_time_frame?: string;
  role_in_purchase_process?: string;
  no_of_employees?: string;
  comments?: string;
  custom_questions?: Question[];
  status?: RegistrantStatus;
  create_time?: string;
  join_url?: string;
};
export type ListRegistrantsResponse = PaginatedResponse & {
  registrants: MeetingRegistrant[];
};
export type AddRegistrantParams = {
  occurrence_ids?: string;
};
export type AddRegistrantResponse = {
  id: number;
  join_url: string;
  registrant_id: string;
  start_time: string;
  topic: string;
};
export type UpdateRegistrantStatusBody = {
  action: 'approve' | 'cancel' | 'deny';
  registrants: Partial<Pick<MeetingRegistrant, 'id' | 'email'>>[];
};
export type UpdateRegistrantStatusParams = {
  occurrence_id?: string;
};

export default function(zoomApiOpts: ZoomOptions) {
  const zoomRequest = request(zoomApiOpts);

  const ListMeetings = function(userId: string, params?: ListMeetingsParams) {
    return zoomRequest<ListMeetingsResponse>({
      method: 'GET',
      path: `/users/${userId}/meetings`,
      params: params
    });
  };
  const CreateMeeting = function(userId: string, meeting: Meeting) {
    return zoomRequest<Meeting>({
      method: 'POST',
      path: `/users/${userId}/meetings`,
      body: meeting
    });
  };
  const GetMeeting = function(meetingId: string, params?: GetMeetingParams) {
    return zoomRequest<Meeting>({
      method: 'GET',
      path: `/meetings/${meetingId}`,
      params: params
    });
  };
  const UpdateMeeting = function(meetingId: string, meeting: Meeting, params?: GetMeetingParams) {
    return zoomRequest<{}>({
      method: 'PATCH',
      path: `/meetings/${meetingId}`,
      params: params,
      body: meeting
    });
  };
  const DeleteMeeting = function(meetingId: string, params?: DeleteMeetingParams) {
    return zoomRequest<{}>({
      method: 'DELETE',
      path: `/meetings/${meetingId}`,
      params: params
    });
  };
  const ListRegistrants = function(meetingId: string, params?: ListRegistrantsParams) {
    return zoomRequest<ListRegistrantsResponse>({
      method: 'GET',
      path: `/meetings/${meetingId}/registrants`,
      params: params
    });
  };
  const AddRegistrant = function(meetingId: string, registrant: MeetingRegistrant, params?: AddRegistrantParams) {
    return zoomRequest<AddRegistrantResponse>({
      method: 'POST',
      path: `/meetings/${meetingId}/registrants`,
      params: params,
      body: registrant
    });
  };
  const UpdateRegistrantStatus = function(
    meetingId: string,
    body: UpdateRegistrantStatusBody,
    params?: UpdateRegistrantStatusParams
  ) {
    return zoomRequest<{}>({
      method: 'PUT',
      path: `/meetings/${meetingId}/registrants/status`,
      params: params,
      body: body
    });
  };

  return {
    ListMeetings,
    CreateMeeting,
    GetMeeting,
    UpdateMeeting,
    DeleteMeeting,
    ListRegistrants,
    AddRegistrant,
    UpdateRegistrantStatus
  };
}
