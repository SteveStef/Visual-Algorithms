import React, { Component } from 'react';
import colors from './colors.js';

let cockTailSort = {
  comparisons: 0,
  swaps: 0,
  colorState: [],
  isClicked: false
}
export class CockTail extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       array: [108, 52, 168, 28, 8, 147, 177, 251, 98, 241, 282, 19, 279, 63, 229, 32, 100, 263, 57, 76, 190, 25, 111, 87, 186, 123, 262, 69, 238, 141, 258, 125, 7, 5, 160, 54, 89, 113, 143, 30, 18, 86, 90, 275, 119, 15,108, 52, 168, 28, 8],
       color: colors[Math.floor(Math.random() * colors.length)]
    }
  }
  async resetArray() {
    cockTailSort.isClicked = false;
    cockTailSort.comparisons = 0;
    cockTailSort.swaps = 0;
    this.setState({color: colors[Math.floor(Math.random() * colors.length)]})
    const array = this.state.array;
    for (let i = 0; i < 52; i++) {
      array[i] = (randomNum(5, 290));
      await this.sleep(10);
      this.setState({array: array});
    }
  }
  componentDidMount() {
    this.resetArray()
  }
  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async Cocktail_sort(arr) {
    cockTailSort.isClicked = true;
    var swapped;
    do {
      for(var i = 0; i < arr.length - 2; i++) {
        cockTailSort.comparisons++;
        if(arr[i] > arr[i+1]) {
          var temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
          swapped = true;
          cockTailSort.swaps++;
          await this.sleep(10);
          this.setState({array:arr});
        }
      }	
      if(!swapped) {
        break;
      }
      swapped = false;
      for( i = arr.length - 2; i > 0; i--) {
        cockTailSort.comparisons++;
        if(arr[i] > arr[i+1]) {
          var temp1 = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp1;
          swapped = true;
          cockTailSort.swaps++;
          await this.sleep(10);
          this.setState({array:arr});
        }
      }
    } while(swapped);
    this.setState({array:arr, color: 'rgb(0,100,0)'});
    await this.sleep(3000);
    this.resetArray();
  }
 
  render() {
    const { array, color } = this.state;
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
            <h4><b>COCKTAIL-SORT</b></h4>
            <p>Cocktail sort, just like the Bubble sort, 
              works by iterating through the list, comparing 
              adjacent elements and swapping them if they are 
              in the wrong order. The only real difference is 
              that it does it in both directions instead of only 
              going from left to right.
              </p>
              <div style={{fontWeight: 'bold'}}># of Comparisons - <span style={{fontSize: '20px'}}>{cockTailSort.comparisons}</span></div>
                
                <div style={{fontWeight: 'bold'}}># of Swaps - <span style={{fontSize: '20px'}}>{cockTailSort.swaps}</span></div>
            
              <div onClick={() => this.Cocktail_sort(array)} className="play-btn" href="#"></div>
            
          </div>
        </div>
      </div>
    )
  }
}
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default CockTail;
