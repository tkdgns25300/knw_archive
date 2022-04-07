import {
    Body, Delete, Get,
    JsonController, Param, Patch, Post, QueryParams,
    Res,
    UseBefore,
} from "routing-controllers";
import { Response} from "express";
import {Inject, Service} from "typedi";
import {AuthorService} from "../service/AuthorService";
import {PageReq, PageResObj} from "../api";

import {checkAccessToken} from "../middlewares/AuthMiddleware";
import {QueryFailedError} from "typeorm";
import {logger} from "../util/logger";
import {AuthorDto} from "../dto";

@Service()
@JsonController("/author")
export class AuthorController {
    @Inject()
    authorService: AuthorService;

    @Post()
    @UseBefore(checkAccessToken)
    public async create(@Body({ options: { limit: "20mb" } }) createDto: AuthorDto, @Res() res: Response) {
        try {
            return await this.authorService.create(createDto);
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
            return await this.authorService.findAll(param);
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
            return await this.authorService.findOne(id);
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
        @Body() updateDto: AuthorDto,
        @Param("id") id: number,
        @Res() res: Response
    ) {
        try {
            return await this.authorService.update(updateDto, id);
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
            return await this.authorService.delete(id);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
}
