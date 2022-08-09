import { useState, memo } from 'react'

import ShortUrl from './ShortUrl'
import QrCode from '../qr-code/QrCode'
import ReadyUrl from './ReadyUrl'

import './result.scss'

const Result = ({ readyUrl }) => {

  const [shortenQrUrl, setShortenQrUrl] = useState("")

  return (
    <div className="result__wrapper">
      <ReadyUrl readyUrl={readyUrl} />
      <ShortUrl readyUrl={readyUrl} setShortenQrUrl={setShortenQrUrl} />
      <QrCode readyUrl={readyUrl} shortenQrUrl={shortenQrUrl} />
    </div>
  )
}

export default memo(Result)