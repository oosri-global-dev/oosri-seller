import Head from "next/head";
import Link from "next/link";

const SECTIONS = [
  { id: "introduction", num: 1, title: "Introduction and Who We Are" },
  { id: "values", num: 2, title: "How We Value Your Privacy" },
  { id: "applicability", num: 3, title: "Applicability of This Privacy Policy" },
  { id: "definitions", num: 4, title: "Definitions" },
  { id: "information-collected", num: 5, title: "Information We Collect and Use" },
  { id: "information-not-wanted", num: 6, title: "Information We Do Not Want You to Provide" },
  { id: "cookies", num: 7, title: "Cookies and Similar Technologies" },
  { id: "lawful-bases", num: 8, title: "How We Use Personal Information and Our Lawful Bases" },
  { id: "consent", num: 9, title: "Consent" },
  { id: "automated", num: 10, title: "Automated Processing, Profiling and AI-Assisted Features" },
  { id: "sharing", num: 11, title: "Information We Share" },
  { id: "third-party", num: 12, title: "Third-Party Sites and Services" },
  { id: "social-media", num: 13, title: "Social Media Platforms" },
  { id: "events", num: 14, title: "Social Events, Photographs, Videos and Testimonials" },
  { id: "protection", num: 15, title: "How We Protect Your Information" },
  { id: "breaches", num: 16, title: "Personal Data Breaches" },
  { id: "transfers", num: 17, title: "Where We Store Your Information and Cross-Border Transfers" },
  { id: "retention", num: 18, title: "How Long We Store Information" },
  { id: "rights", num: 19, title: "Your Rights" },
  { id: "accurate", num: 20, title: "Maintain Accurate Information" },
  { id: "children", num: 21, title: "Privacy of Children" },
  { id: "promotional", num: 22, title: "Promotional Messages" },
  { id: "ugc", num: 23, title: "User-Generated Content, Reviews and Public Information" },
  { id: "complaints", num: 24, title: "Data Subject Complaints and Dispute Handling" },
  { id: "dpo", num: 25, title: "Data Protection Officer and Compliance Structure" },
  { id: "changes", num: 26, title: "Changes to This Privacy Policy" },
  { id: "contact", num: 27, title: "Contact" },
];

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Oosri</title>
        <meta name="description" content="Oosri Privacy Policy — how we collect, use, store and protect your personal information." />
      </Head>

      <div style={styles.page}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <Link href="/dashboard" style={styles.logo}>
              <span style={styles.logoText}>oosri</span>
            </Link>
            <nav style={styles.headerNav}>
              <Link href="/terms" style={styles.navLink}>Terms of Use</Link>
              <Link href="/privacy" style={{ ...styles.navLink, ...styles.navLinkActive }}>Privacy Policy</Link>
            </nav>
          </div>
        </header>

        <div style={styles.layout}>
          <aside style={styles.toc}>
            <p style={styles.tocHeading}>Contents</p>
            <ol style={styles.tocList}>
              {SECTIONS.map((s) => (
                <li key={s.id} style={styles.tocItem}>
                  <a href={`#${s.id}`} style={styles.tocLink}>
                    <span style={styles.tocNum}>{s.num}.</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <main style={styles.content}>
            <div style={styles.meta}>
              <span style={styles.badge}>Oosri Limited</span>
              <span style={styles.metaDivider}>·</span>
              <span style={styles.metaText}>Effective 28 May 2026</span>
              <span style={styles.metaDivider}>·</span>
              <span style={styles.metaText}>Last updated 26 May 2026</span>
            </div>

            <h1 style={styles.h1}>Privacy Policy</h1>
            <p style={styles.subtitle}>
              Nigeria-focused marketplace privacy notice for buyers, sellers, visitors, creators, service providers and event participants.
            </p>

            <section id="introduction" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>1.</span> Introduction and Who We Are</h2>
              <p style={styles.p}>
                Oosri Limited, trading as Oosri, operates an online marketplace that connects buyers with sellers,
                artisans, designers, makers, creators and merchants. Oosri enables buyers to discover and purchase
                products and enables sellers to list, manage and sell their products through Oosri seller tools and
                related services.
              </p>
              <p style={styles.p}>
                This Privacy Policy explains how Oosri collects, uses, stores, shares, protects and otherwise
                processes personal information when you use or interact with oosri.com, seller.oosri.com, any related
                mobile or web applications, checkout services, seller dashboards, customer support channels, social
                media pages, marketing campaigns, events and other services that refer to this policy.
              </p>
              <p style={styles.p}>
                For the purposes of Nigerian data protection law, Oosri may act as a data controller where it decides
                why and how personal data is processed. In some circumstances, Oosri may act as a data processor for
                limited activities carried out on behalf of sellers, partners or service providers. Where Oosri and a
                seller jointly determine certain processing activities, each party will be responsible for complying
                with the law in respect of the personal data it controls.
              </p>
            </section>

            <section id="values" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>2.</span> How We Value Your Privacy</h2>
              <p style={styles.p}>
                We value privacy as a core part of trust. Our marketplace depends on buyers feeling safe to shop,
                sellers feeling safe to grow their businesses, and all users knowing that their data is handled
                responsibly. We therefore apply the following principles to our data handling:
              </p>
              <ul style={styles.ul}>
                <li style={styles.li}><strong>Fairness, lawfulness and transparency:</strong> we process personal data in a fair, lawful and transparent manner and explain our practices in clear language.</li>
                <li style={styles.li}><strong>Purpose limitation:</strong> we collect information for specific and legitimate purposes connected with our marketplace, payments, logistics, safety, support, legal compliance and growth.</li>
                <li style={styles.li}><strong>Data minimisation:</strong> we only ask for information that is reasonably necessary for the relevant purpose.</li>
                <li style={styles.li}><strong>Accuracy:</strong> we take reasonable steps to keep information accurate, complete and up to date.</li>
                <li style={styles.li}><strong>Storage limitation:</strong> we keep information only for as long as needed for the purpose for which it was collected, unless a longer period is required or permitted by law.</li>
                <li style={styles.li}><strong>Security:</strong> we use reasonable technical, administrative and organisational safeguards to protect personal data.</li>
                <li style={styles.li}><strong>Accountability:</strong> we maintain internal policies, records, contracts, training and controls to demonstrate compliance.</li>
                <li style={styles.li}><strong>Respect for choice:</strong> where the law requires consent or permits opt-out rights, we provide appropriate choices and honour them.</li>
              </ul>
            </section>

            <section id="applicability" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>3.</span> Applicability of This Privacy Policy</h2>
              <p style={styles.p}>This Privacy Policy applies to personal information processed by Oosri in connection with:</p>
              <ul style={styles.ul}>
                <li style={styles.li}>buyers, prospective buyers and website visitors;</li>
                <li style={styles.li}>sellers, prospective sellers, seller representatives and seller staff;</li>
                <li style={styles.li}>delivery recipients, gift recipients and people whose details are provided for order fulfilment;</li>
                <li style={styles.li}>customer service, dispute resolution, fraud prevention and platform safety;</li>
                <li style={styles.li}>promotions, campaigns, newsletters, surveys, events and social media interactions;</li>
                <li style={styles.li}>service providers, contractors, consultants and business partners; and</li>
                <li style={styles.li}>people who communicate with Oosri by email, WhatsApp, phone, social media, live chat, web forms or other channels.</li>
              </ul>
              <p style={styles.p}>
                This policy does not apply to the personal data handling practices of independent sellers, payment
                processors, logistics providers, social media platforms, hosting providers or other third parties
                where those parties determine their own processing purposes. Their privacy notices and terms may
                apply separately.
              </p>
            </section>

            <section id="definitions" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>4.</span> Definitions</h2>
              <div style={styles.table}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableCell}>Term</div>
                  <div style={{ ...styles.tableCell, flex: 2 }}>Meaning in this policy</div>
                </div>
                {[
                  ["Personal data or personal information", "Any information relating to an identified or identifiable natural person, including name, contact details, account identifiers, location information, transaction records, device identifiers, images, messages, and other information that can identify a person directly or indirectly."],
                  ["Sensitive personal data", "Data that is more sensitive under law, including information relating to race or ethnic origin, religious or similar beliefs, health, sex life, biometric data, genetic data, political opinions and other categories protected by applicable law."],
                  ["Processing", "Any operation performed on personal data, including collection, recording, storage, use, disclosure, transmission, restriction, erasure or destruction, whether automated or not."],
                  ["Data subject", "The individual whose personal data is processed. This may include a buyer, seller, seller employee, visitor, recipient, event participant, job applicant or other person."],
                  ["Controller", "A person or organisation that determines the purposes and means of processing personal data."],
                  ["Processor", "A person or organisation that processes personal data on behalf of a controller."],
                  ["Platform", "oosri.com, seller.oosri.com, Oosri applications, dashboards, tools, checkout, support systems and other services operated or controlled by Oosri."],
                  ["Seller", "A merchant, artisan, creator, designer, maker, producer, brand, business or other person who lists, offers or sells products through Oosri."],
                ].map(([term, meaning]) => (
                  <div key={term} style={styles.tableRow}>
                    <div style={{ ...styles.tableCell, fontWeight: 500 }}>{term}</div>
                    <div style={{ ...styles.tableCell, flex: 2 }}>{meaning}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="information-collected" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>5.</span> Information We Collect and Use</h2>
              <p style={styles.p}>
                The information we collect depends on how you use Oosri. We may collect information directly from
                you, automatically from your device, from sellers, from buyers, from payment and logistics partners,
                from fraud prevention providers, from social media platforms, from publicly available sources, and
                from other legitimate sources.
              </p>
              <div style={styles.table}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableCell}>Category</div>
                  <div style={{ ...styles.tableCell, flex: 2 }}>Examples</div>
                  <div style={styles.tableCell}>Typical source</div>
                </div>
                {[
                  ["Identity information", "Name, username, account ID, profile name, business name, job title, seller representative details, verification details, government-issued identification where required for seller onboarding, compliance or fraud prevention.", "You, seller organisations, verification providers, public business records."],
                  ["Contact information", "Email address, phone number, delivery address, billing address, pickup address, social media handle, WhatsApp contact details.", "You, buyers, sellers, delivery recipients, support interactions."],
                  ["Account and profile information", "Login credentials, password hashes, preferences, saved items, wishlists, profile photo, seller store profile, product catalogue, seller business information, account settings.", "You and your use of the platform."],
                  ["Transaction and order information", "Cart items, orders, invoices, payment confirmation, shipping information, refunds, returns, disputes, chargebacks, fulfilment status, seller settlement records.", "You, sellers, payment processors, logistics partners, Oosri systems."],
                  ["Payment-related information", "Payment reference, transaction status, last four digits or tokenised payment details where made available by a payment processor, payout details for sellers, fraud signals.", "Payment processors and banking or payout partners."],
                  ["Communications", "Messages, emails, call notes, live chat transcripts, WhatsApp communications, customer support tickets, complaint records, seller support communications, feedback, survey responses.", "You, support teams, service providers."],
                  ["Device and technical information", "IP address, browser type, device type, operating system, app version, unique identifiers, pages viewed, referral source, session duration, crash logs, diagnostics and security logs.", "Cookies, pixels, SDKs, analytics tools, server logs."],
                  ["Location information", "Delivery location, pickup location, country, city, approximate location from IP address, location settings if enabled.", "You, device settings, logistics partners, IP-derived data."],
                  ["Marketing and preference information", "Marketing consents, email preferences, push notification settings, campaign engagement, promotion entries, referral codes, interests and product preferences.", "You, marketing tools, platform activity."],
                  ["User-generated content", "Reviews, ratings, photos, videos, product comments, seller responses, social media content where you tag or interact with Oosri, event photos or testimonials where permitted.", "You, sellers, social media platforms, events."],
                  ["Compliance and safety information", "Fraud alerts, abuse reports, restricted product reports, blocked accounts, records required by law, dispute evidence, sanctions or screening results where applicable.", "Oosri systems, users, service providers, authorities where lawful."],
                  ["Children-related information", "Limited information relating to a child only where necessary, lawful and appropriate, for example where a parent or guardian purchases a product for a child.", "Parents or guardians, public event participation, limited platform use if permitted by law and policy."],
                ].map(([cat, ex, src]) => (
                  <div key={cat} style={styles.tableRow}>
                    <div style={{ ...styles.tableCell, fontWeight: 500 }}>{cat}</div>
                    <div style={{ ...styles.tableCell, flex: 2 }}>{ex}</div>
                    <div style={styles.tableCell}>{src}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="information-not-wanted" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>6.</span> Information We Do Not Want You to Provide Unless Required</h2>
              <p style={styles.p}>
                Please do not send Oosri sensitive personal data unless we specifically request it for a lawful
                purpose or it is strictly necessary for a transaction, support request, legal claim, fraud
                investigation, safety issue or regulatory requirement. This includes health information, religious
                information, political opinions, passwords, one-time passwords, and information about children that
                is not required for the service.
              </p>
              <p style={styles.p}>
                Oosri will never ask you to disclose your password, full card PIN, bank token, one-time password or
                private banking credentials through email, social media, WhatsApp or phone calls. You should treat
                any such request as suspicious and report it to us immediately.
              </p>
            </section>

            <section id="cookies" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>7.</span> Cookies and Similar Technologies</h2>
              <p style={styles.p}>
                Oosri uses cookies and similar technologies such as pixels, tags, SDKs, local storage and analytics
                tools to operate the platform, understand usage, improve performance, secure accounts, remember
                preferences, personalise content and measure marketing effectiveness.
              </p>
              <div style={styles.table}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableCell}>Cookie type</div>
                  <div style={{ ...styles.tableCell, flex: 2 }}>Purpose</div>
                  <div style={styles.tableCell}>User choice</div>
                </div>
                {[
                  ["Strictly necessary cookies", "Enable core site functions such as login, cart, checkout, security, fraud prevention and session management.", "These are required for the platform to work and cannot usually be disabled through Oosri settings."],
                  ["Preference cookies", "Remember language, region, currency, saved settings, display preferences and similar choices.", "You may disable these in browser settings, but some features may not work as expected."],
                  ["Analytics cookies", "Help Oosri understand traffic, product interest, page performance, errors, search behaviour and user journeys.", "Where required, we request consent or provide opt-out options."],
                  ["Marketing cookies and pixels", "Measure campaigns, support retargeting, limit repeated ads, understand conversions and promote relevant Oosri content.", "Where required, we request consent and allow you to adjust marketing choices."],
                  ["Social media technologies", "Enable sharing, embedded posts, social login or measurement of engagement with social media campaigns.", "The relevant social media platform may also process data under its own policies."],
                ].map(([type, purpose, choice]) => (
                  <div key={type} style={styles.tableRow}>
                    <div style={{ ...styles.tableCell, fontWeight: 500 }}>{type}</div>
                    <div style={{ ...styles.tableCell, flex: 2 }}>{purpose}</div>
                    <div style={styles.tableCell}>{choice}</div>
                  </div>
                ))}
              </div>
              <p style={{ ...styles.p, marginTop: 12 }}>
                You may manage cookies through your browser settings. Blocking cookies may affect core features such
                as account login, saved cart, seller dashboard, checkout, security checks and customer support.
              </p>
            </section>

            <section id="lawful-bases" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>8.</span> How We Use Personal Information and Our Lawful Bases</h2>
              <p style={styles.p}>
                Oosri processes personal data only where there is an appropriate lawful basis. The lawful basis may
                include consent, performance of a contract, compliance with legal obligations, protection of vital
                interests, performance of a public interest task where applicable, or legitimate interests that do not
                override the rights and freedoms of the data subject.
              </p>
              <div style={styles.table}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableCell}>Purpose</div>
                  <div style={{ ...styles.tableCell, flex: 2 }}>Examples of use</div>
                  <div style={styles.tableCell}>Typical lawful basis</div>
                </div>
                {[
                  ["Account creation and management", "Registering buyer and seller accounts, verifying email or phone numbers, managing login, profile settings, saved preferences and seller dashboards.", "Contract, legitimate interests, legal obligation where verification is required."],
                  ["Marketplace operation", "Displaying products, processing orders, connecting buyers and sellers, managing cart, checkout, order status, delivery updates, returns and support.", "Contract, legitimate interests."],
                  ["Payments and seller settlements", "Processing payment, confirming transaction status, preventing fraud, settling sellers, handling refunds, chargebacks and payment disputes.", "Contract, legal obligation, legitimate interests."],
                  ["Logistics and delivery", "Sharing necessary order and contact details with delivery partners, tracking delivery, resolving failed delivery or pickup issues.", "Contract, legitimate interests, legal obligation where applicable."],
                  ["Customer and seller support", "Responding to enquiries, complaints, disputes, technical issues, refunds, returns, account concerns and seller onboarding questions.", "Contract, legitimate interests, legal obligation."],
                  ["Safety, trust and fraud prevention", "Detecting fake accounts, fraudulent transactions, abuse, spam, unauthorised access, prohibited items, money laundering risk and platform misuse.", "Legitimate interests, legal obligation, public interest where applicable."],
                  ["Personalisation and recommendations", "Showing relevant products, sellers, categories, promotions, currency or location-based experiences.", "Legitimate interests, consent where required."],
                  ["Marketing and promotions", "Sending newsletters, promotional offers, seller campaigns, product highlights, abandoned cart reminders, event invitations and surveys.", "Consent, legitimate interests where permitted, with opt-out rights."],
                  ["Analytics and product improvement", "Measuring traffic, improving search, testing new features, monitoring performance, diagnosing errors and understanding user behaviour.", "Legitimate interests, consent where required for certain cookies."],
                  ["Legal and regulatory compliance", "Maintaining business records, responding to lawful requests, meeting tax, accounting, consumer protection, data protection, court or law enforcement obligations.", "Legal obligation, legitimate interests."],
                  ["Events and community engagement", "Managing registrations, attendance, images, testimonials, reports, community stories and event communications.", "Consent, legitimate interests, contract, depending on context."],
                  ["Corporate transactions", "Due diligence, restructuring, investment, merger, acquisition, asset transfer, audit and professional advisory support.", "Legitimate interests, legal obligation, contract."],
                ].map(([purpose, examples, basis]) => (
                  <div key={purpose} style={styles.tableRow}>
                    <div style={{ ...styles.tableCell, fontWeight: 500 }}>{purpose}</div>
                    <div style={{ ...styles.tableCell, flex: 2 }}>{examples}</div>
                    <div style={styles.tableCell}>{basis}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="consent" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>9.</span> Consent</h2>
              <p style={styles.p}>
                Where Oosri relies on consent, we will request consent in clear and simple language. Consent should
                be affirmative and not based on silence, inactivity or pre-selected boxes. You may withdraw consent
                at any time using the relevant settings, unsubscribe link or by contacting us. Withdrawal of consent
                does not affect processing that was lawful before withdrawal.
              </p>
              <p style={styles.p}>
                Some processing is necessary to provide the platform. For example, we need contact and delivery
                information to complete an order, and we may need transaction records to comply with law and manage
                disputes. If you refuse information that is necessary for a service, we may be unable to provide that
                service.
              </p>
            </section>

            <section id="automated" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>10.</span> Automated Processing, Profiling and AI-Assisted Features</h2>
              <p style={styles.p}>
                Oosri may use automated tools to support platform safety, search, ranking, recommendations, fraud
                detection, spam prevention, account security, product moderation, seller performance monitoring,
                logistics routing, customer support prioritisation and marketing segmentation. Automated tools may
                analyse data such as order history, browsing behaviour, product views, device signals, payment risk
                indicators, seller fulfilment records, complaint patterns, return history, suspicious activity and
                communication metadata. These tools help us make the platform safer and more useful, but Oosri will
                take reasonable steps to avoid unfair, discriminatory or excessive processing.
              </p>
              <p style={styles.p}>
                Where a decision is based solely on automated processing and produces legal or similarly significant
                effects on you, you may request human review, express your point of view and contest the decision,
                subject to applicable law. Examples may include account restriction, fraud-related refusal, seller
                suspension or other significant platform actions. Not every recommendation, search ranking, security
                alert or product display is a solely automated decision with legal or similarly significant effect.
              </p>
            </section>

            <section id="sharing" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>11.</span> Information We Share</h2>
              <p style={styles.p}>
                We do not sell personal data in the ordinary sense. We share personal information only where
                necessary for the platform, where permitted by law, where you direct us to do so, where we have a
                lawful basis, or where disclosure is required to protect rights, safety, property or legal interests.
              </p>
              <div style={styles.table}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableCell}>Recipient category</div>
                  <div style={styles.tableCell}>Information shared</div>
                  <div style={styles.tableCell}>Purpose</div>
                </div>
                {[
                  ["Sellers", "Buyer name, order details, delivery instructions, selected contact or delivery details, dispute information and other details required to fulfil an order.", "To process and fulfil buyer orders, manage returns and provide seller support."],
                  ["Buyers", "Seller store name, seller profile, product details, fulfilment status and customer service responses.", "To support the marketplace transaction and buyer confidence."],
                  ["Payment processors and financial partners", "Payment references, transaction information, fraud signals, payout details and information needed to process payments or refunds.", "To process payments, refunds, seller settlements, fraud checks and chargebacks."],
                  ["Logistics providers", "Recipient name, phone number, delivery address, order size or description, delivery notes and tracking information.", "To deliver orders, handle returns and resolve delivery issues."],
                  ["Technology providers", "Hosting, cloud storage, analytics, customer support, email, SMS, WhatsApp, security, monitoring and product tools.", "To operate, secure, maintain and improve the platform."],
                  ["Professional advisers", "Relevant records, contracts, transaction information, complaints and evidence.", "To obtain legal, audit, tax, accounting, insurance, compliance or business advice."],
                  ["Regulators, courts and law enforcement", "Records required by valid legal process or lawful request.", "To comply with law, defend claims, prevent fraud, protect users and cooperate with investigations."],
                  ["Corporate transaction parties", "Due diligence records subject to confidentiality protections.", "To evaluate investment, merger, acquisition, financing, restructuring or asset transfer."],
                  ["Social media and advertising partners", "Campaign engagement data, pixel events, hashed identifiers where used, audience or conversion data.", "To measure and improve marketing, subject to applicable consent and platform settings."],
                ].map(([recipient, info, purpose]) => (
                  <div key={recipient} style={styles.tableRow}>
                    <div style={{ ...styles.tableCell, fontWeight: 500 }}>{recipient}</div>
                    <div style={styles.tableCell}>{info}</div>
                    <div style={styles.tableCell}>{purpose}</div>
                  </div>
                ))}
              </div>
              <p style={{ ...styles.p, marginTop: 12 }}>
                Where we use service providers to process personal data on our behalf, we expect them to process data
                only according to our instructions, protect the data appropriately, restrict unauthorised use, support
                data subject rights and notify us of security incidents as required by law and contract.
              </p>
            </section>

            <section id="third-party" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>12.</span> Third-Party Sites and Services</h2>
              <p style={styles.p}>
                The platform may contain links, integrations or references to third-party websites, services, payment
                pages, logistics tools, social media platforms, advertising networks, analytics services, embedded
                content or seller-controlled pages. Oosri is not responsible for the privacy practices, security,
                content or policies of independent third parties. You should review their privacy policies and terms
                before using them. Where a third-party payment page or logistics system processes your data
                independently, that provider is responsible for its own privacy and security obligations. Oosri will,
                however, take reasonable steps to work with reputable providers and to limit the information shared
                to what is necessary for the relevant service.
              </p>
            </section>

            <section id="social-media" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>13.</span> Social Media Platforms</h2>
              <p style={styles.p}>
                When you interact with Oosri on Instagram, TikTok, Facebook, LinkedIn, X, WhatsApp, YouTube or other
                social media platforms, both Oosri and the relevant platform may process information about you. This
                may include your username, profile information, public comments, direct messages, engagement with
                posts, campaign responses and information made available by the platform. Please avoid sharing
                confidential information, payment credentials, passwords, identification documents or sensitive
                personal data through public comments or social media messages. Oosri may use social media
                interactions to respond to enquiries, run campaigns, feature user-generated content, investigate
                complaints, monitor brand safety and improve service delivery. The social media platform&apos;s own
                privacy policy will apply to its processing activities.
              </p>
            </section>

            <section id="events" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>14.</span> Social Events, Photographs, Videos and Testimonials</h2>
              <p style={styles.p}>
                Oosri may host, attend, sponsor or document social events, seller showcases, pop-ups, exhibitions,
                creator markets, training sessions, launch events, community sessions and similar activities. At such
                events, Oosri or its representatives may take photographs, record videos, capture attendance lists,
                collect feedback, record testimonials or produce event reports. Where images or videos are captured
                at public or semi-public Oosri events, they may be used for event reporting, internal documentation,
                press, community storytelling or lawful promotional purposes, subject to applicable law. Where an
                image, video or testimonial will be used in a profit-oriented advertisement, endorsement, paid
                campaign or prominent feature, Oosri should obtain express consent where required or appropriate.
              </p>
              <p style={styles.p}>
                If you do not want to be photographed or recorded at an Oosri event, please inform the event team
                where practical. Oosri will take reasonable steps to respect such requests, but it may not always be
                possible to remove incidental crowd images, background appearances or images already lawfully
                published before receiving your request.
              </p>
            </section>

            <section id="protection" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>15.</span> How We Protect Your Information</h2>
              <p style={styles.p}>
                Oosri uses reasonable technical, administrative and organisational measures designed to protect
                personal data against unauthorised access, unlawful processing, accidental loss, destruction, misuse,
                alteration and disclosure. These measures may include:
              </p>
              <ul style={styles.ul}>
                <li style={styles.li}>role-based access controls and need-to-know access;</li>
                <li style={styles.li}>password protection, multi-factor authentication where appropriate and secure credential management;</li>
                <li style={styles.li}>encryption or secure transmission protocols where appropriate;</li>
                <li style={styles.li}>logging, monitoring and investigation of suspicious activity;</li>
                <li style={styles.li}>vendor due diligence and data processing agreements;</li>
                <li style={styles.li}>staff confidentiality obligations and privacy awareness training;</li>
                <li style={styles.li}>segregation of sensitive operational records where appropriate;</li>
                <li style={styles.li}>data minimisation and retention controls;</li>
                <li style={styles.li}>backup, recovery and business continuity measures;</li>
                <li style={styles.li}>security reviews, vulnerability management and periodic assessment of controls; and</li>
                <li style={styles.li}>incident response procedures for suspected or actual personal data breaches.</li>
              </ul>
              <p style={styles.p}>
                No online platform can guarantee absolute security. Users must also protect their accounts by using
                strong passwords, keeping login details confidential, updating devices, avoiding suspicious links and
                immediately reporting suspected account compromise.
              </p>
            </section>

            <section id="breaches" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>16.</span> Personal Data Breaches</h2>
              <p style={styles.p}>
                If we become aware of a personal data breach, we will assess the nature, scope and likely impact of
                the incident and take reasonable steps to contain, investigate and remediate it. Where required by
                law, Oosri will notify the Nigeria Data Protection Commission and affected individuals. Where
                notification to an affected individual is required, we will aim to communicate in plain and clear
                language and provide practical steps that may reduce possible harm. Oosri will keep appropriate
                records of personal data breaches, including the facts of the incident, likely effects, remedial
                actions and any notifications made.
              </p>
            </section>

            <section id="transfers" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>17.</span> Where We Store Your Information and Cross-Border Transfers</h2>
              <p style={styles.p}>
                Oosri may store and process personal data in Nigeria and in other countries where Oosri, its hosting
                providers, cloud infrastructure, support tools, payment processors, logistics partners, analytics
                providers, professional advisers or other service providers operate. Because Oosri serves buyers and
                sellers across borders, personal data may be transferred outside Nigeria where necessary for
                marketplace operations, payment processing, order fulfilment, support, fraud prevention, analytics or
                business administration.
              </p>
              <p style={styles.p}>
                Where personal data is transferred from Nigeria to another country, Oosri will take steps required
                by applicable law. These may include assessing whether the recipient country, recipient organisation,
                contractual clauses, binding corporate rules, code of conduct, certification mechanism or other
                safeguard provides adequate protection, or relying on another lawful transfer condition such as
                contract necessity, consent, legal claims, vital interests or other permitted grounds. Oosri will
                keep appropriate records of cross-border transfer bases where required and will seek to ensure that
                third parties receiving personal data protect it in a manner consistent with applicable law and this
                policy.
              </p>
            </section>

            <section id="retention" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>18.</span> How Long We Store Information</h2>
              <p style={styles.p}>
                Oosri keeps personal data only for as long as reasonably necessary for the purposes described in this
                policy, unless a longer retention period is required or permitted by law, contract, tax rules,
                accounting rules, anti-fraud obligations, dispute resolution, regulatory investigation or legal
                claims. Retention periods may vary depending on the type of data, the sensitivity of the data, the
                purpose of processing, the risk of harm, user expectations, legal requirements and operational needs.
              </p>
              <div style={styles.table}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableCell}>Record type</div>
                  <div style={{ ...styles.tableCell, flex: 2 }}>Indicative retention approach</div>
                </div>
                {[
                  ["Buyer account records", "For as long as the account remains active and for a reasonable period after closure to address disputes, fraud prevention, accounting, legal and regulatory needs."],
                  ["Seller account and verification records", "For as long as the seller account remains active and for a reasonable period after termination to meet tax, accounting, compliance, dispute and fraud prevention obligations."],
                  ["Order, payment, invoice and settlement records", "Generally retained for the period required for tax, accounting, audit, chargeback, dispute and legal compliance purposes."],
                  ["Customer support and complaint records", "Retained for a reasonable period after resolution to support quality control, dispute management, legal claims and service improvement."],
                  ["Marketing records", "Retained until consent is withdrawn, you opt out, the record is no longer needed, or we have another lawful basis to keep suppression records."],
                  ["Security logs and fraud records", "Retained for a period reasonably necessary to detect, prevent and investigate fraud, misuse, security incidents and platform abuse."],
                  ["Event photos, videos and testimonials", "Retained for as long as reasonably relevant to the event, campaign, reporting, archive or consent basis, subject to withdrawal rights where applicable."],
                  ["Recruitment or contractor records", "Retained for the recruitment or engagement process and for a reasonable period thereafter for legal, audit and compliance purposes."],
                  ["Deleted account information", "Some data may remain in backups, logs, legal records, transaction records or dispute files until the relevant retention period expires."],
                ].map(([type, approach]) => (
                  <div key={type} style={styles.tableRow}>
                    <div style={{ ...styles.tableCell, fontWeight: 500 }}>{type}</div>
                    <div style={{ ...styles.tableCell, flex: 2 }}>{approach}</div>
                  </div>
                ))}
              </div>
              <p style={{ ...styles.p, marginTop: 12 }}>
                When information is no longer required, Oosri will delete, anonymise, de-identify or securely archive
                it in accordance with applicable law and internal retention procedures.
              </p>
            </section>

            <section id="rights" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>19.</span> Your Rights</h2>
              <p style={styles.p}>Subject to applicable law and any permitted limitations, you may have the following rights in relation to your personal data:</p>
              <ul style={styles.ul}>
                <li style={styles.li}><strong>Right to be informed:</strong> to receive clear information about how your personal data is processed.</li>
                <li style={styles.li}><strong>Right of access:</strong> to request confirmation of whether we process your personal data and to obtain a copy of relevant personal data.</li>
                <li style={styles.li}><strong>Right to rectification:</strong> to request correction of inaccurate, incomplete, outdated or misleading personal data.</li>
                <li style={styles.li}><strong>Right to erasure:</strong> to request deletion of personal data where it is no longer necessary or where there is no lawful basis to retain it.</li>
                <li style={styles.li}><strong>Right relating to automated decision-making:</strong> to request human intervention, express your point of view and contest certain solely automated decisions with significant effects.</li>
                <li style={styles.li}><strong>Right to data portability:</strong> to receive certain personal data in a structured, commonly used and machine-readable format where applicable.</li>
                <li style={styles.li}><strong>Right to complain:</strong> to lodge a complaint with Oosri and, where appropriate, with the Nigeria Data Protection Commission.</li>
              </ul>
              <p style={styles.p}>
                To exercise your rights, contact us using the details in the Contact section. We may need to verify
                your identity before responding. We may refuse or limit a request where the law permits us to do so,
                for example where disclosure would affect another person&apos;s rights, prejudice an investigation,
                compromise security, conflict with legal obligations, or require disproportionate effort. We will
                explain our position where required.
              </p>
            </section>

            <section id="accurate" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>20.</span> Maintain Accurate Information</h2>
              <p style={styles.p}>
                You are responsible for ensuring that the information you provide to Oosri is accurate, complete and
                up to date. This is particularly important for account details, seller details, delivery addresses,
                phone numbers, payment and payout information, product listings and customer support details. Oosri
                will not be responsible for failed delivery, delayed orders, missed notices, incorrect payouts or
                account issues caused by inaccurate or outdated information provided by you, except where applicable
                law provides otherwise. You may update certain information through your account settings, seller
                dashboard or by contacting support. Oosri may request verification before making material changes to
                account, seller, payout, identity or security-related information.
              </p>
            </section>

            <section id="children" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>21.</span> Privacy of Children</h2>
              <p style={styles.p}>
                Oosri is not intended for use by children under the age required by applicable law to enter into
                binding transactions or consent to data processing. Children should not create accounts, purchase
                products or submit personal data without the involvement and consent of a parent or legal guardian
                where required. If we learn that we have collected personal data from a child without appropriate
                consent or lawful basis, we will take reasonable steps to delete or restrict the information. Parents
                or guardians who believe a child has provided personal data to Oosri should contact us immediately.
              </p>
              <p style={styles.p}>
                Where a parent or guardian purchases products for a child, or a child appears incidentally in event
                photos or user-generated content, Oosri will treat such information carefully and in a manner
                consistent with applicable law and the best interests of the child.
              </p>
            </section>

            <section id="promotional" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>22.</span> Promotional Messages</h2>
              <p style={styles.p}>
                Oosri may send promotional messages, newsletters, seller updates, product recommendations, event
                invitations, surveys, discount offers and marketplace announcements by email, SMS, WhatsApp, push
                notification, in-app notification or other channels where permitted by law. Some service-related
                communications, such as order confirmations, delivery updates, account security alerts, seller
                notices, policy notices and support responses, are transactional and may be sent even if you opt out
                of marketing. You may opt out of promotional messages by using the unsubscribe link, adjusting your
                account or notification settings, replying with applicable opt-out instructions, or contacting us.
                We may keep a suppression record to ensure that we do not send you promotional messages after opt-out.
              </p>
            </section>

            <section id="ugc" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>23.</span> User-Generated Content, Reviews and Public Information</h2>
              <p style={styles.p}>
                If you submit reviews, ratings, comments, product photos, seller responses, testimonials or other
                public content, that content may be visible to other users, indexed by search engines, used to support
                marketplace trust, and associated with your profile name, store name or other public identifier.
                Please do not include personal data, sensitive information, addresses, phone numbers or confidential
                information in public content unless you are comfortable making it public. Oosri may moderate,
                remove, restrict or preserve user-generated content where necessary to enforce platform rules,
                comply with law, protect users, investigate disputes or prevent misuse.
              </p>
            </section>

            <section id="complaints" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>24.</span> Data Subject Complaints and Dispute Handling</h2>
              <p style={styles.p}>
                If you have a privacy concern, please contact Oosri first so we can review and resolve it. We will
                aim to respond within a reasonable period and in accordance with applicable law. If you are not
                satisfied with our response, you may have the right to complain to the Nigeria Data Protection
                Commission or another competent authority. When investigating privacy complaints, Oosri may process
                relevant account, communication, transaction, technical and support records. We will limit such
                processing to what is necessary for the investigation and resolution of the complaint.
              </p>
            </section>

            <section id="dpo" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>25.</span> Data Protection Officer and Compliance Structure</h2>
              <p style={styles.p}>
                If Oosri is classified as a data controller or data processor of major importance, Oosri will
                designate a Data Protection Officer with appropriate knowledge of data protection law and practice.
                The DPO may be an employee or external service provider. The DPO will advise on privacy compliance,
                monitor compliance, support data subject rights and act as a contact point for the Nigeria Data
                Protection Commission where required.
              </p>
              <p style={styles.p}>
                Oosri may maintain internal privacy policies, vendor due diligence procedures, records of processing
                activities, lawful basis assessments, legitimate interest assessments, data privacy impact
                assessments, breach registers, training records and periodic compliance reviews.
              </p>
            </section>

            <section id="changes" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>26.</span> Changes to This Privacy Policy</h2>
              <p style={styles.p}>
                Oosri may update this Privacy Policy from time to time to reflect changes in our services,
                technology, legal requirements, operational practices or regulatory guidance. Where changes are
                material, we may notify users by email, account notice, website banner, in-app notice or other
                reasonable means. The updated policy will apply from the effective date stated in the policy, unless
                the law requires otherwise.
              </p>
            </section>

            <section id="contact" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>27.</span> Contact</h2>
              <p style={styles.p}>For questions, requests, complaints, data subject rights or privacy concerns, please contact:</p>
              <div style={styles.contactCard}>
                <div style={styles.contactRow}>
                  <span style={styles.contactLabel}>Data controller</span>
                  <span style={styles.contactValue}>Oosri Limited</span>
                </div>
                <div style={styles.contactRow}>
                  <span style={styles.contactLabel}>Support email</span>
                  <a href="mailto:support@oosri.com" style={styles.contactLink}>support@oosri.com</a>
                </div>
                <div style={styles.contactRow}>
                  <span style={styles.contactLabel}>Websites</span>
                  <span style={styles.contactValue}>oosri.com &amp; seller.oosri.com</span>
                </div>
                <div style={styles.contactRow}>
                  <span style={styles.contactLabel}>Response time</span>
                  <span style={styles.contactValue}>Oosri will aim to acknowledge privacy requests within a reasonable time and respond within the period required by applicable law.</span>
                </div>
              </div>
            </section>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Also read our{" "}
                <Link href="/terms" style={styles.inlineLink}>Terms of Use</Link>.
              </p>
              <p style={styles.footerText}>© 2026 Oosri Limited. All rights reserved.</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fafafa",
    fontFamily: "'Inter', sans-serif",
    color: "#212121",
  },
  header: {
    background: "#fff",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    textDecoration: "none",
  },
  logoText: {
    fontSize: 22,
    fontWeight: 800,
    color: "#fc5353",
    letterSpacing: "-0.5px",
  },
  headerNav: {
    display: "flex",
    gap: 24,
    alignItems: "center",
  },
  navLink: {
    fontSize: 14,
    color: "#666",
    textDecoration: "none",
    fontWeight: 500,
  },
  navLinkActive: {
    color: "#fc5353",
  },
  layout: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "40px 24px",
    display: "flex",
    gap: 48,
    alignItems: "flex-start",
  },
  toc: {
    width: 240,
    flexShrink: 0,
    position: "sticky",
    top: 80,
    maxHeight: "calc(100vh - 100px)",
    overflowY: "auto",
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 8,
    padding: "20px 16px",
  },
  tocHeading: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#999",
    margin: "0 0 12px 0",
  },
  tocList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  tocItem: {
    margin: "2px 0",
  },
  tocLink: {
    fontSize: 12.5,
    color: "#555",
    textDecoration: "none",
    lineHeight: 1.6,
    display: "block",
    padding: "3px 6px",
    borderRadius: 4,
  },
  tocNum: {
    color: "#999",
    marginRight: 2,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  badge: {
    fontSize: 11,
    fontWeight: 600,
    background: "#fff0f0",
    color: "#fc5353",
    padding: "3px 10px",
    borderRadius: 20,
    border: "1px solid #ffd6d6",
  },
  metaDivider: {
    color: "#ccc",
    fontSize: 14,
  },
  metaText: {
    fontSize: 12.5,
    color: "#888",
  },
  h1: {
    fontSize: 32,
    fontWeight: 800,
    margin: "0 0 8px 0",
    color: "#212121",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    margin: "0 0 40px 0",
    lineHeight: 1.6,
    paddingBottom: 32,
    borderBottom: "1px solid #eee",
  },
  section: {
    marginBottom: 40,
    scrollMarginTop: 80,
  },
  h2: {
    fontSize: 18,
    fontWeight: 700,
    margin: "0 0 12px 0",
    color: "#212121",
    display: "flex",
    alignItems: "baseline",
    gap: 8,
  },
  sectionNum: {
    color: "#fc5353",
    fontWeight: 800,
    minWidth: 28,
  },
  p: {
    fontSize: 14.5,
    lineHeight: 1.75,
    color: "#444",
    margin: "0 0 12px 0",
  },
  ul: {
    margin: "8px 0 12px 0",
    padding: "0 0 0 20px",
  },
  li: {
    fontSize: 14.5,
    lineHeight: 1.75,
    color: "#444",
    marginBottom: 6,
  },
  table: {
    border: "1px solid #eee",
    borderRadius: 8,
    overflow: "hidden",
    fontSize: 13.5,
  },
  tableHeader: {
    display: "flex",
    background: "#f7f7f7",
    borderBottom: "1px solid #eee",
  },
  tableRow: {
    display: "flex",
    borderBottom: "1px solid #f0f0f0",
  },
  tableCell: {
    flex: 1,
    padding: "10px 14px",
    lineHeight: 1.6,
    color: "#444",
  },
  contactCard: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 8,
    overflow: "hidden",
  },
  contactRow: {
    display: "flex",
    padding: "12px 16px",
    borderBottom: "1px solid #f0f0f0",
    alignItems: "flex-start",
    gap: 16,
  },
  contactLabel: {
    fontSize: 13,
    color: "#888",
    fontWeight: 500,
    minWidth: 120,
    paddingTop: 1,
  },
  contactValue: {
    fontSize: 13.5,
    color: "#333",
    lineHeight: 1.5,
  },
  contactLink: {
    fontSize: 13.5,
    color: "#fc5353",
    textDecoration: "none",
  },
  inlineLink: {
    color: "#fc5353",
    textDecoration: "none",
    fontWeight: 500,
  },
  footer: {
    borderTop: "1px solid #eee",
    paddingTop: 24,
    marginTop: 32,
  },
  footerText: {
    fontSize: 13,
    color: "#999",
    margin: "0 0 6px 0",
  },
};
