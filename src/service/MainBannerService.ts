import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { MainBannerQueryRepo } from "../repository/MainBannerQueryRepo";
import { MainBanner} from "../entity";
import { MainBannerDto } from "../dto";
import {PageReq, PageResList, PageResObj} from "../api";
import { EntityManager, Transaction, TransactionManager } from "typeorm";
import {removeImage, uploadImage} from "../util/imgUpload";

@Service()
export class MainBannerService {
  constructor(
    @InjectRepository()
    readonly mainBannerQueryRepo: MainBannerQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<MainBanner>> {
    const result = await this.mainBannerQueryRepo.findAll(param);
    return new PageResList<MainBanner>(
        result[1],
        param.limit,
        result[0].map((el: MainBanner) => {
          return el;
        }),
        "MainBanner 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<MainBanner | {}>>  {
    const result = await this.mainBannerQueryRepo.findOne("id", id);
    return new PageResObj(result, "MainBanner 찾는데 성공했습니다.");
  }


  async create(paramObj: MainBannerDto): Promise<PageResObj<MainBanner | {}>> {

    if (paramObj.img_base64) {
      paramObj.img_src = await uploadImage(paramObj.img_base64)
    }
    paramObj.created_at = new Date()

    const createResult = await this.mainBannerQueryRepo.create(
      paramObj
    );
    const result = await this.mainBannerQueryRepo.findOne(
      "id",
      createResult.identifiers[0].id
    );
    return new PageResObj(result, "MainBanner 생성에 성공했습니다.");
  }

  async update(
    paramObj: MainBannerDto,
    id: number
  ): Promise<PageResObj<MainBanner | {}>> {
    const candidate: MainBanner = await this.mainBannerQueryRepo.findOne(
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

    paramObj.updated_at = new Date();

    await this.mainBannerQueryRepo.update( paramObj,
      "id",
      id
    );
    const result = await this.mainBannerQueryRepo.findOne(

      "id",
      id
    );
    return new PageResObj(result, "MainBanner 정보 수정에 성공했습니다.");
  }

  @Transaction()
  async updateOrder(
      paramObj: MainBannerDto[],
      @TransactionManager() manager: EntityManager
  ) {

    for(const el of paramObj) {
      await manager.update(MainBannerDto,  el.id, el)
    }

    return new PageResObj({}, "MainBanner 순서 변경에 성공했습니다.");
  }

  @Transaction()
  async delete(
       id: number ,
      @TransactionManager() manager: EntityManager
  ) {

      const candidate = await manager.findOne(MainBanner, id);
      if (candidate.img_src) await removeImage(candidate.img_src);
      await manager.delete(MainBanner, id);

    return new PageResObj({}, "MainBanner 삭제에 성공했습니다.");
  }

}

