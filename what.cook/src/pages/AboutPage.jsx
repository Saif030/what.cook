import React from 'react';
import {
  ChefHat,
  Target,
  Heart,
  Sparkles,
  Users,
  Globe,
  Award,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    { icon: <Sparkles className="w-6 h-6" />, title: 'Innovation', desc: 'Pushing the boundaries of AI to make cooking accessible and exciting for everyone.' },
    { icon: <Heart className="w-6 h-6" />, title: 'Health First', desc: 'Every recipe is crafted with nutritional balance and dietary needs in mind.' },
    { icon: <Users className="w-6 h-6" />, title: 'Community', desc: 'Built by food lovers, for food lovers. We grow through shared culinary experiences.' },
    { icon: <Globe className="w-6 h-6" />, title: 'Sustainability', desc: 'Promoting recipes that reduce waste and use local, seasonal ingredients.' },
  ];

  const team = [
    { name: 'Alex Chen', role: 'Founder & CEO', color: 'bg-orange-100' },
    { name: 'Sarah Miller', role: 'Head of AI', color: 'bg-yellow-100' },
    { name: 'James Wilson', role: 'Lead Chef', color: 'bg-green-100' },
    { name: 'Emma Davis', role: 'Nutritionist', color: 'bg-orange-50' },
  ];

  const stats = [
    { value: '50K+', label: 'Recipes Generated', icon: <ChefHat className="w-5 h-5" /> },
    { value: '1M+', label: 'Meals Cooked', icon: <Heart className="w-5 h-5" /> },
    { value: '98%', label: 'User Satisfaction', icon: <Award className="w-5 h-5" /> },
    { value: '30+', label: 'Countries', icon: <Globe className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            <span>Our Story</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Cooking Made <br />
            <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              Intelligent
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We believe everyone deserves to eat well. Our mission is to combine the art of cooking with the power of AI to help you create delicious, healthy meals effortlessly.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 text-orange-500 mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why We Built ChefAI</h2>
              <div className="space-y-6 text-gray-500 leading-relaxed">
                <p>
                  It started with a simple frustration: staring into a fridge full of ingredients with no idea what to cook. Our founder, Alex, realized that the barrier to home cooking wasn't skill — it was inspiration and guidance.
                </p>
                <p>
                  In 2024, we set out to build an AI that doesn't just generate recipes, but understands nutrition, dietary restrictions, and the joy of cooking. Today, ChefAI helps thousands of people turn everyday ingredients into extraordinary meals.
                </p>
                <p>
                  We're not just a recipe app. We're your personal kitchen companion, nutritionist, and creative chef — all in one.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-3xl blur-2xl opacity-30 translate-x-4 translate-y-4" />
              <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-orange-100 rounded-2xl" />
                  <div className="h-32 bg-yellow-100 rounded-2xl mt-8" />
                  <div className="h-32 bg-green-100 rounded-2xl -mt-8" />
                  <div className="h-32 bg-orange-50 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-500 max-w-lg mx-auto">The principles that guide every recipe we generate and every feature we build.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center text-orange-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-gray-500 max-w-lg mx-auto">The passionate people behind ChefAI.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="text-center group">
                <div className={`w-32 h-32 mx-auto ${member.color} rounded-full mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 p-12 md:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 rounded-full blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Kitchen</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">Be part of a community that's redefining home cooking with AI.</p>
              <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all inline-flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}