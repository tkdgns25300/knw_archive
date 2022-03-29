import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import { Relevance } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";
import {PageReq} from "../api";

@Service()
@EntityRepository(Relevance)
export class RelevanceQueryRepo extends BaseQueryRepo {
  constructor() {
    super('relevance', 'Relevance');
  }

  findAll(param: PageReq) {
    return createQueryBuilder("relevance")
        .orderBy('Relevance.name', 'ASC')
        .skip(param.getOffset())
        .take(param.getLimit())
        .getManyAndCount();
  }
}
