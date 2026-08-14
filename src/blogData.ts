export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date, YYYY-MM-DD
  relatedServiceSlug?: string;
  body: string[]; // paragraphs; strings starting with "## " render as subheadings
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'gst-registration-step-by-step-guide',
    title: 'GST Registration in India: A Step-by-Step Guide for New Businesses',
    excerpt:
      'Everything a growing business needs to know before applying for GST registration — who needs it, what documents to keep ready, and how long the process typically takes.',
    publishedAt: '2026-08-05',
    relatedServiceSlug: 'gst-registration',
    body: [
      'For most businesses crossing the prescribed turnover threshold, GST registration is not optional — it is the legal gateway to issuing valid tax invoices, collecting GST from customers, and claiming Input Tax Credit on your own purchases. Yet many first-time founders treat it as an afterthought, applying only once a customer or vendor asks for a GSTIN. Getting it right from the start avoids penalties and rework later.',
      '## Who needs to register',
      'Any business supplying goods or services above the applicable turnover threshold must register, along with certain categories that must register regardless of turnover — for example, businesses making inter-state taxable supplies, e-commerce sellers, and those liable under reverse charge.',
      '## Documents to keep ready',
      'PAN, Aadhaar-based e-KYC for the authorised signatory, proof of the registered office (an electricity bill plus a rent agreement or NOC if the premises are rented), a cancelled cheque or bank statement, and — for companies and LLPs — a Class-2 Digital Signature Certificate and the constitution documents (MOA/AOA or the LLP agreement).',
      '## What happens after you apply',
      'Once documents are submitted on the GST portal, an officer typically reviews the application within 3–7 working days. If everything is in order, you receive your GSTIN and can start issuing GST-compliant invoices immediately. Discrepancies in address proof or signatory documents are the most common cause of delay, so it pays to have these verified before submission rather than after a query is raised.',
      '## After registration',
      'Registration is the starting line, not the finish line — regular GST return filing (GSTR-1, GSTR-3B, and others depending on your category) then becomes a recurring compliance obligation, along with periodic reconciliation against your books.',
    ],
  },
  {
    slug: 'private-limited-vs-llp-choosing-the-right-structure',
    title: 'Private Limited vs LLP: Choosing the Right Structure for Your Business',
    excerpt:
      'Incorporation is a one-time decision with long-term consequences. A practical comparison of Private Limited Companies and LLPs across liability, compliance, and fundraising.',
    publishedAt: '2026-07-22',
    relatedServiceSlug: 'company-llp-incorporation',
    body: [
      'One of the first decisions any founder makes — and one of the hardest to reverse cheaply later — is choosing the right legal structure. The two most common choices for growing Indian businesses are the Private Limited Company and the Limited Liability Partnership (LLP). Both offer limited liability protection, but they differ meaningfully in compliance burden, ownership flexibility, and how easily they can raise external capital.',
      '## Liability protection',
      'Both structures shield personal assets from business liabilities — this is the baseline reason most founders move away from a sole proprietorship or traditional partnership in the first place.',
      '## Compliance and cost',
      'An LLP generally has a lighter annual compliance load and lower statutory audit thresholds, making it attractive for services businesses, consultancies, and smaller teams. A Private Limited Company carries more ongoing compliance (board meetings, statutory registers, mandatory annual filings with the MCA) but that same structure and record-keeping is often what institutional investors expect to see.',
      '## Raising capital',
      'If the plan includes external equity funding — angel investors, venture capital, or an ESOP pool for early employees — a Private Limited Company is almost always the practical choice. LLPs cannot issue equity shares in the conventional sense, which makes priced funding rounds structurally awkward.',
      '## A simple rule of thumb',
      "If you're bootstrapping a services business with no near-term plan to raise equity, an LLP keeps compliance overhead lower. If fundraising, ESOPs, or eventual acquisition are part of the plan, incorporate as a Private Limited Company from day one — converting later is possible but adds cost, time, and complexity you can avoid by deciding correctly upfront.",
    ],
  },
  {
    slug: 'msme-udyam-registration-benefits-explained',
    title: 'MSME / Udyam Registration: Benefits Most Small Businesses Overlook',
    excerpt:
      'Udyam Registration is free, takes minutes, and unlocks protections and funding access many eligible businesses never claim. Here is what it actually gets you.',
    publishedAt: '2026-07-10',
    relatedServiceSlug: 'msme-udyam-registration',
    body: [
      'Udyam Registration is one of the highest-value, lowest-effort compliance steps an eligible small business can take — it is free, entirely online, and yet a surprising number of qualifying businesses never register simply because they assume it is only relevant to manufacturers or larger factories.',
      '## Priority lending and lower interest rates',
      'Registered MSMEs get access to priority-sector lending from banks, often at more favourable interest rates than conventional business loans, along with collateral-free credit guarantee schemes like CGTMSE.',
      '## Protection against delayed payments',
      'Under the MSMED Act, buyers are legally required to pay registered MSME suppliers within 45 days. If they do not, the buyer owes compound interest at three times the bank rate — a real, enforceable protection that unregistered businesses simply do not have access to.',
      '## Government scheme and marketplace access',
      'Udyam registration is a prerequisite for several government schemes, subsidy programmes, and for listing on the Government e-Marketplace (GeM) — a significant channel for businesses that want to sell to government departments and PSUs.',
      '## Does it expire?',
      'No. The Udyam certificate has no expiry date, though you are expected to update your investment and turnover figures if they cross the threshold for your current classification.',
    ],
  },
  {
    slug: 'import-export-code-when-do-you-need-it',
    title: 'Import Export Code (IEC): When Exactly Do You Need One?',
    excerpt:
      'If your business touches cross-border trade in any form, an IEC is likely mandatory. A clear breakdown of who needs it and what happens if you skip it.',
    publishedAt: '2026-06-28',
    relatedServiceSlug: 'import-export-code',
    body: [
      "An Import Export Code sounds like something only large trading houses need, but in practice it applies far more broadly — any individual or business importing or exporting goods or services, in almost any volume, generally needs one. It's a 10-digit code issued by the DGFT and, unlike GST, it has no turnover threshold.",
      '## Why customs and banks both ask for it',
      'Indian Customs will not clear an import or export shipment without a valid IEC linked to the transaction, and banks require it before processing inward or outward foreign currency remittances tied to trade. Without it, both your goods and your payments can get stuck.',
      '## The application itself is fast',
      'IEC registration is entirely online via the DGFT portal, costs a flat government fee, and is typically issued within one to two working days — one of the faster registrations in the Indian compliance landscape.',
      '## The easy-to-miss annual step',
      'IEC does not need to be renewed, but it does need to be updated annually on the DGFT portal — even if nothing has changed. Skipping this update can result in the IEC being deactivated, which then blocks shipments and remittances until it is reactivated.',
      '## One IEC per PAN',
      'Only one IEC is issued per PAN, and it automatically covers all branches and divisions operating under that PAN — there is no need or ability to obtain multiple codes for different locations of the same legal entity.',
    ],
  },
];
