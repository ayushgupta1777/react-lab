import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './shopping-cart/Dashboard';
import PlaygroundDashboard from './components/PlaygroundDashboard';
import PracticeStateProps from './components/PracticeStateProps';
import PracticeUserList from './components/PracticeUserList';
import PracticeForm from './components/PracticeForm';
import Counter from './lab/counter_boundraries.jsx';

import Number_of_text from './lab/charctarCount.jsx';
import TextVisiblity from './lab/text_visiblity_toggele.jsx';
import Selector_output from './lab/selector_output.jsx';
import AddList from './lab/add_list.jsx';

// Shopping Cart imports
import { CartProvider } from './shopping-cart/CartContext';
import ProductsPage from './shopping-cart/ProductsPage';
import ProductDetailsPage from './shopping-cart/ProductDetailsPage';
import CartDrawer from './shopping-cart/CartDrawer';

// Simple Products imports
import ProductsList from './products/ProductsList';
import ProductDetail from './products/ProductDetail';

//vss Nets imports
import UserDetails from './vss_nets/User-Details';
import UsersList from './vss_nets/Users-List';

// GitHub Profiler import
import GitHubProfiler from './github-profiler/GitHubProfiler';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('react-lab-theme');
    if (saved) return saved;
    // Forcing light theme per user request
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('react-lab-theme', 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      {/* <CartProvider> */}
        {/* <Dashboard theme={theme} toggleTheme={toggleTheme}> */}
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/:id" element={<ProductDetailsPage />} />
            
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            
            <Route path='/cc' element={<Number_of_text />}/>
            <Route path='/text_v' element={<TextVisiblity/>}/>
            <Route path='/selector_output' element={<Selector_output/>} />
            <Route path='/add_list' element={<AddList />} />

            {/* GitHub Profiler route */}
            <Route path="/github-profiler" element={<GitHubProfiler />} />

            //vss Nets 

            <Route path={`/users/:id/:name`} element={<UserDetails />} />
            <Route path={`/users`} element={<UsersList />} />
          </Routes>
        {/* </Dashboard> */}
        {/* <CartDrawer /> */}
      {/* </CartProvider> */}
    </BrowserRouter>
  );
}

export default App;

