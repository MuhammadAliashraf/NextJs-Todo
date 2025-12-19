'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { LogoutButton } from './Clients';
import { Menu, X, CheckSquare } from 'lucide-react';
import { Button } from './ui/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <CheckSquare className="h-6 w-6" />
          <span>Task Master</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            About
          </Link>
          <div className="ml-4">
            <LogoutButton />
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t p-4 bg-background shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:text-primary"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
            <div className="pt-2">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
