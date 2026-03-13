const axios = require("axios");

const analyzeGrievance = async (description) => {
    const lower = (description || "").toLowerCase();


    let category = "Other";

    if (
        lower.includes("road") ||
        lower.includes("pothole") ||
        lower.includes("street")
    ) {
        category = "Road";
    } else if (
        lower.includes("water") ||
        lower.includes("tap") ||
        lower.includes("sewer")
    ) {
        category = "Water";
    } else if (
        lower.includes("electric") ||
        lower.includes("light") ||
        lower.includes("power")
    ) {
        category = "Electricity";
    }

    
    let sentiment = "Neutral";

    try {
        const response = await axios.post(
            "http://127.0.0.1:5000/analyze",
            { text: description }
        );

        const label = response.data.label || "";
        console.log("BERT returned label:", label);

       
        if (label.includes("1") || label.includes("2")) {
            sentiment = "Negative";
        } else if (label.includes("4") || label.includes("5")) {
            sentiment = "Positive";
        } else {
            sentiment = "Neutral";
        }

    } catch (err) {
        console.error("Error calling BERT API:", err.message);
    }

    
    let priority = "Low";

    if (
        lower.includes("urgent") ||
        lower.includes("critical") ||
        lower.includes("emergency")
    ) {
        priority = "High";
    } else if (
        lower.includes("issue") ||
        lower.includes("problem") ||
        lower.includes("repair")
    ) {
        priority = "Medium";
    }

    return { category, sentiment, priority };
};

module.exports = { analyzeGrievance };
