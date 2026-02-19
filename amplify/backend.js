import { defineBackend } from '@aws-amplify/backend';
import { contactFunction } from './functions/contact/resource';
import { Stack } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

const backend = defineBackend({
  contactFunction,
});

const contactStack = Stack.of(backend.contactFunction.resources.lambda);

const contactTopic = new sns.Topic(contactStack, 'ContactTopic', {
  displayName: 'Contact Form Submissions',
});

backend.contactFunction.addEnvironment('TOPIC_ARN', contactTopic.topicArn);

contactTopic.grantPublish(backend.contactFunction.resources.lambda);

const api = new apigateway.RestApi(contactStack, 'ContactApi', {
  restApiName: 'Contact API',
  defaultCorsPreflightOptions: {
    allowOrigins: apigateway.Cors.ALL_ORIGINS,
    allowMethods: apigateway.Cors.ALL_METHODS,
    allowHeaders: ['*'],
  },
});

const contactResource = api.root.addResource('contact');
contactResource.addMethod(
  'POST',
  new apigateway.LambdaIntegration(backend.contactFunction.resources.lambda)
);

backend.addOutput({
  custom: {
    topicArn: contactTopic.topicArn,
    apiUrl: api.url,
  },
});
