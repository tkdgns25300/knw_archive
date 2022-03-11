import { EntityRepository } from "typeorm";
import { Service } from "typedi";

import { ChronologyItem } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(ChronologyItem)
export class ChronologyItemQueryRepo extends BaseQueryRepo {
  constructor() {
    super('chronology_item', 'ChronologyItem');
  }

}
