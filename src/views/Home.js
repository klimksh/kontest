import React, { Component } from 'react';
import { utcParse } from 'd3-time-format';
import LineChart from './LineChart'
class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("http://konuxdata.getsandbox.com/data")
        .then(res => res.json())
        .then(
          (result) => {
            const parseTimeWithMill = utcParse("%Y-%m-%dT%H:%M:%S.%L%Z");
            const parseTime = utcParse("%Y-%m-%dT%H:%M:%S%Z");
            const convertTod3Date = (date) => {
                if (parseTimeWithMill(date))
                    return parseTimeWithMill(date) 
                else if (parseTime(date))
                    return parseTime(date)
                    else throw new Error("Data is invalid. Check date format!");
            }
            const checkInt = (y) => {
                if (typeof y !==  'number')
                throw new Error("Data is invalid. Values are not numbers!");
            }
            try{
                result.values.map(d => d.x=convertTod3Date(d.x))
                result.values.map(d => checkInt(d.y))
            }
            catch(error){
                this.setState({
                    isLoaded: true,
                    error
                });                      
            }
            const compareDates = (a, b) =>  a.x - b.x;
            result.values.sort(compareDates);
            this.setState({
              isLoaded: true,
              items: result.values
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <LineChart dataRecieved={items} />
        );
      }
    }
  }
export default Home;