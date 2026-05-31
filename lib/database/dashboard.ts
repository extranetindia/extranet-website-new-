import { supabase } from "@/lib/supabase/client";
import {
  formatLeadDate,
  formatLeadStatus,
  LEAD_STATUSES,
  type LeadRow,
  type LeadStatus,
} from "@/lib/database/leads";

export interface DashboardCounts {
  totalLeads: number;
  newLeads: number;
  totalPlans: number;
  totalCities: number;
}

export interface LeadStatusCount {
  status: LeadStatus;
  label: string;
  count: number;
}

export interface DashboardData {
  counts: DashboardCounts;
  recentLeads: LeadRow[];
  statusSummary: LeadStatusCount[];
}

async function countTable(
  table: "leads" | "plans" | "cities",
  filter?: { column: string; value: string },
): Promise<number> {
  let query = supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  if (filter) {
    query = query.eq(filter.column, filter.value);
  }

  const { count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

export async function fetchDashboardCounts(): Promise<{
  data: DashboardCounts | null;
  error: Error | null;
}> {
  try {
    const [totalLeads, newLeads, totalPlans, totalCities] = await Promise.all([
      countTable("leads"),
      countTable("leads", { column: "status", value: "new" }),
      countTable("plans"),
      countTable("cities"),
    ]);

    return {
      data: { totalLeads, newLeads, totalPlans, totalCities },
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error("Failed to load counts"),
    };
  }
}

export async function fetchRecentLeads(limit = 5): Promise<{
  data: LeadRow[];
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, full_name, phone, email, inquiry_type, message, status, created_at, updated_at",
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  return {
    data: (data ?? []) as LeadRow[],
    error: error ? new Error(error.message) : null,
  };
}

export async function fetchLeadStatusSummary(): Promise<{
  data: LeadStatusCount[];
  error: Error | null;
}> {
  const { data, error } = await supabase.from("leads").select("status");

  if (error) {
    return { data: [], error: new Error(error.message) };
  }

  const rows = (data ?? []) as { status: LeadStatus }[];
  const tally = new Map<LeadStatus, number>();

  for (const status of LEAD_STATUSES) {
    tally.set(status, 0);
  }

  for (const row of rows) {
    if (LEAD_STATUSES.includes(row.status)) {
      tally.set(row.status, (tally.get(row.status) ?? 0) + 1);
    }
  }

  const summary = LEAD_STATUSES.map((status) => ({
    status,
    label: formatLeadStatus(status),
    count: tally.get(status) ?? 0,
  }));

  return { data: summary, error: null };
}

export async function fetchDashboardData(): Promise<{
  data: DashboardData | null;
  error: Error | null;
}> {
  const [countsResult, recentResult, statusResult] = await Promise.all([
    fetchDashboardCounts(),
    fetchRecentLeads(5),
    fetchLeadStatusSummary(),
  ]);

  const error =
    countsResult.error?.message ??
    recentResult.error?.message ??
    statusResult.error?.message ??
    null;

  if (!countsResult.data) {
    return {
      data: null,
      error: error ? new Error(error) : new Error("Failed to load dashboard"),
    };
  }

  return {
    data: {
      counts: countsResult.data,
      recentLeads: recentResult.data,
      statusSummary: statusResult.data,
    },
    error: error ? new Error(error) : null,
  };
}

export { formatLeadDate, formatLeadStatus };
