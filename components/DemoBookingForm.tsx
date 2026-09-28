"use client";

import React, { useState, useEffect } from "react";
import { Check, Calendar, Clock, AlertCircle, Sparkles, Building, Mail, User, Phone, CheckCircle2 } from "lucide-react";

type DayOption = {
  iso: string;
  label: string;
  dayName: string;
  dateStr: string;
};

type SlotOption = {
  time: string;
  label: string;
};

type ConfirmedBooking = {
  id: string;
  date: string;
  time: string;
  slotLabel: string;
  dayLabel: string;
  dateFormatted: string;
  name: string;
  email: string;
  company: string;
};

export function DemoBookingForm() {
  const [days, setDays] = useState<DayOption[]>([]);
  const [slots, setSlots] = useState<SlotOption[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [practiceType, setPracticeType] = useState("CA & Accounting Practice");
  const [notes, setNotes] = useState("");

  const fetchSchedule = async () => {
    try {
      setLoadingSchedule(true);
      const res = await fetch("/api/demo");
      if (res.ok) {
        const data = await res.json();
        setDays(data.days || []);
        setSlots(data.slots || []);
        setBookedSlots(data.bookedSlots || []);

        // Default to first day if none selected
        if (!selectedDate && data.days?.length > 0) {
          setSelectedDate(data.days[0].iso);
        }
      }
    } catch (err) {
      console.error("Failed to load demo schedule:", err);
    } finally {
      setLoadingSchedule(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedDate) {
      setErrorMsg("Please select a date from the 3-day window.");
      return;
    }
    if (!selectedTime) {
      setErrorMsg("Please select an available walkthrough time slot.");
      return;
    }
    if (!name.trim()) {
      setErrorMsg("Please provide your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please provide a valid work email address.");
      return;
    }
    if (!company.trim()) {
      setErrorMsg("Please provide your firm or company name.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          phone: phone.trim() || undefined,
          practiceType,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          // Race condition caught! Slot was taken by another user
          setErrorMsg(data.error || "This time slot was just booked by someone else. Please choose another slot.");
          // Refresh schedule to reflect newly taken slots
          await fetchSchedule();
          setSelectedTime("");
        } else {
          setErrorMsg(data.error || "Failed to schedule walkthrough. Please try again.");
        }
        return;
      }

      // Success
      setConfirmedBooking(data.booking);
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = (b: ConfirmedBooking) => {
    const title = encodeURIComponent("Pyngyn 1:1 Strategy Walkthrough (30 min)");
    const details = encodeURIComponent(
      `Pyngyn Strategy Walkthrough with ${b.name} (${b.company}).\n\nGoogle Meet link will be provided in your calendar confirmation.\n\nWebsite: https://pyngyn.ai`
    );
    // Create UTC date string for Google Calendar URL
    const dateFormatted = b.date.replace(/-/g, "");
    const startTimeFormatted = b.time.replace(":", "") + "00";
    // 30 min duration
    const [h, m] = b.time.split(":").map(Number);
    const endMinutes = (h * 60 + m + 30) % 1440;
    const endH = String(Math.floor(endMinutes / 60)).padStart(2, "0");
    const endM = String(endMinutes % 60).padStart(2, "0");
    const endTimeFormatted = `${endH}${endM}00`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dateFormatted}T${startTimeFormatted}/${dateFormatted}T${endTimeFormatted}`;
  };

  if (confirmedBooking) {
    return (
      <div className="w-full rounded-2xl border border-line bg-white p-7 sm:p-9 shadow-card">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="mt-5 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            Walkthrough Confirmed
          </span>
          <h3 className="mt-3 font-display text-[24px] font-bold text-ink">
            You&apos;re scheduled with our team!
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
            A confirmation and Google Meet invitation have been reserved for{" "}
            <strong className="text-ink">{confirmedBooking.email}</strong>.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-canvas p-5 space-y-3 text-[14px]">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <span className="text-muted">Date:</span>
            <span className="font-semibold text-ink">
              {confirmedBooking.dayLabel} ({confirmedBooking.dateFormatted}, {confirmedBooking.date})
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <span className="text-muted">Time:</span>
            <span className="font-semibold text-ink">{confirmedBooking.slotLabel}</span>
          </div>
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <span className="text-muted">Attendee:</span>
            <span className="font-semibold text-ink">
              {confirmedBooking.name} &bull; {confirmedBooking.company}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted">Format:</span>
            <span className="font-semibold text-accent">1:1 Video Walkthrough (Google Meet)</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={getGoogleCalendarUrl(confirmedBooking)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent flex-1 justify-center text-center text-sm"
          >
            Add to Google Calendar &rarr;
          </a>
          <button
            type="button"
            onClick={() => {
              setConfirmedBooking(null);
              setSelectedTime("");
              fetchSchedule();
            }}
            className="btn btn-ghost justify-center text-sm"
          >
            Schedule Another
          </button>
        </div>

        <p className="mt-5 text-center text-[12px] text-muted">
          Need to reschedule? Email{" "}
          <a href="mailto:sales@pyngyn.com" className="font-semibold text-accent hover:underline">
            sales@pyngyn.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-card">
      <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
        <div>
          <h2 className="text-[18px] font-bold text-ink">Select a 30-Minute Time Slot</h2>
          <p className="text-[13px] text-muted">Next 3 days only &bull; Real-time slot reservation</p>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1 text-[11px] font-semibold text-muted">
          <Clock className="w-3.5 h-3.5 text-accent" />
          <span>30 min &bull; Google Meet</span>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">{errorMsg}</div>
        </div>
      )}

      {loadingSchedule ? (
        <div className="py-16 text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-accent border-r-transparent" />
          <p className="mt-3 text-xs text-muted">Checking real-time calendar availability...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: 3-Day Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2.5">
              1. Choose Date (Strict 3-Day Window)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {days.map((d) => {
                const isSelected = selectedDate === d.iso;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    onClick={() => {
                      setSelectedDate(d.iso);
                      setSelectedTime("");
                      setErrorMsg(null);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center ${
                      isSelected
                        ? "border-accent bg-accent-lt/30 ring-2 ring-accent"
                        : "border-line bg-white hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wide ${
                        isSelected ? "text-accent-dk" : "text-muted"
                      }`}
                    >
                      {d.label}
                    </span>
                    <span className="mt-1 font-display text-[15px] font-bold text-ink">
                      {d.dateStr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Time Slot Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted">
                2. Select Available Time Slot
              </label>
              <span className="text-[11px] text-muted">Timezone: Asia/Kolkata (IST)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {slots.map((s) => {
                const slotKey = `${selectedDate}_${s.time}`;
                const isBooked = bookedSlots.includes(slotKey);
                const isSelected = selectedTime === s.time;

                return (
                  <button
                    key={s.time}
                    type="button"
                    disabled={isBooked}
                    onClick={() => {
                      setSelectedTime(s.time);
                      setErrorMsg(null);
                    }}
                    className={`relative flex items-center justify-center py-2.5 px-3 rounded-xl border text-[13px] font-semibold transition-all ${
                      isBooked
                        ? "border-line bg-slate-100 text-slate-400 cursor-not-allowed line-through"
                        : isSelected
                        ? "border-accent bg-accent text-white shadow-sm ring-1 ring-accent"
                        : "border-line bg-white text-ink hover:border-accent hover:text-accent"
                    }`}
                  >
                    {isBooked ? (
                      <span className="flex items-center gap-1.5 text-xs text-muted/70">
                        {s.time} (Taken)
                      </span>
                    ) : (
                      <span>{s.time} IST</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Attendee Details */}
          <div className="border-t border-line pt-5 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted">
              3. Your Practice Information
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. CA Rajesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-[13.5px] rounded-lg border border-line bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Work Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="rajesh@sharmaca.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-[13.5px] rounded-lg border border-line bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Firm / Company Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Sharma & Associates"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-[13.5px] rounded-lg border border-line bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone / WhatsApp (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-[13.5px] rounded-lg border border-line bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Firm Specialization / Practice Type
              </label>
              <select
                value={practiceType}
                onChange={(e) => setPracticeType(e.target.value)}
                className="w-full px-3 py-2 text-[13.5px] rounded-lg border border-line bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              >
                <option value="CA & Accounting Practice">Chartered Accountant / Accounting Practice</option>
                <option value="Corporate Tax & Audit Practice">Corporate Tax &amp; Statutory Audit</option>
                <option value="Legal & Advisory Practice">Legal &amp; Regulatory Advisory</option>
                <option value="Management & Strategy Consulting">Management / Strategy Consulting</option>
                <option value="Other Professional Services">Other Professional Services</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Specific Workflows You Want Covered (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. PBC checklist automation, client portal branding, statutory tax deadlines..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-[13px] rounded-lg border border-line bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !selectedTime}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
              submitting || !selectedTime
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-accent hover:bg-accent-dk text-white shadow-card hover:shadow-md cursor-pointer"
            }`}
          >
            {submitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                <span>Securing your slot...</span>
              </>
            ) : (
              <>
                <span>Confirm 30-Min Strategy Walkthrough &rarr;</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 text-[11.5px] text-muted pt-1">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> 100% Free
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> No slideshow
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Instant calendar invite
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
