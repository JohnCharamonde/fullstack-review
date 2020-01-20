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


  search (term) {
    console.log(`${term} was searched`);
    var obj = {login: term};
    var data = JSON.stringify(obj);
    console.log('this is data', data);
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: data,
      contentType: 'application/json',
      dataType: 'json',
      success: function() {
        console.log('it worked! Or so I think...');
      },
      error: function() {
        console.log('client ajax search not working!')
      }
    });
  }

  getTopForked(callback) {
    $.ajax({
      method: 'GET',
      url: '/repos',
      contentTupe: 'application/json',
      dataType: 'json',
      success: function(results) {
        callback(null, results)
      },
      error: function() {
        console.log('client GET ajax search not working!')
      }
    });
  }

  render () {
    console.log('this seems to be happening twice!', this.state)
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));