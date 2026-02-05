
import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-background-light dark:bg-[#0D0B0A]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-16">
        
        {/* Mobile Mockup - Matching the Screenshot */}
        <div className="relative flex justify-center mb-16 lg:mb-0 shrink-0">
          <div className="relative w-[300px] h-[700px] bg-black rounded-[3rem] border-[10px] border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Mockup Screen Content */}
            <div className="h-full w-full bg-[#EAE6DB] flex flex-col font-sans select-none">
              
              {/* Top Navigation / Progress Bar */}
              <div className="pt-8 px-8 flex justify-center gap-1.5 mb-6">
                <div className="h-1.5 w-full bg-black/5 rounded-full"></div>
                <div className="h-1.5 w-full bg-black/5 rounded-full"></div>
                <div className="h-1.5 w-full bg-secondary rounded-full"></div>
                <div className="h-1.5 w-full bg-black/5 rounded-full"></div>
              </div>

              {/* Title Header */}
              <div className="text-center px-4 mb-6">
                <h2 className="text-2xl font-bold text-[#12100E] font-display">Find your vibe</h2>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Discover stylists that match your style.</p>
              </div>

              {/* Main Profile Card */}
              <div className="px-3 flex-grow">
                <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-xl shadow-black/5 flex flex-col h-full max-h-[440px]">
                  {/* Photo Grid */}
                  <div className="grid grid-cols-3 h-[250px] gap-0.5">
                    <div className="col-span-2 relative">
                      <img 
                        alt="Hair Texture Example" 
                        className="w-full h-full object-cover" 
                        src="https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=300" 
                      />
                      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-white text-[10px]">location_on</span>
                        <span className="text-[9px] text-white font-bold">1.2 mi</span>
                      </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-0.5">
                      <div className="h-1/2 relative">
                        <img 
                          alt="Tools" 
                          className="w-full h-full object-cover" 
                          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=200" 
                        />
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center">
                           <span className="material-symbols-outlined text-white text-[14px]">bookmark</span>
                        </div>
                      </div>
                      <div className="h-1/2 relative">
                        <img 
                          alt="Stylist Portfolio" 
                          className="w-full h-full object-cover" 
                          src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=200" 
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">+12</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="font-display text-xl font-bold text-[#12100E]">Sarah Jenkins</h3>
                      <div className="bg-[#F8F5F2] border border-slate-100 px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#A36B42] text-[12px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="text-[10px] font-bold text-[#12100E]">4.9</span>
                        <span className="text-[10px] text-slate-400 font-medium">(120)</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-wide mb-3">Master Colorist</p>

                    {/* Skill Tags */}
                    <div className="flex gap-1.5 mb-4 overflow-x-hidden">
                      <span className="px-2 py-1 rounded-full border border-[#D1FAE5] text-[7px] text-[#065F46] bg-[#ECFDF5] font-bold uppercase">Vivids</span>
                      <span className="px-2 py-1 rounded-full border border-[#D1FAE5] text-[7px] text-[#065F46] bg-[#ECFDF5] font-bold uppercase whitespace-nowrap">Color Correction</span>
                      <span className="px-2 py-1 rounded-full border border-[#D1FAE5] text-[7px] text-[#065F46] bg-[#ECFDF5] font-bold uppercase">Curly Cuts</span>
                    </div>

                    {/* Testimonial Quote */}
                    <div className="bg-[#F1F0EC] rounded-2xl p-3 mb-4 flex-grow">
                      <p className="text-[10px] italic text-[#4A443E] leading-[1.4] relative">
                        <span className="absolute -left-1 -top-1 w-1.5 h-1.5 rounded-full bg-[#E2DED0]"></span>
                        "Sarah is a wizard with bleach! My hair has never felt healthier after a lightening session."
                      </p>
                    </div>

                    {/* Footer Stats */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-[9px] text-[#6B7280] font-medium">
                        <span className="material-symbols-outlined text-[#10B981] text-[14px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        Popular: Full Balayage
                      </div>
                      <span className="font-bold text-[#12100E] text-[11px]">~$200</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="p-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-slate-100 cursor-pointer">
                    <span className="material-symbols-outlined text-slate-300 text-2xl font-light">close</span>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shadow-[0_15px_30px_rgba(184,59,94,0.3)] cursor-pointer">
                    <span className="material-symbols-outlined text-white text-3xl">check</span>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-slate-100 cursor-pointer">
                    <span className="material-symbols-outlined text-slate-300 text-2xl">info</span>
                  </div>
                </div>
                <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A49F93] hover:text-secondary transition-colors">
                  Skip for now
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative background glow behind phone */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[80px] rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 blur-[80px] rounded-full"></div>
        </div>

        {/* Feature List */}
        <div className="max-w-md lg:max-w-xl">
          <h2 className="font-display text-4xl md:text-5xl mb-10 leading-tight text-center lg:text-left text-[#12100E] dark:text-white">
            The Art of Hair<br />
            <span className="italic text-primary">In Your Pocket.</span>
          </h2>
          
          <div className="space-y-10">
            {[
              { 
                icon: 'auto_awesome', 
                title: 'Curated Discovery', 
                desc: 'Find stylists who specialize in your specific hair texture and style needs. No more guesswork.' 
              },
              { 
                icon: 'verified_user', 
                title: 'Vetted Professionals', 
                desc: 'Every stylist on PLAIT is vetted for quality, professionalism, and hygiene standards.' 
              },
              { 
                icon: 'event_available', 
                title: 'Seamless Booking', 
                desc: 'Book appointments, pay securely, and manage your hair journey all in one elegant interface.' 
              }
            ].map((f, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center transition-all group-hover:bg-primary/10 group-hover:scale-110">
                  <span className="material-symbols-outlined text-primary">{f.icon}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1.5 text-[#12100E] dark:text-white">{f.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
