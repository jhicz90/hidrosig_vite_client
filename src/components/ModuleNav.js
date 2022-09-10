import React from 'react'
import ScrollspyNav from 'react-scrollspy-nav'

export const ModuleNav = ({ modules = [] }) => {
    return (
        <div className="row justify-content-center">
            <div className="d-none d-lg-block col-12 col-lg-4 col-xl-3">
                <div className="sticky-mobile">
                    <div className="card mb-3 mb-lg-0 w-lg-220">
                        <ScrollspyNav
                            scrollTargetIds={modules.map(m => m.id)}
                            activeNavClass="active"
                            scrollDuration={100}
                            offset={-80}
                        >
                            <ul className="spy-nav">
                                {
                                    modules.map(({ id, name, icon: IconComponent }, i) =>
                                        <li key={`spy-id${name}`} className="spy-item">
                                            <a href={`#${id}`} className={`spy-link ${i === 0 && 'active'}`}>
                                                <IconComponent size={20} />
                                                <span className='ms-3'>{name}</span>
                                            </a>
                                        </li>
                                    )
                                }
                            </ul>
                        </ScrollspyNav>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-8 col-xl-9">
                {
                    modules.map(({ id, name, title, module: ModuleComponent }) =>
                        <div key={`module-id${name}`} id={id} className="pb-5">
                            {
                                title
                                &&
                                <h2 className="mb-3 fw-light">{name}</h2>
                            }
                            <ModuleComponent />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
