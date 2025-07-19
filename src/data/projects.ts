export interface Project {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  isFeatured?: boolean;
  companyLogo?: string;
  award?: string;
  caseStudy?: {
    hook?: string;
    sections: {
      title: string;
      content?: string;
      keyOutcomes?: string[];
      solutionItems?: string[];
      solutionImage?: string;
      solutionImages?: (string | string[])[];
    }[];
  };
}

// Sample projects - replace with your own content
export const currentProjects: Project[] = [
  {
    id: 'project-1',
    title: 'AI-Powered Dashboard',
    description: 'Modern analytics dashboard with AI-driven insights and real-time data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format',
    technologies: ['React', 'TypeScript', 'Design Systems', 'AI/ML'],
    isFeatured: true,
    caseStudy: {
      sections: [
        {
          title: "The problem",
          content: "Users struggled to extract meaningful insights from complex data sets, requiring hours of manual analysis."
        },
        {
          title: "My role",
          content: "Led the UX design and frontend development, working closely with data scientists and product managers."
        },
        {
          title: "Impact and key outcomes",
          content: "Transformed data analysis workflow, enabling users to discover insights in minutes rather than hours.",
          keyOutcomes: [
            "Reduced analysis time by 75%",
            "Increased user engagement by 200%",
            "Improved decision-making speed across teams"
          ]
        },
        {
          title: "Solution",
          solutionItems: [
            "Intuitive drag-and-drop interface for data exploration",
            "AI-powered recommendations for relevant metrics",
            "Real-time collaborative features for team analysis"
          ],
          solutionImages: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&auto=format"
          ]
        }
      ]
    }
  },
  {
    id: 'project-2',
    title: 'Mobile Design System',
    description: 'Comprehensive design system that unified experience across iOS and Android platforms.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format',
    technologies: ['Design Systems', 'Mobile UX', 'Component Library', 'Cross-platform'],
    caseStudy: {
      sections: [
        {
          title: "The problem",
          content: "Inconsistent design patterns across mobile apps led to poor user experience and slow development cycles."
        },
        {
          title: "My role", 
          content: "Design system architect and lead designer, coordinating between design and engineering teams."
        },
        {
          title: "Impact and key outcomes",
          content: "Established unified design language that accelerated development and improved user satisfaction.",
          keyOutcomes: [
            "50% faster component development",
            "Unified experience across 6 mobile apps",
            "25% improvement in user satisfaction scores"
          ]
        },
        {
          title: "Solution",
          solutionItems: [
            "Modular component library with clear documentation",
            "Design tokens system for consistent styling",
            "Automated testing for design consistency"
          ],
          solutionImages: [
            "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&auto=format"
          ]
        }
      ]
    }
  }
];

// Previous work projects
export const previousProjects: Project[] = [
  {
    id: 'project-3',
    title: 'E-commerce Platform Redesign',
    description: 'Complete redesign of B2B e-commerce platform focusing on conversion optimization and user experience.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format',
    technologies: ['UX Design', 'Conversion Optimization', 'User Research', 'A/B Testing'],
    companyLogo: 'TechCorp',
    caseStudy: {
      sections: [
        {
          title: "The problem",
          content: "The existing platform had low conversion rates and users frequently abandoned their shopping carts."
        },
        {
          title: "My role",
          content: "Lead UX designer responsible for user research, wireframing, and conversion optimization strategy."
        },
        {
          title: "Impact and key outcomes", 
          content: "Significantly improved user experience leading to measurable business impact.",
          keyOutcomes: [
            "40% increase in conversion rate",
            "60% reduction in cart abandonment",
            "25% increase in average order value"
          ]
        },
        {
          title: "Solution",
          solutionItems: [
            "Streamlined checkout process with fewer steps",
            "Improved product discovery through better navigation",
            "Enhanced mobile experience for on-the-go purchasing"
          ],
          solutionImages: [
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&auto=format"
          ]
        }
      ]
    }
  },
  {
    id: 'project-4',
    title: 'Healthcare App',
    description: 'Patient management mobile application that improves communication between healthcare providers.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&auto=format',
    technologies: ['Mobile Design', 'Healthcare UX', 'Data Security', 'Accessibility'],
    companyLogo: 'HealthTech'
  },
  {
    id: 'project-5',
    title: 'FinTech Dashboard',
    description: 'Financial analytics platform that simplifies complex investment data for portfolio managers.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop&auto=format',
    technologies: ['Data Visualization', 'Financial UX', 'Real-time Analytics', 'Security'],
    companyLogo: 'FinanceFlow'
  }
];

// Projects with completed case studies for navigation
export const navigableProjects: Project[] = [
  ...currentProjects,
  previousProjects.find(p => p.id === 'sifted')!
];

// Legacy export for compatibility
export const projects: Project[] = [...currentProjects, ...previousProjects];