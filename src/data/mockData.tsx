import { 
  FileSpreadsheet, LayoutTemplate, FileText, Search, Headphones, ClipboardList, 
  BarChart3, TrendingUp, PenTool, Database, Image, Video, Rocket, Sparkles, 
  GitBranch, Palette, Scale, Megaphone, Box, Zap, Dna, Globe, Users, Code2, 
  Layers, Cpu, Code, Smartphone, AlertTriangle, PlayCircle, Clock, Workflow, 
  CreditCard, SmartphoneNfc, Container, FolderGit2, Paintbrush, Repeat, Grid, 
  Server, MessageSquare, MapPin, Tablet, Download, Plus, Check, Terminal, X, Cloud
} from 'lucide-react';

export const SUGGESTIONS = [
  { icon: <FileSpreadsheet size={16} />, label: "dashboard.suggestions.spreadsheets" },
  { icon: <LayoutTemplate size={16} />, label: "dashboard.suggestions.presentation" },
  { icon: <FileText size={16} />, label: "dashboard.suggestions.document" },
  { icon: <Search size={16} />, label: "dashboard.suggestions.deepResearch" },
  { icon: <Headphones size={16} />, label: "dashboard.suggestions.podcast" },
  { icon: <ClipboardList size={16} />, label: "dashboard.suggestions.forms" },
  { icon: <BarChart3 size={16} />, label: "dashboard.suggestions.dataAnalysis" },
  { icon: <TrendingUp size={16} />, label: "dashboard.suggestions.stockAnalysis" },
  { icon: <PenTool size={16} />, label: "dashboard.suggestions.design" },
  { icon: <Database size={16} />, label: "dashboard.suggestions.dataScraping" },
  { icon: <Image size={16} />, label: "dashboard.suggestions.image" },
  { icon: <Video size={16} />, label: "dashboard.suggestions.video" },
];

export const BUILD_SUGGESTIONS = [
  { icon: <Rocket size={16} />, label: "dashboard.buildSuggestions.portfolio" },
  { icon: <Database size={16} />, label: "dashboard.buildSuggestions.fullStack" },
  { icon: <Sparkles size={16} />, label: "dashboard.buildSuggestions.aiApp" },
  { icon: <GitBranch size={16} />, label: "dashboard.buildSuggestions.codeReview" },
  { icon: <Palette size={16} />, label: "dashboard.buildSuggestions.uiUx" },
];

export const SKILL_SUGGESTIONS = [
  { icon: <Cloud size={16} />, label: "dashboard.skillSuggestions.vercel" },
  { icon: <Search size={16} />, label: "dashboard.skillSuggestions.deepResearch" },
  { icon: <AlertTriangle size={16} />, label: "dashboard.skillSuggestions.incidentResponse" },
  { icon: <FileText size={16} />, label: "dashboard.skillSuggestions.runbook" },
  { icon: <Zap size={16} />, label: "dashboard.skillSuggestions.pagerduty" },
];

export const SKILL_EXAMPLES = [
  {
    title: "dashboard.skillExamples.brandDesign.title",
    description: "dashboard.skillExamples.brandDesign.description",
  },
  {
    title: "dashboard.skillExamples.emailTemplate.title",
    description: "dashboard.skillExamples.emailTemplate.description",
  },
  {
    title: "dashboard.skillExamples.dbAccess.title",
    description: "dashboard.skillExamples.dbAccess.description",
  },
  {
    title: "dashboard.skillExamples.deployment.title",
    description: "dashboard.skillExamples.deployment.description",
  }
];

export const PROFESSIONAL_CATEGORIES = [
  { icon: <span className="text-xs">$</span>, label: "dashboard.categories.sales" },
  { icon: <BarChart3 size={14} />, label: "dashboard.categories.data" },
  { icon: <FileText size={14} />, label: "dashboard.categories.finance" },
  { icon: <Scale size={14} />, label: "dashboard.categories.legal" },
  { icon: <Megaphone size={14} />, label: "dashboard.categories.marketing" },
  { icon: <Box size={14} />, label: "dashboard.categories.product" },
  { icon: <Headphones size={14} />, label: "dashboard.categories.support" },
  { icon: <Search size={14} />, label: "dashboard.categories.search" },
  { icon: <Zap size={14} />, label: "dashboard.categories.productivity" },
  { icon: <Dna size={14} />, label: "dashboard.categories.bioResearch" },
];

