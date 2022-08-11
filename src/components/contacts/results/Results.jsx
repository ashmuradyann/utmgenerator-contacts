import { useState, useRef } from 'react'
import { Button, Snackbar, Alert } from '@mui/material'

import './results.scss'

const Results = ({ fields, generated }) => {

    const [snackBar, setSnackBar] = useState(false)
    const allCodeRef = useRef(null)

    return (
        <div className="results">
            <h2>Результат</h2>
            <div className="results__wrapper">
                {generated && fields.map(({ name, hrefStarts, value }) => {
                    if (value !== "") {
                        if (name === "WhatsApp" || name === "Viber") value = value.replace("+", "")
                        if (name === "Telegram" && value.startsWith("https://t.me/")) hrefStarts = ""
                        if (name === "Telegram" ||
                            name === "WhatsApp" ||
                            name === "Viber" ||
                            name === "ВКонтакте" ||
                            name === "Instagram" ||
                            name === "Одноклассники") {
                            return <p key={name}>{name}: <a href={hrefStarts + value}>Написать в {name}</a></p>
                        }
                        if (name === "E-mail") return <p key={name}>Отправить письмо: <a href={hrefStarts + value}>{value}</a></p>
                        if (name === "Телефон") return <p key={name}>Позвонить: <a href={hrefStarts + value}>{value}</a></p>
                    }
                })}
                {generated === false && <p>Заполните хотя бы одно поле!</p>}
                {generated === null && <p>Пусто</p>}
            </div>
            {generated && <div ref={allCodeRef} className="code__wrapper">
                {'<div class="selector"'}
                {fields.map(({ name, hrefStarts, value }) => {
                    if (value !== "") {
                        if (name === "WhatsApp" || name === "Viber") value = value.replace("+", "")
                        if (name === "Telegram" && value.startsWith("https://t.me/")) hrefStarts = ""

                        switch (name) {
                            case "E-mail":
                                return ` data-email="${value}"`
                            case "Телефон":
                                return ` data-phone="${value}"`
                            case "Telegram":
                                return ` data-telegram="${value}"`
                            case "WhatsApp":
                                return ` data-whatsapp="${value}"`
                            case "ВКонтакте":
                                return ` data-vkontakte="${value}"`
                            case "Одноклассники":
                                return ` data-odnoklassnik="${value}"`
                            case "Viber":
                                return ` data-viber="${value}"`
                            case "Instagram":
                                return ` data-instagram="${value}"`
                        }
                    }
                })}
                {'></div><script src="./script.js"></script>'}
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
    )
}

export default Results