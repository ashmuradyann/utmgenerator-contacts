import { useState } from 'react'

import { TextField, Button } from '@mui/material'

import './additional-fields.scss'

const AdditionalFields = ({ data, fields, setGenerated }) => {

    const [toggleFields, setToggleFields] = useState(true)

    return (
        <div className="additional__wrapper" style={toggleFields ? null : { flexDirection: "column" }}>
            <div style={toggleFields ? { marginRight: "20px" } : null}
                className="toggle__button"
                onClick={() => setToggleFields(!toggleFields)}>
                <h3>Дополнительно</h3>
                <div>
                    <div className={toggleFields ? "closed1" : "opened1"}></div>
                    <div className={toggleFields ? "closed2" : "opened2"}></div>
                </div>
            </div>
            <div style={toggleFields ? { display: "none" } : { marginBottom: "10px" }} className="dropdown">
                <div className="fields__wrapper">
                    {fields.map(({ state, name, value, func }) => {
                        if (name === "Viber") value = value !== "+7" ? value : ""
                        return state === "additional" && (
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
    )
}

export default AdditionalFields