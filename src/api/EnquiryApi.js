export const createEnquiry = async (formData) => {
  const response = await fetch("/api/send-enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to send enquiry");
  }

  return await response.json();
};
