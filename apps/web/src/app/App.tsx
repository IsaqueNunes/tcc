// import styled from 'styled-components';
// import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SharedHeaderFooter from './components/SharedHeaderFooter';
import Home from './pages/Home';

export default function App() {
  return (
    <SharedHeaderFooter>
      <Home />
    </SharedHeaderFooter>
  );
}
