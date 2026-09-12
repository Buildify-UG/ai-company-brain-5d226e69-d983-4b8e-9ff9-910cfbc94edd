import React, { useState } from 'react';
import { Save, Bell, Lock, User, Database, Zap } from 'lucide-react';

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    companyName: 'TechFlow Solutions',
    email: 'admin@techflow.com',
    notifications: true,
    emailAlerts: true,
    documentReminders: true,
    theme: 'light',
    autoBackup: true,
    apiIntegration: false,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>

      {/* Account Settings */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
            <User size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Company Name</label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Admin Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <Bell size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-semibold text-foreground">Enable Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates about your company</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleChange('notifications', e.target.checked)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-semibold text-foreground">Email Alerts</p>
              <p className="text-sm text-muted-foreground">Get important updates via email</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) => handleChange('emailAlerts', e.target.checked)}
              className="w-5 h-5 cursor-pointer"
              disabled={!settings.notifications}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-semibold text-foreground">Document Reminders</p>
              <p className="text-sm text-muted-foreground">Remind me to update documents</p>
            </div>
            <input
              type="checkbox"
              checked={settings.documentReminders}
              onChange={(e) => handleChange('documentReminders', e.target.checked)}
              className="w-5 h-5 cursor-pointer"
              disabled={!settings.notifications}
            />
          </div>
        </div>
      </div>

      {/* Data Settings */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Database size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Data Management</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-semibold text-foreground">Auto Backup</p>
              <p className="text-sm text-muted-foreground">Automatically backup your data daily</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoBackup}
              onChange={(e) => handleChange('autoBackup', e.target.checked)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold">
              Download Backup
            </button>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <button className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-red-700 transition-colors font-semibold">
              Delete All Data
            </button>
          </div>
        </div>
      </div>

      {/* API & Integrations */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">API & Integrations</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground">AI API Integration</p>
                <p className="text-sm text-muted-foreground">Connect OpenAI or other AI services</p>
              </div>
              <input
                type="checkbox"
                checked={settings.apiIntegration}
                onChange={(e) => handleChange('apiIntegration', e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            {settings.apiIntegration && (
              <input
                type="password"
                placeholder="Enter your API key"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            )}
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <Lock size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Security</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold">
            Change Password
          </button>

          <button className="w-full px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold">
            Enable Two-Factor Authentication
          </button>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Security Status:</strong> Your account is secure. All data is encrypted using industry-standard encryption.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <div>
          {saved && <p className="text-green-500 font-semibold flex items-center gap-2">✓ Settings saved successfully</p>}
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
        >
          <Save size={20} /> Save Settings
        </button>
      </div>

      {/* Plan Info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200 dark:border-indigo-800 rounded-lg">
        <h3 className="font-bold text-foreground mb-3">Current Plan: Professional</h3>
        <p className="text-muted-foreground text-sm mb-4">
          You have access to all features including unlimited documents, AI chat, and priority support.
        </p>
        <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
};
