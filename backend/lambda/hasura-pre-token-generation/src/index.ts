import { Handler, BasePreTokenGenerationTriggerEvent } from 'aws-lambda';

export const handler: Handler<BasePreTokenGenerationTriggerEvent<'PreAuthentication_Authentication'>> = (event, context, callback) =>  {
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        "https://hasura.io/jwt/claims": JSON.stringify({
          "x-hasura-user-id": event.request.userAttributes.sub,
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user"],
        })
      }
    }
  }
  callback(null, event);
};
