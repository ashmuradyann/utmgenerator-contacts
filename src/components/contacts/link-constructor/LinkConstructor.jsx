import { useState } from 'react'

import './link-constructor.scss'

const LinkConstructor = ({ fields }) => {

  const [linkToShow, setLinkToShow] = useState({
    name: "",
    hrefStarts: "",
    value: ""
  })

  return (
    <div className="link-constructor">
      <h2>Связаться с нами</h2>
      <div className="constructor__wrapper">
        <div className="selector">
          {fields.map(({ name, hrefStarts, value }) => {
            if (value !== "") return <div style={linkToShow.name === name ? {backgroundColor: "#c4c4c4"} : null} onClick={() => setLinkToShow({ name: name, hrefStarts: hrefStarts, value: value })}>{name}</div>
          })}
        </div>
        <div className="result">
          {linkToShow.name === "WhatsApp" || linkToShow.name === "Telegram" ||
           linkToShow.name === "Viber" || linkToShow.name === "Одноклассники" ||
           linkToShow.name === "ВКонтакте" || linkToShow.name === "Instagram"
            ? <p>Написать в <a href={linkToShow.hrefStarts + linkToShow.value}>{linkToShow.name}</a></p>
            : null}
          {linkToShow.name === "Телефон" && <p>Позвонить: <a href={linkToShow.hrefStarts + linkToShow.value}>{linkToShow.value}</a></p>}
          {linkToShow.name === "E-mail" && <p>Отправить письмо: <a href={linkToShow.hrefStarts + linkToShow.value}>{linkToShow.value}</a></p>}
        </div>
      </div>
    </div>
  )
}

export default LinkConstructor