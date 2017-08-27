// /src/Team/index.js

import { connect } from 'react-redux'
import React, { Component } from 'react'

// actions 
import { getTasks } from './../actions'

// styles
import './../styles/index.scss'

class App extends Component{
	constructor(props){
		super(props);

		this.state = {};
	}

	componentWillMount(){
		const { dispatch, _app } = this.props;

		// fetch tasks if we don't have any yet
		if( !_app.tasks ) dispatch( getTasks() );
	}

	render(){
		const { _app } = this.props;

		return (
			<div>

				<div className="header">
					<div className="title">Tasks</div>
					<div>
						<div className="task-btn add">Add Task</div>
						<div className="task-btn save">Save</div>
					</div>
				</div>

				<div className="tasks-container">
					{ [1,2,3].map(task => <Task key={task} />) }
				</div>

			</div>
		);
	}
}

const Task = ({ name, onDelete }) => {
	return (
		<div className="task-item">
			<div className="reorder">
				<i className="fa fa-th" />
			</div>

			<div className="name">TASK</div>

			<div className="trash">
				<i className="fa fa-trash-o" />
			</div>
		</div>
	);
}

const mapStateToProps = (state, props) => {
  return {
    _app: state._app,
  };
} 

export default connect(mapStateToProps)(App);