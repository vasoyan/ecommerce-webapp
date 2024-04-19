import { Permission } from "../../permission/model/permission";

export interface Role {
  id: number;
  name: string;
  permissions?: Permission[]
}
