import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class SettingsData {



}

 async function search() {
  return await fetch(`/api/settings`, {'mode': 'no-cors',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
}

function checkStatus(response) {
  console.dir(response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  console.dir(response);
  return response.json();
}


class Settings extends Component {

  constructor(props) {
    super(props);
      this.state = {data: {

      }};
    //this.state = search();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //this.setState({ЧекиРегулярнаяГлубинаСканированияДни: data.ЧекиРегулярнаяГлубинаСканированияДни});
  }

  componentDidMount () {
    fetch('/api/settings', {accept: 'application/json'}).then(checkStatus)
      .then(parseJSON).then(data=>{
        this.setState({data: data})
      })
      .catch(e=>{
        console.log(e)
        this.setState({
          data: {},
          error: e
        })
      });
  }

    //setState({});

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let data = this.state.data;
    data[name] = value;
    this.setState(data);
  }

  handleSubmit(event) {
    console.log(this.state.data);
    fetch('/api/settings', {
      method: 'PUT',
      body:  JSON.stringify(this.state.data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      return response.json()
    }).then(json => {
      console.log(json)
      this.setState({
        user:json
      });
    })
    event.preventDefault();
  }

  render() {


    return (
      <div className="animated fadeIn">



        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <strong>Настройка обновления</strong>
              </CardHeader>
              <CardBody>
                <Form className="form-horizontal" >
                  {this.state.error && (
                    <Row>
                      <Col>
                        <Label className="text-danger">{this.state.error}</Label>
                      </Col>
                    </Row>
                  )}
                  <FormGroup row>
                    <Col md="5">
                      <Label htmlFor="ЧекиРегулярнаяГлубинаСканированияДни">Чеки. Регулярная Глубина Сканирования, Дни</Label>
                    </Col>
                    <Col xs="12" md="7">
                      <input type="number" name = "ЧекиРегулярнаяГлубинаСканированияДни" value={this.state.data.ЧекиРегулярнаяГлубинаСканированияДни} onChange={this.handleInputChange} />
                      <FormText className="help-block">Насколько дней назад от текущей даты происходит поиск новых/измененных Z-отчетов</FormText>
                    </Col>
                  </FormGroup>
                </Form>


              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa"></i>Записать</Button>
                {/*<Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>*/}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Settings;
