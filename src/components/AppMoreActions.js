import React from 'react'
import { Dropdown } from 'react-bootstrap'

export const AppMoreActions = ({ actions }) => {
    return (
        <>
            {actions.length > 0 &&
                <Dropdown>
                    <Dropdown.Toggle as="a" variant="link" className="text-dark text-decoration-none pe-cursor">
                        Más acciones
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            actions.map((action) => {
                                return <Dropdown.Item key={action.act_name} onClick={action.act_fnc}>{action.act_name}</Dropdown.Item>
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            }
        </>
    )
}
