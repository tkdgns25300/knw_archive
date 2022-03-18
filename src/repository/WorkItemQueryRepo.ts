import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import { WorkItem} from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(WorkItem)
export class WorkItemQueryRepo extends BaseQueryRepo {
  constructor() {
    super('work_item', 'WorkItem');
  }

  getByAuth(id: number) {
    return createQueryBuilder()
        .select("work_item")
        .from(WorkItem, "work_item")
        .where(`work_item.author_id = :author_id `, {
          author_id: id,
        })
        .getManyAndCount();
  }
}
