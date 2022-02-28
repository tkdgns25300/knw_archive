import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { AdminQueryRepo } from "../repository/AdminQueryRepo";
import { Admin } from "../entity";
import { PageResObj } from "../api";
import { generateAccessToken } from "../middlewares/AuthMiddleware";

@Service()
export class AuthService {
  constructor(
    @InjectRepository()
    readonly authQueryRepo: AdminQueryRepo
  ) {}

  async login(loginDto: {admin_id: string, password: string, remember: boolean}) {
    const result: Admin = await this.authQueryRepo.loginFindOne(
      loginDto.admin_id
    );
    if (!result) return new PageResObj({}, "아이디가 존재하지 않습니다. 다른 계정을 입력해주세요", true);
    if (result.password !== loginDto.password) {
      return new PageResObj({}, "비밀번호가 일치하지 않습니다.", true);
    }
    const token = generateAccessToken(result.admin_id, result.is_super, loginDto.remember);
    return new PageResObj(
      {
        token,
      },
      "로그인에 성공했습니다."
    );
  }

  async refreshToken(admin_id: string, is_super: boolean) {
    const token = generateAccessToken(admin_id, is_super, false);
    return new PageResObj(
        {
          token,
        },
        "로그인 연장에 성공했습니다."
    );
  }

  async findOne(admin_id: string): Promise<PageResObj<Admin | {}>> {
    // @ts-ignore
    const result: Admin = await this.authQueryRepo.findOne(

      "admin_id",
      admin_id
    );
    return new PageResObj(result, "admin를 찾는데 성공했습니다.");
  }
}
