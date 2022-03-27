import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { GrowthQueryRepo } from "../repository/GrowthQueryRepo";
import { Growth } from "../entity";
import { GrowthDto } from "../dto";
import {PageReq, PageResList, PageResObj} from "../api";

@Service()
export class GrowthService {
  constructor(
    @InjectRepository()
    readonly growthQueryRepo: GrowthQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<Growth>> {
    const result = await this.growthQueryRepo.findAll(param);
    return new PageResList<Growth>(
        result[1],
        param.limit,
        result[0].map((el: Growth) => {
          return el;
        }),
        "Growth 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<Growth | {}>>  {
    const result = await this.growthQueryRepo.findOne("id", id);
    return new PageResObj(result, "Growth 찾는데 성공했습니다.");
  }

  async create(paramObj: GrowthDto): Promise<PageResObj<Growth | {}>> {

    paramObj.created_at = new Date()

    const createResult = await this.growthQueryRepo.create(
      paramObj
    );
    const result = await this.growthQueryRepo.findOne(
      "id",
      createResult.identifiers[0].id
    );
    return new PageResObj(result, "Growth 생성에 성공했습니다.");
  }

  async update(
    paramObj: GrowthDto,
    id: number
  ): Promise<PageResObj<Growth | {}>> {

    await this.growthQueryRepo.update( paramObj,
      "id",
      id
    );
    const result = await this.growthQueryRepo.findOne(

      "id",
      id
    );
    return new PageResObj(result, "Growth 정보 수정에 성공했습니다.");
  }

  async delete( id: number) {
      await this.growthQueryRepo.delete("id", id);

    return new PageResObj({}, "Growth 삭제에 성공했습니다.");
  }

}

