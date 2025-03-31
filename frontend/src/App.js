import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { UserProvider } from './context/UserContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import WorkoutPlans from './components/WorkoutPlans';
import ProgressTracking from './components/ProgressTracking';
import Chat from './components/Chat';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={Profile} />
            <Route path="/workout-plans" component={WorkoutPlans} />
            <Route path="/progress" component={ProgressTracking} />
            <Route path="/chat/:userId" component={Chat} />
          </Switch>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;