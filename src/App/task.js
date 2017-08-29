// /src/App/task.js

import React, { Component } from 'react'

export default class Task extends Component {
	constructor(props){
		super(props);
		this._input = null;
	}

	componentDidMount(){
		const { edited } = this.props;
		if( !edited ) this._input.focus();
	}

	render(){
		const { id, name, editTask, deleteTask, DragHandleComponent } = this.props;

		return (
			<div className="task-item">
			
				{ DragHandleComponent && <DragHandleComponent /> }

				<input 
					type="text"
					value={ name || '' }
					className="edit-field"
					placeholder="Enter task name"
					onBlur={ e => editTask({ id, name }) }
					ref={ input => { this._input = input; } }
					onChange={ e => editTask({ id, name: e.target.value }) } />

				<div className="trash" onClick={ () => deleteTask({ id }) }>
					<i className="fa fa-trash-o" />
				</div>

			</div>
		);
	}
}