export const getWasteData = () => {
  const data = localStorage.getItem("wasteData");
  return data ? JSON.parse(data) : {};
};

export const updateHouseScore = (houseId, prediction) => {
  const data = getWasteData();

  if (!data[houseId]) {
    data[houseId] = {
      bio: 0,
      nonBio: 0,
      totalScore: 0
    };
  }

  const className = prediction.className.toLowerCase();
  const confidenceScore = Math.round(prediction.probability * 100);

  if (className.includes("non")) {
    data[houseId].nonBio += 1;
    data[houseId].totalScore += confidenceScore;
  } else if (className.includes("bio")) {
    data[houseId].bio += 1;
    data[houseId].totalScore += confidenceScore;
  }

  localStorage.setItem("wasteData", JSON.stringify(data));
};