// /src/App/task.js

import React from 'react'

export default ({ id, name, deleteTask }) => {
	return (
		<div className="task-item">
			<div className="reorder">
				<i className="fa fa-th" />
			</div>

			<div className="name">{ name }</div>

			<div className="trash" onClick={ () => deleteTask({ id }) }>
				<i className="fa fa-trash-o" />
			</div>
		</div>
	);
}