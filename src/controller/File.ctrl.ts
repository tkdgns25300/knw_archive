import {
    Get,
    JsonController,
    Param,
    Res,
} from "routing-controllers";
import {Response} from "express";
import {Service} from "typedi";
import {promisify} from "util";
import path from "path";

import { PageResObj} from "../api";


@Service()
@JsonController("/read")
export class ImageController {

    @Get("/image/:file")
    public async getImage(
        @Param("file") file: string,
        @Res() res: Response
    ) {
        try {
            let filePath = path.join(__dirname, '../../uploads/images', file);
            await promisify<string, void>(res.sendFile.bind(res))(filePath)
            return res
        } catch (err) {
            return new PageResObj({}, err.message, true);
        }
    }

    @Get("/file/:file")
    public async getFile(
        @Param("file") file: string,
        @Res() res: Response
    ) {
        try {
            let filePath = path.join(__dirname, '../../uploads/files', file);
            await promisify<string, void>(res.sendFile.bind(res))(filePath)
            return res
        } catch (err) {
            return new PageResObj({}, err.message, true);
        }
    }
}
