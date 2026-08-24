export type ServiceTier = {
  name: string;
  description: string;
};

export type ServiceSecondaryList = {
  title: string;
  items: string[];
};

export type ServiceClosing = {
  heading?: string;
  body: string;
};

export type Service = {
  id: string;
  title: string;
  kicker: string;
  teaser: string;
  aboutBlurb?: string;
  intro: string[];
  whatsIncluded: string[];
  secondaryList?: ServiceSecondaryList;
  tiers?: ServiceTier[];
  closing: ServiceClosing;
  ctaLabel: string;
};

export const services: Service[] = [
  {
    id: "website-audit",
    title: "Website Health Auditing",
    kicker: "Website Audit & Recommendation Packages",
    teaser:
      "An independent, expert review of what's working, what's not, and where the biggest opportunities for improvement exist.",
    aboutBlurb:
      "We review your website's performance, user experience, security, speed and search engine fundamentals to identify opportunities for improvement and provide clear, actionable recommendations.",
    intro: [
      "Not sure if your website is helping or hurting your business?",
      "Many small and medium-sized businesses know their website could be performing better, but aren't sure where the problems lie — or whether they need a complete rebuild. That's where we come in.",
      "Our Website Audit & Recommendation Packages provide an independent, expert review of your website to uncover what's working, what's not, and where the biggest opportunities for improvement exist. We'll assess everything from user experience, mobile usability and page speed to security, search engine fundamentals and overall website performance.",
      "You'll receive a clear, jargon-free recommendations report with practical actions prioritised by impact, helping you make informed decisions without the cost and commitment of a full-service agency.",
    ],
    whatsIncluded: [
      "Website performance assessment",
      "User experience (UX) review",
      "Desktop and mobile usability audit",
      "Website speed assessment",
      "Security review",
      "SEO fundamentals review",
      "Actionable recommendations report",
    ],
    closing: {
      body: "Whether you're struggling with low enquiries, high bounce rates, a slow website, or simply want confidence that your website is supporting your business goals, we'll help you identify the next steps. Ready to understand how your website is really performing? Book a discovery call or send us your brief today.",
    },
    ctaLabel: "Book a discovery call",
  },
  {
    id: "care-plan",
    title: "Website Care Plan",
    kicker: "Website Care & Security Packages",
    teaser:
      "Ongoing support to keep your website secure, up to date and performing at its best.",
    aboutBlurb:
      "We provide ongoing website maintenance, monitoring, updates and security support to keep your website healthy, secure and performing at its best.",
    intro: [
      "Your website shouldn't be something you have to worry about.",
      "For many small businesses, websites are built, launched and then left unattended — leading to outdated software, security vulnerabilities, poor performance and unexpected downtime. Our Website Care & Security Packages provide ongoing support to keep your website secure, up to date and performing at its best.",
      "Think of us as your website maintenance partner. We proactively monitor, maintain and improve your website so you can focus on running your business.",
      "Whether you're a professional service provider, consultant, medical practice, tradesperson or estate agency, we'll help ensure your website remains a reliable and professional representation of your business.",
    ],
    whatsIncluded: [
      "Monthly website maintenance",
      "Security monitoring",
      "Website updates",
      "Plugin and software updates",
      "Website health checks",
      "Performance improvements",
      "Monthly reporting and recommendations",
    ],
    tiers: [
      {
        name: "Starter",
        description:
          "Ideal for smaller websites that need essential maintenance and security support.",
      },
      {
        name: "Growth",
        description:
          "Perfect for growing businesses that require ongoing monitoring, performance optimisation and proactive support.",
      },
      {
        name: "Premium",
        description:
          "Comprehensive website care for businesses where uptime, security and website performance are business-critical.",
      },
    ],
    secondaryList: {
      title: "Why Businesses Choose a Care Plan",
      items: [
        "Reduce the risk of website downtime",
        "Stay protected against common security threats",
        "Keep software and plugins up to date",
        "Improve website speed and performance",
        "Gain access to trusted website expertise without hiring in-house",
      ],
    },
    closing: {
      body: "Protect your website, your reputation and your customers. Let's discuss the right care plan for your business.",
    },
    ctaLabel: "Discuss your care plan",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity for Small Businesses",
    kicker: "Practical Security, No Enterprise Complexity",
    teaser:
      "Practical protections in place, without unnecessary complexity or expensive enterprise solutions.",
    intro: [
      "Cybersecurity isn't just an enterprise problem.",
      "Small businesses are increasingly targeted by cybercriminals because they often lack the resources, processes and safeguards needed to protect their systems, customer information and online accounts.",
      "Our Cybersecurity for Small Businesses service helps you identify risks, strengthen your security practices and put practical protections in place — without unnecessary complexity or expensive enterprise solutions.",
      "Whether you're an accountant, attorney, medical practice, property agency or retailer, we'll help you reduce risk and improve your cyber resilience.",
    ],
    whatsIncluded: [
      "Password management best practices",
      "Multi-factor authentication (MFA/2FA) setup and guidance",
      "Website security reviews",
      "Small business security assessments",
      "Cybersecurity policies and procedures",
      "Staff security awareness recommendations",
      "Security checklists and action plans",
    ],
    secondaryList: {
      title: "Common Risks We Help Address",
      items: [
        "Weak or reused passwords",
        "Unprotected business accounts",
        "Website vulnerabilities",
        "Data breaches and unauthorised access",
        "Lack of security processes and policies",
        "Human error and phishing risks",
      ],
    },
    closing: {
      heading: "Practical Security. Real Peace of Mind.",
      body: "We focus on simple, effective measures that make a meaningful difference to your business's security posture, helping protect your reputation, customer trust and business continuity. Not sure where your security risks are? Book a cybersecurity review and get practical recommendations tailored to your business.",
    },
    ctaLabel: "Book a cybersecurity review",
  },
  {
    id: "improvements",
    title: "Website Improvements & Enhancements",
    kicker: "Practical, High-Impact Updates",
    teaser:
      "Practical, high-impact updates that help your website work harder for your business.",
    aboutBlurb:
      "From landing pages and user experience improvements to website refreshes and optimisation, we help businesses make meaningful improvements without the need for a complete rebuild.",
    intro: [
      "Your website doesn't always need a complete rebuild to perform better.",
      "Many businesses live with websites that feel outdated, are difficult to navigate, don't generate enough enquiries, or no longer reflect where the business is today. Often, a few strategic improvements can make a significant difference to both customer experience and business results.",
      "Our Website Improvements & Enhancements service focuses on practical, high-impact updates that help your website work harder for your business. Whether you need a new landing page, a user experience refresh, or improvements to key customer journeys, we'll help you identify and implement the changes that matter most.",
    ],
    whatsIncluded: [
      "Landing page design and development",
      "User experience (UX) enhancements",
      "Website refreshes and visual improvements",
      "Navigation and customer journey optimisation",
      "Conversion-focused recommendations",
      "Mobile usability improvements",
    ],
    secondaryList: {
      title: "Common Challenges We Help Solve",
      items: [
        "Your website looks outdated",
        "Visitors aren't converting into enquiries",
        "Key information is difficult to find",
        "The mobile experience feels frustrating",
        "Marketing campaigns need dedicated landing pages",
        "Your website no longer reflects your brand or services",
      ],
    },
    closing: {
      heading: "Small Changes. Meaningful Results.",
      body: "We focus on practical improvements that enhance the customer experience, strengthen your online presence and support your business goals — without the cost and disruption of a complete website rebuild. Whether you have a list of improvements in mind or simply know that your website could be performing better, we'll help you prioritise the next steps. Let's discuss how a few smart website improvements could make a big difference to your business.",
    },
    ctaLabel: "Let's talk improvements",
  },
];
