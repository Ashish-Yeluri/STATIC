export const createEnquiry = async (formData) => {
  try {
    const response = await fetch("/api/deco-enquiry/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    throw error;
  }
};