import type {RequestEvent} from "@sveltejs/kit";
import {fileServer} from "../../../../lib/services/file-server";

export const GET = async (event: RequestEvent): Promise<Response> => fileServer.img(event.params.path, event);
