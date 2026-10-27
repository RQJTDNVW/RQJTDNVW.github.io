export interface ProjectImageSet {
  cover: string;
  website: string;
  vscode: string;
  terminal: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  sublabel?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  techniques: string[];
  metrics?: ProjectMetric[];
  datasetInfo?: {
    rawRecords: string;
    cleanedRecords: string;
    invoices: string;
    skus: string;
    countries: string;
  };
  bestModel?: string;
  githubUrl: string;
  images: ProjectImageSet;
}

export interface CapabilityCard {
  id: string;
  title: string;
  description: string;
  iconName: 'Brain' | 'Eye' | 'BarChart3' | 'Cpu';
  details: string;
}

export interface TechCategory {
  title: string;
  skills: string[];
}

export const PERSONAL_INFO = {
  name: "JOEL BINU",
  title: "AI/ML Developer | Python Developer",
  tagline: "Building intelligent systems that turn data into practical solutions.",
  location: "Kerala, India",
  status: "Fresher / Early-career AI/ML developer",
  email: "joelbinu1352232342@gmail.com",
  github: "https://github.com/RQJTDNVW",
  githubDisplay: "github.com/RQJTDNVW",
  linkedin: "https://www.linkedin.com/in/joel-binu-1349aa419",
  linkedinDisplay: "linkedin.com/in/joel-binu-1349aa419",
  education: {
    degree: "B.Voc in Software Development",
    institution: "St. Albert's College, Kochi",
    year: "2026",
    cgpa: "6.23"
  },
  careerDirection: {
    targetRole: "AI/ML Engineer",
    text: "Building deeper expertise in artificial intelligence and machine learning, with plans to pursue a Master's in Artificial Intelligence and continue developing practical intelligent systems.",
    stages: [
      { label: "Learning", desc: "Foundations in ML & Deep Learning" },
      { label: "Building", desc: "Applied AI models & end-to-end apps" },
      { label: "Engineering", desc: "Production pipelines, APIs & deployment" },
      { label: "AI/ML Engineer", desc: "Intelligent systems with real-world impact" }
    ]
  },
  aboutMe: {
    paragraphs: [
      "I'm Joel Binu, an AI/ML Developer and Python Developer focused on building intelligent systems that turn data into practical solutions.",
      "I completed my B.Voc in Software Development at St. Albert's College, Kochi, and have been developing my skills through hands-on AI/ML projects. My interests include computer vision, predictive modeling, unsupervised learning, AI automation, and intelligent applications.",
      "I enjoy taking machine learning beyond training by connecting models to APIs, dashboards, and real-world products. My goal is to grow into an AI/ML Engineer, pursue a Master's in Artificial Intelligence, and build intelligent products with meaningful real-world impact."
    ]
  }
};

