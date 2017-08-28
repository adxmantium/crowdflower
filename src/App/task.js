// /src/App/task.js

import React from 'react'

export default ({ id, name, edited, editTask, deleteTask }) => (

	<div className="task-item" draggable="true">
	
		<div className="reorder">
			<i className="fa fa-th" />
		</div>

		<input 
			type="text"
			className="edit-field"
			value={ name || '' }
			placeholder="Enter task name"
			onChange={ e => editTask({ id, name: e.target.value }) } />

		<div className="trash" onClick={ () => deleteTask({ id }) }>
			<i className="fa fa-trash-o" />
		</div>

	</div>

);