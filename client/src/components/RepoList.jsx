import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> REPOS RANKED BY FORKS </h4>
    {
      <table>
        <thead>
          <tr>
            <td>FORKS</td>
            <td>NAME</td>
            <td>OWNER</td>
          </tr>
        </thead>
        <tbody>
          {props.repos.map(repo => {
            return(
            <tr>
              <td>{repo.forks}</td>
              <td onClick={() => {console.log(repo.url)}}>{repo.name}</td>
              <td>{repo.owner}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    }

  </div>
)

export default RepoList;