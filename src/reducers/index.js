// /reducers/index.js

let init = {
	tasks: [],
};

export default function(state = init, action) {

    let tasks = null,
    	newState = null;

    switch(action.type) {

		case '_APP:SAVED_TASKS':
		case '_APP:SAVING_TASKS':
		case '_APP:FETCHING_TASKS':
			return {...state, ...action.payload};

		case '_APP:FETCHED_TASKS':
			const { tasks: tasksList, error, ...rest } = action.payload;

			newState = {...state, ...rest};

			if( tasksList ){
				// if tasks is an array, set newState.tasks as tasks array
				// else if object, spread tasks into an array;
				if( Array.isArray(tasksList) ) newState.tasks = tasksList;
				else newState.tasks = [...tasksList];

			}else if( error ) newState.error = error;

			newState.error = false;

			return newState;

		case '_APP:FETCHING_TASKS_ERR':
			return {
				...state, 
				error: true,
				...action.payload,
			};

		case '_APP:ADD_TASK':
			const { last_task_added } = action.payload;
			const newTask = {
				id: 1,
				name: 'TASK',
			};

			if( last_task_added ) newTask.id = last_task_added + 1;

			tasks = [newTask, ...state.tasks];

			return {...state, tasks};

		case '_APP:DELETE_TASK':
			const { task_id } = action.payload;

			// only return tasks that aren't equal to the task_id to delete
			tasks = state.tasks.reduce((all_tasks, task) => {

				return task.id != task_id ? [...all_tasks, task] : all_tasks;
				
			}, []);

			return {...state, tasks};

    	default:
        	return state;
            
    }

};