import React, { useEffect, useState } from 'react'

export const Contacts = ({ contacts = [], onChange }) => {

    const [listContacts, setListContacts] = useState(contacts)

    const handleInputChange = (e, i) => {
        const contact = e.target.value
        setListContacts(
            listContacts.map((ctc, index) => {
                if (index === i) {
                    return { ...ctc, [e.target.name]: contact }
                } else {
                    return ctc
                }
            })
        )
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setListContacts([...listContacts, { number: '', type: 1 }])
    }

    const handleRemove = (e, i) => {
        e.preventDefault()
        setListContacts(listContacts.filter((c, index) => index !== i))
    }

    useEffect(() => {
        onChange(listContacts)
    }, [listContacts, onChange])

    useEffect(() => {
        setListContacts(contacts)
    }, [contacts])

    return (
        <>
            {
                listContacts.map((c, i) =>
                    <div key={`contact#${i}`} className={`input-group-add-action ${i > 0 ? "mt-2" : ""}`}>
                        <div className="input-group">
                            <input value={c.number} onChange={e => handleInputChange(e, i)} name="number" className="form-control" />
                            <select
                                value={c.type}
                                onChange={e => handleInputChange(e, i)}
                                className="form-select"
                                name="type"
                                style={{ flex: '0 0 40%' }}
                            >
                                <option value={1}>Trabajo</option>
                                <option value={2}>Personal</option>
                                <option value={3}>Hogar</option>
                            </select>
                            <button
                                onClick={(e) => handleRemove(e, i)}
                                className="btn btn-neutral">
                                <i className="fa-solid fa-xmark ui-text-red" />
                            </button>
                        </div>

                    </div>
                )
            }
            <button
                onClick={handleAdd}
                className="btn btn-sm btn-link text-decoration-none p-0"
            >
                <i className="fas fa-plus me-1" />
                Agregar contacto
            </button>
        </>
    )
}
