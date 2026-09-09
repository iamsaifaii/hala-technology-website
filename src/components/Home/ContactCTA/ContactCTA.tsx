'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowLeft, Check, Calendar as CalendarIcon, Clock, Loader2, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

// Reusable SVG for the Smiley Face (Pure Black & White)
const SmileyFace = ({ className, eyeColor = "#000" }: { className?: string, eyeColor?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className}`}>
    <path d="M30 40 C30 35 38 35 38 40" stroke={eyeColor} strokeWidth="6" strokeLinecap="round" />
    <path d="M62 40 C62 35 70 35 70 40" stroke={eyeColor} strokeWidth="6" strokeLinecap="round" />
    <path d="M25 55 Q50 80 75 55" stroke={eyeColor} strokeWidth="6" strokeLinecap="round" />
  </svg>
);

// Synthesize pleasant check chime sound effect via Web Audio API
const playSuccessSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // First high chime tone (E5 - 659.25Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime);
    gain1.gain.setValueAtTime(0.15, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.3);

    // Second higher chime tone (B5 - 987.77Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, ctx.currentTime + 0.1);
    gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 0.5);
  } catch (e) {
    // Autoplay restrictions fallback
  }
};

const baseTimeSlots = [9, 10.5, 11.25, 13, 14.5, 16.25];
const getTimeSlotString = (time: number, format: '12h' | '24h') => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  const minsStr = minutes === 0 ? '00' : minutes.toString().padStart(2, '0');

  if (format === '24h') {
    return `${hours.toString().padStart(2, '0')}:${minsStr}`;
  } else {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12.toString().padStart(2, '0')}:${minsStr} ${ampm}`;
  }
};

const availableServices = [
  'Brand Strategy',
  'Marketing',
  'SEO Optimization',
  'Web App Development',
  'CRM',
  'Marketing Automation'
];