export const WORKFLOWS: Record<string, { title: string; description: string }[]> = {
  "dashboard.categories.sales": [
    { title: "Pipeline Review", description: "Analyze pipeline health — prioritize deals, flag risks, get a weekly action plan." },
    { title: "Forecast", description: "Generate a weighted sales forecast with best/likely/worst scenarios and..." },
    { title: "Call Summary", description: "Process call notes or transcript — extract action items, draft follow-up..." },
  ],
  "dashboard.categories.data": [
    { title: "Analyze", description: "Answer data questions — from quick lookups to full analyses" },
    { title: "Build Dashboard", description: "Build an interactive HTML dashboard with charts, filters, and tables" },
    { title: "Create Visualization", description: "Create publication-quality visualizations with Python" },
    { title: "Explore Data", description: "Profile and explore a dataset to understand its shape, quality, and..." },
    { title: "Validate", description: "QA an analysis before sharing — methodology, accuracy, and bias..." },
    { title: "Write Query", description: "Write optimized SQL for your dialect with best practices" },
  ],
  "dashboard.categories.finance": [
    { title: "Income Statement", description: "Generate an income statement with period-over-period comparison and..." },
    { title: "Journal Entry", description: "Prepare journal entries with proper debits, credits, and supporting detail" },
    { title: "Reconciliation", description: "Reconcile GL balances to subledger, bank, or third-party balances" },
    { title: "SOX Testing", description: "Generate SOX sample selections, testing workpapers, and control..." },
    { title: "Variance Analysis", description: "Decompose variances into drivers with narrative explanations and..." },
  ],
  "dashboard.categories.legal": [
    { title: "Review Contract", description: "Review a contract against your negotiation playbook — flag..." },
    { title: "Triage NDA", description: "Rapidly triage an incoming NDA — classify as standard, counsel revie..." },
    { title: "Legal Brief", description: "Generate contextual briefings — daily summary, topic research, or inciden..." },
    { title: "Respond to Inquiry", description: "Generate a response to a common legal inquiry using configured..." },
    { title: "Vendor Check", description: "Check the status of existing agreements with a vendor across al..." },
  ],
  "dashboard.categories.marketing": [
    { title: "Draft Content", description: "Draft blog posts, social media, email newsletters, landing pages, and cas..." },
    { title: "Campaign Plan", description: "Generate a full campaign brief with objectives, channels, content..." },
    { title: "Brand Review", description: "Review content against your brand voice, style guide, and messaging..." },
    { title: "Competitive Brief", description: "Research competitors and generate a positioning and messaging..." },
    { title: "Email Sequence", description: "Design and draft multi-email sequences for nurture flows,..." },
    { title: "Performance Report", description: "Build a marketing performance report with key metrics, trends, and..." },
  ],
  "dashboard.categories.product": [
    { title: "Write Spec", description: "Write a feature spec or PRD from a problem statement or feature idea" },
    { title: "Roadmap Update", description: "Update, create, or reprioritize your product roadmap" },
    { title: "Synthesize Research", description: "Synthesize user research from interviews, surveys, and feedback..." },
    { title: "Metrics Review", description: "Review and analyze product metrics with trend analysis and actionable..." },
    { title: "Competitive Brief", description: "Create a competitive analysis brief for one or more competitors or a..." },
    { title: "Stakeholder Update", description: "Generate a stakeholder update tailored to audience and cadence" },
  ],
  "dashboard.categories.support": [
    { title: "Triage", description: "Triage and prioritize a support ticket or customer issue" },
    { title: "Draft Response", description: "Draft a professional customer-facing response tailored to the situation" },
    { title: "Escalate", description: "Package an escalation for engineering, product, or leadership..." },
    { title: "KB Article", description: "Draft a knowledge base article from a resolved issue or common question" },
    { title: "Research", description: "Multi-source research on a customer question or topic with source..." },
  ],
  "dashboard.categories.search": [
    { title: "Search", description: "Search across all connected sources in one query" },
    { title: "Digest", description: "Generate a daily or weekly digest of activity across all connected sources" },
  ],
  "dashboard.categories.productivity": [
    { title: "Start Day", description: "Initialize the productivity system and open the dashboard" },
    { title: "Update Tasks", description: "Sync tasks and refresh memory from your current activity" },
  ],
  "dashboard.categories.bioResearch": [
    { title: "Start Research", description: "Set up your bio-research environment and explore available..." },
  ]
};

