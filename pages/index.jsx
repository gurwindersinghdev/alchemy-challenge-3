import { useState } from 'react'
import APIKEY from './components/APIKEY';
import { NFTCard } from "./components/NFTCard"

const Home = () => {

  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [collectionNft, setCollection]=useState(false)
  const [eruptChange, setEruptChange] =useState(0)

  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const api_key = APIKEY
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }
  const api_key = "zxaHQRYsJipHaWyl6Xs2hQXQFjiK1-co"
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;


  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&startToken=${eruptChange}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  const incrementStartTokenAndFetch = () => {
    setEruptChange(prevToken =>prevToken+100)
    console.log('fetching next bunch of nfts be patient')
    fetchNFTsForCollection()
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} disabled={collectionNft} type={"text"} placeholder="Add your wallet address"></input>
        <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e)=>{setCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-green-500 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            if (collectionNft) {
              setEruptChange((prev)=>prev=0)
              fetchNFTsForCollection()
            }else fetchNFTs()
          }
        }>Let's go! </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
     </div>
      <button onClick={incrementStartTokenAndFetch} className={"bg-slate-700 text-white bg-blue-600 px-4 py-2 mt-3 rounded-sm w-1/8"}>Next 100 nfts or More...</button>
      {console.log(eruptChange)}
    </div>
  )
}

export default Home