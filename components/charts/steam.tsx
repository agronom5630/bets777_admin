"use client";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { fetchAllPlayers } from "@/app/services/playerService";
import { Player } from "@/app/types/playerTypes";
import { Spinner } from "@nextui-org/react";

const options = {
  chart: {
    id: "player-registration-chart",
    type: "area",
    animations: {
      easing: "linear",
      speed: 300,
    },
    toolbar: {
      show: true,
      tools: {
        selection: true,
        zoom: true,  
        zoomin: true,
        zoomout: true,
        reset: true, 
        pan: true,   
      },
      autoSelected: 'zoom'
    },
    zoom: {
      enabled: true,
      type: 'x', 
      autoScaleYaxis: true, 
    },
    selection: {
      enabled: true,
      type: 'x',
    },
    offsetX: -10,
  },
  xaxis: {
    type: 'numeric',
    categories: [] as string[],
    labels: {
      colors: "hsl(var(--nextui-default-800))",
      fontSize: "10px",
      rotate: -45,
      maxWidth: 100,
    },
  },
  yaxis: {
    labels: {
       style: { colors: "hsl(var(--nextui-default-800))" } ,
      },
  },
  fill: {
    colors: ["#0000FF"],
  },
  stroke: { curve: "smooth" },
  markers: { size: 0 },
  tooltip: {
    theme: "dark",
    style: { fontSize: "10px", fontFamily: "Arial" },
    x: { show: true },
  },
  grid: {
    show: true,
    borderColor: '#90A4AE',
    strokeDashArray: 0,
    position: 'back',
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    },
    row: {
      colors: undefined,
      opacity: 0.75
    },
    column: {
      colors: undefined,
      opacity: 0.75
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
  },
};

export const Steam = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllPlayers();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      const groupedData = players.reduce((acc, player) => {
        const date = new Date(player.registeredAt);
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
          date.getMonth() + 1
        ).padStart(2, "0")}/${String(date.getFullYear()).slice(2)}`;

        if (!acc[formattedDate]) {
          acc[formattedDate] = 0;
        }
        acc[formattedDate] += 1;

        return acc;
      }, {} as Record<string, number>);

      const newCategories = Object.keys(groupedData).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
      });

      const newSeries = newCategories.map((date) => ({
        x: date,
        y: groupedData[date],
      }));

      setCategories(newCategories);
      setSeries([{ data: newSeries }]);
    }
  }, [players]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <Spinner />
      </div>
    );
  }

  if (!players.length) return null;

  return (
    <div className="w-full z-20">
      <div id="chart">
        <Chart
          // @ts-ignore
          options={{ ...options, xaxis: { ...options.xaxis, categories } }}
          series={series}
          type="area"
          height={425}
        />
      </div>
    </div>
  );
};



