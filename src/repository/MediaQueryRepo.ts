import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import { Media } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";
import {PageReq} from "../api";

@Service()
@EntityRepository(Media)
export class MediaQueryRepo extends BaseQueryRepo {
  constructor() {
    super('media', 'Media');
  }

  findAll(param: PageReq) {
    return createQueryBuilder("media")
        .orderBy('Media.name', 'ASC')
        .skip(param.getOffset())
        .take(param.getLimit())
        .getManyAndCount();
  }

}