export const BUILD_EXAMPLES: Record<string, { title: string; description: string; tags: string[]; image: string }[]> = {
  "dashboard.buildSuggestions.portfolio": [
    {
      title: "开发者作品集",
      description: "简约作品集，包含博客、工作经历和项目展示。",
      tags: ["Next.js", "Tailwind", "Portfolio"],
      image: "https://picsum.photos/seed/portfolio1/400/250"
    },
    {
      title: "现代作品集",
      description: "带有平滑滚动和联系表单的响应式作品集。",
      tags: ["React", "Framer Motion"],
      image: "https://picsum.photos/seed/portfolio2/400/250"
    },
    {
      title: "获奖网站",
      description: "滚动触发动画、3D悬浮效果和独特的排版。",
      tags: ["Three.js", "GSAP"],
      image: "https://picsum.photos/seed/portfolio3/400/250"
    },
    {
      title: "自由职业者主页",
      description: "展示服务、客户评价和案例研究的着陆页。",
      tags: ["Next.js", "Stripe"],
      image: "https://picsum.photos/seed/portfolio4/400/250"
    }
  ],
  "dashboard.buildSuggestions.fullStack": [
    {
      title: "SaaS 仪表盘",
      description: "包含用户管理、数据分析和订阅功能的完整仪表盘。",
      tags: ["Next.js", "PostgreSQL", "Prisma"],
      image: "https://picsum.photos/seed/saas1/400/250"
    },
    {
      title: "电商平台",
      description: "支持购物车、支付集成和订单管理。",
      tags: ["React", "Node.js", "Stripe"],
      image: "https://picsum.photos/seed/ecommerce1/400/250"
    },
    {
      title: "任务管理工具",
      description: "类似 Trello 的看板，支持拖拽和实时协作。",
      tags: ["Vue", "Firebase"],
      image: "https://picsum.photos/seed/task1/400/250"
    },
    {
      title: "社交网络应用",
      description: "包含动态流、评论、点赞和私信功能。",
      tags: ["React Native", "GraphQL"],
      image: "https://picsum.photos/seed/social1/400/250"
    }
  ],
  "dashboard.buildSuggestions.aiApp": [
    {
      title: "AI 聊天机器人",
      description: "功能齐全的聊天机器人，支持上下文记忆和多模态输入。",
      tags: ["Next.js", "OpenAI API", "Vercel AI SDK"],
      image: "https://picsum.photos/seed/ai1/400/250"
    },
    {
      title: "与数据库聊天",
      description: "用通俗易懂的英语提问，并从你的数据库中获得答案。",
      tags: ["LangChain", "SQL", "Python"],
      image: "https://picsum.photos/seed/ai2/400/250"
    },
    {
      title: "LangChain代理",
      description: "配备由LangGraph和AI SDK驱动的工具的代理。",
      tags: ["LangGraph", "Agent", "Tools"],
      image: "https://picsum.photos/seed/ai3/400/250"
    },
    {
      title: "RAG文件问答",
      description: "使用 Supabase 向量存储的 RAG 聊天机器人。",
      tags: ["RAG", "Supabase", "Embeddings"],
      image: "https://picsum.photos/seed/ai4/400/250"
    }
  ],
  "dashboard.buildSuggestions.codeReview": [
    {
      title: "检查TypeScript的类型安全",
      description: "找出'任何'使用情况，缺少返回类型，不安全的类型断言...",
      tags: ["TypeScript", "Linter", "Static Analysis"],
      image: "https://picsum.photos/seed/code1/400/250"
    },
    {
      title: "API 端点架构审查",
      description: "检查 REST 约定、HTTP 状态码、错误响应格式一致性...",
      tags: ["API", "REST", "Architecture"],
      image: "https://picsum.photos/seed/code2/400/250"
    },
    {
      title: "复习Rust代码",
      description: "检查所有权/借用模式、不安全的块理由、错误处理...",
      tags: ["Rust", "Safety", "Performance"],
      image: "https://picsum.photos/seed/code3/400/250"
    },
    {
      title: "安全审查数据库查询",
      description: "检查原始查询中是否有SQL注入、参数化查询使用...",
      tags: ["Security", "SQL", "Audit"],
      image: "https://picsum.photos/seed/code4/400/250"
    }
  ],
  "dashboard.buildSuggestions.uiUx": [
    {
      title: "创建日历视图",
      description: "月份网格并高亮今天，事件作为彩色药丸，点击日期查看日视图...",
      tags: ["Calendar", "UI Component", "React"],
      image: "https://picsum.photos/seed/ui1/400/250"
    },
    {
      title: "创建聊天界面",
      description: "消息列表（用户=右/蓝，bot=左/灰，时间戳），打字指示动画...",
      tags: ["Chat UI", "Messaging", "CSS"],
      image: "https://picsum.photos/seed/ui2/400/250"
    },
    {
      title: "创建时间线视图",
      description: "垂直时间线，带有日期头，里程碑标记（完成=绿色勾，当前=蓝点...",
      tags: ["Timeline", "Visualization", "Layout"],
      image: "https://picsum.photos/seed/ui3/400/250"
    },
    {
      title: "创建入职流程",
      description: "四步进度指示器，每步一个问题（姓名、角色下拉菜单、团队规模滑块...",
      tags: ["Onboarding", "Form", "Wizard"],
      image: "https://picsum.photos/seed/ui4/400/250"
    }
  ]
};

