// /src/App/errorMessage.js
import React from 'react'

export default ({ show, isFetching, onClick }) => {

	return show && (

		<div className="error" onClick={ onClick }>
		
			<div>There was an error retrieving your tasks. Click here to try again.</div>

			{ isFetching && 
				<div>
					<i className="fa fa-refresh fa-fw fa-spin"></i>
					<span className="sr-only">Loading...</span>
				</div> 
			}

		</div>		

	);

}