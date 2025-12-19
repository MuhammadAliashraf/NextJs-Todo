import { Inter, Poppins } from 'next/font/google';
import '../app/globals.css';
import { Toaster } from 'react-hot-toast';
import { ContextProvider } from '@/components/Clients';
import Navbar from '@/components/Navbar';
import { cn } from '@/utils/cn';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'], 
  variable: '--font-poppins'
});

export const metadata = {
  title: 'Task Master',
  description: 'Modern Task Management App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        poppins.variable
      )}>
        <ContextProvider>
          <Toaster position="bottom-right" />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
