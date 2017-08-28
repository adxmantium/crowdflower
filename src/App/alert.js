// /src/App/task.js
 import React from 'react'

export default ({ msg, close, error }) => (
	<div className={`alert ${error && 'err'}`}>

		<div>{ msg }</div>

		<div className="close" onClick={ close }>&times;</div>

	</div>		
);
