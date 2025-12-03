import { AppProvider, useApp } from './components/AppContext';
import WelcomeScreen from './components/WelcomeScreen';
import ParentLogin from './components/ParentLogin';
import ChildLogin from './components/ChildLogin';
import ParentSignup from './components/ParentSignup';
import ChildAccountCreation from './components/ChildAccountCreation';
import TopicSelection from './components/TopicSelection';
import QuizInterface from './components/QuizInterface';
import PerformanceTracking from './components/PerformanceTracking';
import IncorrectExercisesList from './components/IncorrectExercisesList';
import ParentHome from './components/ParentHome';
import ParentDashboard from './components/ParentDashboard';
import ChildPerformanceGroups from './components/ChildPerformanceGroups';
import ExerciseCategories from './components/ExerciseCategories';
import ExerciseList from './components/ExerciseList';
import AccountInfo from './components/AccountInfo';
import EditAccount from './components/EditAccount';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import ForgotPassword from './components/ForgotPassword';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'welcome':
      return <WelcomeScreen />;
    case 'parent-login':
      return <ParentLogin />;
    case 'parent-signup':
      return <ParentSignup />;
    case 'child-login':
      return <ChildLogin />;
    case 'parent-home':
      return <ParentHome />;
    case 'parent-dashboard':
      return <ParentDashboard />;
    case 'child-performance-groups':
      return <ChildPerformanceGroups />;
    case 'exercise-categories':
      return <ExerciseCategories />;
    case 'exercise-list':
      return <ExerciseList />;
    case 'create-child':
      return <ChildAccountCreation />;
    case 'topic-selection':
      return <TopicSelection />;
    case 'quiz':
      return <QuizInterface />;
    case 'performance':
      return <PerformanceTracking />;
    case 'incorrect-exercises':
      return <IncorrectExercisesList />;
    case 'account-info':
      return <AccountInfo />;
    case 'edit-account':
      return <EditAccount />;
    case 'about':
      return <AboutUs />;
    case 'contact':
      return <Contact />;
    case 'privacy':
      return <PrivacyPolicy />;
    case 'terms':
      return <TermsConditions />;
    case 'forgot-password':
      return <ForgotPassword />;
    default:
      return <WelcomeScreen />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AppProvider>
  );
}
