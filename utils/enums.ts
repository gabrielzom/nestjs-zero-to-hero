export enum UserRoleEnum {
  MASTER = 'master',
  ADMIN = 'admin',
  MANAGER = 'manager',
  COMMON = 'common',
}

export enum HistoryTypeEnum {
  CREATE = 'Create',
  RETRIEVE = 'Retrieve',
  UPDATE = 'Update',
  DELETE = 'Delete',
  SIGNIN = 'Sign-In',
}

export enum HistoryOrderEnum {
  ID = 'id',
  CREATED_AT = 'createdAt',
  CREATED_BY = 'createdBy',
}
