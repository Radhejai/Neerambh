import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import { Shield } from 'lucide-react';

/** Scrolls to the #hash section on the homepage after navigation (e.g. a
 * "Services" nav click while on a different page routes to "/#services"
 * and this handles the actual scroll once the homepage has rendered).
 * Plain navigation to "/" with no hash scrolls to the top instead. */
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a tick for the target route's content to mount.
      const id = hash.replace('#', '');
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleToggleServiceInQuote = (serviceId: string) => {
    setSelectedServices(prev => (prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]));
  };

  const handleAddToQuote = (serviceId: string) => {
    setSelectedServices(prev => (prev.includes(serviceId) ? prev : [...prev, serviceId]));
  };

  return (
    <div className="min-h-screen bg-royal-950 font-sans text-royal-100 antialiased selection:bg-gold-500/30 selection:text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[120px] -ml-40 -mb-40" />
      </div>

      <Navbar />
      <ScrollToHash />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              selectedServices={selectedServices}
              onToggleService={handleToggleServiceInQuote}
            />
          }
        />
        <Route
          path="/services/:slug"
          element={
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <ServiceDetailPage onAddToQuote={handleAddToQuote} />
            </main>
          }
        />
        {/* The old standalone /contact page is now the "Contact" section on
            the homepage — redirect so bookmarks/links keep working. */}
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route
          path="/blog"
          element={
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <BlogListPage />
            </main>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <BlogPostPage />
            </main>
          }
        />
        <Route
          path="*"
          element={
            <main className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
              <h1 className="font-serif text-2xl font-bold text-white mb-3">Page Not Found</h1>
              <Link
                to="/"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gold-500 text-royal-950 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Back to Home
              </Link>
            </main>
          }
        />
      </Routes>

      <footer className="border-t border-gold-500/5 bg-royal-950 py-12 mt-20 text-center text-xs text-royal-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <Shield className="h-4 w-4 text-gold-500/40" />
            <span className="font-serif tracking-widest text-royal-300 text-sm font-bold uppercase">Neerambh</span>
          </div>
          <p className="max-w-md mx-auto font-light leading-relaxed text-[11px]">
            &copy; {new Date().getFullYear()} Neerambh Compliance. All inquiry details are kept confidential.
          </p>
          <p className="text-[10px] text-gold-500/60 font-mono tracking-wider">Created by Radhejai</p>
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 pt-2 text-royal-400">
            <Link to="/#home" className="hover:text-gold-400 transition-colors">
              Home
            </Link>
            <span>&bull;</span>
            <Link to="/#services" className="hover:text-gold-400 transition-colors">
              Services
            </Link>
            <span>&bull;</span>
            <Link to="/#about" className="hover:text-gold-400 transition-colors">
              About
            </Link>
            <span>&bull;</span>
            <Link to="/blog" className="hover:text-gold-400 transition-colors">
              Blog
            </Link>
            <span>&bull;</span>
            <Link to="/#contact" className="hover:text-gold-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
