import React, { Component } from 'react';
import axios from 'axios';
import { Card, Grid, Image, Button, Input } from 'semantic-ui-react'

class GeneralInfo extends Component {

  state = {
		// Initially, no file is selected
		selectedFile: null,
		uploadedFile: this.props.uploadedFile
	};

  fileInputRef = React.createRef();

	// On file upload (click the upload button)
	onFileUpload = async () => {
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"file",
			this.state.selectedFile,
			this.state.selectedFile.name
		);

		// Details of the uploaded file
		console.log(this.state.selectedFile);
		try {
			// Request made to the backend api
			// Send formData object
			const res = await axios.post("http://localhost:5000/upload", formData);
			this.setState({uploadedFile: `http://localhost:5000/file/${res.data.message}` })
      this.props.onFileUpload(this.state.name, res.data.message);
		} catch (error) {
			console.log(error);  
		}
	};


// On file select (from the pop up)
fileChange = event => {
  // Update the state
  this.setState({ selectedFile: event.target.files[0] });
  console.log("File chosen --->", event.target.files[0]);
};

render() {
return (
<Card centered fluid style={{ "maxWidth": "860px" }}>
<Card.Content extra>
<Grid>
  <Grid.Column width={8}>
    <Grid>
      <Grid.Row centered>
        <h3>General Info</h3>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Input placeholder='Name' value={this.state.name} onChange={e => {
            this.setState({name: e.target.value});
            this.props.onFileUpload(e.target.value, this.state.uploadedFile);
          }} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Input
            action={{
              color: 'blue',
              labelPosition: 'right',
              icon: 'folder open outline',
              content: 'Choose File',
              onClick: () => this.fileInputRef.current.click(),
            }}
            value={ this.state.selectedFile ? this.state.selectedFile.name : "" }
          />
          <input
            ref={this.fileInputRef}
            type="file"
            hidden
            onChange={this.fileChange}
          />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button primary disabled={!this.state.selectedFile} content='Upload' icon='cloud upload' labelPosition='right' onClick={this.onFileUpload} />
          </Grid.Column>
        </Grid.Row>
    </Grid >
  </Grid.Column>
  <Grid.Column width={8}>
    <Image src={this.state.uploadedFile ? this.state.uploadedFile : "https://react.semantic-ui.com/images/wireframe/image.png"} size='medium' />
  </Grid.Column>
</Grid>

</Card.Content>
</Card>
);
 }
}

export default GeneralInfo;