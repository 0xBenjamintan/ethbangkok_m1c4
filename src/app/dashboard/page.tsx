"use client";

import { useState, useEffect } from 'react';

const fetchPfpData = async () => {
  try {
    const response = await fetch('https://api.cloudnouns.com/v1/pfp?text=badublanc.eth');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Fetch SVG as text since it's an SVG image  
    const svgData = await response.text();
    return svgData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
};

const Dashboard = () => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const loadSvg = async () => {
      const svg = await fetchPfpData();
      if (svg) {
        setSvgContent(svg);
      }
    };
    loadSvg();
  }, []);

  return (
    <div className="text-black px-[7%] py-[5%]">
      <div>Submitted bounties</div>
      <div>Win&apos;s bounties</div>
      <div>
        {/* Render the SVG content safely */}
        {svgContent && (
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
