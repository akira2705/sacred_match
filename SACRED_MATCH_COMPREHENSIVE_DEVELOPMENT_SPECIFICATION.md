# SACRED MATCH - COMPREHENSIVE DEVELOPMENT SPECIFICATION & PROMPT

## EXECUTIVE SUMMARY

You are contracted to build **Sacred Match**, a premium matrimony platform designed exclusively for Nigeria's diverse population of 223 million people across 371+ ethnic groups. This platform bridges modern technology with deeply-rooted cultural matrimonial traditions, offering an innovative genotype compatibility matching feature that prevents genetic health issues while respecting ethnic, religious, and cultural preferences.

**Platform Name:** Sacred Match
**Domain:** sacred-match.ng
**Target Market:** Nigeria (primary), expansion to Ghana, Kenya, and other African nations (future)
**Business Model:** Freemium (basic matching free, premium features paid)
**Primary Users:** Marriage-minded professionals aged 18-45 seeking serious, long-term relationships
**Timeline:** 12 weeks to MVP launch
**Success Metric:** 1,000+ active users by week 8, 50%+ profile completion rate, 30%+ match acceptance rate

---

## PART 1: BUSINESS REQUIREMENTS & STRATEGY

### 1.1 Problem Statement

Nigeria's matrimony market faces several critical challenges:

1. **Cultural Fragmentation:** With 371 ethnic groups and 500+ languages, users cannot easily find compatible matches respecting their cultural and religious traditions
2. **Limited Matching Logic:** Existing platforms use superficial matching based only on age, location, and physical appearance—ignoring cultural compatibility
3. **Safety & Trust Issues:** High prevalence of catfishing, romance scams, and fraudulent profiles
4. **Genetic Health Concerns:** Sickle cell trait (genotype AS) compatibility is a major concern for Nigerian couples, yet never addressed by dating platforms
5. **Family Integration Gap:** No existing platform facilitates the formal family introduction process central to Nigerian matrimony
6. **Bride Price Negotiation:** Traditional dowry negotiations lack proper tools or guidance
7. **Urban-Rural Divide:** Matrimony platforms don't account for connectivity limitations in rural areas

### 1.2 Solution Overview

Sacred Match solves these by providing:

1. **Cultural Matching Engine:** Matches users across all 371+ ethnic groups based on ethnic group, religion, and marriage ceremony type preferences
2. **Intelligent Algorithm:** Scoring system combining cultural compatibility (40%), personal fit (30%), genotype compatibility (20%), and engagement signals (10%)
3. **Genotype Innovation:** Industry-first feature that allows users to add verified genotype information and see genetic compatibility before connecting
4. **Safety-First Design:** Mandatory email/phone/ID verification, fraud detection, admin moderation of safety reports
5. **Family Introduction Tools:** Guided workflow for requesting formal family introductions with letter templates and bride price guides
6. **Ethnic Group Guides:** Educational content on 371+ ethnic groups' marriage customs, traditions, and ceremonies
7. **Accessible Design:** Mobile-responsive, low-bandwidth compatibility, SMS/USSD fallback (future)

### 1.3 Market Positioning

**Target Positioning:** "Where Culture, Compatibility & Commitment Meet"

**Competitive Advantages:**
- Only platform supporting all 371+ Nigerian ethnic groups
- First matrimony platform with genotype compatibility matching
- Integrates family introduction workflow (unique to Nigeria/Africa)
- Bride price guides and negotiation tools by ethnic group
- Combines modern technology with deep cultural respect
- Premium safety & verification standards
- Marriage-focused (not casual dating)

**Revenue Model (Phase 1):** Freemium
- **Free Tier:** Browse profiles, like/pass matches, limited messaging (5 msgs/day), basic profile
- **Premium Tier:** Unlimited messaging, advanced filters, see who liked you, match boost, no ads (₦2,999/month or ₦29,999/year)
- **Future:** Genotype lab partnerships, wedding vendor commissions, premium profile verification badges

### 1.4 Core User Personas

**Persona 1: Ayo (Urban Professional)**
- Age: 28, Male, Yoruba ethnicity, Christian
- Location: Lagos, Marketing Manager at tech company
- Motivations: Find serious marriage partner within 12 months, respects Yoruba traditions, wants spouse with similar education level
- Tech Comfort: Very high, uses multiple apps daily
- Concerns: Authenticity of profiles, wants verified users only

**Persona 2: Zainab (Traditional Values)**
- Age: 25, Female, Hausa-Fulani ethnicity, Muslim
- Location: Kano, Accountant, family-oriented
- Motivations: Parent-approved marriage, respects Islamic traditions, wants Islamic Nikah ceremony
- Tech Comfort: Moderate, uses smartphone but not tech-savvy
- Concerns: Family acceptance, proper courtship process, genotype compatibility for healthy children

**Persona 3: Chioma (Progressive Modern)**
- Age: 32, Female, Igbo ethnicity, Christian
- Location: Abuja, Entrepreneur, independent-minded
- Motivations: Find equal partner, open to cross-ethnic marriage, wants customary + Christian wedding, interested in genotype info
- Tech Comfort: Very high, early adopter
- Concerns: Finding marriage-minded (not casual daters), ensuring cultural respect despite modernism

**Persona 4: Tunde (Conservative Approach)**
- Age: 35, Male, Yoruba ethnicity, Traditional religion practitioner
- Location: Ibadan, Business owner, family-centered
- Motivations: Arranged matching with family involvement, respects customary marriage traditions, wants strong cultural alignment
- Tech Comfort: Low-moderate, needs simple interface
- Concerns: Platform must facilitate family involvement, proper bride price negotiation

---

## PART 2: FUNCTIONAL REQUIREMENTS - DETAILED SPECIFICATIONS

### 2.1 LANDING PAGE (High-Impact Entry Point)

#### 2.1.1 Navigation Bar (Fixed, Responsive)
- **Logo:** Sacred Match brand mark (left side)
- **Desktop Navigation:** 
  - Browse (unauthenticated shows preview)
  - About Us
  - How It Works
  - Genotype Feature (dedicated link)
  - Blog/Resources
  - Contact
- **Authentication Buttons:**
  - "Sign Up" (CTA button, prominent color)
  - "Log In" (secondary button)
- **Mobile:** Hamburger menu with all navigation items
- **Responsive Behavior:** Stack vertically on mobile, horizontal on tablet+
- **Implementation:** Sticky navigation, shadow on scroll, stays visible

#### 2.1.2 Hero Section (Above-the-fold)
- **Background:** 
  - Option A: Vibrant background with Nigerian cultural elements (subtle patterns)
  - Option B: High-quality couple photo (diverse ethnicities, verified stock image)
  - Overlay: Semi-transparent dark gradient (ensure text readability)
- **Content:**
  - **Headline:** "Where Culture, Compatibility & Commitment Meet"
  - **Subheadline:** "Find your perfect match across Nigeria's 371+ ethnic groups. Real people. Real traditions. Real connections."
  - **CTA Buttons:**
    - Primary: "Get Started" (link to signup) - vibrant color
    - Secondary: "Learn How It Works" (scroll to features)
- **Search Preview (Optional):**
  - Simplified filter preview (age range, ethnic group, location)
  - "See Matches Like These" CTA
- **Design:** Centered content, mobile-optimized font sizes
- **Animation:** Subtle fade-in on page load, smooth transitions

#### 2.1.3 Features Showcase Section
Display 6 key features in card/grid format (3 columns on desktop, 1 on mobile):

**Card 1: Browse 371+ Ethnic Groups**
- Icon: Globe/diversity icon
- Title: "All of Nigeria's Cultures"
- Description: "Find matches across all 371+ recognized ethnic groups. Whether you're Yoruba, Igbo, Hausa-Fulani, Tiv, Efik, or any other group, Sacred Match respects your cultural identity."
- CTA: "See All Groups"

**Card 2: Intelligent Matching Algorithm**
- Icon: Brain/matching icon
- Title: "Smart Cultural Matching"
- Description: "Our algorithm considers ethnic group, religion, marriage type, genotype, and personal preferences to recommend truly compatible matches—not just age + location."
- CTA: "How It Works"

**Card 3: Genotype Compatibility (INNOVATION)**
- Icon: DNA helix
- Title: "Genetic Compatibility Check 🧬"
- Description: "First matrimony platform to integrate genotype matching. Prevent sickle cell trait issues. Compare genotypes (AA/AS/SS) with matches. Your relationship, informed decisions."
- CTA: "Learn About Genotype"
- Badge: "Industry First"

**Card 4: Family Introduction Tools**
- Icon: Family/hands icon
- Title: "Involve Your Family"
- Description: "Formal introduction requests with guided templates. Bride price negotiation tools. Ceremony planning checklist. Everything you need for traditional family involvement."
- CTA: "See Family Tools"

**Card 5: Verified Profiles Only**
- Icon: Shield/checkmark
- Title: "Safety & Trust First"
- Description: "Email verification, phone verification, government ID verification, and photo verification. Anti-catfishing technology. Report & block features. Your safety is non-negotiable."
- CTA: "Our Safety Standards"

