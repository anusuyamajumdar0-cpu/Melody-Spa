import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Calendar, MessageSquare, X, Phone, MessageCircle } from 'lucide-react';

interface BookingFormProps {
  prefilledService?: string;
  onClearPrefill?: () => void;
  onClose?: () => void;
  isModal?: boolean;
}

export default function BookingForm({
  prefilledService,
  onClearPrefill,
  onClose,
  isModal = false,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: prefilledService || '',
    date: '',
    time: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync state if prefilledService changes
  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    // Simulate real database saving / validation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onClearPrefill) onClearPrefill();
    }, 1500);
  };

  const handleWhatsAppRedirect = () => {
    const text =
      `Hi Melody's Spa and Family Salon! I would like to book an appointment:%0A` +
      `- Name: ${encodeURIComponent(formData.name)}%0A` +
      `- Phone: ${encodeURIComponent(formData.phone)}%0A` +
      `- Service: ${encodeURIComponent(formData.service || 'General Beauty Service')}%0A` +
      `- Date: ${encodeURIComponent(formData.date)}%0A` +
      `- Time: ${encodeURIComponent(formData.time)}%0A` +
      `- Notes: ${encodeURIComponent(formData.notes || 'None')}`;

    window.open(`https://wa.me/917980874963?text=${text}`, '_blank', 'noreferrer');
  };

  return (
    <div className={`relative ${isModal ? 'bg-white' : ''} h-full flex flex-col justify-center`}>
      {isModal && onClose && (
        <button
          onClick={onClose}
          aria-label="Close booking modal"
          className="absolute -top-4 -right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-luxury-dark transition-colors z-50 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="booking-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2 text-left">
              <h4 className="font-serif font-semibold text-xl text-[#1B1B1B]">
                {isModal ? 'Book Your Luxury Experience' : 'Schedule Your Session'}
              </h4>
              <p className="text-xs text-gray-500 font-light">
                Book online in 30 seconds. Your slot is held securely.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={isModal ? 'modal-name-field' : 'name-field'}
                    className="block text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id={isModal ? 'modal-name-field' : 'name-field'}
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ananya Sengupta"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-gold text-xs"
                  />
                </div>

                <div>
                  <label
                    htmlFor={isModal ? 'modal-phone-field' : 'phone-field'}
                    className="block text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500 mb-1"
                  >
                    WhatsApp Phone *
                  </label>
                  <input
                    type="tel"
                    id={isModal ? 'modal-phone-field' : 'phone-field'}
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-gold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={isModal ? 'modal-email-field' : 'email-field'}
                    className="block text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500 mb-1"
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id={isModal ? 'modal-email-field' : 'email-field'}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ananya@gmail.com"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-gold text-xs"
                  />
                </div>

                <div>
                  <label
                    htmlFor={isModal ? 'modal-service-field' : 'service-field'}
                    className="block text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500 mb-1"
                  >
                    Desired Service / Treatment
                  </label>
                  <select
                    id={isModal ? 'modal-service-field' : 'service-field'}
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-gold text-xs text-gray-600"
                  >
                    <option value="">Choose a treatment...</option>
                    <option value="Signature Hair Cut">Signature Hair Cut & Styling</option>
                    <option value="Advanced Hydra Facial">Advanced Hydra Facial (7-in-1)</option>
                    <option value="Luxury Gold Brightening Facial">Luxury Gold Facial</option>
                    <option value="Luxury Bridal Makeup">Luxury Bridal Makeup (HD/Airbrush)</option>
                    <option value="Liquid Keratin Treatment">Liquid Keratin Reconstructive</option>
                    <option value="Premium Hair Botox Therapy">Premium Hair Botox Therapy</option>
                    <option value="Acrylic Nail Extensions">Acrylic Nail Extensions</option>
                    <option value="Royal Rose Pedicure">Royal Rose Pedicure</option>
                    <option value="Deep Tissue Massage">Aromatherapy Body Spa</option>
                    <option value="Royal Pre-Bridal Package">Royal Pre-Bridal Package</option>
                    <option value="Free Beauty Consultation">Free Beauty Consultation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={isModal ? 'modal-date-field' : 'date-field'}
                    className="block text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500 mb-1"
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id={isModal ? 'modal-date-field' : 'date-field'}
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-gold text-xs text-gray-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor={isModal ? 'modal-time-field' : 'time-field'}
                    className="block text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500 mb-1"
                  >
                    Preferred Time Block
                  </label>
                  <select
                    id={isModal ? 'modal-time-field' : 'time-field'}
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-gold text-xs text-gray-600"
                  >
                    <option value="">Select a time slot...</option>
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Evening (4:00 PM – 7:00 PM)">Evening (4:00 PM – 7:00 PM)</option>
                    <option value="Late Evening (7:00 PM – 8:30 PM)">Late Evening (7:00 PM – 8:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor={isModal ? 'modal-notes-field' : 'notes-field'}
                  className="block text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500 mb-1"
                >
                  Aesthetic Goals / Notes (Optional)
                </label>
                <textarea
                  id={isModal ? 'modal-notes-field' : 'notes-field'}
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g., I have extremely dry hair and would like details about skin glow for an upcoming ceremony..."
                  className="block w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-gold text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-gradient text-white w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs cursor-pointer shadow-lg shadow-gold/20 hover:scale-101 transition-transform disabled:opacity-55 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isSubmitting ? 'Securing Slot...' : 'Secure Salon Appointment'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="booking-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 py-8"
          >
            <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif font-bold text-xl text-[#1B1B1B]">Appointment Slot Held!</h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="font-semibold text-luxury-dark">{formData.name}</strong>. Your preferred slot for <strong className="font-semibold text-gold">{formData.service || 'General Treatment'}</strong> has been registered.
              </p>
            </div>

            {/* Pre-filled WhatsApp direct sync card */}
            <div className="bg-white border border-emerald-100 p-6 rounded-3xl max-w-md mx-auto text-left space-y-4 shadow-xs">
              <h5 className="font-sans font-bold text-xs text-emerald-800 flex items-center gap-1.5 uppercase tracking-wide">
                <MessageSquare className="w-4 h-4 fill-current text-emerald-500" />
                <span>Instant WhatsApp Dispatch</span>
              </h5>
              <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                To lock in your timing instantly and receive automated text confirmations, dispatch your details directly to the front desk with one simple tap.
              </p>

              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-emerald-500/15"
              >
                <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-white text-white" />
                  <Phone className="w-2.5 h-2.5 text-emerald-500 absolute fill-emerald-500 stroke-[3.5] rotate-[15deg] translate-y-[-0.5px] translate-x-[-0.2px]" />
                </div>
                <span>Dispatch to Desk (+91 79808)</span>
              </button>
            </div>

            <div className="pt-2 flex flex-col items-center gap-3">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' });
                }}
                className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-luxury-dark cursor-pointer"
              >
                ← Book Another Treatment
              </button>
              {isModal && onClose && (
                <button
                  onClick={onClose}
                  className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-luxury-dark cursor-pointer underline"
                >
                  Close Window
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
