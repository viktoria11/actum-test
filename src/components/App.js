import React from 'react';
import BaseLayout from './BaseLayout';
import ActumForm from './ActumForm';

class App extends React.Component {
  render() { 
    return (
      <BaseLayout>
        <ActumForm />
      </BaseLayout>  
    );
  }
}
 
export default App;