export const createEnquiry = async (formData) => {
  const response = await fetch(
    "http://localhost:3001/api/deco-enquiry/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  return response.json();
};