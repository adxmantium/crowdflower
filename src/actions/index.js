// /actions/index.js

import axios from 'axios'

const routes = {
  tasks: 'http://cfassignment.herokuapp.com/adam adams/tasks',
}

export const getTasks = () => {
  const pending = 'fetching_tasks',
        done = 'fetched_tasks';

	return (dispatch) => {
	    dispatch( pendingAction({ pending, type: pending.toUpperCase() }) );

      axios.get(routes.teams)
           .then(res => {

              const action = {
                 type: `_APP:${done.toUpperCase()}`,
                 payload: {
                    ...res.data,
                 },
              };

              dispatch( action );

           })
           .catch( err => dispatch( errAction({ pending, err }) ) );
	}
}

export const saveTask = () => {
  const pending = 'saving_tasks',
        done = 'saved_tasks',
        data = {saved: false};

  return (dispatch) => {
      dispatch( pendingAction({ 
        pending, 
        type: pending.toUpperCase(), 
        data 
      }) );

      axios.post(routes.teams)
           .then(res => {

              const action = {
                 type: `_APP:${done.toUpperCase()}`,
                 payload: {
                  saved: true,
                 },
              };

              dispatch( action );

           })
           .catch( err => dispatch( errAction({ pending, err }) ) );
  }
}

const pendingAction = ({ pending, type, data = {} }) => ({
  type: `_APP:${type || 'GET_REQUEST_PENDING'}`,
  payload: {
    ...data,
    [pending]: true,
    [pending+'_err']: false,
  }
})

const errAction = ({ pending, err }) => ({
  type: '_APP:GET_REQUEST_PENDING_ERR',
  payload: {
    [pending]: false,
    [pending+'_err']: err,
  }
})