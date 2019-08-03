import React,  { Component } from 'react';
import Card from './components/CardContainer';
import './App.css';
import axios from 'axios'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
let USER_TOKEN = process.env.REACT_APP_TOKEN;
let URL = 'https://api.salesloft.com/v2/people.json'
const AuthStr = 'Bearer ' + USER_TOKEN;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
class App extends Component {

  state = {
    people: [],
    show: false
  }
  componentDidMount() {
    axios.get(proxyurl + URL, { 'headers': { 'Authorization': AuthStr } })
    .then(res => this.setState({
      ...this.state,
      people: res.data
    }))
    .catch(err => console.log(err))
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      show: !this.state.show
    })
  }
  render() {
    const {data, metadata} = this.state.people;
    if (data) {
      return (
        <div className="cardContainer">
          <button onClick={(e) => this.handleClick(e)} className="btn">Show Count</button>
          {data.map(person => {
              return <Card key={person.id} person={person} show={this.state.show}/>
          })}
        </div>
        
    )
    } else {
      return  <div style={{display: "flex", justifyContent: "center", marginTop: "10%"}} ><Loader  className='loader' type="Puff" color="#00BFFF" height={300} width={300}/></div>
    }
  }
}

export default App;