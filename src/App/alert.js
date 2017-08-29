// /src/App/alert.js

import React from 'react'

export default ({ show, msg, close, error }) => {

	return show && (

		<div className={`alert${error ? ' err' : ''}`}>

			<div>{ msg }</div>

			<div className="close" onClick={ close }>&times;</div>

		</div>		

	);

}