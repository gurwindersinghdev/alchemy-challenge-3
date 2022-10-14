import React,{useState} from "react";
export const NFTCard = ({ nft }) => {  
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div className="w-1/6 flex flex-col">
      <div className="rounded-md">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="font-black text-gray-700">{nft.title}</h2>
          <p className="text-white-600">
            <span className="font-bold">Id:</span> {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
          </p>
          <p className="text-gray-600 pr-4">
            {nft.contract.address.substr(0, 3)}__$
            {nft.contract.address.substr(nft.contract.address.length - 2)}
            <button className="pl-4 pr-4 bg-teal-300 font-bold rounded-b-md"
              onClick={() => copyToClipBoard(nft.contract.address)}
            >
              copy
            </button>
            <span className="bg-rose-300">{copySuccess}</span>
          </p>
        </div>
        <div className="flex-grow mt-2">
          <p className="text-black-600">{nft.description.substr(0,50)}</p>
        </div>
        <div><a target="_blank" href={`https://etherscan.io/token/${nft.contract.address}`}/>
        </div>
      </div>
    </div>
    
  );
};
