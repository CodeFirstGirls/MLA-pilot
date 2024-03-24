import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './statistics.css';
import { PieChart, Pie, ResponsiveContainer, Sector, Cell, Text } from 'recharts'; // Import Text component
import config from '../config';

const iconMap = {
  Running: '#322142',
  Cycling: '#03A6A6',
  Gym: '#00563E',
  Swimming: '#CE466B',
  Other: '#F25757'
};

const Statistics = ({ currentUser }) => {
  const [exercisesData, setExercisesData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/stats/${currentUser}`);
        setExercisesData(response.data.stats[0].exercises);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const renderActiveShape = (props, data) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{ fontWeight: 'bold' }}>
          {payload.exerciseType}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <Text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" width={50} style={{ overflow: 'visible' }}>
          {` Duration: ${value} min`}
        </Text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="stats-container">
      <h4>Well done, {currentUser}! This is your overall effort:</h4>
      {loading ? (
        <p>Loading...</p>
      ) : exercisesData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={(props) => renderActiveShape(props, exercisesData)}
              data={exercisesData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={125}
              fill="#8884d8"
              dataKey="totalDuration"
              onMouseEnter={onPieEnter}
            >
              {exercisesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={iconMap[entry.exerciseType]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Statistics;
