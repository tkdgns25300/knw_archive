import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { ProofItemQueryRepo } from "../repository/ProofItemQueryRepo";
import {ProofItem} from "../entity";
import { ProofItemDto } from "../dto";
import {PageReq, PageResList, PageResObj} from "../api";
import {removeFile, uploadFile} from "../util/fileUpload";
import {EntityManager, Transaction, TransactionManager} from "typeorm";

@Service()
export class ProofItemService {
  constructor(
    @InjectRepository()
    readonly proofItemQueryRepo: ProofItemQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<ProofItem>> {
    const result = await this.proofItemQueryRepo.findAll(param);
    return new PageResList<ProofItem>(
        result[1],
        param.limit,
        result[0].map((el: ProofItem) => {
          return el;
        }),
        "ProofItem 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<ProofItem | {}>>  {
    const result = await this.proofItemQueryRepo.findOne("id", id);
    return new PageResObj(result, "ProofItem 찾는데 성공했습니다.");
  }

  async create(paramObj: ProofItemDto): Promise<PageResObj<ProofItem | {}>> {

    if (paramObj.file_base64) {
      paramObj.file_src = await uploadFile(paramObj.file_base64)
    }
    paramObj.created_at = new Date()
    const createResult = await this.proofItemQueryRepo.create(
        paramObj
    );
    const result = await this.proofItemQueryRepo.findOne(
        "id",
        createResult.identifiers[0].id
    );
    return new PageResObj(result, "ProofItem 생성에 성공했습니다.");
  }

  async update(
    paramObj: ProofItemDto,
    id: number
  ): Promise<PageResObj<ProofItem | {}>> {
    const candidate: ProofItem = await this.proofItemQueryRepo.findOne(
      "id",
      id
    );

    if (paramObj.file_base64) {
      if (candidate.file_src) await removeFile(candidate.file_src);
      paramObj.file_src =  await uploadFile(paramObj.file_base64)
    } else if(paramObj.file_src !== candidate.file_src) {
      await removeFile(candidate.file_src);
    }
    delete paramObj.file_base64

    paramObj.updated_at = new Date();

    await this.proofItemQueryRepo.update( paramObj,
      "id",
      id
    );
    const result = await this.proofItemQueryRepo.findOne(

      "id",
      id
    );
    return new PageResObj(result, "ProofItem 정보 수정에 성공했습니다.");
  }


  @Transaction()
  async delete(
      id: number ,
      @TransactionManager() manager: EntityManager
  ) {

    const candidate = await manager.findOne(ProofItem, id);
    if (candidate.file_src) await removeFile(candidate.file_src);
    await manager.delete(ProofItem, id);

    return new PageResObj({}, "ProofItem 삭제에 성공했습니다.");
  }

}

