import { LogoutButton } from '@/components/Clients';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div>
        <h2>TO DO APP</h2>
      </div>
      <article>
        <Link href={'/'}>Home</Link>
        <Link href={'/about'}>About</Link>
        <LogoutButton/>
      </article>
    </div>
  );
};

export default Header;
 