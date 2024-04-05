export enum enTypes {
  GET_ALL_USERS = "GET_ALL_USERS",
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
  GET_USER = "GET_USER",
}

interface inGetAllUsersAction {
  type: enTypes.GET_ALL_USERS;
}

interface inCreateUserAction {
  type: enTypes.CREATE_USER;
  payload: string[];
}

interface inUpdateUserAction {
  type: enTypes.UPDATE_USER;
}

interface inDeleteUserAction {
  type: enTypes.DELETE_USER;
}

interface inGetUser {
  type: enTypes.GET_USER;
}

export type tyAction =
  | inGetAllUsersAction
  | inCreateUserAction
  | inDeleteUserAction
  | inUpdateUserAction
  | inGetUser;
