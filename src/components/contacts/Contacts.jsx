import { useState } from 'react'

import { TextField, Button } from '@mui/material'

import './Contacts.scss'

const Contacts = () => {

    const [data, setData] = useState({
        phoneNumber: "",
        whatsApp: "",
        email: "",
        viber: "",
        vk: "",
        odnoklssnik: "",
        telegram: "",
        instagram: "",
    })

    console.log(data)

    const fields = [
        {
            state: "standard",
            name: "E-mail",
            value: data.email,
            func: (e) => setData({ ...data, email: e.target.value })
        },
        {
            state: "standard",
            name: "Телефон",
            value: data.phoneNumber,
            func: (e) => setData({ ...data, phoneNumber: e.target.value })
            // func: (e) => {
            //     if (e.target.value.length !== 13) {
            //         setData({...data, phoneNumber: "+7" + e.target.value.replaceAll("+7", "").replace(/[^+\d]/g, '')})
            //     }
            // }
        },
        {
            state: "standard",
            name: "Telegram",
            value: data.telegram,
            func: (e) => setData({ ...data, telegram: e.target.value })
        },
        {
            state: "standard",
            name: "WhatsApp",
            value: data.whatsApp,
            func: (e) => setData({ ...data, whatsApp: e.target.value })
        },
        {
            state: "additional",
            name: "ВКонтакте",
            value: data.vk,
            func: (e) => setData({ ...data, vk: e.target.value })
        },
        {
            state: "additional",
            name: "Одноклассники",
            value: data.odnoklssnik,
            func: (e) => setData({ ...data, odnoklssnik: e.target.value })
        },
        {
            state: "additional",
            name: "Viber",
            value: data.viber,
            func: (e) => setData({ ...data, viber: e.target.value })
        },
        {
            state: "additional",
            name: "Instagram",
            value: data.instagram,
            func: (e) => setData({ ...data, instagram: e.target.value })
        }
    ]

    const [toggleFields, setToggleFields] = useState(true)

    return (
        <div className="contact__wrapper">
            <h2>Контакты</h2>
            <div className="fields__wrapper">
                {fields.map(({ state, name, value, func }) => state === "standard" && (
                    <div className="input__wrapper">
                        <div className="chip">
                            <div>{name}</div>
                            <span>?</span>
                        </div>
                        <TextField
                            sx={{ width: "70%" }}
                            size="small"
                            variant="outlined"
                            value={value}
                            onChange={(e) => func(e)} />
                    </div>
                )
                )}
            </div>
            <div className="additional" style={toggleFields ? {justifyContent: "space-between"} : {flexDirection: "column"}}>
                <div className="toggle__button">
                    <h3>Дополнительно</h3>
                    <div onClick={() => setToggleFields(!toggleFields)}>
                        <div className={toggleFields ? "closed1" : "opened1"}></div>
                        <div className={toggleFields ? "closed2" : "opened2"}></div>
                    </div>
                </div>
                <div style={toggleFields ? { display: "none" } : null} className="dropdown">
                    <div className="fields__wrapper">
                        {fields.map(({ state, name, value, func }) => state === "additional" && (
                            <div className="input__wrapper">
                                <div className="chip">
                                    <div>{name}</div>
                                    <span>?</span>
                                </div>
                                <TextField
                                    sx={{ width: "65%" }}
                                    size="small"
                                    variant="outlined"
                                    value={value}
                                    onChange={(e) => func(e)} />
                            </div>
                        )
                        )}
                    </div>
                </div>
                <Button
                    sx={{ marginTop: "10px", width: "150px", height: "40px" }}
                    // disabled={readyUrl !== "" ? false : true}
                    variant="contained"
                    onClick={() => { }}
                >Сгенерировать
                </Button>
            </div>
            <div className="results">
                <h2>Результат</h2>
            </div>
        </div>
    )
}

export default Contacts