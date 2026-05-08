# Software Requirements Specification (SRS)

## QADAM Digital Website

### Version

1.0

### Project Name

QADAM Digital - Education & Digital Services Website

### Prepared For

QADAM Digital

### Purpose

This Software Requirements Specification defines the complete functional, non-functional, technical, and content requirements for the QADAM Digital website. The platform will provide educational, digital, technology, database, online subscription, and marketing service solutions for users in Afghanistan, Pakistan, and international markets.

The website must be modern, premium, multilingual, responsive, secure, SEO optimized, and easy to manage through an admin panel.

---

## 1. Introduction

### 1.1 Project Overview

QADAM Digital is a professional digital services platform focused on education, scholarship support, document services, website development, database solutions, digital subscription guidance, social media marketing, and consulting services.

The website will act as the main online presence for QADAM Digital. It will allow visitors to explore services, view scholarship opportunities, request help, upload documents, contact the team, read articles, view portfolio projects, check pricing packages, and submit different service request forms.

### 1.2 Business Goals

The main goals of the website are:

- Build a trusted professional online brand for QADAM Digital.
- Present education and digital services clearly to users.
- Generate leads through contact forms and request forms.
- Provide scholarship listings with filtering and details.
- Allow users to request scholarship application support.
- Allow users to request digital subscriptions such as ChatGPT, Gemini, Coursera, Udemy, and Canva Pro.
- Allow businesses and institutions to request website and database solutions.
- Promote social media marketing services.
- Display pricing packages for services.
- Publish blogs and educational articles.
- Support future monetization through Google Ads and sponsored ads.
- Provide an admin panel for managing content and user requests.

### 1.3 Target Audience

The target users include:

- Students looking for scholarships.
- Students needing CVs, motivation letters, and translation services.
- Afghan and Pakistani users needing online subscription assistance.
- Businesses needing websites.
- Clinics needing database systems.
- Schools and institutes needing management systems.
- Shops needing inventory databases.
- Users needing social media advertising and marketing support.
- International clients looking for digital service providers.

### 1.4 Scope

The system will include:

- Public multilingual website.
- Scholarship listing and details system.
- Service pages.
- Blog/articles system.
- Portfolio/projects section.
- Pricing/packages section.
- Contact and request forms.
- File upload support.
- WhatsApp integration.
- Google Ads placement areas.
- Admin dashboard.
- Backend API.
- MongoDB Atlas database.
- React frontend.
- Python Flask backend.

---

## 2. Technology Requirements

### 2.1 Frontend Technology

The frontend must be developed using:

- React.js
- Responsive CSS framework or styling solution such as Tailwind CSS, Bootstrap, CSS Modules, or another suitable modern approach
- React Router for page routing
- Form handling and validation library if required
- Multilingual/internationalization support library such as i18next or equivalent

### 2.2 Backend Technology

The backend must be developed using:

- Python
- Flask framework
- Flask REST API architecture
- JWT-based authentication for admin users
- Secure file upload handling
- Email or notification integration for form submissions if required

### 2.3 Database Technology

The database must use:

- MongoDB Atlas as the cloud database
- Collections for users, scholarships, blogs, services, portfolio projects, forms, pricing packages, testimonials, ads, and site settings

### 2.4 Hosting and Deployment

The system should support deployment using:

- Frontend hosting such as Vercel, Netlify, or VPS
- Backend hosting such as Render, Railway, VPS, or cloud server
- MongoDB Atlas cloud database
- Secure HTTPS configuration
- Environment variables for secrets and credentials

### 2.5 Future CMS Consideration

Although the original preference mentioned WordPress, this version of the project will be implemented as a custom web application using React, Python Flask, and MongoDB Atlas. The admin panel will provide CMS-like functionality for managing website content.

---

## 3. Website Type and Branding

### 3.1 Website Type

The website must be:

- Professional digital services website.
- Multilingual website.
- Responsive website for mobile, tablet, and desktop.
- SEO-friendly website.
- Lead generation platform.
- Content management platform.
- Educational and technology services platform.

