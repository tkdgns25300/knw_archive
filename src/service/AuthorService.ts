import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { AuthorQueryRepo } from "../repository/AuthorQueryRepo";
import { Author } from "../entity";
import { AuthorDto } from "../dto";
import {PageReq, PageResList, PageResObj} from "../api";

@Service()
export class AuthorService {
  constructor(
    @InjectRepository()
    readonly authorQueryRepo: AuthorQueryRepo
  ) {}

  async findAll(param: PageReq): Promise<PageResList<Author>> {
    const result = await this.authorQueryRepo.findAll(param);
    return new PageResList<Author>(
        result[1],
        param.limit,
        result[0].map((el: Author) => {
          return el;
        }),
        "Author 목록을 찾는데 성공했습니다"
    );
  }

  async findOne(id: number): Promise<PageResObj<Author | {}>>  {
    const result = await this.authorQueryRepo.findOne("id", id);
    return new PageResObj(result, "Author 찾는데 성공했습니다.");
  }

  async create(paramObj: AuthorDto): Promise<PageResObj<Author | {}>> {

    paramObj.created_at = new Date()

    const createResult = await this.authorQueryRepo.create(
      paramObj
    );
    const result = await this.authorQueryRepo.findOne(
      "id",
      createResult.identifiers[0].id
    );
    return new PageResObj(result, "Author 생성에 성공했습니다.");
  }

  async update(
    paramObj: AuthorDto,
    id: number
  ): Promise<PageResObj<Author | {}>> {
    const candidate: Author = await this.authorQueryRepo.findOne(
      "id",
      id
    );

    await this.authorQueryRepo.update( paramObj,
      "id",
      id
    );
    const result = await this.authorQueryRepo.findOne(

      "id",
      id
    );
    return new PageResObj(result, "Author 정보 수정에 성공했습니다.");
  }

  async delete( id: number) {
      await this.authorQueryRepo.delete("id", id);

    return new PageResObj({}, "Author 삭제에 성공했습니다.");
  }

}

