# Backend API Design

Based on the frontend pages and features, the following backend APIs are required:

## 1. Authentication (`/api/v1/auth`)
- `POST /register`: User registration
- `POST /login`: User login
- `POST /logout`: User logout

## 2. Account & Profile (`/api/v1/account`)
*(Already partially implemented)*
- `GET /profile`: Get user profile
- `PUT /profile`: Update user profile
- `GET /settings`: Get user settings
- `PUT /settings`: Update user settings
- `GET /emails`, `POST /emails`, `DELETE /emails/{email}`, `PUT /emails/{email}/primary`, `POST /emails/{email}/verify`
- `GET /phones`, `POST /phones`, `DELETE /phones/{phone}`, `PUT /phones/{phone}/primary`, `POST /phones/{phone}/verify`
- `GET /connections`, `POST /connections/{provider}`, `DELETE /connections/{provider}`
- `GET /devices`, `DELETE /devices/{device_id}`
- `PUT /password`: Update password
- `DELETE /`: Delete account

## 3. Organization (`/api/v1/organizations`)
- `GET /`: List user's organizations
- `POST /`: Create a new organization
- `GET /{id}`: Get organization details
- `PUT /{id}`: Update organization
- `GET /{id}/members`: List organization members
- `POST /{id}/invites`: Invite a new member

## 4. Dashboard (`/api/v1/dashboard`)
- `GET /stats`: Get dashboard statistics (recent activity, quick actions, team members count)

## 5. Projects (`/api/v1/projects`)
- `GET /`: List projects
- `POST /`: Create a new project
- `GET /{id}`: Get project details
- `PUT /{id}`: Update project
- `DELETE /{id}`: Delete project

## 6. Tasks (`/api/v1/tasks`)
- `GET /`: List tasks
- `POST /`: Create a new task
- `GET /{id}`: Get task details
- `PUT /{id}`: Update task
- `DELETE /{id}`: Delete task

## 7. Context Lake (`/api/v1/context-lake`)
- `GET /sources`: List data sources
- `POST /sources`: Add a data source
- `DELETE /sources/{id}`: Remove a data source
- `GET /workspace`: Get workspace status
- `POST /workspace/reset`: Reset workspace

## 8. Skills (`/api/v1/skills`)
- `GET /`: List skills (team and featured)
- `POST /`: Create a new skill
- `GET /{id}`: Get skill details
- `PUT /{id}`: Update skill
- `DELETE /{id}`: Delete skill

## 9. Memory (`/api/v1/memory`)
- `GET /`: List memories
- `POST /`: Add a memory
- `PUT /{id}`: Update memory
- `DELETE /{id}`: Delete memory

## 10. GitHub Integration (`/api/v1/github`)
- `GET /status`: Get GitHub connection status
- `POST /connect`: Connect GitHub account
- `POST /disconnect`: Disconnect GitHub account
- `GET /repos`: List connected repositories

## 11. Billing & Credits (`/api/v1/billing`)
- `GET /credits`: Get credit balance
- `GET /usage`: Get credit usage history
- `GET /plans`: Get available plans
- `POST /subscribe`: Subscribe to a plan or buy credits

## 12. Settings - Code Proxy & Security (`/api/v1/settings`)
- `GET /code-proxy`: Get code proxy settings
- `PUT /code-proxy`: Update code proxy settings
- `GET /proxy-security`: Get proxy security settings
- `PUT /proxy-security`: Update proxy security settings

## 13. Access Channels (`/api/v1/channels`)
- `GET /status`: Get channels connection status
- `POST /slack/connect`: Connect Slack
- `POST /telegram/connect`: Connect Telegram

## 14. API Keys (`/api/v1/api-keys`)
- `GET /`: List API keys
- `POST /`: Create a new API key
- `DELETE /{id}`: Delete an API key

## 15. MCP Servers (`/api/v1/mcp-servers`)
- `GET /`: List MCP servers
- `POST /`: Install an MCP server
- `GET /{id}`: Get MCP server details
- `DELETE /{id}`: Uninstall an MCP server
