import React, { useState, useEffect } from "react";
import DropDown from "../Dashboard/DropDown.jsx";
import ListofResult from "./ListofResult";
import axios from "axios";

const branchOption = [
  "ALL",
  "CE",
  "CSE",
  "ECE",
  "ECM",
  "EE",
  "ME",
  "MM",
  "PIE",
];

const courseOption = ["CGPA", "SGPA"];

const semOption = [
  "ALL",
  "Sem1",
  "Sem2",
  "Sem3",
  "Sem4",
  "Sem5",
  "Sem6",
  "Sem7",
  "Sem8",
];

const yearOption = ["ALL", "2023", "2024", "2025"];

const semMap = new Map();

semMap.set("Sem1", 1);
semMap.set("Sem2", 2);
semMap.set("Sem3", 3);
semMap.set("Sem4", 4);
semMap.set("Sem5", 5);
semMap.set("Sem6", 6);
semMap.set("Sem7", 7);
semMap.set("Sem8", 8);
semMap.set("ALL", 0);

const courseMap = new Map();

courseMap.set("CGPA", "cgpa");
courseMap.set("SGPA", "sgpa");

function Rank() {
  const [branch, setBranch] = useState(branchOption[0]);
  const [course, setCourse] = useState(courseOption[0]);
  const [sem, setSem] = useState(semOption[0]);
  const [year, setYear] = useState(yearOption[0]);
  const [rankList, setRankList] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/dashboard",
        {
          branch,
          sem,
          year,
        },
        {
          withCredentials: false,
        },
      );
      const data = response?.data;

      setRankList(data);
      setLoading(false);

      // console.log(data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [branch, year]);

  useEffect(() => {
    const semesterWiseData = [...rankList].filter((items) => {
      if (sem === "ALL") return items;
      return items.marks.length >= semMap.get(sem);
    });

    const sorted = semesterWiseData.sort((a, b) => {
      let aindex = sem === "ALL" ? a.marks.length - 1 : semMap.get(sem) - 1;
      let bindex = sem === "ALL" ? b.marks.length - 1 : semMap.get(sem) - 1;

      const aCgpa = a.marks[aindex][courseMap.get(course)];
      const bCgpa = b.marks[bindex][courseMap.get(course)];

      return bCgpa - aCgpa;
    });

    const arr = sorted.map((items) => {
      const index =
        sem === "ALL" ? items.marks.length - 1 : semMap.get(sem) - 1;
      return {
        name: items.name,
        rollNo: items.studentID,
        cgpa: items.marks[index][courseMap.get(course)],
      };
    });

    // console.log(arr);

    setPaginationData(arr);
  }, [rankList, course, sem]);

  return (
    <div className={` min-h-screen w-full bg-slate-50 p-3 sm:p-5 lg:p-6 ${loading ? "cursor-wait" : "cursor-default"} `}>
      <section className="mb-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
        <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
          NIT Jamshedpur CGPA Analyzer
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
          Student Leaderboard
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Find NIT Jamshedpur students by branch, semester, course type, and
          year, ranked by their latest academic performance.
        </p>
      </section>

      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm shadow-slate-200/70">
        <div className="flex items-center justify-center">
          <DropDown
            options={courseOption}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <DropDown
            options={branchOption}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <DropDown
            options={semOption}
            onChange={(e) => setSem(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <DropDown
            options={yearOption}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-5">
        <ListofResult data={paginationData} />
      </div>
    </div>
  );
}

export default Rank;
