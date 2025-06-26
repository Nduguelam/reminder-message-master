import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft, Plus, Upload, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Customers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [newListName, setNewListName] = useState("");
  const [newContacts, setNewContacts] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Mock customer lists
  const [customerLists, setCustomerLists] = useState([
    {
      id: 1,
      name: "Regular Customers",
      contactCount: 125,
      lastUpdated: "2 days ago",
      contacts: ["+1234567890", "@johndoe", "+9876543210"]
    },
    {
      id: 2,
      name: "VIP Customers",
      contactCount: 45,
      lastUpdated: "1 week ago",
      contacts: ["+1111111111", "@vipuser1", "+2222222222"]
    },
    {
      id: 3,
      name: "Holiday Shoppers",
      contactCount: 89,
      lastUpdated: "3 days ago",
      contacts: ["+3333333333", "@holidayshopper", "+4444444444"]
    }
  ]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleCreateList = () => {
    if (!newListName.trim() || !newContacts.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both list name and contacts.",
        variant: "destructive",
      });
      return;
    }

    const contacts = newContacts.split(/[,\n]/).map(c => c.trim()).filter(c => c);
    const newList = {
      id: Date.now(),
      name: newListName,
      contactCount: contacts.length,
      lastUpdated: "Just now",
      contacts: contacts.slice(0, 3) // Show first 3 for preview
    };

    setCustomerLists([newList, ...customerLists]);
    setNewListName("");
    setNewContacts("");
    setIsCreating(false);
    
    toast({
      title: "Customer list created!",
      description: `${newList.name} with ${contacts.length} contacts has been saved.`,
    });
  };

  const handleDeleteList = (id: number) => {
    setCustomerLists(customerLists.filter(list => list.id !== id));
    toast({
      title: "List deleted",
      description: "Customer list has been removed.",
    });
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
              <Users className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Customer Management</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New List */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Create New Customer List</CardTitle>
                <CardDescription>Add a new group of customers for targeted messaging</CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsCreating(!isCreating)}
              >
                <Plus className="h-4 w-4 mr-2" />
                {isCreating ? "Cancel" : "New List"}
              </Button>
            </div>
          </CardHeader>
          {isCreating && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="listName">List Name</Label>
                <Input
                  id="listName"
                  placeholder="e.g., VIP Customers, Regular Shoppers"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contacts">Customer Contacts</Label>
                <Textarea
                  id="contacts"
                  placeholder="Enter WhatsApp numbers and Instagram usernames:&#10;+1234567890&#10;@instagram_user&#10;+9876543210"
                  rows={6}
                  value={newContacts}
                  onChange={(e) => setNewContacts(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate contacts with commas or new lines. Support WhatsApp numbers and Instagram usernames.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateList}>Create List</Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload CSV
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Existing Customer Lists */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Customer Lists</h2>
          
          {customerLists.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No customer lists yet</h3>
                <p className="text-gray-600 mb-4">Create your first customer list to start sending targeted messages.</p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First List
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customerLists.map((list) => (
                <Card key={list.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{list.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteList(list.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>
                      <Badge variant="secondary" className="mr-2">
                        {list.contactCount} contacts
                      </Badge>
                      Updated {list.lastUpdated}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Sample contacts:</p>
                      <div className="space-y-1">
                        {list.contacts.map((contact, idx) => (
                          <div key={idx} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                            {contact}
                          </div>
                        ))}
                        {list.contactCount > 3 && (
                          <p className="text-xs text-gray-500">
                            +{list.contactCount - 3} more contacts
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        Use in Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tips for Managing Customer Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Keep your lists organized by customer type (VIP, Regular, New, etc.)</li>
              <li>• WhatsApp numbers should include country code (e.g., +1234567890)</li>
              <li>• Instagram usernames should start with @ symbol</li>
              <li>• Regularly update your lists to maintain accuracy</li>
              <li>• You can upload CSV files for bulk imports</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Customers;
