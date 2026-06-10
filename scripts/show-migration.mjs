import fs from "fs";
import path from "path";

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

// Execute the full SQL
async function applyMigration() {
  try {
    console.log("Attempting to apply migration via Supabase...\n");

    // Extract statements (split on ;)
    const statements = migrationSQL
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s && !s.startsWith("--"));

    console.log(`Found ${statements.length} statements to execute:\n`);

    statements.forEach((stmt, i) => {
      const preview = stmt.substring(0, 60).replace(/\n/g, " ");
      console.log(`  ${i + 1}. ${preview}...`);
    });

    console.log(
      "\n⚠️  Note: The Supabase REST API requires authentication to execute DDL.\n"
    );
    console.log(
      "Since we don't have SUPABASE_SERVICE_ROLE_KEY in this environment,\n" +
        "the migration must be applied manually.\n"
    );

    console.log("===== MANUAL APPLICATION STEPS =====\n");
    console.log(
      "1. Go to: https://app.supabase.com/project/ccduyifkxcnitzzuunfb/sql/editor\n"
    );
    console.log("2. Click 'New Query'\n");
    console.log("3. Paste the following SQL:\n");
    console.log("---");
    console.log(migrationSQL);
    console.log("---\n");
    console.log("4. Click 'Run'\n");
    console.log(
      "5. Verify: node scripts/check-schema-simple.mjs should show ✓ for all columns\n"
    );
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

applyMigration();
