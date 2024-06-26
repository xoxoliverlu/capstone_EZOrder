import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import StaffScreen from './screens/StaffScreen';
import MenuScreen from './screens/MenuScreen';
import LoginScreen from './screens/LoginScreen';
import TasksScreen from './screens/TasksScreen';
import TableSelectionScreen from './screens/TableSelectionScreen';
import WaiterTableReqScreen from './screens/WaiterTableReqScreen';
import CustomerSelectScreen from './screens/CustomerSelectScreen';
import CustomerMenuScreen from './screens/CustomerMenuScreen';
import WaiterReadyOrderScreen from './screens/WaiterReadyOrdScreen';
import CartScreen from './screens/CartScreen';
import TableScreen from './screens/TableScreen';
import OrderScreen from './screens/OrderScreen';
import KitchenScreen from './screens/KitchenScreen';
import SettingsScreen from './screens/SettingsScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ManagerRoute from './components/ManagerRoute';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path='/table' element={<TableSelectionScreen/>}/>
    <Route index={true} path='/' element={<HomeScreen />} />
    <Route path='/login' element={<LoginScreen />} />
    <Route path='/register' element={<RegisterScreen />} />
    <Route path='/customer' element={<CustomerSelectScreen />} />
    <Route path='/customerMenu' element={<CustomerMenuScreen />} />
    <Route path='cart' element={<CartScreen />} />
    <Route path='/orders' element={<OrderScreen/>}/>
    <Route path='/password/forgot' element={<ForgotPasswordScreen/>} />
    { /* Private routes (user has to be logged in */}
    <Route path='' element={<PrivateRoute />}>
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/menu' element={<MenuScreen />} />
      <Route path='/kitchen' element={<KitchenScreen />} />
      <Route path='/tasks' element={<TasksScreen />}/>
      <Route path='table/assistance' element={<WaiterTableReqScreen />} />
      <Route path='/readyToServeOrders' element = {<WaiterReadyOrderScreen />} />
      {/* Manager only routes */}
      <Route path='' element={<ManagerRoute />}>
       <Route path='/staff' element={<StaffScreen/>}/>
       <Route path='/settings' element={<SettingsScreen/>}/>
       <Route path='/tableEdits' element = {<TableScreen />} />
      </Route>
    </Route>
  </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();