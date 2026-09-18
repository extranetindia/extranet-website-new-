"use client";

import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  deleteLead,
  formatLeadDate,
  formatLeadStatus,
  getLeads,
  LEAD_STATUSES,
  updateLeadStatus,
  type LeadRow,
  type LeadStatus,
} from "@/lib/database/leads";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setError(null);
    const { data, error: fetchError } = await getLeads();

    if (fetchError) {
      setError(fetchError.message);
      setLeads([]);
      return;
    }

    setLeads(data);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchLeads();
      setLoading(false);
    };
    void load();
  }, [fetchLeads]);

  const handleStatusChange = async (lead: LeadRow, status: LeadStatus) => {
    if (lead.status === status) return;

    setUpdatingId(lead.id);
    const { error: updateError } = await updateLeadStatus(lead.id, status);

    if (updateError) {
      setError(updateError.message);
      setUpdatingId(null);
      return;
    }

    setLeads((previous) =>
      previous.map((item) =>
        item.id === lead.id ? { ...item, status } : item,
      ),
    );
    setUpdatingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this lead? This cannot be undone.")) return;

    setDeletingId(id);
    const { error: deleteError } = await deleteLead(id);

    if (deleteError) {
      setError(deleteError.message);
      setDeletingId(null);
      return;
    }

    setLeads((previous) => previous.filter((item) => item.id !== id));
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <section className="tele-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[#15366A]">Leads</h2>
            <p className="text-sm hover:text-[#11418D]">
              Contact form submissions from the public website.
            </p>
          </div>
          {!loading && (
            <span className="rounded-full bg-[#F4F7FC] px-3 py-1 text-xs font-semibold text-[#5C6F89]">
              {leads.length} total
            </span>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#DCE3EC] hover:text-[#11418D]">
              <tr>
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Phone</th>
                <th className="px-3 py-2 font-medium">Inquiry Type</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Created At</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center hover:text-[#11418D]">
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center hover:text-[#11418D]">
                    No leads yet. Submissions from the contact page will appear here.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-[#EDF1F6]">
                    <td className="px-3 py-3 font-medium text-[#15366A]">
                      {lead.full_name}
                      {lead.email && (
                        <span className="mt-0.5 block text-xs font-normal hover:text-[#11418D]">
                          {lead.email}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-[#475569]">{lead.phone}</td>
                    <td className="max-w-[180px] px-3 py-3 text-[#475569]">
                      {lead.inquiry_type}
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(event) =>
                          void handleStatusChange(
                            lead,
                            event.target.value as LeadStatus,
                          )
                        }
                        className="min-h-[36px] rounded-lg border border-[#DCE3EC] bg-white px-2 py-1.5 text-xs font-medium text-[#475569] outline-none transition-all duration-200 ease-in-out hover:border-[#11418D]/35 focus:border-[#11418D] disabled:opacity-60"
                      >
                        {LEAD_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {formatLeadStatus(status)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-[#5C6F89]">
                      {formatLeadDate(lead.created_at)}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => void handleDelete(lead.id)}
                        disabled={deletingId === lead.id}
                        className="rounded-lg border border-red-200 p-1.5 text-red-600 transition-all duration-200 ease-in-out hover:border-[#C1170C]/40 hover:bg-red-50 hover:text-[#a9140b] disabled:opacity-60"
                        aria-label={`Delete lead ${lead.full_name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
