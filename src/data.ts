import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'company-inc',
    slug: 'company-llp-incorporation',
    title: 'Company & LLP Incorporation',
    description: 'Establish your corporate entity. End-to-end support for Private Limited, LLP, OPC, or Public Limited structures.',
    detailedDescription: 'Launch your enterprise on solid legal foundations. We manage your entire setup journey—from securing your unique brand name to obtaining your Certificate of Incorporation, PAN, TAN, and drafting premium Articles & Memorandum of Association (AOA/MOA) crafted specifically for high-growth potential.',
    category: 'incorporation',
    timeline: '7-10 Business Days',
    governmentFees: 'Based on authorized share capital and state',
    documentsRequired: [
      'PAN Card — All proposed directors and shareholders',
      'Aadhaar / Voter ID / Passport — Any one valid identity proof per director / shareholder',
      'Address Proof — Bank statement / utility bill (not older than 2 months)',
      'Passport-size Photograph — Recent colour photo of each director',
      'Registered Office Proof — Electricity bill + rent agreement / NOC if rented',
      'NOC from Owner — No-objection letter from property owner for using address',
      'MOA & AOA — Memorandum and Articles of Association (drafted & e-filed)',
      'DSC — Class-2 / Class-3 Digital Signature Certificate for each director',
      'DIN — Director Identification Number (applied via SPICe+ form)'
    ],
    benefits: [
      'Creates a distinct, legally recognized corporate persona',
      'Limits owner liability to protect personal fortunes',
      'Enables seamless equity fundraising and angel investments',
      'Establishes immediate trust with clients and global suppliers'
    ],
    faqs: [
      { q: 'Why should I register a company instead of a proprietorship?', a: 'A company has separate legal existence — personal assets are protected from business liabilities.' },
      { q: 'What is the use of company registration?', a: 'It enables you to open a corporate bank account, raise equity funding, enter contracts, and build investor credibility.' },
      { q: 'Who can register a Private Limited Company?', a: 'Any two or more individuals (Indian or foreign) aged 18+, with a valid PAN and address proof.' },
      { q: 'What is a DIN and who needs it?', a: 'Director Identification Number — every proposed director must obtain it before incorporation via SPICe+ or DIR-3.' },
      { q: 'How long does incorporation take?', a: 'Typically 7–10 working days after submission of SPICe+ form and documents on MCA21 portal.' },
      { q: 'What is the minimum capital required?', a: 'No minimum paid-up capital is prescribed for Pvt Ltd companies. Even ₹1 is technically valid.' },
      { q: 'Do I need to file annual returns after incorporation?', a: 'Yes — AOC-4 (financial statements) and MGT-7/7A (annual return) are mandatory every year with the MCA.' },
      { q: 'Can a foreign national be a director in an Indian company?', a: 'Yes, but at least one director must be an Indian resident (182+ days in India in the previous year).' }
    ]
  },
  {
    id: 'gst-reg',
    slug: 'gst-registration',
    title: 'GST Registration',
    description: 'Acquire your Goods and Services Tax Identification Number (GSTIN) to legally operate, bill, and claim input tax credits.',
    detailedDescription: 'Mandatory for businesses crossing statutory turnover limits, and highly recommended for e-commerce or inter-state trade. We guide you through the entire application process, ensuring flawless categorization of your products/services under correct HSN/SAC codes to eliminate regulatory friction.',
    category: 'registration',
    timeline: '3-5 Business Days',
    governmentFees: 'Nil (Standard registration is free of govt fees)',
    documentsRequired: [
      'PAN Card — Proprietor / Partners / Directors',
      'Aadhaar Card — Authorised signatory (mandatory for OTP-based e-KYC)',
      'Photograph — Passport-size photo of proprietor / partners / directors',
      'Constitution Proof — Partnership deed / MOA + AOA / LLP agreement',
      'Registered Office Proof — Electricity bill / rent agreement + NOC from owner',
      'Bank Account Proof — Cancelled cheque or bank statement',
      'Digital Signature — Class-2 DSC for companies & LLPs (mandatory)',
      'Authorisation Letter — Board resolution / POA if authorised signatory ≠ promoter'
    ],
    benefits: [
      'Enables legitimate inter-state transactions and e-commerce listing',
      'Allows you to claim Input Tax Credit (ITC) on all business purchases',
      'Enhances competitive bidding power in large corporate tenders',
      'Avoids substantial government penalties for non-compliance'
    ],
    faqs: [
      { q: 'Why do I need GST Registration?', a: 'It is legally mandatory above the threshold. Without it you cannot collect GST, claim Input Tax Credit, or do inter-state trade.' },
      { q: 'What is the use of GSTIN?', a: 'Your 15-digit GSTIN uniquely identifies your business on every invoice and lets customers claim ITC on purchases from you.' },
      { q: 'Who can apply for GST Registration?', a: 'Any individual, firm, company, LLP, trust, or society engaged in supply of goods or services in India.' },
      { q: 'Is GST registration free?', a: 'Yes. Registration on the GST portal (www.gst.gov.in) is free of cost.' },
      { q: 'How long does registration take?', a: 'Usually 3–7 working days after document submission, subject to officer approval.' },
      { q: 'What is the penalty for not registering?', a: '10% of tax due (minimum ₹10,000) or 100% of tax if found deliberately suppressed.' },
      { q: 'Can a composition dealer issue a tax invoice?', a: 'No. Composition dealers issue a Bill of Supply; they cannot charge or collect GST.' },
      { q: 'When does GST registration get cancelled?', a: 'If turnover falls below the threshold, the business is closed, or the taxpayer applies for voluntary cancellation.' }
    ]
  },
  {
    id: 'gst-return',
    slug: 'gst-return-filing',
    title: 'GST Return Filing',
    description: 'Monthly and quarterly tax filing to report sales, purchases, and declare output tax while optimizing input tax credit.',
    detailedDescription: 'Keep your tax record spotless. We handle your regular GST returns (GSTR-1, GSTR-3B, GSTR-4, or GSTR-1 quarterly), cross-reconciling your purchase invoices with supplier filings to maximize your Input Tax Credit (ITC) recovery, preventing financial leakages.',
    category: 'tax',
    timeline: 'Ongoing (Monthly / Quarterly)',
    governmentFees: 'Subject to actual tax liability & late fees if applicable',
    documentsRequired: [
      'Sales Ledger / Sales Register',
      'Purchase Ledger containing purchase invoices',
      'GST portal credentials (secured with encryption)',
      'Import / Export bills of entry (if applicable)'
    ],
    benefits: [
      'Secures a perfect GST compliance rating for your firm',
      'Maximizes cash flow by retrieving every eligible rupee of ITC',
      'Avoids mounting compound interest and daily late filing penalties',
      'Streamlines subsequent audits and credit appraisals'
    ]
  },
  {
    id: 'gst-audit',
    slug: 'gst-audit-reconciliation',
    title: 'GST Audit & Reconciliation',
    description: 'Comprehensive statutory reviews of GST accounts to ensure alignment with national tax laws and prevent audit notices.',
    detailedDescription: 'Navigate the complex landscape of GST audits with confidence. We perform a thorough review of your filing history (GSTR-9 & GSTR-9C), reconciling your sales and purchase books with official GST portal records (GSTR-2A/2B and GSTR-3B) to detect and resolve discrepancies pro-actively.',
    category: 'audit',
    timeline: '10-15 Business Days',
    governmentFees: 'Varies with annual aggregate turnover and complexity',
    documentsRequired: [
      'Audited Financial Statements (P&L and Balance Sheet)',
      'All GST returns filed during the financial year',
      'Reconciliation statement between books and GST filings',
      'Internal audit reports (if any)'
    ],
    benefits: [
      'Pre-emptively catches and resolves discrepancies before official notices',
      'Ensures accurate annual filing (GSTR-9 & GSTR-9C)',
      'Mitigates the risk of department audits, penalties, or tax demands',
      'Improves corporate transparency and internal tax control systems'
    ]
  },
  {
    id: 'msme-reg',
    slug: 'msme-udyam-registration',
    title: 'MSME / Udyam Registration',
    description: 'Register under the Ministry of MSME to unlock powerful government subsidies, low-interest collateral-free loans, and payment protections.',
    detailedDescription: 'Access essential government support schemes. Registering under MSME/Udyam is highly beneficial for micro, small, and medium businesses seeking priority credit lending, protection against delayed buyer payments, and subsidies on intellectual property filing.',
    category: 'registration',
    timeline: '1-2 Business Days',
    governmentFees: 'Nil (Registration is free of government charges)',
    documentsRequired: [
      'Aadhaar Card — Proprietor / managing partner / authorised signatory (mandatory)',
      'PAN Card — Business PAN (mandatory for companies / LLPs; optional for others)',
      'GSTIN — If registered under GST (auto-verified from GST portal)',
      'Business Name & Address — Full name and address of enterprise',
      'Bank Account Details — Account number and IFSC — for subsidy disbursal',
      'NIC Activity Code — National Industrial Classification code for your activity',
      'Investment & Turnover Data — Self-declared; auto-verified from IT returns for existing businesses'
    ],
    benefits: [
      'Grants eligibility for collateral-free bank loans (CGTMSE)',
      'Enforces legal payment protections (interest on delayed payments)',
      'Secures up to 50% subsidy on trademark, patent, and barcode registration',
      'Provides concession on electricity bills and government tender security deposits'
    ],
    faqs: [
      { q: 'Why do I need MSME / Udyam Registration?', a: 'It qualifies you for priority-sector bank loans, lower interest rates, government subsidies, and delayed-payment protections.' },
      { q: 'What is the use of an Udyam certificate?', a: 'It acts as proof of MSME status for availing schemes like CGTMSE (collateral-free loans), PMEGP, and GeM portal registration.' },
      { q: 'Who can apply for Udyam Registration?', a: 'Any manufacturing or service business in India meeting the investment and turnover thresholds, regardless of legal form.' },
      { q: 'Is Udyam Registration free?', a: 'Yes, completely free on the official portal udyamregistration.gov.in. No fees are charged.' },
      { q: 'Is Udyam different from Udyog Aadhaar?', a: 'Yes. Udyog Aadhaar has been replaced by Udyam Registration (from July 2020). Existing UAM holders had to re-register.' },
      { q: 'How long is the Udyam certificate valid?', a: 'It has no expiry date. However, you must update details if turnover/investment crosses thresholds.' },
      { q: 'Can an MSME file cases under MSMED Act for delayed payments?', a: 'Yes. Buyers must pay MSME suppliers within 45 days; failing which they owe compound interest at 3× the bank rate.' },
      { q: 'Can a company with GST registration get Udyam?', a: 'Yes. GST and PAN data are auto-fetched during registration for verification.' }
    ]
  },
  {
    id: 'iec-code',
    slug: 'import-export-code',
    title: 'Import Export Code (IEC)',
    description: 'Obtain your 10-digit DGFT registration necessary to import goods into or export services out of the country legally.',
    detailedDescription: 'Expand your horizons globally. The Import Export Code (IEC), issued by the Directorate General of Foreign Trade (DGFT), is a lifetime-valid, zero-renewal registration required to clear customs, ship merchandise overseas, or send and receive business funds globally.',
    category: 'registration',
    timeline: '2-4 Business Days',
    governmentFees: 'DGFT statutory processing fee included',
    documentsRequired: [
      'PAN Card — Business PAN (or individual PAN for proprietor)',
      'Aadhaar / Voter ID / Passport — Identity proof of applicant',
      'Incorporation Certificate / Partnership Deed — Proof of business constitution',
      'Address Proof of Business — Electricity bill / rent agreement / sale deed',
      'Cancelled Cheque / Bank Certificate — Bank account in business name — for FIRC and remittance',
      'Digital Signature / OTP — Aadhaar-based OTP or DSC for e-signing the application',
      'Photograph — Passport-size photo of applicant'
    ],
    benefits: [
      'Unlocks global trade pathways for goods and service delivery',
      'Never expires—lifetime validity with absolutely zero renewal burdens',
      'Qualifies you for government export incentives and custom duty waivers',
      'Required by international banking channels to process foreign currency'
    ],
    faqs: [
      { q: 'Why is IEC Code mandatory?', a: 'Indian Customs and banks require IEC for clearing import/export shipments and for receiving or making foreign currency payments.' },
      { q: 'What is the use of an IEC Code?', a: 'It enables customs clearance, DGFT scheme benefits (Advance Authorisation, MEIS/RODTEP), and foreign remittance through banks.' },
      { q: 'Who needs to obtain an IEC?', a: 'Anyone — individual or business — engaged in import or export of goods or services. Exemptions apply to personal use and government entities.' },
      { q: 'Is IEC registration free?', a: 'Yes. The government fee is ₹500 (payable online on the DGFT portal). No renewal fee.' },
      { q: 'Does IEC need to be renewed annually?', a: 'No renewal is required. However, you must update the IEC annually by filing a modification (even with no changes) to keep it active.' },
      { q: 'Can one business have multiple IECs?', a: 'No. Only one IEC is issued per PAN. It covers all branches and divisions of the entity.' },
      { q: 'How long does IEC registration take?', a: 'Usually issued within 1–2 working days after submission on the DGFT portal.' },
      { q: 'What happens if I export without IEC?', a: 'Shipments will be blocked at customs. Bank will not process foreign inward/outward remittances without a valid IEC.' }
    ]
  },
  {
    id: 'dsc-issuance',
    slug: 'digital-signature-certificate',
    title: 'Digital Signature Certificate (DSC)',
    description: 'Acquire Class-3 cryptographic digital signatures required to authenticate e-filings, register companies, and submit government tenders securely.',
    detailedDescription: 'Secure your corporate virtual identity. We facilitate the rapid issuance of high-security Class-3 Digital Signature Certificates (DSC) with encryption and signing capabilities, ensuring your promoter identity is cryptographic, unforgeable, and fully compliant with government portals.',
    category: 'registration',
    timeline: '1-2 Business Days',
    governmentFees: 'Standard certifying authority verification fee included',
    documentsRequired: [
      'Aadhaar Card or Passport of applicant',
      'PAN Card of the applicant',
      'Video and Mobile verification (secure online link provided)',
      'Email verification credentials'
    ],
    benefits: [
      'Mandatory for company incorporation and filing MCA documents',
      'Used for signing income tax e-returns and electronic invoices',
      'Required to bid for high-value online e-tenders and auctions',
      'Establishes unalterable proof of signature under the IT Act'
    ]
  },
  {
    id: 'pan-reg',
    slug: 'pan-tan-registration',
    title: 'PAN & TAN Card Registration',
    description: 'Acquire Permanent Account Number and Tax Deduction Account Number for businesses, individuals, and foreign investors.',
    detailedDescription: 'Every business operating in India must possess a Permanent Account Number (PAN) for tracking financial transactions and a Tax Deduction and Collection Account Number (TAN) if they deduct tax at source (TDS). We handle the creation, verification, and speed-issuance of these critical identifiers.',
    category: 'registration',
    timeline: '3-5 Business Days',
    governmentFees: 'Govt processing fee included',
    documentsRequired: [
      'Identity Proof of Directors / Promoters',
      'Address Proof of Directors / Promoters',
      'Certificate of Incorporation (for corporate entities)',
      'Partnership Deed (for partnership firms)'
    ],
    benefits: [
      'Allows you to open commercial corporate bank accounts',
      'Enables formal transactions above standard statutory reporting thresholds',
      'Ensures compliance with TDS deduction and collection mandates',
      'Avoids 20% higher tax withholding rate on business receipts'
    ]
  },
  {
    id: 'tds-filing',
    slug: 'tds-return-filing',
    title: 'TDS Return Filing',
    description: 'Quarterly compliance to report taxes withheld from vendor payments, salaries, rent, and commissions to the government.',
    detailedDescription: 'Avoid heavy statutory late fees and corporate interest charges. If your business deducts tax at source on salaries, professional fees, or rent, you must file quarterly TDS returns (Form 24Q, 26Q, or 27Q). We handle the calculations, secure uploading, and rapid generation of Form 16/16A certificates for your payees.',
    category: 'tax',
    timeline: 'Ongoing (Quarterly)',
    governmentFees: 'Based on deduction values, late-fee calculation if delayed',
    documentsRequired: [
      'Details of payments made to vendors/contractors/employees',
      'TDS Challan receipts (showing deposit on portal)',
      'PAN of all payees/deductees',
      'TAN portal login credentials'
    ],
    benefits: [
      'Prevents hefty late fees (₹200/day) and tax interest penalties',
      'Provides seamless Form 16/16A certificates to vendors and staff',
      'Ensures proper corporate expense deduction matching during income tax filing',
      'Maintains clean standing with the Income Tax department'
    ]
  },
  {
    id: 'itr-filing',
    slug: 'income-tax-return-filing',
    title: 'Income Tax Return Filing',
    description: 'Annual corporate and individual direct tax filing, optimizing liabilities while preserving a pristine tax compliance profile.',
    detailedDescription: 'Maximize your post-tax returns. We analyze your corporate P&L or personal revenue streams to strategically claim all legal deductions, depreciations, and credits. From filing simple ITR-1/2 to complex corporate ITR-6 or business ITR-4/5, our expert tax consultants ensure your tax position is bulletproof against tax audits.',
    category: 'tax',
    timeline: '3-5 Business Days (Annual)',
    governmentFees: 'Based on gross income bracket and delayed filing penalty if any',
    documentsRequired: [
      'Financial accounts (Balance Sheet and Profit & Loss Statement)',
      'Bank Statements for the entire financial year',
      'Form 26AS, AIS (Annual Information Statement) & TIS',
      'Investment proofs (80C, 80D, etc. for individual filings)',
      'Previous year\'s filed tax return copy'
    ],
    benefits: [
      'Minimizes overall tax liability through strategic direct tax planning',
      'Ensures seamless processing of high-value business or home loans',
      'Facilitates easy visa applications with reliable tax history proofs',
      'Prevents scrutiny, prosecution, and audit notices from tax departments'
    ]
  },
  {
    id: 'bookkeeping',
    slug: 'accounting-bookkeeping',
    title: 'Accounting & Bookkeeping',
    description: 'Comprehensive, standard double-entry ledger maintenance, cloud reconciliation, and real-time financial health dashboards.',
    detailedDescription: 'Keep a clear, real-time pulse on your enterprise. Our cloud bookkeeping service delivers continuous management of your purchase ledgers, sales ledgers, bank feed reconciliation, and general journal entries. We prepare clean monthly trial balances and cash-flow reviews, ensuring you are always investor-ready.',
    category: 'compliance',
    timeline: 'Continuous Monthly Support',
    governmentFees: 'Nil (Service-based accounting fees)',
    documentsRequired: [
      'Monthly bank statements (CSV/PDF format)',
      'All sales invoices raised',
      'Vendor purchase invoices and expense bills',
      'Payroll registries and salary sheets'
    ],
    benefits: [
      'Provides accurate, real-time metrics on business profitability',
      'Ensures your accounts are always structured for seamless tax filings',
      'Saves overhead costs compared to maintaining full-time in-house accountants',
      'Furnishes high-grade financial statements for boards and external investors'
    ]
  },
  {
    id: 'audit-consultancy',
    slug: 'sme-audit-financial-consultancy',
    title: 'SME Audit & Financial Consultancy',
    description: 'Professional statutory audits, tax reviews, internal control setups, and strategic capital budgeting consultations.',
    detailedDescription: 'Elevate your financial integrity and streamline operations. We conduct professional reviews, internal audits, and general accounting health checks for small and medium-sized enterprises. We evaluate internal risk controls, ensure compliance with accounting standards, and offer advisory on debt-equity optimization and capital allocation.',
    category: 'audit',
    timeline: '12-20 Business Days',
    governmentFees: 'Determined by statutory company size and audit scope',
    documentsRequired: [
      'Complete trial balance and general ledger books',
      'Invoices, bank statements, and supporting vouchers',
      'Physical inventory stock sheets (if product business)',
      'List of debtors, creditors, and loans outstanding'
    ],
    benefits: [
      'Fulfills legal statutory audit mandates under corporate laws',
      'Provides an independent, certified proof of financial statements',
      'Uncovers hidden operational inefficiencies and cash flow leaks',
      'Empowers directors with strategic insights for expansion and budgeting'
    ]
  },
  {
    id: 'pvt-ltd-compliance',
    slug: 'pvt-ltd-corporate-compliance',
    title: 'Pvt Ltd Corporate Compliance',
    description: 'Ensure statutory compliance with MCA/ROC guidelines. We manage Board Meetings, Annual General Meeting (AGM) filings, and mandatory e-returns.',
    detailedDescription: 'Protect your corporation from administrative blacklisting. A Private Limited company must fulfill strict statutory annual filings with the Registrar of Companies (ROC)—specifically Form AOC-4 (financials) and MGT-7 (annual return). We handle your entire compliance calendar to ensure your active status remains immaculate.',
    category: 'compliance',
    timeline: '15-20 Business Days (Annual cycle)',
    governmentFees: 'ROC filing fees, calculated based on share capital',
    documentsRequired: [
      'Audited Financial Balance Sheets and P&L statements',
      'Director\'s Report and Auditor\'s Report',
      'Notice, agenda, and minutes of the Annual General Meeting',
      'Updated list of shareholders and share transfers (if any)'
    ],
    benefits: [
      'Guarantees your business maintains continuous "Active" state with MCA',
      'Saves you from crushing ₹100/day per-form late fees and director disqualification',
      'Secures complete corporate transparency, raising company credit scores',
      'Essential for legal share transfers, equity funding, or IPO tracks'
    ]
  }
];
