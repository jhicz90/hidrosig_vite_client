import { ProgressBar } from 'react-bootstrap'
import { Wizard, useWizard } from 'react-use-wizard'
import styled from 'styled-components'

export const WizardStep = ({ children }) => {
    return (
        <WizardRoot>
            <Wizard header={<StepsHeader />}>
                {children}
            </Wizard>
        </WizardRoot>
    )
}

const StepsHeader = () => {
    const { activeStep, stepCount } = useWizard()

    return (
        <WizardHeaderStep>
            <ProgressBar style={{ height: '1px' }} now={activeStep * (100 / (stepCount - 1))} />
            {
                new Array(stepCount).fill(null).map((b, i) =>
                    <button
                        key={`state-nav-${i}`}
                        type='button'
                        className={`position-absolute top-0 translate-middle btn btn-sm ${activeStep >= i ? 'btn-primary' : 'btn-secondary'} rounded-pill`}
                        style={{ width: '2rem', height: '2rem', justifyContent: 'center', left: `${i * (100 / (stepCount - 1))}%` }}
                    >
                        {i + 1}
                    </button>
                )
            }
        </WizardHeaderStep>
    )
}

const WizardRoot = styled.div`
    padding-top: 0.5rem;
    padding-bottom: 1rem;
`

const WizardHeaderStep = styled.div`
    position: relative;
    margin: 2rem;
    margin-top: 1rem;
`