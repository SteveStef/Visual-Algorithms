import React, { Component } from 'react';
import colors from './colors.js';

let selectionSort = {
  comparisons: 0,
  swaps: 0,
  color: colors[Math.floor(Math.random() * colors.length)],
  colorState: [],
  isClicked: false
}

class selection extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       array: [108, 52, 168, 28, 8, 147, 177, 251, 98, 241, 282, 19, 279, 63, 229, 32, 100, 263, 57, 76, 190, 25, 111, 87, 186, 123, 262, 69, 238, 141, 258, 125, 7, 5, 160, 54, 89, 113, 143, 30, 18, 86, 90, 275, 119, 15,108, 52, 168, 28, 8, 147],
       color: colors[Math.floor(Math.random() * colors.length)]
    }
  }

  async resetArray() {
    selectionSort.isClicked = false;
    selectionSort.comparisons = 0;
    selectionSort.swaps = 0;
    this.setState({color: colors[Math.floor(Math.random() * colors.length)]})
    const array = this.state.array;
    for (let i = 0; i < 52; i++) {
      array[i] = (randomNum(5, 290));
      await this.sleep(10);
      this.setState({array});
    }
  }
  componentDidMount() {
    this.resetArray()
  }
  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  selectionSort = async array => {
    selectionSort.isClicked = true;

    const arr = Array.from(array); // avoid side effects
    for (let i = 0; i < arr.length - 1; i++) {
      let minPos = i;
      for (let j = i + 1; j < arr.length; j++) {
        selectionSort.comparisons++;
        if (arr[j] < arr[minPos]) {
        selectionSort.swaps++;
        await this.sleep(15);
        this.setState({array:arr});
          minPos = j;
        }
      }
      if (i !== minPos) {
        [arr[i], arr[minPos]] = [arr[minPos], arr[i]];
      }
    }
    this.setState({array:arr,color:'rgb(0,100,0'});
    await this.sleep(3000);
    this.resetArray()

  };
  render() {
    const { array,color } = this.state;
    return (
      <div>
        <div className="card">
          <div className="container">
            <div style={{backgroundColor: "#242836", height: "300px", width: "100%"}}>
            <br></br>
            <div className="array-container">{array.map((num, idx) => {
                return(
                  <div className="array-bar"
                    key={idx} style={{width: '5px',margin: '1px',
                    backgroundColor: color,height: `${num}px`,
                  }}></div>
                )
              })}</div>
            </div>
            <h4><b>SELECTION-SORT</b></h4>
            <p>The algorithm divides the input list into two 
              parts: a sorted sublist of items which is built 
              up from left to right at the front (left) of the 
              list and a sublist of the remaining unsorted items 
              that occupy the rest of the list. This algorithm has a time complexity of O(n^2).
              </p>
              <div style={{fontWeight: 'bold'}}># of Comparisons - <span style={{fontSize: '20px'}}>{selectionSort.comparisons}</span></div>
                
                <div style={{fontWeight: 'bold'}}># of Swaps - <span style={{fontSize: '20px'}}>{selectionSort.swaps}</span></div>
            
             <div onClick={() => this.selectionSort(array)} className="play-btn" href="#"></div>
          
          </div>
        </div>
      </div>
    )
  }
}
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default selection;