**Card 6: Real Testimonials**
- Icon: Star/testimonial
- Title: "Real People. Real Stories."
- Description: "Join thousands who found their perfect match on Sacred Match. Read real testimonials from engaged and married couples."
- CTA: "Success Stories"

#### 2.1.4 Genotype Feature Deep-Dive Section
Large dedicated section explaining the genotype innovation:

**Section Layout:**
- **Left Side (60%):** 
  - Headline: "🧬 The Genotype Compatibility Feature - Our Industry-First Innovation"
  - Subheading: "Make informed decisions about your genetic compatibility"
  - Content:
    - "What is Genotype?" (AA/AS/SS explained)
    - "Why Does It Matter?" (Sickle cell trait explanation)
    - "How It Works on Sacred Match" (step-by-step)
    - "Privacy & Control" (users choose what to share)
  - CTA: "Get Tested" (link to testing labs)

- **Right Side (40%):**
  - Interactive genotype compatibility chart (visual table)
  - Color-coded compatibility (Green=✓ Safe, Yellow=⚠ Caution, Red=✗ Risk)
  - Quick compatibility checker tool (user inputs both genotypes, shows result)
  - Educational videos (embedded YouTube)

**Genotype Compatibility Chart Explanation:**
```
AA + AA = ✓✓ 100% Healthy (No risk)
AA + AS = ✓ Healthy Babies Possible (Low risk)
AA + SS = ✓ All Children AS (Carriers, healthy)
AS + AS = ⚠ 25% Risk of SS (Medium risk - counseling recommended)
AS + SS = ✗ 50% SS Risk (High risk)
SS + SS = ✗ 100% SS (Very high risk - both have sickle cell)
```

**Educational Content:**
- What does AA mean? What does AS mean? What does SS mean?
- Why is AS + AS risky?
- Can I still marry if genotypes are incompatible?
- How to get tested?
- Privacy: Will my genotype be visible to everyone?

#### 2.1.5 Testimonials & Success Stories Carousel
- **Format:** Carousel/swiper with 6-8 testimonials
- **Per Card:**
  - Couple photo (both verified)
  - Names + ethnicities (e.g., "Ayo (Yoruba) & Nkechi (Igbo)")
  - Quote (2-3 sentences): "We met on Sacred Match and were matched across ethnic lines. Thanks to the family introduction tools, our families met, loved each other, and now we're engaged!"
  - How they met: "Matched through cultural compatibility"
  - Timeline: "Engaged within 6 months"
  - Star rating (5 stars)
  - CTA: "Read Their Full Story" (link to blog post)
- **Auto-rotation:** Slide changes every 5 seconds, pause on hover
- **Mobile:** 1 card visible, swipe to navigate
- **Desktop:** 3 cards visible, prev/next arrows

#### 2.1.6 Trust & Safety Signals Section
- **Headline:** "Your Safety is Sacred"
- **Stats Row:**
  - "100% Profile Verification" (everyone verified)
  - "250K+ Matches Made" (made-up but realistic number)
  - "4.8/5 Stars" (app store rating)
  - "Trusted by 50K+ Users" (monthly active)
- **Trust Badges:** Display logos of security certifications (SSL, GDPR, NDPR)
- **Safety Features Grid:**
  - Email verification
  - SMS verification
  - Government ID verification
  - Photo anti-catfishing
  - Fraud detection
  - 24/7 moderation
  - Block & report features
  - Privacy controls

#### 2.1.7 Blog/Resources Preview
- **Headline:** "Learn About Marriage, Culture & Compatibility"
- **Featured Articles Grid (3 columns):**
  - Article 1: "Understanding Genotypes: AA, AS, SS Explained"
  - Article 2: "Yoruba Marriage Traditions: From Bride Price to Ceremony"
  - Article 3: "Cross-Ethnic Marriages in Nigeria: Making It Work"
  - Article 4: "Islamic Nikah vs. Customary Marriage: Choosing Your Path"
  - Article 5: "First Week After Getting Engaged: Family Introduction Checklist"
  - Article 6: "Safety Tips: How to Spot Romance Scams"
- **Each Card:**
  - Featured image
  - Title
  - Brief excerpt (1 sentence)
  - Read time (e.g., "5 min read")
  - Category tag (Culture, Guide, Safety, Tips)
  - CTA: "Read More"
- **"View All" CTA:** Link to blog home

#### 2.1.8 FAQ Section (Accordion)
**Frequently Asked Questions:**

1. **"What makes Sacred Match different from other dating apps?"**
   - Answer: We're specifically built for Nigerian matrimony, supporting all 371+ ethnic groups, 4 marriage ceremony types, and offering genotype compatibility—the first platform to do so.

2. **"Is my genotype information private?"**
   - Answer: Completely. You control genotype visibility: show to all matches, only to serious matches, or hide completely.

3. **"How does the matching algorithm work?"**
   - Answer: We score matches on 4 factors: cultural compatibility (ethnic group + religion + marriage type), personal fit (age/education/location), genotype compatibility, and engagement signals. Matches with 70+ scores are recommended.

4. **"How do I request a family introduction?"**
   - Answer: Once matched and confirmed interest, click "Request Family Introduction." We guide you through the process with templates, bride price guides, and ceremony planning tools.

5. **"I'm not interested in genotype matching—do I have to participate?"**
   - Answer: No. Genotype is optional. You can choose to add it, hide it, or ignore it entirely. Your match preference controls the feature.

6. **"What if I'm a cross-ethnic/interfaith couple?"**
   - Answer: Sacred Match celebrates cross-ethnic and interfaith matches. Choose "Open to all ethnic groups" and "Interfaith OK" in preferences.

7. **"How much does it cost?"**
   - Answer: Browsing profiles and matching are FREE. Premium features (unlimited messaging, advanced filters) cost ₦2,999/month or ₦29,999/year.

8. **"Is my data safe?"**
   - Answer: Yes. We use AES-256 encryption, comply with GDPR and Nigeria Data Protection Regulation, and never sell data. All profiles are verified to prevent fraud.

- **UI:** Expandable accordion with smooth animations
- **Search Function:** Searchable FAQ (filter by keyword)
- **Mobile:** Single-column layout, expand on tap

#### 2.1.9 Call-to-Action Section (Pre-Footer)
- **Headline:** "Ready to Find Your Match?"
- **Subheading:** "Join 50,000+ Nigerians Looking for Serious Relationships"
- **CTA Buttons:**
  - Primary: "Sign Up Now" (high contrast)
  - Secondary: "Browse As Guest" (see matches without account)
- **Stats:**
  - "50K+ Active Users"
  - "3,500+ Matches Per Day"
  - "800+ Engagements This Year"

#### 2.1.10 Footer
- **Column 1: Product**
  - About Sacred Match
  - How It Works
  - Genotype Feature
  - Blog
  - FAQ

- **Column 2: Company**
  - About Us
  - Careers
  - Press
  - Contact

- **Column 3: Legal & Privacy**
  - Privacy Policy
  - Terms of Service
  - Data Protection
  - Cookie Policy
  - GDPR Compliance

- **Column 4: Safety & Support**
  - Report a User
  - Safety Tips
  - Help & Support
  - Contact Support
  - Feedback

- **Social Media Links:** Facebook, Instagram, Twitter, TikTok, LinkedIn

- **Newsletter:** "Get Dating Tips & Cultural Guides"
  - Email input + subscribe button
  - Privacy note: "We'll never spam you"

- **Bottom Bar:**
  - Copyright: "© 2024 Sacred Match Nigeria. All rights reserved."
  - Language selector (English, Hausa, Yoruba, Igbo - future)
  - "Back to Top" button

---

### 2.2 AUTHENTICATION SYSTEM (Detailed Implementation)

#### 2.2.1 Sign Up Page - Complete Specification

**Page Layout:**
- **Left Side (60%):** Sign up form
- **Right Side (40%):** Marketing content/image (desktop only)
- **Mobile:** Full-width form, image hidden

**Form Fields & Validation:**

