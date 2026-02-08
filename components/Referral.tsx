
import React from 'react';
import { ModalType } from '../App.js';

interface ReferralProps {
  onOpenModal: (type: ModalType) => void;
}

const Referral: React.FC<ReferralProps> = ({ onOpenModal }) => {
  return (
    <section className="py-24 px-6 bg-background-dark text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent"></div>
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-secondary/30">
          <span className="material-symbols-outlined text-secondary text-3xl">card_giftcard</span>
        </div>
        
        <h2 className="font-display text-4xl md:text-5xl mb-6">Know an Exceptional Stylist?</h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-light">
          Help us build the most exclusive community of hair artists. Refer a stylist and receive credit towards your first booking.
        </p>
        
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <button 
            onClick={() => onOpenModal(ModalType.NOMINATE)}
            className="bg-secondary hover:bg-opacity-90 text-white font-bold py-4 rounded-full transition-all uppercase tracking-widest text-sm shadow-lg shadow-secondary/10"
          >
            Refer a Stylist
          </button>
          <button 
            onClick={() => onOpenModal(ModalType.LEARN_MORE)}
            className="bg-transparent border border-slate-700 hover:bg-white/5 text-slate-300 font-bold py-4 rounded-full transition-all uppercase tracking-widest text-sm"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Referral;