### 3.2 Supported Languages

The website must support:

- English
- Pashto
- Dari

Users must be able to switch languages from the website header or another clearly visible language switcher.

### 3.3 Brand Identity

Brand details:

- Brand Name: QADAM Digital
- Tagline: Education & Digital Services
- Main colors: Dark Blue, Gold, White
- Visual style: Modern, premium, clean, trustworthy, education-focused, and technology-inspired
- Logo style: Modern technology and education inspired

### 3.4 Design Requirements

The UI/UX must be:

- Clean and professional.
- Premium and trustworthy.
- Easy to navigate.
- Mobile-first and responsive.
- Fast loading.
- Accessible and readable.
- Consistent across all pages.
- Suitable for education, technology, and business users.

---

## 4. User Roles

### 4.1 Guest Visitor

A guest visitor can:

- View public pages.
- Switch website language.
- View services.
- View scholarship listings.
- Filter scholarships.
- View scholarship details.
- Submit contact forms.
- Submit service request forms.
- Upload documents where required.
- Click WhatsApp contact buttons.
- Read blogs.
- View portfolio projects.
- View pricing packages.
- View ads and sponsored content.

### 4.2 Registered User or Applicant

If registration is enabled, a registered user can:

- Create an account.
- Login.
- Submit applications or requests.
- Track request status if this feature is added.
- Update personal information.
- Upload documents.

### 4.3 Admin

An admin can:

- Login securely.
- Manage dashboard content.
- Add, edit, delete, and publish scholarships.
- Manage service pages.
- Manage blogs/articles.
- Manage portfolio projects.
- Manage pricing packages.
- Manage contact requests.
- Manage scholarship application requests.
- Manage subscription requests.
- Manage website project requests.
- Manage database project requests.
- Manage student registration forms.
- Manage social media marketing requests.
- Manage testimonials.
- Manage ads and promotional banners.
- Manage multilingual content.
- Manage uploaded files.
- Manage users if registration is enabled.

---

## 5. Public Website Pages

### 5.1 Home Page

The Home page must include:

- Header with logo, navigation menu, language switcher, and CTA button.
- Hero section with strong headline and subtitle.
- CTA buttons such as "Explore Services", "Apply With Us", and "Contact on WhatsApp".
- Services overview cards.
- Featured scholarships section.
- Why choose us section.
- Website and database solutions preview.
- Digital subscription services preview.
- Portfolio/project preview.
- Testimonials section.
- Pricing or package preview.
- Google Ads or promotional banner placement.
- WhatsApp floating contact button.
- Footer with contact information and social media links.

### 5.2 About Us Page

The About Us page must include:

- Introduction to QADAM Digital.
- Mission and vision.
- Brand values.
- Explanation of education and digital services.
- Why users should trust QADAM Digital.
- Team section if required.
- Contact CTA.

### 5.3 Services Page

The Services page must include an overview of all main services:

- Scholarship Guidance & Application Services
- CV & Motivation Letter Writing
- Document Translation Services
- Website Development Services
- Database Development Services
- Digital Subscription Guidance
- Educational & Digital Consulting
- Social Media Marketing Services

Each service must have a title, description, icon/image, CTA, and optional pricing link.

### 5.4 Scholarships Page

The Scholarships page must include:

- Scholarship listing system.
- Search bar.
- Country filter.
- Degree filter for BS, MS, and PhD.
- Deadline filter.
- Category or field filter if required.
- Scholarship cards.
- Apply Now button.
- Details button.
- Google Ads/banner slot.

### 5.5 Scholarship Details Page

Each scholarship details page must include:

- Scholarship title.
- Country.
- University or organization.
- Degree level.
- Funding type.
- Deadline.
- Eligibility criteria.
- Required documents.
- Application steps.
- Benefits.
- Official link if available.
- Apply with QADAM Digital CTA.
- WhatsApp CTA.
- Related scholarships.
- Google Ads/sidebar or inline ad slot.

### 5.6 Website & Database Solutions Page

This page must describe:

