import {
    Body, Delete, Get,
    JsonController, Param, Patch, Post,
    Res,
    UseBefore,
} from "routing-controllers";
import { Response} from "express";
import {Inject, Service} from "typedi";
import {WorkItemService} from "../service/WorkItemService";
import { PageResObj } from "../api";

import {checkAccessToken} from "../middlewares/AuthMiddleware";
import {QueryFailedError} from "typeorm";
import {logger} from "../util/logger";
import {WorkItemDto} from "../dto";

@Service()
@JsonController("/work")
export class WorkItemController {
    @Inject()
    workItemService: WorkItemService;

    @Post()
   // @UseBefore(checkAccessToken)
    public async create(@Body({ options: { limit: "20mb" } }) createDto: WorkItemDto, @Res() res: Response) {
        try {
            return await this.workItemService.create(createDto);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Get("/author/:id")
    public async getAll(@Param("id") id: number, @Res() res: Response) {

        try {
            return await this.workItemService.findByAuth(id);
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
  //  @UseBefore(checkAccessToken)
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
    //@UseBefore(checkAccessToken)
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
