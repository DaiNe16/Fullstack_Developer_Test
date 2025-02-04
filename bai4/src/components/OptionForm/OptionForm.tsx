import { Divider, Grid, Select, TextField } from "@shopify/polaris";
import React, { forwardRef } from "react";
import { DeleteIcon } from '@shopify/polaris-icons';
import { FormValues } from "../DiscountForm/DiscountForm";
import { Controller } from "react-hook-form";

export interface OptionFormHandle {
    getValues: () => FormValues;
}

interface IOptionForm {
    index: number;
    hideShow?: string;
    hideAction: (idx: number) => void;
    countToShow: number;
    numberOfShowOptionForm: number;
    control: any;
    errors: any;
    options: any;
}

const discountTypes = [
    { label: 'None', value: 'None' },
    { label: '% discount', value: '% discount' },
    { label: 'Discount / each', value: 'Discount / each' }
  ];

const OptionForm = forwardRef<OptionFormHandle, IOptionForm>((props, ref) => {
    const { index, hideAction, countToShow, numberOfShowOptionForm, control, errors, options } = props

    return (
        <div>
            <Divider borderColor="border" />
            <div style={{padding: 20, position: 'relative'}}>
                <div className='option'>OPTION {countToShow}</div>
                <div style={{marginTop: 40}}>
                    {
                        numberOfShowOptionForm > 1 &&
                        <div style={{textAlign: 'right', }}>
                            <DeleteIcon cursor={'pointer'} onClick={() => hideAction(index)} width={30} />
                        </div>
                    }
                    <Grid>
                        <Grid.Cell columnSpan={{ sm: 6, md: 6, lg: 4, xl: 4 }}>
                            <Controller
                                name={`options[${index}].title`}
                                control={control}
                                rules={{ required: "Title is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Title"
                                        error={errors?.options?.[index]?.title?.message}
                                        autoComplete="text"
                                    />
                                )}
                            />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ sm: 6, md: 6, lg: 4, xl: 4 }}>
                            <Controller
                                name={`options[${index}].subTitle`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Subtitle"
                                        autoComplete="text"
                                    />
                                )}
                            />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ sm: 6, md: 6, lg: 4, xl: 4 }}>
                            <Controller
                                name={`options[${index}].label`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Label (optional)"
                                        autoComplete="text"
                                    />
                                )}
                            />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ sm: 6, md: 6, lg: 4, xl: 4 }}>
                            <Controller
                                name={`options[${index}].quantity`}
                                control={control}
                                rules={{ required: "Quantity is required" }}
                                render={({ field }) => (
                                    <TextField
                                        type="number"
                                        {...field}
                                        label="Quantity"
                                        error={errors?.options?.[index]?.quantity?.message}
                                        autoComplete="text"
                                    />
                                )}
                            />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ sm: 6, md: 6, lg: 4, xl: 4 }}>
                        <Controller
                            name={`options[${index}].discountType`}
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Discount Type"
                                    options={discountTypes}
                                    {...field}
                                />
                            )}
                        />
                        </Grid.Cell>
                        {
                            options[index]?.discountType !== 'None' &&
                            <Grid.Cell columnSpan={{ sm: 6, md: 6, lg: 4, xl: 4 }}>
                                <Controller
                                    name={`options[${index}].amount`}
                                    control={control}
                                    rules={{ required: "Amount is required" }}
                                    render={({ field }) => (
                                        <TextField
                                            type="number"
                                            {...field}
                                            label="Amount"
                                            error={errors?.options?.[index]?.amount?.message}
                                            autoComplete="text"
                                            suffix={options[index]?.discountType === '% discount' ? '%' : options[index]?.discountType === 'Discount / each' ? '$' : ''}
                                        />
                                    )}
                                />
                            </Grid.Cell>
                        }
                    </Grid>
                </div>
            </div>
        </div>
    )
});

export default OptionForm;