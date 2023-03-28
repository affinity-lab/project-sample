import type {RequestEvent} from "@sveltejs/kit";
import {fileServer} from "../../../../lib/services/file-server";

export const GET = async (e: RequestEvent): Promise<Response> => fileServer.file(e.params.path, e);

