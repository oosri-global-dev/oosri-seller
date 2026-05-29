import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";

const SECTIONS = [
  { id: "introduction", num: 1, title: "Introduction" },
  { id: "definitions", num: 2, title: "Definitions" },
  { id: "eligibility", num: 3, title: "Eligibility and Authority" },
  { id: "account", num: 4, title: "Account Registration and Security" },
  { id: "marketplace", num: 5, title: "Marketplace Role and Relationship" },
  { id: "buyer-terms", num: 6, title: "Buyer Terms" },
  { id: "seller-terms", num: 7, title: "Seller Terms" },
  { id: "reviews", num: 8, title: "Product Reviews, Ratings and Community Content" },
  { id: "acceptable-use", num: 9, title: "Acceptable Use and Prohibited Conduct" },
  { id: "promotions", num: 10, title: "Promotions, Discounts and Campaigns" },
  { id: "ip", num: 11, title: "Intellectual Property Rights" },
  { id: "privacy", num: 12, title: "Privacy and Data Protection" },
  { id: "third-party", num: 13, title: "Third-Party Services and Links" },
  { id: "service-availability", num: 14, title: "Service Availability and Changes" },
  { id: "suspension", num: 15, title: "Suspension, Termination and Enforcement" },
  { id: "disclaimers", num: 16, title: "Disclaimers" },
  { id: "liability", num: 17, title: "Limitation of Liability" },
  { id: "indemnity", num: 18, title: "Indemnity" },
  { id: "force-majeure", num: 19, title: "Force Majeure" },
  { id: "notices", num: 20, title: "Notices and Electronic Communications" },
  { id: "disputes-between", num: 21, title: "Disputes Between Buyers and Sellers" },
  { id: "governing-law", num: 22, title: "Governing Law and Dispute Resolution" },
  { id: "changes", num: 23, title: "Changes to These Terms" },
  { id: "general", num: 24, title: "General Legal Terms" },
  { id: "contact", num: 25, title: "Contact" },
];

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Use | Oosri</title>
        <meta name="description" content="Oosri Terms of Use — marketplace terms for buyers, sellers, visitors and account holders." />
      </Head>

      <div style={styles.page}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <Link href="/dashboard" style={styles.logo}>
              <Image src={Logo} alt="Oosri" height={32} style={{ display: "block" }} />
            </Link>
            <nav style={styles.headerNav}>
              <Link href="/terms" style={{ ...styles.navLink, ...styles.navLinkActive }}>Terms of Use</Link>
              <Link href="/privacy" style={styles.navLink}>Privacy Policy</Link>
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

            <h1 style={styles.h1}>Terms of Use</h1>
            <p style={styles.subtitle}>
              Marketplace terms for buyers, sellers, visitors, account holders and users of Oosri services.
            </p>

            <section id="introduction" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>1.</span> Introduction</h2>
              <p style={styles.p}>
                These Terms of Use govern your access to and use of Oosri, including oosri.com, seller.oosri.com,
                mobile or web applications, seller tools, buyer checkout, account features, product listings, support
                channels, events, campaigns and any other service that refers to these Terms.
              </p>
              <p style={styles.p}>
                Oosri Limited, trading as Oosri, operates a marketplace that helps buyers discover and purchase
                products from sellers, artisans, makers, designers, creators, merchants and brands. Oosri may provide
                technology, listing tools, payment facilitation, customer support, logistics coordination, marketing
                and related marketplace services. Unless expressly stated otherwise, Oosri is not the manufacturer,
                producer, owner or direct seller of products listed by independent sellers.
              </p>
              <p style={styles.p}>
                By accessing or using Oosri, creating an account, listing a product, placing an order, making a
                payment, using seller tools, joining a promotion or otherwise using the platform, you agree to these
                Terms and all policies incorporated by reference. If you do not agree, you must not use Oosri.
              </p>
            </section>

            <section id="definitions" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>2.</span> Definitions</h2>
              <div style={styles.table}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableCell}>Term</div>
                  <div style={{ ...styles.tableCell, flex: 2 }}>Meaning</div>
                </div>
                {[
                  ["Oosri, we, us, our", "Oosri Limited, its platform, employees, officers, agents, contractors and authorised representatives, as the context permits."],
                  ["Platform", "oosri.com, seller.oosri.com, related apps, seller dashboard, checkout, support systems, APIs, social commerce tools and services operated or controlled by Oosri."],
                  ["User, you, your", "Any person who accesses or uses Oosri, including buyers, sellers, visitors, account holders, seller representatives, support users and event participants."],
                  ["Buyer", "A person who browses, orders or purchases products through Oosri."],
                  ["Seller", "A person or business approved or permitted to list, offer or sell products through Oosri."],
                  ["Product", "Any item, good, creative work, handmade item, fashion item, accessory, artwork, craft, design, digital or physical product, or related offering listed through Oosri."],
                  ["Order", "A request by a buyer to purchase a product through the platform."],
                  ["Content", "Text, product listings, images, videos, logos, reviews, ratings, designs, trademarks, comments, descriptions, messages and other materials uploaded, displayed or transmitted through Oosri."],
                  ["Policies", "Additional rules, privacy policy, seller policies, return policies, shipping terms, community guidelines, fee schedules, campaign rules and other documents posted or referenced by Oosri."],
                ].map(([term, meaning]) => (
                  <div key={term} style={styles.tableRow}>
                    <div style={{ ...styles.tableCell, fontWeight: 500 }}>{term}</div>
                    <div style={{ ...styles.tableCell, flex: 2 }}>{meaning}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="eligibility" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>3.</span> Eligibility and Authority</h2>
              <p style={styles.p}>
                You may use Oosri only if you are legally capable of entering into binding agreements under applicable
                law. If you are using Oosri on behalf of a business, seller, organisation or other entity, you
                represent that you have authority to bind that entity and that the entity will be responsible for your
                actions.
              </p>
              <p style={styles.p}>
                Oosri is not intended for unsupervised use by children. A person who is below the age required by
                applicable law to enter into binding transactions may use Oosri only with the involvement and consent
                of a parent or legal guardian. Oosri may restrict or close accounts where it reasonably believes the
                user is not eligible.
              </p>
            </section>

            <section id="account" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>4.</span> Account Registration and Security</h2>
              <p style={styles.p}>
                Certain features require an account. You agree to provide accurate, complete and current information
                and to update it when it changes. You are responsible for maintaining the confidentiality of your
                account credentials and for all activity under your account, except where the activity is caused by
                Oosri&apos;s breach of a legal duty.
              </p>
              <ul style={styles.ul}>
                <li style={styles.li}>You must not create an account using false, misleading or unauthorised information.</li>
                <li style={styles.li}>You must not impersonate another person, seller, business or representative.</li>
                <li style={styles.li}>You must not share your password, one-time password, private banking credentials or seller dashboard access with unauthorised persons.</li>
                <li style={styles.li}>You must notify Oosri immediately if you suspect unauthorised access, fraud, account compromise or misuse.</li>
                <li style={styles.li}>Oosri may require verification, multi-factor authentication or additional checks before allowing sensitive account changes, seller onboarding, payouts, refunds or account recovery.</li>
              </ul>
              <p style={styles.p}>
                Oosri may refuse registration, suspend access, close accounts, limit features, hold payouts, remove
                listings or require additional verification where necessary to protect users, comply with law, prevent
                fraud, manage risk or enforce these Terms.
              </p>
            </section>

            <section id="marketplace" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>5.</span> Marketplace Role and Relationship Between Oosri, Sellers and Buyers</h2>
              <p style={styles.p}>
                Oosri operates a marketplace. Products are generally listed and supplied by independent sellers. When
                a buyer purchases a seller&apos;s product, the contract for the product may be between the buyer and the
                seller, unless Oosri is expressly identified as the seller of record for a specific transaction. Oosri
                may facilitate payment, logistics coordination, customer support, dispute resolution, refunds or
                marketplace guarantees, but this does not automatically make Oosri the manufacturer, producer or
                owner of the product.
              </p>
              <p style={styles.p}>
                Sellers remain responsible for their products, product descriptions, product quality, stock
                availability, fulfilment, legal compliance, taxes, permits, intellectual property rights, customer
                communications, returns, warranties and any representations they make. Buyers remain responsible for
                reviewing product details, sizes, descriptions, delivery timelines, prices, restrictions and
                applicable fees before placing an order.
              </p>
              <p style={styles.p}>
                Oosri may set platform rules, approve or reject sellers, moderate listings, manage disputes, protect
                buyers, protect sellers, investigate complaints and take enforcement action where required for platform
                trust and safety.
              </p>
            </section>

            <section id="buyer-terms" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>6.</span> Buyer Terms</h2>

              <h3 style={styles.h3}>6.1 Product Information and Buyer Responsibility</h3>
              <p style={styles.p}>
                Oosri aims to display product information clearly, but product descriptions, sizes, materials, colours,
                handmade variations, availability and images may be provided by sellers. Handmade, artisan and
                small-batch products may have natural variations. Colours may also appear differently depending on
                screen settings, lighting and photography. Before placing an order, buyers should carefully review
                product information, size charts, delivery information, return eligibility, customs implications, taxes,
                import restrictions and any seller-specific terms.
              </p>

              <h3 style={styles.h3}>6.2 Orders and Acceptance</h3>
              <p style={styles.p}>
                An order placed through Oosri is an offer to purchase the selected product. Oosri or the seller may
                accept, reject, cancel or delay an order where the product is unavailable, incorrectly priced,
                restricted, suspected to involve fraud, affected by payment failure, affected by logistics constraints,
                or otherwise cannot be fulfilled lawfully or reasonably. An order confirmation does not guarantee
                final acceptance where there is an obvious error, stock problem, payment issue, fraud risk, compliance
                issue or logistics limitation. If an order is cancelled after payment, Oosri will arrange a refund in
                accordance with the applicable refund process and law.
              </p>

              <h3 style={styles.h3}>6.3 Prices, Currency, Taxes and Duties</h3>
              <p style={styles.p}>
                Prices, delivery fees, service fees, taxes and currency conversions may vary depending on seller,
                product, delivery location, payment provider, promotion, exchange rate and applicable law. Oosri will
                take reasonable steps to show material charges before checkout. Buyers are responsible for any customs
                duties, import taxes, destination-country charges or additional fees imposed by authorities or
                third-party providers, unless Oosri expressly states otherwise at checkout. If a displayed price is
                clearly erroneous, Oosri may cancel the order, correct the error, notify the buyer or provide a refund
                where payment has been made.
              </p>

              <h3 style={styles.h3}>6.4 Payment</h3>
              <p style={styles.p}>
                Payments may be processed by third-party payment processors. By making payment, you authorise Oosri
                and its payment partners to charge the relevant amount, process the transaction, conduct fraud checks
                and share transaction information necessary to complete the order. Oosri is not responsible for delays,
                declines, charges or errors caused by your bank, card issuer, payment provider or payment method,
                except where applicable law provides otherwise. You must not use stolen cards, unauthorised accounts,
                fraudulent payment methods, chargeback abuse or any payment method you are not authorised to use.
                Oosri may report suspected fraud and may suspend accounts or hold orders where necessary.
              </p>

              <h3 style={styles.h3}>6.5 Delivery, Shipping and Risk</h3>
              <p style={styles.p}>
                Delivery timelines are estimates and may be affected by seller processing time, handmade production,
                stock availability, logistics partner performance, destination country, customs clearance, holidays,
                weather, force majeure or incorrect delivery information. Oosri will take reasonable steps to provide
                updates where available. Risk of loss or damage may pass according to the delivery terms applicable
                to the order. Where a logistics partner is responsible for delivery, claims for loss, delay or damage
                may be subject to the logistics partner&apos;s processes and evidence requirements. Oosri may assist with
                resolution but may not be liable for all logistics failures outside its control.
              </p>

              <h3 style={styles.h3}>6.6 Returns, Refunds and Cancellations</h3>
              <p style={styles.p}>
                Returns, refunds and cancellations are subject to Oosri&apos;s return policy, seller-specific terms, product
                nature and applicable law. Some products may be non-returnable or subject to restrictions, including
                custom-made items, personalised items, hygiene-sensitive goods, perishable items, clearance products,
                products damaged after delivery, and products returned outside the permitted period. Where a buyer is
                legally entitled to cancel, return or receive a refund, Oosri will not restrict that right unlawfully.
                Buyers must follow the stated return process, provide accurate information, preserve the product,
                return all accessories and packaging where required, and provide evidence such as photographs, delivery
                records or inspection reports where requested. Refunds may be made to the original payment method or
                another lawful method determined by Oosri or the payment processor.
              </p>

              <h3 style={styles.h3}>6.7 Buyer Conduct</h3>
              <p style={styles.p}>
                Buyers must deal honestly with Oosri, sellers and delivery partners. Buyers must not make false claims,
                abuse refund policies, threaten sellers, manipulate reviews, use the platform for fraud, resell
                restricted items unlawfully, harass support staff, or attempt to bypass the platform for transactions
                in a way that exposes users or Oosri to risk.
              </p>
            </section>

            <section id="seller-terms" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>7.</span> Seller Terms</h2>

              <h3 style={styles.h3}>7.1 Seller Onboarding and Verification</h3>
              <p style={styles.p}>
                Sellers may be required to apply, verify identity, provide business information, provide tax or
                compliance information, confirm ownership or authorisation, provide payout details and accept
                additional seller policies. Oosri may approve, reject, suspend or remove sellers at its discretion
                where necessary to protect the marketplace, comply with law, manage risk or maintain platform quality.
                A seller must ensure that all information submitted to Oosri is accurate, complete and up to date.
                Oosri may delay activation, payouts or listing approvals until verification is completed.
              </p>

              <h3 style={styles.h3}>7.2 Product Listings</h3>
              <p style={styles.p}>
                Sellers are responsible for all listings and must ensure that product titles, descriptions, images,
                sizes, materials, colours, prices, stock quantities, production timelines, warranties, origin, safety
                information and shipping details are accurate and not misleading. Sellers must disclose handmade
                variations, used or reconditioned goods, material defects, limitations, care instructions and any
                information that a reasonable buyer would consider important. Sellers must maintain accurate inventory.
                If a product is unavailable, out of stock or delayed, the seller must update the listing and notify
                Oosri immediately. Oosri may mark products as out of stock, restrict listings, cancel orders, refund
                buyers or penalise sellers for repeated fulfilment failures.
              </p>

              <h3 style={styles.h3}>7.3 Product Compliance and Prohibited Items</h3>
              <p style={styles.p}>
                Sellers must comply with all laws, regulations, standards and import/export restrictions applicable to
                their products and target markets. Sellers must not list illegal, unsafe, counterfeit, stolen,
                misleading, infringing, hazardous, restricted or prohibited products. Oosri may maintain and update a
                prohibited and restricted items list. Even if an item is not listed, Oosri may remove it if it creates
                legal, safety, reputational, regulatory, payment, customs or platform risk. Sellers are responsible
                for ensuring products are genuine, safe, lawfully produced, lawfully sourced and fit for their
                ordinary purpose.
              </p>

              <h3 style={styles.h3}>7.4 Seller Fulfilment Obligations</h3>
              <p style={styles.p}>
                Sellers must fulfil orders within the promised processing time, package products properly, provide
                required documentation, cooperate with logistics partners, respond to buyer and Oosri communications,
                and resolve order issues promptly. Sellers are responsible for product quality, wrong items,
                inaccurate listings, defects, missing accessories, late dispatch, avoidable cancellations and failure
                to comply with seller policies.
              </p>

              <h3 style={styles.h3}>7.5 Seller Fees, Commissions, Payouts and Set-off</h3>
              <p style={styles.p}>
                Oosri may charge sellers fees, commissions, service charges, payment processing fees, logistics fees,
                promotional fees, subscription fees or other charges as stated in the seller dashboard, fee schedule,
                invoice or seller agreement. Oosri may deduct applicable fees, refunds, chargebacks, penalties, taxes,
                adjustments, buyer compensation, logistics charges or debts from seller payouts where permitted by law
                and the applicable seller terms. Seller payouts may be delayed, withheld, reversed or adjusted where
                there is suspected fraud, chargeback risk, dispute, verification issue, legal request, account breach,
                prohibited listing, policy violation, refund obligation or other risk. Oosri will act reasonably and
                provide information where appropriate.
              </p>

              <h3 style={styles.h3}>7.6 Taxes and Regulatory Obligations</h3>
              <p style={styles.p}>
                Sellers are responsible for determining, collecting, reporting and remitting any taxes, levies, duties,
                permits, licences and regulatory charges applicable to their business, products, sales, income and
                exports, except where Oosri is legally required to collect or remit an amount. Oosri may issue
                invoices, statements or reports to support records but does not provide tax advice.
              </p>

              <h3 style={styles.h3}>7.7 Seller Content and Intellectual Property</h3>
              <p style={styles.p}>
                Sellers represent that they own or have the necessary rights to all product images, descriptions,
                designs, brand names, trademarks, logos, videos, music, copy, packaging and other content they upload.
                Sellers must not infringe third-party intellectual property rights. Oosri may remove content or
                suspend accounts where infringement is alleged or identified. By uploading seller content, sellers
                grant Oosri a worldwide, royalty-free, non-exclusive licence to host, display, reproduce, adapt,
                promote, translate, distribute and use the content for operating, marketing and improving the
                marketplace, including on Oosri websites, apps, emails, social media, adverts and partner channels.
              </p>
            </section>

            <section id="reviews" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>8.</span> Product Reviews, Ratings and Community Content</h2>
              <p style={styles.p}>
                Users may post reviews, ratings, comments, photos, videos or other content where permitted. Content
                must be honest, lawful, respectful, relevant and not misleading. Users must not post fake reviews,
                paid undisclosed reviews, defamatory content, threats, harassment, private information, hate speech,
                obscene content, spam, malware, intellectual property infringement or content intended to manipulate
                rankings or damage competitors unfairly.
              </p>
              <p style={styles.p}>
                Oosri may moderate, remove, restrict, edit for formatting, preserve or investigate content where
                necessary to enforce these Terms, comply with law, protect users or maintain marketplace trust. Oosri
                is not obliged to publish every review or content submission.
              </p>
            </section>

            <section id="acceptable-use" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>9.</span> Acceptable Use and Prohibited Conduct</h2>
              <p style={styles.p}>You must use Oosri lawfully, honestly and in a manner that does not harm Oosri, users, sellers, buyers, partners, systems or the public. You must not:</p>
              <ul style={styles.ul}>
                <li style={styles.li}>violate any applicable law, regulation, court order or regulatory direction;</li>
                <li style={styles.li}>commit fraud, money laundering, identity theft, impersonation, chargeback abuse or payment misuse;</li>
                <li style={styles.li}>upload malware, exploit vulnerabilities, scrape data unlawfully, interfere with platform security or overload systems;</li>
                <li style={styles.li}>circumvent fees, checkout, payment systems, buyer protection, seller policies or platform controls;</li>
                <li style={styles.li}>list, buy, sell or promote prohibited, unsafe, counterfeit, stolen or infringing products;</li>
                <li style={styles.li}>use Oosri to harass, threaten, defame, abuse, discriminate against or intimidate any person;</li>
                <li style={styles.li}>collect or misuse personal data of other users;</li>
                <li style={styles.li}>reverse engineer, copy, resell or commercially exploit Oosri technology without authorisation;</li>
                <li style={styles.li}>manipulate product rankings, reviews, pricing, stock, search results or campaigns;</li>
                <li style={styles.li}>use bots, scripts, crawlers or automated tools without Oosri&apos;s written permission;</li>
                <li style={styles.li}>engage in conduct that may expose Oosri to legal, regulatory, payment, logistics, reputational or security risk.</li>
              </ul>
            </section>

            <section id="promotions" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>10.</span> Promotions, Discounts and Campaigns</h2>
              <p style={styles.p}>
                Oosri may offer promotions, discount codes, referral rewards, seller campaigns, free delivery offers,
                giveaways, events or other benefits. Promotions may be subject to additional rules, eligibility
                criteria, time limits, product restrictions, location restrictions, usage limits and fraud checks.
                Oosri may cancel, modify or withdraw a promotion where there is error, misuse, fraud, abuse, technical
                failure or legal requirement. Unless expressly stated, promotions have no cash value, cannot be
                transferred, cannot be combined with other offers and may be reversed if the qualifying order is
                cancelled, returned, refunded or found to be fraudulent.
              </p>
            </section>

            <section id="ip" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>11.</span> Intellectual Property Rights</h2>
              <p style={styles.p}>
                Oosri owns and has rights to the platform, software, interface, design, databases, branding, logos,
                trade names, marketplace content, text, graphics, icons, layout, know-how and other materials made
                available by Oosri. These Terms do not transfer any ownership rights to you. You may use Oosri only
                for its intended marketplace purposes. You must not copy, modify, distribute, sell, lease, reverse
                engineer, create derivative works from, frame, mirror, scrape or exploit any part of Oosri without
                written permission, except to the extent permitted by law.
              </p>
              <p style={styles.p}>
                If you believe content on Oosri infringes your intellectual property rights, contact us with
                sufficient details, including ownership evidence, the allegedly infringing content, contact details
                and a statement that the complaint is made in good faith. Oosri may remove or disable access to
                content while investigating.
              </p>
            </section>

            <section id="privacy" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>12.</span> Privacy and Data Protection</h2>
              <p style={styles.p}>
                Oosri processes personal data in accordance with its{" "}
                <Link href="/privacy" style={styles.inlineLink}>Privacy Policy</Link>.
                By using Oosri, you acknowledge that Oosri will collect, use, share, store and protect personal
                information as described in that policy. Sellers who receive buyer personal data through Oosri must
                use it only to fulfil the relevant order, provide support, comply with law and perform authorised
                marketplace activities. Sellers must not add buyers to independent marketing lists or contact buyers
                outside the permitted transaction without a lawful basis and required consent.
              </p>
            </section>

            <section id="third-party" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>13.</span> Third-Party Services and Links</h2>
              <p style={styles.p}>
                Oosri may integrate with or link to third-party services, including payment processors, banks,
                logistics providers, identity verification providers, analytics tools, social media platforms, maps,
                messaging tools, cloud hosting providers and seller tools. Third-party services are governed by their
                own terms and privacy notices. Oosri is not responsible for third-party services outside its control,
                except where applicable law provides otherwise.
              </p>
            </section>

            <section id="service-availability" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>14.</span> Service Availability and Changes</h2>
              <p style={styles.p}>
                Oosri aims to provide a reliable platform but does not guarantee uninterrupted, error-free or
                always-available service. The platform may be unavailable due to maintenance, upgrades, internet
                issues, hosting provider issues, payment or logistics outages, cyber incidents, force majeure,
                regulatory requirements, third-party failures or other reasons. Oosri may update, change, suspend,
                discontinue, restrict or remove any feature, product category, seller tool, promotion, service or
                part of the platform at any time where necessary for business, legal, technical, security or
                operational reasons. Oosri will take reasonable steps to avoid unfair disruption to users where
                practical.
              </p>
            </section>

            <section id="suspension" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>15.</span> Suspension, Termination and Enforcement</h2>
              <p style={styles.p}>Oosri may warn, investigate, restrict, suspend, terminate, block, delist, demote, hold payouts, cancel orders, remove content, refund buyers, report conduct, or take other action where it reasonably believes that:</p>
              <ul style={styles.ul}>
                <li style={styles.li}>you have breached these Terms or any Oosri policy;</li>
                <li style={styles.li}>your account, listing, order or conduct creates legal, regulatory, security, payment, consumer, logistics or reputational risk;</li>
                <li style={styles.li}>fraud, abuse, chargeback misuse, identity misuse, prohibited items or suspicious activity is suspected;</li>
                <li style={styles.li}>information provided by you is false, incomplete, misleading or unverifiable;</li>
                <li style={styles.li}>Oosri is required to do so by law, court order, regulator, payment partner, logistics provider or other competent authority;</li>
                <li style={styles.li}>your conduct harms buyers, sellers, Oosri, partners or the integrity of the marketplace.</li>
              </ul>
              <p style={styles.p}>
                Where appropriate, Oosri may provide notice and an opportunity to respond. However, Oosri may act
                immediately where necessary to prevent harm, comply with law, protect users, preserve evidence or
                manage risk.
              </p>
            </section>

            <section id="disclaimers" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>16.</span> Disclaimers</h2>
              <p style={styles.p}>
                To the fullest extent permitted by law, Oosri provides the platform on an &quot;as is&quot; and &quot;as available&quot;
                basis. Oosri does not guarantee that every product description, seller statement, buyer statement,
                third-party service, delivery estimate, currency conversion, search result, recommendation or user
                content will be accurate, complete, current, uninterrupted or error-free. Oosri does not exclude any
                warranty, right or liability that cannot legally be excluded under applicable law, including consumer
                protection obligations that apply to goods and services. Nothing in these Terms is intended to limit
                rights that consumers have under mandatory law.
              </p>
            </section>

            <section id="liability" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>17.</span> Limitation of Liability</h2>
              <p style={styles.p}>
                To the fullest extent permitted by law, Oosri will not be liable for indirect, incidental, special,
                consequential, exemplary or punitive damages, loss of profits, loss of revenue, loss of goodwill, loss
                of data, business interruption, reputational harm or losses arising from events outside Oosri&apos;s
                reasonable control. To the fullest extent permitted by law, Oosri&apos;s total liability arising out of or
                relating to a transaction may be limited to the amount paid to Oosri in respect of the relevant
                transaction or the amount of fees received by Oosri in connection with the relevant seller
                transaction, as applicable. This limitation will not apply where prohibited by law, or to liability
                that cannot lawfully be limited, including fraud, wilful misconduct or other non-excludable liability.
              </p>
              <p style={styles.p}>
                Independent sellers remain responsible for their products, listings, warranties, defects, injuries,
                compliance breaches, intellectual property infringements, tax obligations and fulfilment failures.
                Buyers and sellers agree that Oosri is not automatically liable for every act or omission of an
                independent seller, buyer, payment provider, logistics provider or other third party.
              </p>
            </section>

            <section id="indemnity" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>18.</span> Indemnity</h2>
              <p style={styles.p}>
                To the fullest extent permitted by law, you agree to indemnify and hold Oosri, its officers,
                employees, agents, partners and affiliates harmless from claims, losses, damages, penalties, fines,
                costs, expenses and liabilities arising from your breach of these Terms, misuse of the platform,
                unlawful conduct, inaccurate information, product defects, prohibited products, intellectual property
                infringement, tax failures, fraud, negligence, user content, seller listings, buyer claims or
                violation of applicable law. This indemnity does not require a consumer to give up rights that cannot
                lawfully be waived under applicable consumer protection law.
              </p>
            </section>

            <section id="force-majeure" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>19.</span> Force Majeure</h2>
              <p style={styles.p}>
                Oosri will not be responsible for delay, failure or interruption caused by events beyond its
                reasonable control, including acts of God, fire, flood, pandemic, epidemic, war, terrorism, civil
                unrest, labour disputes, power failure, internet or telecommunications failure, cyberattack, payment
                provider failure, logistics disruption, customs delay, government action, regulatory change, court
                order, exchange control issue, currency disruption or other events beyond reasonable control.
              </p>
            </section>

            <section id="notices" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>20.</span> Notices and Electronic Communications</h2>
              <p style={styles.p}>
                Oosri may send notices by email, SMS, WhatsApp, in-app notice, account notice, website notice, push
                notification, seller dashboard notice or other reasonable electronic means. You consent to receive
                electronic communications relating to your account, orders, seller activities, support, security,
                policies and legal notices. You are responsible for keeping your contact information up to date.
              </p>
            </section>

            <section id="disputes-between" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>21.</span> Disputes Between Buyers and Sellers</h2>
              <p style={styles.p}>
                Oosri may provide tools or support to help buyers and sellers resolve issues. Oosri may request
                evidence, including photos, videos, packaging, delivery records, chat records, product descriptions,
                inspection reports and payment references. Oosri may make marketplace decisions such as refunding a
                buyer, rejecting a claim, requiring a return, charging a seller, releasing funds, restricting a user
                or closing a dispute. Oosri&apos;s platform decision is not a court judgment and does not prevent a party
                from pursuing legal remedies where permitted by law. Users agree to cooperate in good faith and
                provide truthful information during dispute resolution.
              </p>
            </section>

            <section id="governing-law" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>22.</span> Governing Law and Dispute Resolution</h2>
              <p style={styles.p}>
                These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict
                of law rules. The parties will first attempt to resolve disputes through good-faith negotiation with
                Oosri support or the relevant business contact. If a dispute is not resolved informally within a
                reasonable period, the parties may attempt mediation through a recognised mediation centre in Nigeria,
                such as the Lagos Multi-Door Courthouse or another mutually agreed forum, before commencing
                litigation, except where urgent injunctive relief, fraud prevention, debt recovery, intellectual
                property protection, regulatory compliance or other urgent legal action is required. Subject to
                applicable law and any mandatory consumer rights, the courts of Nigeria shall have jurisdiction over
                disputes arising from or relating to these Terms.
              </p>
            </section>

            <section id="changes" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>23.</span> Changes to These Terms</h2>
              <p style={styles.p}>
                Oosri may update these Terms from time to time. Where changes are material, Oosri may provide notice
                through the platform, email, seller dashboard or other reasonable means. Continued use of Oosri after
                the effective date of updated Terms means you accept the updated Terms. If you do not agree to the
                updated Terms, you must stop using Oosri and may close your account subject to any outstanding
                obligations.
              </p>
            </section>

            <section id="general" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>24.</span> General Legal Terms</h2>
              <ul style={styles.ul}>
                <li style={styles.li}><strong>Entire agreement:</strong> These Terms, together with incorporated policies, form the agreement between you and Oosri regarding use of the platform.</li>
                <li style={styles.li}><strong>Severability:</strong> If any part of these Terms is found invalid or unenforceable, the remaining parts will continue to apply.</li>
                <li style={styles.li}><strong>No waiver:</strong> A delay or failure by Oosri to enforce a provision does not waive its right to enforce it later.</li>
                <li style={styles.li}><strong>Assignment:</strong> You may not transfer your rights or obligations without Oosri&apos;s written consent. Oosri may transfer its rights or obligations in connection with a merger, acquisition, restructuring, asset transfer or by operation of law.</li>
                <li style={styles.li}><strong>Headings:</strong> Headings are for convenience only and do not affect interpretation.</li>
                <li style={styles.li}><strong>Survival:</strong> Provisions relating to fees, payouts, disputes, intellectual property, privacy, limitations, indemnity, governing law and obligations that by nature should survive will continue after account closure or termination.</li>
              </ul>
            </section>

            <section id="contact" style={styles.section}>
              <h2 style={styles.h2}><span style={styles.sectionNum}>25.</span> Contact</h2>
              <div style={styles.contactCard}>
                <div style={styles.contactRow}>
                  <span style={styles.contactLabel}>Company</span>
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
              </div>
            </section>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Also read our{" "}
                <Link href="/privacy" style={styles.inlineLink}>Privacy Policy</Link>.
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
    display: "flex",
    alignItems: "center",
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
    transition: "color 0.15s",
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
  h3: {
    fontSize: 14.5,
    fontWeight: 600,
    margin: "20px 0 8px 0",
    color: "#333",
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
    alignItems: "center",
    gap: 16,
  },
  contactLabel: {
    fontSize: 13,
    color: "#888",
    fontWeight: 500,
    minWidth: 120,
  },
  contactValue: {
    fontSize: 13.5,
    color: "#333",
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
