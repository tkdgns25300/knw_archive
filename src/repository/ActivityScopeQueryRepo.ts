import { EntityRepository } from "typeorm";
import { Service } from "typedi";

import { ActivityScope } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(ActivityScope)
export class ActivityScopeQueryRepo extends BaseQueryRepo {
  constructor() {
    super('activity_scope', 'ActivityScope');
  }

}
