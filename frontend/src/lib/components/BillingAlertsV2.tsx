import { useActions, useValues } from 'kea'
import { router } from 'kea-router'
import { useEffect, useState } from 'react'
import { billingLogic } from 'scenes/billing/v2/billingLogic'
import { urls } from 'scenes/urls'
import { AlertMessage } from './AlertMessage'

export function BillingAlertsV2(): JSX.Element | null {
    const { billingAlert, billingVersion } = useValues(billingLogic)
    const { reportBillingAlertShown } = useActions(billingLogic)
    const { currentLocation } = useValues(router)
    const [alertHidden, setAlertHidden] = useState(false)

    const showAlert = billingAlert && billingVersion !== 'v2'

    useEffect(() => {
        if (showAlert) {
            reportBillingAlertShown(billingAlert)
        }
    }, [showAlert])

    if (!billingAlert || billingVersion !== 'v2' || alertHidden) {
        return null
    }

    const showButton = currentLocation.pathname !== urls.organizationBilling()

    return (
        <div className="my-4">
            <AlertMessage
                type={billingAlert.status}
                action={showButton ? { to: urls.organizationBilling(), children: 'Manage billing' } : undefined}
                onClose={billingAlert.status !== 'error' ? () => setAlertHidden(true) : undefined}
            >
                <b>{billingAlert.title}</b>
                <br />
                {billingAlert.message}
            </AlertMessage>
        </div>
    )
}
