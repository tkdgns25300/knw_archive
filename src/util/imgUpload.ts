import {logger} from "./logger";
import fs from 'fs';
import mime from 'mime';
import rimraf from 'rimraf';
import stream from "stream";
import path from "path";


export const uploadImage = async (base64image) => {
    let matches = base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    let uploaded = ''

    if (matches.length !== 3) {
        logger.error(`Failed to upload img. Incorrect format of base 64`);
        return uploaded
    }

    let imageBuffer = new Buffer(matches[2], 'base64');
    let type = matches[1];
    let extension = mime.extension(type);
    let fileName = `${new Date().getTime()}.` + extension;
    try {
        await storeBuffer(imageBuffer, fileName)
        uploaded = fileName
    } catch (e) {
        logger.error(`Failed to upload img. Details: ${e}`);
    }
    return uploaded;
}

export const removeImage = async (fileName) => {

    try {
        await rimraf("./uploads/" + fileName, function () {
        });
        return {message: "Image was deleted"}
    } catch (e) {
        logger.error(`Failed to remove img. Details: ${e}`);
    }
}


function storeBuffer(buffer, filename) {
    var readStream = new stream.PassThrough();

    // Write buffer
    readStream.end(buffer);

    const writeStream = fs.createWriteStream(path.join('uploads/' + filename));

    readStream.pipe(writeStream);
}
