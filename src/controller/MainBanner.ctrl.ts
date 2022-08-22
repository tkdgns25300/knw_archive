import {
    Body, Delete, Get,
    JsonController, Param, Patch, Post, QueryParams,
    Res,
    UseBefore,
} from "routing-controllers";
import { Response} from "express";
import {Inject, Service} from "typedi";
import {MainBannerService} from "../service/MainBannerService";
import {PageReq, PageResObj} from "../api";

import {checkAccessToken} from "../middlewares/AuthMiddleware";
import {QueryFailedError} from "typeorm";
import {logger} from "../util/logger";
import {MainBannerDto} from "../dto";
import { uploadImage } from "../util/imgUpload";

@Service()
@JsonController("/banner")
export class MainBannerController {
    @Inject()
    mainBannerService: MainBannerService;

    @Post()
   @UseBefore(checkAccessToken)
    public async create(@Body({ options: { limit: "20mb" } }) createDto: MainBannerDto, @Res() res: Response) {
        try {
            if (createDto.img_base64) {
                await uploadImage(createDto.img_base64)
            }
            return await this.mainBannerService.create(createDto);
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
            return await this.mainBannerService.findAll(param);
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
            return await this.mainBannerService.findOne(id);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
    @Patch("/order")
     @UseBefore(checkAccessToken)
    public async updateOrder(
        @Body() updateDto: MainBannerDto[],
        @Res() res: Response
    ) {
        try {
            return await this.mainBannerService.updateOrder(updateDto, null);
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
        @Body() updateDto: MainBannerDto,
        @Param("id") id: number,
        @Res() res: Response
    ) {
        try {
            return await this.mainBannerService.update(updateDto, id);
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
            return await this.mainBannerService.delete(id, null);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
}
