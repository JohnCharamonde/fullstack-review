import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    this.getTopForked((err, results) => {
      this.setState({
        repos: results
      })
    });
  }


  search(term) {
    console.log(`${term} was searched`);
    var obj = { login: term };
    var data = JSON.stringify(obj);
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: data,
      contentType: 'application/json',
      dataType: 'json',
      // success: function (result) {
      //   console.log('success')
      // },
      // error: function (error) {
      //   console.log('for some reason there is an error',this, error)
      // }
    })
    .then(result => {
      console.log('result', result)
    })
  }

  getTopForked(callback) {
      $.ajax({
        method: 'GET',
        url: '/repos',
        contentTupe: 'application/json',
        dataType: 'json',
        success: function (results) {
          callback(null, results)
        },
        error: function (error) {
          console.log(error)
        }
      });
    }

  render() {
    return(<div>
    <h1>GITHUB FETCHER</h1>
    <RepoList repos={this.state.repos} />
    <Search onSearch={this.search.bind(this)} />
    </div >)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));