export const EXAMPLES: Record<string, { title: string; prompt: string; skill: string; suggested: string[] }[]> = {
  "dashboard.suggestions.spreadsheets": [
    { 
      title: "Use the spreadsheet-workflow skill. Clean up this spreadsheet...", 
      prompt: "Use the spreadsheet-workflow skill. Clean up this spreadsheet and format it for presentation.",
      skill: "spreadsheet-workflow",
      suggested: ["rebyte-app-builder", "moai-domain-database", "moai-domain-backend", "mcp-builder", "senior-backend"]
    },
    { 
      title: "Use the spreadsheet-workflow skill. Research Tokyo,...", 
      prompt: "Use the spreadsheet-workflow skill. Research Tokyo, Osaka, and Kyoto population trends over the last 10 years.",
      skill: "spreadsheet-workflow",
      suggested: ["data-analysis", "research", "visualization"]
    },
    { 
      title: "Use the spreadsheet-workflow skill. Research FIFA Worl...", 
      prompt: "Use the spreadsheet-workflow skill. Research FIFA World Cup winners and host countries since 1990.",
      skill: "spreadsheet-workflow",
      suggested: ["sports-data", "history", "table-formatting"]
    },
    { 
      title: "Use the spreadsheet-workflow skill. Research the top 1...", 
      prompt: "Use the spreadsheet-workflow skill. Research the top 10 tech companies by market cap and their CEO tenure.",
      skill: "spreadsheet-workflow",
      suggested: ["finance", "tech-sector", "market-analysis"]
    },
    { 
      title: "Use the spreadsheet-workflow skill. Analyze monthly...", 
      prompt: "Use the spreadsheet-workflow skill. Analyze monthly sales data to identify seasonal trends and outliers.",
      skill: "spreadsheet-workflow",
      suggested: ["sales-analysis", "trends", "forecasting"]
    },
    { 
      title: "Use the spreadsheet-workflow skill. Create a budget...", 
      prompt: "Use the spreadsheet-workflow skill. Create a personal budget template with categories for housing, food, and savings.",
      skill: "spreadsheet-workflow",
      suggested: ["budgeting", "personal-finance", "template"]
    }
  ],
  "dashboard.suggestions.presentation": [
    { 
      title: "Use the presentation-workflow skill. Create a sales...", 
      prompt: "Use the presentation-workflow skill. Create a sales deck for our new AI product launch targeting enterprise customers.",
      skill: "presentation-workflow",
      suggested: ["sales-deck", "pitch", "enterprise"]
    },
    { 
      title: "Use the presentation-workflow skill. Convert this...", 
      prompt: "Use the presentation-workflow skill. Convert this blog post into a 10-slide presentation summary.",
      skill: "presentation-workflow",
      suggested: ["content-repurposing", "summary", "slides"]
    },
    { 
      title: "Use the presentation-workflow skill. Research the rise o...", 
      prompt: "Use the presentation-workflow skill. Research the rise of remote work and create a presentation on future workplace trends.",
      skill: "presentation-workflow",
      suggested: ["research", "trends", "remote-work"]
    },
    { 
      title: "Use the presentation-workflow skill. Research...", 
      prompt: "Use the presentation-workflow skill. Research renewable energy adoption rates by country and present findings.",
      skill: "presentation-workflow",
      suggested: ["energy", "global-stats", "charts"]
    },
    { 
      title: "Use the presentation-workflow skill. Design a pitch...", 
      prompt: "Use the presentation-workflow skill. Design a pitch deck for a seed-stage startup in the fintech space.",
      skill: "presentation-workflow",
      suggested: ["startup", "fundraising", "fintech"]
    },
    { 
      title: "Use the presentation-workflow skill. Summarize quarterly...", 
      prompt: "Use the presentation-workflow skill. Summarize quarterly financial results into a visual executive summary.",
      skill: "presentation-workflow",
      suggested: ["finance", "executive-summary", "visualization"]
    }
  ],
  "dashboard.suggestions.document": [
    { 
      title: "Use the document-workflow skill. Add 'CONFIDENTIAL'...", 
      prompt: "Use the document-workflow skill. Add 'CONFIDENTIAL' watermark to this PDF document.",
      skill: "document-workflow",
      suggested: ["pdf-editing", "watermark", "security"]
    },
    { 
      title: "Use the document-workflow skill. Extract all tables...", 
      prompt: "Use the document-workflow skill. Extract all tables from this PDF into a CSV file.",
      skill: "document-workflow",
      suggested: ["data-extraction", "pdf-to-csv", "tables"]
    },
    { 
      title: "Use the document-workflow skill. Extract invoice data...", 
      prompt: "Use the document-workflow skill. Extract invoice data from this PDF: pull out date, invoice number, and total amount.",
      skill: "document-workflow",
      suggested: ["invoice-processing", "ocr", "automation"]
    },
    { 
      title: "Use the document-workflow skill. Restructure this...", 
      prompt: "Use the document-workflow skill. Restructure this spreadsheet: split the 'Name' column into 'First Name' and 'Last Name'.",
      skill: "document-workflow",
      suggested: ["data-cleaning", "formatting", "spreadsheet"]
    },
    { 
      title: "Use the document-workflow skill. Convert Word to...", 
      prompt: "Use the document-workflow skill. Convert this Word document to a clean Markdown file for the blog.",
      skill: "document-workflow",
      suggested: ["conversion", "markdown", "blogging"]
    },
    { 
      title: "Use the document-workflow skill. Merge these PDFs...", 
      prompt: "Use the document-workflow skill. Merge these three PDF reports into a single document with a table of contents.",
      skill: "document-workflow",
      suggested: ["pdf-merge", "organization", "reports"]
    }
  ],
  "dashboard.suggestions.deepResearch": [
    { 
      title: "Use the research-workflow skill. Research the collapse...", 
      prompt: "Use the research-workflow skill. Research the collapse and rebirth of the electric vehicle market in the early 2000s.",
      skill: "research-workflow",
      suggested: ["market-research", "history", "ev-industry"]
    },
    { 
      title: "Use the research-workflow skill. Research the Panama...", 
      prompt: "Use the research-workflow skill. Research the Panama and Suez Canal expansion projects and their economic impact.",
      skill: "research-workflow",
      suggested: ["logistics", "economics", "infrastructure"]
    },
    { 
      title: "Use the research-workflow skill. Research the real...", 
      prompt: "Use the research-workflow skill. Research the real economics of streaming services for artists vs platforms.",
      skill: "research-workflow",
      suggested: ["music-industry", "economics", "streaming"]
    },
    { 
      title: "Use the research-workflow skill. Research TSMC's...", 
      prompt: "Use the research-workflow skill. Research TSMC's Arizona fab: What's the status, challenges, and strategic importance?",
      skill: "research-workflow",
      suggested: ["semiconductors", "manufacturing", "geopolitics"]
    },
    { 
      title: "Use the research-workflow skill. Analyze the impact...", 
      prompt: "Use the research-workflow skill. Analyze the impact of AI on the graphic design industry over the next 5 years.",
      skill: "research-workflow",
      suggested: ["ai-impact", "future-trends", "design"]
    },
    { 
      title: "Use the research-workflow skill. Compare healthcare...", 
      prompt: "Use the research-workflow skill. Compare healthcare systems in the US, UK, and Germany regarding cost and accessibility.",
      skill: "research-workflow",
      suggested: ["healthcare", "comparative-analysis", "policy"]
    }
  ],
  "dashboard.suggestions.podcast": [
    { 
      title: "Use the podcast-workflow skill. Create a 5-minute...", 
      prompt: "Use the podcast-workflow skill. Create a 5-minute motivational podcast script about overcoming procrastination.",
      skill: "podcast-workflow",
      suggested: ["scriptwriting", "motivation", "audio-content"]
    },
    { 
      title: "Use the podcast-workflow skill. Create a podcast...", 
      prompt: "Use the podcast-workflow skill. Create a podcast episode about the history of coffee, featuring two hosts.",
      skill: "podcast-workflow",
      suggested: ["storytelling", "history", "dialogue"]
    },
    { 
      title: "Use the podcast-workflow skill. Create a podcast...", 
      prompt: "Use the podcast-workflow skill. Create a podcast episode explaining quantum computing to a 5-year-old.",
      skill: "podcast-workflow",
      suggested: ["education", "simplification", "science"]
    },
    { 
      title: "Use the podcast-workflow skill. Create a 10-minute...", 
      prompt: "Use the podcast-workflow skill. Create a 10-minute podcast episode reviewing the latest tech news.",
      skill: "podcast-workflow",
      suggested: ["news", "tech", "review"]
    }
  ],
  "dashboard.suggestions.forms": [
    { 
      title: "Use the form-workflow skill. Create a wedding...", 
      prompt: "Use the form-workflow skill. Create a wedding RSVP form: guest names, meal preference, and song requests.",
      skill: "form-workflow",
      suggested: ["event-planning", "data-collection", "rsvp"]
    },
    { 
      title: "Use the form-workflow skill. Create a product...", 
      prompt: "Use the form-workflow skill. Create a product market fit survey for a new SaaS tool.",
      skill: "form-workflow",
      suggested: ["product-management", "survey", "feedback"]
    },
    { 
      title: "Use the form-workflow skill. Create a B2B demo...", 
      prompt: "Use the form-workflow skill. Create a B2B demo request form for an enterprise software website.",
      skill: "form-workflow",
      suggested: ["lead-gen", "b2b", "sales"]
    },
    { 
      title: "Use the form-workflow skill. Create a course...", 
      prompt: "Use the form-workflow skill. Create a course evaluation form for students to provide feedback.",
      skill: "form-workflow",
      suggested: ["education", "feedback", "evaluation"]
    }
  ],
  "dashboard.suggestions.dataAnalysis": [
    { 
      title: "Use the data-analysis-workflow skill. Scrape Amazon...", 
      prompt: "Use the data-analysis-workflow skill. Scrape Amazon for the top 50 best-selling coffee makers and analyze price distribution.",
      skill: "data-analysis-workflow",
      suggested: ["scraping", "ecommerce", "price-analysis"]
    },
    { 
      title: "Use the data-analysis-workflow skill. Scrape Hacker...", 
      prompt: "Use the data-analysis-workflow skill. Scrape Hacker News front page for the last week and identify trending topics.",
      skill: "data-analysis-workflow",
      suggested: ["scraping", "trends", "text-analysis"]
    },
    { 
      title: "Use the data-analysis-workflow skill. Analyze this...", 
      prompt: "Use the data-analysis-workflow skill. Analyze this e-commerce inventory data to identify slow-moving stock.",
      skill: "data-analysis-workflow",
      suggested: ["inventory", "business-intelligence", "retail"]
    },
    { 
      title: "Use the data-analysis-workflow skill. Research...", 
      prompt: "Use the data-analysis-workflow skill. Research Glassdoor reviews for major tech companies to find common employee complaints.",
      skill: "data-analysis-workflow",
      suggested: ["sentiment-analysis", "hr", "reviews"]
    }
  ],
  "dashboard.suggestions.stockAnalysis": [
    { 
      title: "Use the stock-analysis-workflow skill. Research...", 
      prompt: "Use the stock-analysis-workflow skill. Research insider trading at NVIDIA over the last 12 months.",
      skill: "stock-analysis-workflow",
      suggested: ["finance", "insider-trading", "stocks"]
    },
    { 
      title: "Use the stock-analysis-workflow skill. Compare...", 
      prompt: "Use the stock-analysis-workflow skill. Compare Japanese vs US automotive stocks performance YTD.",
      skill: "stock-analysis-workflow",
      suggested: ["market-comparison", "automotive", "global-markets"]
    },
    { 
      title: "Use the stock-analysis-workflow skill. Deep dive...", 
      prompt: "Use the stock-analysis-workflow skill. Deep dive into Tesla's financials: cash flow, debt, and margins.",
      skill: "stock-analysis-workflow",
      suggested: ["financial-analysis", "tesla", "fundamental-analysis"]
    },
    { 
      title: "Use the stock-analysis-workflow skill. Analyze...", 
      prompt: "Use the stock-analysis-workflow skill. Analyze Meta's AI pivot: extract capex spending from earnings calls.",
      skill: "stock-analysis-workflow",
      suggested: ["earnings-calls", "capex", "strategy"]
    }
  ],
  "dashboard.suggestions.design": [
    { 
      title: "Use the design-workflow skill. Design a landing...", 
      prompt: "Use the design-workflow skill. Design a landing page for Stripe-like payment processor.",
      skill: "design-workflow",
      suggested: ["ui-design", "landing-page", "fintech"]
    },
    { 
      title: "Use the design-workflow skill. Create a set of...", 
      prompt: "Use the design-workflow skill. Create a set of 5 header illustrations for a SaaS blog.",
      skill: "design-workflow",
      suggested: ["illustration", "branding", "saas"]
    },
    { 
      title: "Use the design-workflow skill. Create social...", 
      prompt: "Use the design-workflow skill. Create social media assets for a Brazilian coffee brand launch.",
      skill: "design-workflow",
      suggested: ["social-media", "branding", "marketing"]
    },
    { 
      title: "Use the design-workflow skill. Design an...", 
      prompt: "Use the design-workflow skill. Design an infographic explaining how blockchain works.",
      skill: "design-workflow",
      suggested: ["infographic", "education", "visual-design"]
    }
  ],
  "dashboard.suggestions.dataScraping": [
    { 
      title: "Use the data-scraping-workflow skill. Scrape...", 
      prompt: "Use the data-scraping-workflow skill. Scrape LinkedIn job postings for 'Senior React Developer' in Remote locations.",
      skill: "data-scraping-workflow",
      suggested: ["recruiting", "job-market", "scraping"]
    },
    { 
      title: "Use the data-scraping-workflow skill. Extract...", 
      prompt: "Use the data-scraping-workflow skill. Extract product prices and ratings from a competitor's Shopify store.",
      skill: "data-scraping-workflow",
      suggested: ["competitor-analysis", "ecommerce", "pricing"]
    },
    { 
      title: "Use the data-scraping-workflow skill. Monitor...", 
      prompt: "Use the data-scraping-workflow skill. Monitor a government tender website for new RFPs related to IT services.",
      skill: "data-scraping-workflow",
      suggested: ["monitoring", "sales", "gov-tech"]
    },
    { 
      title: "Use the data-scraping-workflow skill. Collect...", 
      prompt: "Use the data-scraping-workflow skill. Collect real estate listings for 2-bedroom apartments in NYC under $4000.",
      skill: "data-scraping-workflow",
      suggested: ["real-estate", "data-collection", "housing"]
    }
  ],
  "dashboard.suggestions.image": [
    {
      title: "Use the image-workflow skill. Create an app icon...",
      prompt: "Use the image-workflow skill. Create an app icon for a Japanese language learning app.",
      skill: "image-workflow",
      suggested: ["icon-design", "app-store", "branding"]
    },
    {
      title: "Use the image-workflow skill. Create an isometric...",
      prompt: "Use the image-workflow skill. Create an isometric illustration of a futuristic smart city.",
      skill: "image-workflow",
      suggested: ["illustration", "isometric", "futuristic"]
    },
    {
      title: "Use the image-workflow skill. Convert this sketch...",
      prompt: "Use the image-workflow skill. Convert this sketch into a polished digital art piece.",
      skill: "image-workflow",
      suggested: ["sketch-to-image", "digital-art", "polishing"]
    },
    {
      title: "Use the image-workflow skill. Create a product...",
      prompt: "Use the image-workflow skill. Create a product lifestyle shot for a new energy drink.",
      skill: "image-workflow",
      suggested: ["product-photography", "marketing", "advertising"]
    }
  ],
  "dashboard.suggestions.video": [
    {
      title: "Create a 20-second cooking tip with voice over...",
      prompt: "Create a 20-second cooking tip with voice over: How to properly dice an onion.",
      skill: "remotion",
      suggested: ["video-editing", "cooking", "tutorial"]
    },
    {
      title: "Create a 20-second product showcase for Tesla...",
      prompt: "Create a 20-second product showcase for Tesla Model 3 with voice over: fetch their logo and car images.",
      skill: "remotion",
      suggested: ["product-video", "tesla", "marketing"]
    },
    {
      title: "Create a 20-second brand story video for Patagonia...",
      prompt: "Create a 20-second brand story video for Patagonia with voice over: fetch their logo and nature images.",
      skill: "remotion",
      suggested: ["brand-story", "patagonia", "nature"]
    },
    {
      title: "Create a 20-second company intro for Stripe...",
      prompt: "Create a 20-second company intro for Stripe with voice over: fetch their logo and office images.",
      skill: "remotion",
      suggested: ["company-intro", "stripe", "corporate"]
    }
  ]
};

