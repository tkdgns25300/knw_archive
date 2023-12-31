import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { WorkItemQueryRepo } from "../repository/WorkItemQueryRepo";
import { WorkItem} from "../entity";
import { WorkItemDto } from "../dto";
import { PageResList, PageResObj, WorkItemSearchReq} from "../api";
import {removeImage, uploadImage} from "../util/imgUpload";
import {EntityManager, Transaction, TransactionManager} from "typeorm";

@Service()
export class WorkItemService {
  constructor(
    @InjectRepository()
    readonly workItemQueryRepo: WorkItemQueryRepo
  ) {}

  async findAll(param: WorkItemSearchReq): Promise<PageResList<WorkItem>> {
    const result = await this.workItemQueryRepo.search(param);
    return new PageResList<WorkItem>(
        result[1],
        param.limit,
        result[0].map((el: WorkItem) => {
          return el;
        }),
        "WorkItem 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<WorkItem | {}>>  {
    const result = await this.workItemQueryRepo.findOne("id", id);
    return new PageResObj(result, "WorkItem 찾는데 성공했습니다.");
  }

  async create(paramObj: WorkItemDto): Promise<PageResObj<WorkItem | {}>> {

    if (paramObj.img_base64) {
      paramObj.img_src = await uploadImage(paramObj.img_base64)
    }
    paramObj.created_at = new Date()
    // 밮표 시작일이 월까지만 있을 경우 hh:mm:ss 를 11:11:11.111000 로 변경 => 하드코딩 방식(추후 다른방법 도입 요망)
    if (String(paramObj.published_from).length <= 7) {
      const fixedDate = paramObj.published_from.slice(0, 7) + '-01T11:11:11.111Z'
      paramObj.published_from = fixedDate;
    }
    // 발표 종료일 없을 경우 null
    if (paramObj.published_to === undefined) {
      paramObj.published_to = null;
    }
    const createResult = await this.workItemQueryRepo.create(
        paramObj
    );
    const result = await this.workItemQueryRepo.findOne(
        "id",
        createResult.identifiers[0].id
    );
    return new PageResObj(result, "WorkItem 생성에 성공했습니다.");
  }

  async update(
    paramObj: WorkItemDto,
    id: number
  ): Promise<PageResObj<WorkItem | {}>> {
    const candidate: WorkItem = await this.workItemQueryRepo.findOne(
      "id",
      id
    );

    // 밮표 시작일이 월까지만 있을 경우 hh:mm:ss 를 11:11:11.111000 로 변경 => 하드코딩 방식(추후 다른방법 도입 요망)
    if (String(paramObj.published_from).length <= 7) {
      const fixedDate = paramObj.published_from.slice(0, 7) + '-01T11:11:11.111Z'
      paramObj.published_from = fixedDate;
    }

    if (paramObj.img_base64) {
      if (candidate.img_src) await removeImage(candidate.img_src);
      paramObj.img_src =  await uploadImage(paramObj.img_base64)
    } else if(paramObj.img_src !== candidate.img_src) {
      await removeImage(candidate.img_src);
    }
    delete paramObj.img_base64

    paramObj.updated_at = new Date();

    await this.workItemQueryRepo.update( paramObj,
      "id",
      id
    );
    const result = await this.workItemQueryRepo.findOne(

      "id",
      id
    );
    return new PageResObj(result, "WorkItem 정보 수정에 성공했습니다.");
  }


  @Transaction()
  async delete(
      id: number ,
      @TransactionManager() manager: EntityManager
  ) {

    const candidate = await manager.findOne(WorkItem, id);
    if (candidate.img_src) await removeImage(candidate.img_src);
    await manager.delete(WorkItem, id);

    return new PageResObj({}, "WorkItem 삭제에 성공했습니다.");
  }

}

