import React from 'react';
import './App.css';
// use ProductApp in Shell app
const ProductApp = React.lazy(
  () => import('PRODUCT/App')
);
const UserApp = React.lazy(
  () => import('USER/App')
);
//
const App = () => (
  <div className="shell-app">
    <h2>Hi from Shell App</h2>
      <React.Suspense fallback='Loading...'>
        <ProductApp />
        <UserApp />
      </React.Suspense>
  </div>
);
export default App;