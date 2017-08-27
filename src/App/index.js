// /src/Team/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'

// components
import Task from './task'

// actions 
import { getTasks, addTask, deleteTask } from './../actions'

// styles
import './../styles/index.scss'

class App extends Component{
	constructor(props){
		super(props);

		this._addTask = this._addTask.bind(this);
		this._deleteTask = this._deleteTask.bind(this);

		this.state = {};
	}

	componentWillMount(){
		const { dispatch, _app } = this.props;

		// fetch tasks if we don't have any yet
		if( !_app.tasks ) dispatch( getTasks() );
	}

	_addTask(){
		const { dispatch, _app: { tasks } } = this.props;
		let last_task_added = null;

		if( tasks && tasks.length > 0 ) last_task_added = tasks[0].id;

		dispatch( addTask({ last_task_added }) );
	}

	_deleteTask({ id }){
		const { dispatch } = this.props;

		dispatch( deleteTask({ id }) );
	}

	render(){
		const { _app } = this.props;
		const _tasks = _app.tasks || [];

		return (
			<div>

				<div className="header">
					<div className="title">Tasks</div>
					<div>
						<div className="task-btn add" onClick={ this._addTask }>Add Task</div>
						<div className="task-btn save">Save</div>
					</div>
				</div>

				<div className="tasks-container">
					{ _tasks.map(task => <Task key={task.id} {...task} deleteTask={this._deleteTask} />) }
				</div>

			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
  return {
    _app: state._app,
  };
} 

export default connect(mapStateToProps)(App);