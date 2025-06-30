
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Users, Calendar, Settings, LogOut, History, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomerManager from "@/components/CustomerManager";
import MessageHistory from "@/components/MessageHistory";
import LanguageToggle from "@/components/LanguageToggle";
import CustomerTable from "@/components/CustomerTable";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Mock data for demonstration
  const upcomingMessages = [
    {
      id: 1,
      type: "Flash Sale",
      message: "🔥 Flash Sale Alert! 50% off all items today only!",
      scheduledFor: "Today, 2:00 PM",
      customerCount: 125
    },
    {
      id: 2,
      type: "Holiday Greeting", 
      message: "Happy holidays from our family to yours! 🎄",
      scheduledFor: "Dec 25, 9:00 AM",
      customerCount: 200
    }
  ];

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Sales Reminder Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{t('welcome')}, {user.name}</span>
              <LanguageToggle />
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Link to="/compose-message">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Send className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Send Message</h3>
                <p className="text-sm text-gray-600">Compose and send to customers</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/customers">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">{t('customers')}</h3>
                <p className="text-sm text-gray-600">{t('manageContactLists')}</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/message-history">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <History className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Message History</h3>
                <p className="text-sm text-gray-600">View all sent messages</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Schedule</h3>
              <p className="text-sm text-gray-600">{t('viewAllCampaigns')}</p>
            </CardContent>
          </Card>

          <Link to="/payment">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Settings className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Payment</h3>
                <p className="text-sm text-gray-600">Upgrade your plan</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">247</CardTitle>
              <CardDescription>{t('totalCustomers')}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">12</CardTitle>
              <CardDescription>{t('messagesSentThisWeek')}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">95.8%</CardTitle>
              <CardDescription>{t('deliverySuccessRate')}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Customer Table Section */}
        <div className="mb-8">
          <CustomerTable />
        </div>

        {/* Customer List Section */}
        <div className="mb-8">
          <CustomerManager />
        </div>

        {/* Message History Section */}
        <div className="mb-8">
          <MessageHistory />
        </div>

        {/* Upcoming Messages */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('upcomingScheduledMessages')}</CardTitle>
            <CardDescription>{t('messagesReadyToBeSent')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMessages.map((message) => (
                <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{message.type}</Badge>
                      <span className="text-sm text-gray-600">{message.scheduledFor}</span>
                    </div>
                    <p className="text-sm mb-1">{message.message}</p>
                    <p className="text-xs text-gray-500">{message.customerCount} {t('recipients')}</p>
                  </div>
                  <Button size="sm" variant="outline">{t('edit')}</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
