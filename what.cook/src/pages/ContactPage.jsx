import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { Feedback } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await Feedback(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'saifansari0115@gmail.com', href: 'mailto:hello@chefai.com' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Office', value: 'Delhi Technological University', href: '#' },
    { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: 'Mon-Fri, 9am-6pm PST', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16 mt-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">
            Have a question, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-5">
                {contactInfo.map((item, i) => (
                  <a key={i} href={item.href} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-100 transition-colors flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.label}</div>
                      <div className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Teaser */}
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl p-6 text-white shadow-lg shadow-orange-200">
              <h3 className="font-bold text-lg mb-2">Need quick help?</h3>
              <p className="text-white/80 text-sm mb-4">Check our FAQ section for instant answers to common questions.</p>
              <button className="text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Visit FAQ <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 ml-1">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 ml-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="recipe">Recipe Suggestion</option>
                      <option value="business">Business Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 ml-1">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-2xl shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}