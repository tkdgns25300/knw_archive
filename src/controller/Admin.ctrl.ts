import {
    Body,
    Get,
    JsonController,
    Param,
    Post,
    QueryParams,
    Patch,
    Res,
    UseBefore,
} from "routing-controllers";
import {Response} from "express";
import {Inject, Service} from "typedi";
import {QueryFailedError} from "typeorm";

import {AdminService} from "../service/AdminService";
import {AdminDto} from "../dto";
import { AdminSearchReq, PageResObj} from "../api";
import {CustomValidation, IdValidation} from "../class/CustomValidation";
import {
    checkAccessToken,
} from "../middlewares/AuthMiddleware";
import {logger} from "../util/logger";

@Service()
@JsonController("/admin")
export class AdminController {
    @Inject()
    adminService: AdminService;

    @Get("/search")
    @UseBefore(checkAccessToken)
    public async getSearch(
        @QueryParams() param: AdminSearchReq,
        @Res() res: Response
    ) {
        const validationResult = await new CustomValidation(
            param
        ).checkValidation();
        if (validationResult) return validationResult;

        try {
            return await this.adminService.search(param);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Get("/findone/:id")
    @UseBefore(checkAccessToken)
    public async getOne(@Param("id") id: string, @Res() res: Response) {
        const validationResult = new IdValidation(id, "string");
        if (!validationResult.result) {
            return validationResult.getRes();
        }
        try {
            return await this.adminService.findOne(id);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Post("/create")
    @UseBefore(checkAccessToken)
    // @UseBefore(checkSuperAccessToken)
    public async create(
        @Body({options: {limit: "20mb"}}) createDto: AdminDto,
        @Res() res: Response
    ) {
        const validationResult = await new CustomValidation(
            createDto
        ).checkValidation();
        if (validationResult) return validationResult;

        try {
            const jwtPayload = res.locals.jwtPayload;
            if (!jwtPayload.super) {
                throw new Error("슈퍼관리자가 아닙니다.");
            }
            return await this.adminService.create(createDto);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            console.log(err);
            return new PageResObj({}, err.message, true);
        }
    }

    @Patch("/update/:id")
    @UseBefore(checkAccessToken)
    public async update(
        @Body({options: {limit: "20mb"}}) updateDto: AdminDto,
        @Param("id") id: string,
        @Res() res: Response
    ) {
        const validationResult = await new CustomValidation(
            updateDto
        ).checkValidation();
        if (validationResult) return validationResult;

        const idValidationResult = new IdValidation(id, "string");
        if (!idValidationResult.result) {
            return idValidationResult.getRes();
        }
        try {
            return await this.adminService.update(updateDto, id);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Post("/delete")
    @UseBefore(checkAccessToken)
    public async delete(@Body() idArr: { id: string }[], @Res() res: Response) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            if (!jwtPayload.super) {
                throw new Error("슈퍼관리자가 아닙니다.");
            }
            return await this.adminService.delete(idArr, null);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
}
