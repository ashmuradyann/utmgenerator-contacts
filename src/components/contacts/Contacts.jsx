import { useState, useRef } from 'react'

import { TextField, Button, Snackbar, Alert } from '@mui/material'

import './Contacts.scss'

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
            hrefStarts: "viber://chat?number=",
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
    const [snackBar, setSnackBar] = useState(false)

    const allCodeRef = useRef(null)

    return (
        <div className="contact__wrapper">
            <h2>Контакты</h2>
            <div className="fields__wrapper">
                {fields.map(({ state, name, value, func }) => {
                    if (name === "Телефон") value = data.phoneNumber !== "+7" ? data.phoneNumber : ""
                    if (name === "WhatsApp") value = data.whatsApp !== "+7" ? data.whatsApp : ""
                    if (name === "Viber") value = data.viber !== "+7" ? data.viber : ""
                    return state === "standard" && (
                        <div key={name} className="input__wrapper">
                            <div className="chip">
                                <div>{name}</div>
                                {/* <span>?</span> */}
                            </div>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                value={value}
                                onChange={(e) => func(e)} />
                        </div>
                    )
                }
                )}
            </div>
            <div className="additional__wrapper" style={toggleFields ? null : { flexDirection: "column" }}>
                <div style={toggleFields ? { marginRight: "20px" } : null} className="toggle__button" onClick={() => setToggleFields(!toggleFields)}>
                    <h3>Дополнительно</h3>
                    <div>
                        <div className={toggleFields ? "closed1" : "opened1"}></div>
                        <div className={toggleFields ? "closed2" : "opened2"}></div>
                    </div>
                </div>
                <div style={toggleFields ? { display: "none" } : { marginBottom: "10px" }} className="dropdown">
                    <div className="fields__wrapper">
                        {fields.map(({ state, name, value, func }) => state === "additional" && (
                            <div key={name} className="input__wrapper">
                                <div className="chip">
                                    <div>{name}</div>
                                    {/* <span>?</span> */}
                                </div>
                                <TextField
                                    fullWidth
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
                    sx={{ width: "150px", height: "40px" }}
                    variant="contained"
                    onClick={() => {
                        if (data.phoneNumber !== "" ||
                            data.whatsApp !== "" ||
                            data.email !== "" ||
                            data.viber !== "" ||
                            data.vk !== "" ||
                            data.odnoklassnik !== "" ||
                            data.telegram !== "" ||
                            data.instagram !== "") {
                            setGenerated(true)
                        } else {
                            setGenerated(false)
                        }
                    }}
                >Сгенерировать
                </Button>
            </div>
            <div className="results">
                <h2>Результат</h2>
                <div className="results__wrapper">
                    {generated && fields.map(({ name, hrefStarts, value }) => {
                        if (value !== "") {
                            return <p key={name}>{name}: <a href={hrefStarts + value}>{value}</a></p>
                        }
                    })}
                    {generated === false && <p>Заполните хотя бы одно поле!</p>}
                    {generated === null && <p>Пусто</p>}
                </div>
                {generated && <div ref={allCodeRef} className="code__wrapper">
                    {fields.map(({ name, hrefStarts, value }) => {
                        if (value !== "") {
                            return <p key={name}>{`<p>${name}: <a href="${hrefStarts + value}">${value}</a></p>`}</p>
                        }
                    })}
                </div>}
                <Button
                    sx={{ width: "200px", height: "40px" }}
                    variant="contained"
                    disabled={!generated}
                    onClick={() => {
                        setSnackBar(true)
                        let toCopy = allCodeRef.current.outerHTML
                            .replace('<div class="code__wrapper"><p>', "")
                            .replace('</p></div>', "")
                            .replaceAll('&lt;', "<")
                            .replaceAll('&gt;', ">")
                            .replaceAll('</p><p>', "")
                        navigator.clipboard.writeText(toCopy)
                    }}
                >Скопировать всё
                </Button>
                <Snackbar open={snackBar} autoHideDuration={6000} onClose={() => setSnackBar(false)}>
                    <Alert onClose={() => setSnackBar(false)} severity="success" sx={{ width: '100%' }}>
                        Весь код скопировано в буфер обмена!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default Contacts