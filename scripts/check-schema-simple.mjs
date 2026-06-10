// Quick schema check using fetch
const url = "https://ccduyifkxcnitzzuunfb.supabase.co/rest/v1/rpc/get_table_columns";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZHV5aWZreGNuaXR6enV1bmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MTMyNzEsImV4cCI6MjA5NTQ4OTI3MX0.kTLnRtjAspHX3zVzX8AEfZ7Fmralwk0EiNvcKgjArL4";

// Try to fetch one row from plans to see what columns are available
fetch(
  "https://ccduyifkxcnitzzuunfb.supabase.co/rest/v1/plans?limit=1",
  {
    headers: {
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
      "Content-Type": "application/json",
    },
  }
)
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data) && data.length > 0) {
      console.log("Columns in plans table:");
      const columns = Object.keys(data[0]);
      columns.sort();
      columns.forEach((col) => console.log(`  - ${col}`));

      console.log("\nBilling-cycle pricing columns status:");
      const required = [
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

      required.forEach((col) => {
        const exists = columns.includes(col);
        console.log(`  ${exists ? "✓" : "✗"} ${col}`);
      });
    } else {
      console.log("Response:", JSON.stringify(data, null, 2));
    }
  })
  .catch((err) => {
    console.error("Error:", err);
  });
