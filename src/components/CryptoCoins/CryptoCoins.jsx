import React from "react";
import millify from "millify";
import classes from './CryptoCoins.module.css';
import {Link } from "react-router-dom";
import { useGetCoinsQuery } from "../../Services/cryptoApi";


const CryptoCoins = () => {

    const {data, isLoading,isFetching} = useGetCoinsQuery(50);
    const coinsDetails = data?.data?.coins;


    if(isLoading || isFetching) return <>...Loading</>;
    return (
       
            <div className={classes.coins_container}>
            <p className={classes.header}>Top 50 Cryptocurrency Prices</p>
           <table>
                    <tr>
                        <th ></th>
                        <th className={classes.text_right}>Coin</th>
                        <th className={classes.text_right}>Price</th>
                        <th className={classes.text_right}>24h Change</th>
                        <th style={{padding: '0 10px',textAlign:'right'}}>24h Volume</th>
                        <th style={{textAlign:'right',paddingRight:'5px'}}>Market Cap</th>
                    </tr> 
           {coinsDetails?.map(coin => {
                return <tr key={coin.uuid}> 
                            
                        
                                <td>
                                    <div  className={classes.image_box}>
                                        <span>{coin?.rank} </span>
                                        <div className={classes.text_left}>
                                            <img className={classes.crypto_image} 
                                            alt={coin.name} src={coin?.iconUrl}/>
                                        </div>
                                    </div>
                                </td>
                                 <td   className={[classes.coin_name,classes.text_right].join(' ')}><Link to={`/cryptocoins/${coin.uuid}`}>{coin?.name}</Link></td>
                                <td className={classes.text_right}>${millify(coin?.price,{decimalSeparator:',',space:true})}</td>
                                 <td >
                                     <span className={coin?.change > 0 ? classes.badge_green : classes.badge_red}>{coin?.change} %</span>
                                     </td>
                                <td className={classes.text_right}>{millify(coin['24hVolume'])}</td>
                                <td className={classes.text_right}>{millify(coin?.marketCap,{decimalSeparator:',',space:true})}</td>
                           
                            
                            </tr>
                    })}
                    </table>
              </div>
        
    )
}

export default CryptoCoins;