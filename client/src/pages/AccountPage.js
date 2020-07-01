import React, { useState } from 'react'

const AccountPage = () => {

    const [form, setForm] = useState({nickname: 'none'})

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <input 
                id="nickname"
                name="nickname"
                value={form.nickname}
                onChange={changeHandler}
            ></input>
            <button>Применить</button>
        </div>
    )
}

export default AccountPage