import React from 'react';
import {useStyle} from "./tabStyles";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "./TabStyles.css";
import {useHistory} from "react-router-dom";

export default function AllTabs() {

  const classes = useStyle();
  const [value] = React.useState(0);
   let history = useHistory();

  function Click() {
    let url = window.location.pathname;
    let urls = url.split('/');
    let ID = urls[3]
    history.push('/form/'+ ID +'/viewresponses');
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        centered
        className={classes.tabs}>
        <Tab label="Questions" className={classes.tab} />
      </Tabs>
    </Paper>
  );
}