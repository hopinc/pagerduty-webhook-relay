import { Embed } from '../types/Discord';
import { PagerDutyEvent } from '../types/Pagerduty';

const UPTIME_KUMA_REGEX = /\[Uptime Kuma Monitor .* (Down|Up)\] \[(.*)\] (.*)/gms;

interface EventData {
  color: number;
  title: string;
}

const EventDatamap: Record<string, EventData> = {
  'incident.triggered': {
    color: 0xbd205a,
    title: 'New Incident',
  },
  'incident.acknowledged': {
    color: 0xccf72f,
    title: 'Incident Acknowledged',
  },
  'incident.resolved': {
    color: 0x759d61,
    title: 'Incident Resolved',
  },
};

export async function sendPagerDutyAlert(alert: PagerDutyEvent) {
  if (!EventDatamap[alert.event_type]) return;

  const embed: Embed = {
    title: `#${alert.data.number} ${EventDatamap[alert.event_type].title}`,
    color: EventDatamap[alert.event_type].color,
    timestamp: new Date(alert.data.created_at).toISOString(),
    footer: { text: `Incident ID: ${alert.data.id}` },
    url: alert.data.html_url,
    fields: [],
  };

  embed.fields = [
    ...(embed.fields ? embed.fields : []),
    { name: 'Urgency', value: alert.data.urgency.charAt(0).toUpperCase() + alert.data.urgency.slice(1), inline: true },
    { name: 'Service', value: `[${alert.data.service.summary}](${alert.data.service.html_url})`, inline: true },
  ];

  if (['incident.acknowledged', 'incident.resolved'].includes(alert.event_type)) {
    embed.fields = [
      ...(embed.fields ? embed.fields : []),
      { name: `${alert.event_type == 'incident.acknowledged' ? 'Acknowledged' : 'Resolved'} by`, value: `[${alert.agent.summary}](${alert.agent.html_url})` },
    ];
  }

  // Do some parsing for uptime kuma alerts
  const matches = UPTIME_KUMA_REGEX.exec(alert.data.title);
  if (alert.data.title.includes('Uptime Kuma Monitor') && matches) {
    if (!['incident.acknowledged', 'incident.resolved'].includes(alert.event_type))
      embed.fields = [
        ...(embed.fields ? embed.fields : []),
        { name: '_ _', value: '_ _' },
        { name: 'Monitor Name', value: matches[2], inline: true },
        { name: 'Monitor Status', value: matches[1], inline: true },
      ];

    if (matches[1] == 'Down' && matches[3] && alert.event_type != 'incident.resolved') {
      embed.fields = [...(embed.fields ? embed.fields : []), { name: 'Monitor Error', value: matches[3] }];
    }

    embed.footer = { text: `${embed.footer?.text} • Sent by Uptime Kuma` };
  } else {
    embed.description = `**${alert.data.title}**`;
  }

  await fetch(`https://discord.com/api/webhooks/${DISCORD_WEBHOOK}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] }),
  });
}
