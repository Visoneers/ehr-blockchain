import { roleModel } from "./role.schema";
import { IRole } from "./role.types";

const create=(data:IRole)=>roleModel.create(data)


export default (
    create
)