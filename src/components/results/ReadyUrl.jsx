import { useState } from 'react'
import { Snackbar, Alert, Button, TextField } from '@mui/material'



const ReadyUrl = ({ readyUrl }) => {

    const [snackBar, setSnackBar] = useState(false)

    return (
        <div className="ready__url">
            <h2 className="url__title">Результат</h2>
            <div className="url__wrapper">
            <Snackbar open={snackBar} autoHideDuration={6000} onClose={() => setSnackBar(false)}>
                <Alert onClose={() => setSnackBar(false)} severity="success" sx={{ width: '100%' }}>
                Ссылка скопировано в буфер обмена!
                </Alert>
            </Snackbar>
            <TextField
                fullWidth
                placeholder="Здесь появится результат ваших действий..."
                size="small"
                inputProps={
                { readOnly: true, }
                }
                sx={{margin: "0 5px 0 0"}}
                variant="outlined"
                value={readyUrl === "" ? "" : readyUrl}
            />
            <Button
                sx={{margin: "10px 0 10px 0", width: "150px" , height: "40px"}}
                disabled={readyUrl !== "" ? false : true}
                variant="contained"
                onClick={() => {
                    setSnackBar(true)
                    navigator.clipboard.writeText(readyUrl)
                }}
                >Копировать
            </Button>
            </div>
        </div>
    )
}

export default ReadyUrl