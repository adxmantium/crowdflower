// /reducers/index.js

let init = {
	tasks: [],
};

export default function(state = init, action) {

    let tasks = null,
    	newState = null;

    switch(action.type) {

    	case '_APP:RESET_SAVED':
    	case '_APP:CLOSE_ALERT':
		case '_APP:SAVED_TASKS':
		case '_APP:SAVING_TASKS':
		case '_APP:FETCHING_TASKS':
			return {...state, ...action.payload};

		case '_APP:REORDER_TASKS':
			tasks = action.payload.tasks;

			const tasksOrder = tasks.map(task => task.id)
									.reduce((order, id) => order += id, '');

			return {...state, ...action.payload, tasksOrder};

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

		case '_APP:SAVING_TASKS_ERR':
			return {
				...state,
				saving_error: true,
				...action.payload,
			}

		case '_APP:FETCHING_TASKS_ERR':
			return {
				...state, 
				error: true,
				...action.payload,
			};

		case '_APP:ADD_TASK':
			const newTask = {
				id: 1,
				name: '',
				edited: false,
			};

			if( state.tasks.length > 0 ){

				// use map to return array of just task ids
				// use reduce return max id
				let highest_id = state
								 .tasks
								 .map( task => parseInt(task.id) )
								 .reduce( (max, id) => id > max ? id : max , 1 );

				newTask.id = highest_id + 1;
			}

			tasks = [newTask, ...state.tasks];

			return {...state, tasks};

		case '_APP:EDIT_TASK':
			const { id, name } = action.payload;

			newState = {...state};
			
			// edit the task that matches the payload id and update task w/ new name
			newState.tasks = state.tasks.map(task => task.id == id ? {...task, edited: true, name} : task);

			// taskNamesKey is a string of the all task names concatenated together - used to determine difference in edited task names
			newState.taskNamesKey = newState.tasks.map(task => task.name)
												  .reduce((names, name) => names += name, '');

			return newState;

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