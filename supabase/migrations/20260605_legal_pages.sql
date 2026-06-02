-- Legal pages CMS table

CREATE TABLE IF NOT EXISTS legal_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  content text NOT NULL,
  last_updated timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE legal_pages IS 'Editable legal policy pages for public ISP content.';

CREATE OR REPLACE FUNCTION set_legal_pages_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS legal_pages_set_updated_at ON legal_pages;

CREATE TRIGGER legal_pages_set_updated_at
  BEFORE UPDATE ON legal_pages
  FOR EACH ROW
  EXECUTE FUNCTION set_legal_pages_updated_at();

ALTER TABLE legal_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "legal_pages_select_anon"
  ON legal_pages
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "legal_pages_insert_anon"
  ON legal_pages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "legal_pages_update_anon"
  ON legal_pages
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "legal_pages_delete_anon"
  ON legal_pages
  FOR DELETE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO legal_pages (slug, title, content, last_updated)
SELECT * FROM (VALUES
  (
    'terms',
    'Terms of Service',
    '## Introduction\nExtranet India Private Limited ("Extranet," "we," "us") provides broadband, fiber, and managed internet services. These Terms govern your use of our services and define your rights and obligations as a residential or business customer.\n\n## Eligibility\nService is available only to customers with a valid service address in our authorized coverage area. Customers must be at least 18 years old or authorized representatives of the subscribing business entity.\n\n## Service Availability\nService delivery depends on network capacity, equipment availability, and regulatory approvals. Extranet will use commercially reasonable efforts to maintain service availability but cannot guarantee uninterrupted connectivity.\n\n## Customer Responsibilities\nCustomers must provide accurate contact and billing information, maintain secure access to the installation location, and ensure any customer-owned equipment is compatible and safely installed. Keep credentials confidential and report unauthorized access immediately.\n\n## Network Usage\nServices are intended for lawful personal and business communications. You may not use the network to generate malicious traffic, interfere with network operations, or degrade other customers’ experience. Fair usage practices may apply.\n\n## Billing and Payments\nMonthly fees, installation charges, taxes, and any additional service fees are due in accordance with your agreement. You authorize Extranet to charge the payment method on file. Late payments may incur penalties or service suspension.\n\n## Service Suspension\nExtranet may suspend service for non-payment, policy violations, network abuse, or as required by law. Scheduled maintenance or upgrades may also require temporary suspension. We will restore service once the underlying issue is resolved.\n\n## Limitation of Liability\nExtranet is not liable for indirect, special, incidental, or consequential damages arising from service disruptions, data loss, or third-party content. Our total liability is limited to the fees paid by you for the affected service during the three months prior to the claim.\n\n## Intellectual Property\nAll intellectual property rights in Extranet’s website, service interfaces, documentation, and network tools remain with Extranet or its licensors. Customers receive a limited license to use the service materials only as part of their service relationship.\n\n## Service Modifications\nExtranet may modify service features or pricing to improve performance, comply with law, or support network stability. Material changes will be communicated in advance when possible. Continued service use after notice constitutes acceptance.\n\n## Termination\nEither party may terminate the agreement under applicable contract terms. Extranet may terminate immediately for serious breaches, including non-payment, unlawful conduct, or network abuse. Equipment must be returned and outstanding charges settled upon termination.\n\n## Governing Law\nThese terms are governed by the laws of India. Disputes will be subject to the jurisdiction of courts in the state of Extranet’s registered office.\n\n## Contact Information\nFor questions about these Terms of Service or service support, contact help.extranet@gmail.com or +91 9540901195.',
    now()
  ),
  (
    'privacy',
    'Privacy Policy',
    '## Information We Collect\nWe collect customer registration data, service address details, billing information, device identifiers, and network usage records required to deliver broadband and fiber services. Support inquiries and customer communications are also recorded to improve service.\n\n## How We Use Information\nInformation is used to provision service, manage accounts, process payments, and resolve network issues. We also use data to monitor performance, respond to support requests, and communicate important updates.\n\n## Cookies\nOur website and customer portal use cookies to remember preferences, secure sessions, and improve navigation. Cookies support essential functions such as login persistence and form completion.\n\n## Analytics\nAnalytics tools help us understand how customers use our portal and identify opportunities to improve the experience. Aggregated, anonymized data is preferred whenever possible.\n\n## Data Security\nExtranet maintains administrative, technical, and physical safeguards to protect customer information. Access is restricted to authorized personnel and security practices are reviewed regularly.\n\n## Third-Party Services\nWe may share customer information with third-party service providers who support billing, network operations, or analytics. Partners are contractually required to protect the data and use it only for the services they provide.\n\n## Customer Rights\nCustomers may request access to, correction of, or updates to their account information. Requests should be submitted to our support team and will be handled in accordance with applicable privacy laws.\n\n## Data Retention\nWe retain customer data as needed to provide service, comply with legal obligations, and support operations. Billing records and service history are retained in line with statutory requirements and our retention policies.\n\n## Contact Information\nFor privacy inquiries, contact help.extranet@gmail.com. We are committed to protecting customer data and answering privacy questions promptly.',
    now()
  ),
  (
    'refund',
    'Refund Policy',
    '## Installation Charges\nInstallation charges cover technician visits, wiring, and equipment setup. Refunds are granted only when the installation is canceled before work begins or when activation cannot proceed because of Extranet network limitations.\n\n## Monthly Subscription Charges\nMonthly fees are non-refundable for service already rendered. If you cancel during a billing cycle, that month’s fees remain payable unless otherwise required by law or contract.\n\n## Service Activation\nActivation charges are refundable only when the activation is delayed or prevented by Extranet. If activation fails due to our infrastructure or planning error, we will review the charge for refund on a case-by-case basis.\n\n## Non-Refundable Services\nThird-party services, value-added content, late payment penalties, and administrative fees are generally non-refundable. Any exception will be documented in your service agreement or customer confirmation.\n\n## Refund Processing Time\nRefund requests are reviewed within 7 business days of receipt. Approved refunds are processed within 14 business days and returned to the original payment method or another agreed-upon method.\n\n## Exceptional Circumstances\nIn exceptional circumstances such as service discontinuation, regulatory changes, or significant outages caused by Extranet, we may offer goodwill credits or partial refunds. These are assessed at our discretion and documented in writing.\n\n## Contact Information\nFor refund requests, contact help.extranet@gmail.com or +91 9540901195 and include your account number and invoice details.',
    now()
  ),
  (
    'acceptable-use',
    'Acceptable Use Policy',
    '## Prohibited Activities\nCustomers must not use Extranet services for illegal, abusive, or unauthorized activities. Prohibited conduct includes compromising network security, launching attacks, and engaging in fraud or identity theft.\n\n## Illegal Content\nTransmission, hosting, or sharing of illegal content is strictly forbidden. This includes unauthorized copyrighted material, child sexual abuse material, hate speech that violates law, and any content that breaches Indian or international regulations.\n\n## Network Abuse\nNetwork abuse includes actions that overload or disrupt network infrastructure, such as denial-of-service attacks, port scanning, unauthorized intrusion attempts, and any activity that degrades the service experience for others.\n\n## Spam and Bulk Messaging\nUsing Extranet services to send unsolicited bulk messages, spam, or phishing content is prohibited. This applies to email, messaging apps, and any service that leverages our network resources.\n\n## Security Violations\nCustomers must not bypass network security, exploit vulnerabilities, or distribute malware. Compromising Extranet systems or customer premises equipment is a serious violation and may lead to termination.\n\n## Bandwidth Abuse\nExcessive use of bandwidth that negatively impacts overall network performance is prohibited. We may apply traffic management or fair usage practices to preserve service quality for all subscribers.\n\n## Enforcement Actions\nExtranet may investigate reports or automated alerts of policy violations. Confirmed violations may result in warnings, temporary restrictions, or termination in accordance with the service agreement.\n\n## Account Suspension\nSerious or repeated violations may result in account suspension or termination. Customers remain responsible for all charges accrued during suspension and must cooperate with Extranet to resolve the issue before service restoration.',
    now()
  ),
  (
    'cancellation',
    'Cancellation Policy',
    '## Service Cancellation Requests\nCustomers may request service cancellation by contacting Extranet support by phone or email. Cancellation requests must include the account holder name, service address, and account number or registered mobile number.\n\n## Notice Period\nA notice period may apply based on your service agreement. Month-to-month subscriptions generally take effect at the end of the current billing cycle. Fixed-term or promotional plans may incur early termination fees set forth in the contract.\n\n## Equipment Return\nRented equipment, including routers, ONTs, and cabling supplied by Extranet, must be returned within the timeframe specified during cancellation. Unreturned equipment may result in replacement charges.\n\n## Outstanding Payments\nAny outstanding service charges, taxes, or equipment fees remain payable upon cancellation. Final billing will reflect prorated service, outstanding balances, and any applicable termination fees.\n\n## Refund Eligibility\nRefunds on prepaid charges are evaluated based on your plan and the reason for cancellation. Prepaid months already consumed are generally non-refundable. Eligible refunds are processed after verification of account status and equipment return.\n\n## Account Closure\nAfter cancellation and equipment return, Extranet will close your account and send confirmation. Certain records may be retained to satisfy legal, accounting, or regulatory obligations.\n\n## Contact Information\nFor cancellation requests, contact help.extranet@gmail.com or +91 9540901195. Our team will verify your request and provide a confirmation number for the cancellation process.',
    now()
  )
) AS seed(slug, title, content, last_updated)
WHERE NOT EXISTS (
  SELECT 1 FROM legal_pages WHERE slug = seed.slug
);
