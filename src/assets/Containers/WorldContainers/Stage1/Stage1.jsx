import React from 'react';
import { Outlet } from 'react-router-dom';
import './Stage1.css';

function Stage1(props) {
  return <div className="Stage1"><Outlet /></div>;
}

export default Stage1;