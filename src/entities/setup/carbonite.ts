import "./attachment-service";
import {dataSource} from "./data-source";
import {Carbonite} from "@affinity-lab/carbonite";

export const carbonite = () => dataSource.initialize().then(Carbonite.initialize);
