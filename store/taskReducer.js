import { ADD_TASK, DELETE_TASK, DID_TASK } from "./taskTypes";

const initialState={
    tasks:[{"task":"Play","done":false,"id":"1"},
    {"task":"Study","done":false,"id":"2"},
    {"task":"Yoga","done":false,"id":"3"},
    {"task":"Music","done":false,"id":"4"}]
}

const taskReducer = (state = initialState,action) =>{
    switch (action.type) {
        case ADD_TASK:
            return{
                ...state,tasks:[...state.tasks,{task:action.payload,done:false,id:Math.random().toString}]
            }
        case DELETE_TASK:
            return{
                ...state,tasks:state.tasks.filter(item=>item.id!=action.payload)
            }
        case DID_TASK:
            return{
                ...state,tasks:state.tasks.map((item) => {
                    if (item.id !== action.payload) {
                      // This isn't the item we care about - keep it as-is
                      return item
                    }
                    // Otherwise, this is the one we want - return an updated value
                    return {
                      ...item,
                      done:true
                    }
                  })
            }
        default:
            return state;
    }
}

export default taskReducer