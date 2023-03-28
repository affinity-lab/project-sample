import {PUBLIC_FILE_URL_PREFIX, PUBLIC_IMG_URL_PREFIX} from "$env/static/public";
import FileProvider from "@affinity-lab/sk-carbonite-attachment-server/src/file-provider";

export const fileUrlProvider = new FileProvider(PUBLIC_FILE_URL_PREFIX, PUBLIC_IMG_URL_PREFIX);
