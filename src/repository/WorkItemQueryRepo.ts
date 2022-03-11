import { EntityRepository } from "typeorm";
import { Service } from "typedi";

import { WorkItem } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(WorkItem)
export class WorkItemQueryRepo extends BaseQueryRepo {
  constructor() {
    super('work_item', 'WorkItem');
  }

}
