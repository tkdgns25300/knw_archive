import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import { ChronologyItem} from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(ChronologyItem)
export class ChronologyItemQueryRepo extends BaseQueryRepo {
  constructor() {
    super('chronology_item', 'ChronologyItem');
  }

  getByAuth(id: number) {
    return createQueryBuilder()
        .select("chronology_item")
        .from(ChronologyItem, "chronology_item")
        .where(`chronology_item.author_id = :author_id `, {
          author_id: id,
        })
        .getManyAndCount();
  }

}
