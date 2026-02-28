import { Fragment } from 'react/jsx-runtime';
import { useSelector } from 'react-redux';

import Counter from './components/Counter';
import Header from './components/Header'
import Auth from './components/Auth'
import UserProfile from './components/UserProfile'


function App() {
  const isAuthenticatedUser = useSelector(state => state.auth.isAuthenticated);
  return (
    <Fragment>
      <Header />
      {!isAuthenticatedUser ? <Auth /> : <UserProfile />}
      <Counter />
    </Fragment>
  );
}

export default App;
