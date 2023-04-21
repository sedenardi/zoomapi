export type ZoomJWTOptions = {
  apiKey: string;
  apiSecret: string;
  tokenExpiresIn?: string | number;
};
export type ZoomOAuthOptions = {
  accountId: string;
  oauthClientId: string;
  oauthClientSecret: string;
};
export type ZoomOptions = ZoomJWTOptions | ZoomOAuthOptions;
export type ListResponse = {
  total_records: number;
};
export type PaginatedResponse = ListResponse & {
  page_count: number;
  page_number: number;
  page_size: number;
  next_page_token?: string;
};

export type TrackingField = {
  field: string;
  value: string;
};
export type Occurrence = {
  occurrence_id: string;
  start_time: string;
  duration: number;
  status: string;
};

/**
 * 0 - Automatically approve.
 * 1 - Manually approve.
 * 2 - No registration required.
 */
export type ApprovalType = 0 | 1 | 2;

/**
 * 1 - Attendees register once and can attend any of the occurrences.
 * 2 - Attendees need to register for each occurrence to attend.
 * 3 - Attendees register once and can choose one or more occurrences to attend.
 */
export type RegistrationType = 1 | 2 | 3;

export type Audio = 'both' | 'telephony' | 'voip';
export type AudioRecording = 'local' | 'cloud' | 'none';

export type Recurrence = {
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

export type RegistrantStatus = 'approved' | 'pending' | 'denied';
export type ListRegistrantsParams = {
  occurrence_id?: string;
  status?: RegistrantStatus;
  page_size?: number;
  page_number?: number;
  next_page_token?: string;
};
export type Question = {
  title: string;
  value?: string;
};
export type Registrant = {
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
export type MetricMeeting = {
  uuid: string;
  id: string; // int64 long, string in JS
  topic: string;
  host: string;
  email: string;
  user_type: string;
  start_time: string;
  end_time: string;
  duration: string;
  participants: number;
  has_pstn: boolean;
  has_voip: boolean;
  has_3rd_party_audio: boolean;
  has_video: boolean;
  has_screen_share: boolean;
  has_recording: boolean;
  has_sip: boolean;
  has_archiving: boolean;
  in_room_participants: number;
  dept: string;
  custom_keys: { key: string; value: string }[];
  tracking_fields: { field: string; value: string }[]
};
export type RecordingMeeting = {
  uuid: string;
  id: string;
  account_id: string;
  host_id: string;
  topic: string;
  start_time: string;
  duration: number;
  total_size: string;
  recording_count: string;
  recording_files: {
    id: string;
    meeting_id: string;
    recording_start: string;
    recording_end: string;
    file_type: ZoomMeetingRecordingFileType
    file_size: number
    play_url: string
    download_url: string
    status: string
    deleted_time: string
    recording_type: ZoomMeetingRecordingType
  }[]
};
export type ListRegistrantsResponse = PaginatedResponse & {
  registrants: Registrant[];
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
  registrants: Partial<Pick<Registrant, 'id' | 'email'>>[];
};
export type UpdateRegistrantStatusParams = {
  occurrence_id?: string;
};

export type ZoomMeetingRecordingFileType =
  'MP4' | 'M4A' | 'TIMELINE' | 'TRANSCRIPT' | 'CHAT' | 'CC' | 'CSV';

export type ZoomMeetingRecordingType =
| 'shared_screen_with_speaker_view(CC)'
| 'shared_screen_with_speaker_view'
| 'shared_screen_with_gallery_view'
| 'speaker_view'
| 'gallery_view'
| 'shared_screen'
| 'audio_only'
| 'audio_transcript'
| 'chat_file'
| 'active_speaker'
| 'poll'
| 'timeline'
| 'closed_caption';
