import './App.css'
import "react-multi-carousel/lib/styles.css";
import Router from './router/Router';
import { Provider } from 'react-redux';
import { store } from './Redux/app';




function App() {

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
