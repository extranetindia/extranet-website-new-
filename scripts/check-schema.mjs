import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkSchema() {
  try {
    console.log("Checking plans table schema...\n");

    // Get table info using information_schema
    const { data, error } = await supabase.rpc("get_table_columns", {
      table_name: "plans",
      schema_name: "public",
    });

    if (error) {
      console.log("RPC not available, trying direct query...\n");

      // Try getting column info directly
      const { data: columns, error: colError } = await supabase
        .from("plans")
        .select("*")
        .limit(1);

      if (colError) {
        console.error("Error querying plans:", colError);
        process.exit(1);
      }

      if (columns && columns.length > 0) {
        const actualColumns = Object.keys(columns[0]);
        console.log("Actual columns in plans table:");
        actualColumns.forEach((col) => console.log(`  - ${col}`));
      }
    } else {
      console.log("Columns in plans table:");
      if (Array.isArray(data)) {
        data.forEach((row) => console.log(`  - ${row.column_name}`));
      }
    }

    // Check for specific columns we need
    console.log("\nChecking for billing-cycle pricing columns:");
    const requiredColumns = [
      "monthly_price",
      "quarterly_price",
      "half_yearly_price",
      "annual_price",
      "monthly_setup_fee",
      "quarterly_setup_fee",
      "half_yearly_setup_fee",
      "annual_setup_fee",
      "monthly_security_deposit",
      "quarterly_security_deposit",
      "half_yearly_security_deposit",
      "annual_security_deposit",
    ];

    const { data: testRow } = await supabase
      .from("plans")
      .select("*")
      .limit(1);

    if (testRow && testRow.length > 0) {
      const actualCols = Object.keys(testRow[0]);
      requiredColumns.forEach((col) => {
        const exists = actualCols.includes(col);
        console.log(`  ${exists ? "✓" : "✗"} ${col}`);
      });
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

checkSchema();
