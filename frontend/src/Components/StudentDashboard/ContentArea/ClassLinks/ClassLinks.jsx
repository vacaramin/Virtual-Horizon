import React from "react";

function ClassLinks({ links }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr key={index}>
              <td>{link.subject}</td>
              <td>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassLinks;