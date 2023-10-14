import React from "react";

const Button = ({text, onClick, isActive, isError}) => {
    return <button onClick={onClick} style={{backgroundColor: isError? '#f00': isActive ? '#00f' : ''}}>{text}</button>
}

const getRandomArray = (arr) => {
  let result = []
  let leftData = [...arr]
  if(arr.length <= 1) return arr
  while(leftData.length ){
      const len = leftData.length
      if(len <= 1) {
          result = result.concat(leftData)
          leftData = []
      }else {

        const index = Math.floor(Math.random()*len )
        result = result.concat(leftData[index])
         leftData.splice(index,1)
      }
  }
  return result
}

export default function CountryCapitalGame({ data }) {
    const [checked, setChecked] = React.useState([])
    const [rights, setRights] = React.useState([])
    const randomData = React.useMemo(()=> {
        return getRandomArray(Object.entries(data).flat())
    }, [data])

    const leftData = React.useMemo(()=> {
        return randomData.filter(d=> !rights.includes(d))
    }, [randomData, rights])
    // Use console.log() for debugging
    React.useEffect(()=> {
        if(checked.length >=2 ) {
            if((data[checked[0]]===checked[1] || data[checked[1]] === checked[0])){
                setRights(s=>s.concat(checked))
                setChecked([])
            }
        }
    }, [checked])
    if(!leftData.length) return <>Congratulations</>
    return <div>
        {
            leftData.map(d=> <Button 
                key={d}
                text={d} isActive={checked.includes(d)}  
                isError={checked.includes(d) && checked.length >=2}
                onClick={()=> {
                    setChecked(s=> {
                        
                        if(s.length >=2) {
                            return [d]
                        }
                        if(s[0] === d) return s
                        const result = s.concat(d)
                        return result
                    })
                }}
            />)
        }
    </div>;
}



// You can also use class components
// export default class CountryCapitalGame extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return <div>Your game component</div>;
//     }
// }

// {
//    america : newyork, 
//    china : beijing,
//    cra : shouer,
// }
// [america : newyork, 
//     china : beijing,
//     cra : shouer,]

// [america]
// [newyork]

// [china]
// [beijing]