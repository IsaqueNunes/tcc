import {
  Routes, Route,
} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import User from '../pages/User';
import ListTickets from '../components/ListTickets';
import CreateTicket from '../pages/CreateTicket';
// import About from '../components/About';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';

export default function RoutesNavigator() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/my-tickets" element={<ListTickets />} />
      <Route path="/user/create-ticket" element={<CreateTicket />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chat/:id" element={<Chat />} />
    </Routes>
  );
}
