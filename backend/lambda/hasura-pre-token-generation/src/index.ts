import { Handler, BasePreTokenGenerationTriggerEvent } from 'aws-lambda';

export const handler: Handler<BasePreTokenGenerationTriggerEvent<'PreAuthentication_Authentication'>> = (event, context, callback) =>  {
  const roles = [...(event.request.groupConfiguration?.groupsToOverride || []), 'user'];
  const defaultRole = roles.find((role) => ['admin'].includes(role)) || 'user';
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        "https://hasura.io/jwt/claims": JSON.stringify({
          "x-hasura-user-id": event.request.userAttributes.sub,
          "x-hasura-default-role": defaultRole,
          "x-hasura-allowed-roles": roles,
        })
      }
    }
  }
  callback(null, event);
};
