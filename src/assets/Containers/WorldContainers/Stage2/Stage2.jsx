import React from 'react';
import { Outlet } from 'react-router-dom';
import './Stage2.css';

function Stage2(props) {
  return <div className="Stage2"><Outlet /></div>;
}

export default Stage2;