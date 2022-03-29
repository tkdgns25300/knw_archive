import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import { Author } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";
import {PageReq} from "../api";

@Service()
@EntityRepository(Author)
export class AuthorQueryRepo extends BaseQueryRepo {
  constructor() {
    super('author', 'Author');
  }

  findAll(param: PageReq) {
    return createQueryBuilder("author")
        .orderBy('Author.name', 'ASC')
        .skip(param.getOffset())
        .take(param.getLimit())
        .getManyAndCount();
  }

}
