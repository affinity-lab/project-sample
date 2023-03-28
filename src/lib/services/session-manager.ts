import SessionManager, { MemoryStorageAdapter } from "@affinity-lab/sk-session";

export let sessionManager = new SessionManager(new MemoryStorageAdapter(3600, 60));
