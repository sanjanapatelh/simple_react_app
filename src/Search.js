import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'

//This Component is a child Component of Customers Component
export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    this.getCustomerDetails(this.props.val)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.props.val)
    }
  }

  //Function to Load the customerdetails data from json.
  getCustomerDetails(id) {
    axios.get('assets/samplejson/customer' + id + '.json').then(response => {
      this.setState({customerDetails: response})
    })
  };

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  mySubmitHandler = (event)=>{
    
  }

  render() {

    return (<div className="customerdetails">
      <Panel bsStyle="info" className="centeralign">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Search</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
        <form onSubmit={this.mySubmitHandler}>
               <h1>Hello {this.state.url} {this.state.type}{this.state.country}</h1>
               <p>Enter your name:</p>
               <input
                 type='text'
                 name='url'
                 onChange={this.myChangeHandler}
               />
               <p>Enter country:</p>

               <br/>
               <br/>
               <input type='submit' />
             </form>
        </Panel.Body>
      </Panel>
    </div>)
  }
}
