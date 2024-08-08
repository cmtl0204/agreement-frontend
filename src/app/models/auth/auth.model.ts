import {RoleModel} from '@models/auth';

export interface AuthModel {
  id: string;
  roles: RoleModel[];
  avatar: string;
  email: string;
  emailVerifiedAt: Date;
  lastname: string;
  name: string;
  username: string;
}
