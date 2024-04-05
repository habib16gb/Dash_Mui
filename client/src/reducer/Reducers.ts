import { enTypes, tyAction } from "./actions/actions";

interface inState {
  loading: boolean;
  error: string | null;
  users: string[];
}

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const reducer = (
  state: inState = initialState,
  action: tyAction
): inState => {
  switch (action.type) {
    case enTypes.CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};
