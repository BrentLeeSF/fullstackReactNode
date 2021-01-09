import React from "react";
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Layout from './components/Layout';
import Main from './components/Main';

const store = ConfigureStore();

function App() {
  return (
  	<Provider store={store}>
  		<React.Fragment>
  			<Layout>
	      		<Main />
	      	</Layout>
	    </React.Fragment>
    </Provider>
  );
}

export default App;
