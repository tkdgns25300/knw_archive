import { EntityRepository } from "typeorm";
import { Service } from "typedi";

import { Dataset } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(Dataset)
export class DatasetQueryRepo extends BaseQueryRepo {
  constructor() {
    super('dataset', 'Dataset');
  }

}
