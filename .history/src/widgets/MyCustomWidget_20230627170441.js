import React, { useEffect, useState } from 'react'
 
export default function MyCustomWidget() {
   const [stopwatchData, setStopwatchData] = useState([
  { id: 0, name: "Timer 1", time: 0, isRunning: false, lap: [], time_started: 0, pause: [] },
 ])
 const [selectedRow, setSelectedRow] = useState(0)
 useEffect(() => {
  const interval = setInterval(() => {
   setStopwatchData(stopwatchData.map((st
  )
}