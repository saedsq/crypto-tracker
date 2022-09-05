import React from "react";
import classes from './Home.module.css'
import millify from "millify";
import { useGetGlobalStatsQuery,useGetCoinsQuery } from "../../Services/cryptoApi";
import {Link} from 'react-router-dom'

const Home = () => {

    const {data,isFetching,isLoading } = useGetGlobalStatsQuery();
    const globalCryptoStats = data?.data;
   
    const response = useGetCoinsQuery(10);
    const coins = response?.currentData?.data?.coins;
   
   if(isFetching || isLoading) return <>...Loading</>;

    return (
        
        <div className={classes.global_stats_container}>
            <h1>Global Crypto Stats</h1>
            <div className={classes.global_stats}>
                <div  className={classes.stats_box}>
                    <p className={classes.headings}>Total Crypto Currencies</p>
                    <p className={classes.stats}>{globalCryptoStats?.totalCoins}</p>
                </div>
                <div  className={classes.stats_box}>
                    <p className={classes.headings}>Total Exchanges</p>
                    <p className={classes.stats}>{globalCryptoStats?.totalExchanges}</p>
                </div>
                
            </div>
            <div className={classes.global_stats}>
                <div className={classes.stats_box}>
                    <p className={classes.headings}>Total Market Cap</p>
                    <p className={classes.stats}>{Number(globalCryptoStats?.totalMarketCap).toFixed(2)}</p>
                </div>
                <div className={classes.stats_box}>
                    <p className={classes.headings}>24 Hour Volume</p>
                    <p className={classes.stats}>{globalCryptoStats?.total24hVolume}</p>
                </div>
                
            </div>
            <div className={classes.global_stats}>
                <div className={classes.stats_box}>
                    <p className={classes.headings}>Total Markets</p>
                    <p className={classes.stats}>{globalCryptoStats?.totalMarkets}</p>
                </div>
                <div className={classes.stats_box}>
                    <p className={classes.headings}>BitCoin Dominance</p>
                    <p className={classes.stats}>{globalCryptoStats?.btcDominance.toFixed(2)}</p>
                </div>
                
            </div>
            
            
            <div className={classes.coins_container}>
            <p className={classes.table_header}>Top 10 Cryptocurrency Prices</p>
           <table>
                    <tr>
                        <th className={[classes.space,classes.text_left].join(' ')}>Coin</th>
                        <th >Price</th>
                        <th >24h Change</th>
                        <th  style={{textAlign:'right',paddingRight:'5px'}}>Market Cap</th>
                    </tr> 
           {coins?.map(coin => {

                return  <tr key={coin.uuid}>
                       <td className={[classes.coin_name,classes.text_left].join(' ')}><Link to={`/cryptocoins/${coin.uuid}`}> {coin?.name}</Link></td>
                        <td >$ {millify(coin?.price,{decimalSeparator:',',space:true})}</td>
                        <td >
                            <span className={ coin.change > 0 ? classes.badge_green : classes.badge_red}>{coin?.change} %</span>
                            </td>
                        <td style={{textAlign:'right',paddingRight:'5px'}}>{millify(coin?.marketCap,{decimalSeparator:',',space:true})}</td>
                    </tr> 
                     
                   
                    })}
                    </table>
              </div>
        </div>
    )
}

export default Home;