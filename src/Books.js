import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import BooksDetails from './BooksDetails'
import Search from './Search'
import axios from 'axios'

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1,
      temp:1,
      url:''
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }

  //Function to get the Customer Data from json
  getCustomerData() {
    axios.get('assets/samplejson/customerlist.json').then(response => {
      this.setState({customerList: response});

    })
  };

  searchdata = (idToSearch)=> {
      return this.state.customerList.data.filter(item => {
      return item.name === idToSearch
  })
};

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({url: val});

    let result = this.searchdata(val)
    this.setState({temp:result[0].id})
    console.log(this.state.temp)


  }

  mySubmitHandler = (event)=>{



  }



  render() {
    if (!this.state.customerList)
      return (<p>Loading data</p>)
    return (<div className="addmargin">
      <div className="col-md-3">
        {

          this.state.customerList.data.map(customer => <Panel bsStyle="info" key={customer.name} className="centeralign">
            <Panel.Heading>
              <Panel.Title componentClass="h3">{customer.name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p>{customer.email}</p>
              <p>{customer.phone}</p>
              <Button bsStyle="info" onClick={() => this.setState({selectedCustomer: customer.id})}>

                Click to View Details

              </Button>

            </Panel.Body>
          </Panel>)
        }
      </div>
      <div className="col-md-6">
        <BooksDetails val={this.state.selectedCustomer}/>
      </div>
      <div className="col-md-3">
      <Panel>
      <Panel.Heading>
        <Panel.Title componentClass="h3">Search</Panel.Title>
      </Panel.Heading>
      <Panel.Body>

            <form onSubmit={this.mySubmitHandler}>

                <p>Enter your name:</p>
             <input
               type='text'
               name='url'
               onChange={this.myChangeHandler}
             />

             <br/>
             <br/>
             <input type='submit' />

             <Button bsStyle="info" onClick={() => this.setState({selectedCustomer: this.state.temp})}>

               Click to View Details

             </Button>


           </form>


      </Panel.Body>
    </Panel>
      </div>

    </div>)
  }

}
