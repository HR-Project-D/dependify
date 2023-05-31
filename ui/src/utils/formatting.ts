import path from "path";
import fs from "fs";

export function getFormattedDate(date: Date): string {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  let hours = date.getHours();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours ? hours : 12;

  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedDate = `${dayOfWeek} ${hours}:${minutes} ${ampm}`;

  return formattedDate;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getDateDifferenceText(date1: Date, date2: Date): string {
  const diffMilliseconds = date2.getTime() - date1.getTime();
  const diffSeconds = Math.floor(diffMilliseconds / 1000);

  const timeUnits = [
    { unit: "year", value: Math.floor(diffSeconds / (60 * 60 * 24 * 365)) },
    { unit: "month", value: Math.floor(diffSeconds / (60 * 60 * 24 * 30)) },
    { unit: "week", value: Math.floor(diffSeconds / (60 * 60 * 24 * 7)) },
    { unit: "day", value: Math.floor(diffSeconds / (60 * 60 * 24)) },
    { unit: "hour", value: Math.floor(diffSeconds / (60 * 60)) },
    { unit: "minute", value: Math.floor(diffSeconds / 60) },
    { unit: "second", value: diffSeconds },
  ];

  const timeUnit = timeUnits.find((unit) => unit.value >= 1);
  if (timeUnit) {
    return `${timeUnit.value} ${timeUnit.unit}${
      timeUnit.value > 1 ? "s" : ""
    } ago`;
  }

  return "Just now";
}