export default function ContactCTA({ contained = false, formOnly = false }: { contained?: boolean; formOnly?: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<'calendar' | 'form'>('calendar');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Freeze background scrolling when rendered as a modal (formOnly)
  useEffect(() => {
    if (formOnly) {
      // Pause Lenis properly by stopping it from listening, or just lock body.
      // We will just lock body, but NOT html to allow zoom panning.
      const originalBodyOverflow = document.body.style.overflow;
      document.body.style.setProperty('overflow', 'hidden', 'important');

      // We don't call lenis.stop() because it might leave preventDefault active on wheel events,
      // which breaks touchpad scrolling on nested elements. We use data-lenis-prevent instead.

      return () => {
        document.body.style.overflow = originalBodyOverflow;
      };
    }
  }, [formOnly]);

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    country: '',
    services: [] as string[],
    budget: '',
    howDidYouHear: '',
    message: ''
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Calendar Helpers
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleTimeSelect = useCallback((timeStr: string) => {
    if (!selectedDate) return;
    setSelectedTime(timeStr);
    setStep('form');
  }, [selectedDate]);

  const handleBack = useCallback(() => {
    setStep('calendar');
    setSelectedTime(null);
    setErrorMsg('');
  }, []);

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setErrorMsg('Please complete the reCAPTCHA verification');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: selectedDate?.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
          time: selectedTime,
          captchaToken,
          pageUrl: typeof window !== 'undefined' ? window.location.href : ''
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit booking request');

      playSuccessSound();
      router.push('/thank-you');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again or contact us directly.');
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setShowSuccessModal(false);
    setStep('calendar');
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: '', email: '', jobTitle: '', country: '', services: [], budget: '', howDidYouHear: '', message: '' });
    setCaptchaToken(null);
  };

  const getDayOfWeek = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }, []);

  const bookingCard = (
    <div data-lenis-prevent="true" className="bg-[#111111] rounded-[20px] sm:rounded-[24px] border border-[#222222] p-4 sm:p-7 w-full max-w-[460px] min-h-[500px] sm:min-h-[520px] mx-auto relative flex flex-col justify-between transition-all duration-300">
      {/* Top Step Progress Indicator */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${step === 'calendar' ? 'bg-white text-black' : 'bg-[#222222] text-white/50'}`}>
            1
          </span>
          <span className={`text-xs font-semibold ${step === 'calendar' ? 'text-white' : 'text-white/40'}`}>Date &amp; Time</span>
          <span className="text-white/20 text-xs">/</span>
          <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${step === 'form' ? 'bg-white text-black' : 'bg-[#222222] text-white/50'}`}>
            2
          </span>
          <span className={`text-xs font-semibold ${step === 'form' ? 'text-white' : 'text-white/40'}`}>Your Details</span>
        </div>

        {step === 'form' && (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1 text-white hover:text-white/80 transition-colors text-xs font-semibold px-3 py-1 rounded-lg bg-[#181818] border border-[#262626] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}
      </div>

      {/* STEP 1: Calendar & Time Slots */}
      <div className={`flex flex-col flex-1 duration-300 ${step === 'calendar' ? 'block animate-in fade-in slide-in-from-left-4' : 'hidden'}`}>
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-5 px-1">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4.5 h-4.5 text-white" />
            <h3 className="font-jakarta text-[17px] font-bold text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-xl border border-[#262626] text-white">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className="p-1.5 rounded-lg hover:bg-[#222222] text-white transition-colors cursor-pointer border-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next Month"
              className="p-1.5 rounded-lg hover:bg-[#222222] text-white transition-colors cursor-pointer border-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <span key={day} className="text-[10px] font-bold tracking-wider text-white/50 py-1">
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center text-[13px] font-medium mb-5">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9"></div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            dateObj.setHours(0, 0, 0, 0);

            const isPast = dateObj.getTime() < today.getTime();
            const isSelected = selectedDate ? selectedDate.toDateString() === dateObj.toDateString() : false;

            return (
              <button
                key={day}
                type="button"
                onClick={() => {
                  if (!isPast) {
                    setSelectedDate(dateObj);
                  }
                }}
                disabled={isPast}
                className={`h-9 w-full flex items-center justify-center rounded-xl transition-colors text-sm font-semibold select-none border ${
                  isPast
                    ? 'text-[#444444] cursor-not-allowed border-transparent bg-transparent'
                    : isSelected
                    ? 'bg-white text-black font-bold border-white cursor-pointer'
                    : 'bg-[#181818] text-white border-[#262626] hover:bg-[#222222] hover:border-white/50 cursor-pointer'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Time Slots Section */}
        {selectedDate ? (
          <div className="border-t border-[#222222] pt-4 mt-auto animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-white" />
                <span className="text-[13px] font-bold text-white">
                  {getDayOfWeek(selectedDate)}, {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              {/* 12h / 24h Toggle */}
              <div className="flex items-center bg-[#141414] border border-[#262626] rounded-full p-0.5 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setTimeFormat('12h')}
                  className={`px-3 py-1 rounded-full transition-colors border-none cursor-pointer ${timeFormat === '12h' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white bg-transparent'}`}
                >
                  12h
                </button>
                <button
                  type="button"
                  onClick={() => setTimeFormat('24h')}
                  className={`px-3 py-1 rounded-full transition-colors border-none cursor-pointer ${timeFormat === '24h' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white bg-transparent'}`}
                >
                  24h
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {baseTimeSlots.map(time => {
                const timeStr = getTimeSlotString(time, timeFormat);
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(timeStr)}
                    className="w-full py-2.5 border border-[#262626] rounded-xl text-[12px] font-semibold text-white bg-[#181818] hover:bg-white hover:border-white hover:text-black transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {timeStr}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="border-t border-[#222222] pt-4 mt-auto text-center py-4 bg-[#141414] rounded-xl border border-dashed border-[#262626]">
            <p className="text-white/50 text-xs font-medium">Select an available date to view time slots</p>
          </div>
        )}
      </div>

      {/* STEP 2: Customer Details Form */}
      <div className={`flex flex-col h-full duration-300 ${step === 'form' ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
        <div className="mb-4 bg-[#181818] border border-[#262626] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-white" />
            <div>
              <p className="text-[11px] text-white/50 font-medium">Selected Time Slot</p>
              <p className="text-xs font-bold text-white">
                {selectedDate && getDayOfWeek(selectedDate)}, {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {selectedTime}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleBack}
            className="text-xs text-white hover:underline font-semibold bg-transparent border-none cursor-pointer"
          >
            Change
          </button>
        </div>

        <form data-lenis-prevent="true" className="flex flex-col gap-3.5 flex-1 overflow-y-auto max-h-[460px] pr-1 custom-scrollbar" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-white/90">Full Name *</label>
              <input
                type="text" required
                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-white/90">Work Email *</label>
              <input
                type="email" required
                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-white/90">Job Title</label>
              <input
                type="text"
                value={formData.jobTitle} onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                placeholder="Marketing Director"
                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-white/90">Country</label>
              <input
                type="text"
                value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })}
                placeholder="United Arab Emirates"
                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30"
              />
            </div>
          </div>

          {/* Service Selection Toggle Pills */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-white/90">Services Needed</label>
            <div className="flex flex-wrap gap-1.5">
              {availableServices.map(service => {
                const isSelected = formData.services.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`text-[11px] font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-[#181818] text-white/70 border-[#262626] hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline mr-1 -mt-0.5 text-black stroke-[3]" />}
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-white/90">Est. Monthly Budget (AED)</label>
              <select
                value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-white focus:outline-none transition-colors cursor-pointer"
              >
                <option value="" className="bg-[#111111] text-white/50">Select budget</option>
                <option value="< 3,500 AED" className="bg-[#111111]">Less than 3,500 AED</option>
                <option value="3,500 AED - 18,000 AED" className="bg-[#111111]">3,500 AED - 18,000 AED</option>
                <option value="18,000 AED - 35,000 AED" className="bg-[#111111]">18,000 AED - 35,000 AED</option>
                <option value="> 35,000 AED" className="bg-[#111111]">More than 35,000 AED</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-white/90">How did you hear about us?</label>
              <select
                value={formData.howDidYouHear} onChange={e => setFormData({ ...formData, howDidYouHear: e.target.value })}
                className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-white focus:outline-none transition-colors cursor-pointer"
              >
                <option value="" className="bg-[#111111] text-white/50">Select source</option>
                <option value="Google Search" className="bg-[#111111]">Google Search</option>
                <option value="Social Media" className="bg-[#111111]">Social Media</option>
                <option value="Referral" className="bg-[#111111]">Referral</option>
                <option value="Other" className="bg-[#111111]">Other</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-white/90">Project Details / Message</label>
            <textarea
              rows={2}
              value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us briefly about your goals..."
              className="w-full bg-[#181818] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-white focus:outline-none transition-colors placeholder:text-white/30 resize-none"
            ></textarea>
          </div>

          {/* reCAPTCHA - Scaled for 100% Mobile Visibility */}
          <div className="my-1.5 flex justify-center items-center w-full min-h-[78px] overflow-hidden">
            <div className="transform scale-[0.82] xs:scale-[0.9] sm:scale-100 origin-center flex justify-center items-center max-w-full">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                onChange={(token) => {
                  setCaptchaToken(token);
                  setErrorMsg('');
                }}
                onExpired={() => {
                  setCaptchaToken(null);
                  setErrorMsg('reCAPTCHA expired. Please check the box again.');
                }}
                onError={() => {
                  setCaptchaToken(null);
                  setErrorMsg('reCAPTCHA network error. Please try again.');
                }}
                theme="dark"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-white bg-[#181818] border border-white/20 text-[12px] text-center font-medium py-2 px-3 rounded-lg animate-in fade-in">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 w-full bg-white text-black hover:bg-[#e5e5e5] rounded-xl py-3.5 font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" /> Confirming...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </form>
      </div>
    </div>
  );

  if (formOnly) {
    return (
      <>
        {bookingCard}

        {/* SUCCESS POP-UP MODAL */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#111111] border border-[#333333] rounded-3xl p-6 sm:p-8 max-w-[420px] w-full text-center flex flex-col items-center relative animate-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={handleResetForm}
                className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors border-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-5 border border-white">
                <Check className="w-8 h-8 text-black stroke-[3]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
              <p className="text-white/70 text-xs sm:text-sm max-w-[320px] leading-relaxed mb-6 font-medium">
                The booking is confirmed. Our team will connect with you shortly.
              </p>
              <button
                type="button"
                onClick={handleResetForm}
                className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-[#e5e5e5] transition-colors text-sm cursor-pointer border-none"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  const innerContent = (
    <div className="max-w-[1150px] w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 lg:gap-16 items-center z-10 relative">
      {/* Left Side: Typography & Brand Identity */}
      <div className="flex flex-col relative h-full justify-center items-center lg:items-start text-center lg:text-left">

        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <Image src="/hala-logo/halalogo.png" alt="Hala Logo" width={80} height={26} style={{ width: 'auto', height: '26px' }} priority className="brightness-0 invert" />
        </div>

        <div className="max-w-[520px] z-10 relative px-2 sm:px-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-white" /> 15-Minute Free Strategy Call
          </div>

          <h2 className="font-jakarta font-bold text-3xl sm:text-5xl md:text-[58px] leading-[1.08] tracking-tight mb-2 text-white">
            See if Hala is<br />
            the right fit for you
          </h2>
          <h2 className="font-jakarta text-[34px] sm:text-[48px] md:text-[62px] leading-[1] text-white/90 mb-4 sm:mb-6">
            (it totally is)
          </h2>

          <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-[360px] leading-relaxed font-medium mx-auto lg:mx-0">
            Schedule a quick, 15-minute guided walkthrough with our team.
          </p>
        </div>

        {/* Smileys Cluster (Pure Flat Black & White - No Shadows) */}
        <div className="hidden sm:block relative mt-8 lg:mt-14 h-[150px] lg:h-[180px] w-full max-w-[360px] lg:max-w-[450px] scale-90 lg:scale-100 origin-center lg:origin-left select-none pointer-events-none">
          <div className="absolute bottom-0 left-0 w-24 lg:w-28 h-24 lg:h-28 rounded-full bg-white flex items-center justify-center z-10 border border-[#222]">
            <SmileyFace className="w-12 lg:w-16 h-12 lg:h-16 -rotate-[15deg]" />
          </div>
          <div className="absolute bottom-10 lg:bottom-12 left-12 lg:left-16 w-28 lg:w-32 h-28 lg:h-32 rounded-full bg-[#1A1A1A] flex items-center justify-center z-0 border border-[#333]">
            <SmileyFace className="w-12 lg:w-16 h-12 lg:h-16 rotate-[10deg]" eyeColor="#FFF" />
          </div>
          <div className="absolute -bottom-4 lg:-bottom-6 left-20 lg:left-24 w-20 lg:w-24 h-20 lg:h-24 rounded-full bg-[#000000] flex items-center justify-center z-20 border-4 border-[#222]">
            <SmileyFace className="w-10 lg:w-12 h-10 lg:h-12 rotate-[20deg]" eyeColor="#FFF" />
          </div>
          <div className="absolute bottom-16 lg:bottom-20 left-28 lg:left-36 w-16 lg:w-20 h-16 lg:h-20 rounded-full bg-white flex items-center justify-center z-30 border border-[#222]">
            <SmileyFace className="w-8 lg:w-10 h-8 lg:h-10" />
          </div>
          <div className="absolute bottom-0 left-36 lg:left-44 w-20 lg:w-24 h-20 lg:h-24 rounded-full bg-[#1A1A1A] flex items-center justify-center z-10 border border-[#333]">
            <SmileyFace className="w-10 lg:w-12 h-10 lg:h-12 -rotate-[10deg]" eyeColor="#FFF" />
          </div>
          <div className="absolute bottom-12 lg:bottom-16 left-44 lg:left-52 w-24 lg:w-28 h-24 lg:h-28 rounded-full bg-[#000000] flex items-center justify-center z-20 border-2 border-[#333]">
            <SmileyFace className="w-12 lg:w-14 h-12 lg:h-14 rotate-[15deg]" eyeColor="#FFF" />
          </div>
          <div className="absolute -bottom-2 left-52 lg:left-60 w-24 lg:w-28 h-24 lg:h-28 rounded-full bg-white flex items-center justify-center z-40 border border-[#222]">
            <SmileyFace className="w-12 lg:w-14 h-12 lg:h-14 -rotate-[20deg]" />
          </div>
          <div className="absolute bottom-0 left-[230px] lg:left-[280px] w-20 lg:w-24 h-20 lg:h-24 rounded-full bg-[#1A1A1A] flex items-center justify-center z-10 border border-[#333]">
            <SmileyFace className="w-10 lg:w-12 h-10 lg:h-12 rotate-[10deg]" eyeColor="#FFF" />
          </div>
        </div>
      </div>

      {/* Right Side: Interactive Booking Card */}
      {bookingCard}
    </div>
  );

  return (
    <>
      {/* Main Section */}
      {contained ? (
        <section className="bg-white w-full px-3 sm:px-8 md:px-12 lg:px-16 py-8 md:py-16 flex justify-center">
          <div className="w-full bg-[#000000] text-white rounded-[24px] sm:rounded-[36px] md:rounded-[44px] px-3.5 sm:px-6 md:px-10 py-8 md:py-14 relative overflow-hidden flex justify-center border border-[#222222]">
            {innerContent}
          </div>
        </section>
      ) : (
        <section className="bg-[#000000] text-white w-full py-10 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden flex items-center justify-center border-t border-[#111111]">
          {innerContent}
        </section>
      )}

      {/* SUCCESS POP-UP MODAL (FLAT MONOCHROME - NO SHADOWS) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111111] border border-[#333333] rounded-3xl p-6 sm:p-8 max-w-[420px] w-full text-center flex flex-col items-center relative animate-in zoom-in-95 duration-200">

            {/* Close Button */}
            <button
              type="button"
              onClick={handleResetForm}
              className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors border-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Checkmark Circle */}
            <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-5 border border-white">
              <Check className="w-8 h-8 text-black stroke-[3]" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
            <p className="text-white/70 text-xs sm:text-sm max-w-[320px] leading-relaxed mb-6 font-medium">
              The booking is confirmed. Our team will connect with you shortly.
            </p>

            <button
              type="button"
              onClick={handleResetForm}
              className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-[#e5e5e5] transition-colors text-sm cursor-pointer border-none"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
