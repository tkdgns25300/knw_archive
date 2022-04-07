import {
    Body, Delete, Get,
    JsonController, Param, Patch, Post, QueryParams,
    Res,
    UseBefore,
} from "routing-controllers";
import { Response} from "express";
import {Inject, Service} from "typedi";
import {MediaService} from "../service/MediaService";
import {PageReq, PageResObj} from "../api";

import {checkAccessToken} from "../middlewares/AuthMiddleware";
import {QueryFailedError} from "typeorm";
import {logger} from "../util/logger";
import {MediaDto} from "../dto";

@Service()
@JsonController("/media")
export class MediaController {
    @Inject()
    mediaService: MediaService;

    @Post()
   @UseBefore(checkAccessToken)
    public async create(@Body({ options: { limit: "20mb" } }) createDto: MediaDto, @Res() res: Response) {
        try {
            return await this.mediaService.create(createDto);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Get()
    public async getAll(@QueryParams() param: PageReq, @Res() res: Response) {

        try {
            return await this.mediaService.findAll(param);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Get("/:id")
    public async getOne(
        @Param("id") id: number, @Res() res: Response) {

        try {
            return await this.mediaService.findOne(id);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Patch("/:id")
   @UseBefore(checkAccessToken)
    public async update(
        @Body() updateDto: MediaDto,
        @Param("id") id: number,
        @Res() res: Response
    ) {
        try {
            return await this.mediaService.update(updateDto, id);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Delete("/:id")
    @UseBefore(checkAccessToken)
    public async delete( @Param("id") id: number,) {

        try {
            return await this.mediaService.delete(id);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
}
