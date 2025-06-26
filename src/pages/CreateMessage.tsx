
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, ArrowLeft, Zap, Calendar, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateMessage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [customerList, setCustomerList] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const generateAIMessage = async () => {
    if (!messageType) {
      toast({
        title: "Please select a message type",
        description: "Choose a message type before generating AI content.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiMessages = {
      "general-sale": "🛍️ New arrivals just landed! Discover amazing products at unbeatable prices. Visit us today and treat yourself to something special!",
      "flash-sale": "⚡ FLASH SALE ALERT! ⚡ 50% OFF everything for the next 24 hours only! Don't miss out on these incredible deals. Shop now before it's too late!",
      "special-offer": "🎁 EXCLUSIVE OFFER just for you! Buy 2 and get 1 absolutely FREE! Limited time only. Hurry in and save big today!",
      "holiday-greeting": "🎄 Season's Greetings from our family to yours! Wishing you joy, happiness, and wonderful moments this holiday season. Thank you for being our valued customer!",
      "birthday-message": "🎂 Happy Birthday! 🎉 Celebrate your special day with a special 20% discount on your next purchase. Make your birthday shopping extra sweet!"
    };

    setMessage(aiMessages[messageType as keyof typeof aiMessages] || "Generated message will appear here...");
    setIsGenerating(false);
    
    toast({
      title: "AI message generated!",
      description: "Your message has been created. Feel free to edit it as needed.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message scheduled successfully!",
      description: `Your ${messageType.replace('-', ' ')} message has been scheduled for ${scheduleDate} at ${scheduleTime}.`,
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Create New Message</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Message Details
              </CardTitle>
              <CardDescription>Choose your message type and content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="messageType">Message Type</Label>
                <Select value={messageType} onValueChange={setMessageType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select message type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general-sale">General Sale</SelectItem>
                    <SelectItem value="flash-sale">Flash Sale</SelectItem>
                    <SelectItem value="special-offer">Special Offer</SelectItem>
                    <SelectItem value="holiday-greeting">Holiday Greeting</SelectItem>
                    <SelectItem value="birthday-message">Birthday Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="message">Message Content</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateAIMessage}
                    disabled={isGenerating}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                </div>
                <Textarea
                  id="message"
                  placeholder="Write your message here or use AI to generate one..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  {message.length}/500 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Delivery
              </CardTitle>
              <CardDescription>When should this message be sent?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduleDate">Date</Label>
                  <Input
                    id="scheduleDate"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="scheduleTime">Time</Label>
                  <Input
                    id="scheduleTime"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Customer List
              </CardTitle>
              <CardDescription>Add customer contacts (WhatsApp numbers or Instagram usernames)</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="customerList"
                placeholder="Enter contacts separated by commas or new lines:&#10;+1234567890, @instagram_user, +9876543210"
                value={customerList}
                onChange={(e) => setCustomerList(e.target.value)}
                rows={6}
                required
              />
              <div className="flex justify-between mt-2">
                <p className="text-sm text-gray-500">
                  Separate contacts with commas or new lines
                </p>
                <Link to="/customers">
                  <Button type="button" variant="link" size="sm">
                    Manage saved customer lists →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Link to="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Schedule Message</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMessage;
