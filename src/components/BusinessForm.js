import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { useAppContext } from '../containers/AppController';
import { Form } from 'react-final-form';
import * as Yup from 'yup';
import {
  Paper,
  Grid,
  Button,
  Typography,
  Checkbox as MuiCheckbox,
  Checkbox,
} from '@material-ui/core';
import {
  TextField,
  makeValidate,
  Switches,
  Autocomplete,
  Debug,
  Checkboxes,
} from 'mui-rff';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { regions, categories, industries } from '../assets/data/formValues';
import templateValues from '../utils/businessObject.json';

const TITLE_CHAR_MAX = 50;
const TITLE_CHAR_MIN = 3;
const SHORT_DESCRIPTION_CHAR_MAX = 240;
const LONG_DESCRIPTION_CHAR_MAX = 1000;
// eslint-disable-next-line
const MESSAGE_STRING_TOO_LONG = 'Too long, maximum ${max} characters';
// eslint-disable-next-line
const MESSAGE_STRING_TOO_SHORT = 'Too short, minimum ${min} characters';
const MESSAGE_INVALID_EMAIL = 'Invalid email';
const MESSAGE_INVALID_URL = 'Invalid url';
const MESSAGE_INVALID_PHONE = 'Invalid phone number';
const SELECTION_REQUIRED = 'Please pick one';

const yupStringMax = (max) =>
  Yup.string().ensure().trim().max(max, MESSAGE_STRING_TOO_LONG);

const yupStringMin = (min) =>
  Yup.string().ensure().trim().min(min, MESSAGE_STRING_TOO_SHORT);

const schema = Yup.object().shape({
  title: yupStringMax(TITLE_CHAR_MAX)
    .min(TITLE_CHAR_MIN, MESSAGE_STRING_TOO_SHORT)
    .required(),
  location: Yup.object().shape({
    address: Yup.object().shape({
      suburb: Yup.string().trim(),
      city: yupStringMin(3),
      region: Yup.string().trim().required(),
      postcode: Yup.number().min(1000).lessThan(10000),
      street_address: Yup.string().trim(),
    }),
  }),
  category: Yup.object().shape({
    // eslint-disable-next-line
    tags: Yup.array().max(3, 'Max ${max} tags'),
    category: Yup.string().ensure().required(SELECTION_REQUIRED),
    industry: Yup.string().ensure().required(SELECTION_REQUIRED),
  }),
  open_state: Yup.object().shape({
    info_available: Yup.string().trim(),
    open_alert_level: Yup.string().trim(),
    open_now: Yup.boolean(),
    open_date: Yup.string().trim(),
    open_hours: yupStringMax(30),
  }),
  description: Yup.object().shape({
    short: yupStringMax(SHORT_DESCRIPTION_CHAR_MAX),
    long: yupStringMax(LONG_DESCRIPTION_CHAR_MAX),
  }),
  contact: Yup.object().shape({
    email: Yup.string().ensure().email(MESSAGE_INVALID_EMAIL),
    website: Yup.string()
      .ensure()
      .matches(
        /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/,
        { excludeEmptyString: true, message: MESSAGE_INVALID_URL }
      ),
    phone: Yup.string()
      .ensure()
      .matches(/^[+]?[0-9 .()-]*$/, { excludeEmptyString: true, message: MESSAGE_INVALID_PHONE })
      .notRequired(),
  }),
});

const autocompleteData = [
  { label: 'Earth', value: 'earth' },
  { label: 'Mars', value: 'mars' },
  { label: 'Venus', value: 'venus' },
  { label: 'Brown Dwarf Glese 229B', value: '229B' },
];

const recursiveMakeRequired = (schema) => {
  const fields = schema.fields;
  return Object.keys(fields).reduce((accu, field) => {
    accu[field] = fields[field].fields
      ? recursiveMakeRequired(fields[field])
      : fields[field]._exclusive.required;
    return accu;
  }, {});
};

const addHttp = (url) => {
  if (!url) return '';
  const [, protocol, addr] = url.match(/(http[s]?:\/\/)?(.*)/);
  return (protocol || 'http://') + addr;
};