- Business website development.
- Company websites.
- Personal portfolio websites.
- E-commerce websites.
- Clinic database systems.
- School/institute management systems.
- Inventory and shop databases.
- Custom database solutions.
- Project request form.
- Pricing/package preview.
- Portfolio examples.

### 5.7 CV / Translation Services Page

This page must include:

- CV writing services.
- Professional resume services.
- Motivation letter writing.
- Statement of purpose support.
- Document translation services.
- Supported languages.
- Document upload form.
- Pricing/packages.
- CTA to request service.

### 5.8 Digital Tools & Subscriptions Page

This page must include:

- ChatGPT subscription assistance.
- Gemini AI subscription guidance.
- Coursera course access assistance.
- Udemy course support.
- Canva Pro guidance.
- Educational platform subscription support.
- Subscription request form.
- Pricing information.
- Important terms and instructions.

### 5.9 Social Media Marketing Page

This page must include:

- Social media post sponsorship.
- Facebook ads management.
- Instagram ads management.
- Social media growth services.
- Followers and engagement services.
- Post boosting.
- Audience targeting.
- Content promotion services.
- Marketing packages.
- Request campaign form.

### 5.10 Pricing & Packages Page

The Pricing page must display packages for:

- Scholarship application services.
- CV and motivation letter services.
- Translation services.
- Digital subscription services.
- Website development services.
- Database development projects.
- Social media marketing packages.
- Consulting services.

Each package should include:

- Package name.
- Price.
- Included features.
- Delivery timeline if applicable.
- CTA button.
- Terms or notes if needed.

### 5.11 Portfolio / Projects Page

The Portfolio page must include:

- Project listings.
- Project category filters.
- Website project examples.
- Database project examples.
- Design or marketing examples if available.
- Project details modal or page.
- CTA to request a similar project.

### 5.12 Blog / Articles Page

The Blog page must include:

- Blog/article listing.
- Categories.
- Search.
- Featured articles.
- SEO-friendly article pages.
- Google Ads placements.
- Social sharing buttons.

### 5.13 Contact Us Page

The Contact page must include:

- Contact form.
- WhatsApp link/button.
- Email address.
- Phone number if available.
- Office/location information if available.
- Social media links.
- Map embed if required.
- Service selection dropdown.

---

## 6. Forms and Request Systems

### 6.1 General Contact Form

Fields:

- Full name
- Email
- Phone/WhatsApp number
- Country
- Message
- Preferred service
- Preferred contact method

### 6.2 Apply With Us Scholarship Form

Fields:

- Full name
- Email
- WhatsApp number
- Country
- Target country
- Degree level
- Field of study
- Last qualification
- GPA/marks if required
- English test status if required
- Selected scholarship if applicable
- Document upload
- Message or notes

### 6.3 Subscription Request Form

Fields:

- Full name
- WhatsApp number
- Email
- Country
- Required platform
- Subscription type
- Duration
- Payment method if required
- Notes

### 6.4 Student Registration Form

Fields:

- Full name
- Father name if required
- Email
- Phone/WhatsApp number
- Country
- City
- Education level
- Interested service
- Notes

### 6.5 Website Project Request Form

Fields:

- Full name
- Business/organization name
- Email
- WhatsApp number
- Website type
- Required pages/features
- Budget range
- Deadline
- Reference website links
- File upload if required
- Project details

### 6.6 Database Project Request Form

Fields:

- Full name
- Organization/business name
- Email
- WhatsApp number
- Database type
- Required modules
- Number of users
- Current system details
- Budget range
- Deadline
- Project description

### 6.7 Social Media Marketing Request Form

Fields:

- Full name
- Business/page name
- Email
- WhatsApp number
- Platform
- Service type
- Campaign goal
- Target audience
- Budget
- Campaign duration
- Notes

### 6.8 File Upload Requirements

The system must support file uploads for:

- CVs
- Academic documents
- Passports/IDs if required
- Certificates
- Translation files
- Project requirement documents
- Images or assets for marketing campaigns

Allowed file formats should include:

- PDF
- DOC
- DOCX
- JPG
- JPEG
- PNG

