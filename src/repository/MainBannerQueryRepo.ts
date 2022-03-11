import { EntityRepository } from "typeorm";
import { Service } from "typedi";

import { MainBanner } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(MainBanner)
export class MainBannerQueryRepo extends BaseQueryRepo {
  constructor() {
    super('main_banner', 'MainBanner');
  }

}
