import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/Toast';
import { WriteReviewModal } from './components/review/WriteReviewModal';
import { ClaimHotelModal } from './components/hotel/ClaimHotelModal';
import { ReportModal } from './components/review/ReportModal';
import { ComparisonModal } from './components/compare/ComparisonModal';
import { AIChatbot } from './components/chat/AIChatbot';
import { AuthModal } from './components/auth/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { ExplorePage } from './pages/ExplorePage';
import { RankingsPage } from './pages/RankingsPage';
import { JournalPage } from './pages/JournalPage';
import { JournalArticlePage } from './pages/JournalArticlePage';
import { SavedHotelsPage } from './pages/SavedHotelsPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AdminModerationPage } from './pages/AdminModerationPage';

export function App() {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-editorial-bg text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-16 lg:pb-0">
        {currentView === 'home' && <HomePage />}
        {currentView === 'hotel-detail' && <HotelDetailPage />}
        {currentView === 'explore' && <ExplorePage />}
        {currentView === 'rankings' && <RankingsPage />}
        {currentView === 'journal' && <JournalPage />}
        {currentView === 'journal-article' && <JournalArticlePage />}
        {currentView === 'saved' && <SavedHotelsPage />}
        {currentView === 'profile' && <UserProfilePage />}
        {currentView === 'admin' && <AdminModerationPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals & Notifications */}
      <AuthModal />
      <WriteReviewModal />
      <ClaimHotelModal />
      <ReportModal />
      <ComparisonModal />
      <AIChatbot />
      <ToastContainer />
    </div>
  );
}

export default App;
