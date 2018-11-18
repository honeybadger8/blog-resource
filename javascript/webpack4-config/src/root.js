import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { hashHistory,browserHistory, Router,match } from 'react-router';
// import cstore,{Store,Persistor} from "src/store/client.index";
import { PersistGate } from 'redux-persist/integration/react'
import routes from './pages/routes';

	ReactDOM.render(
				<Router routes={routes} history={browserHistory}/>,
		document.getElementById('app')
	)


