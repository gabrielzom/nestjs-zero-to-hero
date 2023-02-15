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
  CREATED_AT = 'created_at',
  CREATED_BY = 'created_by',
}

export enum OrderTypeEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum EntityEnum {
  USER = 'user',
  TASK = 'task',
  PROJECT = 'project',
  HISTORY = 'history',
}
