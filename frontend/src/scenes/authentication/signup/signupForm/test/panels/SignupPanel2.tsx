import { LemonInput, LemonSelect, LemonButton, Link } from '@posthog/lemon-ui'
import { useValues } from 'kea'
import { Form } from 'kea-forms'
import { Field } from 'lib/forms/Field'
import { preflightLogic } from 'scenes/PreflightCheck/preflightLogic'
import { signupLogic } from '../signupLogic'

const UTM_TAGS = 'utm_campaign=in-product&utm_tag=signup-header'

export function SignupPanel2(): JSX.Element | null {
    const { preflight } = useValues(preflightLogic)
    const { isSignupPanel2Submitting } = useValues(signupLogic)

    return (
        <div className="space-y-4 Signup__panel__2">
            <Form logic={signupLogic} formKey={'signupPanel2'} className="space-y-4" enableFormOnSubmit>
                <Field name="first_name" label="Your name">
                    <LemonInput
                        className="ph-ignore-input"
                        data-attr="signup-first-name"
                        placeholder="Jane Doe"
                        disabled={isSignupPanel2Submitting}
                    />
                </Field>
                <Field name="organization_name" label="Organization name">
                    <LemonInput
                        className="ph-ignore-input"
                        data-attr="signup-organization-name"
                        placeholder="Hogflix Movies"
                        disabled={isSignupPanel2Submitting}
                    />
                </Field>
                <Field name="role_at_organization" label="What is your role?">
                    <LemonSelect
                        fullWidth
                        options={[
                            {
                                label: 'Engineering',
                                value: 'engineering',
                            },
                            {
                                label: 'Product Management',
                                value: 'product',
                            },
                            {
                                label: 'Executive',
                                value: 'executive',
                            },
                            {
                                label: 'Customer Success',
                                value: 'customer-success',
                            },
                            {
                                label: 'Sales',
                                value: 'sales',
                            },
                            {
                                label: 'Other',
                                value: 'other',
                            },
                        ]}
                    />
                </Field>
                <Field name="referral_source" label="Where did you hear about us?" showOptional>
                    <LemonInput
                        className="ph-ignore-input"
                        data-attr="signup-referral-source"
                        placeholder=""
                        disabled={isSignupPanel2Submitting}
                    />
                </Field>
                <div className="divider" />

                <LemonButton
                    fullWidth
                    type="primary"
                    center
                    htmlType="submit"
                    data-attr="signup-submit"
                    loading={isSignupPanel2Submitting}
                    disabled={isSignupPanel2Submitting}
                >
                    {!preflight?.demo
                        ? 'Create account'
                        : !isSignupPanel2Submitting
                        ? 'Enter the demo environment'
                        : 'Preparing demo data…'}
                </LemonButton>
            </Form>

            <div className="text-center text-muted-alt">
                By {!preflight?.demo ? 'creating an account' : 'entering the demo environment'}, you agree to our{' '}
                <Link to={`https://posthog.com/terms?${UTM_TAGS}`} target="_blank">
                    Terms of Service
                </Link>{' '}
                and{' '}
                <Link to={`https://posthog.com/privacy?${UTM_TAGS}`} target="_blank">
                    Privacy Policy
                </Link>
                .
            </div>
        </div>
    )
}
