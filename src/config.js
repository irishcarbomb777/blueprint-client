const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "blueprint-mockupgenerator-logo-upload",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://er3n6mlsxd.execute-api.us-east-1.amazonaws.com/prod",
  }, 
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_XNOWDtwOR",
    APP_CLIENT_ID: "4ogalcsrqvq8m55jgllibui8gt",
    IDENTITY_POOL_ID: "us-east-1:22e886ad-2c19-436e-9fcd-9495ed484f3c",
  }
};

export default config;