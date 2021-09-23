import React from 'react';
import './Container.scss';

function Container({ children }:{children:any}) {
  return (
    <div className = "container">
      {children}
    </div>
  );
}

export default Container;
