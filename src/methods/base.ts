import { IncomingWebhook } from '../types/Pagerduty';
import { CraftedResponse, ParsedRequest } from '../types/Routes';
import { sendPagerDutyAlert } from '../utils/discord';

export async function Base(request: ParsedRequest<{ Body: IncomingWebhook }>, response: CraftedResponse) {
  await sendPagerDutyAlert(request.body.event);
  return response.status(204).send();
}
