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
			<div id="_main">

				<nav />

				<div>
					<div className="title">Tasks</div>
					<div className="task-btn add">Add Task</div>
					<div className="task-btn save">Save</div>
				</div>

			</div>
		);
	}
}

const Task = ({ name, onDelete }) => {
	return (
		<div>
			<i class="fa fa-camera-retro fa-lg"></i> fa-lg
			<span>task</span>
			<i class="fa fa-camera-retro fa-lg"></i> fa-lg
		</div>
	);
}

const mapStateToProps = (state, props) => {
  return {
    _app: state._app,
  };
} 

export default connect(mapStateToProps)(Team);