import React, { Component } from 'react';
import { Card, Grid, Input, Label } from 'semantic-ui-react'

class Price extends Component {

  state = {
    price: "0",
	};

render() {
return (
<Card centered fluid style={{ "maxWidth": "860px" }}>
<Card.Content extra>
<Grid>
      <Grid.Row centered>
        <h3>Price</h3>
      </Grid.Row>
      <Grid.Row centered>
      <Input primary
          label={{ basic: true, content: 'ether' }}
          labelPosition='right'
    type="number"
    step="0.0001"
    actionPosition='left'
    placeholder='Price'
    value={ this.state.price }
    onChange={ e => {
      this.setState({price: e.target.validity.valid ? e.target.value : this.state.price });
      this.props.onPriceChange(e.target.validity.valid ? e.target.value : this.state.price );
    }} />
      </Grid.Row>
    </Grid >
</Card.Content>
</Card>
);
 }
}

export default Price;