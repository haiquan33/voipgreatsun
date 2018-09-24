import {GET_USER_PHONEno,
        STORE_USER_CONTACT_LIST} from './basicReducer'
export function get_User_phone_no(user_phone_no){
    return {
            type:GET_USER_PHONEno,
            user_phone_no
            
    }

}

export function store_User_contact_list(contact_list){
    return {
            type: STORE_USER_CONTACT_LIST,
            contact_list
    }
}