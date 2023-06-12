import React from 'react';
import './ReportCard.css';

function ReportCard({ subjects }) {
  return (
    <div className="report-card">
      <table className="report-card-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Quizzes</th>
            <th>Assignments</th>
            <th>Mid Exam</th>
            <th>Final Exam</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.name}>
              <td>{subject.name}</td>
              <td>{subject.quizzes.join(', ')}</td>
              <td>{subject.assignments.join(', ')}</td>
              <td>{subject.midExam}</td>
              <td>{subject.finalExam}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportCard;