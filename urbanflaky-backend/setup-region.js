// setup-region.js
export default async (container) => {
  // Resolve services from the container
  const currencyService = container.resolve("currencyService");
  const regionService = container.resolve("regionService");

  // 1️⃣ Add INR currency
  const inrExists = await currencyService.retrieveByCode("INR").catch(() => null);
  if (!inrExists) {
    await currencyService.create({
      code: "INR",
      symbol: "₹",
      name: "Indian Rupee",
    });
    console.log("✅ INR currency added");
  } else {
    console.log("ℹ INR currency already exists");
  }

  // 2️⃣ Add India region
  const regions = await regionService.list({ limit: 100 });
  const indiaRegion = regions.find((r) => r.id === "in-region");
  if (!indiaRegion) {
    await regionService.create({
      id: "in-region",
      name: "India",
      currency_code: "INR",
      tax_rate: 0,
      countries: ["IN"], // ISO-2 country code
      payment_providers: [],
      fulfillment_providers: [],
    });
    console.log("✅ India region created with INR");
  } else {
    console.log("ℹ India region already exists");
  }

  console.log("🎉 Region setup complete!");
};