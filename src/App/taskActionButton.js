// /src/App/task.js

import React from 'react'

export default ({ label, disabled, classNames, onClick }) => (

	<button 
		className={ classNames } 
		disabled={ disabled }
		onClick={ onClick }>

			{ label }

	</button>
		
)