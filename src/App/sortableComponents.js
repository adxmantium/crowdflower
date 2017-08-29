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
export const SortableList = SortableContainer(({ tasks, ...actions }) => {

  	return (

  		<div>
			{ tasks.map((task, index) => <SortableItem 
											key={task.id || `item-${index}`} 
											index={index} 
											{...task} 
											{...actions} />) }
		</div>

	);

});