export const CAPABILITIES: CapabilityCard[] = [
  {
    id: "ml",
    title: "Machine Learning",
    description: "Building predictive and intelligent systems using data-driven approaches.",
    iconName: "Brain",
    details: "Algorithm selection, feature selection, ensemble modeling & performance evaluation."
  },
  {
    id: "cv",
    title: "Computer Vision",
    description: "Exploring vision-based solutions for practical real-world applications.",
    iconName: "Eye",
    details: "Image processing, spatial patterns, visual data pipelines and real-time detection."
  },
  {
    id: "data",
    title: "Data & Analytics",
    description: "Working with data preprocessing, feature engineering, analysis, and model evaluation.",
    iconName: "BarChart3",
    details: "Outlier handling, distribution transformation, statistical validation and rule mining."
  },
  {
    id: "apps",
    title: "AI Applications",
    description: "Turning trained models into usable APIs, dashboards, and applications.",
    iconName: "Cpu",
    details: "FastAPI / Flask microservices, modern interactive interfaces, and model serving."
  }
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Programming",
    skills: ["Python", "C++"]
  },
  {
    title: "Machine Learning & AI",
    skills: [
      "Scikit-learn",
      "XGBoost",
      "Computer Vision",
      "NLP",
      "Deep Learning",
      "Unsupervised Learning"
    ]
  },
  {
    title: "Data",
    skills: ["Pandas", "NumPy", "SQL", "Data Visualization"]
  },
  {
    title: "Development",
    skills: ["FastAPI", "Flask", "React", "HTML", "CSS", "JavaScript"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "student-placement",
    number: "01",
    category: "MACHINE LEARNING",
    title: "Student Placement Prediction using Machine Learning",
    description: "An end-to-end machine learning application that estimates whether a student is likely to be placed based on academic, personal, and relevant features. The project focuses on comparing multiple machine learning algorithms while handling class imbalance and selecting useful features.",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "Imbalanced-learn",
      "Joblib"
    ],
    techniques: [
      "Logistic Regression",
      "KNN",
      "Naive Bayes",
      "Decision Tree",
      "Random Forest",
      "SVM",
      "XGBoost",
      "SMOTE",
      "Wrapper-based feature selection",
      "RFE",
      "Model comparison"
    ],
    bestModel: "XGBoost",
    metrics: [
      { label: "Accuracy", value: "68.68%", sublabel: "Best Model: XGBoost" },
      { label: "Recall", value: "83.37%", sublabel: "Placement Class" },
      { label: "F1 Score", value: "78.47%", sublabel: "Balanced metric" }
    ],
    githubUrl: "https://github.com/RQJTDNVW/Students_Placement_Prediction",
    images: {
      cover: "/images/projects/student-placement/cover.png",
      website: "/images/projects/student-placement/website.png",
      vscode: "/images/projects/student-placement/vscode.png",
      terminal: "/images/projects/student-placement/terminal.png"
    }
  },
  {
    id: "california-housing",
    number: "02",
    category: "REGRESSION & MODEL STACKING",
    title: "California Housing Price Prediction",
    description: "An end-to-end regression project focused on predicting California housing values while exploring preprocessing, missing-value handling, feature engineering, ensemble learning, model stacking, and interactive visualization.",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "Joblib",
      "Bokeh",
      "Plotly",
      "Manim"
    ],
    techniques: [
      "Missing-value handling",
      "Missing indicators",
      "Median imputation",
      "IQR-based outlier handling",
      "Feature engineering",
      "Random Forest",
      "Gradient Boosting",
      "XGBoost",
      "Stacking Regressor",
      "Log-transformed target"
    ],
    githubUrl: "https://github.com/RQJTDNVW/-california-housing-ml",
    images: {
      cover: "/images/projects/california-housing/cover.png",
      website: "/images/projects/california-housing/website.png",
      vscode: "/images/projects/california-housing/vscode.png",
      terminal: "/images/projects/california-housing/terminal.png"
    }
  },
  {
    id: "shopgraph",
    number: "03",
    category: "VECTOR SEARCH & PRODUCT DISCOVERY",
    title: "ShopGraph",
    description: "An AI-powered e-commerce product discovery system that explores how machine learning can represent products semantically, discover relationships between products, perform vector-based search, and support intelligent product recommendations. The project uses product data to create machine-readable representations that can be used for semantic discovery and recommendation workflows.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Vite",
      "FAISS",
      "Machine Learning / NLP"
    ],
    techniques: [
      "Semantic product representations",
      "Product embeddings",
      "Vector search",
      "Product discovery",
      "Product clustering",
      "Intelligent recommendations",
      "AI-powered e-commerce applications"
    ],
    githubUrl: "https://github.com/RQJTDNVW/Shop-Graph",
    images: {
      cover: "/images/projects/shopgraph/cover.png",
      website: "/images/projects/shopgraph/website.png",
      vscode: "/images/projects/shopgraph/vscode.png",
      terminal: "/images/projects/shopgraph/terminal.png"
    }
  },
  {
    id: "market-basket",
    number: "04",
    category: "ASSOCIATION RULE MINING",
    title: "Market Basket Intelligence",
    description: "A retail analytics project that uses association-rule mining to discover relationships between products and identify purchasing patterns within transactional data. The project demonstrates how unsupervised pattern discovery can be applied to retail analytics to uncover product relationships and purchasing behavior.",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Association Rule Mining",
      "Data Analysis",
      "Data Visualization"
    ],
    techniques: [
      "Apriori algorithm",
      "Frequent itemset mining",
      "Association rule generation",
      "Support",
      "Confidence",
      "Lift",
      "Transaction preprocessing",
      "Retail pattern analysis"
    ],
    datasetInfo: {
      rawRecords: "522,064",
      cleanedRecords: "520,136",
      invoices: "19,737",
      skus: "4,051",
      countries: "30"
    },
    metrics: [
      { label: "Frequent Itemsets", value: "378", sublabel: "Min Support: 0.02" },
      { label: "Cleaned Records", value: "520,136", sublabel: "From 522K raw" },
      { label: "Invoices Analyzed", value: "19,737", sublabel: "Across 30 countries" },
      { label: "Unique SKUs", value: "4,051", sublabel: "Retail products" }
    ],
    githubUrl: "https://github.com/RQJTDNVW/Market-Basket-Intelligence",
    images: {
      cover: "/images/projects/market-basket/cover.png",
      website: "/images/projects/market-basket/website.png",
      vscode: "/images/projects/market-basket/vscode.png",
      terminal: "/images/projects/market-basket/terminal.png"
    }
  }
];