export const FEATURED_CARDS = [
  {
    category: "DESIGN",
    title: "web-design-guidelines",
    description: "Review UI code for Web Interface Guidelines complianc...",
    icon: <Database size={24} />,
    color: "bg-pink-50 text-pink-600",
    iconBg: "bg-white"
  },
  {
    category: "DESIGN",
    title: "frontend-design",
    description: "Create distinctive, production-grade frontend interfaces with...",
    icon: <LayoutTemplate size={24} />,
    color: "bg-green-50 text-green-600",
    iconBg: "bg-white"
  },
  {
    category: "DEVELOPMENT",
    title: "skill-creator",
    description: "Guide for creating effective skills. This skill should be used...",
    icon: <Zap size={24} />,
    color: "bg-yellow-50 text-yellow-600",
    iconBg: "bg-white"
  }
];

export const SKILL_LIST = [
  { icon: <Database className="text-pink-500" />, title: "web-design-guidelines", desc: "Review UI code for Web Interface Guidelines compliance. Us...", downloads: "92k", bg: "bg-pink-100" },
  { icon: <LayoutTemplate className="text-pink-500" />, title: "frontend-design", desc: "Create distinctive, production-grade frontend interfaces with ...", downloads: "62k", bg: "bg-pink-100" },
  { icon: <Zap className="text-pink-500" />, title: "skill-creator", desc: "Guide for creating effective skills. This skill should be used w...", downloads: "31k", bg: "bg-pink-100" },
  { icon: <FileText className="text-green-500" />, title: "pdf", desc: "Use this skill whenever the user wants to do anything with PD...", downloads: "13k", bg: "bg-green-100" },
  { icon: <LayoutTemplate className="text-purple-500" />, title: "pptx", desc: "Use this skill any time a .pptx file is involved in any way — as i...", downloads: "11k", bg: "bg-purple-100" },
  { icon: <FileText className="text-red-500" />, title: "docx", desc: "Use this skill whenever the user wants to create, read, edit, or...", downloads: "10k", bg: "bg-red-100" },
  { icon: <FileSpreadsheet className="text-yellow-500" />, title: "xlsx", desc: "Use this skill any time a spreadsheet file is the primary input o...", downloads: "10k", bg: "bg-yellow-100" },
  { icon: <Globe className="text-red-500" />, title: "webapp-testing", desc: "Toolkit for interacting with and testing local web applications u...", downloads: "9k", bg: "bg-red-100" },
  { icon: <Box className="text-red-500" />, title: "mcp-builder", desc: "Guide for creating high-quality MCP (Model Context Protocol) ...", downloads: "8k", bg: "bg-red-100" },
  { icon: <PenTool className="text-blue-500" />, title: "canvas-design", desc: "Create beautiful visual art in .png and .pdf documents using d...", downloads: "7k", bg: "bg-blue-100" },
  { icon: <FileText className="text-green-500" />, title: "doc-coauthoring", desc: "Guide users through a structured workflow for co-authoring d...", downloads: "6k", bg: "bg-green-100" },
  { icon: <Zap className="text-cyan-500" />, title: "theme-factory", desc: "Toolkit for styling artifacts with a theme. These artifacts can b...", downloads: "6k", bg: "bg-cyan-100" },
  { icon: <Code className="text-cyan-500" />, title: "web-artifacts-builder", desc: "Suite of tools for creating elaborate, multi-component claude.a...", downloads: "6k", bg: "bg-cyan-100" },
  { icon: <Sparkles className="text-pink-500" />, title: "algorithmic-art", desc: "Creating algorithmic art using p5.js with seeded randomness a...", downloads: "5k", bg: "bg-pink-100" },
  { icon: <Palette className="text-pink-500" />, title: "brand-guidelines", desc: "Applies Anthropic's official brand colors and typography to an...", downloads: "5k", bg: "bg-pink-100" },
  { icon: <Users className="text-yellow-500" />, title: "internal-comms", desc: "A set of resources to help me write all kinds of internal commu...", downloads: "5k", bg: "bg-yellow-100" },
  { icon: <Image className="text-green-500" />, title: "slack-gif-creator", desc: "Knowledge and utilities for creating animated GIFs optimized f...", downloads: "5k", bg: "bg-green-100" },
  { icon: <Code2 className="text-blue-500" />, title: "typescript-advanced-types", desc: "Master TypeScript's advanced type system including generics...", downloads: "5k", bg: "bg-blue-100" },
  { icon: <Layers className="text-orange-500" />, title: "api-design-principles", desc: "Master REST and GraphQL API design principles to build intuiti...", downloads: "4k", bg: "bg-orange-100" },
  { icon: <Cpu className="text-green-500" />, title: "python-performance-optimization", desc: "Profile and optimize Python code using cProfile, memory profil...", downloads: "4k", bg: "bg-green-100" },
  { icon: <Globe className="text-gray-500" />, title: "nextjs-app-router-patterns", desc: "Master Next.js 14+ App Router with Server Components, strea...", downloads: "3k", bg: "bg-gray-100" },
  { icon: <Code className="text-orange-500" />, title: "code-review-excellence", desc: "Master effective code review practices to provide constructive...", downloads: "3k", bg: "bg-orange-100" },
  { icon: <Smartphone className="text-purple-500" />, title: "responsive-design", desc: "Implement modern responsive layouts using container queries...", downloads: "3k", bg: "bg-purple-100" },
  { icon: <Zap className="text-green-500" />, title: "fastapi-templates", desc: "Production-ready FastAPI projects with async patterns, ...", downloads: "3k", bg: "bg-green-100" },
  { icon: <AlertTriangle className="text-red-500" />, title: "error-handling-patterns", desc: "Master error handling patterns across languages including exc...", downloads: "3k", bg: "bg-red-100" },
  { icon: <PlayCircle className="text-blue-500" />, title: "e2e-testing-patterns", desc: "Master end-to-end testing with Playwright and Cypress to buil...", downloads: "2k", bg: "bg-blue-100" },
  { icon: <Clock className="text-indigo-500" />, title: "async-python-patterns", desc: "Master Python asyncio, concurrent programming, and async/a...", downloads: "2k", bg: "bg-indigo-100" },
  { icon: <Workflow className="text-gray-500" />, title: "github-actions-templates", desc: "Create production-ready GitHub Actions workflows for automa...", downloads: "2k", bg: "bg-gray-100" },
  { icon: <Code2 className="text-yellow-500" />, title: "javascript-testing-patterns", desc: "Implement comprehensive testing strategies using Jest, Vitest,...", downloads: "2k", bg: "bg-yellow-100" },
  { icon: <CreditCard className="text-purple-500" />, title: "stripe-integration", desc: "Implement Stripe payment processing for robust, PCI-complia...", downloads: "2k", bg: "bg-purple-100" },
  { icon: <SmartphoneNfc className="text-blue-500" />, title: "react-native-design", desc: "Build production React Native apps with Expo, navigation, nati...", downloads: "2k", bg: "bg-blue-100" },
  { icon: <Container className="text-cyan-500" />, title: "docker-expert", desc: "Docker containerization expert with deep knowledge of multi-...", downloads: "2k", bg: "bg-cyan-100" },
  { icon: <FolderGit2 className="text-orange-500" />, title: "monorepo-management", desc: "Master monorepo management with Turborepo, Nx, and pnpm...", downloads: "2k", bg: "bg-orange-100" },
  { icon: <Paintbrush className="text-pink-500" />, title: "design-md", desc: "Analyze Stitch projects and synthesize a semantic design syst...", downloads: "5k", bg: "bg-pink-100" },
  { icon: <Repeat className="text-blue-500" />, title: "stitch-loop", desc: "Teaches agents to iteratively build websites using Stitch with a...", downloads: "4k", bg: "bg-blue-100" },
  { icon: <Grid className="text-gray-500" />, title: "architecture-patterns", desc: "Implement proven backend architecture patterns including Cle...", downloads: "3k", bg: "bg-gray-100" },
  { icon: <Server className="text-green-500" />, title: "nodejs-backend-patterns", desc: "Build production-ready Node.js backend services with Expres...", downloads: "3k", bg: "bg-green-100" },
  { icon: <MessageSquare className="text-purple-500" />, title: "prompt-engineering-patterns", desc: "Master advanced prompt engineering techniques to maximize ...", downloads: "3k", bg: "bg-purple-100" },
  { icon: <Code className="text-blue-500" />, title: "python-testing-patterns", desc: "Implement comprehensive testing strategies with pytest, fixtur...", downloads: "3k", bg: "bg-blue-100" },
  { icon: <Sparkles className="text-yellow-500" />, title: "enhance-prompt", desc: "Transforms vague UI ideas into polished, Stitch-optimized pro...", downloads: "3k", bg: "bg-yellow-100" },
  { icon: <Smartphone className="text-gray-500" />, title: "mobile-ios-design", desc: "Master iOS Human Interface Guidelines and SwiftUI patterns f...", downloads: "3k", bg: "bg-gray-100" },
  { icon: <MapPin className="text-orange-500" />, title: "seo-geo", desc: "Master SEO strategies for local businesses and geographic ta...", downloads: "2k", bg: "bg-orange-100" },
  { icon: <Database className="text-blue-500" />, title: "sql-optimization-patterns", desc: "Master SQL query optimization, indexing strategies, and EXPL...", downloads: "2k", bg: "bg-blue-100" },
  { icon: <Smartphone className="text-green-500" />, title: "mobile-android-design", desc: "Master Material Design 3 and Jetpack Compose patterns for b...", downloads: "2k", bg: "bg-green-100" },
  { icon: <Palette className="text-purple-500" />, title: "design-system-patterns", desc: "Build scalable design systems with design tokens, theming infr...", downloads: "2k", bg: "bg-purple-100" },
  { icon: <SmartphoneNfc className="text-cyan-500" />, title: "react-native-architecture", desc: "Build production React Native apps with Expo, navigation, nati...", downloads: "2k", bg: "bg-cyan-100" },
  { icon: <Code2 className="text-yellow-500" />, title: "modern-javascript-patterns", desc: "Master ES6+ features including async/await, destructuring, sp...", downloads: "2k", bg: "bg-yellow-100" },
  { icon: <LayoutTemplate className="text-gray-500" />, title: "shadcn-ui", desc: "Expert guidance for integrating and building applications with ...", downloads: "2k", bg: "bg-gray-100" },
  { icon: <Tablet className="text-pink-500" />, title: "interaction-design", desc: "Design and implement microinteractions, motion design, transi...", downloads: "2k", bg: "bg-pink-100" },
];

