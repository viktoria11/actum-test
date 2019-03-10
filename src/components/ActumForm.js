import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';

export default class Example extends React.Component {
  state = {
    name: '',
    surname: '',
    date: '',
    email: '',
    gender: '',
    children: null,
    response: null,
    loading: false,
    errors: {},
  }

  handleChange = (fieldName, value) => {
    console.log(fieldName)

    this.setState({
      [fieldName]: value,
    });
  }

  handleNameChange = (value) => {
    this.setState({
      name: value,
    });
  }

  handleSubmit = () => {
    const {
      name,
      surname,
      date,
      email,
      gender,
      children,
    } = this.state;

    const errors = {};

    if (!name) {
      errors.name = 'Please enter name!';
    }
    if (!surname) {
      errors.surname = 'Please enter surname!';
    }
    if (!date) {
      errors.date = 'Please enter date!';
    }
    if (!email) {
      errors.email = 'Please enter email!';
    }
    if (!gender) {
      errors.gender = 'Please enter gender!';
    }
    if (!children) {
      errors.children = 'Please enter children!';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors,
      });
    } else {
      this.setState({
        loading: true,
        response: null,
        errors: {},
      })
      fetch('https://actum-form-ulcrunoxba.now.sh/api/submit', {
        method: 'POST',
        body: JSON.stringify(this.state)
      })
        .then((response) => {
          return response.json();
        })
        .then((r) => {
          this.setState({
            response: r,
            loading: false,
          });
        })
    }
  }

  render() {
    const { response, loading, errors } = this.state;

    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              invalid={errors && errors.name}
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={(e) => this.handleNameChange(e.target.value)}
              onChange={(e) => this.handleChange('name', e.target.value)}
            />
            {errors && errors.name && <FormFeedback>{errors.name}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="surname">Surname</Label>
            <Input
              invalid={errors && errors.surname}
              type="text" 
              name="surname"
              id="surname"
              value={this.state.surname}
              onChange={(e) => this.handleChange('surname', e.target.value)}
            />
            {errors && errors.surname && <FormFeedback>{errors.surname}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="exampleDate">Date</Label>
            <Input
              invalid={errors && errors.date}
              value={this.state.date}
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
              onChange={(e) => this.handleChange('date', e.target.value)}
            />
            {errors && errors.date && <FormFeedback>{errors.date}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              invalid={errors && errors.email}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder" 
              value={this.state.email}
              onChange={(e) => this.handleChange('email', e.target.value)}
            />
            {errors && errors.email && <FormFeedback>{errors.email}</FormFeedback>}
          </FormGroup>
          <FormGroup tag="fieldset">
            <Label for="exampleEmail">Gender</Label>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="male" checked={this.state.gender === 'male'} onChange={() => this.handleChange('gender', 'male')} />{' '}
                Male
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="female" checked={this.state.gender === 'female'} onChange={() => this.handleChange('gender', 'female')} />{' '}
                Female
              </Label>
            </FormGroup>
            {errors && errors.gender && <div className="invalid-feedback" style={{ display: 'block' }}>{errors.gender}</div>}
          </FormGroup>
          <FormGroup>
            <Label for="exampleNumber">Number of children</Label>
            <Input
              invalid={errors && errors.children}
              type="number"
              name="children"
              id="children"
              value={this.state.children} 
              onChange={(e) => this.handleChange('children', e.target.value)}
            />
            {errors && errors.children && <FormFeedback>{errors.children}</FormFeedback>}
          </FormGroup>
          <Button onClick={this.handleSubmit}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
        {response && (
          <Alert color="success" style={{ marginTop: 12 }}>
            <h4 className="alert-heading">Well done!</h4>
            <p>
              {JSON.stringify(response)}
            </p>
          </Alert>
        )}
      </div>
    );
  }
}