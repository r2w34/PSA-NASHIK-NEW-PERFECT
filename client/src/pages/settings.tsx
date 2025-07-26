import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Settings as SettingsIcon, 
  Save, 
  RefreshCw, 
  Bell,
  Mail,
  Phone,
  Globe,
  Shield,
  Database,
  Palette,
  Clock,
  MapPin,
  CreditCard,
  Users,
  MessageSquare,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react'

interface SettingSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  settings: Setting[]
}

interface Setting {
  id: string
  label: string
  description: string
  type: 'toggle' | 'input' | 'select' | 'number'
  value: any
  options?: { label: string; value: string }[]
}

const mockSettings: SettingSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Basic academy configuration and preferences',
    icon: <SettingsIcon className="h-5 w-5" />,
    settings: [
      {
        id: 'academy_name',
        label: 'Academy Name',
        description: 'The name of your sports academy',
        type: 'input',
        value: 'Parmanand Sports Academy'
      },
      {
        id: 'academy_address',
        label: 'Academy Address',
        description: 'Physical address of the academy',
        type: 'input',
        value: 'Nashik, Maharashtra, India'
      },
      {
        id: 'contact_email',
        label: 'Contact Email',
        description: 'Primary contact email address',
        type: 'input',
        value: 'contact@psa-nashik.com'
      },
      {
        id: 'contact_phone',
        label: 'Contact Phone',
        description: 'Primary contact phone number',
        type: 'input',
        value: '+91 9999999999'
      },
      {
        id: 'timezone',
        label: 'Timezone',
        description: 'Academy timezone for scheduling',
        type: 'select',
        value: 'Asia/Kolkata',
        options: [
          { label: 'Asia/Kolkata (IST)', value: 'Asia/Kolkata' },
          { label: 'UTC', value: 'UTC' },
          { label: 'America/New_York (EST)', value: 'America/New_York' }
        ]
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notification Settings',
    description: 'Configure how and when you receive notifications',
    icon: <Bell className="h-5 w-5" />,
    settings: [
      {
        id: 'email_notifications',
        label: 'Email Notifications',
        description: 'Receive notifications via email',
        type: 'toggle',
        value: true
      },
      {
        id: 'sms_notifications',
        label: 'SMS Notifications',
        description: 'Receive notifications via SMS',
        type: 'toggle',
        value: true
      },
      {
        id: 'push_notifications',
        label: 'Push Notifications',
        description: 'Receive browser push notifications',
        type: 'toggle',
        value: false
      },
      {
        id: 'fee_reminders',
        label: 'Fee Reminders',
        description: 'Send automatic fee payment reminders',
        type: 'toggle',
        value: true
      },
      {
        id: 'attendance_alerts',
        label: 'Attendance Alerts',
        description: 'Alert when students miss classes',
        type: 'toggle',
        value: true
      }
    ]
  },
  {
    id: 'payments',
    title: 'Payment Settings',
    description: 'Configure payment methods and fee structure',
    icon: <CreditCard className="h-5 w-5" />,
    settings: [
      {
        id: 'currency',
        label: 'Currency',
        description: 'Default currency for fees and payments',
        type: 'select',
        value: 'INR',
        options: [
          { label: 'Indian Rupee (₹)', value: 'INR' },
          { label: 'US Dollar ($)', value: 'USD' },
          { label: 'Euro (€)', value: 'EUR' }
        ]
      },
      {
        id: 'late_fee_percentage',
        label: 'Late Fee Percentage',
        description: 'Percentage charged for late payments',
        type: 'number',
        value: 5
      },
      {
        id: 'payment_due_days',
        label: 'Payment Due Days',
        description: 'Number of days before payment is due',
        type: 'number',
        value: 30
      },
      {
        id: 'auto_receipts',
        label: 'Auto Generate Receipts',
        description: 'Automatically generate receipts for payments',
        type: 'toggle',
        value: true
      },
      {
        id: 'online_payments',
        label: 'Online Payments',
        description: 'Accept online payments via UPI/Cards',
        type: 'toggle',
        value: true
      }
    ]
  },
  {
    id: 'security',
    title: 'Security Settings',
    description: 'Manage security and access control',
    icon: <Shield className="h-5 w-5" />,
    settings: [
      {
        id: 'two_factor_auth',
        label: 'Two-Factor Authentication',
        description: 'Enable 2FA for enhanced security',
        type: 'toggle',
        value: false
      },
      {
        id: 'session_timeout',
        label: 'Session Timeout (minutes)',
        description: 'Auto logout after inactivity',
        type: 'number',
        value: 60
      },
      {
        id: 'password_policy',
        label: 'Strong Password Policy',
        description: 'Enforce strong passwords for users',
        type: 'toggle',
        value: true
      },
      {
        id: 'login_attempts',
        label: 'Max Login Attempts',
        description: 'Maximum failed login attempts before lockout',
        type: 'number',
        value: 5
      }
    ]
  },
  {
    id: 'appearance',
    title: 'Appearance Settings',
    description: 'Customize the look and feel of the application',
    icon: <Palette className="h-5 w-5" />,
    settings: [
      {
        id: 'theme',
        label: 'Theme',
        description: 'Choose your preferred theme',
        type: 'select',
        value: 'dark',
        options: [
          { label: 'Dark Theme', value: 'dark' },
          { label: 'Light Theme', value: 'light' },
          { label: 'Auto (System)', value: 'auto' }
        ]
      },
      {
        id: 'compact_mode',
        label: 'Compact Mode',
        description: 'Use compact layout to show more content',
        type: 'toggle',
        value: false
      },
      {
        id: 'animations',
        label: 'Animations',
        description: 'Enable smooth animations and transitions',
        type: 'toggle',
        value: true
      }
    ]
  }
]

