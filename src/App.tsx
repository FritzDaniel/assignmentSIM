import React, { 
  useState,
  useEffect
} from 'react'
import './App.css'
import JSONDATA from './data.json'

function App() {

  const [searchTerm,setSearchTerm] = useState('')
  const [vendorList,setVendorList] = useState([])
  const [vendor,setVendor] = useState({})
  const [showDetail,setShowDetail] = useState(false)

  useEffect(() => {
    let arr = []
    JSONDATA.filter((val)=> {
      if (searchTerm === "") {
        arr = []
      } else if(val.vendorName.toLowerCase().includes(searchTerm.toLowerCase())) {
        arr.push(val)
      }
    })
    setVendorList(arr)
  }, [searchTerm])

  const onSelectVendor = (data) => {
    setVendor(data)
    setShowDetail(true)
  }

  const reset = () => {
    setVendor('')
    setShowDetail(false)
    setVendorList([])
    setSearchTerm('')
  }

  const Detail = () => {
    if(showDetail) {
      return (
        <div>
          <p>Vendor Name: { vendor['vendorName'] }</p>
          <p>Payment Term: { vendor['paymentTermName'] }</p>
          <div onClick={() => { reset() }}>Reset</div> 
        </div>
      )
    }
  }

  return (
    <div className="App">
      <input type="text" placeholder="seach..." onChange={e=>setSearchTerm(e.target.value)} />
      {
        vendorList?.map((v, i) => (
          <div onClick={() => { onSelectVendor(v) }}>{ v.vendorName } { v.paymentTermName }</div>
        ))
      }
      { Detail() }
    </div>
  );
}

export default App;
