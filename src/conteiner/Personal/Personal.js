import React, { Component } from "react";
import LayoutMenu from "../../hoc/LayoutMenu/LayoutMenu";
import "./Personal.css"
import {Sankey} from 'react-vis';


class Personal extends Component {
  componentDidMount() {
    document.title = "Личный кабинет";
  }
  

  render() {
    const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
    const links = [
      {source: 0, target: 1, value: 10},
      {source: 0, target: 2, value: 20},
      {source: 1, target: 2, value: 20}
    ];
    return (
      <React.Fragment>
        <LayoutMenu>
        <Sankey
          nodes={nodes}
          links={links}
          width={200}
          height={200}
        />
        </LayoutMenu>
      </React.Fragment>
    );
  }
}

export default Personal;
