import {PRIVATE_ATTACHMENT_MAX_AGE, PRIVATE_IMG_MAX_AGE, PRIVATE_IMG_PATH} from "$env/static/private";
import FileServer from "@affinity-lab/sk-carbonite-attachment-server/src/file-server";

export const fileServer = new FileServer(
	PRIVATE_IMG_PATH,
	parseInt(PRIVATE_ATTACHMENT_MAX_AGE),
	parseInt(PRIVATE_IMG_MAX_AGE)
);
