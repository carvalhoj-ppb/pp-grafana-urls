const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const result = document.getElementById("result");

document.getElementById("open").addEventListener("click", () => {
  const fromValue = fromInput.value;
  const toValue = toInput.value;

  if (!fromValue || !toValue) {
    alert("Please fill both dates");
    return;
  }

  // Convert to ISO
  const fromISO = new Date(fromValue).toISOString();
  const toISO = new Date(toValue).toISOString();

  // Get selected URLs
  const selectedUrls = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);

  if (selectedUrls.length === 0) {
    alert("Select at least one URL");
    return;
  }

  const finalUrls = selectedUrls.map((baseUrl) => {
    const url = new URL(baseUrl);

    // Set / override params safely
    url.searchParams.set("from", fromISO);
    url.searchParams.set("to", toISO);
    url.searchParams.set("timezone", "browser");

    return url.toString();
  });

  // Show results
  result.value = finalUrls.join("\n");

  // Open each URL in a new tab
  finalUrls.forEach((url) => {
    chrome.tabs.create({ url });
  });
});
