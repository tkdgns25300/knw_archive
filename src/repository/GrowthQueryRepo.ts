import { EntityRepository } from "typeorm";
import { Service } from "typedi";

import { Growth } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(Growth)
export class GrowthQueryRepo extends BaseQueryRepo {
  constructor() {
    super('growth', 'Growth');
  }

}
