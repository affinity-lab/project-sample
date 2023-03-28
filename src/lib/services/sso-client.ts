import {type NeptunUser, SSOClient} from "@affinity-lab/sk-mik-id-sso-client";
import type {RequestEvent} from "@sveltejs/kit";

export let ssoClient = new SSOClient(
	'https://id.mik.pte.hu/auth-request',
	'https://id.mik.pte.hu/logout',
	"ed3b9161-bc6c-11ed-bd71-5254006971fb",
	"6f60db7b4280821dfc593389ccfe9d08",
	(event: RequestEvent, user: NeptunUser) => event.locals.session.user = user,
	(event: RequestEvent) => event.locals.session.user = undefined
)