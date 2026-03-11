export const translations = {
  en: {
    sidebar: {
      home: 'Home',
      dashboard: 'New Task',
      contextLake: 'Context Data Lake',
      skills: 'Skills',
      plans: 'Plans',
      settings: 'Settings',
      workspace: 'Workspace',
      projects: 'Projects',
      tasks: 'Tasks',
      allTasks: 'All tasks',
      nonProjectTasks: 'Non-project tasks',
      favorites: 'Favorites',
      createProject: 'Create Project',
      createTask: 'Create Task',
      inviteMembers: 'Invite Members',
      manageOrganization: 'Manage Organization',
      createOrganization: 'Create Organization',
      account: 'Account',
      memory: 'Memory',
      notifications: 'Notifications',
      github: 'GitHub',
      credits: 'Credits',
      logout: 'Logout',
      manageAccount: 'Manage account',
      billing: 'Billing',
      community: 'Community',
      signOut: 'Sign out',
      codeProxy: 'Code Proxy',
      proxySecurity: 'Proxy Security',
      accessChannels: 'Access Channels',
      apiKeys: 'API Keys',
      mcpServers: 'MCP Servers',
    },
    settings: {
      title: 'Settings',
      codeProxy: {
        title: 'Code Proxy',
        description: 'Control how code agents access your data.',
        enabled: 'Enabled',
        authMethod: 'Authentication Method',
        orgApiKey: 'Organization API Key',
        orgApiKeyDesc: 'API key shared by all members',
        providedBy: 'Provided by AskXbot',
        providedByDesc: 'All members use models hosted by AskXbot',
        availableModels: 'Available Models',
        dataSentTo: 'Data sent to',
        getApiKeyFrom: 'Get your API key from',
        save: 'Save',
        apiKeyPlaceholder: 'Enter API Key...'
      },
      apiKeys: {
        title: 'API Keys',
        description: 'Manage API keys for programmatic access.',
        createDesc: 'Create API keys to programmatically access AskXbot API. Keys allow you to create tasks, upload files and receive webhooks.',
        createKey: 'Create API Key',
        activeKeys: 'Active Keys',
        activeKeysDesc: 'Keys that currently have access to the API',
        noActiveKeys: 'No active API keys',
        created: 'Created',
        lastUsed: 'Last used',
        apiDocs: 'API Documentation',
        apiDocsDesc: 'Learn how to use the AskXbot API',
        apiDocsCodeDesc: 'Use your API key with the API_KEY header to authenticate requests to the AskXbot API.',
        modalTitle: 'Create API Key',
        modalDesc: 'Create a new API key for programmatic access to AskXbot.',
        nameLabel: 'Name',
        namePlaceholder: 'e.g. Production Server',
        descLabel: 'Description (Optional)',
        descPlaceholder: 'What is this key used for?',
        expirationLabel: 'Expiration',
        neverExpire: 'Never expire',
        days30: '30 days',
        days90: '90 days',
        days180: '180 days',
        year1: '1 year',
        cancel: 'Cancel',
      },
      mcpServers: {
        title: 'MCP Market',
        description: 'Install and manage Model Context Protocol servers for your organization.',
        installed: 'Installed MCPs',
        noInstalled: 'No MCP servers installed yet. Browse available MCPs below to get started.',
        available: 'Available MCPs',
        searchPlaceholder: 'Search MCP servers...',
        filters: {
          all: 'All',
          api: 'API',
          database: 'Database',
          finance: 'Finance',
          points: 'Points',
          monitoring: 'Monitoring',
          other: 'Other',
          productivity: 'Productivity'
        }
      },
      mcpDetail: {
        breadcrumb: 'MCP Market > Configure MCP Server',
        official: 'Official',
        transport: 'Transport',
        auth: 'Auth',
        docs: 'Documentation',
        website: 'Website',
        httpConfig: 'HTTP Configuration',
        serverUrl: 'Server URL',
        cancel: 'Cancel',
        install: 'Install MCP'
      },
      proxySecurity: {
        title: 'Proxy Security',
        description: 'Manage security settings for code proxies.',
        networkPolicy: 'Network Policy',
        networkPolicyDesc: 'Control network access for all virtual machines in the organization.',
        allowNetworkAccess: 'Allow Network Access',
        allowNetworkAccessDesc: 'Allow outbound connections from virtual machines',
        domainWhitelist: 'Domain Whitelist',
        noDomainsAllowed: 'No domains allowed',
        onlyPackageManagers: 'Only package managers (npm, pip, etc.)',
        allowAllDomains: 'Allow all domains',
        whitelistDesc: 'Virtual machines can only connect to the package registry (npm, PyPI, etc.)',
        additionalAllowedDomains: 'Additional Allowed Domains',
        additionalAllowedDomainsDesc: 'Add specific domains that virtual machines can access, regardless of whitelist settings.',
        addDomainPlaceholder: 'example.com',
        add: 'Add'
      },
      accessChannels: {
        title: 'Access Channels',
        description: 'Control external channels organization members can connect to Rebyte.',
        telegram: {
          title: 'Telegram',
          description: 'Allow organization members to connect Telegram to receive task notifications.'
        },
        slack: {
          title: 'Slack',
          description: 'Connect Slack to create and manage tasks directly from your workspace.',
          connect: 'Connect Slack',
          notConnected: 'Not connected'
        }
      },
      account: {
        title: 'Account',
        description: 'Manage your account settings and preferences.',
        fullName: 'Full Name',
        email: 'Email Address',
        language: 'Language',
        saveChanges: 'Save Changes',
        deleteAccount: 'Delete Account',
        deleteWarning: 'Once you delete your account, there is no going back. Please be certain.',
        telegramModal: {
          title: 'Connect Telegram',
          subtitle: 'Send tasks directly from Telegram to your agent computer.',
          desc: 'Bind your Telegram account to send messages to your agent computer from anywhere. You will be redirected to Telegram, just tap to complete the binding.',
          generateLink: 'Generate Link',
          step1Title: 'Open in Telegram',
          step1Desc: 'Click the button below - it will open Telegram with a pre-filled message.',
          step2Title: 'Click Send',
          step2Desc: 'Just send the pre-filled message to the bot. That\'s it!',
          openTelegram: 'Open Telegram',
          done: 'Done'
        },
        soundSettings: {
          title: 'Sound Notifications',
          desc: 'Play a sound when tasks finish',
          enableTitle: 'Enable sound',
          enableDesc: 'Play a notification sound when a task completes or fails',
          notificationSound: 'Notification sound',
          sounds: {
            windChime: 'Wind Chime',
            bell: 'Bell',
            success: 'Success',
            dingDong: 'Ding Dong'
          }
        }
      },
      notifications: {
        title: 'Notifications',
        description: 'Manage how you receive notifications.',
        email: 'Email Notifications',
        emailDesc: 'Receive emails about your account activity and updates.',
        push: 'Push Notifications',
        pushDesc: 'Receive push notifications on your device.',
        marketing: 'Marketing Emails',
        marketingDesc: 'Receive emails about new features and promotions.',
      },
      memory: {
        description: 'Facts and preferences the agent remembers across tasks.',
        searchPlaceholder: 'Search memory...',
        emptyState: 'No memory yet. Add facts the agent should remember.',
        addFirstMemory: 'Add first memory',
        addMemory: 'Add memory',
        addMemoryDesc: 'Add a fact or preference the agent should remember.',
        keyPlaceholder: 'Key (e.g. preferred-language)',
        valuePlaceholder: 'What should the agent remember?'
      },
      github: {
        title: 'GitHub Integration',
        description: 'Connect your GitHub account to sync repositories.',
        connect: 'Connect GitHub',
        connected: 'Connected as',
        disconnect: 'Disconnect',
        repositories: 'Repositories',
        sync: 'Sync',
        pageTitle: 'GitHub',
        pageDescription: 'Configure GitHub integration for your organization',
        cliDeviceFlow: 'CLI Device Flow',
        cliDescription: 'Personal authorization for individual contributors.',
        notConnected: 'Not connected',
        adminOnly: 'Admin Only',
        githubApp: 'GitHub App',
        appDescription: 'Organization-wide access. Survives member changes.',
        notInstalled: 'Not installed'
      },
      credits: {
        title: 'Credits',
        description: 'Manage your Rebyte Code credits',
        balance: 'Credit Balance',
        buy: 'Buy Credits',
        used: 'Used (30 days)',
        requests: 'Requests (30 days)',
        lifetime: 'Lifetime Purchased',
        total: 'total',
        lowBalance: 'Your credit balance is low. Purchase more credits to continue using Rebyte Code.',
        whatAre: 'What are Credits?',
        whatAreDesc: 'Credits are used to power Rebyte Code, our built-in AI coding assistant. When you use Rebyte Code as your executor, each AI request consumes credits based on the model and token usage.',
        otherExecutors: 'Other executors (Claude Code, Gemini CLI, Codex, Amp) use your own API keys and do not consume credits.',
        neverExpire: 'Credits never expire and are shared across your organization.',
        usageByModel: 'Usage by Model (Last 30 Days)',
        usageDesc: 'Breakdown of credit consumption by AI model',
        tokens: 'tokens',
        requestsCount: 'requests',
        unknown: 'unknown'
      },
      contextLake: {
        title: 'Context Data Lake Settings',
        description: 'Manage your context sources and integrations.',
        workspace: 'Workspace',
        workspaceDesc: "Context Data Lake is your organization's data workspace where agents access and work with your data.",
        workspaceId: 'Workspace ID',
        status: 'Status',
        vm: 'VM (Sandbox ID)',
        created: 'Created',
        actions: 'Actions',
        actionsDesc: 'Reset the Context Data Lake workspace to start fresh. This stops the VM and deletes the workspace. A new one will be provisioned automatically on next visit to Context Data Lake.',
        reset: 'Reset Context Data Lake Workspace'
      },
      plans: {
        title: 'Plans',
        subtitle: 'Manage your organization\'s subscription',
        currentPlan: 'Current Plan',
        personal: 'Personal',
        status: 'Status',
        free: 'Free',
        upgradeToTeam: 'Upgrade to Team',
        featuresTitle: 'Plan Features',
        featuresSubtitle: 'Features included in your Personal plan',
        feature: {
          payAsYouGo: 'Pay-as-you-go credits',
          unlimitedTasks: 'Unlimited tasks',
          allAgents: 'All AI agents (Claude Code, Gemini, Codex, Rebyte Code)',
          contextLake: 'Context Lake — 1 file source, 1 view',
          resources: '2 GB memory, 20 GB disk per task'
        },
        totalCredits: 'Total Credits',
        buyCredits: 'Buy Credits',
        includedInPlan: 'Included in plan',
        purchased: 'Purchased',
        neverExpire: 'Never expire',
        used30Days: 'Used (30 days)',
        credits: 'credits',
        requests30Days: 'Requests (30 days)',
        total: 'total',
        howCreditsUsed: 'How credits are used',
        creditsConsumedBy: 'Credits are consumed by two services',
        languageModels: 'Language Models',
        languageModelsDesc: 'Billed per million tokens. Cost varies by model - more powerful models consume more credits per token.',
        agentComputers: 'Agent Computers',
        agentComputersDesc: 'Each agent computer costs $0.30/hour to run, billed per minute.',
        byokExempt: 'BYOK users are exempt from LLM costs, but still need to pay for agent computer running costs.',
        buyCreditsTitle: 'Buy Credits',
        buyCreditsDesc: 'Select a credit pack. Credits never expire and are shared across the organization.',
        creditPackSmall: '1,000 Credits',
        creditPackSmallDesc: 'Good for trying out',
        creditPackMedium: '5,000 Credits',
        creditPackMediumDesc: 'Good for daily use',
        creditPackLarge: '15,000 Credits',
        creditPackLargeDesc: 'Good for heavy use',
        save10: 'Save 10%',
        save20: 'Save 20%',
        perCredit: '/credit',
        redirectStripe: 'You will be redirected to Stripe to securely complete your purchase.'
      },
    },
    workspace: {
      run: 'Run',
      explorer: 'Explorer',
      agentChat: 'Agent Chat',
      terminal: 'Terminal',
      askPlaceholder: 'Ask Claude to change something...',
      connected: 'Connected',
      remote: 'Remote: SSH',
      ln: 'Ln',
      col: 'Col'
    },
    landing: {
      nav: {
        features: 'Functional Features',
        agents: 'AI Agents',
        faq: 'FAQ',
        login: 'Login',
        signup: 'Sign Up'
      },
      hero: {
        title: 'AI Programming Agent\'s Cloud Workspace',
        subtitle: 'Run Claude Code, Gemini CLI or Codex in the cloud — close your computer, come back to see results',
      },
      skillDriven: {
        title: 'Skill-driven Cloud AI Agents',
        description: 'Each task gets a dedicated cloud machine running pre-set skilled programming agents — document processing, data analysis, complex coding, web crawling, etc. Skills run completely asynchronously and in parallel, with unprecedented speed.',
        status: {
          collaborating: 'agents collaborating asynchronously',
          completed: 'completed',
          running: 'running'
        },
        tasks: {
          docProcessing: 'Document Processing Claude',
          dataAnalysis: 'Data Analysis Gemini',
          complexCoding: 'Complex Programming Task Claude',
          webCrawling: 'Web Crawling Codex'
        }
      },
      contextLake: {
        title: 'Context Data Lake',
        description: 'Semantic layer connecting any data source — Databases, Files, Google Drive. Agents automatically acquire team knowledge without manual configuration.',
        semanticLayer: 'Semantic Layer',
        yourDataSources: 'Your Data Sources',
        sources: {
          postgres: 'PostgreSQL',
          gdrive: 'Google Drive',
          csv: 'CSV / Parquet',
          s3: 'Amazon S3'
        },
        connect: 'Context Data Lake automatically discovers all data'
      },
      longTasks: {
        title: 'Long-running Task Execution',
        description: 'Deep research, data analysis, application building, bug fixing, deployment... AI agents handle time-consuming complex steps. Close your computer, come back for results.',
        cardTitle: 'Multi-step Task',
        cardSubtitle: 'Add OAuth Login to App',
        steps: {
          research: 'Deep Network Research',
          api: 'Build API Interface',
          test: 'Write Tests & Iterate',
          deploy: 'Create PR & Deploy'
        }
      },
      potential: {
        title: 'Unleash the Full Potential of AI Programming Agents',
        agents: 'Programming Agents',
        models: 'Models',
        skills: 'Skills',
        start: 'Start Now',
        agentList: {
          claude: 'Claude Code',
          gemini: 'Gemini CLI',
          codex: 'Codex',
          askxbot: 'Askxbot Code'
        },
        skillList: {
          research: 'Deep Research',
          sec: 'SEC Edgar Analysis',
          stock: 'Stock Analysis',
          browser: 'Browser Automation',
          podcast: 'Podcast Generator',
          app: 'App Build & Deploy'
        }
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'What is Askxbot?',
            a: 'Askxbot is a cloud workspace that lets you collaborate with AI programming agents. Run Claude Code, Gemini CLI or Codex to handle long tasks—close your computer, come back for results.'
          },
          {
            q: 'How do I ensure data security?',
            a: 'Each task runs in an independent cloud virtual machine, completely isolated. Your code and data will not be shared between different tasks. We use enterprise-grade encryption and security measures to protect your data.'
          },
          {
            q: 'Which AI agents are supported?',
            a: 'Askxbot supports multiple AI programming agents, including Claude Code (Anthropic), Gemini CLI (Google), Codex (OpenAI), etc. Use your own API keys and switch seamlessly in the same workspace.'
          },
          {
            q: 'Which programming languages and frameworks are supported?',
            a: 'AI agents can handle any programming language and framework — Python, TypeScript, Rust, Go, Java, etc. They operate your Git repository directly in the cloud VM, just like a real developer.'
          },
          {
            q: 'How is it different from running Claude Code locally?',
            a: 'Unlike local tools like Cursor, Askxbot runs AI agents in a cloud workspace. Even if you close your laptop, tasks continue to run. You can run unlimited parallel tasks simultaneously; when one model gets stuck, you can switch to another.'
          },
          {
            q: 'How do I get started?',
            a: 'After logging in, connect your GitHub repository, select an AI agent, and describe your task — it\'s that simple. The agent will automatically clone the code, execute the task, and create a Pull Request upon completion.'
          }
        ]
      },
      footer: {
        features: 'Features',
        agents: 'AI Agents',
        faq: 'FAQ',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        copyright: '© 2026 Askxbot. All rights reserved.',
        darkMode: 'Dark Mode'
      },
      // Keep existing translations if needed, or replace them
      badge: 'Now supporting Claude 3.5 Sonnet & Gemini 1.5 Pro',
      title: 'Run Code Agent in',
      titleHighlight: 'Cloud',
      subtitle_old: 'Orchestrate AI coding agents like Claude Code, Gemini CLI, and Codex in persistent, isolated cloud workspaces. No local setup required.',
      startBuilding: 'Start Building for Free',
      starGithub: 'Star on GitHub',
      agentSpeed: 'Agent Speed',
      uptime: 'Uptime',
      featuresTitle: 'Everything you need to build with AI',
      featuresSubtitle: 'Stop fighting with local environments. Rebyte gives you a complete cloud development platform designed for the AI era.',
      features: {
        persistent: {
          title: 'Persistent Workspaces',
          desc: 'Your environment stays hot. Resume work instantly with all your files, dependencies, and agent state preserved.'
        },
        sandboxed: {
          title: 'Sandboxed Environments',
          desc: 'Run untrusted code safely. Each workspace is a fully isolated container with its own filesystem and network stack.'
        },
        terminal: {
          title: 'Native Terminal Access',
          desc: 'Full root access to a Linux environment. Install any package, run any command, just like localhost.'
        },
        multiAgent: {
          title: 'Multi-Agent Support',
          desc: 'Switch between Claude, Gemini, and GPT-4 in the same session. Let the best model handle each task.'
        },
        vscode: {
          title: 'VS Code Compatible',
          desc: 'Connect your local VS Code via SSH or use our browser-based editor powered by Monaco.'
        },
        previews: {
          title: 'Instant Previews',
          desc: 'Automatic port forwarding. View your web apps live as the AI builds them in real-time.'
        }
      },
      cta: {
        title: 'Ready to code at the speed of thought?',
        subtitle: 'Join thousands of developers building the future with Rebyte. Get started with 10 hours of free GPU time.',
        button: 'Create Free Workspace'
      }
    },
    contextLake: {
      sources: 'Sources',
      noSources: 'No sources yet',
      views: 'Views',
      noViews: 'No views yet',
      columns: 'Columns',
      selectItem: 'Select an item to see its columns',
      mainTitle: 'Context Lake',
      mainSubtitle: 'Give your agents',
      mainSubtitleHighlight: 'the right context.',
      contactAdmin: 'Contact your org admin to add data sources.',
      sourceType: 'Source Type',
      howItWorks: 'How it works',
      searchPlaceholder: 'Search data sources...',
      files: 'FILES',
      databases: 'DATABASES',
      dataLakes: 'DATA LAKES',
      tabularFile: 'Tabular File',
      tabularFileDesc: 'Upload CSV, Parquet, JSON, or Excel files',
      upgradeToPro: 'Upgrade to Pro to connect this data source',
    },
    skills: {
      agentSkills: 'Agent Skills',
      title: 'Skills are the new',
      titleHighlight: 'software',
      subtitle: 'Extend your AI agents with specialized skills',
      featured: 'Featured',
      explore: 'Explore',
      teamSkills: 'Team Skills',
      searchPlaceholder: 'Search skills...',
      createTeamSkills: 'Create Team Skills',
      createTeamSkillsDesc: 'Team skills are private skills shared across your organization. Link a GitHub repo containing a SKILL.md file to give your entire team access to custom AI capabilities.',
      createWithAgent: 'Create with Agent',
      importFromGithub: 'Import from GitHub',
      noTeamSkills: 'No team skills yet. Create one to get started.'
    },
    project: {
      untitled: 'Untitled Project',
      createdBy: 'Created by',
      updated: 'Updated',
      skills: 'Skills',
      suggested: 'Suggested:',
      placeholder: 'Describe what you want to build in detail',
      openSource: 'Open Source',
      free: 'Free',
      optimizedForCode: 'Optimized for code',
      fastAndCapable: 'Fast and capable',
      mostCapable: 'Most capable',
      withThinking: 'With thinking',
      kimiLatest: 'Kimi latest model',
      zhipuGlm: 'Zhipu GLM 5'
    },
    dashboard: {
      welcome: 'Welcome back',
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions',
      newProject: 'New Project',
      newTask: 'New Task',
      viewAll: 'View All',
      noActivity: 'No recent activity',
      upgrade: 'Upgrade to Team',
      user: 'User',
      teamMembers: 'Your team has 2 members',
      modes: {
        knowledge: 'Knowledge Work',
        build: 'Build Apps',
        skills: 'Team Skills'
      },
      skills: {
        createTitle: 'Create Team Skills',
        createDesc: 'Create skills with your brand, servers, API keys, and internal docs — private to your team.',
        debugTitle: 'Infrastructure Debugging',
        debugDesc: 'Create an infrastructure debugging skill for our team. Bastion...',
        apiTitle: 'API Reference',
        apiDesc: 'Create an internal API reference skill for our backend...'
      },
      professional: 'Professional',
      examples: 'Examples',
      workflows: 'Workflows',
      suggestions: {
        spreadsheets: 'Spreadsheets',
        presentation: 'Presentation',
        document: 'Document',
        deepResearch: 'Deep research',
        podcast: 'Podcast',
        forms: 'Forms',
        dataAnalysis: 'Data analysis',
        stockAnalysis: 'Stock analysis',
        design: 'Design',
        dataScraping: 'Data scraping',
        image: 'Image',
        video: 'Video'
      },
      buildSuggestions: {
        portfolio: 'Portfolio & Landing',
        fullStack: 'Full stack app',
        aiApp: 'AI application',
        codeReview: 'Code review',
        uiUx: 'UI/UX design'
      },
      skillSuggestions: {
        vercel: 'Vercel Synthesis Mode',
        deepResearch: 'Deep Research',
        incidentResponse: 'Incident Response',
        runbook: 'Runbook Template',
        pagerduty: 'PagerDuty Automation'
      },
      skillExamples: {
        brandDesign: {
          title: 'Create a brand design system skill for our company',
          description: 'Three primary colors #4F46E5, secondary #7C3AED. Fonts: Inter, Merriweather...'
        },
        emailTemplate: {
          title: 'Create an email template skill for our company',
          description: 'Use MJML for inline HTML. Sender: notifications@acme.com...'
        },
        dbAccess: {
          title: 'Create a production database access skill',
          description: 'Main: postgresql://acme_app_read:password@db.acme.com...'
        },
        deployment: {
          title: 'Create a deployment pipeline skill for our services',
          description: 'On push to "main" branch, deploy to production environment...'
        }
      },
      categories: {
        sales: 'Sales',
        data: 'Data',
        finance: 'Finance',
        legal: 'Legal',
        marketing: 'Marketing',
        product: 'Product',
        support: 'Support',
        search: 'Search',
        productivity: 'Productivity',
        bioResearch: 'Bio Research'
      },
      githubModal: {
        title: 'GitHub Integration',
        cliFlow: 'CLI Device Flow',
        cliDesc: 'Personal authorization for individual contributors.',
        notConnected: 'Not connected',
        authorize: 'Authorize',
        waitingAuth: 'Waiting for authorization... Complete authorization in the popup',
        githubApp: 'GitHub App',
        appDesc: 'Organization-wide access. Survives member changes.',
        notInstalled: 'Not installed',
        install: 'Install',
        installing: 'Installing... Complete installation in the popup'
      }
    },
    layout: {
      search: 'Search',
      inviteFriends: 'Invite Friends',
      inviteDesc: 'Share this link and you both get 500 credits when they sign up!',
      copyLink: 'Copy Referral Link',
      credits: 'Credits',
    },
    plans: {
      title: 'Plans & Pricing',
      subtitle: 'Start free. Upgrade to Team for all Context Data Lake connectors, more resources, and collaboration.',
      back: 'Back',
      personal: {
        title: 'Personal',
        price: 'Free',
        type: 'pay-as-you-go',
        features: [
          'Pay-as-you-go credits',
          'Unlimited tasks',
          'All AI agents (Claude Code, Gemini, Codex, Rebyte Code)',
          'Context Data Lake — 1 file source, 1 view',
          '2 GB memory, 20 GB disk per task'
        ]
      },
      team: {
        title: 'Team',
        recommended: 'Recommended',
        price: '$30',
        period: '/month',
        seatPrice: '+$6/seat',
        features: [
          'Everything in Personal, plus:',
          'Context Data Lake — all data source connectors',
          'Unlimited datasets & views',
          '4 GB memory, 20 GB disk per task',
          'Team collaboration & shared workspaces',
          'Runtime security controls',
          'Priority support'
        ]
      },
      common: {
        perTask: 'PER TASK',
        memory: 'Memory',
        disk: 'Disk',
        contextLake: 'CONTEXT DATA LAKE',
        storage: 'Storage',
        gb: 'GB'
      },
      contextLake: {
        title: 'Context Data Lake',
        subtitle: 'Give agents the right context.',
        personal: 'Personal (Free)',
        tabular: 'Tabular File Upload',
        tabularDesc: 'CSV, Parquet, JSON, Excel',
        oneSource: '1 data source, 1 view',
        team: 'Team',
        pro: 'PRO',
        databases: 'Databases',
        databasesDesc: 'PostgreSQL, MySQL, MongoDB, Snowflake, ...',
        cloudStorage: 'Cloud Storage',
        cloudStorageDesc: 'S3, GCS, Azure Blob',
        dataLakes: 'Data Lakes',
        dataLakesDesc: 'Databricks, Iceberg, Delta Lake, ...',
        streaming: 'Streaming',
        streamingDesc: 'Kafka, Debezium CDC',
        unlimited: 'Unlimited data sources & views'
      },
      calculator: {
        title: 'Calculate your Team price',
        monthly: 'Monthly',
        yearly: 'Yearly',
        save: 'Save 20%',
        teamMembers: 'Team members:',
        orgMembers: 'Your organization has',
        members: 'members',
        base: 'Base (includes 1 seat)',
        extraSeat: 'extra seat',
        total: 'Total',
        subscribe: 'Subscribe to Team'
      }
    },
    accountModal: {
      title: 'Account',
      subtitle: 'Manage your account info.',
      profile: 'Profile',
      security: 'Security',
      profileDetails: 'Profile details',
      updateProfile: 'Update profile',
      emailAddresses: 'Email addresses',
      primary: 'Primary',
      addEmail: 'Add email address',
      phoneNumbers: 'Phone numbers',
      addPhone: 'Add phone number',
      connectedAccounts: 'Connected accounts',
      connectAccount: 'Connect account',
      password: 'Password',
      updatePassword: 'Update password',
      activeDevices: 'Active devices',
      thisDevice: 'This device',
      todayAt: 'Today at',
      lastWednesdayAt: 'Last Wednesday at',
      deleteAccount: 'Delete account',
      uploadImage: 'Upload image',
      uploadImageDesc: 'Upload a JPG, PNG, GIF, or WEBP image under 10MB',
      firstName: 'First name',
      lastName: 'Last name',
      addEmailDesc: 'This email address must be verified before it can be added to your account.',
      emailPlaceholder: 'Enter your email address',
      add: 'Add',
      addPhoneDesc: 'A text message containing a verification link will be sent to this phone number.',
      connectApple: 'Connect Apple account',
      connectGithub: 'Connect GitHub account',
      connectGoogle: 'Connect Google account',
      connectMicrosoft: 'Connect Microsoft account',
      verificationRequired: 'Verification required',
      enterPasswordToContinue: 'Enter your current password to continue',
      enterPassword: 'Enter your password',
      continue: 'Continue',
      useAnotherMethod: 'Use another method',
      unverified: 'Unverified',
      verifyEmail: 'Verify email address',
      clickVerificationLink: 'Click the verification link sent to',
      resendLink: 'Resend link',
      verifyPhone: 'Verify phone number',
      enterVerificationCode: 'Enter the verification code sent to',
      resendCode: 'Resend code',
      removeEmail: 'Remove email address',
      removePhone: 'Remove phone number',
      remove: 'Remove',
      completeVerification: 'Complete verification'
    },
    common: {
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      confirm: 'Confirm',
    },
    auth: {
      email: 'Email address',
      password: 'Password',
      name: 'Full Name',
      login: {
        title: 'Welcome back',
        subtitle: 'Sign in to your account to continue',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot your password?',
        submit: 'Sign in',
        noAccount: "Don't have an account?",
        createAccount: 'Create new account'
      },
      register: {
        title: 'Create an account',
        subtitle: 'Join us and start building with AI',
        submit: 'Sign up',
        hasAccount: 'Already have an account?',
        signIn: 'Sign in instead'
      }
    },
  },
  zh: {
    sidebar: {
      home: '首页',
      dashboard: '新建任务',
      contextLake: '上下文数据湖',
      skills: '技能',
      plans: '计划',
      settings: '设置',
      workspace: '工作区',
      projects: '项目',
      tasks: '任务',
      allTasks: '全部任务',
      nonProjectTasks: '非项目任务',
      favorites: '收藏',
      createProject: '创建项目',
      createTask: '创建任务',
      inviteMembers: '邀请成员',
      manageOrganization: '管理组织',
      createOrganization: '创建组织',
      account: '账户',
      memory: '记忆',
      notifications: '通知',
      github: 'GitHub',
      credits: '积分',
      logout: '退出登录',
      manageAccount: '管理账户',
      billing: '账单',
      community: '社区',
      signOut: '退出登录',
      codeProxy: '代码代理',
      proxySecurity: '代理安全',
      accessChannels: '访问渠道',
      apiKeys: 'API 密钥',
      mcpServers: 'MCP 服务器',
    },
    settings: {
      title: '设置',
      codeProxy: {
        title: '代码代理',
        description: '控制代码代理如何路由您的数据',
        enabled: '已启用',
        authMethod: '认证方式',
        orgApiKey: '组织 API 密钥',
        orgApiKeyDesc: '所有成员共享的 API 密钥',
        providedBy: 'AskXbot 提供',
        providedByDesc: '所有成员使用 AskXbot 托管的模型',
        availableModels: '可用模型',
        dataSentTo: '数据发送至',
        getApiKeyFrom: '获取您的 API 密钥：',
        save: '保存',
        apiKeyPlaceholder: '输入 API 密钥...'
      },
      apiKeys: {
        title: 'API 密钥',
        description: '管理用于程序化访问的 API 密钥',
        createDesc: '创建 API 密钥以程序化方式访问 AskXbot API。密钥允许您创建任务、上传文件和接收 webhook。',
        createKey: '创建 API 密钥',
        activeKeys: '活跃密钥',
        activeKeysDesc: '当前有权访问 API 的密钥',
        noActiveKeys: '没有活跃的 API 密钥',
        created: '创建时间',
        lastUsed: '最后使用',
        apiDocs: 'API 文档',
        apiDocsDesc: '了解如何使用 AskXbot API',
        apiDocsCodeDesc: 'Use your API key with the API_KEY header to authenticate requests to the AskXbot API.',
        modalTitle: '创建 API 密钥',
        modalDesc: '创建一个新的 API 密钥以程序化方式访问 AskXbot。',
        nameLabel: '名称',
        namePlaceholder: '例如：生产服务器',
        descLabel: '描述（可选）',
        descPlaceholder: '此密钥的用途是什么？',
        expirationLabel: '过期时间',
        neverExpire: '永不过期',
        days30: '30 天',
        days90: '90 天',
        days180: '180 天',
        year1: '1 年',
        cancel: '取消',
      },
      mcpServers: {
        title: 'MCP 市场',
        description: '为您的组织安装和管理模型上下文协议服务器。',
        installed: '已安装的 MCP',
        noInstalled: '尚未安装任何 MCP 服务器。浏览下方可用的 MCP 开始使用。',
        available: '可用的 MCP',
        searchPlaceholder: '搜索 MCP 服务器...',
        filters: {
          all: '全部',
          api: 'API',
          database: '数据库',
          finance: '财务',
          points: '积分',
          monitoring: '监测',
          other: '其他',
          productivity: '生产力'
        }
      },
      mcpDetail: {
        breadcrumb: 'MCP 市场 > 配置 MCP 服务器',
        official: '官方',
        transport: '交通',
        auth: '认证',
        docs: '文档资料',
        website: '网站',
        httpConfig: 'HTTP 配置',
        serverUrl: '服务器网址',
        cancel: '取消',
        install: '安装 MCP'
      },
      proxySecurity: {
        title: '代理安全',
        description: '管理组织中编程代理的安全设置',
        networkPolicy: '网络策略',
        networkPolicyDesc: '控制组织中所有虚拟机的网络访问',
        allowNetworkAccess: '允许网络出站',
        allowNetworkAccessDesc: '允许虚拟机的出站网络连接',
        domainWhitelist: '域名白名单',
        noDomainsAllowed: '不允许任何域名',
        onlyPackageManagers: '仅包管理器 (npm、pip 等)',
        allowAllDomains: '允许所有域名',
        whitelistDesc: '虚拟机仅可连接到包注册中心 (npm、PyPI 等)',
        additionalAllowedDomains: '额外允许的域名',
        additionalAllowedDomainsDesc: '添加虚拟机可以访问的特定域名，不受白名单设置限制',
        addDomainPlaceholder: 'example.com',
        add: '添加'
      },
      accessChannels: {
        title: '访问渠道',
        description: '控制组织成员可以连接到 Rebyte 的外部渠道。',
        telegram: {
          title: 'Telegram',
          description: '允许组织成员连接 Telegram 以接收任务通知。'
        },
        slack: {
          title: 'Slack',
          description: '连接 Slack，直接从工作区创建和管理任务。',
          connect: '连接 Slack',
          notConnected: '未连接'
        }
      },
      account: {
        title: '账户',
        description: '管理您的账户设置和偏好。',
        fullName: '全名',
        email: '电子邮件地址',
        language: '语言',
        saveChanges: '保存更改',
        deleteAccount: '删除账户',
        deleteWarning: '一旦删除账户，将无法恢复。请确信。',
        telegramModal: {
          title: 'Connect Telegram',
          subtitle: '直接从Telegram向你的代理电脑发送任务。',
          desc: '绑定你的Telegram账户，从任何地方向你的代理电脑发送消息。你会被重定向到Telegram，只需轻触即可完成绑定。',
          generateLink: '生成链接',
          step1Title: '在Telegram中打开',
          step1Desc: '点击下面的按钮——它会打开带有预填信息的Telegram。',
          step2Title: '点击发送',
          step2Desc: '只需将预填信息发送给机器人即可。就是这样！',
          openTelegram: '开放电报',
          done: '完成'
        },
        soundSettings: {
          title: '声音通知',
          desc: '任务完成时播放提示音',
          enableTitle: '启用声音',
          enableDesc: '当任务完成或失败时播放通知声音',
          notificationSound: '通知声音',
          sounds: {
            windChime: '风铃',
            bell: '铃声',
            success: '成功',
            dingDong: '叮咚'
          }
        }
      },
      notifications: {
        title: '通知',
        description: '管理您接收通知的方式。',
        email: '邮件通知',
        emailDesc: '接收有关账户活动和更新的邮件。',
        push: '推送通知',
        pushDesc: '在您的设备上接收推送通知。',
        marketing: '营销邮件',
        marketingDesc: '接收有关新功能和促销的邮件。',
      },
      memory: {
        description: '智能体在任务间记住的事实和偏好。',
        searchPlaceholder: '搜索记忆...',
        emptyState: '暂无记忆。添加智能体应记住的事实。',
        addFirstMemory: '添加第一条记忆',
        addMemory: '添加记忆',
        addMemoryDesc: '添加一个智能体应该记住的事实或偏好。',
        keyPlaceholder: '键（如 preferred-language）',
        valuePlaceholder: '智能体应该记住什么？'
      },
      github: {
        title: 'GitHub 集成',
        description: '连接您的 GitHub 账户以同步仓库。',
        connect: '连接 GitHub',
        connected: '已连接为',
        disconnect: '断开连接',
        repositories: '仓库',
        sync: '同步',
        pageTitle: 'GitHub',
        pageDescription: '为您的组织配置 GitHub 集成',
        cliDeviceFlow: 'CLI 设备流',
        cliDescription: '个人贡献者的个人授权。',
        notConnected: '未连接',
        adminOnly: '仅限管理员',
        githubApp: 'GitHub 应用',
        appDescription: '组织范围的访问权限。成员变更后依然有效。',
        notInstalled: '未安装'
      },
      credits: {
        title: '积分',
        description: '管理您的 Rebyte Code 积分',
        balance: '积分余额',
        buy: '购买积分',
        used: '已使用 (30 天)',
        requests: '请求数 (30 天)',
        lifetime: '历史购买',
        total: '总计',
        lowBalance: '您的积分余额不足。购买更多积分以继续使用 Rebyte Code。',
        whatAre: '什么是积分？',
        whatAreDesc: '积分用于驱动 Rebyte Code，我们内置的 AI 编码助手。当您使用 Rebyte Code 作为执行器时，每个 AI 请求都会根据模型和令牌使用量消耗积分。',
        otherExecutors: '其他执行器 (Claude Code, Gemini CLI, Codex, Amp) 使用您自己的 API 密钥，不消耗积分。',
        neverExpire: '积分永不过期，并在您的组织内共享。',
        usageByModel: '按模型使用情况 (最近 30 天)',
        usageDesc: '按 AI 模型细分的积分消耗',
        tokens: '令牌',
        requestsCount: '请求',
        unknown: '未知'
      },
      contextLake: {
        title: '上下文数据湖设置',
        description: '管理您的上下文源和集成。',
        workspace: '工作区',
        workspaceDesc: 'Context Data Lake 是您组织的数据工作区，代理可以在其中访问和处理您的数据。',
        workspaceId: '工作区 ID',
        status: '状态',
        vm: 'VM (沙盒 ID)',
        created: '创建时间',
        actions: '操作',
        actionsDesc: '重置 Context Data Lake 工作区以重新开始。这将停止 VM 并删除工作区。下次访问 Context Data Lake 时将自动配置一个新的。',
        reset: '重置 Context Data Lake 工作区'
      },
      plans: {
        title: '套餐',
        subtitle: '管理您组织的订阅',
        currentPlan: '当前套餐',
        personal: '个人版',
        status: '状态',
        free: '免费',
        upgradeToTeam: '升级到团队版',
        featuresTitle: '套餐功能',
        featuresSubtitle: '您的个人版套餐包含的功能',
        feature: {
          payAsYouGo: '按需付费积分',
          unlimitedTasks: '无限任务',
          allAgents: '所有 AI 代理 (Claude Code, Gemini, Codex, Rebyte Code)',
          contextLake: '上下文数据湖 — 1 个文件源，1 个视图',
          resources: '每个任务 2 GB 内存，20 GB 磁盘'
        },
        totalCredits: '总积分',
        buyCredits: '购买积分',
        includedInPlan: '套餐包含',
        purchased: '已购买',
        neverExpire: '永不过期',
        used30Days: '已使用 (30天)',
        credits: '积分',
        requests30Days: '请求数 (30天)',
        total: '总计',
        howCreditsUsed: '积分使用方式',
        creditsConsumedBy: '积分通过两项服务消耗',
        languageModels: '语言模型',
        languageModelsDesc: '按百万令牌计费。费用因模型而异——更强大的模型每令牌消耗更多积分。',
        agentComputers: '智能计算机',
        agentComputersDesc: '每台智能计算机运行费用为 $0.30/小时，按分钟计费。',
        byokExempt: 'BYOK 用户免 LLM 费用，但仍需支付智能计算机运行费用。',
        buyCreditsTitle: '购买积分',
        buyCreditsDesc: '选择积分套餐。积分永不过期，且在整个组织内共享。',
        creditPackSmall: '1,000 积分',
        creditPackSmallDesc: '适合尝试体验',
        creditPackMedium: '5,000 积分',
        creditPackMediumDesc: '适合日常使用',
        creditPackLarge: '15,000 积分',
        creditPackLargeDesc: '适合重度使用',
        save10: '节省 10%',
        save20: '节省 20%',
        perCredit: '/积分',
        redirectStripe: '您将被重定向到 Stripe 安全完成购买。'
      },
    },
    workspace: {
      run: '运行',
      explorer: '资源管理器',
      agentChat: '代理聊天',
      terminal: '终端',
      askPlaceholder: '让 Claude 更改一些内容...',
      connected: '已连接',
      remote: '远程: SSH',
      ln: '行',
      col: '列'
    },
    landing: {
      nav: {
        features: '功能特性',
        agents: 'AI 智能体',
        faq: '常见问题',
        login: '登录',
        signup: '注册'
      },
      hero: {
        title: 'AI 编程智能体的云端工作空间',
        subtitle: '在云端运行 Claude Code、Gemini CLI 或 Codex——关上电脑，回来查看结果',
      },
      skillDriven: {
        title: '技能驱动的云端 AI 智能体',
        description: '每个任务获得专属云端机器，运行预置技能的编程智能体——文档处理、数据分析、复杂编程、网络爬取等。技能完全异步并行运行，速度前所未有。',
        status: {
          collaborating: '个智能体异步协作中',
          completed: '已完成',
          running: '运行中'
        },
        tasks: {
          docProcessing: '文档处理 Claude',
          dataAnalysis: '数据分析 Gemini',
          complexCoding: '复杂编程任务 Claude',
          webCrawling: '网络爬取 Codex'
        }
      },
      contextLake: {
        title: 'Context Data Lake',
        description: '语义层连接任意数据源——数据库、文件、Google Drive。智能体自动获取团队所有知识，无需手动配置。',
        semanticLayer: '语义层',
        yourDataSources: '你的数据源',
        sources: {
          postgres: 'PostgreSQL',
          gdrive: 'Google Drive',
          csv: 'CSV / Parquet',
          s3: 'Amazon S3'
        },
        connect: 'Context Data Lake 智能体自动发现所有数据'
      },
      longTasks: {
        title: '长时任务执行',
        description: '深度调研、数据分析、构建应用、修复 Bug、部署上线——AI 智能体处理耗时数小时的复杂多步骤任务。关上电脑，回来看结果。',
        cardTitle: '多步骤任务',
        cardSubtitle: '为应用添加 OAuth 登录',
        steps: {
          research: '深度网络调研',
          api: '构建 API 接口',
          test: '编写测试 & 迭代',
          deploy: '创建 PR & 部署'
        }
      },
      potential: {
        title: '释放 AI 编程智能体的全部潜力',
        agents: '编程智能体',
        models: '模型',
        skills: '技能',
        start: '立即开始',
        agentList: {
          claude: 'Claude Code',
          gemini: 'Gemini CLI',
          codex: 'Codex',
          askxbot: 'Askxbot Code'
        },
        skillList: {
          research: '深度调研',
          sec: 'SEC Edgar 财报分析',
          stock: '股票分析',
          browser: '浏览器自动化',
          podcast: '播客生成器',
          app: '应用构建 & 部署'
        }
      },
      faq: {
        title: '常见问题',
        items: [
          {
            q: 'Askxbot 是什么？',
            a: 'Askxbot 是一个云端工作空间，让你与 AI 编程智能体协作。运行 Claude Code、Gemini CLI 或 Codex 来处理长时任务——关上电脑，回来看结果。'
          },
          {
            q: '如何保障数据安全？',
            a: '每个任务运行在独立的云端虚拟机中，完全隔离。你的代码和数据不会在不同任务之间共享。我们使用企业级加密和安全措施保护你的数据。'
          },
          {
            q: '支持哪些 AI 智能体？',
            a: 'Askxbot 支持多种 AI 编程智能体，包括 Claude Code（Anthropic）、Gemini CLI（Google）、Codex（OpenAI）等。使用自己的 API 密钥，在同一工作空间中无缝切换。'
          },
          {
            q: '支持哪些编程语言和框架？',
            a: 'AI 智能体可以处理任何编程语言和框架——Python、TypeScript、Rust、Go、Java 等。它们直接在云端虚拟机中操作你的 Git 仓库，就像一个真正的开发者一样。'
          },
          {
            q: '和本地运行 Claude Code 有什么区别？',
            a: '与 Cursor 等本地工具不同，Askxbot 在云端工作空间中运行 AI 智能体。即使关闭笔记本电脑任务也会继续运行，可以同时运行无限并行任务，当一个模型遇到问题时可以切换到其他智能体。'
          },
          {
            q: '如何开始使用？',
            a: '登录后，连接你的 GitHub 仓库，选择一个 AI 智能体，描述你的任务——就这么简单。智能体会自动克隆代码、执行任务，并在完成后创建 Pull Request。'
          }
        ]
      },
      footer: {
        features: '功能特性',
        agents: 'AI 智能体',
        faq: '常见问题',
        privacy: '隐私政策',
        terms: '服务条款',
        copyright: '© 2026 Askxbot. All rights reserved.',
        darkMode: '深色模式'
      },
      badge: '现已支持 Claude 3.5 Sonnet 和 Gemini 1.5 Pro',
      title: '在云端运行',
      titleHighlight: '代码代理',
      subtitle_old: '在持久、隔离的云工作区中编排 Claude Code、Gemini CLI 和 Codex 等 AI 编码代理。无需本地设置。',
      startBuilding: '免费开始构建',
      starGithub: '在 GitHub 上点星',
      agentSpeed: '代理速度',
      uptime: '正常运行时间',
      featuresTitle: '构建 AI 所需的一切',
      featuresSubtitle: '停止与本地环境作斗争。Rebyte 为您提供专为 AI 时代设计的完整云开发平台。',
      features: {
        persistent: {
          title: '持久工作区',
          desc: '您的环境保持热状态。立即恢复工作，所有文件、依赖项和代理状态都得以保留。'
        },
        sandboxed: {
          title: '沙盒环境',
          desc: '安全运行不受信任的代码。每个工作区都是一个完全隔离的容器，拥有自己的文件系统和网络堆栈。'
        },
        terminal: {
          title: '原生终端访问',
          desc: '对 Linux 环境的完全 root 访问权限。安装任何包，运行任何命令，就像在本地主机一样。'
        },
        multiAgent: {
          title: '多代理支持',
          desc: '在同一会话中切换 Claude、Gemini 和 GPT-4。让最好的模型处理每个任务。'
        },
        vscode: {
          title: '兼容 VS Code',
          desc: '通过 SSH 连接本地 VS Code 或使用我们基于 Monaco 的浏览器编辑器。'
        },
        previews: {
          title: '即时预览',
          desc: '自动端口转发。在 AI 实时构建 Web 应用程序时查看它们。'
        }
      },
      cta: {
        title: '准备好以思维的速度编码了吗？',
        subtitle: '加入成千上万使用 Rebyte 构建未来的开发者。开始使用 10 小时的免费 GPU 时间。',
        button: '创建免费工作区'
      }
    },
    contextLake: {
      sources: '来源',
      noSources: '暂无来源',
      views: '视图',
      noViews: '暂无视图',
      columns: '列',
      selectItem: '选择一个项目以查看其列',
      mainTitle: 'Context Lake',
      mainSubtitle: '给您的代理',
      mainSubtitleHighlight: '正确的上下文。',
      contactAdmin: '联系您的组织管理员以添加数据源。',
      sourceType: '数据源类型',
      howItWorks: '工作原理',
      searchPlaceholder: '搜索数据源...',
      files: '文件',
      databases: '数据库',
      dataLakes: '数据湖',
      tabularFile: '表格文件',
      tabularFileDesc: '上传 CSV、Parquet、JSON 或 Excel 文件',
      upgradeToPro: '升级到 Pro 以连接此数据源',
    },
    skills: {
      agentSkills: '代理技能',
      title: '技能是新的',
      titleHighlight: '软件',
      subtitle: '使用专业技能扩展您的 AI 代理',
      featured: '精选',
      explore: '探索',
      teamSkills: '团队技能',
      searchPlaceholder: '搜索技能...',
      createTeamSkills: '创建团队技能',
      createTeamSkillsDesc: '团队技能是您组织内共享的私有技能。链接包含 SKILL.md 文件的 GitHub 仓库，让您的整个团队都能访问自定义 AI 功能。',
      createWithAgent: '使用代理创建',
      importFromGithub: '从 GitHub 导入',
      noTeamSkills: '暂无团队技能。创建一个以开始。'
    },
    project: {
      untitled: '未命名项目',
      createdBy: '创建者',
      updated: '更新于',
      skills: '技能',
      suggested: '建议：',
      placeholder: '详细描述您想构建的内容',
      openSource: '开源',
      free: '免费',
      optimizedForCode: '针对代码优化',
      fastAndCapable: '快速且强大',
      mostCapable: '最强大',
      withThinking: '具备思考能力',
      kimiLatest: 'Kimi 最新模型',
      zhipuGlm: '智谱 GLM 5'
    },
    dashboard: {
      welcome: '欢迎回来',
      recentActivity: '最近活动',
      quickActions: '快速操作',
      newProject: '新建项目',
      newTask: '新建任务',
      viewAll: '查看全部',
      noActivity: '暂无最近活动',
      upgrade: '升级到团队版',
      user: '用户',
      teamMembers: '您的团队有 2 名成员',
      modes: {
        knowledge: '知识工作',
        build: '构建应用',
        skills: '团队技能'
      },
      skills: {
        createTitle: '创建团队技能',
        createDesc: '使用您的品牌、服务器、API 密钥和内部文档创建技能——对您的团队私有。',
        debugTitle: '基础设施调试',
        debugDesc: '为我们的团队创建一个基础设施调试技能。堡垒机...',
        apiTitle: 'API 参考',
        apiDesc: '为我们的后端创建一个内部 API 参考技能...'
      },
      professional: '专业领域',
      examples: '示例',
      workflows: '工作流',
      suggestions: {
        spreadsheets: '电子表格',
        presentation: '演示文稿',
        document: '文档',
        deepResearch: '深度调研',
        podcast: '播客',
        forms: '表单',
        dataAnalysis: '数据分析',
        stockAnalysis: '股票分析',
        design: '设计',
        dataScraping: '数据抓取',
        image: '图像',
        video: '视频'
      },
      buildSuggestions: {
        portfolio: '作品集 & 落地页',
        fullStack: '全栈应用',
        aiApp: 'AI 应用',
        codeReview: '代码审查',
        uiUx: 'UI/UX 设计'
      },
      skillSuggestions: {
        vercel: 'Vercel 合成模式',
        deepResearch: '深度研究',
        incidentResponse: '事件响应',
        runbook: '运行手册模板',
        pagerduty: 'PagerDuty 自动化'
      },
      skillExamples: {
        brandDesign: {
          title: '为我们的公司打造品牌设计系统技能',
          description: '三种主色 #4F46E5，次色 #7C3AED。字体：Inter, Merriweather...'
        },
        emailTemplate: {
          title: '为我们公司创建一个电子邮件模板技能',
          description: '使用 MJML 进行内联 HTML。发件人：notifications@acme.com...'
        },
        dbAccess: {
          title: '创建一个生产数据库访问技能',
          description: '主要：postgresql://acme_app_read:password@db.acme.com...'
        },
        deployment: {
          title: '为我们的服务创建部署管道技能',
          description: '推送到“main”分支时，部署到生产环境...'
        }
      },
      categories: {
        sales: '销售',
        data: '数据',
        finance: '财务',
        legal: '法律',
        marketing: '市场',
        product: '产品',
        support: '支持',
        search: '搜索',
        productivity: '生产力',
        bioResearch: '生物研究'
      },
      githubModal: {
        title: 'GitHub 集成',
        cliFlow: 'CLI 设备流程',
        cliDesc: '个人投稿者需个人授权。',
        notConnected: '没有关联',
        authorize: '授权',
        waitingAuth: '等待授权......弹窗内完成授权',
        githubApp: 'GitHub 应用',
        appDesc: '全组织访问。成员更替后依然存在。',
        notInstalled: '未安装',
        install: '安装',
        installing: '安装中......弹窗内完成安装'
      }
    },
    layout: {
      search: '搜索',
      inviteFriends: '邀请好友',
      inviteDesc: '分享此链接，当他们注册时，你们都将获得 500 积分！',
      copyLink: '复制推荐链接',
      credits: '积分',
    },
    plans: {
      title: '计划与定价',
      subtitle: '免费开始。升级到团队版以获取所有 Context Data Lake 连接器、更多资源和协作功能。',
      back: '返回',
      personal: {
        title: '个人版',
        price: '免费',
        type: '按需付费',
        features: [
          '按需付费积分',
          '无限任务',
          '所有 AI 代理 (Claude Code, Gemini, Codex, Rebyte Code)',
          'Context Data Lake — 1 个文件源，1 个视图',
          '每个任务 2 GB 内存，20 GB 磁盘'
        ]
      },
      team: {
        title: '团队版',
        recommended: '推荐',
        price: '$30',
        period: '/月',
        seatPrice: '+$6/席位',
        features: [
          '包含个人版所有功能，以及：',
          'Context Data Lake — 所有数据源连接器',
          '无限数据集和视图',
          '每个任务 4 GB 内存，20 GB 磁盘',
          '团队协作和共享工作区',
          '运行时安全控制',
          '优先支持'
        ]
      },
      common: {
        perTask: '每个任务',
        memory: '内存',
        disk: '磁盘',
        contextLake: 'CONTEXT DATA LAKE',
        storage: '存储',
        gb: 'GB'
      },
      contextLake: {
        title: 'Context Data Lake',
        subtitle: '为代理提供正确的上下文。',
        mainTitle: '上下文数据湖',
        mainSubtitle: '给您的代理',
        mainSubtitleHighlight: '正确的上下文。',
        sourceType: '数据源类型',
        howItWorks: '工作原理',
        searchPlaceholder: '搜索来源...',
        files: '文件',
        databases: '数据库',
        dataLakes: '数据湖',
        noSources: '暂无来源',
        noViews: '暂无视图',
        selectItem: '选择一个项目以查看其列',
        sources: '来源',
        views: '视图',
        columns: '列',
        upgradeToPro: '升级到 Pro 以连接此来源',
        tabularFile: '表格文件',
        tabularFileDesc: '上传 CSV、Parquet、JSON 或 Excel 文件',
        restart: '重启',
        stop: '停止',
        addSource: '添加数据',
        createView: '创建视图',
        modal: {
          title: '数据湖作为代理上下文。',
          subtitle: '您的代理需要业务数据、洞察和私有数据的上下文。上下文数据湖是专为代理使用优化的标准数据湖。',
          step1Title: '定义您的数据',
          step1Desc: '连接任何来源 — 文件、数据库或云存储。您的数据被映射为具有明确定义的模式的表，代理可以理解和查询。',
          step2Title: '定义您的访问控制',
          step2Desc: '在细粒度级别控制哪些代理可以访问哪些数据 — 通过可见性、每用户 ACL。',
          step3Title: '代理自动发现数据',
          step3Desc: '代理只能看到他们被允许访问的数据，准确查询他们需要的内容。',
          tableTitle: '每种来源类型如何映射',
          filesTitle: '文件',
          filesDesc: 'CSV、TSV、JSON、JSONL、Parquet。第一行或对象键成为列名。每行/对象/行成为数据行。',
          relationalDBsTitle: '关系型数据库',
          relationalDBsDesc: 'PostgreSQL、MySQL、Supabase 等。直接 1:1 映射。相同的列，相同的类型。表和视图都可以使用。',
          dataLakesTitle: '数据湖',
          dataLakesDesc: 'Snowflake、Databricks、Iceberg、Delta Lake。直接从您的数据仓库查询表和视图。相同的模式，相同的类型 — 就像数据库一样。',
          documentDBsTitle: '文档数据库',
          documentDBsDesc: 'MongoDB、DynamoDB。每个文档/项目成为一行。顶层字段成为列。嵌套对象保持为 JSON。',
          sourceVisible: '来源 — 对代理不可见',
          viewVisible: '视图 — 代理实际看到的内容',
          footerViews: '视图允许您在来源之上预过滤、连接或重塑数据 — 为特定代理量身定制。',
          footerAutoDiscover: '代理自动发现可用的表和列，然后自行查询数据。'
        }
      },
      calculator: {
        title: '计算您的团队价格',
        monthly: '月付',
        yearly: '年付',
        save: '省 20%',
        teamMembers: '团队成员：',
        orgMembers: '您的组织有',
        members: '名成员',
        base: '基础 (包含 1 个席位)',
        extraSeat: '额外席位',
        total: '总计',
        subscribe: '订阅团队版'
      }
    },
    accountModal: {
      title: '账户',
      subtitle: '管理您的账户信息。',
      profile: '个人资料',
      security: '安全',
      profileDetails: '个人资料详情',
      updateProfile: '更新个人资料',
      emailAddresses: '电子邮件地址',
      primary: '主要',
      addEmail: '添加电子邮件地址',
      phoneNumbers: '电话号码',
      addPhone: '添加电话号码',
      connectedAccounts: '已连接账户',
      connectAccount: '连接账户',
      password: '密码',
      updatePassword: '更新密码',
      activeDevices: '活跃设备',
      thisDevice: '此设备',
      todayAt: '今天',
      lastWednesdayAt: '上周三',
      deleteAccount: '删除账户',
      uploadImage: '上传图片',
      uploadImageDesc: '上传小于10MB的JPG, PNG, GIF, 或WEBP格式的图片',
      firstName: '名字',
      lastName: '姓氏',
      addEmailDesc: '这个电子邮件地址必须在验证之后才能被添加到您的账户。',
      emailPlaceholder: '请输入您的电子邮件地址',
      add: '添加',
      addPhoneDesc: '一条包含验证链接的短信将会发送到这个电话号码。',
      connectApple: '连接 Apple 账户',
      connectGithub: '连接 GitHub 账户',
      connectGoogle: '连接 Google 账户',
      connectMicrosoft: '连接 Microsoft 账户',
      verificationRequired: 'Verification required',
      enterPasswordToContinue: 'Enter your current password to continue',
      enterPassword: 'Enter your password',
      continue: '继续',
      useAnotherMethod: 'Use another method',
      unverified: '未验证',
      verifyEmail: '验证电子邮件地址',
      clickVerificationLink: '点击发送到 {email} 的邮件中的验证链接',
      resendLink: '重发链接',
      verifyPhone: '验证电话号码',
      enterVerificationCode: '输入发送到 {phone} 的验证码',
      resendCode: '重发验证码',
      removeEmail: '移除电子邮件地址',
      removePhone: '移除电话号码',
      remove: '移除',
      completeVerification: '完成验证'
    },
    common: {
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      loading: '加载中...',
      error: '错误',
      success: '成功',
      confirm: '确认',
    },
    auth: {
      email: '邮箱地址',
      password: '密码',
      name: '全名',
      login: {
        title: '欢迎回来',
        subtitle: '登录您的账户以继续',
        rememberMe: '记住我',
        forgotPassword: '忘记密码？',
        submit: '登录',
        noAccount: '还没有账户？',
        createAccount: '创建新账户'
      },
      register: {
        title: '创建账户',
        subtitle: '加入我们，开始使用 AI 构建',
        submit: '注册',
        hasAccount: '已有账户？',
        signIn: '直接登录'
      }
    },
  },
};
