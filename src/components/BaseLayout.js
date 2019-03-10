import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Navigation from './Navigation';
import Footer from './Footer';
import './BaseLayout.css';

export default class BaseLayout extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Navigation />
        </Row>
        <Row>
          <Col>
            {this.props.children}
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}