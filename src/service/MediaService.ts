import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { MediaQueryRepo } from "../repository/MediaQueryRepo";
import { Media } from "../entity";
import { MediaDto } from "../dto";
import {PageReq, PageResList, PageResObj} from "../api";

@Service()
export class MediaService {
  constructor(
    @InjectRepository()
    readonly mediaQueryRepo: MediaQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<Media>> {
    const result = await this.mediaQueryRepo.findAll(param);
    return new PageResList<Media>(
        result[1],
        param.limit,
        result[0].map((el: Media) => {
          return el;
        }),
        "Media 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<Media | {}>>  {
    const result = await this.mediaQueryRepo.findOne("id", id);
    return new PageResObj(result, "Media 찾는데 성공했습니다.");
  }

  async create(paramObj: MediaDto): Promise<PageResObj<Media | {}>> {

    paramObj.created_at = new Date()

    const createResult = await this.mediaQueryRepo.create(
      paramObj
    );
    const result = await this.mediaQueryRepo.findOne(
      "id",
      createResult.identifiers[0].id
    );
    return new PageResObj(result, "Media 생성에 성공했습니다.");
  }

  async update(
    paramObj: MediaDto,
    id: number
  ): Promise<PageResObj<Media | {}>> {
    const candidate: Media = await this.mediaQueryRepo.findOne(
      "id",
      id
    );

    await this.mediaQueryRepo.update( paramObj,
      "id",
      id
    );
    const result = await this.mediaQueryRepo.findOne(

      "id",
      id
    );
    return new PageResObj(result, "Media 정보 수정에 성공했습니다.");
  }

  async delete( id: number) {
      await this.mediaQueryRepo.delete("id", id);

    return new PageResObj({}, "Media 삭제에 성공했습니다.");
  }

}

