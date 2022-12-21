import {
  Routes, Route,
} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ListTickets from '../components/ListTickets';
import CreateTicket from '../pages/CreateTicket';
import Dashboard from '../pages/Dashboard';
import Chat from '../pages/Chat';
import ProtectedRoute from '../components/ProtectedRoute';

export default function RoutesNavigator() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/user/my-tickets' element={<ProtectedRoute />}>
        <Route path="/user/my-tickets" element={<ListTickets isAdminRoute={false} />} />
      </Route>
      <Route path='/admin/tickets' element={<ProtectedRoute />}>
        <Route path="/admin/tickets" element={<ListTickets isAdminRoute />} />
      </Route>
      <Route path='/user/create-ticket' element={<ProtectedRoute />}>
        <Route path="/user/create-ticket" element={<CreateTicket />} />
      </Route>
      <Route path='/dashboard' element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path='/chat/:id' element={<ProtectedRoute />}>
        <Route path="/chat/:id" element={<Chat />} />
      </Route>
    </Routes>
  );
}
