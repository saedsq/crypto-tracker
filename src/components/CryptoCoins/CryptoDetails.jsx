import React from "react";
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Linechart from './Linechart';
import {RiMoneyDollarCircleLine} from 'react-icons/ri';
import {AiOutlineNumber} from 'react-icons/ai';
import {AiOutlineFall} from 'react-icons/ai';
import {TbBusinessplan} from 'react-icons/tb';
import {BsGraphUp} from 'react-icons/bs';
import {AiFillCreditCard} from 'react-icons/ai';
import {BsCurrencyExchange} from 'react-icons/bs';
import {RiMoneyDollarBoxLine} from 'react-icons/ri';
import classes from './CryptoDetails.module.css';
import { useGetCoinDetailsQuery } from "../../Services/cryptoApi";
import millify from "millify";


const CryptoDetails = () => {

    const {coinId} = useParams();
    const {data,isLoading,isFetching} = useGetCoinDetailsQuery(coinId);
    const coinDetails = data?.data?.coin;
    console.log(coinDetails);

   
    if(isLoading || isFetching) return <>...Loading</>;
    return (
        <>
                
       <h1> <img className={classes.coin_image} src={coinDetails?.iconUrl}  alt={coinDetails?.name} /> {coinDetails?.name} price <span className={classes.coin_symbol}>({coinDetails?.symbol}) </span></h1> 
           
           <Linechart coinId={coinId} coinPrice={coinDetails?.price} coinMarketCap={coinDetails?.marketCap} coinVolume={coinDetails?.['24hVolume']}/> 

           <div className={classes.coin_stats_container}>
               <div className={classes.main_stats_container}>
                   <div className={classes.header}>
                       <span className={classes.header_title}>{coinDetails?.name} Value Stats</span>
                        <span className={classes.header_info}>An overview of showing stats of {coinDetails?.name}</span>
                    </div>

                    <div className={classes.stats}>
                        <div className={classes.stats_box}>
                            <div className={classes.icon_box}>
                                <RiMoneyDollarCircleLine className={classes.stats_icon}/>
                                <span>Price to USD</span>
                            </div>
                            <span>${millify(coinDetails?.price)}</span>
                        </div>

                        <div className={classes.stats_box}>
                            <div className={classes.icon_box}>
                                <AiOutlineNumber className={classes.stats_icon}/>
                                <span>Rank</span>
                            </div>
                            <span>{coinDetails?.rank}</span>
                        </div>

                        <div className={classes.stats_box}>
                            <div className={classes.icon_box}>
                                <AiOutlineFall className={classes.stats_icon}/>
                                <span>24h Volume</span>
                            </div>
                            <span>${millify(coinDetails?.['24hVolume'])}</span>
                        </div>

                        <div className={classes.stats_box}>
                            <div className={classes.icon_box}>
                                <TbBusinessplan className={classes.stats_icon}/>
                                <span>Market Cap</span>
                            </div>
                            <span>${millify(coinDetails?.marketCap)}</span>
                        </div>

                        <div className={classes.stats_box}>
                            <div className={classes.icon_box}>
                                <BsGraphUp className={classes.stats_icon}/>
                                <span>All-time-high</span>
                            </div>
                            <span>${millify(coinDetails?.allTimeHigh?.price)}</span>
                        </div>
                    </div>
                    
               </div>



               <div className={classes.other_stats_container}>
                   <div className={classes.header}>
                       <span className={classes.header_title}>Other Stats</span>
                        <span className={classes.header_info}>Showing other stats about {coinDetails?.name}</span>
                    </div>

                    <div className={classes.stats}>
                        <div className={classes.stats_box}>
                            <div className={classes.icon_box}>
                                <AiFillCreditCard className={classes.stats_icon}/>
                                <span>Number of Markets</span>
                            </div>
                            <span>{millify(coinDetails?.numberOfMarkets)}</span>
                        </div>

                        <div className={classes.stats_box}>
                            <div className={classes.icon_box}>
                                <BsCurrencyExchange className={classes.stats_icon}/>
                                <span>Number of Exchanges</span>
                            </div>
                            <span>{coinDetails?.numberOfExchanges}</span>
                        </div>

                        <div className={classes.stats_box}>
                            <div className={classes.icon_box}>
                                <RiMoneyDollarBoxLine className={classes.stats_icon}/>
                                <span>Approved</span>
                            </div>
                            <span>Approved</span>
                        </div>

                        <div className={classes.stats_box}>
                            <div >
                                <RiMoneyDollarBoxLine className={classes.stats_icon}/>
                                <span>Total Supply</span>
                            </div>
                            <span>${millify(coinDetails?.supply?.total)}</span>
                        </div>

                        <div className={classes.stats_box}>
                            <div className={classes.icon_box}>
                                <RiMoneyDollarBoxLine className={classes.stats_icon}/>
                                <span>Circulating Supply</span>
                            </div>
                            <span>{millify(coinDetails?.supply?.circulating)}</span>
                        </div>
                    </div>
                    
               </div>

           </div>

           <div className={classes.coin_info_container}>
                <div className={classes.coin_info}>
                    <h3 className={classes.text_color}>What is {coinDetails?.name}?</h3>
                    <span className={classes.text_color}>{ReactHtmlParser(coinDetails?.description)}</span>

                </div>
            </div>

            <div className={classes.links_container}>
                <div className={classes.link_header}>
                    <h3 className={classes.text_color}>Links to {coinDetails?.name} resources</h3>
                </div>
                {coinDetails?.links.map(link => {
                    return <div key={link.name} className={classes.single_link} >  
                        <div className={classes.link}>
                            <span className={classes.link_type} >{link.type}</span></div>
                            <a  href={link.url} className={classes.link_url} target='_blank' rel="noreferrer" >{link.url}</a>
                        </div>

                })}
            </div>
                
        </>

    )
}

export default CryptoDetails;