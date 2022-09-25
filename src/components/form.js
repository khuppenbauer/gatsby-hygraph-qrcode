import React from "react"
import ReactMarkdown from "react-markdown"
import { Formik, Form } from "formik"

import Input from "./form/input"
import Checkbox from "./form/checkbox"
import Textarea from "./form/textarea"
import Button from "./form/button"

const FormComponent = ({ block }) => {
	const { id, formName, formFields, formSubmit, formSuccess } = block
	const initialValues = formFields.reduce((acc, field) => {
		const { formFieldType, formFieldName } = field;
		if (formFieldType === 'Text' || formFieldType === 'FormTextarea') {
			acc[formFieldName] = "";
		} else if(formFieldType === 'Checkbox') {
			acc[formFieldName] = false;
		}
		return acc;
	}, {})

	return (
		<Formik
			key={`formik-${id}`}
			initialValues={initialValues}
			onSubmit={(values, actions) => {
        const url = '/api/submit';      
				fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ formName, ...values }),
				})
				.then(() => {
					actions.resetForm()
					actions.setStatus({
						sent: true,
						values,
					})
				})
				.catch((error) => {
					actions.setStatus({
						sent: false,
						error,
					})
				})
				.finally(() => {
          actions.setSubmitting(false)
        })
			}}
			validate={values => {
				const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
				const errors = {}
				formFields.map(field => {
					const { formFieldName, formFieldType, formFieldMandatory } = field
					if (formFieldMandatory && !values[formFieldName]) {
						errors[formFieldName] = 'ist ein Pflichtfeld'
					}
					if (formFieldType === 'Email' && values.email && !emailRegex.test(values.email)) {
						errors.email = "E-Mail ist keine gültige E-Mail Adresse"
					}
					return null
				})
				return errors
			}}
		>
		{({ status }) => {
			console.log(status);
      if (status && status.sent === true) {
				return (
					<>
					  <div className="flex flex-wrap w-full mb-10">
							<ReactMarkdown className="leading-relaxed text-base">
								{formSuccess.markdown}
							</ReactMarkdown>
            </div>
						<div className="w-full overflow-auto">
							<table className="table-auto text-left whitespace-no-wrap">
								<tbody>
									{
										formFields.map(field => {
											const { id, formFieldName, formFieldLabel } = field
											const value = status.values[formFieldName]
											if (value) {
												return (
													<tr key={id}>
														<td className="py-3">{formFieldLabel}</td>
														<td className="px-4 py-3">{value}</td>
													</tr>
												)
											}
											return null
										})
									}
								</tbody>
							</table>
						</div>
					</>
				)
			} else {
				return (
					<div className="flex flex-col w-full lg:w-1/2 mb-10">
						<Form name={formName} key={`form-${id}`}>
							{
								formFields.map(field => {
									const { id, formFieldName, formFieldLabel, formFieldPlaceholder, formFieldMandatory, formFieldType } = field;
									switch(formFieldType) {
										case 'Text':
                    case 'Email':  
											return <Input key={id} name={formFieldName} label={formFieldLabel} mandatory={formFieldMandatory} placeholder={formFieldPlaceholder} type={formFieldType} /> 
										case 'Checkbox':
											return <Checkbox key={id} name={formFieldName} label={formFieldLabel} mandatory={formFieldMandatory} />
										case 'Textarea':
											return <Textarea key={id} name={formFieldName} label={formFieldLabel} mandatory={formFieldMandatory} placeholder={formFieldPlaceholder} />
										default:
											return null;
									}
								})
							}
							<Button key="submit" label={formSubmit} />
						</Form>
					</div>
				)
			}
		}}
		</Formik>
	)
};

export default FormComponent
