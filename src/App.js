import * as React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Login from './src/Login';
import Editor from './src/Editor';
import MyBlogs from './src/myBlogs';
import './App.css';

function App() {
  const [auth, setAuth] = React.useState(false);

  // if(!auth) {
  //   return <Login auth={() => setAuth(true)} />
  // }
  return (
    <Router>
      <Route component={Login} exact path="/" />
      <Route component={Editor} exact path="/editor" />
      <Route component={MyBlogs} exact path="/myblogs" />
    </Router>
  );
}

export default App;
