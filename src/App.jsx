import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Esg from './pages/Esg.jsx'
import OurPurpose from './pages/OurPurpose.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import Contact from './pages/Contact.jsx'
import ScheduleADemo from './pages/ScheduleADemo.jsx'
import Referral from './pages/Referral.jsx'
import Pricing from './pages/Pricing.jsx'
import BlogIndex from './pages/BlogIndex.jsx'
import BlogPost from './pages/BlogPost.jsx'
import AlternativesIndex from './pages/AlternativesIndex.jsx'
import AlternativePage from './pages/AlternativePage.jsx'
import LegalPage from './pages/LegalPage.jsx'
import EbookPage from './pages/EbookPage.jsx'
import CaseStudyPage from './pages/CaseStudyPage.jsx'
import PartnerPage from './pages/PartnerPage.jsx'
import EmployeeRecognitionHub from './pages/EmployeeRecognitionHub.jsx'
import PagePending from './pages/PagePending.jsx'
import TIndex from './templates/TIndex.jsx'
import TDetail from './templates/TDetail.jsx'

// Route table mirrors the original's sitemap.xml (195 URLs).
// Collection detail routes are a single template driven by a data file, so a
// new entry is a data row rather than a new page component.
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Core marketing pages */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/esg" element={<Esg />} />
          <Route path="/our-purpose" element={<OurPurpose />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schedule-a-demo" element={<ScheduleADemo />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/terms-of-service" element={<LegalPage />} />
          <Route path="/ebook/:slug" element={<EbookPage />} />

          {/* Collection indexes */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/alternatives" element={<AlternativesIndex />} />
          <Route path="/company-values" element={<TIndex collection="values" />} />
          <Route path="/employee-recognition" element={<EmployeeRecognitionHub />} />
          <Route path="/employee-recognition-messages" element={<TIndex collection="messages" />} />
          <Route path="/employee-recognition/glossary" element={<TIndex collection="glossary" />} />
          <Route path="/employee-recognition/for" element={<TIndex collection="for" />} />

          {/* Collection detail — one template each, data-driven */}
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/alternatives/:slug" element={<AlternativePage />} />
          <Route path="/company-values/:slug" element={<TDetail collection="values" />} />
          <Route path="/customer-success-stories/:slug" element={<CaseStudyPage />} />
          <Route path="/employee-recognition-messages/:slug" element={<TDetail collection="messages" />} />
          <Route path="/employee-recognition/glossary/:slug" element={<TDetail collection="glossary" />} />
          <Route path="/employee-recognition/for/:slug" element={<TDetail collection="for" />} />
          <Route path="/employee-recognition/:slug" element={<PagePending />} />
          <Route path="/partners/:slug" element={<PartnerPage />} />

          <Route path="*" element={<PagePending />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
