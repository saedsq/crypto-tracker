import React,{useState,useEffect} from "react";
import axios from "axios";
import classes from './Exchanges.module.css';
import millify from "millify";

const Exchanges = () => {

    const [data,setData] = useState(null);
  
     useEffect(()=> {
        const fetchData = async () => {
       

          
            const response = await axios.get('https://api.coingecko.com/api/v3/exchanges',{
            headers:{
                'Content-Type': 'application/json',
            }
            }) ;
            setData(response.data.slice(0,50));
        }

        fetchData();


    },[]);

    return (
       <>
       <div  className={classes.exchangesContainer}>

            <table>
                    <tr>
                        <th className={classes.space}>Exchanges</th>
                        <th>Trade Volume</th>
                        <th>Trust Score</th>
                        <th style={{paddingRight:'5px'}}>Year Established</th>
                    </tr> 
                {data?.map(exchange => {

                    return  <tr key={exchange.id}>
                        <td>
                            <div className={classes.box}><img className={classes.crypto_image} 
                                alt={exchange.name} src={exchange?.image}/> 
                                <div className={classes.text_left}>{exchange?.name}</div>
                            </div>
                        </td>
                        <td>$ {millify(exchange?.trade_volume_24h_btc)}</td>
                        <td >
                            <span className={classes.badge}>
                            {exchange?.trust_score}
                            </span>
                        </td>
                        <td>{exchange?.year_established}</td>
                                            
                    </tr>  
                   
                    })
                    
                    }
            </table>
       </div>
       </>
    )
}

export default Exchanges;