import React, { useEffect } from "react";
import LatestSubjects from "./LatestSubjects.jsx";
import SemesterTrend from "./SemesterTrend.jsx";
import StudentHero from "./StudentHero.jsx";
import SummaryCards from "./SummaryCards.jsx";
import Graph from "./graph.jsx";
import { useState } from "react";
import api from "../../utilities/ApiCall.js"
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Home({ check }) {
  const [loading, setLoading] = useState(false);
  const [homeData, setHomeData] = useState({});
  const [basicInfo, setBasicInfo] = useState({});
  const [marks, setMarks] = useState([]);
  const [summaryCard, setSummaryCard] = useState({})



  if (!check) {
  return <Navigate to="/login" replace />;
}

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        "/api/home",
        {},
        {
          withCredentials: true,
        },
      );
      const data = response.data;

      setHomeData(data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if( check ) fetchData();
  }, [check]);

  useEffect(() => {

    const basicInfo = {
      name: homeData?.name || "--",
      reg: homeData?.studentID || "--",
      branch: homeData?.branch || "--",
      batch: homeData?.batch || "--",
      course: homeData?.course || "--",
      sem: homeData?.marks?.[homeData?.marks?.length - 1]?.semester || 1,
      cgpa: homeData?.marks?.[homeData?.marks?.length - 1]?.cgpa || 0.0,
      sgpa: homeData?.marks?.[homeData?.marks?.length - 1]?.sgpa || 0.0,
    };

    if (Object.keys(homeData).length !== 0) {
      const marks = homeData?.marks;
      setMarks(marks);
    }
    setBasicInfo(basicInfo);
  }, [homeData]);

  useEffect(() => {
    let cgpa = 0;
    let sgpa = 0;
    let cgpaSem = -1;
    let sgpaSem = -1;
    let result = "PASS";
    let failSem = -1;
    let sub = 0;

    let n = homeData?.marks?.length;

    for( let i = 0 ; i < n ; i++ ){
      sub += homeData?.marks[i].subjects.length;
      if(homeData?.marks[i].cgpa > cgpa ){
        cgpa = homeData?.marks[i].cgpa;
        cgpaSem = homeData?.marks[i].semester;
      }

      if(homeData?.marks[i].sgpa > sgpa ){
        sgpa = homeData?.marks[i].sgpa;
        sgpaSem = homeData?.marks[i].semester;
      }
      if ( homeData?.marks[i].cgpa === 0 ){
        result = "FAIL";
        failSem = homeData?.marks[i].semester;
      }
    }

    const summary = {
      cgpa:cgpa,
      sgpa: sgpa,                                                 
      cgpaSem: cgpaSem,
      sgpaSem: sgpaSem,
      result:result,
      failSem: failSem,
      sub:sub
    }

    setSummaryCard(summary);

  }, [homeData]);

  return (
    <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <StudentHero student={basicInfo} />

        <SummaryCards data ={summaryCard} />

        <Graph marks={marks} />

        <LatestSubjects marks={marks} />
      </div>
    </div>
  );
}

export default Home;
