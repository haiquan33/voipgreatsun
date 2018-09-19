export const GET_USER_PHONEno='GET_USER_PHONE_NO'


const initialState={user_phone_no:null}
export default function basicReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_PHONEno:
            return {...state,user_phone_no:action.user_phone_no}
      default:
        return state;
    }
  }