# PagerDuty Webhook Relay

PagerDuty doesn't natively have Discord webhooks, so we made this CloudFlare worker to relay them to Discord.

We use Uptime Kuma to monitor certain services, so there is also functionality to parse the specific incident parameters.
