import React from "react";
import { useState, useEffect } from "react";
import data from './data'
const w = [{ apple: 1, orange: 5 }, { mango: 2 }];

const Array = () => {
  // Store list of all users
  // const [users, setUsers] = useState();

  // const getApiData = async () => {
  //     const response = await fetch(
  //         data
  //     ).then((response) => response.json());

  //     // update the state
  //     setUsers(response);
  //   };

  //   useEffect(() => {
  //     getApiData();
  //   }, []);

  // const data = [
  //   {
  //       "geometry": [
  //           [
  //               0.3623046875,
  //               0.0107421875
  //           ],
  //           [
  //               0.640625,
  //               0.1162109375
  //           ]
  //       ],
  //       "lines": [
  //           {
  //               "geometry": [
  //                   [
  //                       0.4228515625,
  //                       0.0107421875
  //                   ],
  //                   [
  //                       0.58203125,
  //                       0.0302734375
  //                   ]
  //               ],
  //               "words": [
  //                   {
  //                       "value": "BILL",
  //                       "confidence": 0.9989269375801086,
  //                       "geometry": [
  //                           [
  //                               0.4228515625,
  //                               0.01171875
  //                           ],
  //                           [
  //                               0.4697265625,
  //                               0.0302734375
  //                           ]
  //                       ]
  //                   },
  //                   {
  //                       "value": "OF",
  //                       "confidence": 0.9997792840003967,
  //                       "geometry": [
  //                           [
  //                               0.46875,
  //                               0.0107421875
  //                           ],
  //                           [
  //                               0.5009765625,
  //                               0.0302734375
  //                           ]
  //                       ]
  //                   },
  //                   {
  //                       "value": "SUPPLY",
  //                       "confidence": 0.9993358254432678,
  //                       "geometry": [
  //                           [
  //                               0.501953125,
  //                               0.01171875
  //                           ],
  //                           [
  //                               0.58203125,
  //                               0.029296875
  //                           ]
  //                       ]
  //                   }
  //               ]
  //           }
  //       ]
  //     }]
//   let a = []
//   const result = data.map(d => a.push(d.lines))
// //   console.log(a);
//   let b = []
//   a.map(entry=> console.log(entry.words))
//   console.log(b);
  return (
    <div>
      <h1>

      {/* {data.map(h => h[0].lines[0].)} */}
      {/* {data.map(data[0].artefacts)} */}
      </h1>
    </div>
  );
};

export default Array;
