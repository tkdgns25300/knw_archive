import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import { WorkItem} from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";
import {PageReq} from "../api";

@Service()
@EntityRepository(WorkItem)
export class WorkItemQueryRepo extends BaseQueryRepo {
  constructor() {
    super('work_item', 'WorkItem');
  }

    findAll(param: PageReq) {
        return createQueryBuilder("work_item")
            .orderBy('WorkItem.published_from', param.getOrder)
            .skip(param.getOffset())
            .take(param.getLimit())
            .getManyAndCount();
    }
}
