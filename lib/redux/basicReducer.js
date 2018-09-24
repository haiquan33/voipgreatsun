export const GET_USER_PHONEno='GET_USER_PHONE_NO'
export const STORE_USER_CONTACT_LIST="GET_USER_CONTACT_LIST"

const initialState={user_phone_no:null,user_contact_list:null}
export default function basicReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_PHONEno:
            return {...state,user_phone_no:action.user_phone_no}
        case STORE_USER_CONTACT_LIST:
            return {...state,user_contact_list:action.contact_list}
      default:
        return state;
    }
  }