import {logger} from "./logger";
import fs from 'fs';
import mime from 'mime';
import rimraf from 'rimraf';
import stream from "stream";
import path from "path";


export const uploadFile = async (base64file) => {
    let matches = base64file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    let uploaded = ''

    if (matches.length !== 3) {
        logger.error(`Failed to upload file. Incorrect format of base 64`);
        return uploaded
    }

    let fileBuffer = new Buffer(matches[2], 'base64');
    let type = matches[1];
    let extension = mime.extension(type);
    let fileName = `${new Date().getTime()}.` + extension;
    try {
        await storeBuffer(fileBuffer, fileName)
        uploaded = fileName
    } catch (e) {
        logger.error(`Failed to upload file. Details: ${e}`);
    }
    return uploaded;
}

export const removeFile = async (fileName) => {

    try {
        await rimraf("./uploads/files/" + fileName, function () {
        });
        return {message: "File was deleted"}
    } catch (e) {
        logger.error(`Failed to remove file. Details: ${e}`);
    }
}


function storeBuffer(buffer, filename) {
    var readStream = new stream.PassThrough();

    // Write buffer
    readStream.end(buffer);

    const writeStream = fs.createWriteStream(path.join('uploads/files/' + filename));

    readStream.pipe(writeStream);
}
