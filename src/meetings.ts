import request from './util/request';
import {
  PaginatedResponse,
  TrackingField,
  Occurrence,
  ApprovalType,
  RegistrationType,
  Audio,
  AudioRecording,
  Recurrence,
  ListRegistrantsParams,
  Registrant,
  ListRegistrantsResponse,
  AddRegistrantParams,
  AddRegistrantResponse,
  UpdateRegistrantStatusBody,
  UpdateRegistrantStatusParams,
  RecordingMeeting,
} from './common';

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
  approval_type?: ApprovalType;
  registration_type?: RegistrationType;
  audio?: Audio;
  auto_recording?: AudioRecording;
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
  tracking_fields?: TrackingField[];
  occurrences?: Occurrence[];
  settings?: MeetingSettings;
  recurrence?: Recurrence;
};
export type ListMeetingsParams = {
  type?: 'scheduled' | 'live' | 'upcoming' | 'upcoming_meetings' | 'previous_meetings';
  page_size?: number;
  page_number?: number;
  next_page_token?: string;
};
export type ListMeetingsResponse = PaginatedResponse & {
  // Note, the properties on the list meeting response is truncated.
  // Please see https://developers.zoom.us/docs/api/meetings/#tag/meetings/get/users/{userId}/meetings
  meetings: Meeting[];
};
export type GetMeetingParams = {
  occurrence_id?: string;
  show_previous_occurrences?: boolean;
};
export type DeleteMeetingParams = {
  occurrence_id?: string;
  schedule_for_reminder?: boolean;
};
export type UpdateMeetingStatusParams = {
  action: 'end';
};
export type GetMeetingInvitationResponse = {
  invitation: string;
};
export type GetMeetingRecordingsResponse = RecordingMeeting;

export default function(zoomRequest: ReturnType<typeof request>) {
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
  const UpdateMeetingStatus = function (meetingId: string, body: UpdateMeetingStatusParams) {
    return zoomRequest<{}>({
      method: 'PUT',
      path: `/meetings/${meetingId}/status`,
      body: body
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
  const AddRegistrant = function(meetingId: string, registrant: Registrant, params?: AddRegistrantParams) {
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
  const GetMeetingInvitation = function(
    meetingId: string
  ) {
    return zoomRequest<GetMeetingInvitationResponse>({
      method: 'GET',
      path: `/meetings/${meetingId}/invitation`,
    });
  };
  const GetMeetingRecordings = function(meetingId: string) {
    return zoomRequest<GetMeetingRecordingsResponse>({
      method: 'GET',
      path: `/meetings/${meetingId}/recordings`,
    });
  };

  return {
    ListMeetings,
    CreateMeeting,
    GetMeeting,
    UpdateMeeting,
    UpdateMeetingStatus,
    DeleteMeeting,
    ListRegistrants,
    AddRegistrant,
    UpdateRegistrantStatus,
    GetMeetingInvitation,
    GetMeetingRecordings
  };
}
