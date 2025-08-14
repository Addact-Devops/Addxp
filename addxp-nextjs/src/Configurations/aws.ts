import AWS from 'aws-sdk';

const configureAWS = () => {
  AWS.config.update({
    region: process.env.NEXT_PUBLIC_REGION, // Use NEXT_PUBLIC_ prefix for client-side access
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_ID,
  });
};

const createS3Instance = () => {
    configureAWS();
    return new AWS.S3();
  };
  
  export default createS3Instance