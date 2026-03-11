/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Workspace from './components/Workspace';
import ContextLake from './components/ContextLake';
import Skills from './components/Skills';
import SkillDetail from './components/SkillDetail';
import ProjectPage from './components/ProjectPage';
import TaskPage from './components/TaskPage';
import SettingsLayout from './components/SettingsLayout';
import SettingsAccount from './components/SettingsAccount';
import SettingsMemory from './components/SettingsMemory';
import SettingsGitHub from './components/SettingsGitHub';
import SettingsCredits from './components/SettingsCredits';
import SettingsContextLake from './components/SettingsContextLake';
import SettingsCodeProxy from './components/SettingsCodeProxy';
import SettingsProxySecurity from './components/SettingsProxySecurity';
import SettingsAccessChannels from './components/SettingsAccessChannels';
import SettingsApiKeys from './components/SettingsApiKeys';
import SettingsMCPServers from './components/SettingsMCPServers';
import SettingsMCPDetail from './components/SettingsMCPDetail';
import SettingsPlans from './components/SettingsPlans';
import PlansAndPricing from './components/PlansAndPricing';
import SlackAuthPage from './components/SlackAuthPage';
import PaymentPage from './components/PaymentPage';
import TelegramAuthPage from './components/TelegramAuthPage';
import MockGitHubPage from './components/MockGitHubPage';
import MockSkillsShPage from './components/MockSkillsShPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/slack-auth" element={<SlackAuthPage />} />
        <Route path="/telegram-auth" element={<TelegramAuthPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/mock-github" element={<MockGitHubPage />} />
        <Route path="/mock-skills-sh" element={<MockSkillsShPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="context-lake" element={<ContextLake />} />
          <Route path="skills" element={<Skills />} />
          <Route path="skills/:id" element={<SkillDetail />} />
          <Route path="workspace/:id" element={<Workspace />} />
          <Route path="project/:projectId" element={<ProjectPage />} />
          <Route path="task/:taskId" element={<TaskPage />} />
          <Route path="billing" element={<PlansAndPricing />} />
        </Route>
        <Route path="/settings" element={<SettingsLayout />}>
          <Route index element={<Navigate to="account" replace />} />
          <Route path="account" element={<SettingsAccount />} />
          <Route path="memory" element={<SettingsMemory />} />
          <Route path="github" element={<SettingsGitHub />} />
          <Route path="credits" element={<SettingsCredits />} />
          <Route path="plans" element={<SettingsPlans />} />
          <Route path="context-lake" element={<SettingsContextLake />} />
          <Route path="code-proxy" element={<SettingsCodeProxy />} />
          <Route path="proxy-security" element={<SettingsProxySecurity />} />
          <Route path="access-channels" element={<SettingsAccessChannels />} />
          <Route path="api-keys" element={<SettingsApiKeys />} />
          <Route path="mcp-servers" element={<SettingsMCPServers />} />
          <Route path="mcp-servers/:id" element={<SettingsMCPDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
