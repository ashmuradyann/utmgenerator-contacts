import { useState, useRef } from 'react'

import TextFields from './TextFields'
import AdditionalFields from './AdditionalFields'
import Results from './Results'

import './contacts.scss'

const Contacts = () => {

    const [data, setData] = useState({
        phoneNumber: "",
        whatsApp: "",
        email: "",
        viber: "",
        vk: "",
        odnoklassnik: "",
        telegram: "",
        instagram: "",
    })

    if (data.phoneNumber === "+7") setData({ ...data, phoneNumber: ""})
    if (data.whatsApp === "+7") setData({ ...data, whatsApp: ""})
    if (data.viber === "+7") setData({ ...data, viber: ""})

    const fields = [
        {
            state: "standard",
            name: "E-mail",
            hrefStarts: "mailto:",
            value: data.email,
            func: (e) => setData({ ...data, email: e.target.value })
        },
        {
            state: "standard",
            name: "Телефон",
            hrefStarts: "tel:",
            value: data.phoneNumber,
            func: (e) => {
                if (e.target.value.length !== 13) {
                    setData({ ...data, phoneNumber: "+7" + e.target.value.replaceAll("+7", "").replace(/[^+\d]/g, '') })
                }
            }
        },
        {
            state: "standard",
            name: "Telegram",
            hrefStarts: "https://t.me/",
            value: data.telegram,
            func: (e) => setData({ ...data, telegram: e.target.value })
        },
        {
            state: "standard",
            name: "WhatsApp",
            hrefStarts: "https://wa.me/",
            value: data.whatsApp,
            func: (e) => {
                if (e.target.value.length !== 13) {
                    setData({ ...data, whatsApp: "+7" + e.target.value.replaceAll("+7", "").replace(/[^+\d]/g, '') })
                }
            }
        },
        {
            state: "additional",
            name: "ВКонтакте",
            hrefStarts: "https://vk.com/",
            value: data.vk,
            func: (e) => setData({ ...data, vk: e.target.value })
        },
        {
            state: "additional",
            name: "Одноклассники",
            hrefStarts: "https://ok.ru/",
            value: data.odnoklassnik,
            func: (e) => setData({ ...data, odnoklassnik: e.target.value })
        },
        {
            state: "additional",
            name: "Viber",
            hrefStarts: "https://viber.click/",
            value: data.viber,
            func: (e) => {
                if (e.target.value.length !== 13) {
                    setData({ ...data, viber: "+7" + e.target.value.replaceAll("+7", "").replace(/[^+\d]/g, '') })
                }
            }
        },
        {
            state: "additional",
            name: "Instagram",
            hrefStarts: "https://www.instagram.com/",
            value: data.instagram,
            func: (e) => setData({ ...data, instagram: e.target.value })
        }
    ]

    const [toggleFields, setToggleFields] = useState(true)
    const [generated, setGenerated] = useState(null)

    return (
        <div className="contact__wrapper">
            <h2>Контакты</h2>
            <TextFields fields={fields} />
            <AdditionalFields fields={fields} data={data} toggleFields={toggleFields} setToggleFields={setToggleFields} setGenerated={setGenerated} />
            <Results fields={fields} generated={generated} />
        </div>
    )
}

export default Contacts