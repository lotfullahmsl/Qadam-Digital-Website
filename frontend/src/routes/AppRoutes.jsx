import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'

// Public Pages
import PublicLayout from '../components/layout/PublicLayout'
import Home from '../pages/public/Home'
import About from '../pages/public/About'
import Services from '../pages/public/Services'
import Scholarships from '../pages/public/Scholarships'
import ScholarshipDetails from '../pages/public/ScholarshipDetails'
import WebsiteDatabaseSolutions from '../pages/public/WebsiteDatabaseSolutions'
import CvTranslationServices from '../pages/public/CvTranslationServices'
import DigitalToolsSubscriptions from '../pages/public/DigitalToolsSubscriptions'
import SocialMediaMarketing from '../pages/public/SocialMediaMarketing'
import Pricing from '../pages/public/Pricing'
import Portfolio from '../pages/public/Portfolio'
import Blog from '../pages/public/Blog'
import BlogDetails from '../pages/public/BlogDetails'
import Contact from '../pages/public/Contact'

// Auth
import Login from '../pages/auth/Login'
import UserLogin from '../pages/auth/UserLogin'
import UserSignup from '../pages/auth/UserSignup'

// Admin Pages
import AdminLayout from '../components/layout/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import ScholarshipManager from '../pages/admin/ScholarshipManager'
import PortfolioManager from '../pages/admin/PortfolioManager'
import PricingManager from '../pages/admin/PricingManager'
import ServiceManager from '../pages/admin/ServiceManager'
import RequestManager from '../pages/admin/RequestManager'
import AdsManager from '../pages/admin/AdsManager'
import Settings from '../pages/admin/Settings'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><span className="text-primary text-sm">Loading...</span></div>
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />
}

function PublicPage({ component: Component }) {
  return (
    <PublicLayout>
      <Component />
    </PublicLayout>
  )
}

function AdminPage({ component: Component }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Component />
      </AdminLayout>
    </ProtectedRoute>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path={ROUTES.HOME} element={<PublicPage component={Home} />} />
      <Route path={ROUTES.ABOUT} element={<PublicPage component={About} />} />
      <Route path={ROUTES.SERVICES} element={<PublicPage component={Services} />} />
      <Route path={ROUTES.SCHOLARSHIPS} element={<PublicPage component={Scholarships} />} />
      <Route path={ROUTES.SCHOLARSHIP_DETAILS} element={<PublicPage component={ScholarshipDetails} />} />
      <Route path={ROUTES.WEBSITE_DATABASE} element={<PublicPage component={WebsiteDatabaseSolutions} />} />
      <Route path={ROUTES.CV_TRANSLATION} element={<PublicPage component={CvTranslationServices} />} />
      <Route path={ROUTES.DIGITAL_TOOLS} element={<PublicPage component={DigitalToolsSubscriptions} />} />
      <Route path={ROUTES.SOCIAL_MEDIA} element={<PublicPage component={SocialMediaMarketing} />} />
      <Route path={ROUTES.PRICING} element={<PublicPage component={Pricing} />} />
      <Route path={ROUTES.PORTFOLIO} element={<Navigate to={ROUTES.ABOUT} replace />} />
      <Route path={ROUTES.BLOG} element={<PublicPage component={Blog} />} />
      <Route path={ROUTES.BLOG_DETAILS} element={<PublicPage component={BlogDetails} />} />
      <Route path={ROUTES.CONTACT} element={<PublicPage component={Contact} />} />

      {/* Auth */}
      <Route path={ROUTES.USER_LOGIN} element={<PublicPage component={UserLogin} />} />
      <Route path={ROUTES.USER_SIGNUP} element={<PublicPage component={UserSignup} />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />

      {/* Admin */}
      <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminPage component={Dashboard} />} />
      <Route path={ROUTES.ADMIN_SCHOLARSHIPS} element={<AdminPage component={ScholarshipManager} />} />
      <Route path={ROUTES.ADMIN_PORTFOLIO} element={<AdminPage component={PortfolioManager} />} />
      <Route path={ROUTES.ADMIN_PRICING} element={<AdminPage component={PricingManager} />} />
      <Route path={ROUTES.ADMIN_SERVICES} element={<AdminPage component={ServiceManager} />} />
      <Route path={ROUTES.ADMIN_REQUESTS} element={<AdminPage component={RequestManager} />} />
      <Route path={ROUTES.ADMIN_ADS} element={<AdminPage component={AdsManager} />} />
      <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminPage component={Settings} />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  )
}
