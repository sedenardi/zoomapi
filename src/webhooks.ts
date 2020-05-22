import { MeetingType } from './meetings';

export type WebhookResponse<E, T> = {
  event: E;
  payload: {
    account_id: string;
    object: T;
  };
};

export type WebhookParticipant = {
  user_name: string;
  user_id?: string;
  id?: string;
  join_time?: string;
};

export type WebhookMeeting = {
  duration: number;
  start_time: string;
  timezone: string;
  topic: string;
  id: number;
  type: MeetingType;
  uuid: string;
  host_id: string;
};

export type WebhookMeetingWithParticipant = WebhookMeeting & {
  participant: WebhookParticipant
};

export type WebhookMeetingStarted = WebhookResponse<
  'meeting.started',
  WebhookMeeting
>;

export type WebhookJoinBeforeHost = WebhookResponse<
  'meeting.participant_jbh_joined',
  WebhookMeetingWithParticipant
>;

export type WebhookParticipantJoined = WebhookResponse<
  'meeting.participant_joined',
  WebhookMeetingWithParticipant
>;

export type WebhookParticipantLeft = WebhookResponse<
  'meeting.participant_left',
  WebhookMeetingWithParticipant
>;

export type WebhookMeetingEnded = WebhookResponse<
  'meeting.ended',
  WebhookMeeting
>;

export type WebhookEvent =
  WebhookMeetingStarted |
  WebhookJoinBeforeHost |
  WebhookParticipantJoined |
  WebhookParticipantLeft |
  WebhookMeetingEnded;
