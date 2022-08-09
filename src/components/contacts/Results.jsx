import { useState, useRef } from 'react'
import { Button, Snackbar, Alert } from '@mui/material'

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
                        return <p key={name}>{name}: <a href={hrefStarts + value}>{value}</a></p>
                    }
                })}
                {generated === false && <p>Заполните хотя бы одно поле!</p>}
                {generated === null && <p>Пусто</p>}
            </div>
            {generated && <div ref={allCodeRef} className="code__wrapper">
                {fields.map(({ name, hrefStarts, value }) => {
                    if (value !== "") {
                        if (name === "WhatsApp" || name === "Viber") value = value.replace("+", "")
                        if (name === "Telegram" && value.startsWith("https://t.me/")) hrefStarts = ""
                        if (name === "Telegram" ||
                            name === "WhatsApp" ||
                            name === "Viber" ||
                            name === "ВКонтакте" ||
                            name === "Instagram" ||
                            name === "Одноклассники") {
                            return <p>{`<p>${name}: <a href="${hrefStarts + value}">Написать в ${name}</a></p>`}</p>
                        }
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
    )
}

export default Results