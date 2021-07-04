import React from 'react'
import Header from './header'
// import Footer from './footer'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import routes from '../routers'

export default function index() {
    return (
      <Router>
            <Header/>
            <div className="">
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact
                  >
                    <route.component />
                  </Route>
                ))}
            </div>
        {/* <Footer/> */}
      </Router>
    )
}
