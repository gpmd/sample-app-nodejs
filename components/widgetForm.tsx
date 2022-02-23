import { Button, Flex, FormGroup, Input, Panel, Form as StyledForm } from '@bigcommerce/big-design';
import { ChangeEvent, FormEvent, useState } from 'react';
import { StringKeyValue, WidgetFormData } from '../types';

interface FormProps {
    formData: WidgetFormData;
    onCancel(): void;
    onSubmit(form: WidgetFormData): void;
}

const FormErrors = {
    name: 'Widget name is required',
};

const Form = ({ formData, onCancel, onSubmit }: FormProps) => {
    const { name } = formData;
    const [form, setForm] = useState<WidgetFormData>({ name });
    const [errors, setErrors] = useState<StringKeyValue>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name: formName, value } = event?.target;
        setForm(prevForm => ({ ...prevForm, [formName]: value }));

        // Add error if it exists in FormErrors and the input is empty, otherwise remove from errors
        !value && FormErrors[formName]
            ? setErrors(prevErrors => ({ ...prevErrors, [formName]: FormErrors[formName] }))
            : setErrors(({ [formName]: removed, ...prevErrors }) => ({ ...prevErrors }));
    };

    const handleSubmit = (event: FormEvent<EventTarget>) => {
        event.preventDefault();

        // If there are errors, do not submit the form
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors) return;

        onSubmit(form);
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <Panel header="Basic Information">
                <FormGroup>
                    <Input
                        error={errors?.name}
                        label="Product name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />
                </FormGroup>
            </Panel>
            <Flex justifyContent="flex-end">
                <Button
                    marginRight="medium"
                    type="button"
                    variant="subtle"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </Flex>
        </StyledForm>
    );
};

export default Form;
