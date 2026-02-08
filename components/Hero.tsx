
import React from 'react';
import { ModalType } from '../App.js';

interface HeroProps {
  onOpenModal: (type: ModalType) => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 hero-gradient pt-20">
      <div className="blur-circle bg-primary -top-20 -left-20"></div>
      <div className="blur-circle bg-secondary -bottom-20 -right-20"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-300">Waitlist Open</span>
        </div>
        
        <h1 className="font-display text-5xl md:text-8xl mb-8 leading-[1.1] text-white">
          Discover <span className="italic text-primary">Diverse</span> Styles.<br />
          Book Top-Tier Pros.
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light mb-12 leading-relaxed">
          The premier destination for high-end styling tailored to your texture. Join the community redefining hair culture.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <button 
            onClick={() => onOpenModal(ModalType.USER_WAITLIST)}
            className="group relative w-full sm:w-auto px-10 py-5 bg-primary hover:bg-opacity-90 text-white rounded-full font-semibold text-sm tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center justify-center uppercase"
          >
            Join as a User
            <span className="material-symbols-outlined ml-2 text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          
          <button 
            onClick={() => onOpenModal(ModalType.STYLIST_WAITLIST)}
            className="group w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 hover:border-white/50 text-white rounded-full font-semibold text-sm tracking-widest transition-all backdrop-blur-sm flex items-center justify-center uppercase"
          >
            Join as a Stylist
            <span className="material-symbols-outlined ml-2 text-xl group-hover:translate-x-1 transition-transform">stars</span>
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex -space-x-3 mb-4">
            {[1, 2, 3].map((i) => (
              <img 
                key={i}
                alt={`User portrait ${i}`}
                className="w-10 h-10 rounded-full border-2 border-background-dark object-cover" 
                src={`https://picsum.photos/seed/user${i}/100/100`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Join 2,400+ already on the list</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
