import React from 'react';
import { Style } from 'react-imvc/component';

const Layout = (props: { diyClass?: string; children: any }) => {
  const { diyClass = '', children } = props;

  return (
    <>
      <Style name="antdmobile" />
      <Style name="main" />
      <div className={`body-mod ${diyClass}`}>
        {children}
      </div>
    </>
  );
};

export default Layout;
