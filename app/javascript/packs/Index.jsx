// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import { render } from "react-dom";
import App from "../common/App"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import  store  from "../common/store";
import MobileApi from "../common/MobileApi";
import Users from "../common/Users";
import Comments from "../common/Comments";
import ListItem from "../api/ListItem";
// import HelloWorld from "../common/HelloWorld";



document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store()}>
      <BrowserRouter>
        <App />
        {/* <HelloWorld/> */}
        {/* <MobileApi/> */}
        {/* <Users/> */}
        {/* <Comments /> */}
        {/* <ListItem /> */}
    
      </BrowserRouter>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
