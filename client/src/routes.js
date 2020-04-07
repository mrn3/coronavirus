import React, { useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";

import Home from "./components/Home";
import HowItWorks from "./components/HowItWorks";
import OurStory from "./components/OurStory";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";

import Business from './components/analyze/Business';
import Revenue from './components/analyze/Revenue';
import Service from './components/analyze/Service';
import GoogleApi from './components/analyze/GoogleApi';
import Analyzing from './components/analyze/Analyzing';
import Result from './components/analyze/Result';

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
				<Route exact path="/" component={Home} />
				<Route exact path="/how-it-works" component={HowItWorks} />
				<Route exact path="/our-story" component={OurStory} />
				<Route exact path="/analyze/business" component={Business} />
				<Route exact path="/analyze/revenue" component={Revenue} />
				<Route exact path="/analyze/service" component={Service} />
				<Route exact path="/analyze/google" component={GoogleApi} />
				<Route exact path="/analyze/analyzing" component={Analyzing} />
				<Route exact path="/analyze/result" component={Result} />
				<Route exact path="/privacy" component={Privacy} />
				<Route exact path="/terms" component={Terms} />
			</Switch>
		</Router>
	)
}