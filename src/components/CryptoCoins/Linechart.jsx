import React, {useState}from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import classes from './LineChart.module.css';
import {HiArrowNarrowDown} from 'react-icons/hi';
import {HiArrowNarrowUp} from 'react-icons/hi';
import { useGetCoinHistoryQuery} from "../../Services/cryptoApi";
import { useSearchParams } from "react-router-dom";
import { NavLink} from "react-router-dom";
Chart.register(...registerables);

const Linechart = ({coinId,coinPrice,coinMarketCap,coinVolume}) => {

    const [timeStats,setTimeStats] = useState('24h');
    const [searchParams] = useSearchParams();
    const period = searchParams.get('period');
    
    const response = useGetCoinHistoryQuery({coinId,time:timeStats});
    const priceHistory = response?.data?.data;    

    const coinTimeStamp = priceHistory?.history?.map(coin => {
        return new Date (coin?.timestamp *1000).toLocaleDateString();
    });


    const price = priceHistory?.history?.map(coin => {
        return parseFloat(coin?.price);
    });

    const data ={
        labels:coinTimeStamp,
        datasets:[
            {
                label:'Price in USD',
                data:price,
                fill:false,
                backgroundColoir:'white',
                borderColor:'white'
                

            }
        ]
    }

  const options ={
        scales:{
            yAxis:[
                {
                    ticks:{
                        beginAtZero:true
                        
                    }
                }
            ],
            xAxis:[
                {
                    type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'MM DD YYYY'
                            }
                        }
                }
            ]
        }
    }

    const setTimeHandler = () => {
        setTimeStats(period)
    }


    return (
        <>
       <div className={classes.container}>    
            <div className={classes.headings}>
                <div>Price</div>
                <div className={classes.headings_content}><span>${parseInt(coinPrice).toFixed()}</span></div>
            </div>
            <div className={classes.headings}>
                <div>1 Day</div>
                <div style={{color:priceHistory?.change  > 0 ? 'green' : 'red'}} className={classes.headings_content}>
                    <span>{priceHistory?.change.slice(1)}%</span> 
                    {priceHistory?.change  > 0 ? <HiArrowNarrowUp className={classes.arrow_up}/>  
                                : <HiArrowNarrowDown className={classes.arrow_down}/>}
                </div>
            </div>
            <div className={classes.headings}>
                <div>Market Cap</div>
                <div className={classes.headings_content}><span>${coinMarketCap}</span></div>
            </div>
            <div className={classes.headings}>
                <div>24h Volume</div>
                <div className={classes.headings_content}><span>{coinVolume}</span></div>
            </div>
        </div>
        <div className={classes.line_chart}>
            
            
            <ul className={classes.timeSelector}>
                <li><NavLink  to={`/cryptocoins/${coinId}?period=24h`} >
                    <button className={classes.timeSelectorItem} onClick={setTimeHandler}>1D</button>
                </NavLink></li>
                <li><NavLink to={`/cryptocoins/${coinId}?period=7d`}>
                    <button className={classes.timeSelectorItem} onClick={setTimeHandler}>1W</button>
                </NavLink></li>
                <li><NavLink to={`/cryptocoins/${coinId}?period=30d`}>
                    <button className={classes.timeSelectorItem} onClick={setTimeHandler}>1M</button>
                </NavLink></li>
                <li><NavLink to={`/cryptocoins/${coinId}?period=1y`}>
                    <button className={classes.timeSelectorItem} onClick={setTimeHandler}>1Y</button>
                    </NavLink></li>
                <li style={{marginLeft:'25px'}}><NavLink to={`/cryptocoins/${coinId}?period=5y`}>ALL</NavLink></li>
            </ul>
            {priceHistory ? <Line  style={{backgroundColor:'#020029',padding:'25px 25px'}} data={data} options={options}/> : ''}

            
        </div>
       

        </>
    )
}

export default Linechart;