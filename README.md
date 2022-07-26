# PagerDuty Webhook Relay

PagerDuty doesn't natively have Discord webhooks, so we made this CloudFlare worker to relay them to Discord.

We use Uptime Kuma to monitor certain services, so there is also functionality to parse the specific incident parameters.

## Setting up in PagerDuty

Go to `Integrations > Generic Webhooks`, click `New Webhook` enter the URL of your hosted worker, and change your event subscription to have these events.

- `incident.acknowledged`
- `indicent.triggered`
- `incident.resolved`

These are the only events currently supported by this relay.

Once you add the webhook it will give you a secret, you will need to set this to `PAGERDUTY_TOKEN` environment variable for the worker to verify the request is from PagerDuty.

## Setting up Discord side

This is extremely simple, create a webhook, copy the URL and set the `DISCORD_WEBHOOK` environment variable to the parts after `/webhooks` should look something like this `12345678910/WEBHOOK_TOKEN`

## Screenshot Examples

| Default | Uptime Kuma |
|--------|-------------|
| ![Default Example](https://dustin.pics/229bf72eca93ddb6.png) | ![Kuma Example](https://dustin.pics/f9676a0c9a6377cd.png) |
