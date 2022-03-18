import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { ChronologyItemQueryRepo } from "../repository/ChronologyItemQueryRepo";
import {ChronologyItem} from "../entity";
import { ChronologyItemDto } from "../dto";
import {List, PageResObj} from "../api";
import {removeImage, uploadImage} from "../util/imgUpload";
import {EntityManager, Transaction, TransactionManager} from "typeorm";

@Service()
export class ChronologyItemService {
  constructor(
    @InjectRepository()
    readonly chronologyItemQueryRepo: ChronologyItemQueryRepo
  ) {}

  async findByAuth(id: number): Promise<List<ChronologyItem>> {
    const result = await this.chronologyItemQueryRepo.getByAuth(id);
    return new List<ChronologyItem>(
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

    if (paramObj.img_base64) {
      paramObj.img_src = await uploadImage(paramObj.img_base64)
    }
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
    const candidate: ChronologyItem = await this.chronologyItemQueryRepo.findOne(
      "id",
      id
    );

    if (paramObj.img_base64) {
      if (candidate.img_src) await removeImage(candidate.img_src);
      paramObj.img_src =  await uploadImage(paramObj.img_base64)
    } else if(paramObj.img_src !== candidate.img_src) {
      await removeImage(candidate.img_src);
    }
    delete paramObj.img_base64

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

    const candidate = await manager.findOne(ChronologyItem, id);
    if (candidate.img_src) await removeImage(candidate.img_src);
    await manager.delete(ChronologyItem, id);

    return new PageResObj({}, "ChronologyItem 삭제에 성공했습니다.");
  }

}