The backend must validate:

- File type.
- File size.
- Safe filename.
- Storage location.
- Access permissions.

---

## 7. Admin Panel Requirements

### 7.1 Admin Authentication

The admin panel must include:

- Secure login.
- JWT authentication.
- Password hashing.
- Protected admin routes.
- Logout option.
- Optional password reset.

### 7.2 Dashboard

The dashboard must show:

- Total scholarship posts.
- Total contact requests.
- Total service requests.
- Total subscription requests.
- Total project requests.
- Total blogs.
- Recent submissions.
- Quick actions.

### 7.3 Scholarship Management

Admin must be able to:

- Add scholarship.
- Edit scholarship.
- Delete scholarship.
- Publish/unpublish scholarship.
- Add country, degree, deadline, university, funding type, eligibility, documents, and details.
- Upload scholarship image/banner.

### 7.4 Blog Management

Admin must be able to:

- Add blog articles.
- Edit articles.
- Delete articles.
- Publish/unpublish articles.
- Add categories.
- Add SEO title and description.
- Upload featured image.

### 7.5 Portfolio Management

Admin must be able to:

- Add portfolio projects.
- Edit projects.
- Delete projects.
- Add project category.
- Upload project images.
- Add project description, technologies, and client type.

### 7.6 Service Management

Admin must be able to:

- Add/edit service information.
- Manage service categories.
- Manage service descriptions.
- Manage service images/icons.
- Manage service CTAs.

### 7.7 Pricing Management

Admin must be able to:

- Add packages.
- Edit packages.
- Delete packages.
- Set price.
- Add package features.
- Add category.
- Enable/disable package visibility.

### 7.8 Request Management

Admin must be able to view and manage:

- Contact requests.
- Scholarship application requests.
- Subscription requests.
- Student registrations.
- Website project requests.
- Database project requests.
- Social media marketing requests.
- Uploaded files.

Admin should be able to update request status, such as:

- New
- In Review
- Contacted
- In Progress
- Completed
- Rejected/Closed

### 7.9 Ads and Banner Management

Admin must be able to:

- Add Google AdSense code or ad slot configuration.
- Add promotional banners.
- Enable/disable ads by page.
- Manage sponsored content blocks.
- Add internal service promotion banners.

---

## 8. Google Ads and Advertisement Requirements

### 8.1 Ad Placement Areas

The website must include planned ad spaces for:

- Home page promotional banner.
- Scholarship listing page banner.
- Scholarship details page sidebar or inline ad.
- Blog listing page banner.
- Blog article top, middle, and bottom ad sections.
- Service page promotional blocks.
- Mobile responsive ad slots.

### 8.2 Supported Ad Types

The system should support:

- Google AdSense ads.
- Sponsored banners.
- Partner platform advertisements.
- Internal QADAM Digital promotions.
- Scholarship/course advertisements.
- Social media campaign banners.

### 8.3 Ad Display Rules

Ads must:

- Not damage the premium and professional look of the website.
- Be responsive on all devices.
- Not block important content.
- Not use intrusive popups unless explicitly required.
- Be manageable from the admin panel where possible.

---

## 9. Functional Requirements

### 9.1 Navigation

The website must provide:

- Header navigation.
- Footer navigation.
- Mobile hamburger menu.
- Clear CTAs.
- Language switcher.
- Breadcrumbs on details pages if required.

### 9.2 Multilingual Functionality

The system must:

- Support English, Pashto, and Dari.
- Allow users to switch language.
- Display translated labels, navigation, forms, and content.
- Support right-to-left layout for Pashto and Dari where required.
- Allow admin to manage multilingual content if implemented in admin panel.

### 9.3 Search and Filters

The system must provide:

- Scholarship search.
- Scholarship country filter.
- Scholarship degree filter.
- Scholarship deadline filter.
- Blog search.
- Blog category filter.
- Portfolio category filter if required.

### 9.4 WhatsApp Integration

The website must include:

- Floating WhatsApp button.
- WhatsApp CTA on key pages.
- Pre-filled WhatsApp messages for service requests where possible.
- WhatsApp links on contact and service pages.

