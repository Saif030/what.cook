import React, { useEffect, useState } from 'react';
import {
  ChefHat,
  Flame,
  Clock,
  Bookmark,
  TrendingUp,
  Calendar,
  CookingPot,
  ArrowRight,
  Sparkles,
  Soup,
  Heart,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { logo } from '../assets/assets.js';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import LikedRecipes from '../components/LikedRecipes.jsx';
import { DataContext } from '../context/DataContext';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const { userRecipes , getUserRecipes, delSpecificRecipe, userLikedRecipes , getUserLikedRecipes } = useContext(DataContext);
  let todayCalories = 0;
  if (userRecipes?.rows) {
    userRecipes?.rows.forEach(recipe => {
      if (new Date(recipe.$createdAt).toDateString() === new Date().toDateString()) {
        todayCalories += recipe.calories;
      }
    });
  }

  const [showLiked, setShowLiked] = useState(false);

  const weeklyStats = [
    { day: 'Mon', calories: 1800 },
    { day: 'Tue', calories: 2100 },
    { day: 'Wed', calories: 1950 },
    { day: 'Thu', calories: 2300 },
    { day: 'Fri', calories: 1700 },
    { day: 'Sat', calories: 2400 },
    { day: 'Sun', calories: 2000 },
  ];

  useEffect(() => {
    getUserRecipes();
    getUserLikedRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8 mt-16">
        {/* Welcome + Quick Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Good morning, {user?.username || 'User'}! 👋</h1>
          <p className="text-gray-500">Here's what's cooking today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Recipes Cooked', value: userRecipes?.total || 0, icon: <ChefHat className="w-5 h-5" />, color: 'from-orange-400 to-yellow-400', shadow: 'shadow-orange-200' },
            { label: 'Calories Today', value: todayCalories, icon: <Flame className="w-5 h-5" />, color: 'from-orange-500 to-red-400', shadow: 'shadow-orange-200' },
            { label: 'Liked Recipes', value: userLikedRecipes?.total || 0, icon: <Heart className="w-5 h-5" />, color: 'from-red-400 to-orange-400', shadow: 'shadow-yellow-200' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${stat.color} ${stat.shadow} shadow-lg flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">+12%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Chart
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Weekly Calories</h3>
                  <p className="text-sm text-gray-500">Your nutrition intake this week</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">On track</span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2 h-40">
                {weeklyStats.map((stat, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative">
                      <div 
                        className="w-full bg-gray-100 rounded-t-2xl overflow-hidden"
                        style={{ height: '120px' }}
                      >
                        <div 
                          className="w-full bg-gradient-to-t from-orange-400 to-yellow-400 rounded-t-2xl transition-all duration-1000"
                          style={{ height: `${(stat.calories / maxCal) * 100}%`, marginTop: 'auto' }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-500">{stat.day}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Saved Recipes */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-5 mb-6 px-4">
                <img src={logo} alt="WhatCook Logo" className="w-12 h-12" />
                <h3 className="text-lg font-bold text-gray-900">My Recipes</h3>
                <button onClick={() => setShowLiked(true)} className="text-sm text-orange-600 hover:text-orange-700 font-medium">Show Liked</button>
              </div>

              <div className="space-y-3">
                {userRecipes?.rows?.map(recipe => (
                  <div key={recipe.$id} className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-400 flex-shrink-0`}>
                      <Soup className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{recipe.prompt}</h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> {recipe.calories}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.time_require}</span>
                        <Link to={`/recipe/${recipe.$id}`}><ExternalLink className="w-6 h-6 p-1 hover:bg-gray-200 rounded-full cursor-pointer" /></Link>
                        <span onClick={() => delSpecificRecipe(recipe.$id)}><Trash2 className="w-6 h-6 p-1 hover:bg-gray-200 rounded-full cursor-pointer" /></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 text-sm font-medium text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-2xl transition-all flex items-center justify-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Action */}
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl p-6 text-white shadow-lg shadow-orange-200">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Generate New Recipe</h3>
              <p className="text-white/80 text-sm mb-4">Tell us what you have in your fridge and we'll create something delicious.</p>
              <Link to="/recipe-generator" className="w-full py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                <CookingPot className="w-4 h-4" /> Start Cooking
              </Link>
            </div>

            {/* Meal Plan */}
            {/* <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Today's Plan</h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {[
                  { meal: 'Breakfast', dish: 'Avocado Toast & Eggs', cal: 450, done: true },
                  { meal: 'Lunch', dish: 'Chicken Caesar Salad', cal: 520, done: true },
                  { meal: 'Dinner', dish: 'Not planned yet', cal: 0, done: false },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.done ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'}`}>
                    <div className={`w-2 h-2 rounded-full ${item.done ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-400">{item.meal}</div>
                      <div className="text-sm font-semibold text-gray-900">{item.dish}</div>
                    </div>
                    {item.cal > 0 && <span className="text-xs font-medium text-gray-500">{item.cal} cal</span>}
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {showLiked && <LikedRecipes userLikedRecipes={userLikedRecipes} isOpen={showLiked} onClose={() => setShowLiked(false)} />}
    </div>
  );
}