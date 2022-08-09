import { TextField, Button } from '@mui/material'

const TextFields = ({ fields }) => {
    return (
        <div className="fields__wrapper">
            {fields.map(({ state, name, value, func }) => {
                if (name === "Телефон" || name === "WhatsApp") value = value !== "+7" ? value : ""
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
    )
}

export default TextFields