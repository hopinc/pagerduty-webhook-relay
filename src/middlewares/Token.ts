import { createHmac } from 'crypto';
import { CraftedResponse, ParsedRequest } from '../types/Routes';

export function Token(request: ParsedRequest, response: CraftedResponse) {
  const signatureHeader = request.headers['x-pagerduty-signature'];
  if (!signatureHeader) return response.status(400).send({ code: 'invalid_request' });

  const signatures = signatureHeader.replace(/v1=/g, '').split(',');

  const valid = signatures.some((signature) => {
    const validator = createHmac('sha256', PAGERDUTY_TOKEN).update(JSON.stringify(request.body)).digest('hex');
    return signature == validator;
  });

  if (!valid) return response.status(403).send({ code: 'requires_authentication' });

  return valid;
}
