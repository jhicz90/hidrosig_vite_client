import { forwardRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, KBarResults, useMatches, useRegisterActions } from 'kbar'
import { menuModule } from '../../../types'
import { checkModules, comandModules } from '../../../helpers'

const secretAccess = import.meta.env.VITE_APP_SECRET_ACCESS

export const AppComandBar = ({ children }) => {

    const navigate = useNavigate()
    const { modAccess: modules } = useSelector(state => state.auth)
    const actions = comandModules(modules[0] === secretAccess ? [...menuModule] : checkModules([...menuModule], modules)).map(ac => ({
        id: ac.id,
        name: ac.label,
        shortcut: ac.shortcut || [],
        keywords: `${ac.label} ${ac.detail || ''}`,
        section: ac.section,
        subtitle: ac.detail || '',
        perform: () => navigate(ac.to),
    }))

    return (
        <KBarProvider
            actions={actions}
            options={{
                enableHistory: true
            }}
        >
            <KBarPortal>
                <KBarPositioner style={{
                    backgroundColor: 'rgba(255 255 255 / 0.3)'
                }}>
                    <KBarAnimator style={{
                        maxWidth: '600px',
                        width: '100%',
                        background: 'rgb(252 252 252)',
                        color: 'rgb(28 28 29)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0px 6px 20px rgb(0 0 0 / 20%)',
                    }}>
                        <KBarSearch defaultPlaceholder='Escriba un comando o busque...' style={{
                            padding: '12px 16px',
                            fontSize: '16px',
                            width: '100%',
                            boxSizing: 'border-box',
                            outline: 'none',
                            border: 'none',
                            background: 'rgb(252 252 252)',
                            color: 'rgb(28 28 29)',
                        }} />
                        <SpotlightResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </KBarProvider>
    )
}

const SpotlightResults = () => {
    const { results, rootActionId } = useMatches()

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div styles={{
                        padding: '8px 16px',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        opacity: 0.5,
                    }}>{item}</div>
                ) : (
                    <ResultItem
                        action={item}
                        active={active}
                        currentRootActionId={rootActionId}
                    />
                )
            }
        />
    )
}

const ResultItem = forwardRef(
    ({ action, active, currentRootActionId }, ref) => {
        const ancestors = useMemo(() => {
            if (!currentRootActionId) return action.ancestors
            const index = action.ancestors.findIndex(
                (ancestor) => ancestor.id === currentRootActionId
            )
            // +1 removes the currentRootAction; e.g.
            // if we are on the 'Set theme' parent action,
            // the UI should not display 'Set theme… > Dark'
            // but rather just 'Dark'
            return action.ancestors.slice(index + 1)
        }, [action.ancestors, currentRootActionId])

        return (
            <div
                ref={ref}
                style={{
                    padding: '12px 16px',
                    background: active ? 'rgba(0 0 0 / 0.05)' : 'transparent',
                    borderLeft: `2px solid ${active ? 'rgb(28 28 29)' : 'transparent'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        fontSize: 14,
                    }}
                >
                    {action.icon && action.icon}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            {ancestors.length > 0 &&
                                ancestors.map((ancestor) => (
                                    <React.Fragment key={ancestor.id}>
                                        <span
                                            style={{
                                                opacity: 0.5,
                                                marginRight: 8,
                                            }}
                                        >
                                            {ancestor.name}
                                        </span>
                                        <span
                                            style={{
                                                marginRight: 8,
                                            }}
                                        >
                                            &rsaquo;
                                        </span>
                                    </React.Fragment>
                                ))}
                            <span>{action.name}</span>
                        </div>
                        {action.subtitle && (
                            <span style={{ fontSize: 12 }}>{action.subtitle}</span>
                        )}
                    </div>
                </div>
                {
                    action.shortcut?.length
                        ? (
                            <div
                                aria-hidden
                                className='dark-apple'
                                style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}
                            >
                                {action.shortcut.map((sc) => (
                                    <kbd
                                        key={sc}
                                    >
                                        {sc.toLocaleUpperCase()}
                                    </kbd>
                                ))}
                            </div>
                        )
                        : null
                }
            </div>
        )
    }
)