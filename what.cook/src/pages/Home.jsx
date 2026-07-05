import React, { useState } from 'react';
import { 
  ChefHat, 
  Flame, 
  ListOrdered, 
  Apple, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Users, 
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Recipe",
      desc: "Generate unique recipes from your available ingredients using our smart AI chef.",
      color: "bg-orange-50 text-orange-600 border-orange-100",
      iconBg: "bg-orange-100",
      accent: "text-orange-500"
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Calories",
      desc: "Real-time calorie estimation and tracking for every dish you create or cook.",
      color: "bg-amber-50 text-amber-600 border-amber-100",
      iconBg: "bg-amber-100",
      accent: "text-amber-500"
    },
    {
      icon: <ListOrdered className="w-6 h-6" />,
      title: "Cooking Steps",
      desc: "Clear, step-by-step instructions with timers and smart cooking tips.",
      color: "bg-yellow-50 text-yellow-600 border-yellow-100",
      iconBg: "bg-yellow-100",
      accent: "text-yellow-600"
    },
    {
      icon: <Apple className="w-6 h-6" />,
      title: "Nutrition Suggestor",
      desc: "Personalized nutrition advice based on your dietary goals and restrictions.",
      color: "bg-green-50 text-green-600 border-green-100",
      iconBg: "bg-green-100",
      accent: "text-green-500"
    }
  ];

  const stats = [
    { label: "Recipes Generated", value: "50K+", icon: <ChefHat className="w-4 h-4" /> },
    { label: "Active Cooks", value: "12K+", icon: <Users className="w-4 h-4" /> },
    { label: "Avg. Cook Time", value: "24m", icon: <Clock className="w-4 h-4" /> },
    { label: "Healthy Meals", value: "98%", icon: <Leaf className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-orange-100 selection:text-orange-700">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Kitchen Assistant</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
            Cook Smarter, <br />
            <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              Eat Better
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate recipes, track calories, follow guided cooking steps, and get personalized nutrition suggestions — all in one minimalist app.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-2">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input 
                type="text" 
                placeholder="What ingredients do you have?"
                className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              />
              <Link to="/recipe-generator" className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                Cook <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center gap-2">
                <div className="text-gray-400">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Four powerful tools designed to make cooking effortless, healthy, and fun.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                onClick={() => setActiveFeature(i)}
                className={`group relative p-6 rounded-3xl border-2 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl ${
                  activeFeature === i ? 'border-orange-200 shadow-lg shadow-orange-100/50 bg-white' : 'border-transparent bg-white shadow-sm shadow-gray-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <div className={feature.accent}>{feature.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                
                <div className={`mt-4 flex items-center gap-1 text-sm font-semibold ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-600 text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                <span>Nutrition First</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Personalized Nutrition <br />
                <span className="text-green-500">Suggestions Daily</span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Our AI analyzes your dietary preferences, allergies, and fitness goals to suggest meals that perfectly match your nutritional needs. No more guesswork — just balanced, delicious eating.
              </p>
              
              <div className="space-y-4">
                {[
                  { label: "Calorie Tracking", value: 85, color: "bg-orange-500" },
                  { label: "Macro Balance", value: 92, color: "bg-yellow-500" },
                  { label: "Micronutrients", value: 78, color: "bg-green-500" }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm font-medium mb-1.5">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="text-gray-400">{item.value}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-yellow-100 to-green-100 rounded-3xl blur-2xl opacity-40" />
              <div className="relative bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">AI Chef</div>
                    <div className="text-xs text-gray-400">Just now</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 text-sm text-gray-700">
                    <span className="font-semibold text-orange-600">Recipe:</span> Mediterranean Quinoa Bowl with grilled vegetables and tahini dressing.
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50 border border-green-100 text-sm text-gray-700">
                    <span className="font-semibold text-green-600">Nutrition:</span> 420 kcal • 18g protein • 52g carbs • 14g fats
                  </div>
                  <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-100 text-sm text-gray-700">
                    <span className="font-semibold text-yellow-600">Steps:</span> 5 easy steps • Estimated time: 25 mins
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                        {i === 3 ? '+' : ''}
                      </div>
                    ))}
                  </div>
                  <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1">
                    View Full Recipe <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 p-12 md:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Cook Smarter?</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">Join thousands of home cooks using AI to create healthier, tastier meals every day.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/recipe-generator" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all">
                  Start Cooking Free
                </Link>
                <button className="w-full sm:w-auto px-8 py-3.5 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}