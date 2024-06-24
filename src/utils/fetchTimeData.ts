const fetchTimeData = async () => {
  const response = await fetch("../../data.json");
  if (!response.ok) {
    throw new Error("Fetched failed.");
  }
  return response.json();
};

export default fetchTimeData;
