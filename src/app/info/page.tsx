"use client";

import DataCard from "@/components/response/DataCard";
import { Data } from "@/interface/data.interface";
import { useEffect, useState } from "react";

export default function DataInfoPage() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("data");

    if (storedData) {
      const jsonData = JSON.parse(storedData);
      setData(jsonData);
    } else {
      console.log("No data found in localStorage");
    }
  }, []);

  return (
    <div>
      <DataCard data={data}></DataCard>
    </div>
  );
}
