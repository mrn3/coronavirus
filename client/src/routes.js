import React, { useEffect } from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";

import Home from "./components/Home";
import ByCountry from "./components/ByCountry";
import ByState from "./components/ByState";
import Projections from "./components/Projections";

import { createBrowserHistory } from "history"
import ReactGA from 'react-ga'

const history = createBrowserHistory();
// track in google analytics
history.listen(location => {
	ReactGA.set({ page: location.pathname })
	ReactGA.pageview(location.pathname)
})

export default props => {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname)
	});
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/">
					<Redirect to="/coronavirus" />
				</Route>
				<Route exact path="/coronavirus/" component={Home} />
				<Route exact path="/coronavirus/by-country" component={ByCountry} />
				<Route exact path="/coronavirus/by-state" component={ByState} />
				<Route exact path="/coronavirus/projections" component={Projections} />
			</Switch>
		</Router>
	)
}