export const SKILL_DETAILS: Record<string, { title: string; description: string; tags: string[]; author: string; readme: string }> = {
  'web-design-guidelines': {
    title: 'web-design-guidelines',
    description: 'Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".',
    tags: ['Featured', 'Design'],
    author: 'vercel-labs',
    readme: `
# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse \`file:line\` format

## Guidelines Source

Fetch fresh guidelines before each review:

\`https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md\`

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:

1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.
    `
  },
  'frontend-design': {
    title: 'frontend-design',
    description: 'Create distinctive, production-grade frontend interfaces with Tailwind CSS.',
    tags: ['Featured', 'Design'],
    author: 'shadcn',
    readme: '# Frontend Design\n\nCreate beautiful interfaces...'
  },
};

export interface MockTask {
  id: number;
  title: string;
  subtitle: string;
  time?: string;
  date?: string;
  icon: string;
  projectId?: string;
  orgId?: string;
}

export interface MockMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const MOCK_MESSAGES: Record<string, MockMessage[]> = {};

export const MOCK_TASKS: MockTask[] = [
  { id: 1, title: "Create a New Dino Game", subtitle: "新建一个小恐龙 游戏", time: "8m ago", icon: "sun" },
  { id: 2, title: "Xiaomi Stock Price Table...", subtitle: "帮我做一个表，搜一下小米最近一个月的股价...", date: "Feb 15", icon: "link" },
  { id: 3, title: "Supply Chain Risk Analysis...", subtitle: "Analyze Tesla's 10-Q SEC filings...", date: "Feb 15", icon: "link" },
  { id: 4, title: "Xiaomi Past Month Stock...", subtitle: "帮我做一个表，搜一下小米最近一个月的股价...", date: "Feb 15", icon: "link" },
  { id: 5, title: "Project Tracker Spreadsheet...", subtitle: "Create a project tracker spreadsheet...", date: "Feb 15", icon: "sun" },
  { id: 6, title: "云知声港股招股书深度分析...", subtitle: "分析港股上市公司 云知声 招股说明书...", date: "Feb 15", icon: "link" },
  { id: 7, title: "Research Report on No-Code...", subtitle: "Write a research report on no-code/low-code...", date: "Feb 15", icon: "link" },
  { id: 8, title: "2023年度合并财报分析...", subtitle: "/code/2023年度-财报 (合并).xlsx 分析...", date: "Feb 15", icon: "link" },
  { id: 9, title: "Create a Project Progress...", subtitle: "帮我制作一个项目进度表", date: "Feb 13", icon: "sun" },
  { id: 10, title: "Generate 3x3 Table with...", subtitle: "生成一个三行三列的表格，每列为姓名...", date: "Feb 12", icon: "sun" },
];

export const MOCK_PROJECTS = [
  { id: '1', name: 'cosmic-rain', date: 'Feb 13' }
];
