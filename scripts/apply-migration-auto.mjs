import fs from "fs";
import path from "path";

// Try to apply migration using Supabase RPC
const supabaseUrl = "https://ccduyifkxcnitzzuunfb.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZHV5aWZreGNuaXR6enV1bmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MTMyNzEsImV4cCI6MjA5NTQ4OTI3MX0.kTLnRtjAspHX3zVzX8AEfZ7Fmralwk0EiNvcKgjArL4";

const migrationPath = path.join(
  process.cwd(),
  "supabase/migrations/20260610_add_missing_pricing_columns.sql"
);

if (!fs.existsSync(migrationPath)) {
  console.error(`Migration file not found: ${migrationPath}`);
  process.exit(1);
}

const migrationSQL = fs.readFileSync(migrationPath, "utf-8");

// Split SQL into individual statements
const sqlStatements = migrationSQL
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith("--"));

console.log(`Found ${sqlStatements.length} SQL statements to execute\n`);

// Try to execute each statement
async function applySqlStatement(sql) {
  try {
    console.log(`Executing: ${sql.substring(0, 80)}...`);

    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/sql`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ query: sql }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`  ✗ Error:`, error);
      return false;
    }

    console.log(`  ✓ Success`);
    return true;
  } catch (err) {
    console.error(`  ✗ Exception:`, err.message);
    return false;
  }
}

// Alternative: Try using pgAdmin or direct exec
async function tryDirectExecution() {
  console.log("\nAttempting direct SQL execution...\n");

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/sql/exec`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: migrationSQL }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Direct execution failed:", error);
      return false;
    }

    console.log("✓ Migration applied successfully!");
    return true;
  } catch (err) {
    console.error("Direct execution error:", err.message);
    return false;
  }
}

async function main() {
  // Try RPC method first
  let success = true;
  for (const stmt of sqlStatements) {
    const result = await applySqlStatement(stmt);
    if (!result) success = false;
  }

  if (!success) {
    // Try direct execution
    console.log(
      "\nRPC method failed. Trying alternative direct execution...\n"
    );
    success = await tryDirectExecution();
  }

  if (!success) {
    console.error(
      "\n✗ Could not apply migration programmatically.\n" +
        "Please apply manually:\n" +
        "  1. Go to: https://app.supabase.com/project/ccduyifkxcnitzzuunfb/sql/editor\n" +
        "  2. Run the SQL in: supabase/migrations/20260610_add_missing_pricing_columns.sql\n"
    );
    process.exit(1);
  }
}

main().catch(console.error);
