import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ReportModal: React.FC = () => {
  const { reportModalOpen, targetReportItem, closeReportModal, submitReport, currentUser } = useApp();

  const [reason, setReason] = useState<
    'fake_review' | 'spam' | 'offensive' | 'misleading' | 'wrong_hotel' | 'inappropriate_social' | 'other'
  >('fake_review');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!reportModalOpen || !targetReportItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      type: targetReportItem.type,
      targetId: targetReportItem.id,
      targetTitle: targetReportItem.title,
      hotelName: targetReportItem.hotelName,
      reportedBy: currentUser.username,
      reason,
      details,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeReportModal();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-xl border border-neutral-300 max-w-md w-full p-6 shadow-modal relative">
        <button
          onClick={closeReportModal}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
          aria-label="Close report modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-neutral-900">
              Report Received
            </h3>
            <p className="text-xs text-neutral-600">
              Our moderation team will review the flagged content in accordance with our community guidelines.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700">
              <ShieldAlert className="w-4 h-4" />
              <span>Community Moderation</span>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-950">
                Report Content
              </h3>
              <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                Target: “{targetReportItem.title}”
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Reason for Reporting *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as any)}
                  className="w-full p-2.5 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950 bg-white"
                >
                  <option value="fake_review">Fake / Commercial / Fabricated Review</option>
                  <option value="spam">Spam / Promotional Links</option>
                  <option value="offensive">Harassment / Offensive Language</option>
                  <option value="misleading">Misleading or Factually Inaccurate</option>
                  <option value="wrong_hotel">Review belongs to a different property</option>
                  <option value="inappropriate_social">Inappropriate or Broken Social Media Link</option>
                  <option value="other">Other Violation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide context for our review moderators..."
                  className="w-full p-2.5 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeReportModal}
                className="px-4 py-2 border border-neutral-300 rounded text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-rose-700 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-rose-800 transition-colors"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
