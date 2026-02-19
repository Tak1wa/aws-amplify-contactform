import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const sns = new SNSClient();

export const handler = async (event: any) => {
  const { email, message } = JSON.parse(event.body);

  await sns.send(
    new PublishCommand({
      TopicArn: process.env.TOPIC_ARN,
      Subject: `Contact Form: ${email}`,
      Message: `Email: ${email}\n\nMessage:\n${message}`,
    })
  );

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({ success: true }),
  };
};
