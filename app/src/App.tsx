import React, { useEffect, useState } from "react";
import { Input, Label, FormGroup, Form, Button } from "reactstrap";
import * as data from "./data/data.json";
import "./App.css";

const App: React.FC = () => {
  const [websiteState, setWebsiteState] = useState();
  const [typeState, setTypeState] = useState();

  const [itemsState, setItemState] = useState();
  const initialList: string[] = [];
  const [itemListState, setItemListState] = useState(initialList);

  const changeWebsite = (element: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteState(element.target.value);
  };
  const changeType = (element: React.ChangeEvent<HTMLInputElement>) => {
    setTypeState(element.target.value);
  };
  const changeItem = (element: React.ChangeEvent<HTMLInputElement>) => {
    setItemState(element.target.value);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postData: any = {
      website: (event.target as any).website.value,
      type: (event.target as any).type.value,
      item: (event.target as any).item.value
    };
    const result = await fetch("http://localhost:3000/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    }).then(res => res.json());
    console.log("result", result);
  };

  const websiteList = Object.keys((data as any).data);

  const typeList = ["Brand", "Category"];

  // for first render
  useEffect(() => {
    setWebsiteState(websiteList[0]);
    setTypeState(typeList[0]);
  }, []);

  useEffect(() => {
    const itemList =
      (websiteState &&
        typeState &&
        Object.keys(
          (data as any).data[websiteState][typeState.toLowerCase()]
        )) ||
      [];
    setItemListState(itemList);
    setItemState(itemList.length > 0 && itemList[0]);
  }, [typeState]);

  return (
    <>
      <Form onSubmit={submit}>
        <FormGroup className="blockContainer">
          <Label className="label" for="exampleSelect">
            Website
          </Label>
          <Input
            className="select"
            type="select"
            name="website"
            id="websiteSelect"
            onChange={changeWebsite}
            value={websiteState}
          >
            {websiteList.map((name, index) => (
              <option key={index}>{name}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup className="blockContainer">
          <Label className="label" for="exampleSelect">
            type
          </Label>
          <Input
            className="select"
            type="select"
            name="type"
            id="typeSelect"
            onChange={changeType}
            value={typeState}
          >
            {typeList.map((name, index) => (
              <option key={index}>{name}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup className="blockContainer">
          <Label className="label" for="exampleSelect">
            Items
          </Label>
          <Input
            className="select"
            type="select"
            name="item"
            id="itemSelect"
            onChange={changeItem}
            value={itemsState}
          >
            {itemListState.map((name, index) => (
              <option key={index}>{name}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Button>Submit</Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default App;
