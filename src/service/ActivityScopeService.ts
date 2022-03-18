import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { ActivityScopeQueryRepo } from "../repository/ActivityScopeQueryRepo";
import { ActivityScope } from "../entity";
import { ActivityScopeDto } from "../dto";
import {PageReq, PageResList, PageResObj} from "../api";

@Service()
export class ActivityScopeService {
  constructor(
    @InjectRepository()
    readonly activityScopeQueryRepo: ActivityScopeQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<ActivityScope>> {
    const result = await this.activityScopeQueryRepo.findAll(param);
    return new PageResList<ActivityScope>(
        result[1],
        param.limit,
        result[0].map((el: ActivityScope) => {
          return el;
        }),
        "ActivityScope 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<ActivityScope | {}>>  {
    const result = await this.activityScopeQueryRepo.findOne("id", id);
    return new PageResObj(result, "ActivityScope 찾는데 성공했습니다.");
  }

  async create(paramObj: ActivityScopeDto): Promise<PageResObj<ActivityScope | {}>> {

    paramObj.created_at = new Date()

    const createResult = await this.activityScopeQueryRepo.create(
      paramObj
    );
    const result = await this.activityScopeQueryRepo.findOne(
      "id",
      createResult.identifiers[0].id
    );
    return new PageResObj(result, "ActivityScope 생성에 성공했습니다.");
  }

  async update(
    paramObj: ActivityScopeDto,
    id: number
  ): Promise<PageResObj<ActivityScope | {}>> {

    await this.activityScopeQueryRepo.update( paramObj,
      "id",
      id
    );
    const result = await this.activityScopeQueryRepo.findOne(

      "id",
      id
    );
    return new PageResObj(result, "ActivityScope 정보 수정에 성공했습니다.");
  }

  async delete( id: number) {
      await this.activityScopeQueryRepo.delete("id", id);

    return new PageResObj({}, "ActivityScope 삭제에 성공했습니다.");
  }

}

