import Container from '@mui/material/Container';
import styles from '@/components/crypto/TickerTape.module.css'
import useSWR from 'swr'

export default function TickerTape() {
    const fetcher = (url) => fetch(url).then(r => r.json());
    const { data, error, isLoading } = useSWR('https://www.betit.online/crypto/top7_search', fetcher)

    if (error) return <div>failed to load</div>;
    if (!data) return <div className={styles.main}>loading...</div>;

    const coins = data.coins
    const list = coins.map((item,index)=>
        <div key={item.item.symbol} className={styles.tickerTapeStory}><a href="" className={styles.text}><span className={styles.span}>{index+1}. <img src={item.item.small} className={styles.avatar}/>  {item.item.symbol}:{item.item.price_btc} Btc</span></a></div>
   )
    return (
        <Container fixed>
            <div className={styles.tickerTape}>
                <div className={styles.tickerTapeScroll}>
                    <div className={styles.tickerTapeCollection}>
                        {list}
                        {list}
                    </div>
                </div>
            </div>
        </Container>
    )
}