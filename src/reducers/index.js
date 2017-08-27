// /reducers/index.js

let init = {};

export default function(state = init, action) {

    switch(action.type) {

      case '_APP:SAVED_TASKS':
      case '_APP:SAVING_TASKS':
      case '_APP:FETCHED_TASKS':
      case '_APP:FETCHING_TASKS':
          return {...state, ...action.payload};

        default:
            return state;
            
    }

};