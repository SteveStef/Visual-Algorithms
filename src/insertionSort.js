import React, { Component } from 'react';
import colors from './colors.js';

let insertionSort = {
  comparisons: 0,
  swaps: 0,
  colorState: [],
  isClicked: false
}

class InsertionSort extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      array: [108, 52, 168, 28, 8, 147, 177, 251, 98, 241, 282, 19, 279, 63, 229, 32, 100, 263, 57, 76, 190, 25, 111, 87, 186, 123, 262, 69, 238, 258, 125, 7, 5, 160, 54, 89, 113, 143, 30, 18, 86, 90, 275, 119, 15,108, 52, 168, 28, 8, 147],
      color: colors[Math.floor(Math.random() * colors.length)]
    }
  }
  async resetArray() {
    insertionSort.isClicked = false;
    insertionSort.comparisons = 0;
    insertionSort.swaps = 0;
    this.setState({color:colors[Math.floor(Math.random() * colors.length)]})
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
  insertionSort = async (inputArr) => {
    insertionSort.isClicked = true;
    for (let i = 1; i < inputArr.length; i++) {
        let key = inputArr[i];
        let j = i - 1;
        insertionSort.comparisons++;
        while (j >= 0 && inputArr[j] > key) {
          insertionSort.swaps++;
          inputArr[j + 1] = inputArr[j];
          j = j - 1;
          await this.sleep(1);
          this.setState({array: inputArr});
        }
        inputArr[j + 1] = key;
    }
    this.setState({color: 'rgb(0,100,0)'});
    await this.sleep(3000);
    this.resetArray();
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
            <h4><b>INSERTION-SORT</b></h4>
            <p>This linear algorithm (O(n) time complexity) iterates, consuming one input 
              element each repetition, and grows a sorted output 
              list. At each iteration, insertion sort removes one 
              element from the input data, finds the location it
              belongs within the sorted list, and inserts it.
              
              </p>
              <div style={{fontWeight: 'bold'}}># of Comparisons - <span style={{fontSize: '20px'}}>{insertionSort.comparisons}</span></div>
                
                <div style={{fontWeight: 'bold'}}># of Swaps - <span style={{fontSize: '20px'}}>{insertionSort.swaps}</span></div>
            
               <div onClick={() => this.insertionSort(array)} className="play-btn" href="#"></div>
            
          </div>
        </div>
      </div>
    )
  }
}
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default InsertionSort;
