// /src/index.js

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, BrowserRouter, IndexRoute } from 'react-router-dom'

//store
import App from './App'
import store from './store'

render((

	<Provider store={ store }>
		<BrowserRouter>
			<Route path="/" component={ App } />
	    </BrowserRouter>
    </Provider>

), document.getElementById('_App'));