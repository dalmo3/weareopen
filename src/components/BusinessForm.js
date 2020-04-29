import React from 'react';
import { navigate } from '@reach/router';
import { Form } from 'react-final-form';
import { TextField, makeValidate, makeRequired } from 'mui-rff';
import * as Yup from 'yup';
import { Paper, Grid, Button, Typography } from '@material-ui/core';

const schema = Yup.object().shape({
  title: Yup.string().ensure().trim().min(3, 'Too short').max(50, 'Too long'),
  location: Yup.object().shape({
    address: Yup.object().shape({
      suburb: Yup.string().trim(),
      city: Yup.string().ensure().trim(),
      region: Yup.string().trim(),
      region: Yup.string().trim(),
      street_address: Yup.string().trim(),
    }),
  }),
  // open_state: {
  //   info_available,
  //   open_alert_level,
  //   open_now,
  //   open_date,
  //   open_hours,
  // },
  description: Yup.object().shape({
    short: Yup.string().ensure().trim().max(240, 'Too long'),
    long: Yup.string().ensure().trim().max(1000, 'Too long'),
  }),
  // contact: {
  //   email,
  //    website,
  //    phone },
});

const validate = makeValidate(schema);
const required = makeRequired(schema);

const formFields = [
  {
    size: 12,
    field: <TextField label="Business Name" name="title" required={true} />,
  },
  {
    size: 6,
    field: <TextField label="City" name="location.address.city" />,
  },
  {
    size: 6,
    field: <TextField label="Suburb" name="location.address.suburb" />,
  },
  {
    size: 6,
    field: <TextField label="Region" name="location.address.region" />,
  },
  {
    size: 12,
    field: (
      <TextField
        label="Street Address"
        name="location.address.street_address"
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        label="Short Description"
        name="description.short"
        multiline
        rows={3}
      />
    ),
  },
];

const BusinessForm = (props) => {
  const { businessData } = props;

  return (
    <Form
      onSubmit={(e) => alert}
      initialValues={businessData}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Paper style={{ padding: 16 }}>
            <Grid container alignItems="flex-start" spacing={2}>
              {formFields.map((item, i) => (
                <Grid item xs={item.size} key={i}>
                  {item.field}
                </Grid>
              ))}
              <Grid item style={{ marginTop: 16 }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <pre>{JSON.stringify(values)}</pre>
        </form>
      )}
    />
  );
};

export default BusinessForm;
