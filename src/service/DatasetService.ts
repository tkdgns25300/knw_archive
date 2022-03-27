import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { DatasetQueryRepo } from "../repository/DatasetQueryRepo";
import {Dataset, Growth} from "../entity";
import { DatasetDto } from "../dto";
import { PageReq, PageResList, PageResObj} from "../api";
import {removeFile, uploadFile} from "../util/fileUpload";
import {EntityManager, Transaction, TransactionManager} from "typeorm";

@Service()
export class DatasetService {
  constructor(
    @InjectRepository()
    readonly datasetQueryRepo: DatasetQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<Growth>> {
    const result = await this.datasetQueryRepo.findAll(param);
    return new PageResList<Growth>(
        result[1],
        param.limit,
        result[0].map((el: Growth) => {
          return el;
        }),
        "Dataset 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<Dataset | {}>>  {
    const result = await this.datasetQueryRepo.findOne("id", id);
    return new PageResObj(result, "Dataset 찾는데 성공했습니다.");
  }

  async create(paramObj: DatasetDto): Promise<PageResObj<Dataset | {}>> {

    if (paramObj.file_base64) {
      paramObj.file_src = await uploadFile(paramObj.file_base64)
    }
    paramObj.created_at = new Date()

    const createResult = await this.datasetQueryRepo.create(
        paramObj
    );
    const result = await this.datasetQueryRepo.findOne(
        "id",
        createResult.identifiers[0].id
    );
    return new PageResObj(result, "Dataset 생성에 성공했습니다.");
  }

  async update(
    paramObj: DatasetDto,
    id: number
  ): Promise<PageResObj<Dataset | {}>> {
    const candidate: Dataset = await this.datasetQueryRepo.findOne(
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

    await this.datasetQueryRepo.update( paramObj,
      "id",
      id
    );
    const result = await this.datasetQueryRepo.findOne(

      "id",
      id
    );
    return new PageResObj(result, "Dataset 정보 수정에 성공했습니다.");
  }


  @Transaction()
  async delete(
      id: number ,
      @TransactionManager() manager: EntityManager
  ) {

    const candidate = await manager.findOne(Dataset, id);
    if (candidate.file_src) await removeFile(candidate.file_src);
    await manager.delete(Dataset, id);

    return new PageResObj({}, "Dataset 삭제에 성공했습니다.");
  }

}