const BusinessForm = (props) => {
  const initialValues = {
    ...templateValues,
    ...props.businessData,
  };
  // props.businessData || require('../utils/businessObject.json');

  const [formData, setFormData] = useState(initialValues);

  const handleReset = () => {
    // setFormData(initialValues)
    navigate('./edit');
  };

  const { submitEdit, activeBusiness, displaySnackbar } = useAppContext();

  const submitForm = (businessData) => {
    businessData.open_state.info_available = true;
    businessData.contact.website = addHttp(businessData.contact.website);
    submitEdit(businessData);
  };
  // const [formData, setFormData] = useState(require('../utils/businessObject.json'))

  // useEffect(()=> {
  //   if (activeBusiness?.title) setFormData(activeBusiness)
  // },[activeBusiness, setFormData])

  const validate = makeValidate(schema);
  const required = recursiveMakeRequired(schema);

  // console.log(schema);
  // console.log(active);
  // console.log(required);

  const filterOptions = createFilterOptions({
    limit: 100,
  });

  const formFields = ({ values }) => [
    {
      size: 12,
      field: <TextField label="Business Name" name="title" />,
    },
    {
      size: 6,
      field: (
        <Checkboxes
          // label="Open during the current alert level?"
          name="open_state.open_now"
          required={required.open_state.open_now}
          data={{
            label: 'Open during the current alert level?',
            value: 'open',
          }}
        />
      ),
    },
    {
      size: 6,
      field: (
        <TextField
          label="Open Hours"
          // disabled={!values.open_state.open_now}
          name="open_state.open_hours"
        />
      ),
    },
    {
      size: 6,
      field: <TextField label="Suburb" name="location.address.suburb" />,
    },
    {
      size: 6,
      field: (
        <TextField
          label="City"
          name="location.address.city"
          required={required.location.address.city}
        />
      ),
    },
    {
      size: 6,
      field: (
        <Autocomplete
          label="Region"
          name="location.address.region"
          size="small"
          options={regions}
          required={required.location.address.region}
          autoHighlight
          // getOptionValue={(option) => option.value}
          // getOptionLabel={(option) => option.label}
          // disableCloseOnSelect
        />
      ),
    },
    {
      size: 6,
      field: <TextField label="Phone" name="contact.phone" placeholder="" />,
    },
    {
      size: 12,
      field: <TextField label="Email" name="contact.email" />,
    },
    {
      size: 12,
      field: (
        <TextField
          label="Website"
          name="contact.website"
          placeholder="https://..."
        />
      ),
    },
    {
      size: 6,
      field: (
        <Autocomplete
          label="Industry"
          name="category.industry"
          size="small"
          options={industries}
          required={required.category.industry}
          // getOptionValue={(option) => option}
          // getOptionLabel={(option) => option}
          // disableCloseOnSelect
          filterOptions={filterOptions}
          freeSolo
          autoHighlight
          // renderOption={(option, { selected }) => (
          //   <>
          //     <MuiCheckbox style={{ marginRight: 8 }} checked={selected} />
          //     {option.label}
          //   </>
          // )}
        />
      ),
    },
    {
      size: 6,
      field: (
        <Autocomplete
          label="Category"
          name="category.category"
          size="small"
          options={categories}
          required={required.category.category}
          // getOptionValue={(option) => option.value}
          // getOptionLabel={(option) => option.label}
          // disableCloseOnSelect
          filterOptions={filterOptions}
          freeSolo
          autoHighlight
          // renderOption={(option, { selected }) => (
          //   <>
          //     <MuiCheckbox style={{ marginRight: 8 }} checked={selected} />
          //     {option.label}
          //   </>
          // )}
        />
      ),
    },
    {
      size: 12,
      field: (
        <Autocomplete
          label="Additional Categories"
          name="category.tags"
          size="small"
          options={categories}
          freeSolo
          // getOptionValue={(option) => option.value}
          // getOptionLabel={(option) => option.label}
          disableCloseOnSelect
          multiple
          autoHighlight
          renderOption={(option, { selected }) => (
            <>
              <MuiCheckbox style={{ marginRight: 8 }} checked={selected} />
              {option.label}
            </>
          )}
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          placeholder={`Example:\n"During level 3 we offer contactless pickups..."\nMax ${SHORT_DESCRIPTION_CHAR_MAX} characters`}
          label={`Short Description`}
          name="description.short"
          multiline
          rows={3}
        />
      ),
    },
    {
      size: 12,
      field: (
        <TextField
          placeholder={`Max ${LONG_DESCRIPTION_CHAR_MAX} characters`}
          label="Additional details"
          name="description.long"
          multiline
          rows={10}
        />
      ),
    },
  ];

  const subscription = {
    submitting: true,
    initialValues: false,
    // invalid: true // this makes form really slow
  };
  // const handleReset =
  // console.log('rerendered')
  return (
    <Form
      onSubmit={submitForm}
      initialValues={formData}
      validate={validate}
      subscription={subscription}
      key={{ submitting: true, initialValues: true }}
      render={({
        handleSubmit,
        submitting,
        pristine,
        values,
        form,
        invalid,
      }) => (
        <form
          onSubmit={(e) => {
            // if (invalid) alert('Please fill the required fields') //TODO
            handleSubmit(e);
          }}
          noValidate
        >
          <Paper style={{ padding: 16 }}>
            <Grid container alignItems="flex-start" spacing={2}>
              {formFields({ values }).map((item, i) => (
                <Grid item xs={item.size} key={i}>
                  {item.field}
                </Grid>
              ))}
              <Grid item style={{ marginTop: 16 }}>
                <Button
                  type="button"
                  variant="contained"
                  // onClick={e => navigate('')  }
                  // onClick={handleReset}
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
          {/* <Paper>
            <Typography>
              <strong>Form field data</strong>
            </Typography>
            <Debug />
          </Paper> */}
        </form>
      )}
    />
  );
};

export default BusinessForm;
