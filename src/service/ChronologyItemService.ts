import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { ChronologyItemQueryRepo } from "../repository/ChronologyItemQueryRepo";
import {ChronologyItem} from "../entity";
import { ChronologyItemDto } from "../dto";
import {List, PageReq, PageResList, PageResObj} from "../api";
import {EntityManager, Transaction, TransactionManager} from "typeorm";
import {removeFile} from "../util/fileUpload";

@Service()
export class ChronologyItemService {
  constructor(
    @InjectRepository()
    readonly chronologyItemQueryRepo: ChronologyItemQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<ChronologyItem>> {
    const result = await this.chronologyItemQueryRepo.search(param);
    return new PageResList<ChronologyItem>(
        result[1],
        param.limit,
        result[0].map((el: ChronologyItem) => {
          return el;
        }),
        "ChronologyItem 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<ChronologyItem | {}>>  {
    const result = await this.chronologyItemQueryRepo.findOne("id", id);
    return new PageResObj(result, "ChronologyItem 찾는데 성공했습니다.");
  }

  async create(paramObj: ChronologyItemDto): Promise<PageResObj<ChronologyItem | {}>> {

    paramObj.created_at = new Date()

    const createResult = await this.chronologyItemQueryRepo.create(
        paramObj
    );
    const result = await this.chronologyItemQueryRepo.findOne(
        "id",
        createResult.identifiers[0].id
    );
    return new PageResObj(result, "ChronologyItem 생성에 성공했습니다.");
  }

  async update(
    paramObj: ChronologyItemDto,
    id: number
  ): Promise<PageResObj<ChronologyItem | {}>> {

    paramObj.updated_at = new Date();

    await this.chronologyItemQueryRepo.update( paramObj,
      "id",
      id
    );
    const result = await this.chronologyItemQueryRepo.findOne(

      "id",
      id
    );
    return new PageResObj(result, "ChronologyItem 정보 수정에 성공했습니다.");
  }


  @Transaction()
  async delete(
      id: number ,
      @TransactionManager() manager: EntityManager
  ) {

    //get each element and remove icons from details
    let result = await this.chronologyItemQueryRepo.findOne('id', id, [{
      property: 'ChronologyItem.proof_items',
      alias: 'proof_item'
    }]);
    for (const d of result.proof_items) {
      if (d.file_src) await removeFile(d.file_src);
    }

    await manager.delete(ChronologyItem, id);

    return new PageResObj({}, "ChronologyItem 삭제에 성공했습니다.");
  }

}

