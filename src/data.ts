import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'company-inc',
    title: 'Company & LLP Incorporation',
    description: 'Establish your corporate entity. End-to-end support for Private Limited, LLP, OPC, or Public Limited structures.',
    detailedDescription: 'Launch your enterprise on solid legal foundations. We manage your entire setup journey—from securing your unique brand name to obtaining your Certificate of Incorporation, PAN, TAN, and drafting premium Articles & Memorandum of Association (AOA/MOA) crafted specifically for high-growth potential.',
    category: 'incorporation',
    priceEstimate: '₹6,499 / $80 onwards',
    timeline: '7-10 Business Days',
    governmentFees: 'Based on authorized share capital and state',
    documentsRequired: [
      'PAN Card of all Directors/Partners',
      'Aadhaar Card or Passport',
      'Proof of registered office (Electricity bill/Rent agreement)',
      'Bank statement (recent copy with name and address)',
      'Passport-sized photographs of promoters'
    ],
    benefits: [
      'Creates a distinct, legally recognized corporate persona',
      'Limits owner liability to protect personal fortunes',
      'Enables seamless equity fundraising and angel investments',
      'Establishes immediate trust with clients and global suppliers'
    ]
  },
  {
    id: 'gst-reg',
    title: 'GST Registration',
    description: 'Acquire your Goods and Services Tax Identification Number (GSTIN) to legally operate, bill, and claim input tax credits.',
    detailedDescription: 'Mandatory for businesses crossing statutory turnover limits, and highly recommended for e-commerce or inter-state trade. We guide you through the entire application process, ensuring flawless categorization of your products/services under correct HSN/SAC codes to eliminate regulatory friction.',
    category: 'registration',
    priceEstimate: '₹1,499 / $18',
    timeline: '3-5 Business Days',
    governmentFees: 'Nil (Standard registration is free of govt fees)',
    documentsRequired: [
      'PAN Card of Business / Promoter',
      'Proof of Business Registration (Certificate of Incorporation)',
      'Registered Address Proof (Utility bill / Rent Agreement)',
      'Authorized Signatory Appointment Letter',
      'Bank Account Passbook or Cancelled Cheque'
    ],
    benefits: [
      'Enables legitimate inter-state transactions and e-commerce listing',
      'Allows you to claim Input Tax Credit (ITC) on all business purchases',
      'Enhances competitive bidding power in large corporate tenders',
      'Avoids substantial government penalties for non-compliance'
    ]
  },
  {
    id: 'gst-return',
    title: 'GST Return Filing',
    description: 'Monthly and quarterly tax filing to report sales, purchases, and declare output tax while optimizing input tax credit.',
    detailedDescription: 'Keep your tax record spotless. We handle your regular GST returns (GSTR-1, GSTR-3B, GSTR-4, or GSTR-1 quarterly), cross-reconciling your purchase invoices with supplier filings to maximize your Input Tax Credit (ITC) recovery, preventing financial leakages.',
    category: 'tax',
    priceEstimate: '₹999 / $12 per month onwards',
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
    title: 'GST Audit & Reconciliation',
    description: 'Comprehensive statutory reviews of GST accounts to ensure alignment with national tax laws and prevent audit notices.',
    detailedDescription: 'Navigate the complex landscape of GST audits with confidence. We perform a thorough review of your filing history (GSTR-9 & GSTR-9C), reconciling your sales and purchase books with official GST portal records (GSTR-2A/2B and GSTR-3B) to detect and resolve discrepancies pro-actively.',
    category: 'audit',
    priceEstimate: '₹9,999 / $120 onwards',
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
    title: 'MSME / Udyam Registration',
    description: 'Register under the Ministry of MSME to unlock powerful government subsidies, low-interest collateral-free loans, and payment protections.',
    detailedDescription: 'Access essential government support schemes. Registering under MSME/Udyam is highly beneficial for micro, small, and medium businesses seeking priority credit lending, protection against delayed buyer payments, and subsidies on intellectual property filing.',
    category: 'registration',
    priceEstimate: '₹999 / $12',
    timeline: '1-2 Business Days',
    governmentFees: 'Nil (Registration is free of government charges)',
    documentsRequired: [
      'Aadhaar Card of the Proprietor / Director',
      'PAN Card of the Business Entity',
      'Bank Account Number and IFSC Code',
      'Investment in Plant & Machinery figures',
      'Annual business turnover figures'
    ],
    benefits: [
      'Grants eligibility for collateral-free bank loans (CGTMSE)',
      'Enforces legal payment protections (interest on delayed payments)',
      'Secures up to 50% subsidy on trademark, patent, and barcode registration',
      'Provides concession on electricity bills and government tender security deposits'
    ]
  },
  {
    id: 'iec-code',
    title: 'Import Export Code (IEC)',
    description: 'Obtain your 10-digit DGFT registration necessary to import goods into or export services out of the country legally.',
    detailedDescription: 'Expand your horizons globally. The Import Export Code (IEC), issued by the Directorate General of Foreign Trade (DGFT), is a lifetime-valid, zero-renewal registration required to clear customs, ship merchandise overseas, or send and receive business funds globally.',
    category: 'registration',
    priceEstimate: '₹2,499 / $30',
    timeline: '2-4 Business Days',
    governmentFees: 'DGFT statutory processing fee included',
    documentsRequired: [
      'PAN Card of the Entity or Proprietor',
      'Cancelled Cheque from current business account',
      'Address proof of the business premises',
      'Digital Signature Certificate (if required)'
    ],
    benefits: [
      'Unlocks global trade pathways for goods and service delivery',
      'Never expires—lifetime validity with absolutely zero renewal burdens',
      'Qualifies you for government export incentives and custom duty waivers',
      'Required by international banking channels to process foreign currency'
    ]
  },
  {
    id: 'dsc-issuance',
    title: 'Digital Signature Certificate (DSC)',
    description: 'Acquire Class-3 cryptographic digital signatures required to authenticate e-filings, register companies, and submit government tenders securely.',
    detailedDescription: 'Secure your corporate virtual identity. We facilitate the rapid issuance of high-security Class-3 Digital Signature Certificates (DSC) with encryption and signing capabilities, ensuring your promoter identity is cryptographic, unforgeable, and fully compliant with government portals.',
    category: 'registration',
    priceEstimate: '₹1,299 / $15 (2-Year Validity)',
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
    title: 'PAN & TAN Card Registration',
    description: 'Acquire Permanent Account Number and Tax Deduction Account Number for businesses, individuals, and foreign investors.',
    detailedDescription: 'Every business operating in India must possess a Permanent Account Number (PAN) for tracking financial transactions and a Tax Deduction and Collection Account Number (TAN) if they deduct tax at source (TDS). We handle the creation, verification, and speed-issuance of these critical identifiers.',
    category: 'registration',
    priceEstimate: '₹999 / $12',
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
    title: 'TDS Return Filing',
    description: 'Quarterly compliance to report taxes withheld from vendor payments, salaries, rent, and commissions to the government.',
    detailedDescription: 'Avoid heavy statutory late fees and corporate interest charges. If your business deducts tax at source on salaries, professional fees, or rent, you must file quarterly TDS returns (Form 24Q, 26Q, or 27Q). We handle the calculations, secure uploading, and rapid generation of Form 16/16A certificates for your payees.',
    category: 'tax',
    priceEstimate: '₹1,999 / $24 per quarter',
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
    title: 'Income Tax Return Filing',
    description: 'Annual corporate and individual direct tax filing, optimizing liabilities while preserving a pristine tax compliance profile.',
    detailedDescription: 'Maximize your post-tax returns. We analyze your corporate P&L or personal revenue streams to strategically claim all legal deductions, depreciations, and credits. From filing simple ITR-1/2 to complex corporate ITR-6 or business ITR-4/5, our expert tax consultants ensure your tax position is bulletproof against tax audits.',
    category: 'tax',
    priceEstimate: '₹2,499 / $30 onwards',
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
    title: 'Accounting & Bookkeeping',
    description: 'Comprehensive, standard double-entry ledger maintenance, cloud reconciliation, and real-time financial health dashboards.',
    detailedDescription: 'Keep a clear, real-time pulse on your enterprise. Our cloud bookkeeping service delivers continuous management of your purchase ledgers, sales ledgers, bank feed reconciliation, and general journal entries. We prepare clean monthly trial balances and cash-flow reviews, ensuring you are always investor-ready.',
    category: 'compliance',
    priceEstimate: '₹4,999 / $60 per month onwards',
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
    title: 'SME Audit & Financial Consultancy',
    description: 'Professional statutory audits, tax reviews, internal control setups, and strategic capital budgeting consultations.',
    detailedDescription: 'Elevate your financial integrity and streamline operations. We conduct professional reviews, internal audits, and general accounting health checks for small and medium-sized enterprises. We evaluate internal risk controls, ensure compliance with accounting standards, and offer advisory on debt-equity optimization and capital allocation.',
    category: 'audit',
    priceEstimate: '₹14,999 / $180 onwards',
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
    title: 'Pvt Ltd Corporate Compliance',
    description: 'Ensure statutory compliance with MCA/ROC guidelines. We manage Board Meetings, Annual General Meeting (AGM) filings, and mandatory e-returns.',
    detailedDescription: 'Protect your corporation from administrative blacklisting. A Private Limited company must fulfill strict statutory annual filings with the Registrar of Companies (ROC)—specifically Form AOC-4 (financials) and MGT-7 (annual return). We handle your entire compliance calendar to ensure your active status remains immaculate.',
    category: 'compliance',
    priceEstimate: '₹11,999 / $150 onwards (Annual Package)',
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
