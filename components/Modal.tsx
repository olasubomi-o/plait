
import React, { useState } from 'react';
import { ModalType } from '../App';

interface ModalProps {
  type: ModalType;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ type, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const SPREADSHEET_URL = 'https://script.google.com/macros/s/AKfycbz_placeholder/exec';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.formType = type;
    data.timestamp = new Date().toISOString();

    try {
      await fetch(SPREADSHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
      });
      setTimeout(() => setStatus('success'), 1200);
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('success'); 
    }
  };

  const overlayClasses = "fixed inset-0 z-[100] flex items-center justify-center p-4 modal-blur";
  const modalClasses = "relative w-full max-w-lg bg-brand-charcoal border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden p-8 md:p-12 transition-all duration-500";

  const renderSuccess = () => (
    <div className="relative z-10 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/30">
        <span className="material-symbols-outlined text-primary text-5xl animate-pulse">check_circle</span>
      </div>
      <h2 className="font-display text-4xl text-white mb-4">You're on the <span className="italic text-primary">List.</span></h2>
      <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xs mx-auto">
        Thank you for joining the Plait community. We'll reach out as soon as a spot opens up in your city.
      </p>
      <button 
        onClick={onClose}
        className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-[10px] border border-white/10"
      >
        Dismiss
      </button>
    </div>
  );

  const renderContent = () => {
    if (status === 'success') return renderSuccess();

    switch (type) {
      case ModalType.USER_WAITLIST:
        return (
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Join the <span className="italic text-primary">Inner Circle</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
              Be the first to access our exclusive network of master stylists. Limited early-access slots available for our New York launch.
            </p>
            <form className="space-y-4 text-left" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 ml-1 font-bold">Full Name</label>
                <input name="fullName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all" placeholder="E.g. Julianne Moore" type="text" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 ml-1 font-bold">Email Address</label>
                <input name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all" placeholder="name@example.com" type="email" />
              </div>
              <button disabled={status === 'submitting'} type="submit" className="w-full mt-6 bg-primary hover:bg-opacity-90 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                {status === 'submitting' ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Join Waitlist'}
              </button>
            </form>
          </div>
        );

      case ModalType.STYLIST_WAITLIST:
        return (
          <div className="relative z-10">
            <div className="text-center md:text-left mb-8">
              <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] text-primary uppercase tracking-[0.2em] font-bold mb-4">Professional Access</span>
              <h2 className="font-display text-3xl md:text-5xl text-white leading-tight">
                Elevate Your <span className="italic text-primary">Artistry.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed max-w-md">
              Join an exclusive network of elite stylists. Gain access to premium tools and a platform that values your craft.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Full Name</label>
                  <input name="fullName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-0 transition-all placeholder:text-slate-700" placeholder="Alex Rivera" type="text" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Email Address</label>
                  <input name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-0 transition-all placeholder:text-slate-700" placeholder="alex@studio.com" type="email" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">IG Handle</label>
                  <input name="igUserName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-0 transition-all placeholder:text-slate-700" placeholder="@stylist_handle" type="text" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Location</label>
                  <input name="location" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-0 transition-all placeholder:text-slate-700" placeholder="City, State" type="text" />
                </div>
              </div>
              <button disabled={status === 'submitting'} type="submit" className="w-full py-5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-full font-bold text-sm tracking-[0.2em] uppercase transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 mt-4">
                {status === 'submitting' ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Apply for Early Access'}
              </button>
            </form>
          </div>
        );

      case ModalType.NOMINATE:
        return (
          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-secondary/20">
                <span className="material-symbols-outlined text-secondary text-3xl">stars</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
                Nominate a <span className="italic text-secondary">Master Artist</span>
              </h2>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">Stylist's Name</label>
                <input name="stylistName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all placeholder:text-slate-700" placeholder="Full name of the artist" type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">Stylist's Email</label>
                <input name="stylistEmail" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all placeholder:text-slate-700" placeholder="artist@studio.com" type="email" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">Stylist's Location</label>
                <input name="location" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all placeholder:text-slate-700" placeholder="City, State" type="text" />
              </div>
              <button disabled={status === 'submitting'} type="submit" className="w-full bg-secondary hover:bg-opacity-90 disabled:opacity-50 text-white font-bold py-5 rounded-full transition-all uppercase tracking-widest text-sm shadow-lg shadow-secondary/20 mt-4 flex items-center justify-center gap-2">
                {status === 'submitting' ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Send Nomination'}
              </button>
            </form>
          </div>
        );

      case ModalType.LEARN_MORE:
        return (
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="font-display text-4xl text-white mb-4">How <span className="italic text-primary">Referrals</span> Work</h2>
              <div className="h-0.5 w-12 bg-primary mx-auto mb-8"></div>
            </div>
            <div className="space-y-8">
              {[
                { icon: 'celebration', title: 'Nominate Excellence', desc: 'Share the profile of a stylist whose work you admire.' },
                { icon: 'verified', title: 'Elite Vetting', desc: 'Our curators review all nominations to ensure quality.' },
                { icon: 'payments', title: 'Earn Rewards', desc: 'Receive credit once your referral completes their first booking.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">{item.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={onClose} className="w-full mt-12 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-[10px] border border-white/10">Got it, thanks</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={overlayClasses} onClick={status === 'submitting' ? undefined : onClose}>
      <div className={`${modalClasses} ${status === 'success' ? 'scale-105' : 'scale-100'}`} onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full"></div>
        {status !== 'submitting' && (
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-20">
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;
