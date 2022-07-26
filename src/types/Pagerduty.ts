export interface IncomingWebhook {
  event: PagerDutyEvent;
}

export interface PagerDutyEvent {
  id: string;
  event_type: string;
  resource_type: string;
  occurred_at: string;
  agent: Agent;
  client: null;
  data: Data;
}

export interface Agent {
  html_url: string;
  id: string;
  self: string;
  summary: string;
  type: string;
}

export interface Data {
  id: string;
  type: string;
  self: string;
  html_url: string;
  number: number;
  status: string;
  incident_key: null;
  created_at: string;
  title: string;
  service: Agent;
  assignees: any[];
  escalation_policy: Agent;
  teams: any[];
  priority: null;
  urgency: string;
  conference_bridge: null;
  resolve_reason: null;
}
