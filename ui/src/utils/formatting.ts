import path from "path";
import fs from "fs";

export function getFormattedDate(date: Date): string {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = daysOfWeek[date.getDay()];
  let hours = date.getHours();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours ? hours : 12;

  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedDate = `${dayOfWeek} ${hours}:${minutes} ${ampm}`;
  
  return formattedDate;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}