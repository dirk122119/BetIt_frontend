import Head from 'next/head'

import TwDataTable from "@/components/twStock/TwDataTable"
export default function CryptoIndex() {
    return (
        <div>
            <Head>
                <title>TW</title>
            </Head>

            <br/>
            <div>
            <TwDataTable/>
            </div>
            
        </div>
    )
}