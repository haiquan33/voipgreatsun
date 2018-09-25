import {
        GET_USER_PHONEno,
        STORE_USER_CONTACT_LIST
} from './basicReducer'
var uuid = require('react-native-uuid');



export function get_User_phone_no(user_phone_no) {
        return {
                type: GET_USER_PHONEno,
                user_phone_no

        }

}

export function store_User_contact_list(contactlist) {
        let temp_list = contactlist.map(contact => {
                var item = contact;
                if (item.key==null){
                        if (contact.rawContactId)
                        item.key = contact.rawContactId;
                        else item.key=uuid.v1();
                }
                
                return item;
        })
        return {
                type: STORE_USER_CONTACT_LIST,
                contact_list:temp_list
        }
}