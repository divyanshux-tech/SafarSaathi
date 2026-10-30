import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-teal-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.08),transparent_50%)]" />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: `linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)`, backgroundSize: '40px 40px'}} />

        <div className="relative container-app pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            {/* Left copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-full px-3 py-1.5 text-xs font-medium text-slate-600">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                AI-Powered Autonomous Travel Assistant
                <span className="hidden sm:inline-flex items-center bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded-full tracking-wide">NEW</span>
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
                Your journey,
                <span className="bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent"> perfectly</span> planned.
              </h1>
              <p className="mt-5 text-lg leading-7 text-slate-600 max-w-xl">
                SafarSaathi crafts personalized itineraries, discovers hidden gems, and manages your entire trip — so you explore more and worry less.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-900/10">
                      Go to Dashboard
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                    <Link to="/trips" className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition">
                      View My Trips
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-sky-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-sky-700 transition shadow-lg shadow-sky-600/20">
                      Start Planning Free
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                    <Link to="/trips" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      Demo Trip
                    </Link>
                  </>
                )}
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/100?img=33" alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.pravatar.cc/100?img=32" alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.pravatar.cc/100?img=14" alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white grid place-items-center text-[10px] font-bold">2k+</div>
                </div>
                <div className="text-slate-600">
                  <div className="flex items-center gap-1 text-amber-500">
                    {"★★★★★".split("").map((s,i)=><span key={i} className="text-sm leading-none">{s}</span>)}
                    <span className="text-slate-900 font-semibold ml-1">4.9/5</span>
                  </div>
                  <p className="text-xs text-slate-500">Trusted by 2,000+ travelers</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 ml-2 pl-4 border-l border-slate-200">
                  <span className="text-slate-900 font-semibold">No credit card</span>
                  <span className="text-slate-500">• Free forever plan</span>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative lg:pl-6">
              {/* main card */}
              <div className="relative bg-white rounded-[1.6rem] shadow-2xl shadow-slate-900/10 border border-slate-200 overflow-hidden">
                <div className="h-[360px] sm:h-[420px] relative">
                  <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80&auto=format&fit=crop"
                    alt="Mountain lake"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                  {/* top bar */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> AI Generating...
                    </span>
                    <span className="bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-medium">7 Days • Bali</span>
                  </div>
                  {/* bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-xs opacity-80 tracking-widest uppercase font-semibold">Next Adventure</p>
                    <h3 className="text-xl font-bold mt-1">Bali Island Escape • Oct 12–19</h3>
                    <div className="mt-3 flex gap-2">
                      <span className="bg-white text-slate-900 px-2.5 py-1 rounded-full text-xs font-semibold">✈ Flights booked</span>
                      <span className="bg-white/20 backdrop-blur border border-white/20 px-2.5 py-1 rounded-full text-xs">12 spots • 3 hotels</span>
                    </div>
                  </div>
                </div>

                {/* itinerary strip */}
                <div className="p-4 sm:p-5 bg-white">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900">Today&apos;s itinerary</h4>
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full font-medium">Day 3 of 7</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { time: "09:00 AM", title: "Ubud Monkey Forest", meta: "Private guide • 2h", dot: "bg-sky-500" },
                      { time: "12:30 PM", title: "Tegallalang Rice Terraces", meta: "Lunch at Green Kubu", dot: "bg-amber-500" },
                      { time: "05:00 PM", title: "Sunset at Tanah Lot", meta: "Temple tour + photoshoot", dot: "bg-teal-500" },
                    ].map((item) => (
                      <div key={item.title} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <span className={`w-2.5 h-2.5 rounded-full ${item.dot} mt-1.5`} />
                          <span className="w-px flex-1 bg-slate-200 mt-1" />
                        </div>
                        <div className="flex-1 flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.meta}</p>
                          </div>
                          <span className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-full">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* floating cards */}
              <div className="absolute -left-2 sm:-left-4 top-1/3 hidden lg:flex items-center gap-3 bg-white border border-slate-200 shadow-xl rounded-2xl px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 grid place-items-center text-sky-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="1.6"/></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total saved</p>
                  <p className="text-sm font-bold text-slate-900">₹ 18,400</p>
                </div>
              </div>
              <div className="absolute -right-2 sm:-right-4 bottom-20 hidden lg:flex items-center gap-3 bg-white border border-slate-200 shadow-xl rounded-2xl px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 grid place-items-center">🌤️</div>
                <div>
                  <p className="text-xs text-slate-500">Weather • Ubud</p>
                  <p className="text-sm font-bold text-slate-900">28° Sunny</p>
                </div>
              </div>
            </div>
          </div>

          {/* brand strip */}
          <div className="mt-10 lg:mt-16 border-y border-slate-200 bg-white/60 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 text-xs tracking-widest uppercase font-semibold text-slate-400">
              <span>As featured in</span>
              <span className="flex flex-wrap gap-4 sm:gap-8 text-slate-600 normal-case tracking-normal font-bold text-sm">
                <span>✦ Travel + Leisure</span>
                <span>✦ Condé Nast</span>
                <span>✦ Lonely Planet</span>
                <span>✦ Forbes Travel</span>
              </span>
              <span className="hidden sm:inline text-slate-500 normal-case tracking-normal font-medium">Loved by backpackers & luxury travelers</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-app">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-flex bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">Why SafarSaathi</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Everything you need for a perfect trip</h2>
            <p className="mt-3 text-slate-600">AI does the heavy lifting — you just enjoy the journey. From idea to itinerary in seconds.</p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: "🧠", title: "AI Itinerary Builder", desc: "Tell us your vibe, budget and dates. Get a day-wise plan with stays, food & activities — editable in one click.", color: "bg-sky-500" },
              { icon: "🗺️", title: "Hidden Gems Discovery", desc: "Beyond tourist traps. Local cafes, viewpoints & experiences curated by AI + real traveler insights.", color: "bg-teal-500" },
              { icon: "💰", title: "Smart Budget Planner", desc: "Auto-split costs, track spending and get cheaper alternatives without compromising experience.", color: "bg-amber-500" },
              { icon: "🤝", title: "Collaborative Planning", desc: "Invite friends, vote on places, chat and finalize together. No more endless WhatsApp threads.", color: "bg-violet-500" },
              { icon: "📱", title: "Offline Companion", desc: "Your itinerary, maps & tickets work offline. Live guidance even when network doesn’t.", color: "bg-emerald-500" },
              { icon: "⚡", title: "One-Click Bookings", desc: "Flights, stays & activities — compared and booked inside SafarSaathi at best prices.", color: "bg-rose-500" },
            ].map((f) => (
              <div key={f.title} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-900/5 hover:border-slate-300 transition">
                <div className={`w-11 h-11 rounded-xl ${f.color} text-white grid place-items-center text-lg shadow-md`}>{f.icon}</div>
                <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{f.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-900 group-hover:gap-2 transition-all">Learn more <span aria-hidden>→</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,0.15),transparent_50%),radial-gradient(circle_at_10%_80%,rgba(20,184,166,0.15),transparent_50%)]" />
        <div className="relative container-app">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-sky-400 text-xs font-bold tracking-[0.2em] uppercase">How it works</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">From dream to departure in 3 steps</h2>
            </div>
            <p className="text-slate-400 max-w-md">No spreadsheets. No 20 tabs. Just answer a few questions and let SafarSaathi build your trip like a local friend would.</p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Share your style", desc: "Destination, dates, budget, interests — adventure, food, chill or culture?", img: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80&auto=format&fit=crop" },
              { step: "02", title: "AI crafts your trip", desc: "Get a stunning day-wise itinerary with stays, transport & gems in < 30 seconds.", img: "https://images.unsplash.com/photo-1526772661823-3f88f33771cd?w=600&q=80&auto=format&fit=crop" },
              { step: "03", title: "Travel, effortlessly", desc: "Edit, share, book and navigate — all in one beautiful app, online or offline.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80&auto=format&fit=crop" },
            ].map((s) => (
              <div key={s.step} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
                <div className="h-44 overflow-hidden">
                  <img src={s.img} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                </div>
                <div className="p-6">
                  <span className="text-sky-400 font-bold text-sm">{s.step}</span>
                  <h3 className="mt-1 font-semibold text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={isAuthenticated ? "/trips/create" : "/register"} className="bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition">
              Create My Trip Now →
            </Link>
            <span className="inline-flex items-center gap-2 text-sm text-slate-300">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> 1,240 trips planned this week
            </span>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container-app">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Trending destinations</h2>
              <p className="mt-2 text-slate-600">Handpicked by AI, loved by travelers like you.</p>
            </div>
            <Link to="/trips" className="hidden sm:inline-flex text-sm font-semibold text-sky-600 hover:text-sky-700">Explore all trips →</Link>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "Goa, India", price: "₹ 18k", days: "4D • Beach & Party", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80&auto=format&fit=crop" },
              { name: "Manali, India", price: "₹ 14k", days: "5D • Mountains", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop" },
              { name: "Jaipur, India", price: "₹ 12k", days: "3D • Heritage", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80&auto=format&fit=crop" },
              { name: "Kerala, India", price: "₹ 22k", days: "6D • Backwaters", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80&auto=format&fit=crop" },
            ].map((d) => (
              <div key={d.name} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:shadow-slate-900/5 transition">
                <div className="h-52 overflow-hidden relative">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-semibold text-slate-900">{d.days}</span>
                  <span className="absolute bottom-3 right-3 bg-slate-900 text-white px-2.5 py-1 rounded-full text-xs font-bold">{d.price} onwards</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{d.name}</p>
                  <span className="w-8 h-8 grid place-items-center rounded-full bg-slate-900 text-white group-hover:bg-sky-600 transition">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-app">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Loved by travelers across India</h2>
            <p className="mt-2 text-slate-600">Real stories from people who let SafarSaathi plan their best trips yet.</p>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              { name: "Aarav Mehta", role: "Backpacker • Goa 2025", text: "Planned my entire Goa trip in 5 minutes. The hidden cafe suggestions were unreal — far better than Google results.", avatar: "https://i.pravatar.cc/100?img=15" },
              { name: "Priya Sharma", role: "Family trip • Manali", text: "Budget planner saved us ₹22k! Kids loved the itinerary. Offline maps were a lifesaver in the mountains.", avatar: "https://i.pravatar.cc/100?img=26" },
              { name: "Rohan Das", role: "Solo traveler • Rajasthan", text: "Feels like a local friend planned it. Collaborative voting with friends made decisions so easy.", avatar: "https://i.pravatar.cc/100?img=12" },
            ].map((t) => (
              <div key={t.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex gap-1 text-amber-500 text-sm">★★★★★</div>
                <p className="mt-3 text-slate-700 leading-6">“{t.text}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-10">
        <div className="container-app">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 px-6 sm:px-10 lg:px-12 py-10 sm:py-14">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 via-transparent to-teal-500/20" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">Ready to make your next trip unforgettable?</h2>
                <p className="mt-3 text-slate-300">Join 2,000+ travelers who plan smarter with SafarSaathi. Free to start — no credit card needed.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to={isAuthenticated ? "/trips/create" : "/register"} className="bg-white text-slate-900 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-100 transition">
                    Start Planning Free →
                  </Link>
                  <Link to="/login" className="bg-white/10 backdrop-blur border border-white/20 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition">
                    Sign In
                  </Link>
                </div>
                <p className="mt-4 text-xs text-slate-400">✓ Cancel anytime • ✓ AI itinerary in 30 seconds • ✓ Loved by 4.9★ travelers</p>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white rounded-2xl p-5 shadow-2xl rotate-1">
                  <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/100?img=33" alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">SafarSaathi AI</p>
                      <p className="text-xs text-slate-500">Your travel buddy • Online</p>
                    </div>
                    <span className="ml-auto w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-slate-700 max-w-[85%]">Your 4-day Jaipur heritage trip is ready! 🏰 Want me to add Chokhi Dhani dinner?</div>
                    <div className="bg-sky-600 text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm ml-auto max-w-[70%]">Yes, add it on Day 2 evening!</div>
                    <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-slate-700 max-w-[85%]">Done! ✅ Added • 7:30 PM • Includes folk dance + Rajasthani thali</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">© {new Date().getFullYear()} SafarSaathi • Final Year Project • Made with ♥ for travelers</p>
        </div>
      </section>
    </div>
  );
}
