// /src/App/sortableComponents.js

import React from 'react'
import Task from './task'
import { 
	SortableHandle,
	SortableElement, 
	SortableContainer, 
} from 'react-sortable-hoc'

// drag handle component that allows user to reorder list by click-dragging item
export const DragHandle = SortableHandle(() => 

	<div className="reorder">
		<i className="fa fa-th" />
	</div>

);

// individual task item
export const SortableItem = SortableElement(({ editTask, deleteTask, ...task }) =>

 	<Task 
		{...task} 
		editTask={ editTask }
		deleteTask={ deleteTask }
		DragHandleComponent={ DragHandle } />

);

// task items container
export const SortableList = SortableContainer(({ tasks, isEmptyList, ...actions }) => {

  	return (

  		<div className="tasks-container">
  		
  			{ isEmptyList && 
  				<div className="empty-msg">You have 0 saved tasks. Click "Add Task" to create a new task</div> }

			{ tasks.map((task, index) => <SortableItem 
											key={task.id || `item-${index}`} 
											index={index} 
											{...task} 
											{...actions} />) }
		</div>

	);

});