import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import BookingForm from './BookingForm';

interface ContactProps {
  prefilledService?: string;
  onClearPrefill?: () => void;
}

export default function Contact({ prefilledService, onClearPrefill }: ContactProps) {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Contact Info & Map */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-xs tracking-[0.2em] text-gold uppercase font-bold font-sans">Reach Out</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1B1B] tracking-tight">
                Visit Our <span className="italic">Luxury Space</span>
              </h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                We are located conveniently in Garia, Kolkata, directly accessible to commuters from Garia Station and Kavi Nazrul Metro corridors. Drop in or secure your booking below.
              </p>

              {/* NAP Blocks */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-rose-50 text-rosegold rounded-xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-luxury-dark uppercase tracking-wider">Salon Location</h5>
                    <p className="text-xs text-gray-600 mt-1 font-light leading-relaxed">
                      Garia Station Road, beside Garia Station Road Post Office, Garia, Kolkata, West Bengal 700084
                      <br />
                      <span className="text-[10px] text-gray-400 font-sans italic">📍 Beside Garia Station Road Post Office (Near Garia Station)</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-amber-50 text-gold rounded-xl shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-luxury-dark uppercase tracking-wider">Call / Booking Desk</h5>
                    <p className="text-xs text-gray-600 mt-1 font-light">
                      <a href="tel:+917980874963" className="hover:text-gold font-semibold text-luxury-dark">+91 79808 74963</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-rose-50 text-rosegold rounded-xl shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-luxury-dark uppercase tracking-wider">Business Email</h5>
                    <p className="text-xs text-gray-600 mt-1 font-light">
                      <a href="mailto:info@melodyspafamilysalon.co.in" className="hover:text-rosegold">info@melodyspafamilysalon.co.in</a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-amber-50 text-gold rounded-xl shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-xs text-luxury-dark uppercase tracking-wider">Business Hours</h5>
                    <p className="text-xs text-gray-600 mt-1 font-light">
                      Open 7 Days: <span className="font-semibold text-luxury-dark">10:00 AM – 8:30 PM</span>
                      <br />
                      <span className="text-[10px] text-gray-400 font-sans">Including Sundays & Bengali Festivals</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Frame */}
            <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 aspect-video lg:aspect-square max-h-[300px]">
              <iframe
                title="Melody's Spa & Family Salon Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.0792134563456!2d88.3813144!3d22.4646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271295f555555%3A0x633d7119f96bca6c!2sGaria%20Station%20Rd%2C%20Kolkata%2C%20West%20Bengal%20700084!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale contrast-[1.05]"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Booking Form Container */}
          <div className="lg:col-span-7" id="appointment-form-card">
            <div className="bg-white border border-gold/15 rounded-[2.5rem] p-8 sm:p-12 shadow-sm relative min-h-[500px] flex flex-col justify-center">
              <BookingForm 
                prefilledService={prefilledService} 
                onClearPrefill={onClearPrefill} 
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
