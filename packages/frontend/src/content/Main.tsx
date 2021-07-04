import React, { useState } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Header from './Header';
import Home from './Home/Home';
import Album from './Album/Album';

function Main() {
  const [title, setTitle] = useState('');

  return (
    <div className="content-wrapper">
      <Header title={title} />
      <div className="content">
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact>
              <Home setTitle={setTitle} />
            </Route>
            <Route path="/albums" exact>
              <Album setTitle={setTitle} />
            </Route>
          </Switch>
        </div>
      </div>

    </div>
  );
}

export default Main;
