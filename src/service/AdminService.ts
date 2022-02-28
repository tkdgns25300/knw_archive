import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { AdminQueryRepo } from "../repository/AdminQueryRepo";
import { Admin } from "../entity";
import { AdminDto } from "../dto";
import { AdminSearchReq, PageResList, PageResObj } from "../api";
import { hash } from "../util/hash";
import { EntityManager, Transaction, TransactionManager } from "typeorm";

@Service()
export class AdminService {
  constructor(
    @InjectRepository()
    readonly adminQueryRepo: AdminQueryRepo
  ) {}

  async search(param: AdminSearchReq): Promise<PageResList<Admin>> {
    const result = await this.adminQueryRepo.search(param);
    return new PageResList<Admin>(
      result[1],
      param.limit,
      result[0].map((el: Admin) => {
        return el;
      }),
      "Admin 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(admin_id: string): Promise<PageResObj<Admin | {}>> {
    const result = await this.adminQueryRepo.findOne(
      "admin_id",
      admin_id
    );
    return new PageResObj(result, "admin를 찾는데 성공했습니다.");
  }
  async findByEmail(email: string): Promise<PageResObj<Admin | {}>> {
    const result: Admin = await this.adminQueryRepo.findOne(
      "email",
      email
    );
    return new PageResObj(result, "admin를 찾는데 성공했습니다.");
  }

  async create(paramObj: AdminDto): Promise<PageResObj<Admin | {}>> {


    const isUnique = await this.adminQueryRepo.findOne(
      "admin_id",
      paramObj.admin_id
    );
    if (isUnique) {
      return new PageResObj(
        paramObj,
        "이미 존재하는 운영자 아이디입니다.",
        true
      );
    }
    paramObj.password = hash(paramObj.password);
    paramObj.created_at = new Date()
    const createResult = await this.adminQueryRepo.create(
      paramObj
    );
    const result = await this.adminQueryRepo.findOne(
      "admin_id",
      createResult.identifiers[0].admin_id
    );
    return new PageResObj(result, "admin 생성에 성공했습니다.");
  }

  async update(
    paramObj: AdminDto,
    id: string
  ): Promise<PageResObj<Admin | {}>> {
    const candidate: Admin = await this.adminQueryRepo.findOne(
      "admin_id",
      id
    );

    if (paramObj.password) {
      paramObj.password = hash(paramObj.password);
    }
    await this.adminQueryRepo.update( paramObj,
      "admin_id",
      id
    );
    const result = await this.adminQueryRepo.findOne(

      "admin_id",
      id
    );
    return new PageResObj(result, "admin 정보 수정에 성공했습니다.");
  }

  @Transaction()
  async delete(
    idArr: { id: string }[],
    @TransactionManager() manager: EntityManager
  ) {
    for (const el of idArr) {
      await manager.delete(Admin, el.id);
    }
    return new PageResObj({}, "admin 삭제에 성공했습니다.");
  }
}