### 9.5 SEO Requirements

The website must include:

- SEO-friendly URLs.
- Meta titles.
- Meta descriptions.
- Open Graph tags.
- Structured headings.
- Sitemap support.
- Robots.txt support.
- Fast loading pages.
- Optimized images.
- Blog/article SEO fields.

### 9.6 Notifications

The system should support:

- Admin notification for new form submissions.
- Optional email notifications.
- Optional WhatsApp/manual notification workflow.
- User confirmation message after form submission.

---

## 10. Backend API Requirements

### 10.1 API Style

The backend must expose RESTful APIs using Flask.

### 10.2 Main API Modules

Required API modules:

- Authentication API
- User API
- Scholarship API
- Blog API
- Service API
- Portfolio API
- Pricing API
- Contact Request API
- Subscription Request API
- Scholarship Application API
- Website Project Request API
- Database Project Request API
- Social Media Marketing Request API
- File Upload API
- Ads API
- Settings API

### 10.3 Authentication API

Example endpoints:

- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`
- POST `/api/auth/refresh`

### 10.4 Scholarship API

Example endpoints:

- GET `/api/scholarships`
- GET `/api/scholarships/:id`
- POST `/api/admin/scholarships`
- PUT `/api/admin/scholarships/:id`
- DELETE `/api/admin/scholarships/:id`

### 10.5 Request APIs

Example endpoints:

- POST `/api/contact-requests`
- POST `/api/scholarship-applications`
- POST `/api/subscription-requests`
- POST `/api/student-registrations`
- POST `/api/website-project-requests`
- POST `/api/database-project-requests`
- POST `/api/social-media-requests`

### 10.6 Admin APIs

Admin APIs must require authentication and authorization. Admin APIs should allow content creation, updates, deletion, publishing, status management, and file management.

---

## 11. Database Requirements

### 11.1 Database Platform

The system must use MongoDB Atlas.

### 11.2 Suggested Collections

Suggested MongoDB collections:

- `users`
- `admins`
- `scholarships`
- `services`
- `blogs`
- `portfolio_projects`
- `pricing_packages`
- `testimonials`
- `contact_requests`
- `scholarship_applications`
- `subscription_requests`
- `student_registrations`
- `website_project_requests`
- `database_project_requests`
- `social_media_requests`
- `uploaded_files`
- `ads`
- `site_settings`

### 11.3 Common Fields

Most collections should include:

- `_id`
- `createdAt`
- `updatedAt`
- `createdBy`
- `updatedBy`
- `status`

### 11.4 Content Status Values

Content items may use:

- Draft
- Published
- Archived

### 11.5 Request Status Values

Request records may use:

- New
- In Review
- Contacted
- In Progress
- Completed
- Rejected
- Closed

---

## 12. Non-Functional Requirements

### 12.1 Performance

The system must:

- Load quickly on mobile and desktop.
- Optimize images and static assets.
- Use pagination for long lists.
- Cache public content where appropriate.
- Avoid unnecessary API calls.

### 12.2 Security

The system must:

- Use HTTPS in production.
- Store secrets in environment variables.
- Hash admin passwords.
- Use JWT securely.
- Validate all form inputs.
- Sanitize uploaded filenames.
- Validate uploaded file types.
- Protect admin APIs.
- Prevent common attacks such as XSS, CSRF where applicable, NoSQL injection, and file upload abuse.

### 12.3 Scalability

The system should:

- Support future service categories.
- Support future languages.
- Support increased scholarship listings.
- Support increased blog content.
- Allow future user dashboards if required.
- Support future payment integration.

### 12.4 Availability

The production website should be available 24/7 except during maintenance.

### 12.5 Usability

The website must:

- Be easy for non-technical users.
- Have clear CTAs.
- Have readable typography.
- Support mobile-first usage.
- Provide helpful success and error messages.

### 12.6 Accessibility

The website should:

- Use readable contrast.
- Support keyboard navigation where possible.
- Include alt text for images.
- Use semantic HTML.
- Provide clear form labels.

---

## 13. Content Requirements

### 13.1 Tone and Style

Website content should be:

- Professional.
- Clear.
- Trustworthy.
- Friendly.
- Educational.
- Suitable for students and businesses.

### 13.2 Required Content Categories

The website must include content for:

- Education services.
- Scholarship support.
- Digital services.
- Website development.
- Database development.
- Subscription guidance.
- Social media marketing.
- Pricing/packages.
- Blogs/articles.
- Portfolio/projects.

### 13.3 Social Media Links

The footer and contact sections should include social media links such as:

- Facebook
- Instagram
- LinkedIn
- YouTube
- TikTok if required
- WhatsApp

---

## 14. UI Components

The frontend should include reusable components such as:

- Header
- Footer
- Language switcher
- Hero section
- CTA button
- Service card
- Scholarship card
- Blog card
- Portfolio card
- Pricing card
- Testimonial card
- Contact form
- File upload input
- Filter controls
- Search input
- Pagination
- Modal
- Admin sidebar
- Admin table
- Status badge
- Ad banner component
- WhatsApp floating button

---

## 15. Admin Panel UI

The admin panel should include:

- Login page.
- Dashboard layout.
- Sidebar navigation.
- Data tables.
- Add/edit forms.
- Rich text editor for blogs and scholarship details if required.
- Image/file upload fields.
- Status update controls.
- Search and filters.
- Confirmation dialogs for delete actions.
- Responsive admin design.

---

## 16. Integrations

### 16.1 WhatsApp

WhatsApp integration must be available through:

- Floating WhatsApp button.
- Service-specific WhatsApp links.
- Contact page WhatsApp link.
- Pre-filled message text where suitable.

### 16.2 Email

Optional email integration may include:

- Contact form notification to admin.
- Request confirmation email to user.
- Admin alerts for new submissions.

### 16.3 Google Ads

The website should support:

- Google AdSense script placement.
- Page-level ad slots.
- Admin-managed ad configuration where possible.

### 16.4 Analytics

The website should support future integration with:

- Google Analytics.
- Google Search Console.
- Meta Pixel if required for ads.

---

## 17. SEO and Marketing Requirements

The website must support:

- SEO-friendly routing.
- Optimized page titles.
- Meta descriptions.
- Blog content optimization.
- Social sharing previews.
- Sitemap generation.
- Search engine indexing.
- Fast mobile performance.
- Landing pages for major services.
- Clear lead capture forms.

---

## 18. Acceptance Criteria

The project will be considered successful when:

- The website is responsive on mobile, tablet, and desktop.
- English, Pashto, and Dari language support is available.
- Public pages are implemented.
- Scholarship listing, filters, and details pages work.
- Service pages are available.
- Contact and request forms work.
- File upload works securely.
- WhatsApp integration is visible and functional.
- Pricing/packages are displayed.
- Blog and portfolio sections are available.
- Google Ads placement areas are included.
- Admin can login securely.
- Admin can manage scholarships, blogs, services, portfolio, pricing, ads, and requests.
- Backend APIs are connected to MongoDB Atlas.
- The frontend communicates correctly with the Flask backend.
- SEO structure is implemented.
- The final design looks modern, premium, clean, and trustworthy.

---

## 19. Future Enhancements

Possible future improvements include:

- Online payment integration.
- User dashboard for tracking requests.
- Advanced scholarship recommendation system.
- Live chat.
- SMS notifications.
- WhatsApp Business API integration.
- Advanced analytics dashboard.
- Role-based admin permissions.
- AI chatbot for service guidance.
- Newsletter subscription system.
- Mobile app.

---

## 20. Summary

QADAM Digital will be a complete multilingual digital services platform for education, scholarships, subscriptions, website development, database systems, social media marketing, and consulting. The platform will use a React frontend, Python Flask backend, and MongoDB Atlas database.

The website must be professional, fast, secure, scalable, SEO optimized, and easy to manage. It should provide a strong public brand presence while also offering a powerful admin panel for managing content, requests, ads, and future business growth.
