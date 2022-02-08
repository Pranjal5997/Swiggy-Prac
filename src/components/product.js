import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './product.css'
function Product() {
    const [productData, setProductData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        let url = 'https://run.mocky.io/v3/128675fd-afe3-43fd-9b9a-cf7a0ee511ef'
        Axios.get(url, {}).then(res => {
            setProductData(res?.data)
            setFilteredData(res?.data)
        })
    }, [])

    function searchProducts(evt) {
        evt.preventDefault()
        let searchValue = evt.target.value;
        console.log(searchValue)
        let data = productData;
        let newData =[]
        newData = data.filter(item => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
        console.log(newData)
        setFilteredData(newData)
    }

    function handleAdd(evt,product) {
        evt.preventDefault();
        console.log("Product Name ==>>>", product.name)
    }
    return (
        <div className='container'>
            <input type="text" placeholder='type to search' onChange={searchProducts} />
            {filteredData?.map((item, index) =>
                <div className='product-container'>
                    <h3>{item.isVeg === 1 ? "Veg" : "Non Veg"}</h3>
                    <div className='section'>
                        <div className='left-sec'>
                            <img />
                            <label className='item-name'>{item.name}</label>
                            <CurrencyRupeeIcon style={{height: '13px', marginLeft: '-8px !important'}} /><span style={{margingLeft: '-5px !important'}} className='price'>{item.price}</span>
                        </div>
                        <div className='right-sec'>
                            <img className='produc-image' src={item.cloudinaryImageId} />
                            <button onClick={(e) => handleAdd(e,item)}>Add <span>+</span></button>
                            <br />
                            <span>customisable</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product;