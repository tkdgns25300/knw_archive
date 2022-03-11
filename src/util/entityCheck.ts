import { createQueryBuilder} from "typeorm";
import { getConnection } from "typeorm";

import {Admin} from "../entity";
import {hash} from "./hash";

export class checkEntityExist {
  constructor() {}

    async checkAdmin() {
        const is_exist = await createQueryBuilder()
            .select("admin")
            .from(Admin, "admin")
            .getManyAndCount();

        if (is_exist[1] === 0) {
            let hashedPassword = hash('123');
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Admin)
                .values({
                    admin_id: 'flex',
                    password: hashedPassword,
                    created_at: new Date()
                })
                .execute();
        }
    }
}
