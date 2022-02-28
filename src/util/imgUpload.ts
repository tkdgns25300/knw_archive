import {logger} from "./logger";

const AWS = require("aws-sdk");
require("dotenv").config();
import moment from "./moment";
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_REGION;

//const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});

AWS.config.update({
    region: bucketRegion,
  //  credentials
});
let s3 = new AWS.S3({});

export const imageUpload = async (base64, directoryName: string) => {

    // @ts-ignore
    const base64Data = new Buffer.from(
        base64.replace("svg+xml","svg").replace(/^data:image\/\w+;base64,/, ""),
        "base64"
    );
    let fileType = base64.split(";")[0].split("/")[1];
    let contentType = fileType

    if(fileType.includes('svg'))
        fileType = 'svg'
    const params = {
        Bucket: bucketName,
        Key: `${directoryName}/${moment().format(
            "YYYYMMDD"
        )}/${new Date().getTime()}.${fileType}`, // type is not required
        Body: base64Data,
        ACL: "public-read",
        ContentEncoding: "base64", // required
        ContentType: `image/${contentType}`, // required. Notice the back ticks
    };

    let location = "";
    let key = "";
    try {
        const { Location, Key } = await s3.upload(params).promise();
        location = Location;
        key = Key;
    } catch (error) {
        logger.error(`Failed to upload img to S3. Details: ${error}`);
    }


    return location;
};

export const imageDelete = async (imageUrl) => {
    if (!imageUrl) return;
    const key = imageUrl.split("s3.ap-northeast-2.amazonaws.com/")[1];
    return await s3
        .deleteObject({
            Bucket: bucketName,
            Key: key,
        })
        .promise();
};
