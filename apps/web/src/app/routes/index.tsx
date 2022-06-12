import {
  Routes, Route,
} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import User from '../pages/User';
import ListItems from '../components/ListItems';
import CreateTicket from '../components/CreateTicket';
import About from '../components/About';

export default function RoutesNavigator() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/list-tickets" element={<ListItems />} />
      <Route path="/user/create-ticket" element={<CreateTicket />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
