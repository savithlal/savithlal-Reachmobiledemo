const Bucket = "hello-world-s3-bucket-13";
const config = require("./config.json");
const aws = require("aws-sdk");
const s3 = new aws.S3(config);
const yaml = require("js-yaml");

exports.handler = async (event, context) => {
  // const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const key = "test.yml";
  const params = {
    Bucket: Bucket,
    Key: key,
  };
  try {
    let message = await s3.getObject(params).promise();
    let obj = yaml.load(message.Body.toString());
    const response = {
      statusCode: 200,
      body: JSON.stringify("Hello " + obj.name),
    };
    return response;
  }
  catch (err) {
    console.log(err);
    const message = `Error getting object ${key} from bucket ${Bucket}. Make sure they exist and your bucket is in the same region as this function.`;
    console.log(message);
    const response = {
      statusCode: 400,
      body: JSON.stringify(message),
    };
    return response;
  }
};
