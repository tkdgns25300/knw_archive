import { createQueryBuilder, EntityRepository } from "typeorm";
import { Service } from "typedi";

import { Admin } from "../entity";
import { AdminDto } from "../dto";
import { PageReq, AdminSearchReq } from "../api";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(Admin)
export class AdminQueryRepo extends BaseQueryRepo {
  constructor() {
    super('admin', 'Admin');
  }

  search(param: AdminSearchReq) {
    return createQueryBuilder()
      .select("admin")
      .from(Admin, "admin")
      .where(`admin.${param.getColumn} like :${param.getColumn} `, {
        [param.getColumn]: `%${param.getKeyword}%`,
      })
      .skip(param.getOffset())
      .take(param.getLimit())
      .getManyAndCount();
  }

  // 비밀번호를 포함하기 때문에 로그인에서만 사용
  loginFindOne(admin_id: string) {
    return createQueryBuilder()
      .select("admin")
      .addSelect("admin.password")
      .from(Admin, "admin")
      .where("admin_id = :admin_id", { admin_id })
      .getOne();
  }
}
