
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Cities from './components/Cities';
import Referral from './components/Referral';
import Footer from './components/Footer';
import Modal from './components/Modal';

export enum ModalType {
  USER_WAITLIST = 'USER_WAITLIST',
  STYLIST_WAITLIST = 'STYLIST_WAITLIST',
  NOMINATE = 'NOMINATE',
  LEARN_MORE = 'LEARN_MORE',
  NONE = 'NONE'
}

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(ModalType.NONE);

  return (
    <div className="relative">
      <Navbar />
      
      <main>
        <Hero onOpenModal={openModal} />
        <Features />
        <Cities />
        <Referral onOpenModal={openModal} />
      </main>

      <Footer />

      {/* Modals Container */}
      {activeModal !== ModalType.NONE && (
        <Modal type={activeModal} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
