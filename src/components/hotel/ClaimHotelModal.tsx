import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ClaimHotelModal: React.FC = () => {
  const { claimModalOpen, targetHotelForClaim, closeClaimModal, submitClaim } = useApp();

  const [claimantName, setClaimantName] = useState('');
  const [claimantEmail, setClaimantEmail] = useState('');
  const [claimantRole, setClaimantRole] = useState('General Manager');
  const [claimantPhone, setClaimantPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!claimModalOpen || !targetHotelForClaim) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimantName || !claimantEmail) return;

    submitClaim({
      hotelId: targetHotelForClaim.id,
      hotelName: targetHotelForClaim.name,
      claimantName,
      claimantEmail,
      claimantRole,
      claimantPhone,
      notes,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeClaimModal();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-xl border border-neutral-300 max-w-lg w-full p-6 md:p-8 shadow-modal relative">
        <button
          onClick={closeClaimModal}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-neutral-900">
              Claim Request Submitted
            </h3>
            <p className="text-xs text-neutral-600 max-w-xs mx-auto">
              Our hospitality verification team will contact you via official hotel email within 24 hours to confirm property administration access.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <Building2 className="w-4 h-4 text-neutral-900" />
              <span>Official Property Administration</span>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-neutral-950">
                Claim {targetHotelForClaim.name}
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Verify ownership to post official responses, manage property facts, and engage with verified community reviews.
              </p>
            </div>

            <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-xs text-neutral-700 space-y-1">
              <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-900" />
                <span>Our Review Integrity Policy</span>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Hotel owners can clarify factual errors and respond transparently, but cannot delete genuine negative customer reviews.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  placeholder="e.g. Karanbir Singh Kang"
                  className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={claimantEmail}
                    onChange={(e) => setClaimantEmail(e.target.value)}
                    placeholder="gm@thehotel.com"
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Role / Title *
                  </label>
                  <select
                    value={claimantRole}
                    onChange={(e) => setClaimantRole(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:border-neutral-900 bg-white"
                  >
                    <option value="General Manager">General Manager</option>
                    <option value="Hotel Owner / Partner">Hotel Owner / Partner</option>
                    <option value="Front Office Manager">Front Office Manager</option>
                    <option value="Marketing & PR Director">Marketing & PR Director</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  value={claimantPhone}
                  onChange={(e) => setClaimantPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Verification Notes / Official Website Link
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Provide property registration reference or hotel corporate site details..."
                  className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeClaimModal}
                className="px-4 py-2 border border-neutral-300 rounded text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-neutral-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Submit Claim for Verification
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
