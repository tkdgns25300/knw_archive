import {logger} from "./logger";

const AWS = require("aws-sdk");
require("dotenv").config();
import moment from "./moment";
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_REGION;


AWS.config.update({
    region: bucketRegion,
});
let s3 = new AWS.S3({});

export const pdfUpload = async (base64, directoryName: string) => {

    // @ts-ignore
    const base64Data = new Buffer.from(
        base64.replace(/^data:application\/\w+;base64,/, ""),
        "base64"
    );
    let fileType = base64.split(";")[0].split("/")[1];

    const params = {
        Bucket: bucketName,
        Key: `${directoryName}/${moment().format(
            "YYYYMMDD"
        )}/${new Date().getTime()}.${fileType}`, // type is not required
        Body: base64Data,
        ACL: "public-read",
        ContentEncoding: "base64", // required
        ContentType: `application/pdf`, // required. Notice the back ticks
    };

    let location = "";
    let key = "";
    try {
        const { Location, Key } = await s3.upload(params).promise();
        location = Location;
        key = Key;
    } catch (error) {
        logger.error(`Failed to upload pdf to S3. Details: ${error}`);
    }


    return location;
};

export const pdfDelete = async (pdfUrl) => {
    if (!pdfUrl) return;
    const key = pdfUrl.split("s3.ap-northeast-2.amazonaws.com/")[1];
    return await s3
        .deleteObject({
            Bucket: bucketName,
            Key: key,
        })
        .promise();
};
