import {
    Body, Delete, Get,
    JsonController, Param, Patch, Post, QueryParams,
    Res,
    UseBefore,
} from "routing-controllers";
import { Response} from "express";
import {Inject, Service} from "typedi";
import {ChronologyItemService} from "../service/ChronologyItemService";
import {PageReq, PageResObj} from "../api";

import {checkAccessToken} from "../middlewares/AuthMiddleware";
import {QueryFailedError} from "typeorm";
import {logger} from "../util/logger";
import {ChronologyItemDto} from "../dto";

@Service()
@JsonController("/chronology")
export class ChronologyItemController {
    @Inject()
    chronologyItemService: ChronologyItemService;

    @Post()
   @UseBefore(checkAccessToken)
    public async create(@Body({ options: { limit: "20mb" } }) createDto: ChronologyItemDto, @Res() res: Response) {
        try {
            return await this.chronologyItemService.create(createDto);
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
            return await this.chronologyItemService.findAll(param);
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
            return await this.chronologyItemService.findOne(id);
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
        @Body() updateDto: ChronologyItemDto,
        @Param("id") id: number,
        @Res() res: Response
    ) {
        try {
            return await this.chronologyItemService.update(updateDto, id);
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
            return await this.chronologyItemService.delete(id, null);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
}
