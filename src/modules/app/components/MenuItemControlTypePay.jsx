import React, { useState } from 'react'
import Switch from 'react-switch'
import { useCollectStore } from '../../../hooks'
import { BsReceipt } from 'react-icons/bs'
import { GiReceiveMoney } from 'react-icons/gi'

export const MenuItemControlTypePay = () => {

    const { manageTypePay, setTypePay } = useCollectStore()

    return (
        <>
            <div className='d-block d-lg-none'>
                <div className='menu-item'>
                    <Switch
                        onChange={e => setTypePay(e)}
                        checked={manageTypePay}
                        handleDiameter={25}
                        height={40}
                        width={80}
                        activeBoxShadow='0 0 0 2px #2684ff'
                        onColor='#198754'
                        offColor='#ffcd39'
                        uncheckedIcon={
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    fontSize: 24,
                                    color: 'black',
                                }}
                            >
                                <BsReceipt size={24} />
                            </div>
                        }
                        checkedIcon={
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    fontSize: 24,
                                    color: 'white',
                                }}
                            >
                                <GiReceiveMoney size={24} />
                            </div>
                        }
                    />
                </div>
            </div>
            <div className='d-none d-lg-block'>
                <div className='menu-item'>
                    <Switch
                        onChange={e => setTypePay(e)}
                        checked={manageTypePay}
                        handleDiameter={30}
                        height={40}
                        width={180}
                        activeBoxShadow='0 0 0 2px #2684ff'
                        onColor='#198754'
                        offColor='#ffcd39'
                        uncheckedIcon={
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    fontSize: 20,
                                    color: 'black',
                                    paddingRight: 10,
                                    marginLeft: '-80px',
                                    width: '140px'
                                }}
                            >
                                Simulado
                            </div>
                        }
                        checkedIcon={
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    fontSize: 20,
                                    color: 'white',
                                    paddingLeft: 10,
                                    marginRight: '-50px',
                                    width: '140px'
                                }}
                            >
                                Pago directo
                            </div>
                        }
                    />
                </div>
            </div>
        </>
    )
}
