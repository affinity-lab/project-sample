import {PRIVATE_DB_URL, PRIVATE_TYPEORM_LOG, PRIVATE_TYPEORM_SYNC} from "$env/static/private";
import {DataSource} from "typeorm";
import {entities} from "./entities";

export const dataSource = new DataSource(
	{
		type: "mysql",
		url: PRIVATE_DB_URL,
		synchronize: PRIVATE_TYPEORM_SYNC === "yes",
		logging: PRIVATE_TYPEORM_LOG === "yes",
		entities: entities,
		migrations: [],
		subscribers: [],
		extra: {
			connectionLimit: 50,
		}
	}
);

