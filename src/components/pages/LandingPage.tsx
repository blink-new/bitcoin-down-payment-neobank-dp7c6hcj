import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  Shield, 
  Target, 
  Zap, 
  Home, 
  Bitcoin, 
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Lock,
  BarChart3,
  Wallet,
  Calculator,
  Users,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const [currentPrice, setCurrentPrice] = useState(45000);
  const [priceChange, setPriceChange] = useState(2.5);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 1000;
      setCurrentPrice(prev => Math.max(30000, prev + change));
      setPriceChange((Math.random() - 0.5) * 10);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "FDIC-Insured Fiat",
      description: "Your USD remains protected with full FDIC insurance coverage"
    },
    {
      icon: Zap,
      title: "Instant Conversion",
      description: "Bitcoin to cash when you need it, available 24/7"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Visual progress toward your down payment milestone"
    },
    {
      icon: BarChart3,
      title: "Market Insights",
      description: "Educational content and real-time market analysis"
    },
    {
      icon: Clock,
      title: "Automated DCA",
      description: "Set it and forget it savings that work while you sleep"
    },
    {
      icon: Calculator,
      title: "Tax Reporting",
      description: "Simplified year-end documentation for easy filing"
    }
  ];

  const securityFeatures = [
    "Multi-signature cold storage",
    "SOC 2 Type II compliance", 
    "Licensed money transmitter",
    "$100M insurance coverage",
    "Real-time transaction monitoring"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "Austin, TX",
      before: "$15,000",
      after: "$47,000",
      timeline: "18 months",
      quote: "I thought it would take 5 years to save for a down payment. Bitcoin DCA got me there in less than 2.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      location: "Denver, CO", 
      before: "$8,000",
      after: "$28,000",
      timeline: "12 months",
      quote: "The automated savings made it so easy. I barely noticed the money leaving my account, but my down payment grew faster than I ever imagined.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Johnson",
      location: "Seattle, WA",
      before: "$22,000", 
      after: "$65,000",
      timeline: "24 months",
      quote: "Watching my savings grow in real-time was incredibly motivating. I'm now a homeowner thanks to this platform.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const faqs = [
    {
      question: "What happens if bitcoin crashes?",
      answer: "Dollar-cost averaging helps mitigate volatility by spreading purchases over time. While bitcoin can be volatile short-term, our platform is designed for long-term savings goals. You can also set stop-loss limits and diversification rules to manage risk."
    },
    {
      question: "How quickly can I access my money?",
      answer: "You can convert your bitcoin to USD and withdraw funds within 1-2 business days. For emergency situations, we offer instant conversion with same-day ACH transfers for a small fee."
    },
    {
      question: "What are the fees?",
      answer: "We charge a simple 1% fee on bitcoin purchases and 0.5% on sales. No monthly fees, no hidden charges. Traditional savings accounts offer 0.5% APY - we believe in transparent, value-driven pricing."
    },
    {
      question: "Is this FDIC insured?",
      answer: "Your USD deposits are FDIC insured up to $250,000. Bitcoin holdings are secured through our institutional-grade custody solution with $100M insurance coverage from leading crypto insurers."
    },
    {
      question: "What if I need money for something else?",
      answer: "Your money isn't locked up. You can pause DCA, withdraw funds, or redirect savings at any time. We recommend keeping 3-6 months of expenses in traditional savings before starting your bitcoin down payment fund."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bitcoin className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold text-gray-900">BitcoinNest</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
              <a href="#security" className="text-gray-600 hover:text-gray-900 transition-colors">Security</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#resources" className="text-gray-600 hover:text-gray-900 transition-colors">Resources</a>
              <Button variant="ghost">Login</Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Sign Up</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                  <Bitcoin className="h-4 w-4 mr-1" />
                  Bitcoin at ${currentPrice.toLocaleString()} 
                  <span className={`ml-1 ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}%
                  </span>
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Supercharge your down payment savings with{' '}
                  <span className="text-orange-500">bitcoin</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Save smarter, buy sooner. Turn market volatility into your advantage with automated dollar-cost averaging.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4" onClick={onGetStarted}>
                  Start Your Nest Egg
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>10,000+ savers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>500+ homes purchased</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>$50M+ saved</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" 
                  alt="Modern home"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-2 text-sm font-medium text-gray-900">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Portfolio Growth</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mt-1">+247%</div>
                  <div className="text-xs text-gray-500">Last 2 years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bitcoin vs Housing Reality */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              While House Prices Soared, Bitcoin Soared Higher
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real estate appreciates, but bitcoin has historically outpaced it. See how saving in bitcoin could have changed your buying power over the past decade.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">House Price Comparison</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">2015 - $400K House</div>
                    <div className="text-lg font-bold text-red-600">1,600 BTC</div>
                  </div>
                  <Home className="h-8 w-8 text-red-500" />
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">2024 - $400K House</div>
                    <div className="text-lg font-bold text-green-600">8 BTC</div>
                  </div>
                  <Home className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <div className="text-sm font-medium text-orange-800">Key Insight</div>
                <div className="text-lg font-bold text-orange-900">
                  Houses became 200x cheaper when priced in Bitcoin
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <span>USD House Prices</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">+180%</div>
                  <div className="text-sm text-gray-500">Growth since 2015</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bitcoin className="h-5 w-5 text-orange-500" />
                    <span>Bitcoin Price</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">+18,000%</div>
                  <div className="text-sm text-gray-500">Growth since 2015</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Home className="h-5 w-5 text-green-500" />
                    <span>Bitcoin House Prices</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">-99.5%</div>
                  <div className="text-sm text-gray-500">Decline since 2015</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dollar Cost Averaging Explained */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Smart Investors DCA Into Volatile Assets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Remove emotion, reduce risk, and build wealth systematically with dollar-cost averaging.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>What is DCA?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• Invest the same amount regularly</div>
                  <div>• Reduces impact of volatility</div>
                  <div>• Builds discipline and consistency</div>
                  <div>• No need to time the market</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Bitcoin className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Why Bitcoin?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• Limited supply (21 million max)</div>
                  <div>• Growing institutional adoption</div>
                  <div>• Hedge against currency debasement</div>
                  <div>• Long-term appreciation potential</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Why It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• Smooths out price fluctuations</div>
                  <div>• Reduces average cost over time</div>
                  <div>• Removes emotional decision-making</div>
                  <div>• Perfect for long-term goals</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              DCA Performance Visualization
            </h3>
            <div className="bg-white rounded-lg p-6 shadow-inner">
              <div className="flex items-end justify-between h-32 space-x-2">
                {[40, 60, 35, 80, 45, 70, 55, 90, 65, 85, 75, 95].map((height, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="bg-orange-500 rounded-t"
                      style={{ height: `${height}%`, width: '20px' }}
                    />
                    <div className="text-xs text-gray-500">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4 text-sm text-gray-600">
                Monthly DCA purchases over 12 months - averaging out market volatility
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Your Path to Homeownership, Simplified
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to accelerate your down payment savings with bitcoin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Set Your Goal",
                description: "Target down payment amount and timeline",
                icon: Target
              },
              {
                step: 2,
                title: "Automate Savings",
                description: "Weekly or monthly DCA into bitcoin",
                icon: Zap
              },
              {
                step: 3,
                title: "Track Progress",
                description: "Real-time dashboard shows your growing equity",
                icon: BarChart3
              },
              {
                step: 4,
                title: "Buy Your Home",
                description: "Convert to fiat when you're ready to purchase",
                icon: Home
              }
            ].map((item) => (
              <Card key={item.step} className="text-center relative">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Homebuyers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Banking Features Designed for Your Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to save, grow, and access your down payment funds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section id="security" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Your Future Home Deserves Bank-Level Security
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade security and compliance you can trust with your biggest investment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">256-bit</div>
                  <div className="text-sm text-gray-600">Encryption</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Lock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime SLA</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">SOC 2</div>
                  <div className="text-sm text-gray-600">Certified</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <DollarSign className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900">$100M</div>
                  <div className="text-sm text-gray-600">Insurance</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Real People, Real Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our platform has helped homebuyers accelerate their savings goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Started with</div>
                      <div className="text-lg font-bold text-red-600">{testimonial.before}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Grew to</div>
                      <div className="text-lg font-bold text-green-600">{testimonial.after}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline">{testimonial.timeline}</Badge>
                  </div>
                  <blockquote className="text-gray-600 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Timing Reality */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            The Best Time to Start Was Yesterday. The Second Best Time is Now.
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <TrendingUp className="h-8 w-8 mx-auto mb-3" />
              <div className="text-lg font-semibold">Housing prices continue rising</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <BarChart3 className="h-8 w-8 mx-auto mb-3" />
              <div className="text-lg font-semibold">Interest rates remain elevated</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Bitcoin className="h-8 w-8 mx-auto mb-3" />
              <div className="text-lg font-semibold">Bitcoin adoption accelerating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Clock className="h-8 w-8 mx-auto mb-3" />
              <div className="text-lg font-semibold">Time in market beats timing</div>
            </div>
          </div>

          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-4">
            Start Saving Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Risk Transparency */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Informed Decisions for Your Biggest Investment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in transparency. Here's what you need to know about bitcoin investing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <span>Understanding Volatility</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Bitcoin can experience significant price swings. While this creates opportunity for growth, 
                  it also means your savings value will fluctuate day-to-day.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="font-semibold text-orange-800">Risk Mitigation</div>
                  <div className="text-sm text-orange-700 mt-1">
                    Dollar-cost averaging reduces volatility impact by spreading purchases over time.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span>Timeline Considerations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Bitcoin investing works best with longer time horizons. We recommend a minimum 
                  2-year savings timeline for down payment goals.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="font-semibold text-blue-800">Diversification</div>
                  <div className="text-sm text-blue-700 mt-1">
                    Consider allocating only 20-50% of your down payment savings to bitcoin.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-600 text-sm font-bold">!</span>
              </div>
              <div>
                <div className="font-semibold text-yellow-800">Important Disclosure</div>
                <div className="text-sm text-yellow-700 mt-1">
                  Cryptocurrency investments carry risk of loss. Past performance does not guarantee future results. 
                  Only invest what you can afford to lose. Consider consulting with a financial advisor.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about bitcoin down payment savings.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-left">{faq.question}</CardTitle>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Accelerate Your Homeownership Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of smart savers who are using bitcoin to reach their down payment goals faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4">
              Start Saving in Bitcoin
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
              Schedule a Consultation
            </Button>
          </div>

          <div className="flex justify-center items-center space-x-12 text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10,000+</div>
              <div className="text-sm">Active Savers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$50M+</div>
              <div className="text-sm">Total Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm">Homes Purchased</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Bitcoin className="h-8 w-8 text-orange-500" />
                <span className="text-xl font-bold">BitcoinNest</span>
              </div>
              <p className="text-gray-400">
                Accelerating homeownership through smart bitcoin savings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-gray-400">
                <div>How It Works</div>
                <div>Security</div>
                <div>Pricing</div>
                <div>Resources</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Careers</div>
                <div>Press</div>
                <div>Contact</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2 text-gray-400">
                <div>Terms of Service</div>
                <div>Privacy Policy</div>
                <div>Risk Disclosure</div>
                <div>Regulatory Info</div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <div>© 2024 BitcoinNest. All rights reserved.</div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <div>Licensed Money Transmitter</div>
              <div>FDIC Insured</div>
              <div>SOC 2 Certified</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;