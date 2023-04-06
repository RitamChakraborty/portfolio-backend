# Portfolio Backend

Backend for portfolio written with [Deno](https://deno.land) and [Oak](https://oakserver.github.io/oak).

### Features

1. **Email**: [SendGrid](https://sendgrid.com/) api is used to send emails. 
2. **Cors**: [Oak Cors](https://deno.land/x/cors@v1.2.2) dependency is used for cors. Anything other than the portfolio frontend is blocked by cors.
3. **Rate Limiting**: [Oak Rate Limit](https://deno.land/x/oak_rate_limit@v0.1.1) dependency is used to rate limit. 
4. **Logging**: [Deno Log](https://deno.land/std@0.151.0/log/mod.ts) dependency is used for logging. 

### Deployment

The project is deployed through [Deno Deploy](https://deno.com/deploy)
