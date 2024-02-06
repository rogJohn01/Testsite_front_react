import axios from "axios";

export const fetchTheTestWrong = async (testIndex, setDrillContents, drillContents) => {
    const recent_index = testIndex - 1;
    const url = `${process.env.REACT_APP_API_URL}:3006/drill/test_wrongs/${recent_index}`;
    console.log(url);
    const response = await axios.get(url);
    const { data } = response;
    console.log("drillcontents: ", drillContents);
    setDrillContents(data);
};

export const fetchTheDrillWrong = async (drillIndex, setDrillContents, drillContents) => {
    const recent_index = drillIndex ;
    const url = `${process.env.REACT_APP_API_URL}:3006/drill/drill_wrongs/${recent_index}`;
    console.log(url);
    const response = await axios.get(url);
    const { data } = response;
    console.log("drillcontents: ", drillContents);
    setDrillContents(data);
};
