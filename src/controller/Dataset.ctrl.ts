import {
    Body, Delete, Get,
    JsonController, Param, Patch, Post, QueryParams,
    Res,
    UseBefore,
} from "routing-controllers";
import { Response} from "express";
import {Inject, Service} from "typedi";
import {DatasetService} from "../service/DatasetService";
import {PageReq, PageResObj} from "../api";

import {checkAccessToken} from "../middlewares/AuthMiddleware";
import {QueryFailedError} from "typeorm";
import {logger} from "../util/logger";
import {DatasetDto} from "../dto";

@Service()
@JsonController("/dataset")
export class DatasetController {
    @Inject()
    datasetService: DatasetService;

    @Post()
   // @UseBefore(checkAccessToken)
    public async create(@Body({ options: { limit: "20mb" } }) createDto: DatasetDto, @Res() res: Response) {
        try {
            return await this.datasetService.create(createDto);
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
            return await this.datasetService.findAll(param);
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
            return await this.datasetService.findOne(id);
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
        @Body() updateDto: DatasetDto,
        @Param("id") id: number,
        @Res() res: Response
    ) {
        try {
            return await this.datasetService.update(updateDto, id);
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
            return await this.datasetService.delete(id, null);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
}
