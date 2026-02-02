import { useState, useEffect } from 'react';
import {
  Menu, X, Star, Shield, Sparkles, TrendingUp,
  Clock, CheckCircle2, Award, Smartphone, Car,
  Home, Wrench, HardHat, MessageSquare, MapPin,
  ChevronRight, Zap, Eye, Lock, FileText
} from 'lucide-react';
import { supabase, type Lead } from './lib/supabase';

const categories = [
  { id: 'electronics', name: 'Elektronika', icon: Smartphone, active: true },
  { id: 'auto', name: 'Automobiliai', icon: Car, active: true },
  { id: 'appliances', name: 'Buitinė technika', icon: Home, active: true },
  { id: 'clothing', name: 'Drabužių taisymas', icon: Wrench, active: true },
  { id: 'construction', name: 'Statyba', icon: HardHat, active: false },
];

const mockBids = [
  { id: 1, company: 'TechFix Pro', rating: 4.9, reviews: 234, price: 85, responseTime: '5 min' },
  { id: 2, company: 'QuickRepair LT', rating: 4.7, reviews: 189, price: 95, responseTime: '12 min' },
  { id: 3, company: 'MasterService', rating: 4.8, reviews: 312, price: 79, responseTime: '8 min' },
];

const recentActivity = [
  { user: 'Jonas', service: 'Audi A6 stabdžių taisymas', price: 120 },
  { user: 'Rūta', service: 'iPhone 13 ekrano keitimas', price: 89 },
  { user: 'Mantas', service: 'Skalbimo mašinos remontas', price: 65 },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('electronics');
  const [formData, setFormData] = useState<Partial<Lead>>({
    category: 'electronics',
    description: '',
    zip_code: '',
  });
  const [activityIndex, setActivityIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % recentActivity.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.zip_code) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('leads').insert([
        {
          category: formData.category,
          description: formData.description,
          zip_code: formData.zip_code,
        },
      ]);

      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({ category: 'electronics', description: '', zip_code: '' });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg shadow-sm z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-slate-900">servisai.lt</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#categories" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
                Kategorijos
              </a>
              <a href="#how-it-works" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
                Kaip tai veikia
              </a>
              <a href="#for-business" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
                Verslui
              </a>
              <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl font-semibold hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-600/30">
                Pradėti taisymą
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 py-4 px-4 space-y-3 animate-fade-in-up">
            <a href="#categories" className="block py-2 text-slate-600 hover:text-indigo-600 font-medium">
              Kategorijos
            </a>
            <a href="#how-it-works" className="block py-2 text-slate-600 hover:text-indigo-600 font-medium">
              Kaip tai veikia
            </a>
            <a href="#for-business" className="block py-2 text-slate-600 hover:text-indigo-600 font-medium">
              Verslui
            </a>
            <button className="w-full bg-indigo-600 text-white px-6 py-2.5 rounded-2xl font-semibold">
              Pradėti taisymą
            </button>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                <span>15,000+ sėkmingų remontų</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Sugedo?<br />
                <span className="text-indigo-600">Sutaisysim be</span><br />
                galvos skausmo.
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed">
                Nuo iPhone ekrano iki automobilio variklio. Gauk kainų pasiūlymus,
                rinkis meistrą pagal reitingą ir mokėk saugiai per programėlę.
              </p>

              <form onSubmit={handleSubmitLead} className="bg-white rounded-3xl shadow-2xl p-6 space-y-4 border border-slate-200">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pasirinkite kategoriją
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                  >
                    {categories.filter(c => c.active).map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Aprašykite problemą
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Pvz., 'iPhone 13 sudužo ekranas po kritimo'"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pašto kodas
                  </label>
                  <input
                    type="text"
                    value={formData.zip_code}
                    onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                    placeholder="01001"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all hover:scale-[1.02] shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Siunčiama...</span>
                  ) : (
                    <>
                      <span>Gauti pasiūlymus</span>
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                {submitSuccess && (
                  <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center space-x-2 animate-fade-in-up">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Užklausa išsiųsta! Netrukus gausite pasiūlymus.</span>
                  </div>
                )}
              </form>

              <div className="flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Nemokamai</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Per 5 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Be įsipareigojimų</span>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-200">
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200">
                  <div className="p-3 bg-indigo-100 rounded-2xl">
                    <Smartphone className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">iPhone 13 ekrano keitimas</h3>
                    <p className="text-sm text-slate-500">Vilnius, Žirmūnai</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {mockBids.map((bid, idx) => (
                    <div
                      key={bid.id}
                      className="p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-600 hover:shadow-lg transition-all cursor-pointer group"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {bid.company}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              <span className="text-sm font-semibold text-slate-700">{bid.rating}</span>
                            </div>
                            <span className="text-xs text-slate-500">({bid.reviews} atsiliepimai)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-indigo-600">{bid.price}€</div>
                          <div className="text-xs text-slate-500 flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>Atsakė per {bid.responseTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                        <Shield className="h-3 w-3" />
                        <span>Mokėjimas apsaugotas Escrow</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all">
                  Pasirinkti geriausią pasiūlymą
                </button>
              </div>

              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white px-6 py-3 rounded-2xl shadow-lg animate-pulse-slow">
                <div className="text-sm font-semibold">Vidutinis atsakymo laikas</div>
                <div className="text-2xl font-bold">8 min</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Ne tik automobiliai
            </h2>
            <p className="text-xl text-slate-600">
              Taisome viską, kas gali sugesti
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  disabled={!category.active}
                  className={`relative p-6 rounded-2xl border-2 transition-all ${
                    category.active
                      ? selectedCategory === category.id
                        ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105'
                        : 'border-slate-200 hover:border-indigo-600 hover:shadow-lg hover:scale-105'
                      : 'border-slate-200 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className={`flex flex-col items-center space-y-3 ${
                    !category.active && 'grayscale'
                  }`}>
                    <div className={`p-4 rounded-2xl ${
                      selectedCategory === category.id && category.active
                        ? 'bg-indigo-600'
                        : 'bg-slate-100'
                    }`}>
                      <Icon className={`h-8 w-8 ${
                        selectedCategory === category.id && category.active
                          ? 'text-white'
                          : 'text-slate-600'
                      }`} />
                    </div>
                    <span className={`font-semibold text-center ${
                      selectedCategory === category.id && category.active
                        ? 'text-indigo-600'
                        : 'text-slate-700'
                    }`}>
                      {category.name}
                    </span>
                  </div>
                  {!category.active && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-slate-900 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Netrukus
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Kodėl servisai.lt?
            </h2>
            <p className="text-xl text-slate-600">
              Užtikriname saugumą, skaidrumą ir efektyvumą
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 group hover:scale-105 transition-transform">
              <div className="p-4 bg-indigo-100 rounded-2xl w-fit mb-4 group-hover:bg-indigo-600 transition-colors">
                <Sparkles className="h-8 w-8 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                AI diagnostika
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Įkelkite nuotraukas ar vaizdo įrašą - mūsų AI padės tiksliai
                nustatyti problemą ir orientacinę kainą.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 group hover:scale-105 transition-transform">
              <div className="p-4 bg-green-100 rounded-2xl w-fit mb-4 group-hover:bg-green-600 transition-colors">
                <Shield className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Saugus mokėjimas (Escrow)
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Pinigai pervedami meistui TIK po to, kai patvirtinate,
                kad darbas atliktas kokybiškai.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 group hover:scale-105 transition-transform">
              <div className="p-4 bg-amber-100 rounded-2xl w-fit mb-4 group-hover:bg-amber-600 transition-colors">
                <TrendingUp className="h-8 w-8 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Visapusiška logistika
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Negalite nuvežti daikto? Mes paimame, sutaisome ir pristatome atgal.
                Sekite remonto eigą realiu laiku.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 group hover:scale-105 transition-transform">
              <div className="p-4 bg-purple-100 rounded-2xl w-fit mb-4 group-hover:bg-purple-600 transition-colors">
                <FileText className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Skaitmeninė istorija
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Kiekvienas įrenginys gauna "pasą" - visos remontų istorijos viename
                dokumente su garantijomis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Kaip tai veikia?
            </h2>
            <p className="text-xl text-slate-600">
              Tik 3 žingsniai iki sėkmingo remonto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-amber-500 to-green-600 -z-10"></div>

            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 rounded-3xl shadow-2xl text-white">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-indigo-600">1</span>
                </div>
                <div className="p-4 bg-white/20 rounded-2xl w-fit mb-4 backdrop-blur-sm">
                  <MessageSquare className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Aprašykite problemą
                </h3>
                <p className="text-indigo-100 leading-relaxed mb-4">
                  Įkelkite nuotraukas, vaizdo įrašą arba tiesiog aprašykite,
                  kas nutiko. Mūsų AI padės suprasti situaciją.
                </p>
                <ul className="space-y-2 text-sm text-indigo-100">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Nuotraukos / Video</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>AI diagnostika</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Per 2 minutes</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-3xl shadow-2xl text-white">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-amber-600">2</span>
                </div>
                <div className="p-4 bg-white/20 rounded-2xl w-fit mb-4 backdrop-blur-sm">
                  <Eye className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Gaukite pasiūlymus
                </h3>
                <p className="text-amber-100 leading-relaxed mb-4">
                  Meistrai konkuruoja dėl jūsų užsakymo realiu laiku.
                  Matote kainas, reitingus ir atsakymo greitį.
                </p>
                <ul className="space-y-2 text-sm text-amber-100">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Tikros kainos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Patikrinti meistrai</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Realūs atsiliepimai</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-3xl shadow-2xl text-white">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-green-600">3</span>
                </div>
                <div className="p-4 bg-white/20 rounded-2xl w-fit mb-4 backdrop-blur-sm">
                  <Lock className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Mokėkite saugiai
                </h3>
                <p className="text-green-100 leading-relaxed mb-4">
                  Rezervuokite, mokėkite per programėlę ir sekite pažangą.
                  Pinigai pervedami tik po darbo patvirtinimo.
                </p>
                <ul className="space-y-2 text-sm text-green-100">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Escrow apsauga</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Garantija</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Realiu laiku tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Senasis būdas vs. servisai.lt
            </h2>
            <p className="text-xl text-slate-300">
              Užteks minčių apie "gal apgaus"
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-8 rounded-3xl border-2 border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <X className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-300">Senasis būdas</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Google\'as / Facebook grupės - nežinia kam skambinti',
                  'Nežinomos kainos, neaišku ar apgaus',
                  'Reikia pačiam vežti ir palikti',
                  'Mokėjimas grynais, be garantijų',
                  'Jei blogai - kieno problema?',
                  'Remonto istorija išsisklaidžiusi',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-slate-400">
                    <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 rounded-3xl border-2 border-indigo-500 shadow-2xl shadow-indigo-600/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">servisai.lt būdas</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Visi meistrai vienoje vietoje su reitingais',
                  'Skaidrūs pasiūlymai - matai visas kainas iškart',
                  'Pick-up & Return - mes paimame ir pristatome',
                  'Escrow mokėjimas - saugus ir garantuotas',
                  'Ginčų sprendimo sistema su kompensacijomis',
                  'Pilna skaitmeninė istorija su garantijomis',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">15,000+</div>
              <div className="text-indigo-200 text-lg">Sėkmingų remontų</div>
            </div>
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-indigo-200 text-lg">Patikrintų meistrų</div>
            </div>
            <div className="text-white">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-5xl font-bold">4.9</span>
                <Star className="h-10 w-10 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-indigo-200 text-lg">Vartotojų įvertinimas</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-amber-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-3 text-white">
            <Zap className="h-6 w-6 animate-pulse" />
            <div className="font-semibold text-lg animate-fade-in-up">
              <span className="font-bold">{recentActivity[activityIndex].user}</span>
              {' '}ką tik priėmė pasiūlymą:
              {' '}<span className="font-bold">{recentActivity[activityIndex].service}</span>
              {' '}- {recentActivity[activityIndex].price}€
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Wrench className="h-6 w-6 text-indigo-400" />
                <span className="ml-2 text-xl font-bold text-white">servisai.lt</span>
              </div>
              <p className="text-sm text-slate-400">
                Sugedo? Sutaisysim be galvos skausmo. Patikimas, skaidrus,
                modernus servisų paieškos būdas.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Kategorijos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Elektronika</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Automobiliai</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Buitinė technika</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Drabužių taisymas</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Verslui</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#for-business" className="hover:text-indigo-400 transition-colors">Tapkite partneriu</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Kainos</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">API dokumentacija</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Verslo sąlygos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Pagalba</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Kaip tai veikia</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">DUK</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Kontaktai</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privatumas</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-slate-500">
              © 2024 servisai.lt. Visos teisės saugomos.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
                <Award className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
                <MapPin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
