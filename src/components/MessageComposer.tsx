
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send } from "lucide-react";
import CustomerSelection from "./CustomerSelection";

const MessageComposer = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messageTitle, setMessageTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!user || !messageTitle.trim() || !messageBody.trim() || selectedCustomers.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in the message title, body, and select at least one customer.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    try {
      // Save message to message_history
      const { error: historyError } = await supabase
        .from('message_history')
        .insert({
          user_id: user.id,
          message_title: messageTitle.trim(),
          message_body: messageBody.trim(),
          customer_count: selectedCustomers.length,
          sent_at: new Date().toISOString()
        });

      if (historyError) throw historyError;

      // Update last_message_sent for selected customers
      const { error: updateError } = await supabase
        .from('customers')
        .update({ last_message_sent: new Date().toISOString() })
        .in('id', selectedCustomers);

      if (updateError) throw updateError;

      toast({
        title: "✅ Message sent successfully!",
        description: `Your message was successfully sent to ${selectedCustomers.length} customers.`,
      });

      // Reset form
      setMessageTitle("");
      setMessageBody("");
      setSelectedCustomers([]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compose Message</CardTitle>
          <CardDescription>
            Create a new message to send to your selected customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message-title">Message Title</Label>
            <Input
              id="message-title"
              placeholder="Enter message title..."
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message-body">Message Body</Label>
            <Textarea
              id="message-body"
              placeholder="Enter your message content here..."
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <CustomerSelection 
        selectedCustomers={selectedCustomers}
        onSelectionChange={setSelectedCustomers}
      />

      <div className="flex justify-end">
        <Button 
          onClick={handleSendMessage}
          disabled={!messageTitle.trim() || !messageBody.trim() || selectedCustomers.length === 0 || isSending}
          className="bg-green-600 hover:bg-green-700"
        >
          <Send className="h-4 w-4 mr-2" />
          {isSending ? "Sending..." : `Send Message to ${selectedCustomers.length} Customer${selectedCustomers.length !== 1 ? 's' : ''}`}
        </Button>
      </div>
    </div>
  );
};

export default MessageComposer;
