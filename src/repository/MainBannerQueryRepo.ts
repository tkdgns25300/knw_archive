import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import { MainBanner } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";
import {PageReq} from "../api";

@Service()
@EntityRepository(MainBanner)
export class MainBannerQueryRepo extends BaseQueryRepo {
  constructor() {
    super('main_banner', 'MainBanner');
  }

  findAll(param: PageReq) {
    return createQueryBuilder("main_banner")
        .orderBy('MainBanner.order', param.getOrder)
        .skip(param.getOffset())
        .take(param.getLimit())
        .getManyAndCount();
  }

}
