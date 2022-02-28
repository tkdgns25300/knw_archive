import {
    Body,
    Get,
    JsonController,
    Post,
    Res,
    UseBefore,
} from "routing-controllers";
import {Request, Response} from "express";
import {Inject, Service} from "typedi";
import {AuthService} from "../service/AuthService";
import {LoginDto} from "../dto";
import {PageResObj} from "../api";
import {CustomValidation} from "../class/CustomValidation";

import {checkAccessToken} from "../middlewares/AuthMiddleware";
import {QueryFailedError} from "typeorm";
import {logger} from "../util/logger";

@Service()
@JsonController("/auth")
export class AuthController {
    @Inject()
    authService: AuthService;

    @Get("/info")
    @UseBefore(checkAccessToken)
    public async getAdminInfo(@Res() res: Response, @Res() req: Request) {
        try {
            const {aud} = res.locals.jwtPayload;
            return await this.authService.findOne(aud);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
    @Get("/extend")
    @UseBefore(checkAccessToken)
    public async refreshToken(@Res() res: Response, @Res() req: Request) {
        try {
            const {aud, is_super} = res.locals.jwtPayload;
            return await this.authService.refreshToken(aud, is_super);
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }

    @Post("/login")
    public async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const validationResult = await new CustomValidation(
            loginDto
        ).checkValidation();
        if (validationResult) return validationResult;

        try {
            return await this.authService.login(loginDto.getHashAdminInfo());
        } catch (err) {
            if (err instanceof QueryFailedError) {
                logger.error(`Instance of QueryFailedError! Detail: ${err}`);
                return new PageResObj({}, err.message, true);
            }
            return new PageResObj({}, err.message, true);
        }
    }
}
