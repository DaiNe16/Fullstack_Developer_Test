/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { AppProvider, TextField, Button, FormLayout, Page, Layout, LegacyCard, Form, Icon, DataTable } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import './DiscountForm.css'; // Import file CSS

import {
    ArrowLeftIcon,
    PlusCircleIcon
} from '@shopify/polaris-icons';
import OptionForm from '../OptionForm/OptionForm';

export interface ChildComponentHandle {
    getValues: () => FormValues;
}

export interface FormValues {
    title: string;
    subTitle: string;
    label: string;
    quantity: number;
    discountType: number;
    amount: number;
    mode?: string;
  }

export default function DiscountForm() {
    const [optionLengthArr, setOptionLengthArr] = useState(['show','show']);

    const {
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
      } = useForm({
        defaultValues: {
          campaign: "",
          title: "",
          description: "",
          options: [{ title: '', subTitle: '', label: '', quantity: 1, discountType: 'None', amount: 0 }, { title: '', subTitle: '', label: '', quantity: 2, discountType: 'None', amount: 0 }]
        },
    });
    const options = useWatch({ control, name: "options" });
    const [rows, setRows] = useState([['','None',1,0], ['','None',2,0]]);

    useEffect(() => {
        if (!Array.isArray(options)) return;
        setRows(
            options
                ?.filter((_, index) => optionLengthArr[index] === 'show')
                .map((option) => [
                    option.title,
                    option.discountType,
                    option.quantity,
                    option.discountType === 'Discount / each' 
                        ? option.amount + '$' 
                        : option.discountType === '% discount' 
                        ? option.amount + '%' 
                        : ''
                ])
        );
    }, [optionLengthArr, options]);
    

    const hideAction = (idx: number) => {
        const newOptionLengthArr = optionLengthArr?.map((item, index) => {
            if(idx === index) {
                return 'hide'
            }
            return item;
        })
        setOptionLengthArr(newOptionLengthArr);
    }

    var countToShow = 0;

    const numberOfShowOptionForm = useMemo(() => {
        return optionLengthArr?.filter(item => item === 'show').length;
    }, [optionLengthArr])

    const addOption = () => {
        setOptionLengthArr(prevState => [...prevState, 'show']);
        const currentOptions = getValues("options");
        setValue("options", [...currentOptions, { title: '', subTitle: '', label: '', quantity: options[options?.length-1]?.quantity + 1, discountType: 'None', amount: 0 }]);
    };

    const onSubmit = async (data: any) => {
        const dataSubmit = {
            campaign: data?.campaign,
            title: data?.title,
            description: data?.description,
            options: data?.options?.filter((_: any, index: number) => optionLengthArr[index] === 'show')
        };
    
        try {
            const response = await fetch('http://gialapcallapi', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSubmit)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const json = await response.json();
            console.log('Response:', json);
        } catch (error: any) {
            console.error('API Call Failed:', error.message);
        }
    };

    return (
        <AppProvider i18n={enTranslations}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormLayout>
                    <Page fullWidth={false}>
                        <div className='title'>
                            <div className='title__icon__wrap'>
                                <ArrowLeftIcon width={30} />
                            </div>
                            <div>Create volume discount</div>
                        </div>
                        <Layout>
                            {/* Make sure to use Layout.Section to control column widths */}
                            <Layout.Section>
                                <LegacyCard title="General" sectioned>
                                <Controller
                                    name="campaign"
                                    control={control}
                                    rules={{ required: "Campaign is required" }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Campaign"
                                            error={errors.campaign?.message}
                                            autoComplete=''
                                        />
                                    )}
                                />
                                <div style={{marginTop: 8}}>
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Title"
                                                autoComplete=''
                                                error={false}
                                            />
                                        )}
                                    />
                                </div>
                                <div style={{marginTop: 8}}>
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Description"
                                                autoComplete=''
                                                error={false}
                                            />
                                        )}
                                    />
                                </div>
                                </LegacyCard>
                                <LegacyCard title="Volumn discount rule" sectioned>
                                    {
                                        optionLengthArr?.map((item, index) => {
                                            if(item === 'show') countToShow++;
                                            return item === 'show' ? <OptionForm 
                                                key={index}
                                                index={index}
                                                countToShow={countToShow}
                                                hideShow={item}
                                                hideAction={(idx) => hideAction(idx)}
                                                numberOfShowOptionForm={numberOfShowOptionForm}
                                                control={control}
                                                errors={errors}
                                                options={options}
                                            /> : ''
                                        })
                                    }
                                    <div className='add__btn__wrap'>
                                        <div onClick={addOption} className='plus__icon__wrap'>
                                            <div>
                                                <Icon
                                                    source={PlusCircleIcon}
                                                    tone="inherit"
                                                />
                                            </div>
                                            <div>Add option</div>
                                        </div>
                                    </div>
                                </LegacyCard>
                                <div style={{textAlign: 'center', marginTop: 20, marginBottom: 40}}>
                                    <Button submit variant="primary" tone="success" size="large">
                                        Save
                                    </Button>
                                </div>
                            </Layout.Section>

                            {/* Wrap the tags section properly to prevent breaking layout */}
                            <Layout.Section variant="oneThird">
                                <LegacyCard title="Preview" sectioned subdued={false}>
                                    <div className='preview__header__center'>Buy more and save</div>
                                    <div className='preview__header__left'>Apply for all product in store</div>
                                    <div className="custom-table">
                                        <DataTable
                                            columnContentTypes={['text', 'text', 'numeric', 'text']}
                                            headings={['Title', 'Discount Type', 'Quantity', 'Amount']}
                                            rows={rows}
                                        />
                                    </div>
                                </LegacyCard>
                            </Layout.Section>
                        </Layout>
                    </Page>
                    
                </FormLayout>
            </Form>
        </AppProvider>
    );
}
