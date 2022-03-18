import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { RelevanceQueryRepo } from "../repository/RelevanceQueryRepo";
import { Relevance } from "../entity";
import { RelevanceDto } from "../dto";
import {PageReq, PageResList, PageResObj} from "../api";

@Service()
export class RelevanceService {
  constructor(
    @InjectRepository()
    readonly relevanceQueryRepo: RelevanceQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<Relevance>> {
    const result = await this.relevanceQueryRepo.findAll(param);
    return new PageResList<Relevance>(
        result[1],
        param.limit,
        result[0].map((el: Relevance) => {
          return el;
        }),
        "Relevance 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<Relevance | {}>>  {
    const result = await this.relevanceQueryRepo.findOne("id", id);
    return new PageResObj(result, "Relevance 찾는데 성공했습니다.");
  }

  async create(paramObj: RelevanceDto): Promise<PageResObj<Relevance | {}>> {

    paramObj.created_at = new Date()

    const createResult = await this.relevanceQueryRepo.create(
      paramObj
    );
    const result = await this.relevanceQueryRepo.findOne(
      "id",
      createResult.identifiers[0].id
    );
    return new PageResObj(result, "Relevance 생성에 성공했습니다.");
  }

  async update(
    paramObj: RelevanceDto,
    id: number
  ): Promise<PageResObj<Relevance | {}>> {
    const candidate: Relevance = await this.relevanceQueryRepo.findOne(
      "id",
      id
    );

    await this.relevanceQueryRepo.update( paramObj,
      "id",
      id
    );
    const result = await this.relevanceQueryRepo.findOne(

      "id",
      id
    );
    return new PageResObj(result, "Relevance 정보 수정에 성공했습니다.");
  }

  async delete( id: number) {
      await this.relevanceQueryRepo.delete("id", id);

    return new PageResObj({}, "Relevance 삭제에 성공했습니다.");
  }

}

