import {PermissionModel, RoleModel,UserModel} from '@models/auth';

export interface LoginResponse {
  data: Data;
  message: string;
  title: string;
  accessToken: string;
}

interface Data {
  user: UserModel;
  accessToken: string;
}
