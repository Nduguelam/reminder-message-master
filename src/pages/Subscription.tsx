
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, ArrowLeft, CreditCard, Phone, Building, Upload, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import LanguageToggle from "@/components/LanguageToggle";

const Subscription = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  if (!user) {
    navigate("/login");
    return null;
  }

  const plans = [
    {
      id: 'basic',
      name: t('basicPlan'),
      price: '10,000',
      description: `1 ${t('messagePerWeek')}`,
      features: [`1 ${t('messagePerWeek')}`, 'Basic support', 'Customer management']
    },
    {
      id: 'pro',
      name: t('proPlan'),
      price: '20,000',
      description: `3 ${t('messagesPerWeek')}`,
      features: [`3 ${t('messagesPerWeek')}`, 'Priority support', 'Advanced analytics', 'AI message generation']
    },
    {
      id: 'vip',
      name: t('vipPlan'),
      price: '30,000',
      description: t('dailyMessaging'),
      features: [t('dailyMessaging'), 'Premium support', 'Advanced analytics', 'AI message generation', 'Custom segments']
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Plan Selected",
      description: `You have selected the ${plans.find(p => p.id === planId)?.name}. Please proceed with payment.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('backToDashboard')}
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">{t('subscriptionPlans')}</h1>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subscription Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-2">{t('subscriptionPlans')}</h2>
          <p className="text-gray-600 text-center mb-8">{t('chooseYourPlan')}</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-blue-600">
                    {plan.price} <span className="text-sm font-normal">{t('rwfMonth')}</span>
                  </CardDescription>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? "Selected" : t('selectPlan')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                {t('paymentInstructions')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">{t('mobileMoneyMTN')}</h3>
                <p className="text-lg font-mono">+250 788 123 456</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">{t('mobileMoneyAirtel')}</h3>
                <p className="text-lg font-mono">+250 735 123 456</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  {t('bankAccount')}
                </h3>
                <div className="space-y-1">
                  <p><strong>{t('bankOfKigali')}</strong></p>
                  <p>{t('accountNumber')}: <span className="font-mono">00123456789</span></p>
                  <p>{t('accountName')}: Sales Reminder Pro</p>
                  <p className="text-sm text-gray-600">{t('businessAccount')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('afterPayment')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="mb-2">{t('sendProofViaWhatsApp')}:</p>
                <p className="text-lg font-mono text-blue-600">+250 788 999 888</p>
              </div>
              
              <div className="border-t pt-4">
                <p className="mb-4">{t('orUploadScreenshot')}:</p>
                <div>
                  <Label htmlFor="paymentProof">{t('uploadPaymentProof')}</Label>
                  <div className="mt-2">
                    <Input
                      id="paymentProof"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {paymentProof && (
                      <p className="text-sm text-green-600 mt-2">
                        File selected: {paymentProof.name}
                      </p>
                    )}
                  </div>
                </div>
                
                {paymentProof && (
                  <Button className="w-full mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Payment Proof
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
