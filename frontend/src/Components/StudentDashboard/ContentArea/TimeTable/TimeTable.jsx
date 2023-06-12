import React from "react";
import "./TimeTable.css";

function Timetable({ timetable }) {
  return (
    <div className="timetable">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {timetable.days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable.slots.map((slot, index) => (
            <tr key={index}>
              <td>{slot.time}</td>
              {timetable.days.map((day) => {
                // Find the subject for the current day and time slot
                const subject = slot.subjects.find((subject) => subject.day === day);

                return (
                  <td key={day + index}>
                    <div className="subject-cell">
                      {subject ? (
                        <span className="subject-name">{subject.name}</span>
                      ) : (
                        <span className="no-subject">---</span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;