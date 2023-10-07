import React, { Component } from 'react';
import { Card, Grid, Table, Input, Button, Icon } from 'semantic-ui-react'

class Metadata extends Component {

  state = {
    metadata: [["",""]],
    addButtonDisabled: false
	};

onChange = (index, value, isKey) => {
  let metadata = this.state.metadata;
  if (isKey) {
    metadata[index][0] = value;
  } else {
    metadata[index][1] = value;
  }
  this.setState({metadata: metadata});
  this.props.onMetadataChange(metadata);
}

addRow = () => {
  let metadata = this.state.metadata;
  if (metadata.length < 10) {
    metadata.push(["",""]);
    this.setState({metadata: metadata});
  } else {
    this.setState({addButtonDisabled: true});
  }
}

renderTable = () => {

  return (
    <Table basic='very' collapsing>
    <Table.Body>
    { this.state.metadata.map((entrySet, index) => 
      <Table.Row key="{ index }">
        <Table.Cell>
          <Input placeholder='Key' value={ this.state.metadata[index][0] } onChange={e => this.onChange(index, e.target.value, true)} />
        </Table.Cell>
        <Table.Cell>
          <Input placeholder='Value' value={ this.state.metadata[index][1]} onChange={e=> this.onChange(index, e.target.value, false)} />
        </Table.Cell>
      </Table.Row>
    )}
    </Table.Body>
  </Table>
  );
};

render() {
return (
<Card centered fluid style={{ "maxWidth": "860px" }}>
<Card.Content extra>
<Grid>
      <Grid.Row centered>
        <h3>Metadata</h3>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="8">{ this.renderTable() }</Grid.Column>
        <Grid.Column width="4"><Button disabled={this.state.addButtonDisabled} primary icon onClick={this.addRow}><Icon name='add' /></Button></Grid.Column>
      </Grid.Row>
    </Grid >
</Card.Content>
</Card>
);
 }
}

export default Metadata;