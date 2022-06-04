// import styled from 'styled-components';
// import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SharedHeaderFooter from './components/SharedHeaderFooter';
import RoutesNavigator from './routes';

export default function App() {
  return (
    <SharedHeaderFooter>
      <RoutesNavigator />
    </SharedHeaderFooter>
  );
}
