
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const GovernmentServices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleWhatsAppRedirect = (url: string) => {
    window.open(url, '_blank');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Government Services</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title and Subtitle */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get Government Services Easily
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We help you with RRA, Irembo, and other official documents fast and stress-free.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* RRA Tax Declaration Card */}
          <Card className="border-2 border-yellow-400 hover:border-yellow-500 transition-colors bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-yellow-400 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-yellow-400 dark:text-black" />
              </div>
              <CardTitle className="text-xl font-bold text-black dark:text-white">
                RRA Tax Declaration
              </CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-300">
                We help you declare VAT, PAYE, and income tax on time!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-black dark:bg-yellow-400 text-yellow-400 dark:text-black px-4 py-2 rounded-lg inline-block font-bold text-lg">
                Fixed Fee: 2,000 RWF
              </div>
              <Button 
                onClick={() => handleWhatsAppRedirect('https://wa.me/250783969329?text=Hello%2C%20I%20need%20help%20declaring%20my%20RRA%20taxes')}
                className="w-full bg-black hover:bg-gray-800 text-yellow-400 font-semibold py-3 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black"
                size="lg"
              >
                Request via WhatsApp
              </Button>
            </CardContent>
          </Card>

          {/* IREMBO Certificate Assistance Card */}
          <Card className="border-2 border-yellow-400 hover:border-yellow-500 transition-colors bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-black dark:bg-yellow-400 rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-yellow-400 dark:text-black" />
              </div>
              <CardTitle className="text-xl font-bold text-black dark:text-white">
                IREMBO Certificate Assistance
              </CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-300">
                We help you apply for birth certificates, marriage documents, passports and more
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-black dark:bg-yellow-400 text-yellow-400 dark:text-black px-4 py-2 rounded-lg inline-block font-bold text-lg">
                Fixed Fee: 3,000 RWF
              </div>
              <Button 
                onClick={() => handleWhatsAppRedirect('https://wa.me/250783969329?text=Hello%2C%20I%20want%20to%20request%20an%20Irembo%20document')}
                className="w-full bg-black hover:bg-gray-800 text-yellow-400 font-semibold py-3 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black"
                size="lg"
              >
                Request via WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-10 text-center">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Fast & Reliable:</strong> Our team of experts will handle your documents professionally. 
              Contact us via WhatsApp for quick assistance!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentServices;
