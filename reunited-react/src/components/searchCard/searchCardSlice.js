import { getDbData } from "../../utils/data"



export const loadData = () => {
    return { 
      type: 'users/loadData', 
      payload: getDbData()
    }
}
  
const initialUsers = []
export const usersReducer = (users = initialUsers, action) => {
    switch(action.type) {
      case 'users/loadData':
        return action.payload
      default:
        return users; 
    }
}