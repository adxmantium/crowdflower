// /actions/index.js

import axios from 'axios'

const routes = {
  tasks: 'https://cfassignment.herokuapp.com/adam adams/tasks',
}

const resetData = {
  saved: false,
  err_msg: false,
  saving_tasks_err: false,
}

export const reorderTasks = ({ tasks, tasksOrder }) => ({
  type: '_APP:REORDER_TASKS',
  payload: { tasks, tasksOrder }, 
});

export const closeAlert = () => ({
  type: '_APP:CLOSE_ALERT',
  payload: resetData, 
});

export const resetSaved = () => ({
  type: '_APP:RESET_SAVED',
  payload: resetData,
});

export const addTask = () => ({
  type: '_APP:ADD_TASK',
  payload: {}
});

export const editTask = payload => ({
  type: '_APP:EDIT_TASK',
  payload
});

export const deleteTask = ({ id: task_id }) => ({
  type: '_APP:DELETE_TASK',
  payload: { task_id }
});

export const getTasks = () => {
  const pending = 'fetching_tasks',
        done = 'fetched_tasks';

	return (dispatch) => {
	    dispatch( pendingAction({ pending, type: pending.toUpperCase() }) );

      axios.get(routes.tasks)
           .then(res => {

              const action = {
                 type: `_APP:${done.toUpperCase()}`,
                 payload: {
                    ...res.data,
                    [done]: true,
                    [pending]: false,
                 },
              };

              dispatch( action );

           })
           .catch( err => dispatch( errAction({ pending, err, type: pending.toUpperCase() }) ) );
	}
}

export const saveTasks = ({ tasks }) => {
  const pending = 'saving_tasks',
        done = 'saved_tasks',
        data = {saved: false};

  return (dispatch) => {
      dispatch( pendingAction({ 
        pending, 
        type: pending.toUpperCase(), 
        data 
      }) );

      axios.post(routes.tasks, { tasks })
           .then(res => {

              const action = {
                 type: `_APP:${done.toUpperCase()}`,
                 payload: {
                  saved: true,
                  err_msg: false,
                  saving_tasks_err: false,
                 },
              };

              dispatch( action );

           })
           .catch( err => {
              dispatch( errAction({ 
                pending, 
                err, 
                type: pending.toUpperCase(),
                err_msg: err.response.data && err.response.data.error,
              }) )
           } );
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

const errAction = ({ pending, err, type, err_msg }) => ({
  type: `_APP:${type || 'GET_REQUEST_PENDING'}_ERR`,
  payload: {
    [pending]: false,
    [pending+'_err']: err,
    err_msg,
  }
})