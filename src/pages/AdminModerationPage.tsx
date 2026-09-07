import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldAlert, 
  Building2, 
  CheckCircle2, 
  EyeOff 
} from 'lucide-react';

export const AdminModerationPage: React.FC = () => {
  const { 
    reports, 
    resolveReport, 
    claims, 
    approveClaim 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'reports' | 'claims' | 'integrity'>('reports');

  // Pending reports
  const pendingReports = reports.filter((r) => r.status === 'pending');
  const pendingClaims = claims.filter((c) => c.status === 'pending');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-700">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Integrity & Governance Portal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 mt-1">
            Community Moderation Console
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Review reported content, process property claim applications, and uphold platform transparency
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold bg-neutral-950 text-white px-3 py-1.5 rounded-lg self-start sm:self-auto">
          <span>Integrity Rule: Negative reviews cannot be deleted by hotel request</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'reports'
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Flagged Reports ({pendingReports.length})
        </button>

        <button
          onClick={() => setActiveTab('claims')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'claims'
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Hotel Claim Requests ({pendingClaims.length})
        </button>

        <button
          onClick={() => setActiveTab('integrity')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'integrity'
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Platform Integrity Principles
        </button>
      </div>

      {/* Tab Content: Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {pendingReports.length === 0 ? (
            <div className="p-12 text-center bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-neutral-800">
                Moderation Queue Clear
              </h3>
              <p className="text-xs text-neutral-500">
                No active community flags pending review. All reviews and social links comply with guidelines.
              </p>
            </div>
          ) : (
            pendingReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl border border-neutral-300 p-6 shadow-subtle space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800">
                      Reason: {report.reason.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      Reported by @{report.reportedBy}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    {new Date(report.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-neutral-900">
                    Flagged Item: “{report.targetTitle}”
                  </h4>
                  {report.hotelName && (
                    <span className="text-xs text-neutral-500 block mt-0.5">
                      Property: {report.hotelName}
                    </span>
                  )}
                  {report.details && (
                    <p className="text-xs text-neutral-700 bg-neutral-50 p-3 rounded mt-2 border border-neutral-200">
                      User Note: “{report.details}”
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => resolveReport(report.id, 'dismiss')}
                    className="px-4 py-2 border border-neutral-300 rounded text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-100"
                  >
                    Dismiss (False Alarm)
                  </button>
                  <button
                    onClick={() => resolveReport(report.id, 'hide_review')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-700 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-rose-800"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide Content</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Claims */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          {pendingClaims.length === 0 ? (
            <div className="p-12 text-center bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-neutral-800">
                No Pending Claim Requests
              </h3>
              <p className="text-xs text-neutral-500">
                All property ownership requests have been processed.
              </p>
            </div>
          ) : (
            pendingClaims.map((claim) => (
              <div
                key={claim.id}
                className="bg-white rounded-xl border border-neutral-300 p-6 shadow-subtle space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-neutral-900" />
                    <span className="font-bold text-sm text-neutral-900">
                      {claim.hotelName}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    {new Date(claim.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <div>
                    <span className="text-neutral-500 block">Claimant:</span>
                    <span className="font-bold text-neutral-900">{claim.claimantName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Official Email:</span>
                    <span className="font-mono text-neutral-900">{claim.claimantEmail}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Role:</span>
                    <span className="font-semibold text-neutral-900">{claim.claimantRole}</span>
                  </div>
                </div>

                {claim.notes && (
                  <p className="text-xs text-neutral-600 italic">
                    Notes: “{claim.notes}”
                  </p>
                )}

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => approveClaim(claim.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-neutral-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Approve Hotel Ownership</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Platform Integrity Principles */}
      {activeTab === 'integrity' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 space-y-6 shadow-subtle">
          <h3 className="font-serif text-2xl font-bold text-neutral-950">
            Core Review Integrity Architecture
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <h4 className="font-bold text-neutral-950 text-sm">1. Zero Paid Ratings</h4>
              <p>
                Hotels cannot pay to alter their star rating or boost placement algorithms. Rankings are mathematically derived from verified sub-scores.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <h4 className="font-bold text-neutral-950 text-sm">2. Hotel Response Accountability</h4>
              <p>
                Hoteliers may publicly reply to reviews to clarify factual details, but genuine critical reviews remain permanently visible.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <h4 className="font-bold text-neutral-950 text-sm">3. Dual Publicity Transparency</h4>
              <p>
                Social media embeds attribute original creators with public handles (@username) and external links to original content platforms without altering copyright.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <h4 className="font-bold text-neutral-950 text-sm">4. Community Reality Checks</h4>
              <p>
                Positives, notable nuances, and critical drawbacks are synthesized directly from guest feedback to prevent deceptive marketing.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