1. **Email Address Input**
   - Field Type: Email input
   - Placeholder: "name@example.com"
   - Validation:
     - Required (cannot be empty)
     - Must be valid email format (regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
     - Must not already exist in system (check via API call with debounce)
   - Error Messages:
     - Empty: "Email is required"
     - Invalid format: "Please enter a valid email address"
     - Already exists: "Email already registered. Try logging in instead."
   - On Focus: Show tooltip "We'll verify this email to ensure authenticity"
   - Real-time validation: Check existence after 2-second pause (debounce)

2. **Phone Number Input**
   - Field Type: Tel input with country prefix
   - Default Prefix: +234 (Nigeria)
   - Format: +234 901 2345 678
   - Placeholder: "901 2345 678"
   - Validation:
     - Required
     - Must be valid Nigerian format (+234 or 0)
     - Length: 10 digits (without +234)
     - Must not already exist
   - Error Messages:
     - Empty: "Phone number is required"
     - Invalid format: "Phone must be in format +234 or 0xxx xxxx xxx"
     - Already exists: "Phone already registered"
   - Tooltip: "We'll send you an OTP code for verification"
   - Format automatically: Auto-format as user types

3. **Password Input**
   - Field Type: Password input (masked)
   - Placeholder: "Create a strong password"
   - Validation:
     - Required
     - Minimum 8 characters
     - Must contain: uppercase, lowercase, number, special character
   - Error Messages:
     - Empty: "Password is required"
     - Too short: "Password must be at least 8 characters"
     - Missing uppercase: "Add at least one uppercase letter"
     - Missing lowercase: "Add at least one lowercase letter"
     - Missing number: "Add at least one number"
     - Missing special char: "Add at least one special character (!@#$%^&*)"
   - Password Strength Meter (under field):
     - Weak (red): Shows password doesn't meet requirements
     - Fair (yellow): Meets minimum requirements
     - Strong (green): Exceeds requirements
   - Show/Hide Toggle: Eye icon to toggle password visibility
   - Tooltip: "Strong password = numbers, uppercase, special characters"

4. **Confirm Password Input**
   - Field Type: Password input (masked)
   - Placeholder: "Confirm your password"
   - Validation:
     - Required
     - Must match password field exactly
   - Error Messages:
     - Empty: "Please confirm your password"
     - Mismatch: "Passwords do not match"
   - Show/Hide Toggle: Eye icon

5. **First Name Input**
   - Field Type: Text input
   - Placeholder: "Your first name"
   - Validation:
     - Required
     - Minimum 2 characters
     - Maximum 50 characters
     - Only letters, hyphens, spaces allowed
   - Error Messages:
     - Empty: "First name is required"
     - Too short: "First name must be at least 2 characters"
     - Invalid characters: "First name can only contain letters and hyphens"

6. **Last Name Input**
   - Field Type: Text input
   - Placeholder: "Your last name"
   - Validation:
     - Required
     - Minimum 2 characters
     - Maximum 50 characters
     - Only letters, hyphens, spaces allowed
   - Error Messages: Same as first name

7. **Terms & Conditions Checkbox**
   - Label: "I agree to the Terms of Service and Privacy Policy"
   - Links: Underlined, open in new tab
   - Required: Must be checked to proceed
   - Error: "You must agree to terms to continue"

8. **Newsletter Checkbox**
   - Label: "Send me dating tips, cultural guides, and new feature updates"
   - Optional: Pre-checked but user can uncheck
   - No error if unchecked

**Submit Button:**
- Label: "Create My Account"
- State: Disabled until all required fields filled + validation passed
- Loading State: Shows spinner, text changes to "Creating account..."
- Click Behavior: Disable button to prevent double submission
- Error Handling: Display error message below form (red background)
- Success: Navigate to OTP verification page

**Form Behavior:**
- Real-time validation: Validate as user leaves each field
- Show validation icons: Green checkmark when valid, red X when invalid
- Error messages appear below field in red text
- Form remembers email/name if validation error occurs (don't clear)
- CAPTCHA: Recaptcha v3 on submit (prevent bot signups)

**Social Sign Up (Optional - Phase 1+):**
- Alternative: "Or sign up with"
- Buttons: Google, Facebook
- Same fields still required after social login

**Right Side Content (Desktop):**
- Headline: "Join 50K+ Nigerians"
- Subheading: "Finding their perfect match on Sacred Match"
- List of benefits:
  - ✓ Browse 371+ ethnic groups
  - ✓ Genotype compatibility matching
  - ✓ Verified profiles only
  - ✓ Family introduction tools
  - ✓ Free to start
- Testimonial: Quote from happy couple
- Stats: "3,500+ matches daily"

**Already Have Account:**
- Link: "Already have an account? Log in" (styled as link, not button)
- Color: Primary brand color
- Position: Below submit button

---

#### 2.2.2 Sign Up Success & OTP Verification

**After Form Submission:**

1. **Loading Screen (1-2 seconds):**
   - Show spinner
   - Message: "Setting up your account..."

2. **OTP Selection Screen:**
   - Headline: "Choose verification method"
   - Radio buttons:
     - Option A: "Send OTP to email (name@example.com)"
     - Option B: "Send OTP to SMS (+234..."
   - Submit Button: "Send Code"

3. **OTP Input Screen:**
   - Headline: "Enter verification code"
   - Subheading: "We sent a 6-digit code to your [email/phone]"
   - OTP Input Field:
     - 6 separate digit input boxes (auto-focus next box after digit entry)
     - Auto-paste if user copies code
   - Countdown Timer: "Code expires in: 9:45" (10 minutes)
   - Verification Button: "Verify" (disabled until 6 digits entered)
   - Resend Link: "Didn't receive code? Resend" (disabled for 60 seconds after send, shows countdown)
   - Edit Link: "Change email/phone?" (link back to select OTP method)

**OTP Verification Backend:**
- Generate 6-digit random code
- Store hash in database (not plain text)
- Set expiry: 10 minutes
- Send via SendGrid (email) or Twilio (SMS)
- Track attempts: 3 incorrect attempts = 30 min lockout
- Single use: Code invalid after successful use

**Verification Success:**
- Generate JWT token (24-hour expiry)
- Redirect to profile setup page
- Display success message: "Account verified! Let's complete your profile."

**Verification Failure:**
- Show error: "Invalid code. Please try again."
- Allow 3 attempts before locking (30 min lockout)
- After lockout: "Too many attempts. Please resend code."

---

#### 2.2.3 Login Page

**Form Fields:**

1. **Email or Phone Input**
   - Label: "Email or Phone"
   - Placeholder: "name@example.com or +234 901..."
   - Validation: Check if format matches email or phone
   - Error: "Please enter valid email or phone"
   - Auto-detect: Determine if input is email or phone

2. **Password Input**
   - Placeholder: "Your password"
   - Show/Hide toggle
   - Validation: Required
   - Error: "Password is required"

**Remember Me Checkbox**
- Label: "Keep me signed in for 30 days"
- If checked: Set longer cookie expiry (30 days)
- Default: Unchecked for security

**Submit Button:**
- Label: "Log In"
- Loading: Show spinner while authenticating

**Login Logic Backend:**
1. Find user by email or phone
2. Compare password hash (bcrypt.compare)
3. Rate limiting: 5 attempts = 15 min lockout
4. If success:
   - Generate JWT token (24-hour expiry, or 30 days if "remember me")
   - Update last_login timestamp
   - Redirect to dashboard
5. If failure:
   - Display error: "Invalid email/phone or password"
   - Increment attempt counter

**Account Locked Display:**
- "Too many login attempts. Please try again in 15 minutes."
- Or: "Your account is locked. Contact support."

**Forgot Password Link:**
- "Forgot password?" (link below password field)
- Navigate to forgot password page

**Sign Up Link:**
- "Don't have an account? Sign up" (below submit button)

---

#### 2.2.4 Forgot Password Flow

**Step 1: Enter Email**
- Input: Email address
- Validation: Must exist in system
- Error: "Email not found" or "No account with this email"
- Submit: "Send Reset Email"

**Step 2: Check Email**
- Message: "Password reset link sent to [email]"
- Countdown: "This link expires in 24 hours"
- "Didn't receive email? Resend"
- "Back to login" link

**Step 3: Reset Password (via email link)**
- User clicks link in email
- Page loads with reset form
- Fields: New password + confirm password (same validation as signup)
- Submit: "Reset Password"
- Success: "Password reset successful. Log in with your new password."
- Redirect to login

---

#### 2.2.5 Protected Routes & Token Management

**JWT Token Structure:**
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890 + (24 * 60 * 60)
}
```

**Token Storage:**
- Frontend: localStorage (with optional sessionStorage for sensitive)
- Not in cookies (to prevent CSRF)
- Clear on logout
- Check token on app load (if valid, restore session)

**API Authentication:**
- Include token in Authorization header: `Authorization: Bearer <token>`
- Axios interceptor adds token automatically
- Remove token from headers if 401 response (token expired)

**Protected Routes:**
- `/dashboard` - Requires authenticated user
- `/profile` - Requires authenticated user
- `/matches` - Requires authenticated user
- `/messages` - Requires authenticated user
- `/settings` - Requires authenticated user
- If not authenticated: Redirect to login

**Session Management:**
- Check token expiry on app load
- If expired: Redirect to login, show message "Session expired. Please log in again."
- If within 5 minutes of expiry: Show warning modal "Your session will expire in 5 minutes. Renew?" with "Renew" and "Logout" buttons
- Renew action: Call refresh token endpoint, get new token

---

### 2.3 PROFILE CREATION (7-Step Wizard)

#### 2.3.1 Profile Wizard Overview

**Page Structure:**
- Progress bar at top (showing current step out of 7)
- Step title + description
- Form fields for current step
- Navigation buttons (Back, Next/Continue)
- "Skip for now" option (except required steps like photos)
- Step counter: "Step 2 of 7"

**Step Progression:**
1. Personal Information
2. Ethnic Group Selection
3. Religion Selection
4. Marriage Type Preference
5. Photo Upload
6. Genotype Information
7. Government ID Verification

**Auto-save Behavior:**
- Save each step's data as user completes it
- Show "Saving..." message briefly
- Continue even if save fails (allow retry)
- Don't lose data if user navigates away

---

#### 2.3.2 Step 1: Personal Information

**Form Fields:**

1. **Date of Birth**
   - Field Type: Date picker
   - Format: DD/MM/YYYY
   - Validation:
     - Required
     - Must be 18+ years old (calculated from DOB)
     - Must be realistic (not before 1950)
   - Error Messages:
     - "Must be 18 years or older"
     - "Please enter a valid date"
   - Age Display: Show calculated age (e.g., "Age: 28") below field

2. **Gender**
   - Field Type: Radio buttons (3 options)
   - Options:
     - Male
     - Female
     - Prefer not to say
   - Validation: Required
   - Error: "Please select a gender"

3. **Height**
   - Field Type: Dropdown
   - Format: CM (centimeters)
   - Options: 145cm to 220cm (in 5cm increments)
   - Placeholder: "Select height"
   - Validation: Required (if users can filter by it)
   - Display: Show feet+inches equivalent below (e.g., "5'10\"")

4. **Body Type**
   - Field Type: Dropdown
   - Options:
     - Slim
     - Average
     - Athletic
     - Heavy
     - Prefer not to say
   - Validation: Optional
   - Placeholder: "Select body type (optional)"

5. **Location: State**
   - Field Type: Dropdown with search
   - Options: All 36 states + FCT (alphabetically sorted)
   - Validation: Required
   - Placeholder: "Select state"
   - Searchable: Filter states as user types
   - Error: "Please select a state"

6. **Location: LGA (Local Government Area)**
   - Field Type: Dropdown (populated based on selected state)
   - Validation: Optional
   - Placeholder: "Select LGA (optional)"
   - Searchable: Filter LGAs as user types
   - Populate: Once state selected, show LGAs for that state

7. **Education Level**
   - Field Type: Dropdown
   - Options:
     - Primary/Elementary
     - Secondary/High School
     - Some Tertiary
     - Bachelor's Degree
     - Master's Degree
     - PhD/Doctorate
     - Prefer not to say
   - Validation: Optional
   - Placeholder: "Select education level (optional)"

8. **Occupation/Job Title**
   - Field Type: Text input
   - Placeholder: "e.g., Marketing Manager, Teacher, Entrepreneur"
   - Validation: Optional, max 50 characters
   - Error: "Max 50 characters"

9. **Income Range**
   - Field Type: Dropdown
   - Options:
     - Prefer not to say
     - Less than ₦100,000/month
     - ₦100,000 - ₦250,000
     - ₦250,000 - ₦500,000
     - ₦500,000 - ₦1,000,000
     - ₦1,000,000+
   - Validation: Optional (for matching preferences)
   - Placeholder: "Select income range (optional)"

10. **Bio/About Me**
    - Field Type: Textarea
    - Placeholder: "Tell potential matches about yourself. What makes you unique? What are your values?"
    - Character Limit: 500 characters
    - Validation: Optional, max 500 chars
    - Counter: Show remaining characters (e.g., "250/500")
    - Error: "Maximum 500 characters"

**Step Navigation:**
- Next Button: "Continue to Ethnic Group"
- Back Button: (grayed out/disabled on first step)
- Auto-save: Save all fields before proceeding
- Validation: Show errors in-field before allowing next step

---

#### 2.3.3 Step 2: Ethnic Group Selection

**Field: Primary Ethnic Group**
- Field Type: Searchable dropdown
- Options: All 371+ Nigerian ethnic groups
- Grouped by region:
  - Northern Region
    - Hausa-Fulani
    - Kanuri
    - Tiv
    - Idoma
    - Berom
    - Nupe
    - (etc.)
  - Southwest Region
    - Yoruba
    - Edo
    - Urhobo
    - Ekiti
    - Ijebu
    - (etc.)
  - Southeast Region
    - Igbo
    - Efik
    - Ibibio
    - Igala
    - (etc.)
  - South-South Region
    - Ijaw
    - Ogoni
    - Itsekiri
    - Calabar
    - (etc.)
  - Middle Belt Region
    - (various groups)

**Search Functionality:**
- Real-time search as user types
- Search by ethnic group name (e.g., "Yoruba" or "Igbo")
- Show matching results as dropdown items
- Highlight match in search term

**Display After Selection:**
- Selected ethnic group shown in field
- Clear button (X) to deselect and search again
- Show brief description: "Yoruba people primarily from Southwest Nigeria"
- Language info: "Primary languages: Yoruba"

**Open to All Ethnicities Option:**
- Checkbox below: "I'm open to matching with any ethnic group"
- If checked: Skip filter, show all users
- If unchecked: Filter by selected ethnic group

**Help Text:**
- "Selecting an ethnic group helps us find culturally compatible matches"
- "Don't worry—you can be open to other groups too in your preferences"

**Step Navigation:**
- Next: "Continue to Religion" (save ethnic group selection)
- Back: "Back to Personal Info"

---

#### 2.3.4 Step 3: Religion Selection

**Field 1: Religion Type**
- Field Type: Radio buttons
- Options:
  - Islam
  - Christianity
  - Traditional African Religion
  - Other
  - Prefer not to say
- Required: Yes (with option to skip)

**Conditional Fields Based on Religion:**

**If Islam Selected:**
- Sub-field: Sufi Order (optional)
  - Dropdown options:
    - Qadiriyya
    - Tijaniyyah
    - Mouride
    - Other/None
  - Display: "Which Sufi order do you follow? (optional)"

**If Christianity Selected:**
- Sub-field: Denomination (optional)
  - Dropdown options:
    - Roman Catholic
    - Pentecostal
    - Methodist
    - Anglican
    - Baptist
    - Evangelical
    - Orthodox
    - Adventist
    - Other
  - Display: "Which Christian denomination? (optional)"

**All Religions:**
- Practice Level Selector (optional)
  - Radio buttons or dropdown:
    - Very Religious (practice regularly, important in daily life)
    - Religious (practice occasionally, important)
    - Moderate (practice sometimes, somewhat important)
    - Not Religious (cultural only, not important)
  - Display: "How important is your religion to you?"

**Interfaith Openness (All):**
- Checkbox: "I'm open to interfaith relationships"
- If checked: Show message "Great! This expands your match possibilities."
- If unchecked: Only match within same religion

**Help Text:**
- "Religion often influences marriage ceremonies and values. Help us find compatible matches."
- "You can change these preferences anytime."

**Step Navigation:**
- Next: "Continue to Marriage Type"
- Back: "Back to Ethnic Group"

---

#### 2.3.5 Step 4: Marriage Type Preference

**Field: Marriage Type**
- Field Type: Checkboxes (select multiple)
- Options:
  - [ ] Customary Marriage (traditional ethnic ceremony)
  - [ ] Islamic Nikah (Islamic wedding)
  - [ ] Christian Wedding (church/religious ceremony)
  - [ ] Civil Marriage (court/registry ceremony)
- Validation: At least one must be selected
- Error: "Select at least one marriage type preference"

**Help Text:**
- Brief explanation for each:
  - "Customary Marriage: Follows your ethnic group's traditions and ceremonies"
  - "Islamic Nikah: Islamic marriage contract and ceremony per Sharia law"
  - "Christian Wedding: Church or other Christian religious ceremony"
  - "Civil Marriage: Registered civil ceremony at court/registry"

**Field 2: Marriage Timeline**
- Field Type: Radio buttons (select one)
- Options:
  - ( ) Looking to marry within 0-6 months (very urgent)
  - ( ) Looking to marry within 6-12 months (ready soon)
  - ( ) Looking to marry within 1-2 years (planning ahead)
  - ( ) Flexible timeline (no rush, see what happens)
- Validation: Required (shows which option user prefers)
- Error: "Please select a timeline"

**Display Matching Impact:**
- "Matching Timeline: 1-2 Years" (shows selection)
- Note: "This helps us match you with people on similar timelines"

**Step Navigation:**
- Next: "Continue to Photos" (validation: at least one marriage type + timeline selected)
- Back: "Back to Religion"

---

#### 2.3.6 Step 5: Photo Upload

**UI Layout:**
- Headline: "Add Your Best Photos"
- Instructions: "Upload 2-5 clear, recent photos of yourself. These help potential matches recognize you."
- Warning: "We scan photos for inappropriate content. Verification can take up to 24 hours."

**Photo Upload Area:**
- **Primary upload zone:** Large drag-and-drop area
  - Dashed border, centered cloud icon
  - Text: "Drag photos here or click to browse"
  - Button: "Choose Files"
  - Supported formats: JPEG, PNG
  - Max file size: 5MB per file
  - Max total photos: 5

**File Selection Behavior:**
1. User clicks or drags files
2. Validate file type (JPEG/PNG only)
3. Validate file size (max 5MB)
4. Show preview of selected photo
5. Show compression progress
6. Show upload progress (percentage)
7. Once uploaded: Show preview + "Verifying..." status

**Photo Validation (Frontend):**
- File type: Only JPEG, PNG allowed
- Error if other: "Only JPEG and PNG files are supported"
- File size: Max 5MB per file
- Error if too large: "File is too large (max 5MB). Please compress and try again."
- Dimensions: Recommend at least 500x500px
- Warning if too small: "Photo is small. Recommend at least 500x500px for clarity."

**Upload Progress:**
- Show progress bar (% uploaded)
- Display file name during upload
- Cancel button (allow user to cancel upload)

**Uploaded Photos Display:**
- Grid of uploaded photos (thumbnails)
- Show verification status under each:
  - ✓ Verified
  - ⏳ Verifying (pending manual review)
  - ❌ Flagged (inappropriate content detected)
- Reorder button: Allow drag-and-drop to reorder (primary photo first)
- Delete button: (X) to remove photo
- Add More: Button to upload additional photos (if <5 uploaded)

**Minimum Photo Requirement:**
- Minimum 2 photos required to continue
- Error if <2: "Please upload at least 2 photos"
- Next button disabled until 2+ photos uploaded

**Anti-Catfishing Notice:**
- "We use advanced photo analysis to prevent duplicate/stolen photos"
- "All photos are manually reviewed within 24 hours"
- "Inappropriate or fraudulent photos will be rejected"

**Special Photo Requirements:**
- At least one photo should be clear face photo (no sunglasses, full face visible)
- Avoid heavily filtered photos (natural is better)
- Avoid photos with others (should be solo photos)
- These are recommendations, not requirements

**Step Navigation:**
- Next: "Continue to Genotype" (validation: 2+ photos uploaded and verified)
- Back: "Back to Marriage Type"
- Photo verification may delay progress (show "Waiting for photo verification" message if not yet verified)

---

#### 2.3.7 Step 6: Genotype Information

**Headline:** "🧬 Genetic Compatibility (Optional)"
- Subheading: "Help your matches understand genetic compatibility"
- Note: "This is completely optional and private"

**Field 1: Genotype Status**
- Question: "Have you been tested for genotype?"
- Radio buttons:
  - ( ) Yes, I've been tested
  - ( ) No, I need to get tested
  - ( ) I prefer not to add genotype information (skip this step)

**If "Yes, I've Been Tested":**

Sub-fields appear:

1. **Genotype Result**
   - Field Type: Radio buttons (select one)
   - Options:
     - ( ) AA (Genotype AA - homozygous normal)
     - ( ) AS (Genotype AS - carrier trait)
     - ( ) SS (Genotype SS - sickle cell disease)
     - ( ) Unsure/Don't know
   - Validation: Required
   - Help: "Check your test result document or lab report"

2. **Test Date**
   - Field Type: Date picker
   - Format: MM/YYYY (month/year acceptable, exact day optional)
   - Validation: Required, date must be in past
   - Placeholder: "When were you tested?"
   - Error: "Please enter valid test date"

3. **Testing Facility Name**
   - Field Type: Text input
   - Placeholder: "e.g., Lagos University Teaching Hospital"
   - Validation: Optional, max 100 characters
   - Help: "Name of hospital/lab where you were tested"

4. **Certification Code (Optional)**
   - Field Type: Text input
   - Placeholder: "Lab certificate number or code"
   - Validation: Optional, max 50 characters
   - Help: "If available, helps us verify your genotype"

5. **Upload Certificate Image (Optional)**
   - Field Type: File upload (drag & drop)
   - File types: JPEG, PNG, PDF
   - Max size: 10MB
   - Help: "Upload a photo of your lab result for verification"

**If "No, I Need to Get Tested":**

Show testing lab finder:

1. **Testing Lab Finder**
   - Headline: "Find Genotype Testing Labs Near You"
   - Location selector: State dropdown
   - Search button: "Find Labs"
   - Results: Show list of certified labs
   - Per lab display:
     - Lab name
     - Location (address)
     - Phone number (clickable)
     - Hours: Operating hours
     - Certification badge (certified by NHIS or equivalent)
     - "Get Directions" button (opens maps)
     - Website link (if available)

2. **Educational Content:**
   - "What is Genotype Testing?" (expandable section)
   - "Why Test?" (expandable section)
   - "How Long Does It Take?" (expandable section)
   - "How Much Does It Cost?" (expandable section)
   - "Will It Hurt?" (expandable section)

3. **After Getting Tested:**
   - "Come back after your test to add your genotype information"
   - Button: "Skip for Now" (save progress, come back later)

**If "Prefer Not to Add":**
- Skip to next step
- Option to add later (note in settings: "You can add genotype info anytime")

**Privacy Settings (After Adding Genotype):**

Field: **Genotype Visibility**
- Radio buttons (select one):
  - ( ) Show to all potential matches
  - ( ) Show only to serious matches (those who've sent connection requests)
  - ( ) Keep completely private (hide from everyone)
- Default: "Show only to serious matches"
- Help: "You control who sees your genotype information"

**Genotype Information Display:**
- "Your genotype: AA (Genotype AA)"
- "Verified: ✓" or "Pending: ⏳"
- "Privacy setting: Show to all matches"
- "Change genotype info" button (allow editing)

**Step Navigation:**
- Next: "Continue to ID Verification"
- Back: "Back to Photos"
- Skip: "Skip Genotype" (moves to next step, genotype remains optional)

---

#### 2.3.8 Step 7: Government ID Verification

**Headline:** "🆔 Verify Your Identity"
- Subheading: "Help us maintain a trusted community of real people"
- Note: "Your ID is encrypted and never displayed on your profile"

**Field 1: ID Type**
- Field Type: Dropdown
- Options:
  - Select an ID type...
  - National Identification Number (NIN)
  - Driver's License
  - Passport
  - Voter's Card
- Validation: Required
- Error: "Please select an ID type"

**Field 2: ID Number**
- Field Type: Text input
- Placeholder: "e.g., 12345678901 (for NIN)" or "AB123456 (for passport)"
- Validation: Required, format must match ID type
- Error: "Please enter valid ID number"
- Help: "Where to find your ID number on your [selected ID type]" (link to guide)

**Field 3: Upload ID Front**
- Field Type: File upload (drag & drop)
- File types: JPEG, PNG
- Max size: 10MB
- Placeholder: "Drag front of ID here or click to browse"
- Instructions: "Clear photo of front of your ID"
- Show preview after upload

**Field 4: Upload ID Back (if applicable)**
- Field Type: File upload
- Only shown for IDs with back side (Passport, Driver's License, etc.)
- Instructions: "Clear photo of back of your ID"
- Show preview after upload

**Verification Notice:**
- "⏳ Manual verification in 24 hours"
- "We'll review your ID to confirm authenticity"
- "Your ID will not be displayed on your profile"
- "Privacy is guaranteed"

**Submit ID Button:**
- Label: "Submit for Verification"
- Validation: All fields filled, photos uploaded
- Loading: Show spinner on click

**Verification Status Display (After Submit):**
- Status: "✓ ID Submitted"
- Message: "Thank you! We'll verify within 24 hours."
- "You can browse matches while we verify your identity."

---

#### 2.3.9 Step 7 Final: Profile Completion Summary

**Headline:** "🎉 Profile Complete!"
- Subheading: "Your profile is ready. Here's what you've set up:"

**Summary Display:**
- Personal Info: ✓ Completed (Age 28, Male, Lagos)
- Ethnic Group: ✓ Completed (Yoruba)
- Religion: ✓ Completed (Christian, Methodist)
- Marriage Type: ✓ Completed (Christian & Customary)
- Photos: ✓ Completed (4 photos uploaded, 3 verified)
- Genotype: ⏳ Pending Verification (AA, submitted 2 hours ago)
- ID Verification: ⏳ Pending Verification (National ID submitted 2 hours ago)

**Profile Completion Percentage:**
- Show progress bar: 92% complete
- "Your profile is almost fully verified. Check back in 24 hours."

**Next Steps:**
- Button 1: "Start Browsing Matches" (go to matching page)
- Button 2: "Edit Profile" (go back to settings)
- Button 3: "View My Profile" (see public profile)

**Welcome Message:**
- "Welcome to Sacred Match! You're now able to browse, like, and message other members."
- "Explore matches in your preferences or adjust your search criteria."

---

### 2.4 MATCHING & DISCOVERY (Detailed UI/UX)

#### 2.4.1 Browse Matches - Card Interface

**Page Layout:**
- Top: Filter bar (sticky)
- Center: Match cards (swipeable on mobile, clickable buttons on desktop)
- Bottom (mobile): Action buttons

**Filter Bar (Sticky Top):**
- Filters (visible or collapsed):
  - Age range slider (18-60)
  - Ethnic group search/dropdown
  - Religion checkboxes (Islam, Christianity, Traditional, Other)
  - Marriage type checkboxes (Customary, Islamic, Christian, Civil)
  - Location (state dropdown)
  - Genotype filter (AA, AS, SS, Any)
  - Education level filter
  - Income range filter
- Buttons:
  - "Apply Filters" (shows number of results, e.g., "Apply Filters (234 matches)")
  - "Clear All" (reset to default)
  - Collapse/Expand filter arrow
- Mobile: Collapse filters to hamburger menu or slide panel

**Match Cards (Main Display Area):**

**Card Structure (Per Match):**
- **Photo Section (70% of card):**
  - Main photo displayed large
  - Photo carousel dots (if multiple photos)
  - Left/Right arrow (browse photos)
  - Tap/click on photo to view full profile

- **Info Section (30% of card):**
  - Name + age: "Ayo, 28"
  - Location: "Lagos, Nigeria"
  - Ethnic group + religion badge: "Yoruba • Christian"
  - Marriage type tag: "Customary • Christian Wedding"
  - Match score: 87/100 (with color coding: Green >80, Yellow 60-80, Orange <60)
  - Brief bio preview (1-2 lines): "Passionate about life. Love travel and good food..."
  - Genotype compatibility (if shared):
    - ✓ "Good match" (AA + AA)
    - ⚠ "Caution" (AA + AS)
    - ✗ "High risk" (AS + SS)
    - Indicator color: Green/Yellow/Red

**Card Actions (Bottom of card):**
- **Desktop/Tablet:**
  - Left side: "Pass" button (gray, X icon)
  - Right side: "Like" button (primary color, heart icon)
  - Center: "View Full Profile" button (secondary)
  
- **Mobile:**
  - Full-width buttons below card:
    - "❌ Pass" (left)
    - "❤️ Like" (right)
    - "View Full Profile" (full width below)

**Card Transitions:**
- Swipe left to pass (mobile)
- Swipe right to like (mobile)
- Smooth fade-out and fade-in to next card
- Show small animation (card lifts slightly on like)

**Match Score Breakdown (Tooltip):**
- Hover over match score to show breakdown:
  - Cultural match: 35/40 (Ethnic group + Religion + Marriage type)
  - Personal fit: 28/30 (Age + Education + Location)
  - Genotype match: 20/20 (Perfect genetic match)
  - Engagement: 4/10 (Profile completeness)
  - Total: 87/100

**No More Matches State:**
- When user runs out of matches in current filter:
  - Large icon (clock or refresh)
  - Headline: "You've seen all available matches"
  - Subheading: "Check back tomorrow for new members!"
  - Buttons:
    - "Adjust filters" (modify search)
    - "Refresh matches" (reload algorithm)
    - "Update your profile" (makes profile more visible to others)

**Infinite Scroll/Pagination:**
- Auto-load more matches as user approaches end
- Or: "Load more" button if needed
- Show loading spinner during load

---

#### 2.4.2 Advanced Search/Filter Panel

**Search Bar (Top of page):**
- Text input: Search by username (if public profile option available)
- Placeholder: "Search by username"
- Results: Show matching usernames dropdown

**Expandable Advanced Filters:**

**Section 1: Basic Preferences**
- Age range: Dual slider (min-max, e.g., 25-35)
- Height range: Dual slider (cm, optional)

**Section 2: Cultural & Religious**
- Ethnic groups: Multi-select dropdown
  - Searchable
  - Show popular groups first
  - Option: "Open to all ethnicities"
- Religions: Checkboxes
  - [ ] Islam
  - [ ] Christianity
  - [ ] Traditional African Religion
  - [ ] Other
  - [ ] Open to any religion
- Marriage types: Checkboxes
  - [ ] Customary Marriage
  - [ ] Islamic Nikah
  - [ ] Christian Wedding
  - [ ] Civil Marriage
  - [ ] Open to any type

**Section 3: Location & Lifestyle**
- States: Multi-select dropdown (or map selector)
- Education level: Dropdown (or multi-select)
- Income range: Dropdown

**Section 4: Compatibility**
- Genotype: Radio buttons
  - ( ) Any genotype
  - ( ) AA only
  - ( ) AS accepted
  - ( ) Specific combinations (show explanation)
- Marriage timeline: Radio buttons
  - ( ) 0-6 months
  - ( ) 6-12 months
  - ( ) 1-2 years
  - ( ) Flexible
  - ( ) Any timeline

**Section 5: Profile Quality**
- Verified profiles only: Toggle switch
- Photos requirement: Dropdown
  - Show all profiles
  - At least 2 photos
  - At least 3 photos
- Genotype shared: Toggle (only show profiles with genotype info)

**Filter Controls:**
- "Apply Filters" button (large, primary)
- "Save Filter" button (save preset, show name input)
- "Clear All Filters" link
- "Save as Preset" option (name: "Young Professionals", "Lagos Christians", etc.)

**Saved Filter Presets:**
- Display saved presets as pills/tags
- Click preset to apply
- Delete preset (X button)

---

#### 2.4.3 Full Profile View Page

**Header Section:**
- Photo gallery (carousel or grid)
- Profile photo count: "1 of 4"
- Left/right arrows to browse
- Zoom icon (fullscreen photo option)

**User Info Section:**
- Name + age: "Ayo, 28"
- Location: "Ikoyi, Lagos, Nigeria"
- Last active: "Active 2 hours ago" or "Last seen yesterday"
- Verification badges:
  - ✓ Email verified
  - ✓ Phone verified
  - ✓ ID verified
  - ✓ Photos verified

**Match Compatibility Section:**
- Match score: 87/100 (large, color-coded)
- Breakdown:
  - Cultural compatibility: 35/40
    - Ethnic group: ✓ Match (both Yoruba)
    - Religion: ✓ Match (both Christian)
    - Marriage type: ✓ Match (both prefer customary + Christian)
  - Personal compatibility: 28/30
    - Age: ✓ Within preference
    - Education: ✓ Match
    - Location: ✓ Same state
  - Genotype compatibility: 20/20 (if shared)
    - Your genotype: AA
    - Their genotype: AA
    - Compatibility: ✓ Perfect match
  - Engagement score: 4/10
    - Profile completeness: Excellent
    - Photos verified: Yes
    - Activity level: Active

**About Section:**
- Bio (full text): "Lorem ipsum..."
- Height: 5'10" (180cm)
- Body type: Athletic
- Education: Bachelor's degree (Marketing)
- Occupation: Marketing Manager
- Income range: ₦250,000 - ₦500,000/month
- Marriage type preference: Customary marriage + Christian wedding
- Marriage timeline: Within 1-2 years
- Children: "Wants 2-3 children"
- Religion: Christian, Methodist denomination
- Smoking: No
- Alcohol: Socially

**Cultural Background Section:**
- Ethnic group: Yoruba
- Primary language: Yoruba & English
- Region: Southwest Nigeria
- Interest in cultural traditions: "Very important"
- Family involvement: "Family approval necessary"

**Action Buttons:**
- Large "Send Connection Request" button (primary color)
  - On click: Show modal "Send match request to Ayo?"
  - Confirmation: "Request sent. Ayo will see it in their inbox."
- "Pass" button (secondary)
  - On click: Move to next match
- "Report" button (small, icon-based)
  - Dropdown: Reason (Catfish, Scam, Inappropriate, Offensive, Other)
  - Description textarea
  - Submit button
- "Block" button (small, icon-based)
  - Confirmation: "Block Ayo? They won't be able to contact you."
  - Checkbox: "Report this profile" (optional)
  - Block button

**Back to Browse Button:**
- "Back to matches" or browser back button

**Desktop Sidebar (if space):**
- "Matches like Ayo" section
  - Show 3-4 similar profiles
  - Thumbnail cards
  - Quick like/pass buttons

---

### 2.5 MESSAGING SYSTEM (Real-Time Chat)

#### 2.5.1 Inbox/Conversations List

**Page Layout:**
- Left sidebar (on desktop): Conversations list
- Right main area: Chat window (desktop), full-screen (mobile)

**Inbox Header:**
- Headline: "Messages"
- Search conversations: Search bar (search by user name)
- Filter dropdown: "All conversations", "Unread", "Archived"

**Conversation List:**

**Per Conversation Card:**
- User avatar (profile photo)
- User name + last message preview (1 line)
- Timestamp: "2 hours ago" or "Yesterday"
- Unread badge: Red dot or count (e.g., "3 unread")
- Online status indicator: Green dot (online) or gray (offline)
- Hover actions: Archive, delete, block
- Click to open conversation

**Sorting:**
- Default: Most recent first
- Sort options: Most recent, Oldest, Alphabetical

**Empty State (No Conversations):**
- Icon: Chat bubble or envelope
- Headline: "No conversations yet"
- Subheading: "Connect with someone to start chatting"
- Button: "Browse matches" (redirect to matching page)

**Archived Conversations:**
- Show separate "Archived" tab
- Archive icon (paper clip with arrow)
- Unarchive option (restore to inbox)

---

#### 2.5.2 Chat/Conversation Window

**Conversation Header (Sticky):**
- User avatar (small)
- User name + online status
- Last active: "Active now" or "Last seen 2 hours ago"
- Icons (mobile only):
  - Info button (view profile)
  - More menu (archive, block, report)
- Desktop: Additional options
  - View profile link
  - Block button
  - Report button

**Message History:**

**Message Display:**
- **From current user (right side):**
  - Message bubble (primary color background)
  - White text
  - Timestamp on hover
  - Status icons: Sent ✓, Delivered ✓✓, Read ✓✓ (blue)
  
- **From other user (left side):**
  - Message bubble (light gray background)
  - Dark text
  - User avatar (left of bubble)
  - Timestamp on hover

**Message Features:**
- Timestamps: "2:45 PM" or "Yesterday 3:30 PM"
- Read receipts: Double checkmark (read), single (sent)
- Typing indicator: "Ayo is typing..."
- System messages: Gray, centered, smaller text
  - "Ayo sent a connection request" (when first matched)
  - "You accepted Ayo's connection request"

**Message Types Supported (MVP):**
- Text messages (required)
- Links (auto-linkify, show preview)
- Emojis (full emoji support)

**Future Message Types (Post-MVP):**
- Photo/image sharing
- Document sharing
- Voice messages
- Video messages

**Scroll Behavior:**
- Auto-scroll to newest message on load
- Auto-scroll when new message arrives
- "Scroll to bottom" button if user scrolls up to older messages
- Load more messages button at top (pagination for message history)

---

#### 2.5.3 Message Input Area

**Input Section (Sticky Bottom):**

**Text Input Field:**
- Multiline textarea (grows as user types, max ~4 lines)
- Placeholder: "Type a message..."
- Auto-focus on conversation open
- Character limit: None (but warn at 500 chars)

**Input Toolbar (below input):**
- **Left side:**
  - Emoji picker icon (😊 emoji face)
  - Attachment icon (📎 paperclip) - (future)
  
- **Right side:**
  - Send button (✈️ paper plane icon or "Send" text)
  - Button state: Disabled (grayed out) if input empty
  - On click: Send message
  - Loading state: Show spinner while sending

**Keyboard Shortcuts:**
- Enter: Send message
- Shift+Enter: New line in message
- Escape: Close emoji picker

**Message Sending Flow:**
1. User types message
2. User presses Enter or clicks Send
3. Input clears
4. Message appears in chat with "sent" status
5. Automatically scrolls to bottom
6. Show "sending..." status briefly
7. After 1-2 seconds: "Sent" status shows
8. When received: "Delivered" (double checkmark)
9. When read by recipient: "Read" (blue checkmarks)

**Failed Message Handling:**
- Show error message: "Failed to send. Retry?"
- Retry button
- Or auto-retry after 3 seconds
- Keep message in input field for user to try again

---

#### 2.5.4 Real-Time Features (WebSocket)

**Typing Indicators:**
- When user starts typing: Send typing event via WebSocket
- Recipient sees: "Ayo is typing..." (gray text, animated dots)
- When user stops typing (300ms idle): Send typing_stop event
- Recipient sees typing indicator disappear

**Read Receipts:**
- When user opens conversation: Send "mark_read" event
- Sender sees double checkmarks change to blue
- Show "Read at 2:47 PM" on hover

**Online Status:**
- User connected: Show green dot
- User disconnected: Show gray dot
- "Last seen" timestamp shown for offline users
- Update in real-time as users connect/disconnect

**Notifications:**
- New message notification (in-app):
  - Toast notification (bottom right)
  - "New message from Ayo"
  - Click to open conversation
  - Auto-dismiss after 5 seconds
- Browser push notification (if enabled):
  - "Ayo: Hey, how are you?"
  - Click to open app
- Sound notification (optional, user can toggle)

**Message Delivery:**
- Immediate delivery (near real-time)
- Socket.io handles connection and delivery
- Fallback: Poll server if WebSocket disconnects (every 5 seconds)
- Retry failed messages automatically

---

#### 2.5.5 Safety Features in Messaging

**Block User Option:**
- Button in conversation header (mobile) or sidebar (desktop)
- On click: Confirmation modal
- "Block Ayo? They won't be able to message you or see your profile."
- Checkbox: "Report this conversation" (optional)
- Confirm: "Block" button
- After block: Conversation archived, all future messages blocked

**Report Conversation:**
- Button in conversation header
- Modal form:
  - Reason dropdown: Harassment, Inappropriate content, Scam, Threatening, Other
  - Description textarea: Describe issue
  - Option to include last messages as evidence
  - Submit button: "Report Conversation"
- Confirmation: "Thank you. We'll review this report."

**Safety Tips Modal:**
- First-time messaging user sees:
  - "Safety Tips for Messaging"
  - Don't share personal info (address, bank details, ID numbers)
  - Don't send money to matches
  - Report suspicious behavior
  - Use in-app messaging only (not WhatsApp initially)
  - Button: "I Understand" (dismiss)

---

### 2.6 FAMILY INTRODUCTION TOOLS (Detailed UI)

#### 2.6.1 Request Family Introduction Workflow

**Step 1: Confirm Match**
- Display matched user info (photo, name, ethnic group, religion)
- Message: "You've been matched with Ayo. Is this person right for family introduction?"
- Buttons: "Yes, Proceed" or "No, Back to Matches"

**Step 2: Select Introduction Letter Template**
- Headline: "Choose an introduction letter template"
- Template gallery (cards):
  - **Template 1: Formal Traditional**
    - Preview text snippet
    - Tone: Respectful, ceremonial
    - For: Conservative families, customary marriages
    - Button: "Use This Template"
  - **Template 2: Modern Professional**
    - Preview text snippet
    - Tone: Friendly, professional
    - For: Urban professionals, modern families
    - Button: "Use This Template"
  - **Template 3: Religious Focus**
    - Preview text snippet
    - Tone: Spiritual, faith-centered
    - For: Religious families
    - Button: "Use This Template"
  - **Template 4: Casual Friendly**
    - Preview text snippet
    - Tone: Warm, approachable
    - For: Modern families, informal
    - Button: "Use This Template"

**Step 3: Customize Introduction Letter**
- Display selected template (full text in textarea)
- Auto-filled fields:
  - Your name
  - Your ethnic group
  - Matched person's name
  - Matched person's ethnic group
  - Your occupation
  - Their occupation
- Editable fields (user can modify):
  - Custom introduction message (2-3 paragraphs)
  - Your family background
  - Your intentions/expectations
- Character count: "1,250 / 2,000 characters"
- Preview: "Preview Letter" button (show formatted version)
- Buttons: "Back" or "Continue"

**Step 4: Bride Price Guide**
- Headline: "Bride Price Guide for [Ethnic Group]"
- Show ethnic group's bride price information:
  - **Local name:** "Owo Ori" (Yoruba), "Ịhe Isi" (Igbo), "Sadaki" (Hausa), etc.
  - **Typical amount:** "₦5,000 - ₦20,000" (range)
  - **Traditional items:**
    - Kolanuts
    - Honey
    - Money (specified amount)
    - Livestock (if applicable)
    - Textiles/wrappers
  - **Modern alternatives:** "Many families now accept cash in lieu of traditional items"
  - **Negotiation tips:**
    - "Start with a lower amount to allow room for negotiation"
    - "Remember, the bride price shows respect, not ownership"
    - "Discuss beforehand to avoid surprises"
    - "Document agreed items"
- Printable PDF: "Download as PDF" button
- Buttons: "Continue" or "Back"

**Step 5: Schedule Introduction**
- Headline: "Schedule the introduction ceremony"
- Fields:
  - **Preferred date:** Date picker (calendar)
  - **Preferred time:** Time picker (dropdown, 1-hour increments)
  - **Location:** Radio buttons
    - ( ) Virtual (via video call)
    - ( ) In-person (specify location)
  - **Additional details:** Textarea
    - "Any special requests or notes for both families"
    - "e.g., 'Please meet at restaurant X, we'll cover drinks'"
  - **Family contacts:** 
    - "How should families contact you?" 
    - Fields: Email, Phone number
    - Pre-filled with user's contact info
- Buttons: "Review & Send" or "Back"

**Step 6: Review & Send**
- Display full introduction package:
  - Your introduction letter (formatted)
  - Matched person's info
  - Preferred date/time/location
  - Bride price guide (summary)
  - Contact info to share
- Buttons: "Send Introduction" or "Back to Edit"

**Confirmation Screen:**
- ✓ Introduction request sent!
- Message: "Both you and [Ayo] will receive the introduction package with all details"
- "You can track status in your Family Introduction dashboard"
- Next steps: "What happens next?"
  - "1. Both families receive introduction package"
  - "2. They'll review and decide if interested"
  - "3. If interested, they'll contact you to schedule ceremony"
  - "4. Meet, discuss bride price, plan wedding!"
- Button: "View Dashboard" or "Back to Matches"

---

#### 2.6.2 Family Introduction Status Dashboard

**Page Layout:**
- Headline: "My Family Introductions"
- Tabs: "Pending", "Accepted", "Declined", "In Progress"

**Per Introduction Card:**
- Matched person's photo + name
- Status: "Pending", "Accepted", "Declined", "Ceremony Scheduled"
- Date sent
- Bride price guide (ethnic group)
- Action buttons (based on status):
  - Pending: "View Details", "Resend", "Cancel"
  - Accepted: "Schedule Ceremony", "View Agreement", "Message"
  - In Progress: "View Details", "Track Progress"
- Timeline view (optional):
  - "Introduction sent: 3 days ago"
  - "Awaiting response..."

---

#### 2.6.3 Bride Price Negotiation Tool

**Interface:**
- Heading: "[Ethnic Group] Bride Price Negotiation"
- Section 1: **Proposed Items**
  - Table with columns: Item, Quantity, Unit Price, Total
  - Pre-filled with traditional items:
    - Kolanuts: 5 packs @ ₦500 = ₦2,500
    - Honey: 1 jar @ ₦3,000 = ₦3,000
    - Money: ₦10,000
    - (etc.)
  - Add more rows: "+ Add Item" button
  - Monetary component: ₦15,500

- Section 2: **Agreed Items**
  - Same table format
  - Editable by both families (negotiation)
  - Shows what both sides have agreed to
  - Checkmark when item agreed

- Section 3: **Payment Terms**
  - Deadline: Date picker
  - Payment method: Dropdown (Full payment, Installments)
  - Notes: Textarea for special conditions

- Section 4: **Agreement**
  - "Generate Agreement Document" button
  - Shows formatted agreement
  - Download as PDF
  - Print button

---

### 2.7 SETTINGS & PROFILE MANAGEMENT

#### 2.7.1 User Profile Settings

**Edit Profile Page:**
- Same multi-step wizard as profile creation
- Allow editing all fields
- Save changes confirmation
- Show profile preview

#### 2.7.2 Account Settings

**Security Section:**
- Change email
- Change phone
- Change password
- Two-factor authentication (toggle)
- Active sessions (list & logout all)

**Privacy Section:**
- Profile visibility: Everyone / Matches only / Hidden
- Genotype visibility: Show all / Show matches / Hide all
- Last seen: Show / Hide
- Read receipts: On / Off
- Activity status: Show / Hide
- Who can message you: Everyone / Matches only / No one

**Notification Settings:**
- Email notifications: Toggle per type
  - New matches
  - Connection requests
  - Messages
  - Family introduction updates
- Push notifications: Toggle (enable/disable)
- SMS notifications: Toggle (enable/disable)
- Frequency: Instant / Daily digest / Weekly / None

**Preferences:**
- Language: Dropdown (English, Hausa, Yoruba, Igbo - future)
- Theme: Light / Dark mode toggle
- Timezone: Auto-detect or manual select

---

#### 2.7.3 Safety & Blocking

**Blocked Users List:**
- Table/list of blocked users
- User name
- Date blocked
- Unblock button (allow user to unblock if they change mind)
- Reason (optional)

**Report a User:**
- Form:
  - User search/selection
  - Report reason: Catfish, Scam, Inappropriate, Offensive, Other
  - Description textarea
  - Upload evidence (screenshots, messages)
  - Submit button
- Confirmation: "Thank you. Our safety team will review this."

---

### 2.8 CULTURAL CONTENT & EDUCATION

#### 2.8.1 Ethnic Group Guides

**Browse Ethnic Groups:**
- Searchable list of all 371+ groups
- Grouped by region
- Filter by region
- Search by ethnic group name

**Ethnic Group Detail Page (e.g., Yoruba):**
- Headline: "Yoruba Culture & Marriage Traditions"
- Sections:
  - Overview (location, population, language)
  - History & culture (summary)
  - Marriage customs:
    - Traditional bride price (Owo Ori)
    - Wedding ceremony (description & video)
    - Key traditions (Igba Nkwu equivalent for Yoruba)
    - Important considerations for couples
  - Video tutorial (embedded YouTube)
  - Q&A (FAQs about Yoruba marriage)
  - Related groups (other Yoruba sub-groups)

---

#### 2.8.2 Blog Section

**Blog Homepage:**
- Featured article (large card)
- Recent articles (grid or list)
- Category filter: Relationships, Culture, Safety, Tips
- Search articles
- Subscribe to newsletter

**Article Detail Page:**
- Title, author, date
- Featured image
- Reading time estimate
- Table of contents (if long)
- Article content (rich text)
- Author bio
- Share buttons (social media)
- Related articles
- Comments section (future)

---

#### 2.8.3 FAQ Section

**FAQ Database:**
- Searchable
- Organized by category
- Accordion-style display
- "Helpful?" rating (thumbs up/down)
- "Ask a question" form (submit custom question to support)

**Example FAQs:**
- How does the matching algorithm work?
- What is genotype and why does it matter?
- How do I request a family introduction?
- What's the difference between bride price and dowry?
- Is my data safe?
- How do I report a user?
- etc.

---

## PART 3: TECHNICAL ARCHITECTURE SUMMARY

### 3.1 Frontend Technology Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + CSS Modules
- **State Management:** Zustand
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Real-Time:** Socket.io client
- **Form Management:** React Hook Form
- **Validation:** Zod or Yup
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel or Netlify

### 3.2 Backend Technology Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js + TypeScript
- **Database:** PostgreSQL 14+
- **ORM:** Prisma
- **Authentication:** JWT + bcryptjs
- **Real-Time:** Socket.io server
- **Email:** SendGrid
- **SMS:** Twilio
- **File Storage:** AWS S3
- **Caching:** Redis
- **Testing:** Jest
- **Monitoring:** Sentry + CloudWatch

### 3.3 Infrastructure Stack

- **Frontend Deployment:** Vercel or Netlify
- **Backend Deployment:** AWS EC2 (auto-scaling 2-10 instances)
- **Database:** AWS RDS PostgreSQL (multi-AZ)
- **Caching:** AWS ElastiCache Redis
- **File Storage:** AWS S3
- **CDN:** CloudFront
- **DNS:** Route 53
- **Monitoring:** CloudWatch + Sentry
- **CI/CD:** GitHub Actions

### 3.4 Database Schema (20+ Tables)

Core tables:
- users
- user_profiles
- user_preferences
- ethnic_groups
- religions
- user_ethnic_groups
- user_religions
- user_photos
- connections
- messages
- conversations
- genotype_info
- genotype_testing_labs
- family_introductions
- bride_price_negotiations
- blocked_users
- verification_records
- safety_reports
- cultural_guides
- admin_actions

---

## PART 4: PROJECT TIMELINE & MILESTONES

### Week 1-2: Foundation & Authentication
- Project setup (React + Node)
- Landing page
- Auth system (signup, login, OTP)
- Database schema
- API endpoints for auth

### Week 2-3: Profile Creation
- Profile wizard (7 steps)
- Photo upload & compression
- Ethnic group selection
- Religion selection
- Genotype feature backend

### Week 3-4: Matching Engine
- Matching algorithm implementation
- Browse/discover UI
- Filtering system
- Match scoring

### Week 4-5: Connections & Messaging
- Connection request system
- Real-time messaging (Socket.io)
- Chat UI
- Message history

### Week 5-6: Family Introduction & Genotype
- Family introduction workflow
- Bride price guides
- Genotype compatibility checking
- Verification system

### Week 6-7: Content & Settings
- Cultural guides
- Blog system
- FAQ section
- Settings pages
- Safety & moderation

### Week 7-8: Testing & Optimization
- Unit tests
- Integration tests
- E2E tests
- Performance optimization
- Security audit

### Week 8-10: Deployment & Launch
- Staging environment
- Production deployment
- Monitoring setup
- Beta launch
- Public launch

---

## PART 5: SUCCESS CRITERIA & KPIs

### Technical KPIs
- ✅ 100+ frontend components
- ✅ 50+ backend API endpoints
- ✅ 20+ database tables
- ✅ >80% test coverage
- ✅ Lighthouse score >90
- ✅ <200ms API response time
- ✅ 99.9% uptime

### Business KPIs
- ✅ 1,000+ registered users (week 8)
- ✅ 500+ active daily users (week 12)
- ✅ 50%+ profile completion rate
- ✅ 30%+ match acceptance rate
- ✅ 4.5+/5 app store rating
- ✅ <1% fraud/fake profile rate

### User Experience KPIs
- ✅ Profile creation time: <5 minutes
- ✅ Time to first match: <2 minutes
- ✅ Message delivery: <1 second (real-time)
- ✅ User satisfaction: 4.5+/5 stars
- ✅ Retention (30-day): >40%

---

## PART 6: LAUNCH STRATEGY

### Pre-Launch (Week 1-9)
1. Closed beta with 50-100 testers
2. Feedback collection and iteration
3. Security audit
4. Performance testing
5. Stakeholder review

### Soft Launch (Week 10)
1. Limited release (Lagos & Abuja only)
2. 1,000 user target
3. Monitor performance
4. Gather initial feedback
5. Iterate based on user behavior

### Public Launch (Week 12+)
1. Full public release
2. Marketing campaign activation
3. Press release
4. Social media launch
5. Influencer partnerships
6. Multi-state expansion planning

---

## FINAL PROJECT HANDOFF INSTRUCTIONS

1. **Clone GitHub Repository:** All code, documentation, and deployment configs
2. **Access Deployed Site:** Frontend running on Vercel, backend on AWS
3. **Database Access:** RDS PostgreSQL with production data
4. **Monitoring Dashboards:** CloudWatch, Sentry, DataDog
5. **Documentation:** README, API docs, architecture guide, deployment playbook
6. **Test Suite:** Unit, integration, and E2E tests with >80% coverage
7. **Support Team Training:** Documentation and video tutorials
8. **Maintenance Plan:** Weekly releases, monthly feature releases, quarterly scaling reviews

---

## END OF COMPREHENSIVE SPECIFICATION

This document contains all requirements, specifications, and instructions needed to build Sacred Match from conception to launch. All technical and business requirements are detailed above. Proceed with development following this specification.

**Status:** READY FOR DEVELOPMENT
**Last Updated:** [Current Date]
**Next Review:** End of Week 2 (first progress check)
