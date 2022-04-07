import {
    Body, Delete, Get,
    JsonController, Param, Patch, Post, QueryParams,
    Res,
    UseBefore,
} from "routing-controllers";
import { Response} from "express";
import {Inject, Service} from "typedi";
import {ActivityScopeService} from "../service/ActivityScopeService";
import {ActivitySearchReq, PageResObj} from "../api";

import {checkAccessToken} from "../middlewares/AuthMiddleware";
import {QueryFailedError} from "typeorm";
import {logger} from "../util/logger";
import {ActivityScopeDto} from "../dto";

@Service()
@JsonController("/activity")
export class ActivityScopeController {
    @Inject()
    activityScopeService: ActivityScopeService;


    @Get("/search")
  //  @UseBefore(checkAccessToken)
    public async getSearch(
        @QueryParams() param: ActivitySearchReq,
        @Res() res: Response
    ) {
        try {
            return await this.activityScopeService.search(param);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Post()
    @UseBefore(checkAccessToken)
    public async create(@Body({ options: { limit: "20mb" } }) createDto: ActivityScopeDto, @Res() res: Response) {
        try {
            return await this.activityScopeService.create(createDto);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Get()
    public async getAll(@QueryParams() param: ActivitySearchReq, @Res() res: Response) {

        try {
            return await this.activityScopeService.findAll(param);
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
            return await this.activityScopeService.findOne(id);
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
        @Body() updateDto: ActivityScopeDto,
        @Param("id") id: number,
        @Res() res: Response
    ) {
        try {
            return await this.activityScopeService.update(updateDto, id);
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
            return await this.activityScopeService.delete(id);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
}
