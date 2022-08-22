import {
    Body, Delete, Get,
    JsonController, Param, Patch, Post, QueryParams,
    Res,
    UseBefore,
} from "routing-controllers";
import { Response} from "express";
import {Inject, Service} from "typedi";
import {WorkItemService} from "../service/WorkItemService";
import {PageResObj, WorkItemSearchReq} from "../api";

import {checkAccessToken} from "../middlewares/AuthMiddleware";
import {QueryFailedError} from "typeorm";
import {logger} from "../util/logger";
import {WorkItemDto} from "../dto";
import { uploadImage } from "../util/imgUpload";

@Service()
@JsonController("/work")
export class WorkItemController {
    @Inject()
    workItemService: WorkItemService;

    @Post()
   @UseBefore(checkAccessToken)
    public async create(@Body({ options: { limit: "20mb" } }) createDto: WorkItemDto, @Res() res: Response) {
        try {
            if (createDto.img_base64) {
                await uploadImage(createDto.img_base64)
            }
            return await this.workItemService.create(createDto);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Get()
    public async getAll(@QueryParams() param: WorkItemSearchReq, @Res() res: Response) {

        try {
            return await this.workItemService.findAll(param);
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
            return await this.workItemService.findOne(id);
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
        @Body() updateDto: WorkItemDto,
        @Param("id") id: number,
        @Res() res: Response
    ) {
        try {
            return await this.workItemService.update(updateDto, id);
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
            return await this.workItemService.delete(id, null);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
}