export default function Settings() {
  const [settings, setSettings] = useState<SettingSection[]>(mockSettings)
  const [hasChanges, setHasChanges] = useState(false)
  const [activeSection, setActiveSection] = useState('general')

  const updateSetting = (sectionId: string, settingId: string, value: any) => {
    setSettings(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            settings: section.settings.map(setting =>
              setting.id === settingId ? { ...setting, value } : setting
            )
          }
        : section
    ))
    setHasChanges(true)
  }

  const saveSettings = () => {
    // Simulate saving settings
    setTimeout(() => {
      setHasChanges(false)
      // Show success message
    }, 1000)
  }

  const resetSettings = () => {
    setSettings(mockSettings)
    setHasChanges(false)
  }

  const renderSettingInput = (sectionId: string, setting: Setting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateSetting(sectionId, setting.id, !setting.value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                setting.value ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  setting.value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-sm text-gray-300">
              {setting.value ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        )

      case 'input':
        return (
          <Input
            value={setting.value}
            onChange={(e) => updateSetting(sectionId, setting.id, e.target.value)}
            className="bg-gray-800/50 border-gray-600/50 text-white"
          />
        )

      case 'number':
        return (
          <Input
            type="number"
            value={setting.value}
            onChange={(e) => updateSetting(sectionId, setting.id, parseInt(e.target.value))}
            className="bg-gray-800/50 border-gray-600/50 text-white w-24"
          />
        )

      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => updateSetting(sectionId, setting.id, e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-md text-white text-sm"
          >
            {setting.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      default:
        return null
    }
  }

  const activeSettings = settings.find(s => s.id === activeSection)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-400 mt-1">
            Configure your academy management system preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetSettings}
            disabled={!hasChanges}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={saveSettings}
            disabled={!hasChanges}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Changes Indicator */}
      {hasChanges && (
        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <p className="text-yellow-400 text-sm font-medium">
                You have unsaved changes. Don't forget to save your settings.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg">Settings Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {settings.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-500/20 text-blue-400 border-r-2 border-blue-400'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    {section.icon}
                    <div>
                      <p className="font-medium">{section.title}</p>
                      <p className="text-xs opacity-70">{section.description}</p>
                    </div>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeSettings && (
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {activeSettings.icon}
                  <div>
                    <CardTitle className="text-white">{activeSettings.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {activeSettings.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeSettings.settings.map((setting) => (
                    <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1">{setting.label}</h4>
                        <p className="text-sm text-gray-400">{setting.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {renderSettingInput(activeSettings.id, setting)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* System Information */}
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Information
          </CardTitle>
          <CardDescription className="text-gray-400">
            Current system status and version information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-blue-400" />
                <h4 className="font-medium text-white">Version</h4>
              </div>
              <p className="text-sm text-gray-300">PSA v2.1.0</p>
              <p className="text-xs text-gray-400">Latest</p>
            </div>

            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-green-400" />
                <h4 className="font-medium text-white">Database</h4>
              </div>
              <p className="text-sm text-gray-300">PostgreSQL</p>
              <p className="text-xs text-gray-400">Connected</p>
            </div>

            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-purple-400" />
                <h4 className="font-medium text-white">Active Users</h4>
              </div>
              <p className="text-sm text-gray-300">5 users</p>
              <p className="text-xs text-gray-400">Online now</p>
            </div>

            <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-orange-400" />
                <h4 className="font-medium text-white">Uptime</h4>
              </div>
              <p className="text-sm text-gray-300">15 days</p>
              <p className="text-xs text-gray-400">99.9% availability</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}